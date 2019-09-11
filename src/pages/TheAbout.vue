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
                            <p class="f-16 c-plain_text principal-font-regular" v-html="aboutText">
                            </p>
                            <img class="img-fluid m-l-30 max-h-200 d-flex"
                                 :src="aboutImage" alt=""/>
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
                            <p class="f-14 c-plain_text principal-font-regular"> {{mision}} </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Visión </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> {{vision}} </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Valores </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> {{valores}} </p>
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
                            <div class="w-60 m-r-30 o-x-auto m-b-20">
                                <h2 class="title-dot">Consejo:</h2>
                                <ul class="list-dots">
                                    <li v-for="person in consejo" :key="person">
                                        {{person.nombre}} <span>{{person.puesto}}</span>
                                    </li>
                                </ul>
                                <h2 class="title-dot">Consejo:</h2>
                                <ul class="list-dots">
                                    <li v-for="person in consejoCoordinacion" :key="person">
                                        {{person.nombre}} <span>{{person.puesto}}</span>
                                    </li>
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
    import aboutInfo from '@/karewaPlatform.info';

    export default {
        data() {
            return {
                aboutText: aboutInfo.infoAcercaDe.textoAcercaDe || "Por definir...",
                aboutImage: aboutInfo.infoAcercaDe.imagenAcercaDe || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
                mision: aboutInfo.infoAcercaDe.mision || "Por definir...",
                vision: aboutInfo.infoAcercaDe.vision || "Por definir...",
                valores: aboutInfo.infoAcercaDe.valores || "Por definir...",
                consejo: aboutInfo.infoAcercaDe.consejo || [],
                consejoCoordinacion: aboutInfo.infoAcercaDe.consejoCoordinacion || [],
                imagenConsejo: aboutInfo.infoAcercaDe.imagenConsejo || "https://images.unsplash.com/photo-1522165078649-823cf4dbaf46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"

            }
        },
        components: {
            MoreInfo
        },
        created() {

        }
    }
</script>

