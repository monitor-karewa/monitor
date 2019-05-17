<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">

                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <router-link to="/comparations" class="btn-outline text-unset">
                        <i class="zmdi zmdi-long-arrow-left"></i> Ir a comparar monitores
                    </router-link>
                </div>

                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1 m-t-0>
                                Recursos
                            </h1>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">Hemos recopilado los siguientes recursos de
                            interés en donde puedes obtener mayor información con respecto a las consultas realizadas
                             y las actividades que realizamos.
                        </p>


                        <div class="row m-t-50">

                            <div class="col-md-12">
                                <div class="box-tabs">
                                    <div class="nav" id="box-tabs" role="tablist" aria-orientation="vertical">
                                        <a class="nav-link active" id="box-tab" data-toggle="pill"
                                           href="#box-content1"
                                           role="tab" aria-controls="box-content1" aria-selected="true">
                                            Articulos </a>
                                        <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content2"
                                           role="tab"
                                           aria-controls="box-content2" aria-selected="false"> Notas </a>
                                        <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content3"
                                           role="tab"
                                           aria-controls="box-content3" aria-selected="false"> Marco Legal </a>
                                        <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content4"
                                           role="tab"
                                           aria-controls="box-content4" aria-selected="false"> Sitio Web </a>
                                    </div>

                                    <div class="tab-content" id="box-tabsContent">
                                        <div class="tab-pane fade show active" id="box-content1" role="tabpanel"
                                             aria-labelledby="articulo-content">

                                            <div class="col-12">
                                                <h2 class="title-dot">{{article.length}} artículos en total:</h2>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-md-4" v-for="resource in article">
                                                    <div class="card-image-large">
                                                        <img class="img-fluid"
                                                             :src="imageSrc(resource.image)"
                                                             alt="Default"/>
                                                        <div>
                                                            <p>{{resource.title}}</p>
                                                            <span>
                                                                <small>{{resource.createdAt | moment}}</small>
                                                                <a v-if="resource.url" :href="resource.url" target="_blank" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="tab-pane fade" id="box-content2" role="tabpanel"
                                             aria-labelledby="nota-content">
                                            <div class="col-12">
                                                <h2 class="title-dot">{{notes.length}} notas en total:</h2>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-md-4" v-for="resource in notes">
                                                    <div class="card-only-text">
                                                        <h1>{{resource.title}}</h1>
                                                        <span>
                                                            <small>{{resource.createdAt | moment}}</small>
                                                            <a v-if="resource.url" :href="resource.url" target="_blank" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="box-content3" role="tabpanel"
                                             aria-labelledby="marco-content">

                                            <div class="col-12">
                                                <h2 class="title-dot">
                                                    {{legalFramework.length}} documentos en total:</h2>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-md-6 col-lg-6"
                                                     v-for="resource in legalFramework">
                                                    <div class="card-only-text">
                                                        <h1>{{resource.title}}</h1>
                                                        <span>
                                                            <small>{{resource.createdAt | moment}}</small>
                                                            <a v-if="resource.url" :href="resource.url" target="_blank" class="btn-stroke xs button-primary" tabindex="">Ver más</a>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                        <div class="tab-pane fade " id="box-content4" role="tabpanel"
                                             aria-labelledby="sitio-content">

                                            <div class="col-12">
                                                <h2 class="title-dot">{{website.length}} sitios web en total:</h2>
                                            </div>

                                            <div class="row">
                                                <div class="col-12 col-md-4" v-for="resource in website">
                                                    <div class="card-only-text text-centering">
                                                        <h1>{{resource.title}}</h1>
                                                        <span>
                                                            <a v-if="resource.url" :href="resource.url" target="_blank" class="btn-stroke xs button-primary" tabindex="">Ir al sitio</a>
                                                        </span>
                                                    </div>
                                                    <!--<div class="card-only-text">-->
                                                        <!--<h1>{{resource.title}}</h1>-->
                                                        <!--<span>-->
                                                            <!--<small>{{resource.date}}</small>-->
                                                            <!--<a :href="resource.url" target="_blank" class="btn-stroke xs button-primary" tabindex="">Ver más</a>-->
                                                        <!--</span>-->
                                                    <!--</div>-->
                                                </div>
                                            </div>

                                            <!--<div class="row">-->
                                                <!--<div class="col-12 col-md-6 col-lg-4">-->
                                                    <!--<div class="card-only-text text-centering">-->
                                                        <!--<h1>Sitio oficial de Karewa</h1>-->
                                                        <!--<span>-->
                                                            <!--<a href="http://karewa.org/" class="btn-stroke xs button-primary" tabindex="">Ir al sitio</a>-->
                                                        <!--</span>-->
                                                    <!--</div>-->
                                                <!--</div>-->


                                                <!--<div class="col-12 col-md-6 col-lg-4">-->
                                                    <!--<div class="card-only-text text-centering">-->
                                                        <!--<h1>Gobierno Municipal de Chihuahua</h1>-->
                                                        <!--<span>-->
                                                            <!--<a href="http://www.chihuahua.gob.mx/" class="btn-stroke xs button-primary"-->
                                                               <!--tabindex="">Ir al sitio</a>-->
                                                        <!--</span>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                            <!--</div>-->

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--<div class="filter col-md-5" style="max-height:35px">
                                <div class="filter-container">
                                    <input class="input-search" type="text" name="" value=""
                                           placeholder="Escribe un articulo de interés"/>
                                </div>
                                <button class="filter-btn" type="button" name="button">Buscar</button>
                            </div>-->
                        </div>

                    </div>
                </div>

                <more-info></more-info>

            </div>
        </section>
    </div>

