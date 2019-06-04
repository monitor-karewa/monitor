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
                            <label :style="{color: currentOrganization.color}">{{currentOrganization.shortName}}</label>
                        </div>
                    </div>
                    <div id="hideMenu" class="btn-close-resp"><a><i class="zmdi zmdi-close"></i></a></div>
                </div>
                <ul class="main-menu">
                    
                    <template v-for="(linkArray, linkArrayIndex) in sidemenuLinks">
                        <!--Agregar divider de grupos automáticamente-->
                        <div v-if="linkArrayIndex > 0" class="divider"></div>
                        
                        <!--Insertar enlace-->
                        <router-link v-for="(link, index) in linkArray" v-if="hasAccess(link.permission)" tag="li" :to="link.to" :key="'sidemenu-link-' + linkArrayIndex + '-' + index" exact-active-class="active" @click.native="closeSidebar()">
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
                <a @click.prevent="logout">
                    <i class="zmdi zmdi-power"></i> Cerrar Sesión
                </a>
            </div>
        </aside>
        <div class="backdrop"></div>
        <!-- END SIDEBAR SECTION -->
    </div>
</template>

<style>
</style>

<script>
    
    import {mapState} from 'vuex';

    import $ from 'jquery';
    
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
                            admin: true,
                            permission: "USERS"
                        },
                        {
                            name: "Proveedores",
                            to: "/admin/suppliers",
                            icon: "zmdi zmdi-account",
                            admin: true,
                            permission: "SUPPLIERS"
                        },
                        {
                            name: "Organizaciones",
                            to: "/admin/organizations",
                            icon: "zmdi zmdi-city-alt",
                            admin: true,
                            permission: "ORGANIZATIONS"
                        },
                        {
                            name: "U. Administrativas",
                            to: "/admin/administrative-units",
                            icon: "zmdi zmdi-input-composite",
                            admin: true,
                            permission: "ADMINISTRATIVE_UNITS"
                        },
                        {
                            name: "Contratos",
                            to: "/admin/contracts",
                            icon: "zmdi zmdi-file-text",
                            admin: true,
                            permission: "CONTRACTS"
                        },
                        {
                            name: "Recursos",
                            to: "/admin/resources",
                            icon: "zmdi zmdi-link",
                            admin: true,
                            permission: "RESOURCES"
                        },
                        {
                            name: "Cálculos",
                            to: "/admin/calculations",
                            icon: "zmdi zmdi-confirmation-number",
                            admin: true,
                            permission: "CALCULATIONS"
                        }
                    ],
                    [
                        {
                            name: "Configuración",
                            to: "/admin/settings",
                            icon: "zmdi zmdi-settings",
                            admin: true,
                            permission: "SETTINGS"
                        },
                        {
                            name: "Editar Perfil",
                            to: "/admin/profile",
                            icon: "zmdi zmdi-account-circle",
                            admin: true
                        },
                        {
                            name: "Seleccionar Organización",
                            to: "/admin/select-organization",
                            icon: "zmdi zmdi-city",
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
        computed: {
            ...mapState({
                currentOrganization: state => state.currentOrganization,
            }),
            permissions () {
                return this.$session.get('permissions') || [];
            }
        },
        methods: {
            logout () {
                let _session = this.$session; 
                this.$store.dispatch('accounts/LOGOUT', {_session});
            },
            hasAccess (permission) {
                if (!permission) {
                    return true;
                }
                
                return this.permissions && this.permissions.includes(permission);
            },
            closeSidebar () {
                $('#hideMenu').click();
            }
        },
        onCreate: {
            
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