<template lang="pug">
div(style="height: 99vh; background-color: #F4F4F4; margin: 0 0px")

    b-popover.col-1(class="popover" target="menu-popover" triggers="focus" placement="bottomleft")    
        div(style="text-align: right;")
            div(style="font-size: 14px") Date: {{ formattedDate }}
            div(style="font-size: 14px") Time: {{ formattedTime }}
        div.mt-4(style="text-align: right;")
            b-button(variant="danger" @click="moveToHomePage") Homepage
                
    div(class="" style="height: 10%; display: flex; justify-content: space-between; align-items: center ")
        
        b-row.ml-3(class="" @click="moveToHomePage")
            b-img(class="" src="../assets/Images/DSG_logo.png", width="128px" alt="DSG Logo")
        b-row.mr-3(class="")
            div(class="" style="font-size: 0.95rem; align-items: center; border: 1px solid black; background-color: #FCB900; border-radius: 9999px; margin-right: 0.5rem; padding: 3px 10px;") Hi, Hazim Bakar
            button(id="menu-popover" style="border: 1px solid black; border-radius: 50px")
                Icon(icon="ph:user-duotone" style="font-size: 20px; background-color: inherit;") 
    b-col(class="col-12 d-flex justify-content-start")
    the-navigation(class="" style="height: 90%;" cols="12")
</template>

  
<script lang="ts">
import {Icon} from '@iconify/vue2';
import TheNavigation from './admin-homepage/TheNavigation.vue';
import dayjs from 'dayjs';

export default {
    data(){
        return{
            currentComponentName: null,  
            isPopoverVisible: true,
            currentDateTime: dayjs(),
        }
    },
    name: "AdminHomepage",
    components: {
        Icon,
        TheNavigation,
    },
    methods: {
        togglePopover() {
            this.isPopoverVisible = !this.isPopoverVisible;
        },
        moveToHomePage() {
            this.$router.push({ path: "/" });
        },
    },
    computed:{
        formattedDate() {
            return this.currentDateTime.format('DD-MM-YYYY');
        },
        formattedTime() {
            return this.currentDateTime.format('HH:mm');
        },
    },
    
}
</script>

<style>
.popover .popover-body {
    max-width: 140px !important;
    border: none;
    border-radius: 10px;
}
</style>
