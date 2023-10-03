<template lang="pug">
    b-container(style="height: 77vh;")
        b-row(class="align-items-center" style="height: 20%; position: relative;")
            b-alert(class="w-100" style="position: absolute; top: 1%; font-size: 1.5rem;" variant="danger" :show="alert.dismissCountDown" fade dismissible @dismissed="alert.dismissCountDown=0" @dismiss-count-down="callAlert")
                | {{ alert.alertMessage }}
            b-col(class="col-3 text-left")
                b-img(class="" :src="DSG_logo", width="120px" alt="DSG Logo" @click="moveToHomePage")
            b-col(class="col-6")
                span(class="font-weight-bold" style="font-size: 1.5rem;")
                    | {{ typePage }}
            b-col(class="col-3 text-right")
                b-button(class="" @click="moveToHomePage" :style="`background-color: ${buttonColor}`")
                    | Back to Homepage
        b-row(class="justify-content-center align-items-center" style="height: 3%;")
            b-col(class="col-12 d-flex align-items-center" style="position: relative;")
                BIconSearch(style="position: absolute; left: 30px")
                b-input(class="pr-1 pl-5 border border-dark" style="border-radius: 20px;" placeholder="Search announcement" v-model="inputSearchItemList")
            //- b-col(v-if="stateSort === 'desc'" class="col-1 clickable" @click="sortItem('desc')")
            //-     Icon(icon="ic:twotone-sort" style="font-size: 2.5rem;")
            //- b-col(v-else-if="stateSort === 'asc'" class="col-1" @click="sortItem('asc')")
            //-     Icon(icon="ic:twotone-sort" style="font-size: 2.5rem;")
            //- b-col(v-else class="col-1" @click="sortItem('desc')")
            //-     Icon(icon="ic:twotone-sort" style="font-size: 2.5rem;")
        b-row(class="align-items-center mt-2" style="height: 10%;")
            b-col(class="col-12 d-flex justify-content-start align-items-center clickable mt-3" style="gap: 1rem;" @click="moveToForm")
                Icon(icon="material-symbols:add-box-outline" style="font-size: 2rem;")
                span(class="text-left")
                    | Add new {{ typePage.toLowerCase() }}
            //- b-col(class="col-3 text-left")
        b-row(class="pt-0")
            b-spinner(v-if="isShowSpinner" variant="success" style="z-index: 5; position: absolute; top: 50%; left: 50%;")
            b-col(class="col-12" style="max-height: 67vh; overflow-y: scroll; border-bottom: 1px solid black; margin-left: 0px;padding: 0px;")
                b-table-simple(class="border border-dark text-left" style="margin-bottom: 0px; border-bottom: unset !important")
                    b-thead(class="text-white" :style="`background-color: ${buttonColor}; position: sticky; top: -1px;`")
                        b-th(class="px-4" colspan="1")
                            | Title
                        b-th(class="px-4" colspan="1")
                            | Message
                        b-th(class="px-2" colspan="1")
                            | Event Date
                        b-th(class="px-4" colspan="1")
                            | Recipients
                        b-th(class="px-4" colspan="1")
                            | 
                        b-th(class="px-4" colspan="1")
                            |
                    b-tbody()
                        b-tr(class="" v-for="item in cloneItemList" :key="item.index")
                            b-td(
                              class="px-4 py-3" 
                              style="max-width: 300px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
                              v-b-popover.hover="item.title" title="Title"
                              )
                                | {{item.title}}
                            b-td(
                              class="px-4 py-3" 
                              style="max-width: 400px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
                              v-b-popover.hover="item.message" title="Description"
                              )
                                | {{item.message}}
                            b-td(class="px-4 py-3")
                                | {{ showDate(item.eventDate, item.isEvent) }}
                            b-td(class="px-4 py-3")
                                | {{item.recipients}}
                            b-td(class="px-4 py-3")
                                div(class="clickable" @click="editItem(item.id)")
                                    Icon(icon="lucide:pencil" style="width:1.5rem; height: 1.5rem;")
                            b-td(class="px-4 py-3")
                                div(class="clickable" @click="deleteItem(item.id, item.convId)")
                                    ModalDeleteConfirmation(:itemId="item.id" :tableType="typePage" :convId="item.convId" @alert-delete="callAlert" @notify-id="constructAlertMessage")
                                    Icon(icon="tabler:trash-x" style="width:1.5rem; height: 1.5rem;")
