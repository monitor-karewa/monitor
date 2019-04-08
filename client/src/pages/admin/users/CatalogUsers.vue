<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Usuario'" :plural="'Usuarios'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Usuario'"
                    :plural="'Usuarios'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" :validator="$v"
                       :data="{name:this.name, lastName:this.lastName, email:this.email, password:this.password }">

            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre"
                               v-model="$v.name.$model">
                        <label class="fg-label">Nombre del Usuario
                            <small></small>
                            <br>
                            <strong>Introduce el nombre del usuario</strong>
                        </label>
                    </div>
                    <span v-if="$v.name.$invalid && $v.name.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Nombre'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre"
                               v-model="$v.lastName.$model">
                        <label class="fg-label">Apellido del Usuario
                            <small></small>
                            <br>
                            <strong>Introduce el apellido del usuario/</strong>
                        </label>
                    </div>
                    <span v-if="$v.lastName.$invalid && $v.lastName.$dirty" class="c-error">{{$t(requiredErrorMessage,{field:'Apellido/s'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre"
                               v-model="$v.email.$model" @input="delayTouch($v.email)">
                        <label class="fg-label"> Correo eléctrónico
                            <small></small>
                            <br>
                            <strong>/Introduce la dirección de correo electrónico del Usuario/</strong>
                        </label>
                    </div>
                    <span v-if="$v.email.$invalid && $v.email.$dirty" class="c-error">{{$t(emailErrorMessage, {field:'Correo Electronico'})}}</span>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="checkbox">
                        <input type="checkbox" value="">
                        <i class="input-helper"></i>
                        <span>{{$t('users.new.enabled.checkbox-label')}}</span>
                    </div>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="input-radio-check col-md-12">
                        <div class=" check-container col-md-6">
                                <input type="radio" name="role" id="one">
                                <span class="role" for="general">{{$t('users.new.admin-type.radio-button.general')}}</span>
                                <label class="fg-label"> Correo eléctrónico
                                    <small></small>
                                    <br>
                                    <strong>/Introduce la dirección de correo electrónico del Usuario/</strong>
                                </label>
                            </div>
                            <div class=" check-container col-md-6">
                                <input type="radio" name="role" id="two">
                                <span class="role" for="custom">{{$t('users.new.admin-type.radio-button.custom')}}</span>
                            </div>
                        <div class="fg-line basic-input">
                            <input type="password" class="form-control fg-input" placeholder="Introduce el password"
                                   v-model="$v.password.$model" @input="delayTouch($v.password)"/>
                            <label class="fg-label"> Contraseña
                                <small></small>
                                <br>
                                <strong>Introduce la contraseña para el inicio de sesión</strong>
                            </label>
                        </div>
                        <span v-if="$v.password.$invalid && $v.password.$dirty" class="c-error">{{$t(passwordErrorMessage ,{field:'Contraseña', minLength:$v.password.$params.minLength.min})}}</span>
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
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import { required, email, minLength } from 'vuelidate/lib/validators';
    const touchMap = new WeakMap();

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
                name:"",
                lastName:"",
                email:"",
                password:"",
                active:"",
//                doc : {}
            }
        },
        validations:{
            name:{ required },
            lastName:{ required },
            email:{
                required,
                email
            },
            password:{
                required,
                minLength:minLength(6)
            },
//            active:{ required }
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
            passwordErrorMessage(){
                if(!this.$v.password.required){
                    return 'users.validation.required';
                }
                if(!this.$v.password.minLength){
                    return 'users.validation.min.password'
                }
            }
        },
        components: {
            ModalDanger
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
            })
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
        },
        validations:{
        }
    }
</script>
