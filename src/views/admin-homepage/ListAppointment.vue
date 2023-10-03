<template lang="pug">
b-container(style="border: 1px solid black; border-radius: 20px; background-color: rgba(100, 94, 94, 0.2); height: 90%")

    b-modal(id="new-appointment", hide-footer title="Add New Appointment")
        b-form(@submit="onSubmit", @reset="onReset", v-if="show")
            b-form-group(id="input-group-1", label="Client Name:", label-for="input-1")
                b-form-input(id="input-1", v-model="form.name", placeholder="Enter name")
            b-form-group(id="input-group-2", label="Care Giver:", label-for="input-2")
                b-form-input(id="input-2", v-model="form.caregivername", placeholder="Care Giver")
            b-form-group(id="input-group-3", label="Email address:", label-for="input-3")
                b-form-input(id="input-3", v-model="form.email", type="email", placeholder="Enter email")
            b-form-group(id="input-group-4", label="Phone:", label-for="input-4")
                b-form-input(id="input-4", v-model="form.phone", type="phone", placeholder="Enter phone no.")
            b-form-group(id="input-group-5", label="Date:", label-for="input-5")
                b-form-input(id="input-5", v-model="form.date", type="date")
            
            b-row(style="margin-right: 0rem; margin-top: 3rem; display: flex; justify-content: end;")
                div(style="display: flex; justify-content: space-between;")
                    div
                        b-button(style="margin-right: 0.5rem" type="submit" variant="primary") Submit 
                        b-button(style="margin-right: 0.5rem" type="reset" variant="danger") Reset
                    div
                        b-button(variant="" @click="$bvModal.hide('new-appointment')") Cancel
    
    b-modal(:id="nameModal.modalClientId" title="More Info")
        template
        b-col(v-for="client in nameModal.data" :key="client.id" style="text-align: center;")
            b-row.p-2(style="display: flex; align-items: center; justify-content: center; background-color: #50276D; color: white; font-weight: 400; font-size: medium;")
                b-col Phone Number
                b-col Email
            b-row.p-2(style="border: 1px solid black; display: flex; align-items: center;")
                b-col {{ client.clientContact }} 
                b-col {{ client.clientEmail }}
        template(#modal-footer)
            b-button(@click="hideNameModal") Close

    b-modal(id="open-calendar" hide-footer modal-class="wider-modal" title="Filter Client Date")
        template
        b-collapse(id="filter")
            b-card.mb-3(style="border-radius: 20px")
                div.d-flex.align-items-start.mb-3(style="font-weight: 600") Sort by Selected Date : 
                div.d-flex.align-items-center
                    b-form-datepicker(type="date" v-model="datefilter1")
                    span.mx-3 to
                    b-form-datepicker(type="date" v-model="datefilter2")
                    b-button.ml-2(@click="filterDate") Filter
                    b-button.ml-2.btn-danger(@click="clearDate") Clear
        template
            div.d-flex.justify-content-end.align-items-center
                b-button(@click="$bvModal.hide('open-calendar')") OK
        
    b-col.mt-5
        b-row.mb-3
            b-col.col-6(class="d-flex justify-content-start align-items-center")
                h4 List of Appointment
            b-col.col-6(class="d-flex justify-content-end align-items-center")
                b-button.mr-2(variant="info" style="font-size: 0.85rem;" @click="$bvModal.show('new-appointment')") Add New Appointment
                b-button(v-b-toggle:filter variant="info" style="font-size: 0.85rem;" @click="$bvModal.show('open-calendar')") Open Calendar
                    //- span(style="font-size: 0.85rem").when-closed Hide Calendar
                    //- span(style="font-size: 0.85rem").when-open Show Calendar
  
        b-col(style="text-align: center;")
            b-row.py-3(style="display: flex; align-items: center; justify-content: center; background-color: #50276D; color: white; font-weight: 400; font-size: medium; width: 102.2%")
                b-col(cols="1" class="d-flex justify-content-center align-items-center")
                    b-button.m-0(style="background-color: inherit; border: none; font-size: 0.85rem") No
                b-col(cols="2" style="font-size: 0.85rem") Name
                b-col(cols="2" style="font-size: 0.85rem") Care Giver
                b-col(cols="2" style="font-size: 0.85rem") Phone No
                b-col(cols="2" style="font-size: 0.85rem") Date
                b-col(cols="3" style="font-size: 0.85rem") Email
        
        b-col(class="table__body" style="")
            b-row.p-2(v-for="client in filteredClients" style="border: 1px solid black; display: flex; align-items: center; background-color: white; ")
                b-col(cols="1" style="font-size: 0.85rem;") {{ client.id }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientName }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientCareGiver }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientContact }}
                b-col(cols="2" style="font-size: 0.85rem") {{ client.clientDate }}
                b-col(cols="3" style="font-size: 0.85rem") {{ client.clientEmail }}
