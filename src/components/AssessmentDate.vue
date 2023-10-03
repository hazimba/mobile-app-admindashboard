<template lang="pug">
b-container
    b-modal(:id="modal.modalItemId" hide-footer)
        template#modal-title 
        .d-block
            h3 List of Client Assessment
            ul(v-for="assess in modal.data" :key="assess.id")
                b-button.my-4(variant="outline-primary") {{ assess.assessment }}          
        b-button(@click="hideModal") Close

    b-table.client(:items="items" :fields="fields" fixed outlined responsive="md")
        template(v-slot:cell(name)="row")
            b-button#show-btn(size="sm" @click="openModal(row.item.id)"  class="mr-2" style="background-color: inherit; color: blue; border: none;")
                | {{ row.item.name }}
</template>
  
<script>
export default {
    data() {
        return {
            fields: ['name', 'client_status', 'start_date', 'last_active', 'programme'], 
            items: [
                { id: 1, name: "Alli Rani DO K R Thangavelu", client_status: "Active", start_date: "-", last_active: "13 / 7 / 2023", programme: "FOW", assessment: "Assessment 1 - 6 / 7 / 2023", _showDetails: false },
                { id: 2, name: "Ang Boy Koh", client_status: "Active", start_date: "-", last_active: "11 / 7 / 2023", programme: "CIP", assessment: "-", _showDetails: false }
            ],
            modal: {
                modalItemId: null,
                data: null,
            }
        }
    },
    methods: {
        openModal(itemId){
            this.modal.modalItemId = `modal-${itemId}`;
            this.modal.data = this.listModalData(this.modal.modalItemId);
            this.$nextTick(() => {
                this.$bvModal.show(this.modal.modalItemId);
            });

            console.log("data: ", this.modal.data);
        },
        hideModal(){
            this.$bvModal.hide(this.modal.modalItemId);

            this.modal.modalItemId = null;
            this.modal.data = null;
        },
        listModalData(modalItemId){
            const itemId = modalItemId.split("-")[1];

            return this.items
            .filter(item => item.id === +itemId);
        }
    }
}
</script>

<style scoped>
::v-deep .client th {
    background-color: #50276D;
    color: white;
    font-weight: 400;
}
</style>

