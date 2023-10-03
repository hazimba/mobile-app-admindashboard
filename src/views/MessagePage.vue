<template lang="pug">
    b-container(style="height: 99vh;")
        b-row(class="justify-content-start align-items-center" style="height: 20%;" cols="12")
            b-col(class="col-3 d-flex justify-content-start" @click="moveToHomePage")
                b-img(class="" :src="DSG_logo", width="128px" alt="DSG Logo")
            b-col(class="col-5")
                span(class="font-weight-bold" style="font-size: 1.3rem;")
                    | FOW Message
            b-col(class="col-4 d-flex justify-content-end")
                b-button(class="" :style="`background-color: ${btnClickedColor}`" @click="moveToHomePage")
                    | Back to Homepage
        b-row(class="justify-content-center")
            b-col(class="col-12 d-flex align-items-center" style="gap: 1rem;")
                ModalContactList(:modalStateUserChat="stateUserChat")
                div(class="" style="cursor: pointer;" @click="openModal")
                    Icon(class="font-weight-bold" style="width: 1.5rem; height: 1.5rem;" icon="material-symbols:chat-add-on-outline")
                span(class="font-weight-bold" style="font-size: 1.2rem; cursor: pointer;" @click="openModal")
                    | New Message
        b-form-group(class="px-4 py-0")
          p(class="mt-2 mb-1 ml-1 text-left") Group:
          v-select(class="mx-3" :options="unselectedGroups" :reduce="s => ({id: s.id, name: s.name})" v-model="filteringGroup" multiple label="name")
        p(class="mt-2 mb-1 ml-4 text-left") Search:
        b-row(class="justify-content-center align-items-center" style="height: 5%;")
            b-col(class="col-11 d-flex align-items-center" style="position: relative;")
                BIconSearch(style="position: absolute; left: 30px;")
                input(class="pl-5 pr-1 py-1" style="width: 100%; border-radius: 20px;" type="text" placeholder="Search by name" v-model="inputSearchMessage")
            //- //--------------- sort item
            //- b-col(v-if="stateSort === 'desc'" class="col-1" @click="sortMessage('desc')")
            //-     Icon(class="" style="width: 3rem; height: 3rem;" icon="ic:twotone-sort")
            //- b-col(v-else-if="stateSort === 'asc'" class="col-1" @click="sortMessage('asc')")
            //-     Icon(class="" style="width: 3rem; height: 3rem;" icon="ic:twotone-sort")
            //- b-col(v-else class="col-1" @click="sortMessage('desc')")
            //-     Icon(class="" style="width: 3rem; height: 3rem;" icon="ic:twotone-sort")
            //--------------- sort item
        b-row(v-if="false" class="flex-column" style="height: 10%;")
            b-col(v-if="stateUserChat === choiceStateUserChat[0]" class="col-12 d-flex justify-content-center align-items-center" style="gap: 4rem;")
                b-button(class="font-weight-bold text-white" :style="`font-size: 1.2rem; height: 55%; width: 20%; border-radius: 20px; background-color: ${btnClickedColor}`" @click="selectUserChat(choiceStateUserChat[0])")
                    | Admin
                b-button(class="font-weight-bold text-dark" :style="`font-size: 1.2rem; height: 55%; border-radius: 20px; background-color: ${notActiveBtnColor}`" @click="selectUserChat(choiceStateUserChat[1])")
                    | Programme Staff (WIP)
            b-col(v-else-if="stateUserChat === choiceStateUserChat[1]" class="d-flex justify-content-center align-items-center" style="gap: 4rem;")
                b-button(class="font-weight-bold text-dark" :style="`font-size: 1.2rem; height: 55%; width: 20%; border-radius: 20px; background-color: ${notActiveBtnColor}`" @click="selectUserChat(choiceStateUserChat[0])")
                    | Admin
                b-button(class="font-weight-bold text-white" :style="`font-size: 1.2rem; height: 55%; border-radius: 20px; background-color: ${btnClickedColor}`" @click="selectUserChat(choiceStateUserChat[1])")
                    | Programme Staff (WIP)
        b-row(class="justify-content-center mt-3" style="height: 50%;")
            b-col(class="col-11 px-0  border border-dark" style="border-radius: 10px; height: 90%; max-height: 90%; overflow: auto;")
                b-row(class="w-100 h-md h-lg h-xl h-xxl mx-auto justify-content-center align-items-center border border-dark border-top-0 border-left-0 border-right-0" style="cursor: pointer; position: relative;" 
                v-for="chat in listMessages" :key="chat.id" @click="moveToMessageChat(chat.id)")
                    div(v-if="chat.countNewMessage === 0" class="text-white font-weight-bold d-none justify-content-center align-items-center" style="background-color: red; position: absolute; border-radius: 50px; width: 1.5rem; height: 1.5rem; right: 0; top: -1%; ")
                        | 
                    div(v-else class="text-white font-weight-bold d-flex justify-content-center align-items-center" style="background-color: red; position: absolute; border-radius: 50px; width: 1.5rem; height: 1.5rem; right: 0;5%; top: -1%; ")
                        | {{ chat.countNewMessage }}
                    b-col(class="col-2")
                        b-img(v-bind="userImgSettings(chat.photo)" rounded="circle" alt="user image")
                    b-col(class="col-7 text-left")
                        span(class="font-weight-bold" style="font-size: 1.3rem;")
                            | {{ chat.name }}
                    b-col(class="col-3")
                        span(class="")
                            | {{ lastMessageTime(chat) }}
                

        

