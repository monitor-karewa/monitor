<template>
    <div>

        <!--Titulo-->
        <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
            <a href="/" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir a Proveedores
            </a>
        </div>

        <section class="client-content">
            <div class="neutral-width">

                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1 m-t-0>
                                Contratos
                            </h1>
                            <div class="side-right">
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>
                                <a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i
                                        class="zmdi zmdi-download"></i> DESCARGAR DATOS DE CONTRATOS</a>
                            </div>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">Aquí podrás encontrar la lista de todos los contratos que han sido firmados por el Municipio de Chihuahua.<br/>
                            Si quieres consultar los detalles de un contraro haz clic en “Ver más”.</p>

                        <div class="filter">
                            <div class="filter-container">
                                <input class="input-search" type="text" name="" value="" placeholder="Escribe el nombre del contrato.."/>
                            </div>
                            <button class="filter-btn" type="button" name="button">Buscar</button>
                        </div>

                        <div class="m-t-10">
                            <div class="filter-box">
                                <div class="filter">
                                    <div class="filter-container row m-0">
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar administración"
                                                        title="Por administración">
                                                    <option>ADMINISTRACIÓN 2016-2018</option>
                                                    <option>ADMINISTRACIÓN 2013-2015</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar año" title="Por año…">
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar trimestre"
                                                        title="Por trimestre…">
                                                    <optgroup label="2018">
                                                        <option>3º 2018</option>
                                                        <option>2º 2018</option>
                                                        <option>1º 2018</option>
                                                    </optgroup>
                                                    <optgroup label="2017">
                                                        <option>3º 2017</option>
                                                        <option>2º 2017</option>
                                                        <option>1º 2017</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar administrativa"
                                                        title="Por unidad administrativa…">
                                                    <option>ATENCIÓN CIUDADANA</option>
                                                    <option>CENTRO DE ATENCIÓN Y PREVENCIÓN PSICOLÓGICAS</option>
                                                    <option>COMUNICACIÓN SOCIAL</option>
                                                    <option>CONSEJO DE URBANIZACIÓN</option>
                                                    <option>DESARROLLO ECONOMICO Y TURÍSTICO</option>
                                                    <option>DESARROLLO HUMANO Y EDUCACIÓN</option>
                                                    <option>DESARROLLO INTEGRAL DE LA FAMILIA</option>
                                                    <option>DESARROLLO RURAL</option>
                                                    <option>DESARROLLO URBANO Y ECOLOGÍA</option>
                                                    <option>DESPACHO DE LA PRESIDENCIA</option>
                                                    <option>DIRECCIÓN DE OBRAS PUBLICAS MUNICIPALES</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="filter-btn" type="button" name="button">Filtrar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cantidades -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color accent">
                            <span>$2,302,860,488.81</span>
                            <label>MONTO TOTAL</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color red">
                            <span>$1,055,177,509.74</span>
                            <label>Monto total de contratos por Licitación pública</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color yellow">
                            <span>$149,337,687.59</span>
                            <label>Monto total de contratos por Invitación</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color green">
                            <span>$1,098,345,291.46</span>
                            <label>Monto total de contratos por Adjudicación Directa</label>
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-12">
                        <div class="card regular-table">
                            <div class="default-scrollbar ">
                                <table class="table form-table m-b-0">
                                    <thead>
                                    <tr>
                                        <th class="column-wdt">Opciones</th>
                                        <th class="text-align-r">Id. proceso</th>
                                        <th class="text-align-r">Descripción de la obra</th>
                                        <th class="text-align-r">Monto total</th>
                                        <th class="text-align-r">Fecha del contrato<i
                                                class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                        <th class="text-align-c">Tipo de procedimiento</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="contract in contracts">
                                        <td class="column-wdt"><a href="" class="btn-stroke button-primary table-btn-stroke">Ver más</a></td>
                                        <td class="text-align-r">{{contract.id}}</td>
                                        <td class="text-align-r">{{contract.descripcionObra}}</td>
                                        <td class="text-align-r c-accent">{{contract.montoTotal}}</td>
                                        <td class="text-align-r" style="text-transform: uppercase">{{contract.FechaDelContrato}}</td>
                                        <td class="text-align-r">{{contract.tipoProcedimiento}}</td>
                                    </tr>
                                    <!--<tr class="bgm-cards">-->
                                        <!--<td class="p-t-15 p-b-10 f-bold">TOTAL</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15">$1,055,177,509.74</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15">$149,337,687.59</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15">$1,098,345,291.46</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15 c-accent">$2,302,860,488.81</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15"></td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>
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

    </div>
