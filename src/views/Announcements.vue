<template lang="pug">
TablePage(typePage="Announcements", :itemList="getAnnouncementData" :isShowSpinner="isShowSpinner")
</template>

<script>
// import TablePage from '../components/TablePage.vue';
import TablePage from "../components/TablePage.vue";
import { mapGetters } from "vuex";
import { TABLE } from "../store/ModuleName";

export default {
  name: "Announcements",
  data(){
    return {
      isShowSpinner: false,
    }
  },
  components: {
    // TablePage
    TablePage,
  },
  computed: {
    ...mapGetters(TABLE, ["getAnnouncementData"]),
  },
  watch: {
    getAnnouncementData(value){
      if(value.length === 0){
        this.isShowSpinner = true;
      }

      if(value.length !== 0){
        this.isShowSpinner = false;
      }
    }
  }
};
</script>

<style lang="scss"></style>
