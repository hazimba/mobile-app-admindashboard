<template lang="pug">
    b-container(style="height: 100vh;")
        b-row(class="justify-content-start align-items-center" style="height: 20%;" cols="12")
            b-col(class="col-3 d-flex justify-content-start" @click="moveToHomePage")
                b-img(class="" :src="DSG_logo", width="128px" alt="DSG Logo")
            b-col(class="col-5")
                span(class="font-weight-bold" style="font-size: 1.3rem;")
                    | FOW Message
            b-col(class="col-4 d-flex justify-content-end")
                b-button(class="" :style="`background-color: ${btnClickedColor}`" @click="moveToHomePage")
                    | Back to Homepage
        b-row(class="h-chat-md h-chat-lg h-chat-xl align-items-md-end align-items-lg-end align-items-xl-end" style="height: 80vh")
            b-col(class="col-12 border border-dark" style="height: 83vh;")
                b-row(class="align-items-center justify-content-center" :style="`height: 15%; max-height: 15%; background-color: ${btnColor}`")
                    b-col(class="col-2")
                        b-img(v-bind="userImgSettings(messageData.photo)" class="" rounded="circle" alt="user_image")
                    b-col(class="col-10 text-left text-white")
                        span(class="font-weight-bold" style="font-size: 1.5rem;")
                            | {{ messageData.name }}
                b-row(class="bg-white" style="height: 70%; max-height: 70%;")
                    b-col(class="autoScroll py-3" style="overflow: auto;")
                        b-row(v-for="chat in messageData.message" :key="chat.id" :class="`px-4 mb-2 ${chat.stateChat === myParticipantId ? '' : 'justify-content-end'}`" style="min-height: 7rem;")
                            b-col(v-if="chat.stateChat === myParticipantId" class="col-5 py-2" :style="`border-radius: 12px; background-color: ${receiverColor}`")
                                b-row(class="mb-2")
                                    b-col(class="col-12 d-flex text-left")
                                        span(class="text-left")
                                            | {{messageData.name}} @ {{ formatTime(chat.time) }}
                                b-row(class="" style="height: 80%;")
                                    b-col(class="col-12 text-left")
                                        p(class="font-weight-bold" style="font-size: 1.1rem;")
                                            | {{ chat.message }}
                            b-col(v-else class="col-5 py-2" :style="`border-radius: 12px; background-color: ${btnColor}`")
                                b-row(class="mb-2")
                                    b-col(class="col-12 d-flex align-items-center justify-content-end")
                                        span(class="text-white")
                                            | {{ formatTime(chat.time) }}
                                b-row(class="" style="height: 80%;")
                                    b-col(class="col-12 text-left")
                                        p(class="font-weight-bold text-white" style="font-size: 1.3rem;")
                                            | {{ chat.message }}
                                            
                b-row(class="justify-content-center align-items-center" style="height: 15%; max-height: 15%;")
                    b-col(class="col-10")
                        input(class="px-3 text-white w-100" :style="`border-radius: 20px; height: 3rem; background-color: ${inputChatColor}`" type="text" placeholder="Type your message here..." v-model="messageInput" @keyup.enter="sendMessage")
                    b-col(class="col-1 text-left" @click="sendMessage")
                        Icon(class="" icon="ic:round-send" :style="`width: 2.5rem; height: 2.5rem; color: ${btnColor}`")
