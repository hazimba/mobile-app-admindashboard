<template lang="pug">
div
        b-modal(id="modal-lg" centered size="lg" title="Contact List" ok-only ok-variant="secondary" ok-title="Cancel")
            template
                b-container(class="container-fluid px-0")
                    b-row(class="justify-content-center" style="height: 60vh; max-height: 60vh; position: relative;" cols="1")
                        b-col(class="mb-4 d-flex align-items-center" style="height: 10%; max-height: 10%" cols="10")
                            BIconSearch(class="" style="position: absolute; left: 4%;")
                            input(class="pr-2 pl-5 py-2" style="width: 90%; border-radius: 20px;" type="text" v-model="searchInput"  placeholder="Search by name" @keyup="query")
                            //----- sort item
                            div(v-if="stateContactListSort === 'desc'" class="d-flex justify-content-center" style="width: 10%"  @click="sortContactList('desc')")
                                Icon(class="" style="font-size: 2.5rem;" icon="ic:twotone-sort" )
                            div(v-else-if="stateContactListSort === 'asc'" class="d-flex justify-content-center" style="width: 10%"  @click="sortContactList('asc')")
                                Icon(class="" style="font-size: 2.5rem;" icon="ic:twotone-sort" )
                            div(v-else class="d-flex justify-content-center" style="width: 10%"  @click="sortContactList('desc')")
                                Icon(class="" style="font-size: 2.5rem;" icon="ic:twotone-sort" )
                            //----- sort item
                        b-col(class="border border-dark px-0 overflow-auto" style="height: 80%; max-height: 80%; border-radius: 10px;" cols="10")
                            b-col(class="d-flex align-items-center border border-dark border-top-0 border-right-0 border-left-0 clickable" style="height: 22%; max-height: 22%;"  v-for="contact in cloneContactList" :key="contact.id" @click="moveToMessageChat(contact.id)" cols="12")
                                b-col(class="d-flex justify-content-center align-items-center" style="" cols="2")
                                    b-img( class="" v-bind="userImgSettings(contact.photo)" rounded="circle" alt="user_image")
                                b-col(cols="10")                                    
                                    span(class="text-dark" style="font-size: 1.5rem; font-weight: 600;")
                                        | {{contact.name}}
</template>

<script>
import { mapState } from "vuex";
import { MESSAGE } from "@/store/ModuleName";
import { Icon } from "@iconify/vue2";
import debounce from "lodash.debounce";

export default {
  name: "ModalContactList",
  props: {
    modalStateUserChat: {
      type: String,
      // default: 'admin',
      required: true,
    },
  },
  components: {
    Icon,
  },
  data() {
    return {
      cloneIsShow: false,
      choiceStateUserChat: ["admin", "programme"],
      
      searchInput: "",
      stateContactListSort: "",
      cloneContactList: [],
      queryingData: false,
    };
  },
  computed: {
    ...mapState(MESSAGE, ["contactList"]),
  },
  methods: {
    userImgSettings(photo) {
      let obj = {
        width: 60,
        height: 60,
        class: "m1",
      }

      photo ? obj.src = `data:image/png;base64,${photo}` : (obj.blank = true, obj.blankColor = '#777');
      return obj;
    },
    async query() {
      this.queryingData = true;
      await this.queryClient(this);
    },
    queryClient: debounce(async (ctx) => {
      let paramObj = {
        $expand: `crb5c_client($select=crb5c_no)`,
        $filter: `contains(crb5c_client/crb5c_no,'${ctx.searchInput}') or contains(crb5c_name, '${ctx.searchInput}')`,
      };

      let params = new URLSearchParams(paramObj);
      let {data} = ctx.$store.state.axios.get(`/crb5c_fow_caregivers/?${params.toString()}`);
      console.log(data)
      ctx.queryingData = false;
    }, 1000),
    initContactList() {
      if (this.modalStateUserChat === this.choiceStateUserChat[0]) {
        this.initAdminCloneContactList();
        return;
      }

      if (this.modalStateUserChat === this.choiceStateUserChat[1]) {
        this.initProgrammeStaffCloneContactList();
        return;
      }
    },
    initAdminCloneContactList() {
      this.cloneContactList = this.contactList.admin;
    },
    initProgrammeStaffCloneContactList() {
      this.cloneContactList = this.contactList.programmeStaff;
    },
    sortContactList(sortType) {
      if (sortType === "desc") {
        this.cloneContactList.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });

        this.stateContactListSort = "asc";
      }

      if (sortType === "asc") {
        this.cloneContactList.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        this.stateContactListSort = "desc";
      }
    },
    searchCloneContactList(value) {
      const search = value.toLowerCase();
      const regex = new RegExp(search, "");

      this.cloneContactList = this.cloneContactList.filter((el) => {
        return regex.test(el.name.toLowerCase());
      });

      if (this.cloneContactList.length === 0) {
        this.cloneContactList.push({
          id: "None",
          name: "No search results",
          time: "",
          message: [],
          countNewMessage: 0,
        });
      }
    },
    moveToMessageChat(id) {
      if (id === "None") {
        return;
      }
      this.$router.push({ path: `/chat/${this.modalStateUserChat}/${id}` });
    },
  },
  watch: {
    isShow(value) {
      console.log(value);
      this.cloneIsShow = !value;
    },
    modalStateUserChat() {
      if (this.modalStateUserChat === this.choiceStateUserChat[0]) {
        this.initAdminCloneContactList();
        return;
      }

      if (this.modalStateUserChat === this.choiceStateUserChat[1]) {
        this.initProgrammeStaffCloneContactList();
        return;
      }
    },
    searchInput(value) {
      if (value === "") {
        this.initContactList();
        return;
      }

      if (value !== "") {
        this.searchCloneContactList(value);
        return;
      }
    },
  },
  mounted() {
    this.initContactList();
  },
};
</script>
