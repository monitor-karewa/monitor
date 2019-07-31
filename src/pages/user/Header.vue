<template>
    <div>
        <header id="header" class="header clearfix">
            <div class="neutral-width topbar vertical-center">
                <div class="left col-2 p-0">
                    <div class="logo-full">
                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                        <div>
                            <small>Monitor</small>
                            <label class="f-14" :style="{color: currentOrganization.color}">{{currentOrganization.shortName}}</label>
                        </div>
                    </div>
                    <!--<img class="img-fluid" src="@/assets/images/Logos/logo-karewa.png" alt="Logo" />-->
                </div>
                <div class="right col-md-10 p-0">
                    <div class="admin">
                        <ul>
                            <router-link v-for="(link, index) in links" :key="'link' + index" :to="link.to" tag="li" exact-active-class="active">
                                <a>{{link.name}}</a>
                            </router-link>
                        </ul>
                        <div class="topMenuDropdown dropdown keep-open">
                            <button class="dropdown-toggle d-flex justify-content-center" type="button" id="dropdownMenuTop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg id="hamburguer-icon" class="" width="30" height="30" viewBox="0 0 30 30">
                                    <path class="line line-top" d="M0,9h30"/>
                                    <path class="line line-center" d="M0,15h30"/>
                                    <path class="line line-bottom" d="M0,21h30"/>
                                </svg>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuTop">
                                <router-link v-for="(link, index) in links" :key="'link-dropdown-' + index" :to="link.to" class="dropdown-item" exact-active-class="active">
                                    {{link.name}}
                                </router-link>
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
    
    import {mapState} from 'vuex';
    
    export default {
        data () {
            return {
                links: [
                    {
                        name: 'Inicio',
                        to: '/'
                    },
                    {
                        name: 'Cambiar Organización',
                        to: '/select-organization'
                    },
                    {
                        name: 'Proveedores',
                        to: '/suppliers'
                    },
                    {
                        name: 'Contratos',
                        to: '/contracts'
                    },
                    {
                        name: 'Índice de Riesgo de Corrupción',
                        to: '/calculations/corruption-index'
                    },
                    {
                        name: 'Comparar',
                        to: '/comparations'
                    },
                    {
                        name: 'Recursos',
                        to: '/resources'
                    },
                    {
                        name: 'Administrar',
                        to: '/login'
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                currentOrganization: state => state.currentOrganization,
            })
        },
        mounted() {
//            this.currentOrganizationName = this.$session.get('currentOrganizationName');
//            this.currentOrganizationShortName = this.$session.get('currentOrganizationShortName');
        }
    }
</script>
