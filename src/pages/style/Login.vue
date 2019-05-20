<template>
    <div>
        <!-- LOGIN SECTION -->
        <div class="simple-login">
            <div class="left-side">
                <div class="img-background">
                    <img class="" src="@/assets/images/Backgrounds/bgm-login.jpeg" alt="">
                </div>


                <div class="overlay-login"></div>

                <div class="logo"><img src="@/assets/images/Logos/logo-karewa-white.png" alt=""></div>

                <div class="info">
                    <div class="title">
                        <h1>KAREWA</h1>
                        <h1>Es Amar Chihuahua</h1>
                    </div>
                    <p>Karewa es una agrupación ciudadana sin fines de lucro, que desde agosto de 2016 trabaja con el
                        objetivo de prevenir la corrupción en los procesos de compra y contratación de los gobiernos de
                        la ciudad de Chihuahua.</p>
                    <p>Somos la organización más influyente en México en el combate a la corrupción del manejo de los
                        recursos públicos.</p>
                    <div class="link">
                        <a href="#">karewa.org</a>
                    </div>

                </div>
                <div class="login-footer">
                    <span>Desarrollado por </span><a href="http://www.blacklabs.mx/"> <img src="@/assets/images/Logos/logo-blacklabs-claro.png" alt=""> </a>
                </div>
            </div>

            <div class="right-side">
                <h1 class="principal-title">Bienvenido Administrador</h1>
                <p class="info">
                    <strong>Inicia Sesión</strong> con tus credenciales de administrador.
                    Si aún no tienes acceso, solicítalo al administrador de la plataforma o Inicia sesión para continuar.
                </p>
                <br>
                <div class="alert alert-info">
                    <i class="zmdi zmdi-info-outline"></i>
                    <div>
                        ¡Tu contraseña se reestableció correctamente! <br>
                        <strong>Inicia sesión</strong> con tu nueva contraseña.
                    </div>
                </div>
                <br>

                <div class="form">
                    <div class="form-group fg-float m-b-40">
                        <div class="fg-line  basic-input">
                            <input type="text" class="form-control fg-input" placeholder="Placeholder">
                            <label class="fg-label">Input label <small>(small text)</small></label>
                        </div>
                    </div>

                    <div class="form-group fg-float has-error">
                        <div class="fg-line  basic-input">
                            <input type="text" class="form-control fg-input" placeholder="Placeholder">
                            <label class="fg-label">Input label <small>(small text)</small></label>
                        </div>
                        <span class="error-span">Error message</span>
                    </div>
                </div>

                <div class="row m-t-30">
                    <div class="col-6 col-md-6">

                        <div class="checkbox">
                            <input type="checkbox" value="">
                            <i class="input-helper"></i>
                            <span>Recuerdame</span>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 text-align-r">
                        <a href="" class="f-13 c-accent f-bold">
                            Olvide mi contraseña
                        </a>
                    </div>
                </div>

                <div class="row m-t-60">
                    <div class="col-6 col-md-6 m-b-30 login-btn">
                        <a href="" class="btn-outline p-l-5 p-r-10 vertical-center"><i class="zmdi zmdi-long-arrow-left"></i><strong>Volver al Monitor</strong> </a>
                    </div>
                    <div class="col-6 col-md-6 m-b-30 login-btn">
                        <a href="" class="float-right btn-raised button-accent btn-loading vertical-center">
                            <div class="m-r-10">
                                <svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                                </svg>
                            </div>
                            INICIAR SESIÓN
                        </a>
                    </div>
                </div>

                <h1 class="principal-title text-align-c">Revisa tu correo</h1>
                <p class="info text-align-c">
                    Hemos enviado un correo a la dirección <strong>cgonzalez@blacklabs.mx</strong> con instrucciones para reestablecer tu contraseña.
                </p>


                <div class="m-t-60 m-b-30 text-align-c">
                    <img src="@/assets/images/Illustrations/circle-success.svg" alt="">
                    <div class="col-12 m-t-60 ">
                        <a href="" class="btn-outline m-auto vertical-center"><i class="zmdi zmdi-long-arrow-left"></i><strong>Volver al Monitor</strong> </a>
                    </div>
                </div>

            </div>
        </div>
        <!-- END LOGIN SECTION -->
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        }
    }
</script>