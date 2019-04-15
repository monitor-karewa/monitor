<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader
                    :singular="'Proveedor'"
                    :plural="'Proveedores'" />
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Proveedor'"
                    :plural="'Proveedores'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:validator="$v" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">

                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.name.placeholder')" v-model="$v.doc.name.$model"/>
                        <label class="fg-label">{{$t('suppliers.new.name.label')}}

                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.name.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span style="float: right">{{ doc && doc.name ? doc.name.length : 0}}/100</span>-->
                    <span v-if="$v.doc.name.$invalid && $v.doc.name.$dirty" class="c-error">{{nameErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.rfc.placeholder')" v-model.trim="$v.doc.rfc.$model"
                        @input="delayTouch($v.doc.rfc)">
                        <label class="fg-label">{{$t('suppliers.new.rfc.label')}}
                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.rfc.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.rfc.$invalid && $v.doc.rfc.$dirty" class="c-error">{{rfcErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('suppliers.new.notes.placeholder')" v-model="doc.notes">
                        <label class="fg-label">{{$t('suppliers.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('suppliers.new.notes.sub-label')}}</strong>
                        </label>
                    </div>
                </div>

            </div>
        </NewEntryModal>

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
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import  ModalDefault from "@/components/modals/ModalDefault";
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
                doc : {
                    name:"",
                    rfc:"",
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
            doc: {
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
                }
            }
        },
        computed: {
            nameErrorMessage() {
                if (!this.$v.doc.name.required) {
                    return "El nombre del Proveedor es requerido"
               }
               if(!this.$v.doc.name.minLength || !this.$v.doc.name.maxLength){
                   return `Debe estar entre ${this.$v.doc.name.$params.minLength.min} y ${this.$v.doc.name.$params.maxLength.max}`
               }
            },
            rfcErrorMessage(){
               if(!this.$v.doc.rfc.required){
                   return "El RFC del Proveedor es requerido"
               }
               if(!this.$v.doc.rfc.validRFC ){
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
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, ()=>{
                tShow("El proveedor fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.name = "";
                this.rfc = "";
                this.notes = "";
                this.$v.$reset();
                tShow("El proveedor fue creado correctamente", 'info');
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
