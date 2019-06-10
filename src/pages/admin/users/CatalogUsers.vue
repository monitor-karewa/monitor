<template>
    <div>
        <AdminMainSection :storeModule="storeModule">
            <BackButton />
            <CatalogHeader :singular="'Usuario'" :plural="'Usuarios'" :store-module="storeModule"/>
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Usuario'"
                    :plural="'Usuarios'" :hideEditButton="true"
            />
        </AdminMainSection>

        <ModalEntry v-bind:storeModule="storeModule" :validator="$v"
                       :entry="doc">

            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.name.placeholder')"
                               v-model="$v.doc.name.$model">
                        <label class="fg-label">{{$t('users.new.name.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.name.sub-label')}}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.name.$invalid && $v.doc.name.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Nombre'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.last-name.placeholder')"
                               v-model="$v.doc.lastName.$model">
                        <label class="fg-label">{{$t('users.new.last-name.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.last-name.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.lastName.$invalid && $v.doc.lastName.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Apellido/s'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.email.placeholder')"
                               v-model="$v.doc.email.$model" @input="delayTouch($v.doc.email)">
                        <label class="fg-label"> {{$t('users.new.email.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.email.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.email.$invalid && $v.doc.email.$dirty" class="c-error">{{$t(emailErrorMessage, {field:'Correo Electronico'})}}</span>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" value="" v-model="$v.doc.active.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.enabled.checkbox-label')}}</span>
                            <p class="fg-label "> {{$t('users.new.enabled.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                    <span v-if="$v.doc.active.$invalid && $v.doc.active.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Habilitado'})}}</span>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="input-radio-check col-md-12 p-0">
                            <div class=" check-container col-md-6">
                                <input class="m-t-20" type="radio" value="GENERAL" v-model="$v.doc.administratorType.$model" name="administratorType" id="one">
                                <span class="role m-t-20"
                                      for="general">{{$t('users.new.admin-type.radio-button.general')}}</span>
                                <p class="fg-label"> {{$t('users.new.admin-type.label')}}
                                    <small></small>
                                    <br>
                                    <strong>{{$t('users.new.admin-type.sub-label')}}</strong>
                                </p>
                            </div>
                            <div class=" check-container col-md-6">
                                <input value="CUSTOM" type="radio" v-model="$v.doc.administratorType.$model" name="role" id="two">
                                <span for="custom">{{$t('users.new.admin-type.radio-button.custom')}}</span>
                            </div>

                            <span v-if="$v.doc.administratorType.$invalid && $v.doc.administratorType.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Tipo de administrador'})}}</span>
                        </div>
                    </div>

                    <div v-if="doc.administratorType == 'CUSTOM'">
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="USERS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.users')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="SUPPLIERS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.suppliers')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="ORGANIZATIONS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.organizations')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="ADMINISTRATIVE_UNITS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.administrative-units')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="CONTRACTS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.contracts')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="RESOURCES" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.resources')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="CALCULATIONS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.calculations')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="SETTINGS" v-model="$v.doc.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.settings')}}</span>
                        </div>

                        <span v-if="$v.doc.permissions.$invalid && $v.doc.permissions.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Perfil'})}}</span>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('users.new.notes.placeholder')"
                               v-model="doc.notes">
                        <label class="fg-label">{{$t('users.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.notes.sub-label')}}}</strong>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer aditional-text" slot="footer">
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal"> Cancelar </button>
                <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar </button>
            </div>

        </ModalEntry>



        <ModalDanger :id="'modal-delete-entry'" :title="'Eliminar Usuario'" :confirm="confirmDeletion">
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
    import { DELETE_SUCCESS, DOC_CREATED, DOC_START_EDIT, DOC_UPDATED, DOC_START_CREATE } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import  ModalDefault from "@/components/modals/ModalDefault";
    import { required, email, minLength, requiredIf } from 'vuelidate/lib/validators';
    const touchMap = new WeakMap();
    import { mapGetters } from 'vuex';

    const storeModule = 'users';
    const docName = 'users.user';


    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : ['suppliers.name','Apellido','E-mail','general.created-at'],
                tableColumns: [
                    {label:'users.name', field : 'name', visible : true},
                    {label:'users.lastName', field : 'lastName', visible : true},
                    {label:'users.email', field : 'email', visible : true} ,
                    {label:'general.created-at', field : 'createdAt', visible : true, type:'Date'}
                ],
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                },
                doc:{
                    _id:null,
                    name:"",
                    lastName:"",
                    email:"",
                    active:true,
                    permissions : [],
                    administratorType : "CUSTOM",
                    notes:""
                }
            }
        },
        validations: {
            doc: {
                name: {required},
                lastName: {required},
                email: {
                    required,
                    email
                },
                active: {required},
                administratorType: {required},
                permissions: {
                    required: requiredIf(function () {
                        return this.administratorType == 'CUSTOM';
                    })
                }
            }
        },
        computed:{
            requiredErrorMessage(){
                return 'users.validation.required'
            },
            emailErrorMessage(){
                if(!this.$v.doc.email.required){
                    return 'users.validation.required'
                }
                if(!this.$v.doc.email.email){
                    return 'users.validation.email'
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
                    clearTimeout(touchMap.get($v));
                }
                touchMap.set($v, setTimeout($v.$touch, 1000));

            },
            clearEntry(){
                this.doc = {
                    _id:null,
                    name:"",
                    lastName:"",
                    email:"",
                    active:true,
                    permissions : [],
                    administratorType : "CUSTOM",
                    notes:""
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

            bus.$on(storeModule + DELETE_SUCCESS, (data) => {
                tShow("El usuario fue eliminado correctamente", 'info');

            });
            bus.$on(storeModule + DOC_CREATED, () => {
                    this.clearEntry();
                    this.doc.name = "";
                    this.doc.lastName = "";
                    this.doc.email = "";
                    this.doc.active = true;
                    this.doc.permissions = [];
                    this.doc.administratorType = "GENERAL";
                    this.doc.notes = "";
                    this.$v.$reset();

                    tShow("El usuario fue creado correctamente", 'success');
            });
            bus.$on(storeModule + DOC_UPDATED, () => {
                this.clearEntry();
                tShow("El usuario fue actualizado correctamente", 'success');
            });
            bus.$on(storeModule + DOC_START_EDIT, (entry) => {
                this.clearEntry();

                    this.doc._id = entry._id;

                    this.doc.name = entry.name;
                    this.$v.doc.name.$touch();

                    this.doc.lastName = entry.lastName;
                    this.$v.doc.lastName.$touch();

                    this.doc.email = entry.email;
                    this.$v.doc.email.$touch();

                    this.doc.active = entry.active;
                    this.$v.doc.active.$touch();

                    this.doc.permissions = entry.permissions || [];
                    this.$v.doc.permissions.$touch();

                    this.doc.administratorType = entry.administratorType || "GENERAL";
                    this.$v.doc.administratorType.$touch();

                    this.doc.notes = entry.notes || "";

            });
            bus.$on(storeModule + DOC_START_CREATE, () => {
                this.clearEntry();
            });
        },
        mounted(){
            this.initAllBusEvents();

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
                    tShow("Se ha completado el proceso correctamente.", 'success');
                });
            });

        }
    }
</script>
