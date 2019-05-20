<template>
    <!-- ERROR 404 -->
    <div class="page-error">
        <div class="container-error">
            <img class="img-fluid" src="@/assets/images/Errors/404.svg" alt="Error" />
            <h1>PÁGINA NO ENCONTRADA</h1>
            <p>Lo sentimos, pero parece que la página que buscas no existe, es posible que hayas escrito mal la dirección.</p>
            <div>
                <a @click="goBack" class="btn-stroke button-accent"> Regresar </a>
                <router-link to="/" class="btn-raised button-accent m-l-15">
                    Ir al Inicio
                </router-link>
            </div>
        </div>
        <div class="footer-error">
            <small>28 Enero, 2018</small>
            <small>© 2019 Black Labs</small>
            <div>
                <router-link to="/faq">
                    FAQ
                </router-link>
                <router-link to="/contact">
                    Contacto
                </router-link>
            </div>
        </div>
    </div>
    <!-- END ERROR 404 -->
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        methods: {
            goBack: function () {
                this.$router.back();
            }
        }
    }
</script>