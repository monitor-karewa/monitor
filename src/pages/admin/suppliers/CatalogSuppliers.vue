<template>
    <div>
        <AdminMainSection :storeModule="storeModule">
            <BackButton />
            <CatalogHeader
                    :singular="'Proveedor'"
                    :plural="'Proveedores'"
                    :store-module="storeModule"/>
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Proveedor'"
                    :plural="'Proveedores'"
            />
        </AdminMainSection>

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entry">

            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.name.placeholder')" v-model="entry.name"  @input="delayTouch($v.entry.name)"/>
                        <label class="fg-label">{{$t('suppliers.new.name.label')}}
                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.name.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.name.$invalid && $v.entry.name.$dirty" class="c-error">{{nameErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.rfc.placeholder')" v-model.trim="entry.rfc" @input="delayTouch($v.entry.rfc);">
                        <label class="fg-label">{{$t('suppliers.new.rfc.label')}}
                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.rfc.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.rfc.$invalid && $v.entry.rfc.$dirty" class="c-error">{{rfcErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('suppliers.new.notes.placeholder')" v-model="entry.notes">
                        <label class="fg-label">{{$t('suppliers.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('suppliers.new.notes.sub-label')}}</strong>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer aditional-text" slot="footer">
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal"> Cancelar </button>
                <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar </button>
            </div>
        </ModalEntry>

        <ModalDanger :id="'modal-delete-entry'" :title="'Eliminar Proveedor'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el registro del catálogo permanentemente
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
    import  ModalDanger from "@/components/modals/ModalDanger";
    import  ModalDefault from "@/components/modals/ModalDefault";
    import { DELETE_SUCCESS, DOC_CREATED, DOC_START_EDIT, DOC_UPDATED, DOC_START_CREATE } from "@/store/events";
    const storeModule = 'suppliers';
    const docName = 'suppliers.supplier';
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    const touchMap = new WeakMap();
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
                    { label: 'suppliers.name', field:'name', visible : true},
                    { label: 'suppliers.rfc', field:'rfc', visible : true},
                    { label: 'suppliers.notes' ,field:'notes', visible : true},
                    { label: 'general.created-at', field:'createdAt', type:'Date', visible : true}
                ],
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                },
                entry : {
                    _id: "",
                    name : "",
                    rfc : "",
                    notes: ""
                }
            }
        },
        validations:{
            entry : {
                name: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(100),
                    validName: (value) => {
                        if (value == null || value === undefined || value === "") {
                            return true
                        }
                        return (/^[A-Z\sÑ]+$/).test(value);
                    }
                },
                rfc: {
                    //required,
                    validRFC: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return true
//                        return (/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/).test(value);
                    }
                }
            }
        },
        computed: {
            nameErrorMessage(){
               if(!this.$v.entry.name.required){
                   return "El nombre del Proveedor es requerido"
               }
               if(!this.$v.entry.name.minLength){
                   return `La longitud mínima es ${this.$v.entry.name.$params.minLength.min} caracteres`
               }
               if(!this.$v.entry.name.maxLength){
                   return `La longitud máxima es ${this.$v.entry.name.$params.maxLength.max} caracteres`
               }

               if(!this.$v.entry.name.validName){
                    return "El nombre debe estar en mayúsculas y no debe contener tildes ni caracteres especiales"
                }
            },
            rfcErrorMessage(){
               //if(!this.$v.entry.rfc.required){
                 //  return "El RFC del Proveedor es requerido"
               //}
               if(!this.$v.entry.rfc.validRFC ){
                   return "El RFC introducido no tiene un formato válido"
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
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 1000))
            },
            clearEntry(){
                this.entry = {
                    _id: "",
                    name : "",
                    rfc : "",
                    notes: ""
                };
                this.$v.$reset();
            },
            initAllBusEvents(){
                let busDelete = bus._events[storeModule + DELETE_SUCCESS];
                let busCreate = bus._events[storeModule + DOC_CREATED];
                let busUpdate = bus._events[storeModule + DOC_UPDATED];

                busDelete.splice(1, busDelete.length - 1);
                busCreate.splice(1, busCreate.length - 1);
                busUpdate.splice(1, busUpdate.length - 1);
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, ()=>{
                tShow("El proveedor fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.clearEntry();
                tShow("El proveedor fue creado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_START_CREATE, ()=>{
                this.clearEntry();
            });
            bus.$on(storeModule+DOC_START_EDIT, (entry)=>{
                this.clearEntry();
                this.entry._id = entry._id;

                this.entry.name = entry.name;
                this.$v.entry.name.$touch();

                this.entry.rfc = entry.rfc;
                this.$v.entry.rfc.$touch();

                this.entry.notes = entry.notes;
            });
            bus.$on(storeModule+DOC_UPDATED, ()=>{
                this.clearEntry();
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
