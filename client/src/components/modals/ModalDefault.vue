<template>
    <div class="modal modal-alert fade" id="modalAlertDefault" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="">{{title}}</h1>
                </div>
                <div class="modal-body">
                    <p class="text-centered">{{message}}
                        <br/>
                        <strong>{{confirmationQuestion}}</strong>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">{{cancelButtonText}}
                    </button>
                    <button type="button" class="btn-raised button-accent m-l-15" data-dismiss="modal" @click="confirmAction">{{okButtonText}}</button>
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
        methods:{
           confirmAction(){
               this.$store.dispatch(`${this.$props.storeModule}/${this.$props.action}`);
           }
        },
        props:{
          "title" : String,
          "message" : String,
          "confirmationQuestion" : String,
          "storeModule" : String,
          "cancelButtonText" : String,
          "okButtonText" : String,
          "action" : String
        }
    }
</script>

<style>

</style>