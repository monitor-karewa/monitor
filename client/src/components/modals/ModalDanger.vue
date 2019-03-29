<template>
    <!-- MODAL ALERT DANGER -->
    <div class="modal modal-alert fade" id="modalAlertDanger" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="">Eliminar Usuario</h1>
                </div>
                <div class="modal-body">
                    <p class="text-centered">Esta accion borrara al usuario del catalogo permanentemente
                        <br>
                        <strong>¿Estas seguro de eliminarlo?</strong>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn-raised button-error m-l-15" @click="confirm">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- END MAIN ADMIN SECTION -->
</template>

<style>
</style>

<script>
    export default {
        data() {
            return {}
        },
        components: {},
        props:{
            confirm: Function
        }
    }
</script>
