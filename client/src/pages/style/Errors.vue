<template>
    <div>
        <!-- ERROR 403 -->
        <div class="page-error">
            <div class="container-error">
                <img class="img-fluid" src="@/assets/images/Errors/403.svg" alt="Error" />
                <h1>ACCESO DENEGADO</h1>
                <p>Lo sentimos, pero no tienes permiso para acceder a esta página por alguna razón.</p>
                <div>
                    <a href="#" class="btn-stroke button-accent"> Regresar </a>
                    <a href="" class="btn-raised button-accent m-l-15"> Ir al Inicio </a>
                </div>
            </div>
            <div class="footer-error">
                <small>28 Enero, 2018</small>
                <small>© 2019 Black Labs</small>
                <div>
                    <a href="" tabindex="">FAQ</a>
                    <a href="" tabindex="">Contacto</a>
                </div>
            </div>
        </div>
        <!-- END ERROR 403 -->

        <!-- ERROR 404 -->
        <div class="page-error">
            <div class="container-error">
                <img class="img-fluid" src="@/assets/images/Errors/404.svg" alt="Error" />
                <h1>PÁGINA NO ENCONTRADA</h1>
                <p>Lo sentimos, pero parece que la página que buscas no existe, es posible que hayas escrito mal la dirección.</p>
                <div>
                    <a href="#" class="btn-stroke button-accent"> Regresar </a>
                    <a href="" class="btn-raised button-accent m-l-15"> Ir al Inicio </a>
                </div>
            </div>
            <div class="footer-error">
                <small>28 Enero, 2018</small>
                <small>© 2019 Black Labs</small>
                <div>
                    <a href="" tabindex="">FAQ</a>
                    <a href="" tabindex="">Contacto</a>
                </div>
            </div>
        </div>
        <!-- END ERROR 404 -->

        <!-- ERROR 500 -->
        <div class="page-error">
            <div class="container-error">
                <img class="img-fluid" src="@/assets/images/Errors/500.svg" alt="Error" />
                <h1>PARECE QUE ALGO SALIO MAL</h1>
                <label>¿Que puede ser?</label>
                <p>Puedes recargar esta página o ayudarnos a reportar el error si el problema persiste.</p>
                <div>
                    <a href="#" class="btn-stroke button-accent"> Regresar </a>
                    <a href="" class="btn-raised button-accent m-l-15"> Reportar Problema </a>
                </div>
            </div>
            <div class="footer-error">
                <small>28 Enero, 2018</small>
                <small>© 2019 Black Labs</small>
                <div>
                    <a href="" tabindex="">FAQ</a>
                    <a href="" tabindex="">Contacto</a>
                </div>
            </div>
        </div>
        <!-- END ERROR 500 -->

        <!-- ERROR 503 -->
        <div class="page-error">
            <div class="container-error">
                <img class="img-fluid" src="@/assets/images/Errors/503.svg" alt="Error" />
                <h1>SERVICIO EN MANTENIMIENTO</h1>
                <p><strong>¡Disculpanos!</strong> esta página se encuentra en mantenimiento.</p>
                <div>
                    <a href="#" class="btn-stroke button-accent"> Regresar </a>
                    <a href="" class="btn-raised button-accent m-l-15"> Ir al Inicio </a>
                </div>
            </div>
            <div class="footer-error">
                <small>28 Enero, 2018</small>
                <small>© 2019 Black Labs</small>
                <div>
                    <a href="" tabindex="">FAQ</a>
                    <a href="" tabindex="">Contacto</a>
                </div>
            </div>
        </div>
        <!-- END ERROR 503 -->
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