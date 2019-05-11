<template>
    <div>
        <!-- SIDEBAR SECTION -->
        <aside id="sidebar" class="sidebar">
            <div id="" class="">
                <div class="top-logo">
                    <div class="logo-full">
                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo" />
                        <div>
                            <small>Monitor</small>
                            <label>Karewa</label>
                        </div>
                    </div>
                    <div id="hideMenu" class="btn-close-resp"><a><i class="zmdi zmdi-close"></i></a></div>
                </div>
                <ul class="main-menu">
                    
                    <template v-for="(linkArray, linkArrayIndex) in sidemenuLinks">
                        <!--Agregar divider de grupos automáticamente-->
                        <div v-if="linkArrayIndex > 0" class="divider"></div>
                        
                        <!--Insertar enlace-->
                        <router-link v-for="(link, index) in linkArray" tag="li" :to="link.to" :key="'sidemenu-link-' + linkArrayIndex + '-' + index" exact-active-class="active">
                            <a><i :class="link.icon"></i> {{link.name}} </a>
                        </router-link>
                    </template>
                    
                    <!--<li><a href=""><i class="zmdi zmdi-view-dashboard"></i> Dashboard </a></li>-->
                    <!--<div class="divider"></div>-->
                    <!--<li class="active">-->
                        <!--<a href=""><i class="zmdi zmdi-accounts"></i> Usuarios </a>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<a href=""><i class="zmdi zmdi-account"></i> Proveedores </a>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<a href=""><i class="zmdi zmdi-city-alt"></i> Organizaciones </a>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<a href=""><i class="zmdi zmdi-input-composite"></i> U. Administrativas </a>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<a href=""><i class="zmdi zmdi-file-text"></i> Contratos </a>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<a href=""><i class="zmdi zmdi-link"></i> Enlaces de Interés </a>-->
                    <!--</li>-->
                    <!--<li>-->
                        <!--<a href=""><i class="zmdi zmdi-confirmation-number"></i> Cálculos </a>-->
                    <!--</li>-->
                    <!--<div class="divider"></div>-->
                    <!--<li class="active">-->
                        <!--<a href=""><i class="zmdi zmdi-settings"></i> Configuración </a>-->
                    <!--</li>-->
                </ul>
            </div>
            <div class="footer-sidebar">
                <!--<router-link :to="linksFooter.to">-->
                    <!--<i :class="linksFooter.icon"></i> {{linksFooter.name}}-->
                <!--</router-link>-->

                <a @click.prevent="logout">
                    <i class="zmdi zmdi-power"></i> Cerrar Sesión
                </a>
                <!--<router-link :to="linksFooter.to">-->
                    <!--<i :class="linksFooter.icon"></i> {{linksFooter.name}}-->
                <!--</router-link>-->
                <!--<a href=""><i class="zmdi zmdi-power"></i> Cerrar Sesión </a>-->
            </div>
        </aside>
        <div class="backdrop"></div>
        <!-- END SIDEBAR SECTION -->
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
                sidemenuLinks: [
                    [
                        {
                            name: 'Dashboard',
                            to: '/admin',
                            icon: 'zmdi zmdi-view-dashboard',
                            admin: true
                        }
                    ],
                    [
                        {
                            name: "Usuarios",
                            to: "/admin/users",
                            icon: "zmdi zmdi-accounts",
                            admin: true
                        },
                        {
                            name: "Proveedores",
                            to: "/admin/suppliers",
                            icon: "zmdi zmdi-account",
                            admin: true
                        },
                        {
                            name: "Organizaciones",
                            to: "/admin/organizations",
                            icon: "zmdi zmdi-city-alt",
                            admin: true
                        },
                        {
                            name: "U. Administrativas",
                            to: "/admin/administrative-units",
                            icon: "zmdi zmdi-input-composite",
                            admin: true
                        },
                        {
                            name: "Contratos",
                            to: "/admin/contracts",
                            icon: "zmdi zmdi-file-text",
                            admin: true
                        },
                        {
                            name: "Recursos",
                            to: "/admin/resources",
                            icon: "zmdi zmdi-link",
                            admin: true
                        },
                        {
                            name: "Cálculos",
                            to: "/admin/calculations",
                            icon: "zmdi zmdi-confirmation-number",
                            admin: true
                        }
                    ],
                    [
                        {
                            name: "Configuración",
                            to: "/admin/settings",
                            icon: "zmdi zmdi-settings",
                            admin: true
                        }
                    ]
                ],
                linksFooter: {
                    "name": "Cerrar Sesión",
//                    "to": "/logout",
                    "to": "/",
                    "icon": "zmdi zmdi-power"
                }
            }
        },
        components: {
        },
        methods: {
            logout () {
                let _session = this.$session; 
                this.$store.dispatch('accounts/LOGOUT', {_session});
            }
        },
        mounted: () => {
            window.$('#hideMenu').on('click', function() {
                $('.sidebar').removeClass('small-sidebar');
                $('.backdrop').removeClass('active');
                $('#hamburguer-icon').removeClass('active');
            });
        }
    }
</script>