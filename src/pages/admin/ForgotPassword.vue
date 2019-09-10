<template>
    <div>
        <!-- FORGOT PASSWORD SECTION -->
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
                    <span>Desarrollado por </span><a href="http://www.blacklabs.mx/"> <img
                        src="@/assets/images/Logos/logo-blacklabs-claro.png" alt=""> </a>
                </div>
            </div>

            <div class="right-side">
                <div v-if="!sentSuccess">
                    <h1 class="principal-title">Restablecer contraseña</h1>
                    <p class="info">
                        <strong>¿Olvidaste tu contraseña?</strong> No te preocupes, solo ingresa el correo electrónico
                        con el que estás registrado y te enviaremos un enlace para restablecer tu contraseña
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
                       -->
                    <div class="alert alert-danger" v-if="messageError">
                        <i class="zmdi zmdi-alert-triangle"></i>
                        <div>
                            Por favor, completa los campos para restablecer la contraseña.
                        </div>
                    </div>
                    <br/>

                    <div class="form">
                        <div class="form-group fg-float m-b-40" :class="{ 'has-error' : messageError  }">
                            <div class="fg-line  basic-input">
                                <input type="text" class="form-control fg-input"
                                       placeholder="Introduce tu correo electrónico" name="email" v-model="email" v-on:change="clearError()"  @keyup.enter="sendResetEmail">
                                <label class="fg-label">Correo electrónico <!--<small>(small text)</small>--></label>
                            </div>
                        </div>
                    </div>

                    <div class="row m-t-60">
                        <div class="col-6 col-md-6 m-b-30 login-btn">
                            <router-link to="/login" class="btn-outline p-l-5 p-r-10 vertical-center"><i
                                    class="zmdi zmdi-long-arrow-left"></i><strong>Volver a Inicio de sesión</strong>
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
                                ENVIAR CORREO
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
                <div v-if="sentSuccess">
                    <h1 class="principal-title text-align-c">Revisa tu correo</h1>
                    <p class="info text-align-c">
                        Hemos enviado un correo a la dirección <strong>{{email}}</strong> con instrucciones para
                        reestablecer tu contraseña.
                    </p>

                    <div class="m-t-60 m-b-30 text-align-c">
                        <img src="@/assets/images/Illustrations/circle-success.svg" alt="">
                        <div class="col-12 m-t-60 ">
                            <a href="" class="btn-outline m-auto vertical-center">
                                <i class="zmdi zmdi-long-arrow-left"></i>
                                <strong>Volver al Monitor</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END LOGIN SECTION -->
    </div>
</template>


<script>
    // import EmailClient from '@/common/EmailClient';
    import base from '@/api/base.api';
    import axios from 'axios';
    import aboutInfo from '@/karewaPlatform.info';

    export default {
        name: "ForgotPassword",
        methods: {
            clearError(){
              this.messageError = "";
            },
            sendResetEmail() {
                if (this.email) {//TODO: valid email
                    return axios.post(`${base.baseUrl}/public-api/accounts/reset-password`, {'email': this.email})
                        .then((response) => {
                            if (response.data.error) {
                                //TODO:show error
                            }
                            //success
                            this.sentSuccess = true;
                        })
                        .catch((error) => {
                            console.log("error", error);
                        });
                } else {
                    this.messageError = "Por favor, completa los campos para restablecer la contraseña.";
                }
            }
        },
        data() {
            return {
                email: '',
                sentSuccess: false,
                messageError: '',
                nombreOrganizacion: aboutInfo.infoLogin.nombreOrganizacion || "Por definir...",
                lemaOrganizacion: aboutInfo.infoLogin.lemaOrganizacion || "Por definir...",
                descripcionEnParrafos: aboutInfo.infoLogin.descripcionEnParrafos || "Por definir...",
                enlaceWebsite: aboutInfo.infoLogin.enlaceWebsite || "#",
                nombreWebsite: aboutInfo.infoLogin.nombreWebsite || ""
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
