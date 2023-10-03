<template lang="pug">
b-container(fluid style="height: 100vh;")
    b-row(class="justify-content-start align-items-center" style="height: 20%;" cols="12")
        b-img(class="ml-5" :src="DSG_logo", alt="DSG Logo")
    b-row(class="justify-content-center align-items-start gap-3 px-md-5 px-lg-4" style="height: 80%; gap: 5rem;")
        b-col(class="h-50 d-flex flex-column col-md-3 col-lg-3 col-xl-2" style=" margin-top: 5rem;")
            b-row(class="h-100 flex-row" style="gap: 10%;")
                b-col(class="h-lg-50 h-xxl-75 d-flex align-items-center justify-content-center cursor-pointer" :style="`background-color: ${buttonColor}; border-radius: 20px; cursor: pointer;`" cols="12" @click="moveToAnnouncementsPage")
                    IconAnnouncement(class="")
                b-col(class="font-weight-bold" style="height: 40%; font-size: 1.5rem;" cols="12")
                    span(class="")
                    | Announcements
        //- b-col(class="h-50 d-flex flex-column col-md-3 col-lg-3 col-xl-2" style=" margin-top: 5rem;")
        //-     b-row(class="h-100 flex-row" style="gap: 10%;")
        //-         b-col(class="h-lg-50 h-xxl-75 d-flex align-items-center justify-content-center" :style="`background-color: gray; border-radius: 20px;`" cols="12")
        //-             Icon(class="h-50 w-50 text-white" icon="carbon:reminder")
        //-         b-col(class="font-weight-bold" style="height: 40%; font-size: 1.5rem;" cols="12")
        //-             span(class="")
        //-             | Reminders (WIP)
        b-col(class="h-50 d-flex flex-column col-md-3 col-lg-3 col-xl-2" style=" margin-top: 5rem;")
            b-row(class="h-100 flex-row" style="gap: 10%;")
                b-col(v-if="getTotalCountMessage !== 0" class="h-lg-50 h-xxl-75 d-flex align-items-center justify-content-center" :style="`background-color: ${buttonColor}; border-radius: 20px; cursor: pointer; display: relative;`" cols="12" @click="moveToFowMessagePage")
                    BIconChatLeftTextFill(class="h-50 w-50 text-white")
                    //- div(class="HomePage__notification HomePage__notification--active")
                    //-     | {{ getTotalCountMessage }}
                b-col(v-else class="h-lg-50 h-xxl-75 d-flex align-items-center justify-content-center" :style="`background-color: ${buttonColor}; border-radius: 20px; cursor: pointer; display: relative;`" cols="12" @click="moveToFowMessagePage")
                    BIconChatLeftTextFill(class="h-50 w-50 text-white")
                    //- div(class="HomePage__notification")
                    //-     | {{ getTotalCountMessage }}
                b-col(class="font-weight-bold" style="height: 40%; font-size: 1.5rem;" cols="12")
                    span(class="")
                    | FOW Chat

        b-col(class="h-50 d-flex flex-column col-md-3 col-lg-3 col-xl-2" style=" margin-top: 5rem;")
            b-row(class="h-100 flex-row" style="gap: 10%;")
                b-col(class="h-lg-50 h-xxl-75 d-flex align-items-center justify-content-center" :style="`background-color: ${buttonColor}; border-radius: 20px; cursor: pointer; display: relative;`" cols="12" @click="moveToAdminHomepage")
                    Icon(icon="ic:round-dashboard" height="50%" color="white")
                b-col(class="font-weight-bold" style="height: 40%; font-size: 1.5rem;" cols="12")
                    span(class="")
                    | Admin Dashboard

</template>

<script>
import DSG_logo from '@/assets/Images/DSG_logo.png';
import IconAnnouncement from '@/components/IconAnnouncement.vue'
import {BIconChatLeftTextFill} from 'bootstrap-vue';  
import {Icon} from '@iconify/vue2';
import {MESSAGE} from '@/store/ModuleName';
import {mapGetters} from 'vuex';

import axios from 'axios';

export default {
    name: 'HomePage',
    components: {
        IconAnnouncement,
        BIconChatLeftTextFill,
        Icon,
    },
    
    data() {
        return {
            DSG_logo,
            buttonColor: 'rgb(118, 80, 137)',
            logindata: { ready: false },
            msalApp: null,
            promptLogin: false,
        }
    },
    methods:{
        moveToAnnouncementsPage(){
            this.$router.push({path: '/announcements'});
        },
        moveToRemindersPage(){
            this.$router.push({path: '/reminders'});
        },
        moveToFowMessagePage(){
            this.$router.push({path: '/messages'});
        },
        moveToAdminHomepage(){
            this.$router.push({path: '/admindashboard'})
        },
        setTheWindowWidth(){
            this.windowWidth = window.innerWidth;
        },
        async test() {
            const {data} = await axios.post('/api/announcement', {});
            console.log(data)
        },
    },
    computed: {
        ...mapGetters( MESSAGE, ['getTotalCountMessage']),
    },
    

}
</script>
<style lang="scss">
    .HomePage__notification{
        display: none;
        background-color: red;
        color: #fff;
        font-weight: 600;
        font-size: 1.5rem;
        border-radius: 50px;
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        justify-self: flex-end;
        right: -3%;
        top: -3%;
    }

    .HomePage__notification--active{
        display: block;
    }
    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) {  }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {  }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
        .h-lg-50{
            height: 50%;
            max-height: 50%;
        }
    }

    // X-Large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {}

    // XX-Large devices (larger desktops, 1400px and up)
    @media (min-width: 1400px) { 
        .h-xxl-75{
            height: 75%;
            max-height: 75%;
        }
    }
</style>