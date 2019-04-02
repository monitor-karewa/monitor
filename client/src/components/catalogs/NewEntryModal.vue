<template>
    <div class="modal fade" id="newEntry" width="600" tabindex="-1" role="dialog">
        <form @submit.prevent="save()">
            aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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

    export default {
        data() {
            return {
                dataa : this.$props.data
            }
        },
        computed:{
            hasErrors(){
                console.log("this.$props", this.$props.storeModule);
                console.log("this.$store", this.$store);
                return this.$store.getters[`${this.$props.storeModule}/hasErrors`]
            },
            dataModal(){
                return this.$props.data
            }
        },
        components: {},
        methods: {
            save: function () {

                this.$store.dispatch(`${this.$props.storeModule}/validateForm`, this.$props.data);

                if(!this.hasErrors){
                    console.log("Si entro aqui");
                    let actionName;
                    if(this.$props.action && this.$props.action.length ){
                        actionName = this.$props.action;
                    } else {
                        actionName = "save";
                    }
                    this.$store.dispatch(`${this.$props.storeModule}/${actionName}`, this.$props.data);
                    $('#newEntry').modal('hide');
                    console.log("this.$props.data", this.$props.data);

                    for(let prop in this.dataModal){
                        if(typeof this.dataModal[prop] !== 'function'){
                            this.dataModal[prop] = "";
                        }
                    }
                }
                //actions storeModule/<save>
                //actions storeModule/action

            }
        },
        props:{
            'data' : Object,
            'storeModule' : String,
            'action' : String
        }
    }
</script>

<!--//componente botón submit -->
