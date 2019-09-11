<template>
    <div>
        <!-- NEW PASSWORD SECTION -->
        <div class="simple-login">
            <div class="left-side">
                <div class="img-background">
                    <img class="" src="@/assets/images/Backgrounds/bgm-login.jpeg" alt="">
                </div>

                <div class="overlay-login"></div>

                <div class="logo"><img src="@/assets/images/Logos/logo-karewa-white.png" alt=""></div>

                <div class="info">
                    <div class="title">
                        <h1>{{nombreOrganizacion}}</h1>
                        <h1>{{lemaOrganizacion}}</h1>
                    </div>
                    <p v-for="parrafo in descripcionEnParrafos" :key="parrafo">
                        {{parrafo}}
                    </p>
                    <div class="link">
                        <a :href="enlaceWebsite" target="_blank">{{nombreWebsite}}</a>
                    </div>
                </div>
                <div class="login-footer">
                    <span>Desarrollado por </span><a href="http://www.blacklabs.mx/"> <img src="@/assets/images/Logos/logo-blacklabs-claro.png" alt=""> </a>
                </div>
            </div>

            <div class="right-side">
                <h1 class="principal-title">
                    Instrucciones para restablecer contraseña
                </h1>
                <p class="info">
                    Por favor introduce y confirma tu nueva contraseña para poder ingreasar a tu cuenta con tu correo.
                </p>
                <br>
                <!--<div class="alert alert-info">-->
                <!--<i class="zmdi zmdi-info-outline"></i>-->
                <!--<div>-->
                <!--¡Tu contraseña se reestableció correctamente! <br>-->
                <!--<strong>Inicia sesión</strong> con tu nueva contraseña.-->
                <!--</div>-->
                <!--</div>-->
                <!--<br>

                <div class="alert alert-danger">
                    <i class="zmdi zmdi-alert-triangle"></i>
                    <div>
                        Por favor, completa los campos para restablecer la contraseña.
                    </div>
                </div>--->
                <div class="alert alert-danger" v-if="messageError">
                    <i class="zmdi zmdi-alert-triangle"></i>
                    <div>
                        {{messageError}}
                    </div>
                </div>

                <br/>

                <div class="form">
                    <div class="form-group fg-float m-b-40" :class="{ 'has-error' : messageError  }">
                        <div class="fg-line  basic-input">
                            <input type="password" class="form-control fg-input" name="password" v-model="password" @keyup.enter="sendResetEmail">
                            <label class="fg-label">Nueva contraseña <!--<small>(small text)</small>--></label>
                        </div>
                    </div>
                    <div class="form-group fg-float m-b-40" :class="{ 'has-error' : messageError  }">
                        <div class="fg-line  basic-input">
                            <input type="password" class="form-control fg-input" name="confirmPassword" v-model="confirmPassword" @keyup.enter="sendResetEmail">
                            <label class="fg-label">Confirmar contraseña <!--<small>(small text)</small>--></label>
                        </div>
                    </div>
                </div>

                <div class="row m-t-60">
                    <div class="col-6 col-md-6 m-b-30 login-btn">
                        <router-link to="/login" class="btn-outline p-l-5 p-r-10 vertical-center">
                            <i class="zmdi zmdi-long-arrow-left"></i><strong>Volver a Inicio de sesión</strong>
                        </router-link>
                    </div>
                    <div class="col-6 col-md-6 m-b-30 login-btn">
                        <a class="float-right btn-raised button-accent btn-loading vertical-center"
                           @click.prevent="sendResetEmail()">
                            <!--<div class="m-r-10">-->
                            <!--<svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">-->
                            <!--<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>-->
                            <!--</svg>-->
                            <!--</div>-->
                            CAMBIAR CONTRASEÑA
                        </a>
                        <!--<a href="" class="float-right btn-raised button-accent btn-loading vertical-center">-->
                        <!--<div class="m-r-10">-->
                        <!--<svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">-->
                        <!--<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>-->
                        <!--</svg>-->
                        <!--</div>-->
                        <!--INICIAR SESIÓN-->
                        <!--</a>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import base from '@/api/base.api';
    import axios from 'axios';
    import aboutInfo from '@/karewaPlatform.info';

    export default {
        name: "NewPassword",
        methods: {
            sendResetEmail(){
                if(!this.password || !this.confirmPassword){
                    this.messageError = "Todos los campos son requeridos.";
                }else if(this.password !== this.confirmPassword){
                    this.messageError = "Por favor, verifica que ambas contraseñas coincidan.";
                }else{
                    axios.post(`${base.baseUrl}/public-api/accounts/valid-token/`,{
                        token: this.$route.params.token,
                        password: this.password,
                        confirmPassword: this.confirmPassword
                    }).then((result)=>{
                        if(result.data.error){
                            
                            tShow(this.$t(result.data.message), 'danger');
                            if (result.data.data && result.data.data.tokenExpired) {
                                this.$router.push('/login');
                            }
                            
                        }else{
//                            tShow(result.data.message, 'success');
                            this.$store.dispatch('accounts/alertMessage', 'accounts.password.updated.success');
//                            window.location.href = "/#/login";
                            this.$router.push('/login');
                        }
                    }).error((err)=>{
                        tShow(err.data.message, 'error');
                    });
                }

                // axios.post(`${base.baseUrl}/api/users/confirm-password/`,{
                //     token: this.$route.params.token,
                //     password : this.password,
                //     confirmPassword : this.confirmPassword
                // }).then((result)=>{
                //     console.log("result",result);
                // }).error((err)=>{
                //     console.log("err",err);
                // });
            }
        },
        data() {
            return {
                password: "",
                confirmPassword: "",
                messageError : "",
                nombreOrganizacion: aboutInfo.infoLogin.nombreOrganizacion || "Por definir...",
                lemaOrganizacion: aboutInfo.infoLogin.lemaOrganizacion || "Por definir...",
                descripcionEnParrafos: aboutInfo.infoLogin.descripcionEnParrafos || "Por definir...",
                enlaceWebsite: aboutInfo.infoLogin.enlaceWebsite || "#",
                nombreWebsite: aboutInfo.infoLogin.nombreWebsite || ""
            }
        },
        beforeMount() {
        }
    }
</script>

<style>
</style>
