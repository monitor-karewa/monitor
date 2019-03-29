<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">
                <div class="col-12 p-0">
                    <div class="floating-title-panel small">
                        <h1> Adquisiciones, Arrendamientos, Contratación de Servicios y Obra Pública del Municipio de Chihuahua </h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-8 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Millones de pesos por trimestre </h1>
                            </div>

                            <div>INSERTAR AQUI GRAFICA</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="card">
                            <div class="floating-title-panel small">
                                <h1> Presupuesto ejercido por tipo de procedimiento </h1>
                            </div>
                            <div>INSERTAR AQUI GRAFICA</div>
                        </div>
                    </div>
                </div>

                <!-- FLOATING BUTTONS FOR LINKS -->
                <!--<div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <a href="" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir a Inicio </a>
                    <a href="" class="btn-outline text-unset m-auto-left"> Ir a Contratos <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i></a>
                </div>-->

                <MoreInfo></MoreInfo>
            </div>
        </section>
    </div>
</template>
<style></style>
<script>
    import MoreInfo from '@/components/general/MoreInfo';

    export default {
        data() {},
        components: {
            MoreInfo
        }
    }
</script>
