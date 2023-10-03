import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import { Client as ConversationsClient } from "@twilio/conversations";
Vue.config.productionTip = false
import { TABLE, MESSAGE } from "./store/ModuleName";
import { mapGetters, mapMutations } from "vuex";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js"; // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

import vSelect from 'vue-select'

// import AdminDashboard from './views/admin-homepage/AdminDashboard.vue'
import AdDashboard from './views/admin-homepage/AdDashboard'
import UpcomingAssessment from './views/admin-homepage/UpcomingAssessment.vue'
import ListAppointment from './views/admin-homepage/ListAppointment.vue'
import ListClient from './views/admin-homepage/ListClient.vue'
import WeeklySchedule from './views/admin-homepage/WeeklySchedule.vue'
import MasterSchedule from './views/admin-homepage/MasterSchedule.vue'

Vue.component('ad-dashboard', AdDashboard)
Vue.component('upcoming-assessment', UpcomingAssessment)
Vue.component('list-appointment', ListAppointment)
Vue.component('list-client', ListClient)
Vue.component('weekly-schedule', WeeklySchedule)
Vue.component('master-schedule', MasterSchedule)

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

new Vue({
  render: h => h(App),
  async created() {
    let apiResult = axios.create({
      baseURL: `${location.origin}/api`
    })

    this.$store.commit('api', apiResult);
    const { data } = await this.$store.state.api.get('/chat');
    await this.initChat(data.token);
  },
  async mounted() {
    const { data } = await this.$store.state.api.get('/every_client');
    this.cli_list = data?.cli_list || [];
    this.cg_list = data?.cg_list || [];
    this.clearAnnouncements(null);
  },
  data() {
    return {
      dayjs,
      cli_list: [],
      cg_list: [],
      conversationsClient: null,
      status: null,
      state: {
        name: "",
        loggedIn: "",
        token: null,
        statusString: null,
        conversationsReady: false,
        conversations: [],
        selectedConversationSid: null,
        newMessage: "",
      },
      everyoneAnnouncementRoom: "Everyone|Announcement",
      announcements: [],
      announcementsLoading: true,
    }
  },
  computed: {
    ...mapGetters(TABLE, ["getAnnouncementData"]),
    ...mapGetters(MESSAGE, ["getAdminTotalCountMessage", "getAdminMessage"]),
  },
  methods: {
    nameLookup(id) {
      let cName = this.cli_list.find(c => c.crb5c_fow_customerid === id.split('|')[1])?.crb5c_no || id;
      let cgName = this.cg_list.find(c => c.crb5c_fow_caregiverid === id.split('|')[0])?.crb5c_name || id;
      return `Caregiver ${cgName} for ${cName}`;
    },
    photoLookup(id) {
      return this.cli_list.find(c => c.crb5c_fow_customerid === id.split('|')[1])?.crb5c_photo || null;
    },
    ...mapMutations(TABLE, ["addAnnouncements", "clearAnnouncements"]),
    ...mapMutations(MESSAGE, ["setAdminContactList", "sendAdminMessage"]),
    async initChat(token) {
      window.conversationsClient = ConversationsClient;
      this.conversationsClient = new ConversationsClient(token);

      this.statusString = "Connecting to Twilio…";

      this.conversationsClient.on("connectionStateChanged", (state) => {
        if (state === "connecting") {
          this.statusString = "Connecting to Twilio…";
          this.status = "default";
        }
        if (state === "connected") {
          this.statusString = "You are connected.";
          this.status = "success";
        }
        if (state === "disconnecting") {
          this.statusString = "Disconnecting from Twilio…";
          this.conversationsReady = false;
          this.status = "default";
        }
        if (state === "disconnected") {
          this.statusString = "Disconnected.";
          this.conversationsReady = false;
          this.status = "warning";
        }
        if (state === "denied") {
          this.statusString = "Failed to connect.";
          this.conversationsReady = false;
          this.status = "error";
        }
      });
      this.conversationsClient.on(
        "conversationJoined",
        async (conversation) => {
          this.conversations = [...this.state.conversations, conversation];
          console.log("JOINED A NEW ONE", conversation)
          if (conversation.uniqueName.includes('|Announcement')) {
            let messageObj = await conversation.getMessages();
            for (let m of messageObj.items) {

              // this.announcements.push(m.state);
              //commit
              const { sid: id, body: message } = m.state;
              const { title, eventDate, eventTime, isEvent, groupName } = m.state.attributes;
              const dataAnnouncements = {
                id,
                title,
                message,
                options: "", // Default
                eventDate,
                eventTime,
                isEvent,
                convId: m.conversation.uniqueName,
                groupName,
                recipients: groupName ? groupName: "Everyone", // Default
              }

              this.announcements.push(dataAnnouncements);
              //console.log('Data Announcements:');
              //console.log(m.state);
              // console.log(dataAnnouncements);

              this.addAnnouncements(dataAnnouncements);
            }

            // console.log('State getAnnouncementData:')
            // console.log(this.getAnnouncementData);
          }

          //
          if (conversation.uniqueName.includes('|Chat')) {
            
            const messages = [];
            //let totalMessages = 0;

            let receivedMessagePaginator =(messagePaginator) => {
              //console.log("PAGINATOR", messagePaginator)
              //totalMessages += messagePaginator.items.length;
              messagePaginator.items.forEach(function (message) {

                messages.push(message);
              });
              // if (messagePaginator.hasNextPage) {
              //   messagePaginator.nextPage().then(receivedMessagePaginator);
              // } 

              // if (messagePaginator.hasPrevPage) {
              //   messagePaginator.prevPage().then(receivedMessagePaginator);
              // }
              //   console.log("Total Messages:" + totalMessages);
              
            }

            let messagez = await conversation.getMessages()
            receivedMessagePaginator(messagez);

            let name = this.nameLookup(conversation.uniqueName)
            let photo = this.photoLookup(conversation.uniqueName);
            const chat = {
              id: conversation.uniqueName,
              name: name,
              photo,
              // eslint-disable-next-line no-unused-vars
              message: messages.map(m => ({
                    time: m.state.timestamp,
                    stateChat: m.author,
                    message: m.state.body,
                    id: m.sid
              })),
              countNewMessage: 0,
            }

          //   {
          //     "sid": "IM9f52f251fa7340cbbf285c424347dc87",
          //     "index": 18,
          //     "author": "Admin",
          //     "subject": null,
          //     "body": "Tester",
          //     "timestamp": "2023-03-20T03:33:19.964Z",
          //     "dateUpdated": "2023-03-20T03:33:19.964Z",
          //     "lastUpdatedBy": null,
          //     "attributes": {
          //         "title": "Test Announcement",
          //         "dateOfEvent": "23/03/2023",
          //         "timeOfEvent": "23:35"
          //     },
          //     "type": "text",
          //     "media": null,
          //     "medias": null,
          //     "participantSid": "MB8b4d61a258e04846af43afd47324f53b",
          //     "aggregatedDeliveryReceipt": null
          // }

            // console.log('---------------------');
            // console.log(chat);
            // console.log('---------------------');

            this.setAdminContactList(chat);
            // console.log(this.getAdminMessage);

            // message: [
            //   {
            //     time: "13/12/2022 21:22:33",
            //     message: "Hi will like to know what to bring for the outing",
            //     stateChat: "receiver",
            //   },
            //   {
            //     time: "13/12/2022 21:22:33",
            //     message: "Just the essentials...towels, cloths and etc",
            //     stateChat: "sender",
            //   },
            //   {
            //     time: "13/12/2022 21:22:33",
            //     message: "also extra shoes!!",
            //     stateChat: "sender",
            //   },
            // ],

          }
        }
      );

      this.conversationsClient.on("conversationLeft", (thisConversation) => {
        this.conversations = [
          ...this.state.conversations.filter((it) => it !== thisConversation),
        ];
      });

      this.conversationsClient.on("messageAdded", (thisConversation) => {
        if (
          thisConversation.conversation.uniqueName ==
          this.everyoneAnnouncementRoom
        ) {
          this.announcements.push(thisConversation.state);
        }

        if (thisConversation.conversation.uniqueName.includes('|Chat')) {
          const chatRoom = thisConversation.conversation.uniqueName;
          const m = thisConversation.state; 
          this.sendAdminMessage({
            id: chatRoom,
            message: {
              time: m.timestamp,
              stateChat: m.author,
              message: m.body,
              id: m.sid
            }
          })
        }
      });

      this.conversationsClient.on("messageRemoved", (thisConversation) => {
        this.announcements = this.announcements.filter(
          (a) => a.sid !== thisConversation.state.sid
        );
      });

      this.conversationsClient.on("tokenAboutToExpire", async () => {
        const { data } = await this.$store.state.api.get('/chat');
        console.log("RENEWED")
        this.conversationsClient.updateToken(data.token);
      });
      this.conversationsClient.on("tokenExpired", async () => {
        const { data } = await this.$store.state.api.get('/chat');
        console.log("EXPIRED, RENEWED")
        this.conversationsClient.updateToken(data.token);
      });

      let a = await this.conversationsClient.getSubscribedConversations();
      this.state.conversations = a.items;
    },
    async prepareAxios() {
      let msalApp = this.$store.state.msalApp;

      if (!msalApp) {
        return;
      }

      let accounts = msalApp.getAllAccounts();
      if (accounts.length > 0) {
        msalApp.setActiveAccount(accounts[0]);
        this.$store.commit('msalApp', msalApp);
        this.$store.commit('currentAdmin', accounts[0]);
      }

      let { accessToken } = await msalApp.acquireTokenSilent({
        scopes: [
          `https://${this.$store.state.logindata.DATAVERSE_DOMAIN}/.default`
        ]
      });
      this.token = accessToken
      let result = axios.create({
        baseURL: `https://${this.$store.state.logindata.DATAVERSE_DOMAIN}/api/data/${this.$store.state.logindata.DATAVERSE_VERSION}`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Authorization': 'Bearer ' + accessToken,
          'Prefer': 'return=representation'
        }
      });
      this.$store.commit('axios', result);
    }
  },
  router,
  store,

}).$mount('#app')
