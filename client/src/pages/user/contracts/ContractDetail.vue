<template>

    <section class="client-content">
        <div class="neutral-width">

            <!--Titulo-->
            <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                <a href="/contracts" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Regreso a Contratos </a>
            </div>

            <!-- CONTRATO SECTION -->
            <div class="col-12 p-0">
                <!-- CONTRATO INFO -->
                <div class="card">
                    <div class="floating-title-panel long-text">
                        <h1>
                            <small>Contrato</small>
                            OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE CHIHUAHUA, CHIH
                        </h1>
                        <div class="side-right">
                            <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i class="zmdi zmdi-share"></i> Compartir</a>
                        </div>
                    </div>
                    <p class="f-14 c-plain_text principal-font-regular">El contrato <strong class="principal-font-semibold">OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE CHIHUAHUA, CHIH</strong>, a cargo del proveedor <strong class="principal-font-semibold">CONSTRUCCIONES MARRO SA DE CV</strong> obtuvo una cantidad de <strong class="c-accent">$26,327,329.17</strong>, celebrado el día <strong>20 de octubre de 2017.</strong></p>
                </div>
                <!-- CONTRATO FILES -->
                <div class="card">
                    <div class="floating-title-panel small">
                        <h1>Archivos</h1>
                    </div>
                    <p class="f-14 c-plain_text principal-font-regular m-b-30">Aquí puedes consultar los documentos de la convocatoria, de aclaración y propuesta de este contrato.</p>
                    <div class="row m-b--30">
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Contrato</label>
                                <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Convocatoria / Invitación</label>
                                <small>Documento no disponible</small>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Fallo de Junta de Aclaraciones</label>
                                <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                            <div class="panel-button">
                                <label>Presentación de Propuesta</label>
                                <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CONTRATO DETAIL INFO -->
                <div class="card">
                    <div class="floating-title-panel small">
                        <h1>Información detallada</h1>
                    </div>
                    <div class="non-list">
                        <span> <small>Identificador de proceso</small> <i>-</i> <strong> DOPM176/2017 </strong></span>
                        <span> <small>Descripción de las obras, bienes o servicios</small> <i>-</i> <strong> OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE CHIHUAHUA, CHIH </strong></span>
                        <span> <small>Monto total</small>  <i>-</i> <strong class="c-accent"> $26,327,329.17 </strong></span>
                        <span> <small>Fecha del contrato</small> <i>-</i> <strong> 20 de octubre de 2017 </strong></span>
                        <span> <small>Tipo de procedimiento</small> <i>-</i> <div class="badge badge-red"> Adjudicación Directa </div></span>
                        <span> <small>Estado del procedimiento</small> <i>-</i> <div class="badge"> Concluido </div></span>
                        <span> <small>Unidad administrativa solicitante</small> <i>-</i> <strong> DIRECCIÓN DE OBRAS PUBLICAS MUNICIPALES </strong></span>
                        <span> <small>Materia</small> <i>-</i> <strong> Obra pública </strong></span>
                        <span> <small>Nombre del proveedor</small> <i>-</i> <strong> CONSTRUCCIONES MARRO SA DE CV </strong></span>
                        <span> <small>RFC</small> <i>-</i> <strong> GMA980529MWO </strong></span>
                        <span> <small>Notas de Municipio de Chihuahua</small> <i>-</i> <strong> Hipervínculo acta de recepción física de trabajos : ESTA EN PROCESO. </strong></span>
                        <span> <small>Fecha de obtención de los datos</small> <i>-</i> <strong> 13 de marzo de 2018 </strong></span>
                    </div>
                </div>
            </div>

            <!-- ADITIONAL INFO ONLY -->
            <p class="f-12 c-plain_text principal-font-regular">
                Todos los datos que se presentan en este informe son única y exclusivamente obtenidos de: http://www.municipiochihuahua.gob.mx/Transparencia
                <br>
                Última actualización: <strong>27 de noviembre de 2018</strong>
            </p>

            <more-info></more-info>

        </div>
    </section>

</template>

<script>
    import MoreInfo from '@/components/general/MoreInfo';

    export default {
        name: "SupplierContract",
        components: {
            MoreInfo
        }
    }
</script>

<style scoped>

</style>
