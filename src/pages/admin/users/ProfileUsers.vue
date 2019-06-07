<template>
    <div>
        <AdminMainSection :storeModule="storeModule">
            <BackButton/>
            <div class=" m-b-50">
                <div class="col-12 card profile">
                    <h1 class="c-primary f-14 principal-font-bold m-b-30">Imagen de perfil </h1>
                    <form @submit.prevent="updateInfo()">
                        <div class="user-info">
                            <div class="img-profile c-pointer">
                                <img v-if="profilePictureId"
                                     :src="pictureSource"
                                     class="rounded-circle" @click="promptUpload"/>
                                <img v-else src="@/assets/images/Demo/default.svg" alt="" @click="promptUpload">
                            </div>
                            <div class="w-100">
                                <div class="form-group fg-float">
                                    <div class="fg-line  basic-input">
                                        <input id="name" type="text" class="form-control fg-input" placeholder="Nombre"
                                               v-model="tempUser.name">
                                        <label class="fg-label">Nombre<!--<small>(small text)</small>--></label>
                                    </div>
                                    <span v-if="$v.tempUser.name.$invalid && $v.tempUser.name.$dirty" class="c-error">{{nameErrorMessage}}</span>
                                </div>


                                <div class="form-group fg-float">
                                    <div class="fg-line  basic-input">
                                        <input id="lastName" type="text" class="form-control fg-input"
                                               placeholder="Apellido" value="admin" v-model="tempUser.lastName">
                                        <label class="fg-label">Apellido<!--<small>(small text)</small>--></label>
                                    </div>
                                    <span v-if="$v.tempUser.lastName.$invalid && $v.tempUser.lastName.$dirty"
                                          class="c-error">{{lastNameErrorMessage}}</span>
                                </div>

                                <div class="col-12">

                                    <!--<a class="btn-stroke button-stroke m-l-5 m-r-5 m-b-15 float-left" type="file" id="profilePictureInput" name="profilePicture" :ref="pictureRef" v-on:change="handleFileUpload()" :accept="imageAcceptTypes">-->
                                    <!--{{$t('data-load.upload-file')}}-->
                                    <!--</a>-->

                                    <button class="btn-stroke button-stroke m-l-5 m-r-5 m-b-15 float-left c-pointer"
                                            type="button">
                                        Cambiar imagen
                                        <input type="file" id="profilePictureInput" name="profilePicture"
                                               :ref="pictureRef"
                                               v-on:change="handleFileUpload()" :accept="imageAcceptTypes"/>
                                    </button>


                                    <div class="float-right">
                                        <button type="button" class="btn-stroke button-stroke m-l-5 m-r-5 m-b-15"
                                                @click="resetData">
                                            DESCARTAR CAMBIOS
                                        </button>
                                        <button type="submit" class="btn-raised button-accent m-l-5 m-r-5 m-b-15">
                                            GUARDAR
                                            CAMBIOS
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <form @submit.prevent="updatePassword()">
                        <div class="form-group fg-float">
                            <div class="fg-line basic-input">
                                <input type="password" class="form-control fg-input"
                                       placeholder="Por seguridad, escribe tu contraseña actual" value="admin"
                                       v-model="tempUser.currentPassword"
                                       @input="delayTouch($v.tempUser.currentPassword)">
                                <label class="fg-label">
                                    Contraseña Actual
                                    <!--<small>Contraseña con la que inicias sesión actualmente</small>-->
                                </label>
                            </div>
                        </div>
                        <div class="form-group fg-float">
                            <div class="fg-line basic-input">
                                <input type="password" class="form-control fg-input"
                                       placeholder="Escribe una nueva contraseña" value="admin"
                                       v-model="tempUser.newPassword" @input="delayTouch($v.tempUser.newPassword)">
                                <label class="fg-label">
                                    Contraseña Nueva
                                    <!--<small>Si quieres cambiar tu password, escribe el nuevo aquí</small>-->
                                </label>
                            </div>
                            <span v-if="$v.tempUser.newPassword.$invalid && $v.tempUser.newPassword.$dirty"
                                  class="c-error">{{newPasswordErrorMessage}}</span>
                        </div>
                        <div class="form-group fg-float">
                            <div class="fg-line basic-input">
                                <input type="password" class="form-control fg-input"
                                       placeholder="Confirma tu nueva contraseña" value="admin"
                                       v-model="tempUser.confirmPassword"
                                       @input="delayTouch($v.tempUser.confirmPassword)">
                                <label class="fg-label">
                                    Confirmar Contraseña
                                    <!--<small>Confirma tu nuevo password para evitar errores)</small>-->
                                </label>
                            </div>
                            <span v-if="$v.tempUser.confirmPassword.$invalid && $v.tempUser.confirmPassword.$dirty"
                                  class="c-error">{{confirmPasswordErrorMessage}}</span>
                        </div>

                        <div class="col-12">
                            <div class="float-right">
                                <button type="button" @click="clearPasswordFields"
                                        class="btn-stroke button-stroke m-l-5 m-r-5 m-b-15">DESCARTAR CAMBIOS
                                </button>
                                <button type="submit" class="btn-raised button-accent m-l-5 m-r-5 m-b-15">GUARDAR
                                    CAMBIOS
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminMainSection>
    </div>
