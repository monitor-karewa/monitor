<template>
    <!-- INFO CARDS WITH IMAGE -->
    <div class="row m-t-60">
        <div class="col-12">
            <div class="floating-title-panel small">
                <h1>Descubre más información</h1>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="card-info">
                <img class="img-fluid" src="@/assets/images/Cards/home-vector.svg" alt=""/>
                <div>
                    <p>Consulta la lista de todos los proveedores.</p>
                    <router-link to="/suppliers" class="link-to c-accent" tabindex="">
                        Ver Proveedores <i class="zmdi zmdi-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="card-info">
                <img class="img-fluid" src="@/assets/images/Cards/contracts-vector.svg" alt=""/>
                <div>
                    <p>Consulta la lista de todos los contratos.</p>
                    <router-link to="/contracts" class="link-to" tabindex="">
                        Ver Contratos <i class="zmdi zmdi-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="card-info">
                <img class="img-fluid" src="@/assets/images/Cards/providers-vector.svg" alt=""/>
                <div>
                    <p>Conoce el índice de riesgo de corrupción del monitor.</p>
                    <router-link to="/calculations/corruption-index" class="link-to" tabindex="">
                        Ver Índice de Riesgo de Corrupción <i class="zmdi zmdi-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="card-info">
                <img class="img-fluid" src="@/assets/images/Cards/compare-vector.svg" alt=""/>
                <div>
                    <p>Compara los datos escenciales con otro monitor.</p>
                    <router-link to="/comparations" class="link-to" tabindex="">
                        Comparar <i class="zmdi zmdi-chevron-right"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
</script>

<script>
    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>
