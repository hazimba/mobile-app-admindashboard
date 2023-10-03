<template lang="pug">
b-container(style="height: 100vh;")
        b-row(class="align-items-center" style="height: 20%;")
            b-col(class="col-3 text-left")
                b-img(class="" :src="DSG_logo", alt="DSG Logo" @click="moveToHomePage")
            b-col(class="col-6")
                span(class="font-weight-bold" style="font-size: 2rem;")
                    | {{ formType }}
            b-col(class="col-3 text-right")
                b-button(class="" :style="`background-color: ${buttonColor}`" @click="moveToPreviousPage")
                    | Back to {{ formType }} page
        b-row(class="flex-column" style="height: 15%;")
          b-col(class="d-flex align-items-center")
            span(class="")
              | Type of assessment:
          //----------- btn type of assessment
          //---- Everyone
          b-col(v-if="stateTypeOfAssessment === typeAssessment[0]" class="d-flex align-items-center" style="gap: 2rem;")
            span(class="")
              | Send to:
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[0])")
              Icon(icon="icon-park-outline:correct" class="mr-2" style="height: 10px; width: 10px;")
              | Everyone
            //- b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[1])")
            //-   | Individual
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[2])")
              | Group
          //---- Individual
          b-col(v-else-if="stateTypeOfAssessment === typeAssessment[1]" class="d-flex align-items-center" style="gap: 2rem;")
            span(class="")
              | Send to:
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[0])")
              | Everyone
            //- b-button(class="font-weight-bold " :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${buttonColor};`" @click="selectTypeAssessment(typeAssessment[1])")
            //-   Icon(icon="icon-park-outline:correct" class="mr-2" style="height: 10px; width: 10px;")
            //-   | Individual
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[2])")
              | Group
          //---- Group
          b-col(v-else-if="stateTypeOfAssessment === typeAssessment[2]" class="d-flex align-items-center" style="gap: 2rem;")
            span(class="")
              | Send to:
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor};`" @click="selectTypeAssessment(typeAssessment[0])")
              | Everyone
            //- b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[1])")
            //-   | Individual
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${buttonColor};`" @click="selectTypeAssessment(typeAssessment[2])")
              Icon(icon="icon-park-outline:correct" class="mr-2" style="height: 10px; width: 10px;")
              | Group
          b-col(v-else class="d-flex align-items-center" style="gap: 2rem;")
            span(class="")
              | Send to:
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[0])")
              | Everyone
            //- b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[1])")
            //-   | Individual
            b-button(class="font-weight-bold" :style="`width: 17%; height: 60%; border-radius: 20px; background-color: ${notActiveButtonColor}; color: ${buttonColor}`" @click="selectTypeAssessment(typeAssessment[2])")
              | Group
        //----------- btn type of assessment
        b-row(class="" style="height: 65%;")
          b-col(class="col-12")
            b-form(class="h-100" @submit.prevent="sendAnnouncementForm")
              b-row(class="")
                //- Caregiver
                b-col(v-if="stateTypeOfAssessment === typeAssessment[1]" class="col-12 text-left")
                  b-form-group(class="" for="FormPage__tagForm" label="Caregiver(s):")
                    b-form-tags#tags-with-dropdown.mb-2(input-id="FormPage__tagForm" class="" v-model="typeOfAssessment.individual.caregiver" required)
                      template(v-slot='{ tags, disabled, addTag, removeTag }')
                        ul.list-inline.d-inline-block.mb-2(v-if='tags.length > 0')
                          li.list-inline-item(v-for='tag in tags' :key='JSON.parse(tag)')
                            b-form-tag(@remove='removeTag(tag)' class="mt-1" :title='JSON.parse(tag).label' :disabled='disabled' variant='primary') {{ JSON.parse(tag).label}}
                        
                        b-dropdown(size='sm' variant='outline-secondary' block='' menu-class='w-100')
                          b-overlay(:show="queryingData" class="my-3")
                          template(#button-content='')
                            b-icon(icon='tag-fill')
                            |  Choose caregiver(s)
                          b-dropdown-form(@submit.stop.prevent='() => {}')
                            b-form-group.mb-0(label='Search caregiver(s)' label-for='tag-search-input' label-cols-md='auto' label-size='sm' :description='searchDesc' :disabled='disabled')
                              b-form-input#tag-search-input(v-model="searchInput" type='search' size='sm' autocomplete='off' @keyup="query")
                          b-dropdown-divider
                          b-dropdown-item-button(v-for='option in availableOptions' :key='option' @click='onOptionClick({ option, addTag })')
                            | {{ option.label }}
                          b-dropdown-text(v-if='availableOptions.length === 0')
                            | There are no caregiver(s) available to select

                b-col(v-else-if="stateTypeOfAssessment === typeAssessment[2]" class="col-6 text-left")
                  b-form-group(class="" label="Group:")
                    v-select(:options="unselectedGroups" :reduce="s => ({id: s.id, name: s.name})" v-model="typeOfAssessment.group.group" multiple label="name")
                    
              //- Title input
              b-row(class="")
                b-col(class="col-12 text-left")
                  b-form-group(class="" for="FormPage__titleForm" label="Title (required)")
                      b-form-input(class="" id="FormPage__titleForm" v-model="conditionTitle" required)
              //- Message input
              b-row(class="")
                b-col(class="col-12 text-left")
                  b-form-group(class="" for="FormPage__messageForm" label="Message (required)")
                    b-form-textarea(class="" id="FormPage__messageForm" rows="2" max-rows="4" v-model="conditionMessage" required)
                    //- Date and time event
              b-row()
                b-form-group 
                  b-form-checkbox(v-model="isEvent") This is an event with Date & Time information
              b-row(class="" v-if="isEvent")
                b-col(class="col-7 d-flex text-left" style="gap: 2rem;")
                  b-form-group(class="w-50" for="FormPage__dateEventForm" label="Date of event:")
                      b-form-input(class="" id="FormPage__dateEventForm" type="date" v-model="conditionEventDate" required)
                  b-form-group(class="w-50" for="FormPage__timeEventForm" label="Time of event:")
                      b-form-input(class="" id="FormPage__timeEventForm" type="time" v-model="conditionEventTime" required)
              //- //- Options input
              //- b-row(class="")
              //-   b-col(class="col-12 text-left")
              //-     b-form-group(class="" for="FormPage__optionsForm" label="Options: ")
              //-       b-form-checkbox(class="" id="FormPage__optionsForm" name="Checkbox-schedule-assessment" value="1" v-model="conditionOptions" unchecked-value="0")
              //-         | Schedule {{ formType.toLowerCase() }}
              //- //- Date and Time input
              //- b-row(class="")
              //-   b-col(class="col-7 d-flex text-left" style="gap: 2rem;")
              //-     b-form-group(class="w-50" for="FormPage__dateForm" label="Date:")
              //-         b-form-input(class="" id="FormPage__dateForm" type="date" v-model="conditionDate")
              //-     b-form-group(class="w-50" for="FormPage__timeForm" label="Time:")
              //-         b-form-input(class="" id="FormPage__timeForm" type="time" v-model="conditionTime")
              div(class="d-flex align-items-center justify-content-center" style="height: 20%;")
                b-button(class="font-weight-bold" :style="`width: 20%; height: 35%; border-radius: 20px; background-color: ${buttonColor}`" type="submit")
                  | Send
</template>
<script>
import DSG_logo from "@/assets/Images/DSG_logo.png";
import { Icon } from "@iconify/vue2";
import { formatDate } from "@/assets/Utilities/helperFunction";
import { TABLE } from "@/store/ModuleName";
import { mapState, mapActions } from "vuex";
import { v4 as uuidv4 } from "uuid";
import debounce from "lodash.debounce";
import axios from "axios";

export default {
  name: "FormPage",
  components: {
    Icon,
  },
  async mounted() {
    this.fetchingGroupList = true;
    let {data} = await axios.get('/api/every_group');
    
    if (data?.sessions) {
      this.groupList = data.sessions.map(s => {
        return {
          name: s.crb5c_session_id,
          id: s.crb5c_fow_session_scheduleid
        }
      })
    }
  },
  data() {
    return {
      fetchingGroupList: false,
      groupList: [],
      isEvent: false,
      buttonColor: "rgb(118, 80, 137)",
      notActiveButtonColor: "#fff",
      formType: this.$route.params.formtype,
      choiceTypeForm: ["Announcements", "Reminders"],
      DSG_logo,
      typeAssessment: ["everyone", "individual", "group"],
      stateTypeOfAssessment: "everyone",
      typeOfAssessment: {
        everyone: {
          id: "",
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          isEvent: false,
          recipients: "Everyone",
        },
        individual: {
          id: "",
          caregiver: [],
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          isEvent: false,
          recipients: "Individual",
        },
        group: {
          id: "",
          group: [],
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          isEvent: false,
          recipients: "Group",
        },
      },
      caregiverOptions: [
        ],
        searchInput: "",
        value: [],
        queryingData: false,
    };
  },
  methods: {
    async query() {
      
      await this.queryClient(this);
    },
    queryClient: debounce(async (ctx) => {
      ctx.queryingData = true;
      let paramObj = {
        $expand: `crb5c_client($select=crb5c_no)`,
        $filter: `contains(crb5c_client/crb5c_no,'${ctx.searchInput}') or contains(crb5c_name, '${ctx.searchInput}')`,
      };

      let params = new URLSearchParams(paramObj);
      let {data} = await ctx.$store.state.axios.get(`/crb5c_fow_caregivers/?${params.toString()}`);
      console.log(data)
      const opts = data.value.filter(c => c.crb5c_client).map(c => {
        return {
          label: `${c.crb5c_name} - ${c.crb5c_client.crb5c_no}`,
          value: {
            caregiver: c.crb5c_fow_caregiverid,
            client: c.crb5c_client.crb5c_fow_customerid
          }
        };
      })
      
      ctx.caregiverOptions = opts
      ctx.queryingData = false;
    }, 500),
    onOptionClick({ option, addTag }) {
      addTag(JSON.stringify(option));
      this.searchInput = "";
    },
    ...mapActions(TABLE, ["addAnnouncements", "addReminders"]),
    moveToHomePage() {
      this.$router.push({ path: "/" });
    },
    moveToPreviousPage() {
      this.$router.push({ path: `/${this.formType}` });
    },
    selectTypeAssessment(type) {
      if (type === this.typeAssessment[0]) {
        this.stateTypeOfAssessment = this.typeAssessment[0];
        this.clearFormInput();
      }

      if (type === this.typeAssessment[1]) {
        this.stateTypeOfAssessment = this.typeAssessment[1];
        this.clearFormInput();
      }

      if (type === this.typeAssessment[2]) {
        this.stateTypeOfAssessment = this.typeAssessment[2];
        this.clearFormInput();
      }
    },
    generateID(formObject) {
      formObject.id = uuidv4().split("-")[0];
    },
    formatInputDate(formObject) {
      formObject.eventDate = formatDate(formObject.eventDate);
      formObject.date = formatDate(formObject.date);
    },
    sendAnnouncementForm() {
      if (this.formType === this.choiceTypeForm[0]) {
        console.log(`Form: ${this.formType}`);

        //everyone
        if (this.stateTypeOfAssessment === this.typeAssessment[0]) {
          this.formatInputDate(this.typeOfAssessment.everyone);
          this.generateID(this.typeOfAssessment.everyone);
          this.isEvent ? this.typeOfAssessment.everyone.isEvent = true : this.typeOfAssessment.everyone.isEvent = false;
          this.addAnnouncements(this.typeOfAssessment.everyone);
        }
        //individual
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.formatInputDate(this.typeOfAssessment.individual);
          this.generateID(this.typeOfAssessment.individual);
          this.isEvent ? this.typeOfAssessment.individual.isEvent = true : this.typeOfAssessment.individual.isEvent = false;
          this.addAnnouncements(this.typeOfAssessment.individual);
        }
        //group
        if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.formatInputDate(this.typeOfAssessment.group);
          this.generateID(this.typeOfAssessment.group);
          this.isEvent ? this.typeOfAssessment.group.isEvent = true : this.typeOfAssessment.group.isEvent = false;
          this.addAnnouncements(this.typeOfAssessment.group);
        }

        console.log(this.itemTable.announcements.at(-1));
      }

      if (this.formType === this.choiceTypeForm[1]) {
        console.log(`Form: ${this.formType}`);

        if (this.stateTypeOfAssessment === this.typeAssessment[0]) {
          this.formatInputDate(this.typeOfAssessment.everyone);
          this.generateID(this.typeOfAssessment.everyone);

          this.addReminders(this.typeOfAssessment.everyone);
        }
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.formatInputDate(this.typeOfAssessment.individual);
          this.generateID(this.typeOfAssessment.individual);

          this.addReminders(this.typeOfAssessment.individual);
        }
        if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.formatInputDate(this.typeOfAssessment.group);
          this.generateID(this.typeOfAssessment.group);

          this.addReminders(this.typeOfAssessment.group);
        }

        console.log(this.itemTable.reminders.at(-1));
      }

      this.alertAfterSubmit();

      this.clearFormInput();
      this.moveToPreviousPage();
    },
    alertAfterSubmit() {
      alert("Send successful!")
      window.location.href = "/Announcements";
    },
    clearFormInput() {
      this.typeOfAssessment = {
        everyone: {
          id: "",
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          date: "",
          time: "",
          isEvent: false,
          recipients: "Everyone",
        },
        individual: {
          id: "",
          caregiver: [],
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          date: "",
          time: "",
          isEvent: false,
          recipients: "Individual",
        },
        group: {
          id: "",
          group: [],
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          date: "",
          time: "",
          isEvent: false,
          recipients: "Group",
        },
      };
    },
  },
  computed: {
    unselectedGroups() {
      return this.groupList.filter(g => !this.typeOfAssessment.group.group.find(tg => tg.id === g.id)) || this.groupList
    },
    criteria() {
      // Compute the search criteria
      return this.searchInput.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.caregiverOptions.filter(
        (opt) => this.value.indexOf(opt.label) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.label.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
    ...mapState(TABLE, ["itemTable"]),
    conditionTitle: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.title;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.title;
        } else {
          return this.typeOfAssessment.everyone.title;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.title = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.title = val;
        } else {
          this.typeOfAssessment.everyone.title = val;
        }
      },
    },
    conditionEventDate: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.eventDate;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.eventDate;
        } else {
          return this.typeOfAssessment.everyone.eventDate;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.eventDate = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.eventDate = val;
        } else {
          this.typeOfAssessment.everyone.eventDate = val;
        }
      },
    },
    conditionEventTime: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.eventTime;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.eventTime;
        } else {
          return this.typeOfAssessment.everyone.eventTime;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.eventTime = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.eventTime = val;
        } else {
          this.typeOfAssessment.everyone.eventTime = val;
        }
      },
    },
    conditionMessage: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.message;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.message;
        } else {
          return this.typeOfAssessment.everyone.message;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.message = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.message = val;
        } else {
          this.typeOfAssessment.everyone.message = val;
        }
      },
    },
    conditionOptions: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.options;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.options;
        } else {
          return this.typeOfAssessment.everyone.options;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.options = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.options = val;
        } else {
          this.typeOfAssessment.everyone.options = val;
        }
      },
    },
    conditionDate: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.date;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.date;
        } else {
          return this.typeOfAssessment.everyone.date;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.date = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.date = val;
        } else {
          this.typeOfAssessment.everyone.date = val;
        }
      },
    },
    conditionTime: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.time;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.time;
        } else {
          return this.typeOfAssessment.everyone.time;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.time = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.time = val;
        } else {
          this.typeOfAssessment.everyone.time = val;
        }
      },
    },
  },
  watch: {
    "typeOfAssessment.everyone.options": (value) => {
      // console.log("everyone options = ", value);
      const scheduleDateInputId = document.getElementById("FormPage__dateForm");
      const scheduleTimeInputId = document.getElementById("FormPage__timeForm");

      if (value === "" || !value) {
        return;
      }

      if (value === "0") {
        scheduleDateInputId.required = false;
        scheduleTimeInputId.required = false;
      }

      if (value === "1") {
        scheduleDateInputId.required = true;
        scheduleTimeInputId.required = true;
      }
    },
    "typeOfAssessment.individual.options": (value) => {
      // console.log("individual options = ", value);
      const scheduleDateInputId = document.getElementById("FormPage__dateForm");
      const scheduleTimeInputId = document.getElementById("FormPage__timeForm");

      if (value === "" || !value) {
        return;
      }

      if (value === "0") {
        scheduleDateInputId.required = false;
        scheduleTimeInputId.required = false;
      }

      if (value === "1") {
        scheduleDateInputId.required = true;
        scheduleTimeInputId.required = true;
      }
    },
    "typeOfAssessment.group.options": (value) => {
      // console.log("group options = ", value);
      const scheduleDateInputId = document.getElementById("FormPage__dateForm");
      const scheduleTimeInputId = document.getElementById("FormPage__timeForm");

      if (value === "" || !value) {
        return;
      }

      if (value === "0") {
        scheduleDateInputId.required = false;
        scheduleTimeInputId.required = false;
      }

      if (value === "1") {
        scheduleDateInputId.required = true;
        scheduleTimeInputId.required = true;
      }
    },
  },
};
</script>
<style lang="scss">

.popover {
  max-width: 500px !important;

  .popover-head, .popover-body {
    width: 500px;
  }
}
.FormPage__tagForm {
  ul {
    li {
      background-color: #eaeaea;
      border-radius: 20px;
      border: 1px solid #000;
      //----------- select input tag form
      &:last-child {
        background-color: #fff;
        border: 0;
        padding-left: 0.5rem;
      }
      //----------- select input tag form
      button {
        padding-right: 0.5rem;
      }
      .b-form-tag-remove {
        color: #000;
        font-weight: 700;
      }
      div {
        background-color: #fff;
      }
      span {
        color: #000;
        padding-left: 1rem;
        padding-right: 0.5rem;
      }
    }
  }
}

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}

// XX-Large devices (larger desktops, 1400px and up)
@media (min-width: 1400px) {
}
</style>
