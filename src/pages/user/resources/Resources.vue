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
                                    <div class="row">
                                        <div class="col-8" v-show="!hasSearch">
                                            <div class="nav" id="box-tabs" role="tablist" aria-orientation="vertical">
                                                <a class="nav-link active" id="box-tab" data-toggle="pill"
                                                   href="#box-content1"
                                                   role="tab" aria-controls="box-content1" aria-selected="true">
                                                    Articulos  ( {{article.length}} )</a>
                                                <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content2"
                                                   role="tab"
                                                   aria-controls="box-content2" aria-selected="false"> Notas  ( {{notes.length}} )</a>
                                                <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content3"
                                                   role="tab"
                                                   aria-controls="box-content3" aria-selected="false"> Marco Legal  ( {{legalFramework.length}} )</a>
                                                <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content4"
                                                   role="tab"
                                                   aria-controls="box-content4" aria-selected="false"> Sitio Web  ( {{website.length}} )</a>
                                            </div>
                                        </div>
                                        
                                        <div :class="{'col-12': hasSearch, 'col-4': !hasSearch}">
                                            <div class="form">
                                                <div class="filter">
                                                    <div class="form-group fg-float input-border">
                                                        <div class="fg-line">
                                                            <input type="text" v-model.trim="searchTextTemp" v-on:keyup.enter="search" class="form-control fg-input" placeholder="Escribe un tema de interés…">
                                                        </div>
                                                    </div>
                                                    <button class="filter-btn" type="button" @click.prevent="search()" name="button">Buscar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!--<div class="row" v-show="hasSearch">-->
                                        <!--<div class="col-12">-->
                                            <!--<div class="form">-->
                                                <!--<div class="filter">-->
                                                    <!--<div class="form-group fg-float input-border">-->
                                                        <!--<div class="fg-line">-->
                                                            <!--<input type="text" v-model.trim="searchTextTemp" v-on:keyup.enter="search" class="form-control fg-input" placeholder="Escribe un tema de interés…">-->
                                                        <!--</div>-->
                                                    <!--</div>-->
                                                    <!--<button class="filter-btn" type="button" @click.prevent="search()" name="button">Buscar</button>-->
                                                <!--</div>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->

                                    <div class="empty-state"  v-show="hasSearch && !hasResources">
                                        <img class="img-fluid"
                                             src="@/assets/images/Emptystates/empty-state-box.svg"
                                             alt="Empty"/>
                                        <p>
                                            No encontramos algún recurso con tu búsqueda “{{searchText}}”   
                                        </p>
                                    </div>


                                    <div class="tab-content" id="box-tabsContent"  v-show="!hasSearch">
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
                                    <div class="tab-content m-t-40" v-show="hasSearch && hasResources">
                                        <div v-show="article.length">
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
                                        <div v-show="notes.length">
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
                                        
                                        <div v-show="legalFramework.length">
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

                                        <div v-show="website.length">
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
                searchText: '',
                searchTextTemp: '',
            }
        },
        computed: {
            ...mapState({
                article: state => state[storeModule].article || [],
                notes: state => state[storeModule].notes || [],
                legalFramework: state => state[storeModule].legalFramework || [],
                website: state => state[storeModule].website || [],
            }),
            hasSearch() {
                return this.searchText && this.searchText.length;
            },
            hasResources() {
                if (this.article && this.article.length) {
                    return true;
                }
                if (this.notes && this.notes.length) {
                    return true;
                }
                if (this.legalFramework && this.legalFramework.length) {
                    return true;
                }
                if (this.website && this.website.length) {
                    return true;
                }
                
                return false;
            }
        },
        filters: {
            moment: function (date) {
                if (!utils.isDate(date)) {
                    return '';
                }
                return moment(date).format('DD/MM/YYYY');
            }
        },
        methods: {
            imageSrc(id) {
                return `${baseApi.baseUrl}/public-api/files/image/${id}`;
            },
            search() {
                this.searchText = this.searchTextTemp;
                this.$store.dispatch(`${storeModule}/LOAD_RESOURCES`, {search: this.searchText});
            }
        },
        components: {
            MoreInfo
        },
        beforeMount() {
            this.$store.dispatch(`${storeModule}/LOAD_RESOURCES`, {});
        }
    }
</script>
