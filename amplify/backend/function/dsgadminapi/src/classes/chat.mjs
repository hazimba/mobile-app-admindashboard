import Twilio from "./twilio.mjs";
import msgraph from "./msgraph.mjs";

class Chat {
  chat = null;
  $ = null;
  constructor() {
    this.chat = new Twilio();
  }

  async initMsgraph() {
    if (!this.$) {
      this.$ = await msgraph.new_client();
    }
  }

  async checkChatExists(caregiverId, clientId) {
    await this.initMsgraph();
    let care = new URLSearchParams({
      $filter: `_crb5c_client_value eq ${clientId} and _crb5c_caregiver_value eq '${caregiverId}'`, //show list of clients with caregiver of this number
    });

    try {
      let {
        data: { value },
      } = await this.$.get(`/crb5c_fow_chats?${care.toString()}`);
      if (value?.value?.length) {
        return true
      }
      return false;
    } catch (e) {
      console.log("error fetching chat data", e);
      return false;
    }
  }

  async createChatRow(caregiverId, clientId, conversationSid) {
    try {
        let {
          data: { value },
        } = await this.$.post(`/crb5c_fow_chats`, {
            crb5c_caregiver: caregiverId,
            crb5c_client: clientId,
            crb5c_twiliochatsid: conversationSid
        });

        return value;
      } catch (e) {
        console.log("error creating chat data", e);
        return false;
      }
  }

  getChatToken(identity) {
    return this.chat.getChatToken(identity);
  }
}

export default Chat;
