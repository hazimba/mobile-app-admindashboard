<template lang="pug">
b-container(style="border: 1px solid black; border-radius: 20px; background-color: rgba(100, 94, 94, 0.2); height: 90%")
    b-col.mt-5(style="")
        b-row.mb-3
            b-col.col-8(style="")
                h4.d-flex.justify-content-start.align-items-center Weekly Schedule
        b-col(style="text-align: center; height: max-content")
            b-row.py-3(style="display: flex; align-items: center; justify-content: center; background-color: #50276D; color: white; font-weight: 400; font-size: medium; width: 102.2%")
                b-col(cols="5" class="d-flex justify-content-center align-items-center")
                    b-button.m-0(style="background-color: inherit; border: none; font-size: 0.85rem") Schedule Name 
                b-col(cols="2" style="font-size: 0.85rem") Date
                b-col(cols="2" style="font-size: 0.85rem") Duration
                b-col(cols="3" style="font-size: 0.85rem") Checked In / Enrolled
        b-col(class="table__body" style="")
            b-row.p-2(v-for="schedule in scheduleList" :key="schedule.id" v-bind:visibleList="visibleList" v-bind:currentPage="currentPage" style="border: 1px solid black; display: flex; align-items: center; background-color: white; ")
                b-col(v-for="nameDetails in schedule.scheduleName" :key="nameDetails.name" cols="5")
                    b-button(style="text-decoration: none; background-color: inherit; border: 0px; color: blue; font-size: medium; font-size: 0.85rem;" :href="nameDetails.redirectTo" target="_blank") {{ nameDetails.name }}
                b-col(cols="2" style="font-size: 0.85rem") {{ schedule.scheduleDate }}
                b-col(cols="2" style="font-size: 0.85rem") {{ schedule.scheduleDuration }}
                b-col(cols="3" style="font-size: 0.85rem") {{ schedule.scheduleEnrolled }}
    b-row.mt-4.d-flex.justify-content-end.align-items-end()
        b-col.col-2(style="margin-right: 1rem; font-size: 12px; padding: 15px 0;" class="checkin-result") Checked In/ Enrolled :
            b-row.d-flex.justify-content-center.align-items-center(style="font-size: 13px") 57/ 59 

    //- b-row
        b-col.col-12(class="d-flex justify-content-center align-items-center")
            pagination(:schedules="schedules" @page:update="updatePage" :currentPage="currentPage" :pageSize="pageSize")
</template>


<script>
// import Pagination from './admin-component/Pagination.vue';

export default{
    components: {
        // Pagination
    },
    data(){
        return{
            inputSearchItemList: '',
            currentPage: 0,
            pageSize: 4,
            visibleList: [],
            schedules: [
              {
                id: 1,
                scheduleName: [
                    {
                        name: 'Monday PM (Mild Dementia Group) 星期一 （初期） 下午',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=5ec83e69-fb7e-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '18 September 2023',
                scheduleDuration: '3 hr',
                scheduleEnrolled: '16 /18'
              },
              {
                id: 2,
                scheduleName: [
                    {
                        name: 'Monday AM (Mild Dementia Group) 星期一 （初期）早上',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=a36cc649-fb7e-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '18 September 2023',
                scheduleDuration: '3 hr',
                scheduleEnrolled: '7 /7'
              },
              {
                id: 3,
                scheduleName: [
                    {
                        name: 'Monday PM (One-to-one - Home) 星期二下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=cdbf4d77-3d1a-ee11-8f6d-002248ecdc58'
                    }
                ],
                scheduleDate: '18 September 2023',
                scheduleDuration: '3 hr',
                scheduleEnrolled: '1 /1'
              },
              {
                id: 4,
                scheduleName: [
                    {
                        name: 'Tuesday PM (Mild Dementia Group) 星期二 （初期）下午',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=22e7e8d1-451a-ee11-8f6d-002248ecdc58'
                    }
                ],
                scheduleDate: '19 September 2023',
                scheduleDuration: '3 hr',
                scheduleEnrolled: '16 /16'
              },
              {
                id: 5,
                scheduleName: [
                    {
                        name: 'Tuesday Test (TQ)',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=0e8c2b56-45cd-ed11-a7c7-002248ebf4f9'
                    }
                ],
                scheduleDate: '19 September 2023',
                scheduleDuration: '2 hr',
                scheduleEnrolled: '4 /4'
              },
              {
                id: 6,
                scheduleName: [
                    {
                        name: 'Tuesday PM (One-to-one - Home) 星期二下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=0ff15447-b985-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '19 September 2023',
                scheduleDuration: '2 hr',
                scheduleEnrolled: '1 /1'
              },
              {
                id: 7,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '21 September 2023',
                scheduleDuration: '2 hr',
                scheduleEnrolled: '1 /1'
              },
              {
                id: 8,
                scheduleName: [
                    {
                        name: 'Thursday AM (Moderate-Severe Dementia Group) 星期四 （中期）早上',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=504136df-017f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '21 September 2023',
                scheduleDuration: '3 hr',
                scheduleEnrolled: '9 /9'
              },
              {
                id: 9,
                scheduleName: [
                    {
                        name: 'Friday PM (One-to-one - Centre) 星期五 （1-1）下午',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=1dbd0003-0c7f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '22 September 2023',
                scheduleDuration: '3 hr',
                scheduleEnrolled: '1 /1'
              },
              {
                id: 10,
                scheduleName: [
                    {
                        name: 'Friday PM (One-to-one - Zoom) 星期五 （1-1）下午视频',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=1dbd0003-0c7f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDate: '22 September 2023',
                scheduleDuration: '1 hr',
                scheduleEnrolled: '1 /1'
              }

            ],
        }
    },
    computed: {
        scheduleList(){
            if(this.inputSearchItemList.trim().length > 0){
                return this.schedules.filter(schedule => {
                    return schedule.scheduleName.some(item => {
                        return item.name.toLowerCase().includes(this.inputSearchItemList.trim().toLowerCase());
                    });
                })
            }else{
                return this.schedules
            }
        }
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
            this.visibleList = this.schedules.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);

        // if have 0 list client, go back a page
        if(this.visibleList.length === 0 && this.currentPage > 0){
        this.updatePage(this.currentPage - 1)
      }
    },
        backAdminHomepage() {
            this.$router.push({ path: '/adminhomepage' })
        },  
        moveToHomePage(){
            this.$router.push({ path: "/" })
    }
    }
}
</script>

<style>
.checkin-result:hover{
    background-color: rgba(100, 94, 94, 0.1);
    border-radius: 20px;  
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