</template>
<script>
import axios from 'axios';
import DSG_logo from "@/assets/Images/DSG_logo.png";
import { Icon } from "@iconify/vue2";
import { MESSAGE } from "@/store/ModuleName";
import { mapGetters, mapMutations } from "vuex";
import ModalContactList from "@/components/ModalContactList.vue";
import moment from "moment";

export default {
  name: "Messagepage",
  data() {
    return {
      groupList: [],
      fetchingGroupList: '',
      filteringGroup: [],
      DSG_logo,
      activeBtnColor: "#903EB8",
      btnClickedColor: "#7C359F",
      notActiveBtnColor: "#D9D9D9",
      choiceStateUserChat: ["admin", "programme"],
      stateUserChat: "admin",
      stateContactListSort: "",
      stateSort: "",
      cloneContactList: [],
      contactHasMessageList: [],
      inpurSearchContactList: "",
      inputSearchMessage: "",
      resultSearchContactList: [],
      resultSearchMessageList: [],
    };
  },
  components: {
    Icon,
    ModalContactList,
  },
  computed: {
    unselectedGroups() {
      return this.groupList?.filter(g => !this.filteringGroup.find(tg => tg.id === g.id)) || this.groupList
    },
    // ...mapState(MESSAGE, ["contactList"]),
    ...mapGetters(MESSAGE, [
      "getAdminMessage",
      "getAdminTotalCountMessage",
      "getProgrammeStaffTotalCountMessage",
    ]),
    listMessages: {
      get () {
        const admin = this.$store.state[MESSAGE].contactList.admin
        admin.sort((a,b) => {
          if (a.message.length && !b.message.length) {
            return -1;
          }

          if (!a.message.length && b.message.length) {
            return 1;
          }

          if (a.message.length && b.message.length) {
            let lastMessageTimeA = a.message?.[a.message.length-1]?.time;
            let lastMessageTimeB = b.message?.[b.message.length-1]?.time;
            if (lastMessageTimeA >= lastMessageTimeB) {
              return -1;
            } else {
              return 1;
            }
          }

          return 0;
        });
        let filtered = [];
        admin.forEach(a => {
          let cli_id = a.id.split('|')[1];

          for (let g of this.groupList) {
            if (this.filteringGroup.find(f => f.id === g.id)) {
              for (let cli of g.clients) {
                if (cli.crb5c_fow_customerid === cli_id) {
                  filtered.push(a);
                }
              }
            }
          }
        });
        const filtering = this.filteringGroup.length
        return filtering ? 
          filtered.filter(item => item.name.toLowerCase().includes(this.inputSearchMessage.toLowerCase())) :
          admin.filter(item => item.name.toLowerCase().includes(this.inputSearchMessage.toLowerCase()))
      },
      set: function(value) {
        this.contactHasMessageList = value;
      }
    },
  },
  methods: {
    userImgSettings(photo) {
      let obj = {
        width: 65,
        height: 65,
        class: "m1",
      }

      photo ? obj.src = `data:image/png;base64,${photo}` : (obj.blank = true, obj.blankColor = '#777');
      return obj;
    },
    lastMessageTime(chat) {
      if (chat?.message?.length) {
        let time = chat.message?.[chat.message.length-1]?.time;
        return moment(time).format("DD/MM/YYYY h:mm A");
      }
      return ''
    },
    ...mapMutations(MESSAGE, ["setAdminContactList"]),
    openModal() {
      this.$bvModal.show("modal-lg");
    },
    initAdminContactHasMessageList() {
      console.log(this.getAdminMessage);
      this.contactHasMessageList = this.getAdminTotalCountMessage;
    },
    initProgrammeStaffContactHasMessageList() {
      this.contactHasMessageList = this.getProgrammeStaffTotalCountMessage;
    },
    selectUserChat(typeUser) {
      if (typeUser === this.choiceStateUserChat[0]) {
        this.stateUserChat = this.choiceStateUserChat[0];
        this.initAdminContactHasMessageList();
        return;
      }

      if (typeUser === this.choiceStateUserChat[1]) {
        this.stateUserChat = this.choiceStateUserChat[1];
        this.initProgrammeStaffContactHasMessageList();
        return;
      }
    },
    sortMessage(sortType) {
      if (sortType === "desc") {
        this.contactHasMessageList.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });

        this.stateSort = "asc";
      }

      if (sortType === "asc") {
        this.contactHasMessageList.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        this.stateSort = "desc";
      }
    },
    searchContactHasMessageList() {
      // const search = value.toLowerCase();
      // const regex = new RegExp(search, "");

      // this.contactHasMessageList = this.contactHasMessageList.filter((el) => {
      //   return regex.test(el.name.toLowerCase());
      // });

      // if (this.contactHasMessageList.length === 0) {
      //   this.contactHasMessageList.push({
      //     id: "1",
      //     name: "No search results",
      //     time: "",
      //     message: [],
      //     countNewMessage: 0,
      //   });
      // }
    },
    moveToHomePage() {
      this.$router.push({ path: "/" });
    },
    moveToMessageChat(id) {
      this.$router.push({ path: `/chat/${this.stateUserChat}/${id}` });
    },
  },
  watch: {
    listMessages(value){
      this.contactHasMessageList = value;
    }
  },
  async mounted() {
    this.initAdminContactHasMessageList();
    this.stateUserChat = this.choiceStateUserChat[0];
    this.fetchingGroupList = true;
    let {data} = await axios.get('/api/every_group');
    
    if (data?.sessions) {
      this.groupList = data.sessions.map(s => {
        return {
          name: s.crb5c_session_id,
          id: s.crb5c_fow_session_scheduleid,
          clients: s.crb5c_FOW_Customer_session_schedule_crb5c
        }
      })
    }
  },
};
</script>
<style lang="scss">
// .text-responsive {
//   font-size: calc(50% + 0.5vw + 0.5vh);
// }

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .h-md {
    height: 25%;
    max-height: 25%;
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .h-lg {
    height: 30%;
    max-height: 30%;
  }
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .h-xl {
    height: 25%;
  }
}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {
  .h-xxl {
    height: 35%;
    max-height: 35%;
  }
}
</style>
