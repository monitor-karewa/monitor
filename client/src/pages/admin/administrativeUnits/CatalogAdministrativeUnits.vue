<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Unidad Administrativa'" :plural="'Unidades Administrativas'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Unidad Administrativa'" :plural="'Unidades Administrativas'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="{name: this.name, notes: this.notes}" :validator="$v">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('administrativeUnits.new.name.placeholder')"
                               v-model="$v.name.$model">
                        <label class="fg-label">{{$t("administrativeUnits.new.name.label")}}
                            <small></small>
                            <br>
                            <strong>{{$t("administrativeUnits.new.name.sub-label")}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.name.$invalid && $v.name.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Nombre'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('administrativeUnits.new.notes.placeholder')"
                               v-model="$v.notes.$model">
                        <label class="fg-label">{{$t("administrativeUnits.new.notes.label")}}
                            <small></small>
                            <br>
                            <strong>{{$t("administrativeUnits.new.notes.sub-label")}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.notes.$invalid && $v.notes.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Notas'})}}</span>
                </div>
            </div>
        </NewEntryModal>



        <ModalDanger :title="'Eliminar Unidad Administrativa'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el usuario del catálogo permanentemente
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
    import { required } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';

    const storeModule = 'administrativeUnits';
    const docName = 'administrativeUnits.administrativeUnit';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : ['suppliers.name',
                     'suppliers.notes','general.created-at'],
                tableColumns: [
                    {label : "administrativeUnits.name", visible : true , field:'name'},
                    {label : "administrativeUnits.notes", visible : true , field:'notes'},
                    {label : "general.created-at", visible : true , field:'created_at', type:'Date'}
                ],
                name:"",
                notes:"",
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                }
            }
        },
        validations:{
          name:{ required },
          notes:{ required }
        },
        computed:{
            requiredErrorMessage(){
                return 'administrativeUnits.validation.required'
            },
            ...mapGetters(storeModule,['docsUpdatedLength'])
        },
        components: {
            ModalDanger,
            ModalDefault
        },
        methods:{
            confirmDeletion() {
                tShow("La unidad administrativa fue eliminada correctamente", 'info');
            },
            confirm(){
                console.log("confirm function");
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, (data)=>{
                tShow("La unidad administrativa fue eliminada correctamente", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.name = "";
                this.notes = "";
                this.$v.$reset();
                tShow("Elemento Creado!", 'info');
            });
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
