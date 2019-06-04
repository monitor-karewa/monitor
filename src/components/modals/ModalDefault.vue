<template>
    <div class="modal modal-alert fade" :id="id" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="">{{title}}</h1>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button v-show="!hideCancelButton" type="button" class="btn-stroke button-info_text" data-dismiss="modal">{{$t('general.modal-editable-table.cancel-button')}}
                    </button>
                    <button type="button" class="btn-raised button-accent m-l-15" data-dismiss="modal" @click="confirmAction">{{$t(this.confirmActionButtonText)}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalDefault',
        data(){
            return{

            }
        },
        sockets: {
            connect: function () {
            }
        },
        methods:{
           confirmAction(){
               if (this.closeOnly) {
                   //Do nothing, only close
               } else {
                   this.$store.dispatch(`${this.$props.storeModule}/${this.$props.action}`);
                   if(this.reloadNotifications) {
                        this.$socket.emit('new_notifications');
                   }

               }
           }
        },
        props:{
            "id": {
                type: String,
                default: 'modalAlertDefault'
            },
            "title": String,
            "storeModule": String,
            "action": String,
            "hideCancelButton": {
                type: Boolean,
                default: false
            },
            "confirmActionButtonText": {
                type: String,
                default: 'general.modal-editable-table.ok-button'
            },
            "closeOnly": {
                type: Boolean,
                default: false
            },
            "reloadNotifications": {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style>

</style>