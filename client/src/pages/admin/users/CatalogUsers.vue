<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Usuario'" :plural="'Usuarios'" />
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Usuario'"
                    :plural="'Usuarios'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" :validator="$v"
                       :data="{name:this.name, lastName:this.lastName, email:this.email, active:this.active,
                        administratorType:this.administratorType, permissions:this.permissions, notes:this.notes}">

            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.name.placeholder')"
                               v-model="$v.name.$model">
                        <label class="fg-label">{{$t('users.new.name.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.name.sub-label')}}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.name.$invalid && $v.name.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Nombre'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.last-name.placeholder')"
                               v-model="$v.lastName.$model">
                        <label class="fg-label">{{$t('users.new.last-name.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.last-name.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.lastName.$invalid && $v.lastName.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Apellido/s'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.email.placeholder')"
                               v-model="$v.email.$model" @input="delayTouch($v.email)">
                        <label class="fg-label"> {{$t('users.new.email.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.email.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.email.$invalid && $v.email.$dirty" class="c-error">{{$t(emailErrorMessage, {field:'Correo Electronico'})}}</span>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" value="" v-model="$v.active.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.enabled.checkbox-label')}}</span>
                            <p class="fg-label "> {{$t('users.new.enabled.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                    <span v-if="$v.active.$invalid && $v.active.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Habilitado'})}}</span>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="input-radio-check col-md-12 p-0">
                            <div class=" check-container col-md-6">
                                <input class="m-t-20" type="radio" value="GENERAL" v-model="$v.administratorType.$model" name="administratorType" id="one">
                                <span class="role m-t-20"
                                      for="general">{{$t('users.new.admin-type.radio-button.general')}}</span>
                                <p class="fg-label"> {{$t('users.new.admin-type.label')}}
                                    <small></small>
                                    <br>
                                    <strong>{{$t('users.new.admin-type.sub-label')}}</strong>
                                </p>
                            </div>
                            <div class=" check-container col-md-6">
                                <input value="CUSTOM" type="radio" v-model="$v.administratorType.$model" name="role" id="two">
                                <span for="custom">{{$t('users.new.admin-type.radio-button.custom')}}</span>
                            </div>

                            <span v-if="$v.administratorType.$invalid && $v.administratorType.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Tipo de administrador'})}}</span>
                        </div>
                    </div>

                    <div v-if="administratorType == 'CUSTOM'">
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="USERS" v-model="$v.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.users')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="SUPPLIERS" v-model="$v.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.suppliers')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="ADMINISTRATIVE_UNITS" v-model="$v.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.administrative-units')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="CONTRACTS" v-model="$v.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.contracts')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="CALCULATIONS" v-model="$v.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.calculations')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="SETTINGS" v-model="$v.permissions.$model">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.settings')}}</span>
                        </div>

                        <span v-if="$v.permissions.$invalid && $v.permissions.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Perfil'})}}</span>
                    </div>
                    </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('users.new.notes.placeholder')"
                               v-model="notes">
                        <label class="fg-label">{{$t('users.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.notes.sub-label')}}}</strong>
                        </label>
                    </div>
                </div>
            </div>


        </NewEntryModal>



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
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
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
                    {label:'general.created-at', field : 'created_at', visible : true, type:'Date'}
                ],
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                },
                name:"",
                lastName:"",
                email:"",
                active:true,
                permissions : [],
                administratorType : "CUSTOM",
                notes:""
            }
        },
        validations:{
            name:{ required },
            lastName:{ required },
            email:{
                required,
                email
            },
            active:{ required },
            administratorType: { required },
            permissions: {
                required: requiredIf(function(){
                  return this.administratorType == 'CUSTOM';
                })
            }

        },
        computed:{
            requiredErrorMessage(){
                return 'users.validation.required'
            },
            emailErrorMessage(){
                if(!this.$v.email.required){
                    return 'users.validation.required'
                }
                if(!this.$v.email.email){
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
            confirmDeletion() {
                tShow("El usuario fue eliminado correctamente", 'info');
            },
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v));
                }
                touchMap.set($v, setTimeout($v.$touch, 1000));

            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, (data)=>{
                tShow("Elemento Eliminado!!", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.name = "";
                this.lastName = "";
                this.email = "";
                this.active = true;
                this.permissions  =  [];
                this.administratorType  =  "CUSTOM";
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