</template>
<script>
import moment from "moment";
import DSG_logo from "@/assets/Images/DSG_logo.png";
import { BIconSearch, BIconXLg } from "bootstrap-vue";
import { Icon } from "@iconify/vue2";
import ModalDeleteConfirmation from "@/components/ModalDeleteConfirmation.vue";
import { dynamicDeleteModalName } from "@/assets/Utilities/helperModal";
import { TABLE } from "../store/ModuleName";
import { mapActions} from "vuex";
export default {
  name: "TablePage",
  components: {
    BIconSearch,
    BIconXLg,
    Icon,
    ModalDeleteConfirmation,
  },
  props: {
    typePage: {
      type: String,
      required: true,
    },
    itemList: {
      type: Array,
      default() {
        return [
          {
            id: "1",
            title: "",
            message: "No data here",
            date: "",
            recipients: "",
          },
        ];
      },
    },
    isShowSpinner: {
      type: Boolean,
      default(){
        return false;
      }
    },
  },
  data() {
    return {
      DSG_logo,
      buttonColor: "rgb(118, 80, 137)",
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: true,
        alertMessage: "",
      },
      inputSearchItemList: "",
      stateSort: "",
      searchResult: [],
      cloneItemList: this.itemList,
      convId: null
    };
  },
  methods: {
    showDate(eventDate, isEvent = true) {
      if (!eventDate || !isEvent) {
        return 'Not an event'
      }
      if (eventDate?.includes('-')) {
        return this.$root.dayjs(eventDate, 'YYYY-MM-YYYY').format('DD/MM/YYYY')
      }
      if (eventDate === "Invalid date" || eventDate === "No Date") return "Not an event"

      return eventDate;
    },
    ...mapActions(TABLE, ["removeAnnouncement"]),
    moveToHomePage() {
      this.$router.push({ path: "/" });
    },
    moveToForm() {
      if (this.typePage === "Announcements") {
        this.$router.push({ path: "/form/Announcements" });
      }

      if (this.typePage === "Reminders") {
        this.$router.push({ path: "/form/Reminders" });
      }
    },
    callAlert() {
      const SECOND = 3;
      this.alert.dismissCountDown = SECOND;
    },
    constructAlertMessage(id) {
      this.removeAnnouncement({"action": "remove", msgid:id, convId: this.convId});
      this.alert.alertMessage = `${this.typePage} ID: ${id} deleted.`;
    },
    editItem(id) {
      this.$router.push({ path: `/formEdit/${this.typePage}/${id}` });
    },
    deleteItem(id, convId) {
      this.convId = convId;
      this.$bvModal.show(dynamicDeleteModalName(id));
    },
    sortItem(sortType) {
      this.cloneItemList.forEach((el) => {
        el.date = moment(el.date, "DD/MM/YYYY").toDate().getTime();
      });

      if (sortType === "asc") {
        this.cloneItemList.sort((a, b) => {
          return a.date - b.date;
        });

        this.stateSort = "desc";
      }
      if (sortType === "desc") {
        this.cloneItemList.sort((a, b) => {
          return b.date - a.date;
        });

        this.stateSort = "asc";
      }
    },
    searchItems() {
      const search = this.inputSearchItemList.toLowerCase();
      const regex = new RegExp(search, "");

      this.cloneItemList = this.cloneItemList.filter((item) => {
        return regex.test(item.title.toLowerCase()) || regex.test(item.message.toLowerCase());
      });

      if (this.cloneItemList.length === 0) {
        

        return;
      }
    },
    clearSearchResults() {
      this.inputSearchItemList = "";

      // making axios request back
      this.cloneItemList = this.itemList;
    },
    testClickIcon() {
      console.log("hello");
    },
  },
  watch: {
    inputSearchItemList(value) {
      if (value === "") {
        this.clearSearchResults();
        return;
      }

      if (value !== "") {
        this.searchItems();
        return;
      }
    },
    itemList(value){
      this.cloneItemList = value;
    }
  },
};
</script>
<style lang="scss">
.clickable {
  cursor: pointer;
  
}</style>
