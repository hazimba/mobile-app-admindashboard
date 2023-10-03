<template lang="pug">
    div
        b-row(class="ErrorPage" cols="1")
            b-col(class="ErrorPage__sectionOne")
                p(class="ErrorPage__message")
                    | There's no page here.
            b-col(class="ErrorPage__sectionTwo")
                b-button(variant="success" @click="moveToHomePage")
                    | Back to HomePage
</template>
<script>
export default {
    name: 'ErrorPage',
    methods: {
        moveToHomePage(){
            this.$router.push({path: '/'})
        }
    }
    
}
</script>
<style lang="scss">
    
    .ErrorPage{
        height: 100vh;
        width: 100vw;
        align-content: center;

        &__sectionOne{
            .ErrorPage__message{
                font-size: 2rem;
            }
        }


        &__sectionTwo{

        }
    }


</style>