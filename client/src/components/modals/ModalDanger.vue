<template>
    <!-- MODAL ALERT DANGER -->
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
                    <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn-raised button-error m-l-15" data-dismiss="modal" @click="confirm">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
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
            title: String,
            confirm: Function,
            id: String
        }
    }
</script>