</template>

<style>
</style>

<script>

    import MoreInfo from '@/components/general/MoreInfo';
    
    import {mapState} from 'vuex';
    import baseApi from '@/api/base.api';
    
    const storeModule = 'publicResources';

    import moment from 'moment';
    import utils from '@/common/utils';

    export default {
        data() {
            return {
//                articles : [
//                    {
//                        title:"Generan controlaría social gracias al Monitor Karewa ",
//                        date : "29 de noviembre de 2017",
//                        image : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2004&q=80"
//                    },
//                    {
//                        title:"Analizan estudiantes del Tec de Monterrey licitaciones del Municipio",
//                        date : "27 de noviembre de 2018",
//                        image : "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
//                    },
//                    {
//                        title:"Organización Karewa diseña herramienta para transparentar…",
//                        date : "01 de noviembre de 2017",
//                        image : "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
//                    },
//                    {
//                        title:"Firma Amin Anchondo con Karewa prevenir la corrupción",
//                        date : "21 de junio de 2018",
//                        image : "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
//                    },
//                    {
//                        title:"Municipio no licitó contratos por 160 millones de pesos con Petromax",
//                        date : "28 de febrero de 2018",
//                        image : "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80"
//                    },
//                    {
//                        title:"Karewa presente en la creación de nueva ley de adquisiciones",
//                        date : "31 de octubre de 2017",
//                        image : "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
//                    },
//                    {
//                        title:"Karewa por el bien de Chihuahua",
//                        date : "08 de agosto de 2016",
//                        image : "https://images.unsplash.com/photo-1542372420-f50174a8ddd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2088&q=80"
//                    }
//                ],
//                marcolegal:[
//                    {
//                        title: "Ley de Adquisiciones, Arrendamientos y Contratación de Servicios del Estado de Chihuahua - ¡Nueva ley!",
//                        date: "17 de febrero de 2018"
//                    },
//                    {
//                        title: "Excepciones a la Licitación pública de Adquisiciones - ¡Nueva ley!",
//                        date: "17 de febrero de 2018"
//                    },
//                    {
//                        title: "Ley de Adquisiciones, Arrendamientos y Contratación de Servicios del Estado de Chihuahua",
//                        date: "13 de septiembre de 1997"
//                    },
//                    {
//                        title: "Excepciones a la Licitación pública de Adquisiciones",
//                        date: "13 de septiembre de 1997"
//                    },
//                    {
//                        title: "Ley de Obra Pública y Servicios Relacionados con la misma",
//                        date: "23 de diciembre del 2000"
//                    },
//                    {
//                        title: "Ley de Transparencia y Acceso a la Información Pública\n" +
//                            "del Estado de Chihuahua",
//                        date: "29 de agosto de 2015"
//                    }
//                ]
            }
        },
        computed: {
            ...mapState({
                article: state => state[storeModule].article || [],
                notes: state => state[storeModule].notes || [],
                legalFramework: state => state[storeModule].legalFramework || [],
                website: state => state[storeModule].website || [],
            }),
        },
        filters: {
            moment: function (date) {
                if (!utils.isDate(date)) {
                    return '';
                }
                return moment(date).format('MM/DD/YYYY');
            }
        },
        methods: {
            imageSrc(id) {
                return `${baseApi.baseUrl}/public-api/files/image/${id}`;
            }
        },
        components: {
            MoreInfo
        },
        beforeMount() {
            this.$store.dispatch(`${storeModule}/LOAD_RESOURCES`);
        }
    }
</script>