</template>

<style>
</style>

<script>
    // import { required, email, minLength, requiredIf } from 'vuelidate/lib/validators';
    const storeModule = "profileUsers";
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import BackButton from '@/components/general/BackButton';
    import api from '@/api/users.api';
    import {mapState} from 'vuex';
    const touchMap = new WeakMap();
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    import baseApi from '@/api/base.api';

    export default {
        data () {
            return {
                storeModule: storeModule,
                dataFile: null,
                allowedImageMimeTypes: [
                    'image/png',
                    'image/jpeg',
                    'image/svg+xml',
                    'image/gif',
                ],
                pictureRef : "pictureRef",
                pictureFile : null,
                uploading: false,
                name : "",
                tempUser :{
                    name: "",
                    lastName : "",
                    dummyProperty: "testValue",
                    currentPassword : undefined,
                    newPassword : undefined,
                    confirmPassword : undefined
                }
            }
        },
        computed:{
            imageAcceptTypes() {
                return this.allowedImageMimeTypes.join(',');
            },
            ...mapState({
                profilePictureId : function (state) {
                        return state[storeModule].user.profilePicture
                },
                user : (state) => state[storeModule].user,
                originalData : (state) => state[storeModule].originalData
            }),
            pictureSource() {
                if (this.profilePictureId) {
                    return `${baseApi.baseUrl}/public-api/files/image/${this.profilePictureId}`;
                } else {
                    return '';
                }
            },
            confirmPasswordErrorMessage(){

                return "Las contraseñas deben coincidir"
            },
            nameErrorMessage(){
                if(!this.$v.tempUser.name.required){
                    return "El nombre es requerido"
                }
            },
            lastNameErrorMessage(){
                if(!this.$v.tempUser.lastName.required){
                    return "El apellido es requerido"
                }
            },
            newPasswordErrorMessage(){
                if(!this.$v.tempUser.newPassword.minLength){
                    return "La contraseña debe contener al menos 3 caracteres"
                }
                if(!this.$v.tempUser.newPassword.maxLength){
                    return "La contraseña debe contener un máximo de 100 caracteres"
                }
            },
        },
        watch : {
           user(value){
               this.tempUser.name = value.name;
               this.tempUser.lastName = value.lastName;
           }
        },
        validations: {
            tempUser: {
                name: {
                    required: true,
                },
                lastName: {
                    required: true,
                },
                currentPassword: {
                },
                newPassword: {
                    minLength: minLength(2),
                    maxLength: maxLength(100)
                },
                confirmPassword: {
                    minLength: minLength(2),
                    maxLength: maxLength(100),
                    match : function (value) {
                        return value === this.tempUser.newPassword
                    }
                }
            }
        },
        components: {
            AdminMainSection,
            BackButton
        },
        methods:{
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 1000))
            },
            handleFileUpload() {
                this.pictureFile = null;

                if (this.$refs[this.pictureRef].files && this.$refs[this.pictureRef].files.length) {
                    this.pictureFile = this.$refs[this.pictureRef].files[0];
                }

                if (!this.pictureFile || !this.pictureFile.size || !this.pictureFile.type) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo para la carga de datos`, 'danger');
                    return;
                }

                if (!this.allowedImageMimeTypes.includes(this.pictureFile.type)) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un imagen  con cualquiera de los siguiente formatos (jpg, jpeg, gif, svg+xml )`, 'danger');
                    return;
                }

                let formData = new FormData();
                formData.append('profilePicture', this.pictureFile);
                formData.append('userId', this.userId);

                let session = this.$session;

                let currentFullName = this.$session.get("userFullName");

                this.$store.dispatch(`${storeModule}/CHANGE_PICTURE`, {session, formData, currentFullName});
            },
            updateInfo() {
                let session = this.$session;
                let user = {};
                user.name = this.tempUser.name;
                user.lastName = this.tempUser.lastName;

                this.$store.dispatch(`${storeModule}/UPDATE_PROFILE_INFO`, {session, user});
            },
            updatePassword() {
                let session = this.$session;
                let user = {};
                user.currentPassword = this.tempUser.currentPassword;
                user.newPassword = this.tempUser.newPassword;
                user.confirmPassword = this.tempUser.confirmPassword;

                this.$store.dispatch(`${storeModule}/UPDATE_PROFILE_INFO`, {session, user});
            },
            promptUpload(){
                $("#profilePictureInput").click();
            },
            resetData(){
                this.tempUser.name = this.originalData.name;
                this.tempUser.lastName = this.originalData.lastName;
            },
            clearPasswordFields(){
                this.tempUser.currentPassword = "";
                this.tempUser.newPassword = "";
                this.tempUser.confirmPassword = "";
            },
        },
        created(){
        },
        mounted(){
        },
        beforeMount(){
            this.userId = this.$route.params.id; //Probably won't be needed
            let id = this.userId;
            let session = this.$session;
            this.$store.dispatch(`${storeModule}/LOAD_PROFILE_INFO`, {session, id});
        }
    }
</script>