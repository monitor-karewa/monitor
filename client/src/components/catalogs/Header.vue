<template>
    <div class="col-12">
        <!--<p>-->
            <!--Floating title for list.-->
        <!--</p>-->
        <div class="floating-title-form">
            <div class="side-left">
                <h1>Catálogo de <strong>{{plural}}</strong></h1>
                <label>Administra, elimina o agrega  {{plural}}.</label>
            </div>
            <div class="side-right">
                <a class="btn-raised xs button-accent" data-toggle="modal" data-target="#ModalEntry" @click="resetModal();"><i class="zmdi zmdi-plus"></i> Nuevo(a) {{singular}}</a>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        methods : {
            resetModal(){
                //HACK find a better way to execute this
                window.$('.selectpicker').selectpicker();
                window.$('.selectpicker').selectpicker('refresh');

                $('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker('refresh');
                this.$store.dispatch(`${this.storeModule}/clearSelectedEntry`);
            }
        },
        props : {
            singular : String,
            plural : String,
            storeModule: String
        }

    }
</script>
