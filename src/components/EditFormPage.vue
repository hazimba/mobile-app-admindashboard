<template lang="pug">
b-container(style="height: 100vh;")
        b-row(class="align-items-center" style="height: 20%;")
            b-col(class="col-3 text-left")
                b-img(class="" :src="DSG_logo", alt="DSG Logo" @click="moveToHomePage")
            b-col(class="col-6")
                span(class="font-weight-bold" style="font-size: 2rem;")
                    | {{ editFormType.formType }}
            b-col(class="col-3 text-right")
                b-button(class="" :style="`background-color: ${buttonColor}`" @click="moveToPreviousPage")
                    | Back to {{ editFormType.formType }} page
        //- b-row(class="flex-column" style="height: 15%;")
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
            b-form(class="h-100" @submit.prevent="sendEditForm")
              b-row(class="")
                //- Caregiver
                b-col(v-if="stateTypeOfAssessment === typeAssessment[1]" class="col-6 text-left")
                  b-form-group(class="FormPage__tagForm" for="FormPage__tagForm" label="Caregiver(s):")
                    b-form-tags#tags-with-dropdown.mb-2(input-id="FormPage__tagForm" class="" v-model="typeOfAssessment.individual.caregiver" required)
                      template(v-slot='{ tags, disabled, addTag, removeTag }')
                        ul.list-inline.d-inline-block.mb-2(v-if='tags.length > 0')
                          li.list-inline-item(v-for='tag in tags' :key='tag')
                            b-form-tag(@remove='removeTag(tag)' :title='tag' :disabled='disabled' variant='info') {{ tag }}
                        b-dropdown(size='sm' variant='outline-secondary' block='' menu-class='w-100')
                          template(#button-content='')
                            b-icon(icon='tag-fill')
                            |  Choose tags
                          b-dropdown-form(@submit.stop.prevent='() => {}')
                            b-form-group.mb-0(label='Search tags' label-for='tag-search-input' label-cols-md='auto' label-size='sm' :description='searchDesc' :disabled='disabled')
                              b-form-input#tag-search-input(v-model='search' type='search' size='sm' autocomplete='off')
                          b-dropdown-divider
                          b-dropdown-item-button(v-for='option in availableOptions' :key='option' @click='onOptionClick({ option, addTag })')
                            | {{ option }}
                          b-dropdown-text(v-if='availableOptions.length === 0')
                            | There are no tags available to select

                b-col(v-else-if="stateTypeOfAssessment === typeAssessment[2]" class="col-6 text-left")
                  //- b-form-group(class="FormPage__tagForm" for="FormPage__tagForm" label="Group:")
                  //-   b-form-tags(input-id="FormPage__tagForm" class="" v-model="typeOfAssessment.group.group" required)
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
                  b-form-checkbox(v-model="conditionIsEvent") This is an event with Date & Time information
              b-row(class="" v-if="conditionIsEvent")
                b-col(class="col-7 d-flex text-left" style="gap: 2rem;")
                  b-form-group(class="w-50" for="FormPage__dateEventForm" label="Date of event:")
                      b-form-input(class="" id="FormPage__dateEventForm" type="date" v-model="conditionEventDate" required)
                  b-form-group(class="w-50" for="FormPage__timeEventForm" label="Time of event:")
                      b-form-input(class="" id="FormPage__timeEventForm" type="time" v-model="conditionEventTime" required)      
              //- //- Options input
              //- b-row(class="")
              //-   b-col(class="col-12 text-left")
              //-     b-form-group(class="" for="FormPage__optionsForm" label="Options: ")
              //-       b-form-checkbox(class="" id="FormPage__optionsForm" name="Checkbox-schedule-assessment" value="Schedule assessment" v-model="conditionOptions" unchecked-value="Not schedule assessment")
              //-         | Schedule {{ editFormType.formType.toLowerCase(  ) }}
              //- //- Date and Time input
              //- b-row(class="")
              //-   b-col(class="col-7 d-flex text-left" style="gap: 2rem;")
              //-     b-form-group(class="w-50" for="FormPage__dateForm" label="Date:")
              //-         b-form-input(class="" id="FormPage__dateForm" type="date" v-model="conditionDate")
              //-     b-form-group(class="w-50" for="FormPage__timeForm" label="Time:")
              //-         b-form-input(class="" id="FormPage__timeForm" type="time" v-model="conditionTime")
              div(class="d-flex align-items-center justify-content-center" style="height: 20%;")
                b-overlay(:show="sending" class="w-100")
                  b-button(:disabled="sending" class="font-weight-bold" :style="`width: 20%; height: 35%; border-radius: 20px; background-color: ${buttonColor}`" type="submit")
                    | Edit
    
</template>
<script>
import DSG_logo from "@/assets/Images/DSG_logo.png";
import { Icon } from "@iconify/vue2";
import {
  formatDate,
  formatDateToInputDate,
} from "@/assets/Utilities/helperFunction";
import { TABLE } from "@/store/ModuleName";
import { mapState, mapGetters, mapMutations } from "vuex";
import { mapActions} from "vuex";


export default {
  name: "EditFormPage",
  components: {
    Icon,
  },
  data() {
    return {
      sending: false,
      isEvent: false,
      buttonColor: "rgb(118, 80, 137)",
      notActiveButtonColor: "#fff",
      editFormType: this.$route.params,
      choiceTypeForm: ["Announcements", "Reminders"],
      DSG_logo,
      typeAssessment: ["Everyone", "Individual", "Group"],
      stateTypeOfAssessment: "",
      typeOfAssessment: {
        everyone: {
          id: "",
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          date: "",
          time: "",
          recipients: "Everyone",
          isEvent: false
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
          recipients: "Individual",
          isEvent: false
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
          recipients: "Group",
          isEvent: false
        },
      },
      options: [
          "Apple",
          "Orange",
          "Banana",
          "Lime",
          "Peach",
          "Chocolate",
          "Strawberry",
        ],
        search: "",
        value: [],
    };
  },
  methods: {
    ...mapActions(TABLE, ["editAnnouncement"]),
    onOptionClick({ option, addTag }) {
      addTag(option);
      this.search = "";
    },
    ...mapMutations(TABLE, ["updateAnnouncementsItem", "updateRemindersItem"]),
    moveToHomePage() {
      this.$router.push({ path: "/" });
    },
    moveToPreviousPage() {
      window.history.back();
    },
    errorHandlerInitData(data) {
      if (!data) {
        this.$router.push({ path: "/*" });
        return;
      }
    },
    intiEditFormData() {
      let data;

      if (this.editFormType.formType === this.choiceTypeForm[0]) {
        data = this.retrieveAnnouncementsItem(this.editFormType.id);
        this.errorHandlerInitData(data);
      }

      if (this.editFormType.formType === this.choiceTypeForm[1]) {
        data = this.retrieveRemindersItem(this.editFormType.id);
        this.errorHandlerInitData(data);
      }

      if (data.recipients === this.typeAssessment[0]) {
        this.selectTypeAssessment(this.typeAssessment[0]);

        this.typeOfAssessment = {
          ...this.typeOfAssessment,
          everyone: {
            ...data,
            eventDate: data.eventDate?.includes('/') ? this.$root.dayjs(data.eventDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : data.eventDate,
            date: formatDateToInputDate(data.date),
          },
        };
      }

      if (data.recipients === this.typeAssessment[1]) {
        this.selectTypeAssessment(this.typeAssessment[1]);

        this.typeOfAssessment = {
          ...this.typeOfAssessment,
          individual: {
            ...data,
            eventDate: formatDateToInputDate(data.eventDate),
            date: formatDateToInputDate(data.date),
          },
        };
      }

      if (data.recipients !== this.typeAssessment[0]) {
        this.selectTypeAssessment(this.typeAssessment[2]);

        this.typeOfAssessment = {
          ...this.typeOfAssessment,
          group: {
            ...data,
            eventDate: formatDateToInputDate(data.eventDate),
            date: formatDateToInputDate(data.date),
          },
        };
      }
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
    formatInputDate(formObject) {
      formObject.eventDate = formatDate(formObject.eventDate);
      formObject.date = formatDate(formObject.date);
    },
    async sendEditForm() {
      this.sending = true;
      await this.editAnnouncement({
        action: "edit", 
        msgid: this.editFormType.id, 
        title: this.conditionTitle, 
        body: this.conditionMessage,
        eventTime: this.conditionEventTime,
        eventDate: this.conditionEventDate,
        isEvent: this.conditionIsEvent,
        groupName: this?.itemTable?.announcements?.find(a => a?.id === this.editFormType?.id)?.groupName || null,
        convId: this?.itemTable?.announcements?.find(a => a?.id === this.editFormType?.id)?.convId || null
      });

      if (this.editFormType.formType === this.choiceTypeForm[0]) {
        console.log(`Form: ${this.editFormType.formType}`);

        if (this.stateTypeOfAssessment === this.typeAssessment[0]) {
          this.formatInputDate(this.typeOfAssessment.everyone);
          this.conditionIsEvent ? this.typeOfAssessment.everyone.isEvent = true : this.typeOfAssessment.everyone.isEvent = false;
          this.updateAnnouncementsItem({
            ...this.typeOfAssessment.everyone,
          });
        }
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.formatInputDate(this.typeOfAssessment.individual);
          this.conditionIsEvent ? this.typeOfAssessment.individual.isEvent = true : this.typeOfAssessment.individual.isEvent = false;
          this.updateAnnouncementsItem({
            ...this.typeOfAssessment.individual,
          });
        }
        if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.formatInputDate(this.typeOfAssessment.group);
          this.conditionIsEvent ? this.typeOfAssessment.group.isEvent = true : this.typeOfAssessment.group.isEvent = false;
          this.updateAnnouncementsItem({
            ...this.typeOfAssessment.group,
          });
        }

        const result = this.itemTable.announcements.filter((item) => {
          return item.id === this.editFormType.id;
        });

        console.log(result[0]);
      }

      if (this.editFormType.formType === this.choiceTypeForm[1]) {
        console.log(`Form: ${this.editFormType.formType}`);

        if (this.stateTypeOfAssessment === this.typeAssessment[0]) {
          this.formatInputDate(this.typeOfAssessment.everyone);
          this.updateRemindersItem({
            ...this.typeOfAssessment.everyone,
          });
        }
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.formatInputDate(this.typeOfAssessment.individual);
          this.updateRemindersItem({
            ...this.typeOfAssessment.individual,
          });
        }
        if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.formatInputDate(this.typeOfAssessment.group);
          this.updateRemindersItem({
            ...this.typeOfAssessment.group,
          });
        }

        const result = this.itemTable.reminders.filter((item) => {
          return item.id === this.editFormType.id;
        });

        console.log(result[0]);
      }

      this.alertAfterSubmit();
      this.sending = false;

      this.clearFormInput();
      this.moveToPreviousPage();
    },
    alertAfterSubmit() {
      alert("Edit successful!");
    },
    clearFormInput() {
      const clearForm = {
        everyone: {
          id: "",
          title: "",
          eventDate: "",
          eventTime: "",
          message: "",
          options: "",
          date: "",
          time: "",
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
          recipients: "Group",
        },
      };

      if (this.stateTypeOfAssessment === this.typeAssessment[0]) {
        this.typeOfAssessment = {
          ...clearForm,
          everyone: {
            ...clearForm.everyone,
            id: this.editFormType.id,
          },
        };

        return;
      }
      if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
        this.typeOfAssessment = {
          ...clearForm,
          individual: {
            ...clearForm.individual,
            id: this.editFormType.id,
          },
        };

        return;
      }
      if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
        this.typeOfAssessment = {
          ...clearForm,
          group: {
            ...clearForm.group,
            id: this.editFormType.id,
          },
        };

        return;
      }
    },
  },
  computed: {
    ...mapState(TABLE, ["itemTable"]),
    ...mapGetters(TABLE, [
      "retrieveAnnouncementsItem",
      "retrieveRemindersItem",
    ]),
    criteria() {
      // Compute the search criteria
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.options.filter(
        (opt) => this.value.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
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
    conditionIsEvent: {
      get() {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          return this.typeOfAssessment.individual.isEvent;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          return this.typeOfAssessment.group.isEvent;
        } else {
          return this.typeOfAssessment.everyone.isEvent;
        }
      },
      set(val) {
        if (this.stateTypeOfAssessment === this.typeAssessment[1]) {
          this.typeOfAssessment.individual.isEvent = val;
        } else if (this.stateTypeOfAssessment === this.typeAssessment[2]) {
          this.typeOfAssessment.group.isEvent = val;
        } else {
          this.typeOfAssessment.everyone.isEvent = val;
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
          return this.typeOfAssessment.everyone.eventDate
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

      if (value === "Not schedule assessment") {
        scheduleDateInputId.required = false;
        scheduleTimeInputId.required = false;
      }

      if (value === "Schedule assessment") {
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

      if (value === "Not schedule assessment") {
        scheduleDateInputId.required = false;
        scheduleTimeInputId.required = false;
      }

      if (value === "Schedule assessment") {
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

      if (value === "Not schedule assessment") {
        scheduleDateInputId.required = false;
        scheduleTimeInputId.required = false;
      }

      if (value === "Schedule assessment") {
        scheduleDateInputId.required = true;
        scheduleTimeInputId.required = true;
      }
    },
  },
  mounted() {
    this.intiEditFormData();
  },
};
</script>
<style lang="scss"></style>
