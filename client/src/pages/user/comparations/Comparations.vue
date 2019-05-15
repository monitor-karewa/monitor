<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">

                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <router-link to="/calculations" class="btn-outline text-unset">
                        <i class="zmdi zmdi-long-arrow-left"></i>Ir a Índice de corrupción
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
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>
                                <!--<a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i-->
                                        <!--class="zmdi zmdi-download"></i> Descargar comparación</a>-->
                            </div>
                        </div>


                        <p class="f-14 c-plain_text principal-font-regular">Seleccionar un
                            monitor con el cual comparar
                            <strong class="principal-font-semibold">Monito Karewa del Municipio de Chihuahua</strong>
                        </p>

                        <br/>

                        <div class="row">
                            <div class="col-12 col-md-4 col-lg-3" v-for="organization in filteredOrganizations">
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
                                    <router-link :to="'/comparations/' + organization._id" class="btn-stroke xs button-primary">
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
                currentOrganization: state => state.currentOrganization
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
            this.$store.dispatch(`${organizationsStoreModule}/LOAD_ORGANIZATIONS`);
        }
    }
</script>
