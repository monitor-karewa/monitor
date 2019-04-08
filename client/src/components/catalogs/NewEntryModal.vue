<template>
    <div class="modal fade" id="newEntry" width="600" tabindex="-1" role="dialog">
        <form @submit.prevent="save()">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content min-w-600px">
                    <div class="modal-header">
                        <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                        <h1 class="modal-title">Nuevo <strong>Proveedor</strong></h1>
                        <label class="modal-subtitle">A continuación puedes agregar un nuevo Proveedor</label>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer aditional-text">
                        <!--<div class="total-footer">-->
                        <!--</div>-->
                        <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar</button>
                        <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
</style>


<script>
    // let catalogoProveedores = catalog.configure({
    //     storeModule: storeModule
    // });
    import { mapGetters } from 'vuex';
    import { bus } from '@/main';
    import { DOC_CREATED } from "@/store/events";

    export default {
        data() {
            return {

            }
        },
        components: {},
        created(){
        },
        methods: {
            save: function () {
                this.validator.$touch();
                if(!this.validator.$invalid){
                    let actionName;
                    if(this.$props.action && this.$props.action.length ){
                        actionName = this.$props.action;
                    } else {
                        actionName = "save";
                    }
                    console.log("this.$props.storeModule", this.$props.storeModule);
                    console.log("actionName", actionName);
                    console.log("this.$props.data", this.$props.data);
                    this.$store.dispatch(`${this.$props.storeModule}/${actionName}`, this.$props.data);
                    $('#newEntry').modal('hide');
                }
                //actions storeModule/<save>
                //actions storeModule/action

            }
        },
        props:{
            'data' : Object,
            'storeModule' : String,
            'action' : String,
            'validator' : Object
        }
    }
</script>

<!--//componente botón submit -->
