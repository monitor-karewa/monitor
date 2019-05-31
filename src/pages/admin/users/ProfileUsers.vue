<template>
    <div>
        <AdminMainSection>
            <BackButton />


            <form @submit.prevent="updateInfo()">
                <div class="form-group fg-float">
                    <div class="fg-line  basic-input">
                        <input id="name" type="text" class="form-control fg-input" placeholder="Nombre"  v-model="tempUser.name" >
                        <label class="fg-label">Nombre<!--<small>(small text)</small>--></label>
                    </div>
                    <span v-if="$v.tempUser.name.$invalid && $v.tempUser.name.$dirty" class="c-error">{{nameErrorMessage}}</span>
                </div>

                <div class="form-group fg-float">
                    <div class="fg-line  basic-input">
                        <input id="lastName" type="text" class="form-control fg-input" placeholder="Apellido" value="admin" v-model="tempUser.lastName">
                        <label class="fg-label">Apellido<!--<small>(small text)</small>--></label>
                    </div>
                    <span v-if="$v.tempUser.lastName.$invalid && $v.tempUser.lastName.$dirty" class="c-error">{{lastNameErrorMessage}}</span>
                </div>


                <h2> Cambiar contraseña</h2>

                <div class="form-group fg-float">
                    <div class="fg-line  basic-input">
                        <input id="password-current" type="password" class="form-control fg-input" placeholder="Por seguridad, escribe tu contraseña actual" value="admin" v-model="tempUser.currentPassword" @input="delayTouch($v.tempUser.currentPassword)">
                        <label class="fg-label">Contraseña Actual<!--<small>(small text)</small>--></label>
                    </div>
                </div>

                <div class="form-group fg-float">
                    <div class="fg-line  basic-input">
                        <input id="password-new" type="password" class="form-control fg-input" placeholder="Escribe tu nueva contraseña" value="admin" v-model="tempUser.newPassword" @input="delayTouch($v.tempUser.newPassword)">
                        <label class="fg-label">Contraseña Nueva<!--<small>(small text)</small>--></label>
                    </div>
                    <span v-if="$v.tempUser.newPassword.$invalid && $v.tempUser.newPassword.$dirty" class="c-error">{{newPasswordErrorMessage}}</span>
                </div>

                <div class="form-group fg-float">
                    <div class="fg-line  basic-input">
                        <input id="password-confirm" type="password" class="form-control fg-input" placeholder="Confirma tu nueva contraseña" value="admin" v-model="tempUser.confirmPassword" @input="delayTouch($v.tempUser.confirmPassword)">
                        <label class="fg-label">Confirmar Contraseña<!--<small>(small text)</small>--></label>
                    </div>
                    <span v-if="$v.tempUser.confirmPassword.$invalid && $v.tempUser.confirmPassword.$dirty" class="c-error">{{confirmPasswordErrorMessage}}</span>
                </div>




                <button type="submit" class="btn-stroke button-accents"> Guardar </button>
            </form>

            <div class="floating-text m-b-40">
                <h1>{{$t('data-load.data-load')}}</h1>
                <p>{{$t('data-load.data-load.recommended-for')}}</p>
                <button class="btn-stroke button-accent">
                    {{$t('data-load.upload-file')}}
                    <input type="file" id="profilePictureInput" name="profilePicture" :ref="pictureRef" v-on:change="handleFileUpload()" :accept="imageAcceptTypes" />
                </button>
            </div>

            <img v-if="profilePictureId" class="img-fluid" id="profilePictureImg" alt="Cover" :src="'http://localhost:3000/public-api/files/image/'+profilePictureId"/>
            <img v-else  class="img-fluid" id="image-placeholder" alt="Cover" src="http://localhost:3000/public-api/files/image/5cf0171cee0e802d1731ce90"/>



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

    export default {
        data () {
            return {
                storeModule: storeModule,
                userId: "",
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
                    profilePictureId : "",
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
                userLastName : (state) => state[storeModule].user.lastName
            }),

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

                this.$store.dispatch(`${storeModule}/CHANGE_PICTURE`, {session, formData});
            },
            updateInfo() {
                let session = this.$session;
                let user = this.tempUser;
                user.id = this.userId;
                this.$store.dispatch(`${storeModule}/UPDATE_PROFILE_INFO`, {session, user});
            }
        },

        setUploading(value) {
            this.uploading = value;
        },
        cancelUpload() {
            //TODO: cancel
            this.setUploading(false);
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