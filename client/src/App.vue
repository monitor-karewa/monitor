<template>
<!--<div>-->
    <!--<ul>-->
        <!--<li v-for="(link, index) in links" :key="index">-->
            <!--<router-link :to="link.to">{{ link.name }}</router-link>-->
        <!--</li>-->
    <!--</ul>-->
    <!--<main>-->
        <!--<router-view/>-->
    <!--</main>-->
<!--</div>-->
<div>
    <!-- ADMIN -->
    <!--<div v-if="this.$route === '/'">-->
        <!--&lt;!&ndash; HEADER SECTION &ndash;&gt;-->
        <!--<header id="header" class="header clearfix">-->
            <!--<div class="left col-md-3 col-4">-->
                <!--<button id="showMenu" class="side-menu" type="button">-->
                    <!--<svg id="hamburguer-icon" class="" xmlns="" width="30" height="30" viewBox="0 0 30 30">-->
                        <!--<path class="line line-top" d="M0,9h30"/>-->
                        <!--<path class="line line-center" d="M0,15h30"/>-->
                        <!--<path class="line line-bottom" d="M0,21h30"/>-->
                    <!--</svg>-->
                <!--</button>-->
            <!--</div>-->
            <!--<div class="right col-md-9 col-8">-->
                <!--<div class="links">-->
                    <!--<a href="" class="btn-raised xs button-accent hideresp"><i class="zmdi zmdi-plus"></i> Cargar datos</a>-->
                    <!--<a href="" class="btn-circle-icon hideresp m-l-30"><i class="zmdi zmdi-notifications-none"></i></a>-->
                    <!--<a href="" class="btn-circle-icon hideresp m-r-30"><i class="zmdi zmdi-settings"></i></a>-->
                    <!--<div class="topMenuDropdown dropdown">-->
                        <!--<button class="dropdown-toggle" type="button" id="dropdownUserMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                            <!--<div>-->
                                <!--<label>Jorge Alejandro Hermosillo Salcido</label>-->
                                <!--<span>Admin</span>-->
                            <!--</div>-->
                            <!--<img class="img-fluid" src="./../assets/images/Demo/user-test.jpg" alt="User" />-->
                        <!--</button>-->
                        <!--<div class="dropdown-menu" aria-labelledby="dropdownUserMenu">-->
                            <!--<a href="" class="hideresp dropdown-item"> Cargar Datos </a>-->
                            <!--<a href="" class="hideresp dropdown-item"> Notificaciones </a>-->
                            <!--<a href="" class="hideresp dropdown-item active"> Configuración </a>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</header>-->
        <!--&lt;!&ndash; END HEADER SECTION &ndash;&gt;-->
    <!---->
        <!--&lt;!&ndash; SIDEBAR SECTION &ndash;&gt;-->
        <!--<aside id="sidebar" class="sidebar">-->
            <!--<div id="" class="">-->
                <!--<div class="top-logo">-->
                    <!--<div class="logo-full">-->
                        <!--<img class="img-fluid" src="./../assets/images/Logos/logo-karewa-xs.png" alt="Logo" />-->
                        <!--<div>-->
                            <!--<small>Monitor</small>-->
                            <!--<label>Karewa</label>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div id="hideMenu" class="btn-close-resp"><a><i class="zmdi zmdi-close"></i></a></div>-->
                <!--</div>-->
                <!--<ul class="main-menu">-->
                    <!--&lt;!&ndash;Iterar grupos de enlaces&ndash;&gt;-->
                    <!--<template v-for="(linkArray, linkArrayIndex) in sidemenuLinks">-->
                        <!--&lt;!&ndash;Agregar divider de grupos automáticamente&ndash;&gt;-->
                        <!--<div v-if="linkArrayIndex > 0" class="divider"></div>-->
                        <!---->
                        <!--&lt;!&ndash;Insertar enlace&ndash;&gt;-->
                        <!--<router-link v-for="(link, index) in linkArray" tag="li" :to="link.to" :key="'sidemenu-link-' + linkArrayIndex + '-' + index" exact-active-class="active">-->
                            <!--<a><i :class="link.icon"></i> {{link.name}} </a>-->
                        <!--</router-link>-->
                    <!--</template>-->
                <!--</ul>-->
                <!--&lt;!&ndash;<ul class="main-menu">&ndash;&gt;-->
                    <!--&lt;!&ndash;<li><a href=""><i class="zmdi zmdi-view-dashboard"></i> Dashboard </a></li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="divider"></div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="active">&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-accounts"></i> Usuarios </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-account"></i> Proveedores </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-city-alt"></i> Organizaciones </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-input-composite"></i> U. Administrativas </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-file-text"></i> Contratos </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-link"></i> Enlaces de Interés </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-confirmation-number"></i> Cálculos </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="divider"></div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="active">&ndash;&gt;-->
                        <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-settings"></i> Configuración </a>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                <!--&lt;!&ndash;</ul>&ndash;&gt;-->
            <!--</div>-->
            <!--<div class="footer-sidebar">-->
                <!--<router-link :to="linksFooter.to">-->
                    <!--<i :class="linksFooter.icon"></i> {{linksFooter.name}}-->
                <!--</router-link>-->
                <!--&lt;!&ndash;<a href=""><i class="zmdi zmdi-power"></i> Cerrar Sesión </a>&ndash;&gt;-->
            <!--</div>-->
        <!--</aside>-->
        <!--&lt;!&ndash; END SIDEBAR SECTION &ndash;&gt;-->
        <!---->
        <!--&lt;!&ndash; MAIN ADMIN SECTION &ndash;&gt;-->
        <!--<section id="main" class="">-->
            <!--<section id="content" class="page-view">-->
                <!--<router-view/>-->
            <!--</section>    -->
        <!--</section>-->
        <!--&lt;!&ndash; END MAIN ADMIN SECTION &ndash;&gt;-->
    <!--</div>-->
    <!-- END ADMIN -->
    
    
    <!-- USER -->
    <!--<div v-if="this.$route !== '/'">-->
    <!--</div>-->
    <router-view name="header"/>
    <router-view name="sidebar"/>
    <router-view/>
    <router-view name="footer"/>
    <!-- END USER -->
