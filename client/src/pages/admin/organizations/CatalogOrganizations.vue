<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Organización'" :plural="'Organizaciones'" />
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Organización'"
                    :plural="'Organizaciones'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="{name:this.name}" v-bind:validator="$v">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre"
                               v-model="$v.name.$model">
                        <label class="fg-label">Nombre de la organización
                            <small></small>
                            <br>
                            <strong>Introduce el nombre de la organización</strong>
                        </label>
                    </div>
                    <span v-if="$v.name.$invalid && $v.name.$dirty" class="c-error">{{$t(nameErrorMessage, {field:'Nombre', maxLength:$v.name.$params.maxLength.max})}}</span>
                </div>

            </div>
        </NewEntryModal>

        <ModalDanger :title="'Eliminar Organización'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará a la organización del catálogo permanentemente
                <br>
                <strong>¿Estás seguro de eliminarlo?</strong>
            </p>
        </ModalDanger>
        <ModalDefault :title="$t(modalProperties.title)" :store-module="storeModule" :action="modalProperties.action">
            <p class="text-centered">{{$t(modalProperties.message,{ docsUpdatedLength: docsUpdatedLength })}}
                <br/>
                <strong>{{$t(modalProperties.confirmationQuestion)}}</strong>
            </p>
        </ModalDefault>
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import  ModalDefault from "@/components/modals/ModalDefault";
    const storeModule = 'organizations';
    const docName = 'organizations.organization';
    import { required, maxLength } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableColumns: [
                    {label:"organizations.name", field:'name', visible : true },
                    {label:"general.created-at", field:'created_at', visible : true , type:'Date'}
                ],
                name:"",
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                }
            }
        },
        computed:{
            nameErrorMessage(){
                if(!this.$v.name.required){
                    return 'organizations.validation.required';
                }
                if(!this.$v.name.maxLength){
                    return 'organizations.validation.max.name';
                }
            },
            ...mapGetters(storeModule,['docsUpdatedLength'])
        },
        components: {
            ModalDanger,
            ModalDefault
        },
        methods:{
            confirmDeletion(){
                this.deleteElementSelected();
            },
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, ()=>{
                tShow("La organización fue eliminada correctamente", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.name = "";
                this.$v.$reset();
                tShow("Elemento Creado!", 'info');
            });
        },
        validations:{
            name:{
                required,
                maxLength:maxLength(100)
            }
        },
        mounted(){
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();

                $('#toast-danger').click(function () {
                    tShow("Hubo un error en el proceso. Intenta de nuevo", 'danger');
                });
                $('#toast-info').click(function () {
                    tShow("Se informa del proceso por eso es un info", 'info');
                });
                $('#toast-warning').click(function () {
                    tShow("Complete todos los campos requeridos", 'alert');
                });
                $('#toast-success').click(function () {
                    tShow("Se ha completado el proceso correctamente sadasda adadasd sda dasdasdas dasda dasdasd ad adaspidjdj asoijdas", 'success');
                });
            });
        }
    }
</script>
