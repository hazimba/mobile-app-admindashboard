<template lang="pug">
    div
        b-modal(v-model="isModalShow" id="modal-sm" size="sm" title="" centered ok-only)
            | Form send successful!
</template>

<script>
export default {
    name: 'ModalPrompt',
    props: {
        isModalShow: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="scss">
    
</style>