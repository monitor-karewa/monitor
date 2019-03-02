<template>
    <div>
        <header id="header" class="header clearfix">
            <div class="neutral-width topbar">
                <div class="left col-md-3 col-4 p-0">
                    <img class="img-fluid" src="@assets/images/Logos/logo-karewa.png" alt="Logo" />
                </div>
                <div class="right col-md-9 col-8 p-0">
                    <div class="admin">
                        <ul>
                            <router-link v-for="(link, index) in links" :key="'link' + index" :to="link.to" tag="li">
                                <a>{{link.name}}</a>
                            </router-link>
                            <!--<li><a> Inicio </a></li>-->
                            <!--<li><a> Proveedores </a></li>-->
                            <!--<li><a> Contratos </a></li>-->
                            <!--<li><a> Comparar </a></li>-->
                            <!--<li><a> Cálculos </a></li>-->
                            <!--<li><a> Ligas de interés </a></li>-->
                            <!--<li><a> Administrar </a></li>-->
                        </ul>
                        <div class="topMenuDropdown dropdown keep-open">
                            <button class="dropdown-toggle" type="button" id="dropdownMenuTop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg id="hamburguer-icon" class="" xmlns="" width="30" height="30" viewBox="0 0 30 30">
                                    <path class="line line-top" d="M0,9h30"/>
                                    <path class="line line-center" d="M0,15h30"/>
                                    <path class="line line-bottom" d="M0,21h30"/>
                                </svg>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuTop">
                                <router-link v-for="(link, index) in links" :key="'link-dropdown-' + index" :to="link.to" class="dropdown-item" exact-active-class="active">
                                    {{link.name}}
                                </router-link>
                                <!--<a href="" class="dropdown-item" href="#"> Inicio </a>-->
                                <!--<a href="" class="dropdown-item active" href="#"> Proveedores </a>-->
                                <!--<a href="" class="dropdown-item" href="#"> Contratos </a>-->
                                <!--<a href="" class="dropdown-item" href="#"> Comparar </a>-->
                                <!--<a href="" class="dropdown-item" href="#"> Cálculos </a>-->
                                <!--<a href="" href="" class="dropdown-item" href="#"> Ligas de interés </a>-->
                                <!--<a href="" class="dropdown-item" href="#"> Administrar </a>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
<style></style>
<script>
    export default {
        data () {
            return {
                links: [
                    {
                        name: 'Inicio',
                        to: '/'
                    },
                    {
                        name: 'Proveedores',
                        to: '/proveedores'
                    },
                    {
                        name: 'Contratos',
                        to: '/contratos'
                    },
                    {
                        name: 'Comparar',
                        to: '/comparar'
                    },
                    {
                        name: 'Cálculos',
                        to: '/calculos'
                    },
                    {
                        name: 'Recursos',
                        to: '/recursos'
                    },
                    {
                        name: 'Administrar',
                        to: '/admin/login'
                    }
                ]
            }
        }
    }
</script>