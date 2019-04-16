<template>
    <div>
        <AdminMainSection>
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

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entrySelectedEditable">

            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.name.placeholder')" v-model="entrySelectedEditable.name" />
                        <label class="fg-label">{{$t('suppliers.new.name.label')}}
                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.name.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entrySelectedEditable.name.$invalid && $v.entrySelectedEditable.name.$dirty" class="c-error">{{nameErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.rfc.placeholder')" v-model.trim="entrySelectedEditable.rfc" @input="delayTouch($v.entrySelectedEditable.rfc);">
                        <label class="fg-label">{{$t('suppliers.new.rfc.label')}}
                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.rfc.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entrySelectedEditable.rfc.$invalid && $v.entrySelectedEditable.rfc.$dirty" class="c-error">{{rfcErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('suppliers.new.notes.placeholder')" v-model="entrySelectedEditable.notes">
                        <label class="fg-label">{{$t('suppliers.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('suppliers.new.notes.sub-label')}}</strong>
                        </label>
                    </div>
                </div>

            </div>
        </ModalEntry>

        <ModalDanger :title="'Eliminar Proveedor'" :confirm="confirmDeletion">
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
    import { DELETE_SUCCESS, DOC_CREATED, DOC_START_EDIT } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import  ModalDefault from "@/components/modals/ModalDefault";
    import  ModalEntry from "@/components/catalogs/ModalEntry";
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
                    { label: 'general.created-at', field:'created_at', type:'Date', visible : true}
                ],
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                },
                entrySelectedEditable : {
                    name : "",
                    rfc : "",
                    notes: ""
                }
            }
        },
        validations:{
            entrySelectedEditable : {
                name: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(100)
                },
                rfc: {
                    required,
                    validRFC: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return (/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/).test(value);
                    }
                },
                notes:{}
            }
        },
        computed: {
            nameErrorMessage(){
               if(!this.$v.entrySelectedEditable.name.required){
                   return "El nombre del Proveedor es requerido"
               }
               if(!this.$v.entrySelectedEditable.name.minLength || !this.$v.entrySelectedEditable.name.maxLength){
                   return `Debe estar entre ${this.$v.entrySelectedEditable.name.$params.minLength.min} y ${this.$v.entrySelectedEditable.name.$params.maxLength.max}`
               }
            },
            rfcErrorMessage(){
               if(!this.$v.entrySelectedEditable.rfc.required){
                   return "El RFC del Proveedor es requerido"
               }
               if(!this.$v.entrySelectedEditable.rfc.validRFC ){
                   return "El RFC introducido no tiene un formato válido"
               }
            },
            ...mapGetters(storeModule,['docsUpdatedLength'])
        },
        components: {
            ModalDanger,
            ModalDefault,
            ModalEntry
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
                this.$store.dispatch(`${storeModule}/clearSelectedEntry`);
                this.$v.$reset();
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
            bus.$on(storeModule+DOC_START_EDIT, (entry)=>{
                this.entrySelectedEditable.name = entry.name;
                this.$v.entrySelectedEditable.name.$touch();
                this.entrySelectedEditable.rfc = entry.rfc;
                this.$v.entrySelectedEditable.rfc.$touch();
                this.entrySelectedEditable.notes = entry.notes;
                this.$v.entrySelectedEditable.notes.$touch();
            });
        },
        mounted(){
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
