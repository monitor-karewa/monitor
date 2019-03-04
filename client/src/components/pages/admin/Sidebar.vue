<template>
    <div>
        <!-- SIDEBAR SECTION -->
        <aside id="sidebar" class="sidebar">
            <div id="" class="">
                <div class="top-logo">
                    <div class="logo-full">
                        <img class="img-fluid" src="@assets/images/Logos/logo-karewa-xs.png" alt="Logo" />
                        <div>
                            <small>Monitor</small>
                            <label>Karewa</label>
                        </div>
                    </div>
                    <div id="hideMenu" class="btn-close-resp"><a><i class="zmdi zmdi-close"></i></a></div>
                </div>
                <ul class="main-menu">
                    <li><a href=""><i class="zmdi zmdi-view-dashboard"></i> Dashboard </a></li>
                    <div class="divider"></div>
                    <li class="active">
                        <a href=""><i class="zmdi zmdi-accounts"></i> Usuarios </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-account"></i> Proveedores </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-city-alt"></i> Organizaciones </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-input-composite"></i> U. Administrativas </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-file-text"></i> Contratos </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-link"></i> Enlaces de Interés </a>
                    </li>
                    <li>
                        <a href=""><i class="zmdi zmdi-confirmation-number"></i> Cálculos </a>
                    </li>
                    <div class="divider"></div>
                    <li class="active">
                        <a href=""><i class="zmdi zmdi-settings"></i> Configuración </a>
                    </li>
                </ul>
            </div>
            <div class="footer-sidebar">
                <a href=""><i class="zmdi zmdi-power"></i> Cerrar Sesión </a>
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
            }
        },
        components: {
        }
    }
</script>