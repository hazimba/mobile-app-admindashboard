import twilio from "twilio";
import msgraph from "./msgraph.mjs";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,PutCommand} from "@aws-sdk/lib-dynamodb";
import { Client } from '@twilio/conversations';
const ddbClient = new DynamoDBClient({ 
  region: process.env.REGION 
});

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // false, by default.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB Document client.
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);


const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_CHAT_TOKEN,
  TWILIO_API_SECRET,
  TWILIO_CONVERSATIONS_ID,
  TWILIO_ADMIN_PARTICIPANT_ID,
} = process.env;


class Twilio {
  client = null;
  $ = null;

  constructor() {
    this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    this.conversationSvc = this.client.conversations.v1.services(TWILIO_CONVERSATIONS_ID);
  }

  async initMsgraph() {
    if (!this.$) {
      this.$ = await msgraph.new_client();
    }
  }

  async makeSureParticipantAndChatsReady(id, token) {

    const client = new Client(token);

      // Before you use the client, subscribe to the `'initialized'` event.
      client.on('initialized', async () => {
        const caregiverClient = id;
        const announcementEveryoneRoomUID = "Everyone|Announcement";
        const reminderEveryoneRoomUID = "Everyone|Reminder";
        const everyoneAttribute = "{\"role\":\"Caregiver\"}";

        const caregiver = id.split('|')[0];
        let clientName = '';
        let caregiverName = '';

        await this.initMsgraph();
        let cgLinksParam = new URLSearchParams({
          $expand: `crb5c_Client($select=crb5c_no,crb5c_fow_customerid,crb5c_photo),crb5c_Caregiver`, //name, id and image of client
          $filter: `_crb5c_caregiver_value eq '${caregiver}'`, //show list of clients with caregiver of this number
        });
        let {
          data: { value: cgLinks },
        } = await this.$.get(`/crb5c_clientcaregiverbridgetables?${cgLinksParam.toString()}`);

        if (cgLinks?.length) {
          clientName = cgLinks[0].crb5c_Client?.crb5c_no;
          caregiverName = cgLinks[0].crb5c_Caregiver?.crb5c_name;
        }

        if (!clientName || !caregiverName) {
          throw "INVALID CREATION OF PARTICIPANT";
        }

        let r1 = await this.putParticipantInConversation(caregiverClient, announcementEveryoneRoomUID, everyoneAttribute, "Announcement Everyone Room");
        let r2 = await this.putParticipantInConversation(caregiverClient, reminderEveryoneRoomUID, everyoneAttribute, "Reminder Everyone Room");
        
        console.log("ADDED PARTICIPANT TO ANNOUNCEMENT AND REMINDER EVERYONE ROOM", r1, r2);




          console.log("Creating Individual Anouncement Room for:", caregiverName, clientName);
          let iA = await this.createConversation({
              friendlyName: `${caregiverName} ${clientName} Individual Announcement Room`,
              uniqueName: `${caregiverClient}|Announcement`,
              attributes: "{\"type\":\"Announcement\",\"role\":\"Caregiver\"}"
          })

          if (!iA) {
              console.log("[Failed to create room]", `${caregiverName} ${clientName} Individual Announcement Room`)
          } else {
              const iAP = await this.putParticipantInConversation(caregiverClient, iA, everyoneAttribute, "Announcement Individual Room");
              console.log(`Attached Announcement Individual for ${caregiverName} ${clientName}`, iAP)
              let r = await this.createParticipant({
                conversationId: iA,
                participantIdentity: TWILIO_ADMIN_PARTICIPANT_ID,
                attributes: {
                    role: 'Admin'
                }
              });
              console.log(`Attached Announcement Admin for ${caregiverName} ${clientName}`, r)
          }
        

      
          let iC = await this.createConversation({
            friendlyName: `${caregiverName} ${clientName} Individual Chat Room`,
            uniqueName: `${caregiverClient}|Chat`,
            attributes: "{\"type\":\"Chat\",\"role\":\"Caregiver\"}"
          });

          if (!iC) {
              console.log("[Failed to create room]", `${caregiverName} ${clientName} Individual Chat Room`)
          } else {
              const iCP = await this.putParticipantInConversation(caregiverClient, iC, everyoneAttribute, "Chat Individual Room");
              console.log(`Attached Chat Individual for ${caregiverName} ${clientName}`, iCP)
              let r = await this.createParticipant({
                conversationId: iC,
                participantIdentity: TWILIO_ADMIN_PARTICIPANT_ID,
                attributes: {
                    role: 'Admin'
                }
              });
              console.log(`Attached Chat Admin for ${caregiverName} ${clientName}`, r)
          }
          

        

          let iR = await this.createConversation({
              friendlyName: `${caregiverName} ${clientName} Individual Reminder Room`,
              uniqueName: `${caregiverClient}|Reminder`,
              attributes: "{\"type\":\"Reminder\",\"role\":\"Caregiver\"}"
          });

          if (!iR) {
              console.log("[Failed to create room]", `${caregiverName} ${clientName} Individual Reminder Room`)
          } else {
              const iRP = await this.putParticipantInConversation(caregiverClient, iR, everyoneAttribute, "Reminder Individual Room");
              console.log(`Attached Reminder Individual for ${caregiverName} ${clientName}`, iRP)
              let r = await this.createParticipant({
                conversationId: iR,
                participantIdentity: TWILIO_ADMIN_PARTICIPANT_ID,
                attributes: {
                    role: 'Admin'
                }
              });
              console.log(`Attached Reminder Admin for ${caregiverName} ${clientName}`, r)
          }


      });

      // To catch client initialization errors, subscribe to the `'initFailed'` event.
      client.on('initFailed', ({ error }) => {
        console.log("ERROR INITING CONVERSATION CLIENT", error);
      });
        


    
  }