</template>

<style>
    /*.column-wdt {*/
        /*width: auto;*/
        /*min-width: 0;*/
        /*display: table;*/
    /*}*/
</style>

<script>

    import MoreInfo from '@/components/general/MoreInfo';

    export default {
        data() {
            return {
                contracts: [
                    {
                        id: "IMPELP02/2017",
                        descripcionObra: "contratación de servicio de farmacia subrogada",
                        montoTotal: "$81,400,000.00",
                        FechaDelContrato: "19/diciembre/2017",
                        tipoProcedimiento: "Licitación Pùblica"
                    },
                    {
                        id: "IMPELP04/2016",
                        descripcionObra: "Prestación del servicio de farmacia subrogada",
                        montoTotal: "$72,208,045.00",
                        FechaDelContrato: "01/diciembre/2016",
                        tipoProcedimiento: "Licitación Pùblica"
                    },
                    {
                        id: "AD020/17",
                        descripcionObra: "Servicio para el suministro de combustible (gasolina y diesel) para el parque vehicular propiedad del Municipio de Chihuahua",
                        montoTotal: "$70,300,000.00",
                        FechaDelContrato: "07/diciembre/2016",
                        tipoProcedimiento: "Adjudicación directa"
                    },
                    {
                        id: "MET0411185E7",
                        descripcionObra: "CONSTRUCCIÓN DE GAZA EN EL PERIFERICO DE LA JUVENTUD Y AV. LA CANTERA",
                        montoTotal: "$69,770,177.00",
                        FechaDelContrato: "19/mayo/2017",
                        tipoProcedimiento: "Licitación Pùblica"
                    },
                    {
                        id: "AD128/17",
                        descripcionObra: "CONTRATACION DEL SERVICIO DE SUMINISTRO DE COMBUSTIBLE DE GASOLINA Y DIESEL PARA LOS VEHICULOS Y EDIFICIOS",
                        montoTotal: "$60,311,399.00",
                        FechaDelContrato: "01/julio/2017",
                        tipoProcedimiento: "Adjudicación directa"
                    },
                    {
                        id: "AD131/18",
                        descripcionObra: "SERVICIO PARA EL SUMINISTRO DE COMBUSTIBLE DE GASOLINA Y DIESEL PARA EL PARQUE VEHICULAR Y EDIFICIOS PROPIEDAD DEL MUNICIPIO DE CHIHUAHUA",
                        montoTotal: "$60,152,282.00",
                        FechaDelContrato: "01/marzo/2018",
                        tipoProcedimiento: "Adjudicación directa"
                    },
                    {
                        id: "DOPM0673/16",
                        descripcionObra: "CONSTRUCCIÓN DE COLECTOR EN VARIAS COLONIAS AL SUR DE LA CIUDAD (1A ETAPA)",
                        montoTotal: "$52,381,951.00",
                        FechaDelContrato: "08/diciembre/2017",
                        tipoProcedimiento: "Licitación Pùblica"
                    },
                    {
                        id: "CUM01/17",
                        descripcionObra: "Licitación Pública para adquisición de concreto hidráulico y material triturado",
                        montoTotal: "$40,720,828.00",
                        FechaDelContrato: "10/febrero/2017",
                        tipoProcedimiento: "Licitación Pùblica"
                    },
                    {
                        id: "CUM01/2018",
                        descripcionObra: "Suministro de concreto hidráulico y material base",
                        montoTotal: "$35,389,809.00",
                        FechaDelContrato: "02/marzo/2018",
                        tipoProcedimiento: "Licitación Pùblica"
                    },
                ]
            }
        },
        components: {}
    }
</script>
