<template lang="pug">
    div
        b-modal(:id="modalName" size="lg" title="Delete Confirmation" centered)
            template
                p(class="ModalDeleteConfirmation__Message")
                    | Are you sure to delete? You won't be able to restore this data again.
            template(#modal-footer)
                b-button(size="sm" variant="danger" @click="deleteItem")
                    | Delete
                b-button(size="sm" variant="outline-secondary" @click="dissmiss")
                    | Cancel

</template>

<script>
import { dynamicDeleteModalName } from '@/assets/Utilities/helperModal';
import { mapMutations } from 'vuex';
import { TABLE } from '@/store/ModuleName';

export default {
    name: 'ModalDeleteConfirmation',
    props: {
        tableType: {
            type: String,
            required: true,
        },
        itemId: {
            type: String,
            required: true,
        },
        convId: {
            type:String
        }
    },
    data() {
        return {
            choiceTableType: ['Announcements', 'Reminders'],
        }
    },
    computed: {
        modalName(){
            return dynamicDeleteModalName(this.itemId);
        }
    },
    methods: {
        ...mapMutations(TABLE, ['deleteAnnouncementsItem', 'deleteRemindersItem']),
        deleteItem(){
            if(this.tableType === this.choiceTableType[0]){
                this.deleteAnnouncementsItem({ id: this.itemId, convId: this.convId });
                this.$bvModal.hide(this.modalName);
                this.alertDelete();
                this.notifyID(this.itemId);

                return;
            }

            if(this.tableType === this.choiceTableType[1]){
                this.deleteRemindersItem({ id: this.itemId });
                this.$bvModal.hide(this.modalName);
                this.alertDelete();
                this.notifyID(this.itemId);

                return;
            }
        },
        dissmiss(){
            this.$bvModal.hide(this.modalName);
        },
        alertDelete(){
            this.$emit('alert-delete');
        },
        notifyID(id){
            this.$emit('notify-id', id);
        }
    },
}
</script>

<style lang="scss">
    
    .ModalDeleteConfirmation__Message{
        font-size: 1.2rem;
    }

</style>