  getChatToken(identity) {
    const AccessToken = twilio.jwt.AccessToken;
    const ChatGrant = AccessToken.ChatGrant;
    // Used when generating any kind of tokens
    // To set up environmental variables, see http://twil.io/secure
    const twilioAccountSid = TWILIO_ACCOUNT_SID;
    const twilioApiKey = TWILIO_CHAT_TOKEN;
    const twilioApiSecret = TWILIO_API_SECRET;

    // Used specifically for creating Chat tokens
    

    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: TWILIO_CONVERSATIONS_ID,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      { identity}
    );

    token.addGrant(chatGrant);

    const result = token.toJwt();
    // Serialize the token to a JWT string
    return result;
  }

  async getAllConversations() {
    const result = await this.conversationSvc.conversations.list()
    return result;
  }

  async getAllAdminConversations() {
    const result = await this.conversationSvc.participantConversations.list({
        identity: TWILIO_ADMIN_PARTICIPANT_ID
    })
    return result;
  }

  async putParticipantInConversation(identity, roomId, attributes, roomName) {
    try {
        console.log('PUTTING PARTICIPANT', identity, roomId, attributes, roomName)
        console.log("TRYING ATTRIBUTES", attributes, JSON.parse(attributes), JSON.stringify(JSON.parse(attributes)))
        let r = await this.createParticipant({
            conversationId: roomId,
            participantIdentity: identity,
            attributes: typeof attributes === 'string' ? attributes : JSON.stringify(attributes)
        });
        console.log('[DONE PARTICIPANT]', r)
    
        return r;
    } catch (error) {
        if (error?.message == 'Participant already exists') {
            return `${identity} is already in ${roomName}`;
        }
        console.log("THE ERROR", error)
        return error
    }

  }

  async putAdminInAllConversations() {
    let result = await this.getAllConversations();
    const adminIn = await this.getAllAdminConversations();
    const adminInJustSid = adminIn.map(a => a.conversationSid);
    result = result.filter((r) => {
        return !adminInJustSid.includes(r.sid) 
    })
    let output = [];
    for (let c of result) {
        try {
            let r = await this.createParticipant({
                conversationId: c.sid,
                participantIdentity: TWILIO_ADMIN_PARTICIPANT_ID,
                attributes: {
                    role: 'Admin'
                }
            });
            output.push(r);
        } catch (e) {
            if (e == 'Participant already exists' || e.message == 'Participant already exists') {
                continue;
            }
        }

        
    }

    return output;
  }
  
  async createConversation({
    friendlyName = undefined,
    uniqueName = undefined,
    attributes
  }) {

    try {
        const payload = {
            chatServiceSid: TWILIO_CONVERSATIONS_ID,
            attributes: typeof attributes === "string" ? attributes : JSON.stringify(attributes)
          };
          if (friendlyName) payload.friendlyName = friendlyName;
          if (uniqueName) payload.uniqueName = uniqueName;
      
          const result = await this.conversationSvc.conversations.create(
            payload
          );
      
          console.log("CREATED CONVERSATION", payload, result)
      
          return result.sid;
    } catch (error) {
          if (error?.message === "Conversation with provided unique name already exists") {
            return uniqueName;
          }
          console.log("ERROR CREATING CONVERSATION ROOM", error)
          return false
    }
    
  }

  async createParticipant({
    conversationId,
    participantIdentity,
    attributes,
  }) {
    try {
      console.log('PARTICIPANT ATTRIBUTES:', JSON.stringify(attributes) )
      const result = await this.conversationSvc
        .conversations(conversationId)
        .participants.create({ identity: participantIdentity, attributes: typeof attributes === "string" ? attributes : JSON.stringify(attributes) });

      return result.sid;
    } catch (error) {
      if (error == "Participant already exists" || error?.message == "Participant already exists") {
        return "ADMIN IS ALREADY IN HERE"
      }
      console.log("ERROR CREATING PARTICIPANT", error);
      return error;
    }
    
  }

  async createEveryone(){
    await this.initMsgraph();


    /*
    1. Get all combination of caregiver|client
    2. Create 4 rooms 
        1. Announcement
            - Everyone
            - Individual
            - Groups
        2. Reminder
            - Everyone
            - Individual
            - Groups
        3. Chat
            - Individual
            - Group
     */

    /*
    Twilio Room Types (Dataverse):
    1 - Announcement - Individual
    2 - Reminder - Individual
    3 - Chat - Individual
    4 - Announcement - Group
    5 - Reminder - Group
    6 - Chat - Group
    7 - Announcement - Everyone
    8 - Reminder - Everyone
    */

    //1. If not exists, Create Announcement and Reminder for everyone room
    //2. Find all clients that have caregivers
    //3. Loop through clients|caregivers
    //4. Create participant in 3, attach to 2.
    //  4.1 If clients|caregiver exists, continue
    //5. Loop through clients|caregivers
    //  5.1 Create individual announcement, reminder, and chat rooms
    //  5.1 Create participant in 5, attach to 5.1
    

    //1
    const announcementEveryoneRoomName = 'Announcement - Everyone';
    const reminderEveryoneRoomName = 'Reminder - Everyone';

    console.log('1. Getting all conversations');
    let all = await this.getAllConversations();

    console.log('1. Checking Everyone Announcement room');
    let announcementEveryoneRoomTwilioSid = all.find(c => c.friendlyName == announcementEveryoneRoomName)?.sid

    if (!announcementEveryoneRoomTwilioSid)  {
        console.log('1. Everyone Announcement room not found. Creating...');
        announcementEveryoneRoomTwilioSid = await this.createConversation({
            friendlyName: announcementEveryoneRoomName,
            attributes: "{\"type\":\"Announcement\",\"for\":\"Everyone\"}"
        });

        if (!announcementEveryoneRoomTwilioSid) {
            console.log('Failed to create Announcement Everyone Room');
        }
    } else {
        console.log('1. Everyone Announcement room found.');
    }

    console.log('1. Checking Everyone Reminder room');
    let reminderEveryoneRoomTwilioSid = all.find(c => c.friendlyName == reminderEveryoneRoomName)?.sid

    if (!reminderEveryoneRoomTwilioSid)  {
        console.log('1. Everyone Reminder room not found. Creating...');
        reminderEveryoneRoomTwilioSid = await this.createConversation({
            friendlyName: reminderEveryoneRoomName,
            attributes: "{\"type\":\"Reminder\",\"for\":\"Everyone\"}"
        });
        console.log('Failed to create Reminder Everyone Room');
        
    } else {
        console.log('1. Everyone Reminder room found.');
        
    }

    //2
    console.log('2. Getting all clients')
    let care = new URLSearchParams({
        $select: `crb5c_name, crb5c_email`, //name and email of caregiver
        $expand: `crb5c_client($select=crb5c_no,crb5c_fow_customerid,crb5c_photo)`, //name, id and image of client
      });

      let {
        data: { value },
      } = await this.$.get(`/crb5c_fow_caregivers?${care.toString()}`);

      const caregiversWithClients = value.filter(v => v?.crb5c_client?.crb5c_no);
      for (let caregiver of caregiversWithClients) {

        const caregiverClient = `${caregiver.crb5c_fow_caregiverid}|${caregiver.crb5c_client.crb5c_fow_customerid}`;

        const everyoneAttribute = "{\"role\":\"Caregiver\"}";

        let attachedAnnouncementEveryoneParticipant = await this.putParticipantInConversation(caregiverClient, announcementEveryoneRoomTwilioSid, everyoneAttribute, "Announcement Everyone Room");
        console.log('2.', attachedAnnouncementEveryoneParticipant);
        let attachedReminderEveryoneParticipant = await this.putParticipantInConversation(caregiverClient, reminderEveryoneRoomTwilioSid, everyoneAttribute, "Reminder Everyone Room");
        console.log('2.', attachedReminderEveryoneParticipant);

        //Create Individual room
        console.log("Creating Individual Anouncement Room for:", caregiver?.crb5c_name, caregiver?.crb5c_client?.crb5c_no);
        let iA = await this.createConversation({
            friendlyName: `${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no} Individual Announcement Room`,
            uniqueName: `${caregiverClient}|Announcement`,
            attributes: "{\"type\":\"Announcement\",\"role\":\"Caregiver\"}"
        });

        if (!iA) {
            console.log("[Failed to create room]", `${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no} Individual Announcement Room`)
        } else {
            const iAP = await this.putParticipantInConversation(caregiverClient, iA, everyoneAttribute, "Announcement Individual Room");
            console.log(`Attached Announcement Individual for ${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no}`, iAP)
        }

        let iR = await this.createConversation({
            friendlyName: `${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no} Individual Reminder Room`,
            uniqueName: `${caregiverClient}|Reminder`,
            attributes: "{\"type\":\"Reminder\",\"role\":\"Caregiver\"}"
        });

        if (!iR) {
            console.log("[Failed to create room]", `${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no} Individual Reminder Room`)
        } else {
            const iRP = await this.putParticipantInConversation(caregiverClient, iR, everyoneAttribute, "Reminder Individual Room");
            console.log(`Attached Reminder Individual for ${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no}`, iRP)
        }

        let iC = await this.createConversation({
            friendlyName: `${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no} Individual Chat Room`,
            uniqueName: `${caregiverClient}|Chat`,
            attributes: "{\"type\":\"Chat\",\"role\":\"Caregiver\"}"
        });

        if (!iC) {
            console.log("[Failed to create room]", `${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no} Individual Chat Room`)
        } else {
            const iCP = await this.putParticipantInConversation(caregiverClient, iC, everyoneAttribute, "Chat Individual Room");
            console.log(`Attached Chat Individual for ${caregiver?.crb5c_name} ${caregiver?.crb5c_client?.crb5c_no}`, iCP)
        }
    
      }


  }
  async putAnnouncementAll(...args){
    return this.putMessageInConversation("Everyone|Announcement", "Admin",...args);
  }

  async putAnnouncementGroup(obj){
    let {group} = obj;
    let others = {...obj};
    delete others.group;
    
    await this.initMsgraph();
    let care = new URLSearchParams({
        $select: "crb5c_session_id",
        $expand: "crb5c_FOW_Customer_session_schedule_crb5c($select=crb5c_no)"
    })

    let {data:{value}} = await this.$.get(`/crb5c_fow_session_schedules?${care.toString()}`);
    console.log('Got sessions', value)
    let groups = value?.filter(v => group.find(g => g.id === v.crb5c_fow_session_scheduleid));
    console.log('Only doing for these groups:', groups);

    if (!groups?.length) {
      throw 'Can\'t fetch all groups';
    }

    let cgLinksParam = new URLSearchParams({
      $select: `crb5c_name`,
      $expand: `crb5c_Client($select=crb5c_no,crb5c_fow_customerid),crb5c_Caregiver($select=crb5c_name)`, //name, id and image of client
    });
    let {
      data: { value: cgLinks },
    } = await this.$.get(`/crb5c_clientcaregiverbridgetables?${cgLinksParam.toString()}`);
    

    for (let g of groups) {
      console.log("CREATING ROOM", `${g.crb5c_fow_session_scheduleid}|Announcement`)
      await this.createConversation({
          friendlyName: `${g.crb5c_session_id} Announcement Room`,
          uniqueName: `${g.crb5c_fow_session_scheduleid}|Announcement`,
          attributes: "{\"type\":\"Announcement\",\"for\":\"Group\"}"
      });
      
      let ap = await this.createParticipant({
          conversationId: `${g.crb5c_fow_session_scheduleid}|Announcement`,
          participantIdentity: TWILIO_ADMIN_PARTICIPANT_ID,
          attributes: {
              role: 'Admin'
          }
      });

      console.log(`Admin put into the ${g.crb5c_fow_session_scheduleid}|Announcement group`, ap)
      for (let c of g.crb5c_FOW_Customer_session_schedule_crb5c) {

        const allCaregiversForThisClient = cgLinks.filter(cg => cg.crb5c_Client.crb5c_fow_customerid === c.crb5c_fow_customerid);

        for (let cg of allCaregiversForThisClient) {
          let cgcp = await this.createParticipant({
              conversationId: `${g.crb5c_fow_session_scheduleid}|Announcement`,
              participantIdentity: `${cg.crb5c_Caregiver.crb5c_fow_caregiverid}|${c.crb5c_fow_customerid}`,
              attributes: {
                  role: 'Caregiver'
              }
          });
          console.log(`${cg.crb5c_Caregiver.crb5c_name}|${c.crb5c_no} put into the ${g.crb5c_fow_session_scheduleid}|Announcement group`, cgcp)
        }



      }

      //Put message in
      let mp = await this.putMessageInConversation(`${g.crb5c_fow_session_scheduleid}|Announcement`, "Admin", {body: others.body, title: others.title, isEvent:others.isEvent, eventDate: others.eventDate, eventTime: others.eventTime, groupName: g.crb5c_session_id, admin: others.admin});
      console.log(`PUTTING THE MESSAGE INTO ${g.crb5c_fow_session_scheduleid}|Announcement group`, mp);
    }
  }

  async removeAnnouncementAll(msgid, convid)  {
    try {
      return this.conversationSvc.conversations(convid).messages(msgid).remove()
    } catch (error) {
      return true;
    }
  }
  
  async putReminderAll(...args){
    return this.putMessageInConversation("Everyone|Reminder", "Admin",...args);
  }
  async putMessageInConversation(roomId, author="Admin", {body,title, eventDate, eventTime, isEvent, groupName, admin}, scheduleDate=null){
    let attributes = JSON.stringify({title, eventDate, eventTime, isEvent, groupName, admin});
    let payload ={
      author,
      body,
      attributes
    };
    if(scheduleDate){
      let uuid = uuidv4();
      console.log(scheduleDate);
      let Item = {uuid,roomId,scheduleDate:dayjs(scheduleDate,"DD/MM/YYYY").toISOString(), payload};
      const params = {
        TableName: "scheduled_messages",
        Item,
      };
      try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
        return data;
      } catch (err) {
        console.log("Error", err);
        return err;
      }
    }
    return this.conversationSvc.conversations(roomId).messages.create(payload);
  }

  async editAnnouncementAll({msgid, title, body, eventDate, eventTime, isEvent, convId, groupName})  {
    let attributes = JSON.stringify({title, eventDate, eventTime, isEvent, groupName});
    let m = await this.conversationSvc.conversations(convId).messages(msgid).update({
      attributes,
      body
    });

    console.log("M", m)
  }
  
  

}

export default Twilio;
