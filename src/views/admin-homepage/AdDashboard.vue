<template lang="pug">
b-container(style="border: 1px solid black; border-radius: 20px; background-color: rgba(100, 94, 94, 0.2); height: 90%")

    b-row.ml-1.d-flex.justify-content-around(style=" height: 100%;")
        b-col.my-3(class="col-6 justify-content-center align-items-center" style="")
            b-row(style="height: 50%")
                b-col(class="col-12 justify-content-center align-items-center" style="border: 1px solid black;  border-radius: 20px; background-color: white") 
                    b-row 
                        b-col.col-12.mt-3()
                            span.align-items-start.justify-content-start.d-flex(style="font-size: 1.2rem; font-weight: 600;") Newly Registered
                    b-row(style="text-align: start")
                        b-col.col-12 
                            span New register client as for today 15th September 2023
                    b-row.justify-content-center.align-items-center.mt-5(style="")
                        router-link(to="/client" class="registered-button" style="text-decoration: none;") 13  
            b-row(style="height: 50%")
                b-col.mt-3(class="col-12 justify-content-center align-items-center" style="border: 1px solid black; border-radius: 20px; background-color: white") 
                    b-row.col-12.mt-3(style="font-size: 1.2rem; font-weight: 600") 
                        span.align-items-start.justify-content-start.d-flex(style="font-size: 1.2rem; font-weight: 600") Upcoming Assessment   
                    b-row.col-12 CIP : 3
                    b-row.col-12 FOW : 4
                    b-row.justify-content-center.align-items-center.mt-4(style="") 
                        router-link(to="/upcoming" class="upcoming-button" style="text-decoration: none;") 7  
        b-col.my-3.col-5(style="border: 1px solid black; border-radius: 20px; background-color: #D6CCC2; display: flex")
            b-carousel(v-model="slide" controls indicators class="custom-carousel" :interval="40000" img-width="1024" img-height="1000")
                template(id="prev")
                    i.fas.fa-arrow-left
                template(id="next")
                    i.fas.fa-arrow-right
                b-carousel-slide(v-for="schedule in schedules" :key="schedule.id" caption="" img-blank)    
                    b-row.my-3 
                        b-col.col-6
                            router-link.align-items-start.justify-content-start.d-flex(style="font-size: 1.2rem; font-weight: 600; color: black" to="/weekly") Today's Schedule 
                        b-col.col-6 
                            span.align-items-end.justify-content-end.d-flex(style="color: black") {{ schedule.id }} / 3
                    b-row.mx-4.my-5( style="margin-top: 1.5rem") 
                        b-col.col-12(class="justify-content-center align-items-center" style="color: black") {{ schedule.scheduleName }}
                            b-row(style="margin-top: 1.5rem") 
                                b-col.col-12(class="justify-content-center align-items-center" style="color: black") Check In:  {{ schedule.checkIn }}
                                b-col.col-12(class="justify-content-center align-items-center" style="color: black") Check Out: {{ schedule.checkOut }}
                        b-col.col-12.mt-2(class="justify-content-center align-items-center" style="color: black") Time : {{ schedule.scheduleTime }} 
                            b-row(style="margin-top: 1.5rem")
                                b-col.col-12(class="justify-content-center align-items-center" style="color: black") 
</template>

<script>
export default{
    data(){
        return{
            schedules:[
                {
                    id: 1,
                    scheduleName: 'Monday PM (Mild Dementia Group) 星期一 （初期） 下午',
                    checkIn: 16,
                    checkOut: 18,
                    scheduleTime: '2.30pm'
                },
                {
                    id: 2,
                    scheduleName: 'Monday AM (Mild Dementia Group) 星期一 （初期）早上',
                    checkIn: 7,
                    checkOut: 7,
                    scheduleTime: '10:00am'
                },
                {
                    id: 3,
                    scheduleName: 'Monday PM (One-to-one - Home) 星期二下午（1-1）家',
                    checkIn: 1,
                    checkOut: 1,
                    scheduleTime: '3.00pm'
                },
            ]
        }
    }
}

</script>

<style>
.registered-button,
.upcoming-button{
    color: black; font-weight: 700; font-size: 2.75rem; color: inherit; padding: 10px
}

a > .carousel-control-prev-icon,
.carousel-control-next-icon {
    opacity: 1;
}

</style>