</div>
</template>

<style>
/*@import "./../../public/stylesheets/dist/webpack/main.min.css";*/
@import "./../assets/stylesheets/sass/main.scss";
/*@import 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css';*/
/*@import './../assets/stylesheets/dist/vendors.min.css';*/
</style>

<script>
//import "./../../public/javascripts/dist/vendors.min.js";

export default {
    data: () => ({
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
                    to: "/usuarios",
                    icon: "zmdi zmdi-accounts",
                    admin: true
                },
                {
                    name: "Proveedores",
                    to: "/proveedores",
                    icon: "zmdi zmdi-account",
                    admin: true
                },
                {
                    name: "Organizaciones",
                    to: "/organizaciones",
                    icon: "zmdi zmdi-city-alt",
                    admin: true
                },
                {
                    name: "U. Administrativas",
                    to: "/unidades-administrativas",
                    icon: "zmdi zmdi-input-composite",
                    admin: true
                },
                {
                    name: "Contratos",
                    to: "/contratos",
                    icon: "zmdi zmdi-file-text",
                    admin: true
                },
                {
                    name: "Recursos",
                    to: "/recursos",
                    icon: "zmdi zmdi-link",
                    admin: true
                },
                {
                    name: "Cálculos",
                    to: "/calculos",
                    icon: "zmdi zmdi-confirmation-number",
                    admin: true
                }
            ],
            [
                {
                    name: "Configuración",
                    to: "/configuracion",
                    icon: "zmdi zmdi-settings",
                    admin: true
                }
            ]
        ],
        linksFooter: {
            "name": "Cerrar Sesión",
            "to": "/logout",
            "icon": "zmdi zmdi-power"
        }
    }),
    mounted () {
        $(document).ready(function () {
            $('.selectpicker').selectpicker();
        });
    },
    /*,
    created() {
        let popperScript = document.createElement('script');
        popperScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js');
        popperScript.setAttribute('integrity', 'sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js');
        popperScript.setAttribute('crossorigin', 'anonymous.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js');
        document.body.appendchild(popperScript);
        
        let vendorsScript = document.createElement('script');
        vendorsScript.setAttribute('src', './../../public/javascripts/dist/vendors.min.js');
        document.body.appendchild(vendorsScript);
    }*/
}
</script>