</template>
<script>
import moment from "moment";
import DSG_logo from "@/assets/Images/DSG_logo.png";
import { Icon } from "@iconify/vue2";
import { MESSAGE } from "@/store/ModuleName";
import { mapState, mapMutations, mapActions } from "vuex";
import {
  DATE_PATTERN_FORMAT,
  TIME_PATTERN_FORMAT,
  formatTimeFromDate,
} from "@/assets/Utilities/helperFunction";
export default {
  name: "MessageChat",
  components: {
    Icon,
  },
  data() {
    return {
      DSG_logo,
      btnColor: "rgb(118, 80, 137)",
      receiverColor: "#d9d9d9",
      inputChatColor: "#858585",
      user: this.$route.params.typeUser,
      id: this.$route.params.id,
      choiceStateUserChat: ["admin", "programme"],
      messageInput: "",
      messageData: [
        {
          time: "",
          message: "",
          stateChat: "",
        },
      ],
    };
  },
  computed: {
    myParticipantId() {
      let idSplit = this.id?.split('|');
      return idSplit ? `${idSplit[0]}|${idSplit[1]}` : null;
    },  
    ...mapState(MESSAGE, ["contactList"]),
    listMessage: {
      get () {
        const admin = this.$store.state[MESSAGE].contactList.admin;
        return admin.find(item => item.id === this.id);
      },
      // set: function(value) {

      // }
    }
  },
  methods: {
    userImgSettings(photo) {
      let obj = {
        width: 70,
        height: 70,
        class: "my-2",
      }

      photo ? obj.src = `data:image/png;base64,${photo}` : (obj.blank = true, obj.blankColor = '#777');
      return obj;
    },
    ...mapMutations(MESSAGE, ["sendProgrammeStaffMessage"]),
    ...mapActions(MESSAGE, ["sendAdminMessage"]),
    formatTime(date) {
      return formatTimeFromDate(date);
    },
    moveToHomePage() {
      this.$router.push({ path: "/" });
    },
    moveToPreviousPage() {
      this.$router.push({ path: "/messages" });
    },
    sendMessage() {
      if (this.messageInput === "") {
        return;
      }

      const timeMessage = moment()
        .format(
          `${DATE_PATTERN_FORMAT} ${TIME_PATTERN_FORMAT}`
        )
        .toString();

      const message = {
        time: timeMessage,
        stateChat: "sender",
        message: this.messageInput,
      };

      if (this.user === this.choiceStateUserChat[0]) {

        const splittedSenderId = this.id.split('|');
        const senderId = `${splittedSenderId[1]}|${splittedSenderId[0]}`;
        this.sendAdminMessage({
          id: this.id,
          chatRoomId: this.id,
          senderId,
          msg: this.messageInput,
          admin: this.$store.state?.currentAdmin?.name
        });
      }

      if (this.user === this.choiceStateUserChat[1]) {
        this.sendProgrammeStaffMessage({
          id: this.id,
          message,
          admin: this.$store.state?.currentAdmin?.name
        });
      }

      this.scrollChatToBottom();

      this.messageInput = "";
    },
    scrollChatToBottom() {
      const chatHolder = document.querySelector(".autoScroll");
      setTimeout(() => {
        chatHolder.scrollTop = chatHolder.scrollHeight;
      }, 50);
    },
  },
  mounted() {
    if (this.user === this.choiceStateUserChat[0]) {
      const messageIndex = this.contactList.admin.findIndex((item) => {
        return item.id === this.id;
      });

      this.messageData = this.contactList.admin[messageIndex];
    }

    if (this.user === this.choiceStateUserChat[1]) {
      const messageIndex = this.contactList.programmeStaff.findIndex((item) => {
        return item.id === this.id;
      });

      this.messageData = this.contactList.admin[messageIndex];
    }

    this.scrollChatToBottom();
  },
  watch: {
    "messageData.message": {
      handler() {
        this.scrollChatToBottom();
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.autoScroll {
  max-height: 60vh;
  min-height: 60vh;
}

::-webkit-input-placeholder {
  color: #fff;
}

input:focus {
  outline: none !important;
  border: 2px solid #000;
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .h-header-md {
    height: 20%;
    max-height: 20%;
  }
  .h-chat-md {
    height: 80%;
    max-height: 80%;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .h-header-lg {
    height: 10%;
    max-height: 10%;
  }
  .h-chat-lg {
    height: 90%;
    max-height: 90%;
  }
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .h-header-xl {
    height: 20%;
    max-height: 20%;
  }
  .h-chat-xl {
    height: 80%;
    max-height: 80%;
  }
}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {
}
</style>
