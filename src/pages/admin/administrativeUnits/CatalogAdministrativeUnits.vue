<template>
    <div>
        <AdminMainSection :storeModule="storeModule">
            <BackButton />
            <CatalogHeader :singular="'Unidad Administrativa'" :plural="'Unidades Administrativas'" :store-module="storeModule" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Unidad Administrativa'" :plural="'Unidades Administrativas'"
            />
        </AdminMainSection>

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entry">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('administrativeUnits.new.name.placeholder')"
                               v-model="entry.name">
                        <label class="fg-label">{{$t("administrativeUnits.new.name.label")}}
                            <small></small>
                            <br>
                            <strong>{{$t("administrativeUnits.new.name.sub-label")}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.name.$invalid && $v.entry.name.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Nombre'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('administrativeUnits.new.notes.placeholder')"
                               v-model="entry.notes">
                        <label class="fg-label">{{$t("administrativeUnits.new.notes.label")}}
                            <small></small>
                            <br>
                            <strong>{{$t("administrativeUnits.new.notes.sub-label")}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.notes.$invalid && $v.entry.notes.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Notas'})}}</span>
                </div>
            </div>
            <div class="modal-footer aditional-text" slot="footer">
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal"> Cancelar </button>
                <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar </button>
            </div>
        </ModalEntry>

        <ModalDanger :id="'modal-delete-entry'"  :title="'Eliminar Unidad Administrativa'" :confirm="confirmDeletion">
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
    import * as events from "@/store/events";
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
                    {label : "general.created-at", visible : true , field:'createdAt', type:'Date'}
                ],
                entry:{
                    name:"",
                    notes:"",
                },
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                }
            }
        },
        validations: {
            entry: {
                name: {required},
                notes: {/*required*/}
            }
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
            confirmDeletion(){
                this.deleteElementSelected();
            },
            clearEntry(){
                this.entry = {};
                this.$v.$reset();
            },
            initAllBusEvents(){
                let busDelete = bus._events[storeModule + events.DELETE_SUCCESS];
                let busCreate = bus._events[storeModule + events.DOC_CREATED];
                let busUpdate = bus._events[storeModule + events.DOC_UPDATED];

                busDelete.splice(1, busDelete.length - 1);
                busCreate.splice(1, busCreate.length - 1);
                busUpdate.splice(1, busUpdate.length - 1);
            }
        },
        created(){
            bus.$on(storeModule+events.DELETE_SUCCESS, (data)=>{
                tShow("La unidad administrativa fue eliminada correctamente", 'info');
            });
            bus.$on(storeModule+events.DOC_CREATED, ()=>{
                this.entry.name = "";
                this.entry.notes = "";
                this.$v.$reset();
                tShow("La unidad administrativa fue creada correctamente", 'info');
            });
            bus.$on(storeModule+events.DOC_START_EDIT, (entry)=>{
                this.entry.name = entry.name;
                this.$v.entry.name.$touch();
            });
            bus.$on(storeModule+events.DOC_UPDATED, ()=>{
                tShow("Los cambios en la unidad administrativa fueron guardados", 'info');
                this.clearEntry();
            });
            bus.$on(storeModule+events.DOC_START_CREATE, ()=>{
                this.clearEntry();
            });
            bus.$on(storeModule+events.DOC_START_EDIT, (entry)=>{
                this.clearEntry();
                this.entry._id = entry._id;
                this.entry.name = entry.name;
                this.$v.entry.name.$touch();
                this.entry.notes = entry.notes;
                this.$v.entry.notes.$touch();
            });
        },
        mounted(){
            this.initAllBusEvents();
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
