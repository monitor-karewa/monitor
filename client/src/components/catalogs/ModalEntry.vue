<--
    Component to create and edit entries for any catalog
-->
<template>
    <div class="modal fade" id="ModalEntry" width="600" tabindex="-1" role="dialog">
        <form @submit.prevent="save()">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content min-w-600px">

                    <!-- HEADER -->
                    <div class="modal-header">
                        <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                        <h1 class="modal-title">Nuevo(a) <strong>{{$tc(docName, 1)}}</strong></h1>
                        <label class="modal-subtitle">A continuación puedes agregar un(a) {{$tc(docName, 1)}}</label>
                    </div>


                    <!-- CUSTOM BODY -->
                    <div class="modal-body">
                        <slot></slot>
                    </div>


                    <!-- FOOTER -->
                    <div class="modal-footer aditional-text">
                        <button type="button" class="btn-stroke button-info_text" data-dismiss="modal"> Cancelar </button>
                        <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar </button>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>

<style>
</style>


<script>
    import { bus } from '@/main';
    import { DOC_CREATED } from "@/store/events";
    import { mapState } from 'vuex';

    export default {
        data() {
            return {}
        },
        components: {},
        computed: {
            ...mapState({
                docName: function (state) {
                    return state[this.$props.storeModule].docName
                }
            })
        },
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
                    this.$store.dispatch(`${this.$props.storeModule}/${actionName}`, this.$props.entry);
                    $('#ModalEntry').modal('hide');
                } else {
                    tShow('El formulario contiene errores', 'info');
                }
            }
        },
        props:{
            'entry' : Object,
            'storeModule' : String,
            'action' : String,
            'validator' : Object
        }
    }
</script>
