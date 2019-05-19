<template>
    <div class="about">

        <section class="client-content">
            <div class="neutral-width">

                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <a href="/" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir
                        a Inicio </a>
                </div>


                <!-- ABOUT INFO -->
                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel">
                            <h1>Acerca de</h1>
                        </div>
                        <div class="about vertical-center">
                            <p class="f-16 c-plain_text principal-font-regular"><strong
                                    class="f-24 c-accent principal-font-medium">Karewa</strong> es una agrupación
                                ciudadana sin fines de lucro, que desde agosto de 2016 trabaja con el objetivo de
                                <strong>prevenir la corrupción</strong> en los procesos de compra y contratación de los
                                gobiernos de la ciudad de Chihuahua. Todo esto a través de un programa estratégico de
                                transparencia y rendición de cuentas a fin de contar con un eficiente y mejor gobierno.
                            </p>
                            <img class="img-fluid m-l-30 max-h-200 d-flex"
                                 src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt=""/>
                        </div>
                    </div>
                </div>


                <!-- ABOUT PANELS -->
                <div class="row">
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Misión </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> Eliminar la corrupción en el manejo de
                                los recusros públicos. </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Visión </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> Somos la organización más influyente en
                                México en el combate a la corrupción del manejo de los recursos públicos. </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Valores </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> Nos regimos por la honestidad. el
                                respeto. el compromiso. el trabajo en equipo y sobre todo con justicia. </p>
                        </div>
                    </div>
                </div>

                <!-- ABOUT TEAM -->
                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel small">
                            <h1> Equipo </h1>
                        </div>
                        <div class="about vertical-center">
                            <div class="w-60 m-r-30 o-x-auto">
                                <h2 class="title-dot">Consejo:</h2>
                                <ul class="list-dots">
                                    <li>Javier Mesta Delgado <span>Consejero Presidente</span></li>
                                    <li>Gabriela Alvídrez Ruiz <span>Consejera Directiva</span></li>
                                    <li>Elías Fernando Ayub González <span>Consejero Directivo</span></li>
                                    <li>Paola Contestábile Frayre <span>Consejera Directiva</span></li>
                                    <li>César René Espinosa Lozano <span>Consejero Directivo</span></li>
                                    <li>Luis Alberto González Herrera <span>Consejero Directivo</span></li>
                                    <li>Leopoldo Rafael Lozano Cuarón <span>Consejero Directivo</span></li>
                                    <li>Guillermo Antonio Orozco Salomón <span>Consejero Directivo</span></li>
                                    <li>Luis Alonso Ramos Fernández <span>Consejero Directivo</span></li>
                                    <li>Angélica Santana Fierro <span>Consejera Directiva</span></li>
                                </ul>
                                <h2 class="title-dot">Consejo:</h2>
                                <ul class="list-dots">
                                    <li>José David Ponce de León Trejo <span>Coordinación</span></li>
                                    <li>Edgar Renteria Rivas <span>Coordinación</span></li>
                                </ul>
                            </div>
                            <img class="img-fluid m-0-auto max-h-200 d-flex" src="https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" alt="" />
                        </div>
                    </div>
                </div>

                <more-info></more-info>

            </div>
        </section>


    </div>
</template>


<style scoped>
</style>

<script>
    import MoreInfo from '@/components/general/MoreInfo';

    export default {
        data() {
            return {
            }
        },
        components: {
            MoreInfo
        },
        created() {

        }
    }
</script>

