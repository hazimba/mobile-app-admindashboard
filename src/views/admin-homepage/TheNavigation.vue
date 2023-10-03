<template lang="pug">
b-row(style="margin: 0 0px")
    b-col.col-2(style="background-color: #50276B;")
        b-row(style="color: white; margin-top: 3rem; font-weight: 550;") 
            button.col-4.ml-2.d-flex.justify-content-center.align-items-center(class="home-button" style="font-weight: 500; padding: 0px") 
                router-link(to="/admindashboard" style="color: white; font-weight: bold; text-decoration: none") Home 
        b-row(style="color: white; margin-top: 3rem; font-weight: 550") 
            b-button(style="height: fit-content; border: none; background-color: inherit; font-weight: 500; cursor: default; font-size: 0.85rem") Management
        
        b-row.justify-content-start.align-items-start    
            div.col-10.mt-4.d-flex.justify-content-start.align-items-center(style="font-weight: 400; margin-top: 0rem")   
                button.d-flex.justify-content-start.align-items-center(class="appointment-button")
                    Icon.mr-2(icon="guidance:calendar" height="10%" color="white")
                    router-link(to="/appointment" style="color: white; background-color: inherit; text-decoration: none") Appointment
            div.col-10.mt-2.d-flex.justify-content-start.align-items-center(style="font-weight: 400; margin-top: 1.25rem;") 
                button.d-flex.justify-content-start.align-items-center(class="assessment-button")
                    Icon.mr-2(icon="fe:list-task" height="10%" color="white")
                    router-link(to="/upcoming" :class="link" style="color: white; background-color: inherit; text-decoration: none") Assessment
            div.col-10.mt-2.d-flex.justify-content-start.align-items-center(style="font-weight: 400; margin-top: 1.25rem") 
                button.d-flex.justify-content-start.align-items-center(class="client-button")
                    Icon.mr-2(icon="fluent-mdl2:people" height="10%" color="white")
                    router-link(to="/client" style="color: white; background-color: inherit; text-decoration: none") Client
        
        b-row(style="color: white; margin-top: 3rem; font-weight: 550") 
            b-button(style="height: fit-content; border: none; background-color: inherit; font-weight: 500; cursor: default; font-size: 0.85rem") Scheduler
        
        
        b-row.justify-content-start.align-items-start    
            div.col-10.mt-4.d-flex.justify-content-start.align-items-center(style="font-weight: 400; margin-top: 0rem") 
                button.d-flex.justify-content-start.align-items-center(class="weekly-button")
                    Icon.mr-2(icon="arcticons:calendar-7" height="10%" color="white")
                    router-link(to="/weekly" style="color: white; background-color: inherit; text-decoration: none") Weekly
            div.col-10.mt-2.d-flex.justify-content-start.align-items-center(style="font-weight: 400; margin-top: 0rem")
                button.d-flex.justify-content-start.align-items-center(class="master-button")
                    Icon.mr-2(icon="ph:calendar-check" height="10%" color="white")
                    router-link(to="/master" style="color: white; font-weight: 500; background-color: inherit; text-decoration: none") Master
    b-col.col-10
        b-row(style="height: 10%; font-size: 3rem")
            b-col.col-12 
                b-button.align-items-start.justify-content-start.d-flex(style="font-size: 2.25rem; border: none; background-color: inherit; color: black" @click="toggleComponent") Dashboard 
        router-view()
</template>

<script>
import {Icon} from '@iconify/vue2';

export default{
    components: {
        Icon,
    },
    data(){
        return{
            isHovered: false
        }
    }
}

</script>

<style>
.appointment-button,
.assessment-button,
.client-button, 
.weekly-button,
.master-button,
.home-button{
    background-color: inherit;
    border: none;
    text-decoration: none;
    border-radius: 20px;
    padding: 0px 0px 0px 20px;
}

.appointment-button:hover,
.assessment-button:hover,
.client-button:hover,
.weekly-button:hover,
.master-button:hover,
.home-button:hover{
    background-color: blueviolet;
}

</style>