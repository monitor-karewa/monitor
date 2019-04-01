<template>
    <!-- HEADER SECTION -->
    <header id="header" class="header clearfix">
        <div class="left col-md-3 col-4">
            <button id="showMenu" class="side-menu" type="button">
                <svg id="hamburguer-icon" class="" width="30" height="30" viewBox="0 0 30 30">
                    <path class="line line-top" d="M0,9h30"/>
                    <path class="line line-center" d="M0,15h30"/>
                    <path class="line line-bottom" d="M0,21h30"/>
                </svg>
            </button>
        </div>
        <div class="right col-md-9 col-8">
            <div class="links">
                <router-link to="/admin/data-load" class="btn-raised xs button-accent hideresp">
                    <i class="zmdi zmdi-plus"></i> Cargar datos
                </router-link>
                <!--<a href="/admin/data-load" class="btn-raised xs button-accent hideresp"><i class="zmdi zmdi-plus"></i> Cargar datos</a>-->
                <a href="" class="btn-circle-icon hideresp m-l-30"><i class="zmdi zmdi-notifications-none"></i></a>
                <a href="" class="btn-circle-icon hideresp m-r-30"><i class="zmdi zmdi-settings"></i></a>
                <div class="topMenuDropdown dropdown">
                    <button class="dropdown-toggle" type="button" id="dropdownUserMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div>
                            <label>Jorge Alejandro Hermosillo Salcido</label>
                            <span>Admin</span>
                        </div>
                        <img class="img-fluid" src="@/assets/images/Demo/user-test.jpg" alt="User" />
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownUserMenu">
                        <router-link to="/admin/data-load" class="hideresp dropdown-item">
                            Cargar Datos
                        </router-link>
                        <!--<a href="/admin/data-load" class="hideresp dropdown-item"> Cargar Datos </a>-->
                        <a href="" class="hideresp dropdown-item"> Notificaciones </a>
                        <a href="" class="hideresp dropdown-item active"> Configuración </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- END HEADER SECTION -->
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        mounted: () => {
            window.$('#showMenu').on('click', function() {
                $('.sidebar').addClass('small-sidebar');
                $('.backdrop').addClass('active');
            });
        }
    }
</script>