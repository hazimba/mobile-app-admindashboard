<template lang="pug">
b-container(style="border: 1px solid black; border-radius: 20px; background-color: rgba(100, 94, 94, 0.2); height: 90%")

  //- b-modal(id="client-status" title="Sorting Active Member")
  //-   template
  //-     b-col.my-3 
  //-       b-form-group(label="Sorting to Active or non-Active" v-slot="{ ariaDescribedby }")
  //-       b-form-checkbox-group#checkbox-group-2(v-model="activeStatus.text" :options="activeStatus" :aria-describedby="ariaDescribedby" name="ActiveStatus")
  //-   template(#modal-footer)
  //-     b-button(@click="$bvModal.hide('client-status')") OK
  
  b-modal(id="cip-status" title="Sort CIP or Non-CIP")
    template
      b-col 
        b-form-group(label="Can select more than one : " v-slot="{ ariaDescribedby }")
          b-form-checkbox-group.mt-3(style="display: flex; flex-direction: column; gap: 0.75rem" v-model="listCIPModalSelected" :options="cipStatus" :aria-describedby="ariaDescribedby" name="CipStatus") 
    template(#modal-footer)
      div(style="width: 100%; display: flex; justify-content: space-between")
        b-button.px-5(variant="success" style="font-weight: 500" @click="$bvModal.hide('cip-status')") OK
        b-button.px-4(variant="danger" style="font-weight: 500" @click="$bvModal.hide('cip-status')") Close
  
  b-modal(id="type-appointment" title="Filter Type of Appointment")
    template
      b-col 
        b-form-group(label="Can select more than one : " v-slot="{ ariaDescribedby }")
          b-form-checkbox-group.mt-3(style="display: flex; flex-direction: column; gap: 0.75rem" v-model="listAppointmentsSelected" :options="AppointmentStatus" :aria-describedby="ariaDescribedby" name="AppointmentStatus") 
    template(#modal-footer)
      div(style="width: 100%; display: flex; justify-content: space-between")
        b-button.px-5(variant="success" style="font-weight: 500" @click="$bvModal.hide('type-appointment')") OK
        b-button.px-4(variant="danger" style="font-weight: 500" @click="$bvModal.hide('type-appointment')") Close 
  //- b-modal(id="type-appointment" title="Sort Type of Appointment ")
  //-     template
  //-       b-row
  //-         b-col.col-12() Show Input
  //-           input(type="checkbox" v-model="showCompleted")
  //-         b-col.col-12 Show Pending
  //-           input(type="checkbox" v-model="showPending") 
  //-         b-col.col-12 Show In Progress
  //-           input(type="checkbox" v-model="showInProgress") 

      //-     b-form-group(label="Can select more that one : " v-slot="{ ariaDescribedby }")
      //-       b-form-checkbox-group.mt-3(style="display: flex; flex-direction: column; gap: 0.75rem" v-model="appointmentsSelectedAll" :options="AppointmentStatus" :aria-describedby="ariaDescribedby" name="AppointmentStatus")
      //- template(#modal-footer)
      //-   div(style="width: 100%; display: flex; justify-content: space-between;")
      //-     b-button.px-5(variant="success" style="font-weight: 500" @click="$bvModal.hide('type-appointment')") OK
      //-     b-button.px-4(variant="danger" style="font-weight: 500" @click="$bvModal.hide('type-appointment')") Close

  b-modal(:id="sendModal.modalClientId" title="Alert")
    template
    b-col(v-for="client in sendModal.data" :key="client.id")
      b-row(style="font-weight: 600") Remainder email has been send to : 
        b-col(cols="12")
          li.mt-3(style="font-weight: 400") {{ client.clientName }}
    template(#modal-footer)
      b-button.px-4(variant="danger" style="font-weight: 500" @click="hideSendModal") Close

  b-col.mt-5
    b-row.mb-3
      b-col.col-8(style="")
        h4.d-flex.justify-content-start.align-items-center Upcoming Assessment
      b-col.col-4(style="d-flex justify-content-center align-items-center")
        b-row(class="" style="height: 1%; margin-right: 0.1rem;")
          b-col.col-12(class="d-flex align-items-center" style="position: relative;")
            BIconSearch(style="position: absolute; left: 30px")
            b-input(class="pr-1 pl-5 border border-dark d-flex justify-content-center align-items-center" style="border-radius: 20px; font-size: 0.75rem" placeholder="Search Name" type="text" v-model="inputSearchItemList")
    
    b-col(style="text-align: center;")
      b-row.py-3(style="display: flex; align-items: center; justify-content: center; background-color: #50276D; color: white; font-weight: 400; font-size: medium; position: sticky; top: 0px; width: 102.2%")
        b-col(cols="2" class="d-flex justify-content-center align-items-center")
          b-button(style="background-color: inherit; border: none; cursor: default; font-size: 0.85rem") Name
        b-col(cols="3" class="d-flex justify-content-center align-items-center" )
          b-button.m-0(style="background-color: inherit; border: none; font-size: 0.85rem" @click="$bvModal.show('cip-status')") Programme
            b-icon.mx-1(font-scale="0.9" icon="filter")
        b-col(cols="3" class="d-flex justify-content-center align-items-center")
          b-button.m-0(style="background-color: inherit; border: none; font-size: 0.85rem" @click="$bvModal.show('type-appointment')") Type Appointment
            b-icon.mx-1(font-scale="0.9" icon="filter")
        b-col(cols="2" class="d-flex justify-content-center align-items-center")
          b-button(style="background-color: inherit; border: none; cursor: default; font-size: 0.85rem") Date and Time
        b-col(cols="2" class="d-flex justify-content-center align-items-center")
          b-button(style="background-color: inherit; border: none; cursor: default; font-size: 0.85rem") Remainder
    
    b-col(class="table__body" style="")
      b-row.py-2.h-50(v-for="(client, index) in clientsList" :key="index" v-bind:visibleList="visibleList" v-bind:currentPage="currentPage"  style="border-collapse: separate; border-spacing: 0px; border: 1px solid black; display: flex; align-items: center; font-size: 0.85rem; background-color: white")
        b-col(cols="2" style="font-size: 0.85rem") {{ client.clientName }}
        //- b-col(cols="2") {{ client.clientActiveStatus }}
        b-col(cols="3" style="font-size: 0.85rem") {{ client.clientCipStatus }}
        b-col(cols="3" style="font-size: 0.85rem") {{ client.clientTypeAppointment }}
        b-col(cols="2" style="font-size: 0.85rem") {{ client.clientAppointmentDate }}
        b-col(cols="2" style="font-size: 0.85rem")
          b-button.p-1(size="sm" style="font-size: 0.75rem" :disabled="isButtonDisabled[client.id]" :class="{ 'enable-button': !isButtonDisabled[client.id], 'disabled-button': isButtonDisabled[client.id] }" variant="info" @click="openSendModal(client.id)") {{ isSent[client.id] ? 'Sent' : 'Send Email' }}
</template>

<script>

export default {
  data() {
    return {
      inputSearchItemList: '',
      currentPage: 0,
      pageSize: 2,
      visibleList: [],
      clients: [
        { 
          id: 1, 
          clientName: 'Alli Rani DO K R Thangavelu', 
          clientCipStatus: 'FOW', 
          clientTypeAppointment: '1 Year', 
          clientAppointmentDate: '10 July 2023, 11am',
          status: "completed"
        },
        { 
          id: 2, 
          clientName: 'Ang Boy Koh', 
          clientCipStatus: 'CIP', 
          clientTypeAppointment: '6 Months', 
          clientAppointmentDate: '29 September 2023, 2pm',
          status: "pending"
        },
        { 
          id: 3, 
          clientName: 'Chan Maggie', 
          clientCipStatus: 'CIP', 
          clientTypeAppointment: '14th Session Week', 
          clientAppointmentDate: '16 May 2023, 10am',
          status: "inProgress"
        },
        { 
          id: 4, 
          clientName: 'Chan Yin Yin', 
          clientCipStatus: 'CIP', 
          clientTypeAppointment: '14th Session Week', 
          clientAppointmentDate: '29 June 2023, 11am',
          status: "completed"
        },
        { 
          id: 5, 
          clientName: 'Dorothy Soh Pheck Ha', 
          clientCipStatus: 'FOW', 
          clientTypeAppointment: '1 Year', 
          clientAppointmentDate: '29 July 2023, 10am',
          status: "pending"
        },
        { 
          id: 6, 
          clientName: 'Ee Hoe Lee', 
          clientCipStatus: 'FOW', 
          clientTypeAppointment: '1 Year', 
          clientAppointmentDate: '15 August 2023, 2pm',
          status: "inProgress"
        },
        { 
          id: 7, 
          clientName: 'Kang Ah Hong', 
          clientCipStatus: 'CIP', 
          clientTypeAppointment: '14th Session Week', 
          clientAppointmentDate: '29 August 2023, 3pm',
          status: "inProgress"
        },
        { 
          id: 8, 
          clientName: 'Lai Hoew Min Fanny', 
          clientCipStatus: 'FOW', 
          clientTypeAppointment: '1 Year', 
          clientAppointmentDate: '3 September 2023, 11am',
          status: "inProgress"
        },
      ],
      cipStatus: [
        { 
          text: 'CIP',
          value: 'CIP' 
        },
        { text: 'FOW',
          value: 'FOW' 
        },
      ],
      AppointmentStatus: [
        { 
          text: '14th Session Week',
          value: '14th Session Week' 
        },
        { 
          text: '6 Months', 
          value: '6 Months' 
        },
        { 
          text: '1 Year', 
          value: '1 Year' 
        },
      ],
      isActive: true,
      sendModal: {
        modalClientId: null,
        data: null,
      },
      isButtonDisabled: {},
      listCIPModalSelected: [],
      listAppointmentsSelected: [],
      isSent: {},
    }
  },
  computed: {
      // clientsList(){
      //   if(this.listCIPModalSelected.length !== 0){
      //       const result = this.clients.filter(item => this.listCIPModalSelected.includes(item.clientCipStatus));
      //       console.log("Result: ", result);
      //       return result
      //     }
      //   if(this.listAppointmentsSelected.length !== 0){
      //       const result = this.clients.filter(item => this.listAppointmentsSelected.includes(item.clientTypeAppointment))
      //       console.log("Result: ", result)
      //       return result
      //   }
      //   if(this.inputSearchItemList.trim().length > 0){
      //     return this.clients.filter((client) => client.clientName.toLocaleLowerCase().includes(this.inputSearchItemList.trim()))
      //   }else{
      //     return this.clients
      //   }
      // }
    clientsList() {
      let filteredClients = this.clients;

      if (this.listCIPModalSelected.length !== 0) {
        filteredClients = filteredClients.filter(item => this.listCIPModalSelected.includes(item.clientCipStatus));
      }
      if (this.listAppointmentsSelected.length !== 0) {
        filteredClients = filteredClients.filter(item => this.listAppointmentsSelected.includes(item.clientTypeAppointment));
      }
      if (this.inputSearchItemList.trim().length > 0) {
        const searchName = this.inputSearchItemList.trim().toLowerCase();
        filteredClients = filteredClients.filter(client => client.clientName.toLowerCase().includes(searchName));
      }
      return filteredClients;
    }
  },
  created() {
    // Set selectedAll with all values from cipStatus initially
    this.listCIPModalSelected = this.cipStatus.map(option => option.value);
    this.listAppointmentsSelected = this.AppointmentStatus.map(option => option.value)
  },
  beforeMount: function(){
    this.updateVisibleList()
  },
  methods: {
    updatePage(pageNumber){
      this.currentPage = pageNumber
      this.updateVisibleList()
    },

    updateVisibleList(){
      this.visibleList = this.clients.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);

      // if have 0 list client, go back a page
      if(this.visibleList.length === 0 && this.currentPage > 0){
        this.updatePage(this.currentPage - 1)
      }
    },
    backAdminHomepage() {
      this.$router.push({ path: '/adminhomepage' })
    },
    openSendModal(clientId){
      this.sendModal.modalClientId = `sendModal-${clientId}`;
      this.sendModal.data = this.listModalData(this.sendModal.modalClientId)
      this.$nextTick(() =>{
          this.$bvModal.show(this.sendModal.modalClientId);
      })
      this.isButtonDisabled[clientId] = true;
      this.isSent[clientId] = true;
      
      console.log("data: ", this.sendModal.data);
    },
    listModalData(modalClientId){
      const clientId = modalClientId.split("-")[1]
      
      return this.clients
      .filter(client => client.id === +clientId)
    },
    hideSendModal(){
      this.$bvModal.hide(this.sendModal.modalClientId)
      this.sendModal.modalClientId = null
      this.sendModal.data = null
    },
    moveToHomePage(){
      this.$router.push({ path: "/" })
    }
  },
};

</script>

<style scoped>
.enabled-button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.disabled-button {
  background-color: inherit;
  color: black;
  border: none;
  cursor: not-allowed;
}

.table__body{
    text-align: center; 
    max-height: 250px; 
    overflow-y: scroll; 
    border-collapse: separate; 
    border-spacing: 0px;
}

.table__body::-webkit-scrollbar{
    width: 0.5rem;
    height: 0.5rem;
}

.table__body::-webkit-scrollbar-thumb{
    border-radius: 0.5rem;
    background-color: #0004;
}
</style>

