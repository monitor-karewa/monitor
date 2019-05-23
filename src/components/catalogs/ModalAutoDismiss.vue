<template>
    <div class="modal fade" id="modalAutoDismiss" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="content-img">
                        <img class="img-fluid" src="@/assets/images/Illustrations/files-download.svg" alt=""/>
                        <p>{{message}}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-stroke button-accent" data-dismiss="modal">Entendido
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ModalAutoDismiss',
        data(){
            return {}
        },
        props:{
            'message' : String
        }
    }
</script>

<style>

</style>