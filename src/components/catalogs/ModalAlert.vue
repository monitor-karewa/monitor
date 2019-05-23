<template>
    <div class="modal modal-alert fade" id="modalAlertSuccess" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="">{{title}}</h1>
                    <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                </div>
                <div class="modal-body">
                    <p class="text-centered">{{message}}
                        <br>
                        <strong>{{question}}</strong>
                    </p>
                </div>
                <div class="modal-footer">
                    <slot ></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
            }
        },
        props:{
            title:String,
            message:String,
            question:String
        }
    }
</script>

<style>

</style>