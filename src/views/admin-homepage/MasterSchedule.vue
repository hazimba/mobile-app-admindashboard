<template lang="pug">
b-container(style="border: 1px solid black; border-radius: 20px; background-color: rgba(100, 94, 94, 0.2); height: 90%")
    b-modal(id="select-day" title="Sorting Day")
        template
            b-form-group(label="Can select more that one : " v-slot="{ ariaDescribedby }")
                b-form-checkbox-group.mt-3(style="display: flex; flex-direction: column; gap: 0.75rem" v-model="daySelectedAll" :options="selectDay" :aria-describedby="ariaDescribedby" name="days")
        template(#modal-footer)
            div(style="width: 100%; display: flex; justify-content: space-between")
                b-button.px-5(variant="success" style="font-weight: 500" @click="$bvModal.hide('select-day')") OK
                b-button.px-4(variant="danger" style="font-weight: 500" @click="$bvModal.hide('select-day')") Close
    
    b-col.mt-5
        b-row.mb-3
          b-col.col-8(style="")
            h4.d-flex.justify-content-start.align-items-center Master Schedule
          b-col.col-4(style="d-flex justify-content-center align-items-center")
            b-row(class="" style="height: 1%; margin-right: 0.1rem;")
              b-col.col-12(class="d-flex align-items-center" style="position: relative;")
                BIconSearch(style="position: absolute; left: 30px")
                b-input(class="pr-1 pl-5 border border-dark d-flex justify-content-center align-items-center" style="border-radius: 20px; font-size: 0.75rem" placeholder="Search Name" type="text" v-model="inputSearchItemList")
        b-col(style="text-align: center; position: sticky; top: 0px")
            b-row.p-3(style="display: flex; align-items: center; justify-content: center; background-color: #50276D; color: white; font-weight: 400; width: 102.2%")
                b-col(cols="3" style="font-size: 0.85rem") Schedule Name
                b-col(cols="2" style="font-size: 0.85rem" class="d-flex justify-content-center align-items-center")
                    b-button(style="background-color: inherit; border: none; font-size: 0.85rem" @click="$bvModal.show('select-day')") Day
                        b-icon.mx-1(font-scale="0.9" icon="filter")
                b-col(cols="2" style="font-size: 0.85rem") Time
                b-col(cols="1" style="font-size: 0.85rem") Duration
                b-col(cols="2" style="font-size: 0.85rem") Created On
                b-col(cols="2" style="font-size: 0.85rem") Enrollment

        b-col(class="table__body" style="")
            b-row.p-2(v-for="schedule in scheduleList" :key="schedule.id" style="border: 1px solid black; display: flex; align-items: center; background-color: white")
                b-col(v-for="nameDetails in schedule.scheduleName" :key="nameDetails.name" cols="3")
                    a(style="text-decoration: none; border: 0px; background-color: inherit; color: blue; font-size: 0.85rem;" :href="nameDetails.redirectTo" target="_blank") {{ nameDetails.name }}
                b-col(cols="2" style="font-size: 0.85rem") {{ schedule.scheduleDay }}
                b-col(cols="2" style="font-size: 0.85rem") {{ schedule.scheduleTime }}
                b-col(cols="1" style="font-size: 0.85rem") {{ schedule.scheduleDuration }}
                b-col(cols="2" style="font-size: 0.85rem") {{ schedule.scheduleCreated }}
                b-col(v-for="enrolledDetails in schedule.scheduleEnrolled" :key="enrolledDetails.enrolled" col="2")
                    a(style="text-decoration: none; border: 0px; background-color: inherit; color: blue; font-size: 0.85rem;" :href="enrolledDetails.redirectTo" target="_blank") {{ enrolledDetails.enrolled }}                 
</template>

<script>
export default {
    data() {
        return {
            inputSearchItemList: '',
            schedules: [
              {
                id: 1,
                scheduleName: [
                    {
                        name: 'Tuesday PM (Mild Dementia Group) 星期二 （初期）下午',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=22e7e8d1-451a-ee11-8f6d-002248ecdc58'
                    }
                ],
                scheduleDay: 'Tues',
                scheduleTime: '14:00',
                scheduleDuration: '3 hr',
                scheduleCreated: '4 July 2023',
                scheduleEnrolled: [
                    {
                        enrolled: 12,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=22e7e8d1-451a-ee11-8f6d-002248ecdc58'
                    }
                ]
              },
              {
                id: 2,
                scheduleName: [
                    {
                        name: 'Thursday PM  周四下午',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=cdbf4d77-3d1a-ee11-8f6d-002248ecdc58'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:00',
                scheduleDuration: '3 hr',
                scheduleCreated: '4 July 2023',
                scheduleEnrolled: [
                    {
                        enrolled: 3,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=cdbf4d77-3d1a-ee11-8f6d-002248ecdc58'
                    }
                ]
              },
              {
                id: 3,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:30',
                scheduleDuration: '2 hr',
                scheduleCreated: '-',
                scheduleEnrolled: [
                    {
                        enrolled: 1,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ]
              },
              {
                id: 4,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:30',
                scheduleDuration: '2 hr',
                scheduleCreated: '-',
                scheduleEnrolled: [
                    {
                        enrolled: 1,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ]
              },
              {
                id: 5,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:30',
                scheduleDuration: '2 hr',
                scheduleCreated: '-',
                scheduleEnrolled: [
                    {
                        enrolled: 1,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ]
              },
              {
                id: 6,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:30',
                scheduleDuration: '2 hr',
                scheduleCreated: '-',
                scheduleEnrolled: [
                    {
                        enrolled: 1,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ]
              },
              {
                id: 7,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:30',
                scheduleDuration: '2 hr',
                scheduleCreated: '-',
                scheduleEnrolled: [
                    {
                        enrolled: 1,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ]
              },
              {
                id: 8,
                scheduleName: [
                    {
                        name: 'Thursday PM (One-to-one - Home) 星期四 下午（1-1）家',
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ],
                scheduleDay: 'Thur',
                scheduleTime: '14:30',
                scheduleDuration: '2 hr',
                scheduleCreated: '-',
                scheduleEnrolled: [
                    {
                        enrolled: 1,
                        redirectTo: 'https://orga7b5e99e.crm5.dynamics.com/main.aspx?appid=d951a007-cf7a-ed11-81ac-000d3a85cc97&pagetype=entityrecord&etn=crb5c_fow_session_schedule&id=d0db0126-067f-ed11-81ad-000d3a856a39'
                    }
                ]
              },
            ],
            selectDay: [
                { 
                    text: 'Monday', 
                    value: 'Monday' 
                },
                { 
                    text: 'Tuesday', 
                    value: 'Tuesday' 
                },
                { 
                    text: 'Wednesday', 
                    value: 'Wednesday' 
                },
                { 
                    text: 'Thursday', 
                    value: 'Thursday' 
                },
                { 
                    text: 'Friday', 
                    value: 'Friday' 
                }
            ],
            daySelectedAll: []
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
    methods: {
        backAdminHomepage() {
            this.$router.push({ path: '/adminhomepage' })
        },
        moveToHomePage(){
            this.$router.push({ path: "/" })
        }
    },
    
}
</script>

<style>
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