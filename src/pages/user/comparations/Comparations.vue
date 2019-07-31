<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">

                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <router-link to="/calculations/corruption-index" class="btn-outline text-unset">
                        <i class="zmdi zmdi-long-arrow-left"></i>Ir a Índice de riesgo corrupción
                    </router-link>
                    <router-link to="/resources" class="btn-outline text-unset m-auto-left">
                        Ir a Recursos <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i>
                    </router-link>
                </div>

                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel">
                            <h1>
                                Comparar Monitores
                            </h1>
                            <div class="side-right">
                                <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>
                                <!--<a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i-->
                                        <!--class="zmdi zmdi-download"></i> Descargar comparación</a>-->
                            </div>
                        </div>
                        <div class="filter m-b-20">
                            <div class="filter-container">
                                <input class="input-search" type="text" name="" v-model="search"
                                        placeholder="Busca Monitores o ingresa una dirección de un Monitor externo" @keyup.enter="searchOrganizations(search)"/>
                            </div>
                            <button class="filter-btn" type="button" name="button" @click="searchOrganizations(search)">Buscar</button>
                        </div>


                        <p class="f-14 c-plain_text principal-font-regular">Selecciona un monitor con el cual comparar
                            <strong class="principal-font-semibold">{{currentOrganization.name}}</strong>
                        </p>

                        <br/>

                        <div class="row" v-if="filteredOrganizations && filteredOrganizations.length">

                            <div class="col-12 col-md-4 col-lg-3" v-for="organization in filteredOrganizations" >
                                <div class="card-compare">
                                    <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                    <div class="logo-full">
                                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png"
                                             alt="Logo"/>
                                        <div>
                                            <small>Monitor</small>
                                            <label :style="{color: organization.color}">{{organization.shortName}}</label>
                                        </div>
                                    </div>
                                    <small>{{organization.name}}</small>
                                    <router-link :to="'/comparations/' + organization._id + (baseRemoteUrl ? ('?baseRemoteUrl=' + baseRemoteUrl) : '')" class="btn-stroke xs button-primary">
                                        Comparar
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <div v-else v-cloak>
                            <div class="row m-b-50">
                                <div class="col-12">
                                    <div class="">
                                        <div class="empty-state">
                                            <img class="img-fluid"
                                                 src="@/assets/images/Emptystates/empty-state-box.svg"
                                                 alt="Empty"/>
                                            <p>
                                                <strong class="d-block">No se han encontrado monitores que coincidan con tu búsqueda</strong>
                                                <span>Por favor intenta nuevamente</span>
                                            </p>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                        <p class="f-14 c-plain_text principal-font-regular" v-show="comparations && comparations.length">
                            <strong class="principal-font-semibold">Comparaciones Recientes</strong>
                        </p>

                        <div class="row" v-show="comparations && comparations.length">
                            <div class="col-12 col-md-4 col-lg-3" v-for="comparation in comparations">
                                <div class="card-compare">
                                    <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                    <div class="logo-full">
                                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png"
                                             alt="Logo"/>
                                        <div>
                                            <small>Monitor</small>
                                            <label :style="{color: comparation.color}">{{comparation.targetName}}</label>
                                        </div>
                                    </div>
                                    <small>{{comparation.targetName}}</small>
                                    <router-link :to="'/comparations/' + comparation.target + (comparation.remoteUrl ? ('?baseRemoteUrl=' + comparation.remoteUrl) : '')" class="btn-stroke xs button-primary">
                                        Comparar
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <br/>

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

    const organizationsStoreModule = 'publicOrganizations';
    
    export default {

        data() {
            return {
                search : "",
                monitores: [
                    {
                        name: "Cd. Juarez",
                        abrev: "Cd. Juarez",
                        color: "#b32530",
                    },
                    {
                        name: "Monterrey",
                        abrev: "Monterrey",
                        color: "#393a3d",
                    },
                    {
                        name: "Tijuana",
                        abrev: "Tijuana",
                        color: "#007ac9",
                    },
                    {
                        name: "Parral",
                        abrev: "Parral",
                        color: "#edae44",
                    },
                    {
                        name: "Mérida",
                        abrev: "Mérida",
                        color: "#13419e",
                    },
                    {
                        name: "Guadalajara",
                        abrev: "Guadalajara",
                        color: "#2cbcb6",
                    },
                    {
                        name: "Ciudad de México",
                        abrev: "CDMX",
                        color: "#23b10d",
                    },
                    {
                        name: "Toluca",
                        abrev: "Toluca",
                        color: "#cd2122",
                    },
                    {
                        name: "Morelia",
                        abrev: "Morelia",
                        color: "#8b1c40",
                    },
                    {
                        name: "Cuernavaca",
                        abrev: "Cuernavaca",
                        color: "#de1982",
                    },
                    {
                        name: "La Paz",
                        abrev: "La Paz",
                        color: "#676739",
                    },
                    {
                        name: "León",
                        abrev: "León",
                        color: "#f6901e",
                    }
                ]
            }
        },
        components: {
            MoreInfo
        },
        computed: {
            ...mapState({
                organizations: state => state[organizationsStoreModule].organizations,
                comparations: state => state[organizationsStoreModule].comparations,
                currentOrganization: state => state.currentOrganization,
                baseRemoteUrl: function(state) {
                    if(state[organizationsStoreModule].baseRemoteUrl && state[organizationsStoreModule].baseRemoteUrl.length && state[organizationsStoreModule].baseRemoteUrl !== "undefined"){
                        return state[organizationsStoreModule].baseRemoteUrl;
                    } else {
                        return undefined;
                    }
                }

            }),
            filteredOrganizations() {
                if (!this.organizations) {
                    return [];
                }
                return this.organizations.filter((organization) => {
                    return organization._id.toString() !== this.currentOrganization._id.toString();
                });
            }
        },
        mounted() {
            this.$store.dispatch(`${organizationsStoreModule}/LOAD_ORGANIZATIONS`, {});
            this.$store.dispatch(`${organizationsStoreModule}/LOAD_COMPARATIONS`);
        }, methods : {
            searchOrganizations(search){
                this.$store.dispatch(`${organizationsStoreModule}/SEARCH_ORGANIZATIONS`,search);
            },
            copyUrlToClipBoard(){
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value =  window.location.href;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                tShow('Se ha copiado el enlace correctamente', 'info');

            }
        }
    }
</script>
