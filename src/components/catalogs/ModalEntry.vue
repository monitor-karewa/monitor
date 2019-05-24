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
                        <h1 v-show="!isEditing" class="modal-title">Nuevo(a) <strong>{{$tc(docName, 1)}}</strong></h1>
                        <h1 v-show="isEditing" class="modal-title">Editar <strong>{{$tc(docName, 1)}}</strong></h1>
                        <label v-show="!isEditing" class="modal-subtitle">A continuación puedes agregar un(a) {{$tc(docName, 1)}}</label>
                        <label v-show="isEditing" class="modal-subtitle">A continuación puedes editar un(a) {{$tc(docName, 1)}}</label>
                    </div>


                    <!-- CUSTOM BODY -->
                    <div class="modal-body">
                        <slot></slot>
                    </div>


                    <!-- FOOTER -->
                    <slot name="footer"></slot>

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
                },
                isEditing: function (state) {
                    return state[this.$props.storeModule].isEditing;
                },
            })
        },
        created(){},
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
                    if(this.$props.requestConfig != undefined){
                        this.$props.entry.requestConfig =  this.$props.requestConfig;
                    }
                    this.$store.dispatch(`${this.$props.storeModule}/${actionName}`, this.$props.entry);
                    if(this.$props.storeModule !== 'contracts' && this.$props.storeModule !== 'calculations'){
                        $('#ModalEntry').modal('hide');
                    }
                } else {
                    tShow('El formulario contiene errores', 'info');
                }
            }
        },
        props:{
            'entry' : Object,
            'requestConfig':Object,
            'storeModule' : String,
            'action' : String,
            'validator' : Object
        }
    }
</script>