</template>

<script>
import dayjs from 'dayjs';


export default {
    data() {
        return {
            clients: [
                {
                    id: 1,
                    clientName: 'Susan Vivy',
                    clientCareGiver: 'Ally',
                    clientDate: dayjs('2023-01-25').format('MM-DD-YYYY'),
                    clientContact: '0112 4043',
                    clientEmail: 'Ally_98@gmail.com',
                },
                {
                    id: 2,
                    clientName: 'Ali Rahman',
                    clientCareGiver: 'Ahmad',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-03-20').format('MM-DD-YYYY'),
                    clientContact: '6726 9980',
                    clientEmail: 'Ahmad14@gmail.com',
                },
                {
                    id: 3,
                    clientName: 'Maxmilan',
                    clientCareGiver: 'Randy',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-05-05').format('MM-DD-YYYY'),
                    clientContact: '0912 5442',
                    clientEmail: 'Randy1900@gmail.com',
                },
                {
                    id: 4,
                    clientName: 'Hafiz',
                    clientCareGiver: 'Yuna',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-08-31').format('MM-DD-YYYY'),
                    clientContact: '4043 2883',
                    clientEmail: 'Hafiz@gmail.com',
                },
                {
                    id: 5,
                    clientName: 'Fendy',
                    clientCareGiver: 'Siti',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-09-12').format('MM-DD-YYYY'),
                    clientContact: '0019 4251',
                    clientEmail: 'Fendy@gmail.com',
                },
                {
                    id: 6,
                    clientName: 'Kamal Fiqree',
                    clientCareGiver: 'Eka Zai',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-10-3').format('MM-DD-YYYY'),
                    clientContact: '7126 9123',
                    clientEmail: 'Kamal@gmail.com',
                },
                {
                    id: 7,
                    clientName: 'Mahmud Albab',
                    clientCareGiver: 'Aisyah Hamid',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-10-14').format('MM-DD-YYYY'),
                    clientContact: '4043 2883',
                    clientEmail: 'Mahmud@gmail.com',
                },
                {
                    id: 8,
                    clientName: 'Ivy June',
                    clientCareGiver: 'Maisarah Ahmad',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-10-19').format('MM-DD-YYYY'),
                    clientContact: '9019 0999',
                    clientEmail: 'IvyJune@gmail.com',
                },
                {
                    id: 9,
                    clientName: 'Mimi Ayuni',
                    clientCareGiver: 'Irene Lee',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-11-1').format('MM-DD-YYYY'),
                    clientContact: '4425 8987',
                    clientEmail: 'mimi@gmail.com',
                },
                {
                    id: 10,
                    clientName: 'Ridwhan',
                    clientCareGiver: 'Basir',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-11-21').format('MM-DD-YYYY'),
                    clientContact: '6777 0219',
                    clientEmail: 'Ridwhan@gmail.com',
                },
                {
                    id: 11,
                    clientName: 'Muaz Maarof',
                    clientCareGiver: 'Hazwan',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-12-12').format('MM-DD-YYYY'),
                    clientContact: '8127 0231',
                    clientEmail: 'Muaz@gmail.com',
                },
                {
                    id: 12,
                    clientName: 'Firdaus Mahadzir',
                    clientCareGiver: 'Basyirdeen',
                    clientTypeAppointment: '6 Months',
                    clientDate: dayjs('2023-12-29').format('MM-DD-YYYY'),
                    clientContact: '8213 9121',
                    clientEmail: 'Pidush@gmail.com',
                },
                
            ],
            filteredClients:[],
            form: {
                name: '',
                caregivername: '',
                // typeAppointment: '',
                date: null,
                phone: '',
                email: '',
                message: ''
            },
            show: true,
            value: '',
            context: null,
            nameModal: {
                modalClientId: null,
                data: null
            },
            datefilter1:null,
            datefilter2:null,
        }
    },
    mounted(){
        this.filteredClients = this.clients
    },
    methods: {
        test(){
            console.log(dayjs())
        },
        filterDate(){
            if(this.datefilter1 !== null && this.datefilter2 !== null){
                /*for(let i = 0 ; i < this.clients.length; i++){
                    if((dayjs(this.clients[i].clientDate).isAfter(dayjs(this.datefilter1)) && dayjs(this.clients[i].clientDate).isBefore(this.datefilter2))){
                        filtered.push(this.clients[i])
                    } 
                }*/
                this.filteredClients = this.clients.filter(client => dayjs(client.clientDate).isAfter(dayjs(this.datefilter1)) && dayjs(client.clientDate).isBefore(this.datefilter2))
            }else{
                this.filteredClients = this.clients
                alert("Select both filter dates.")
            }
        },
        clearDate(){
            this.datefilter1 = null;
            this.datefilter2 = null;
            this.filteredClients = this.clients
        },
        onSubmit(event) {
            event.preventDefault()
            // alert(JSON.stringify(this.form))

            const formattedDate = dayjs(this.form.date).format('DD / MM / YYYY')
        
            let newClient = {
                id: this.clients.length + 1,
                clientName: this.form.name,
                clientCareGiver: this.form.caregivername,
                // clientTypeAppointment: this.form.typeAppointment,
                clientDate: formattedDate,
                clientContact: this.form.phone,
                clientEmail: this.form.email, 
                clientMessage: this.form.message
            }
            this.clients.push(newClient)
            this.form = {
                name: '',
                caregivername: '',
                // typeAppointment: '',
                date: null,
                phone: '',
                email: '',
                message: ''
            },
            this.$nextTick(() =>{
                this.$bvModal.hide('new-appointment')
            })
            
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.caregivername = ''
            this.form.email = ''
            this.form.phone = ''
            this.form.date = null
            this.form.message = ''
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        },
        backAdminHomepage() {
            this.$router.push({ path: '/adminhomepage' })
        },
        moveToHomePage(){
            this.$router.push({ path: "/" })
        },
        openNameModal(clientId){
            this.nameModal.modalClientId = `sendModal-${clientId}`
            this.nameModal.data = this.listModalData(this.nameModal.modalClientId)
            this.$nextTick(() =>{
                this.$bvModal.show(this.nameModal.modalClientId)
            })

            console.log("data: ", this.nameModal.data)
        },
        listModalData(modalClientId){
            const clientId = modalClientId.split("-")[1]

            return this.clients
            .filter(client => client.id === +clientId)
        },
        hideNameModal(){
            this.$bvModal.hide(this.nameModal.modalClientId)

            this.nameModal.modalClientId = null
            this.nameModal.data = null
        }
    },
  
}
</script>

<style>
.collapsed>.when-closed,
.not-collapsed>.when-open {
    display: none;
    }
.wider-modal .modal-dialog{
    max-width: 1000px;
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

