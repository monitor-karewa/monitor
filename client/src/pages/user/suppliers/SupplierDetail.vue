<template>
    <div>

        <!-- MODAL ALERT SUCCESS -->
        <div class="modal modal-alert fade" id="modalAlertSuccess" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="">Descargar datos</h1>
                        <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                    </div>
                    <div class="modal-body">
                        <p class="text-centered">Estás a punto de descargar los datos aplicando los filtros
                            seleccionados.
                            <br>
                            <strong>¿Estás seguro de continuar con esta acción?</strong>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-stroke button-accent" data-dismiss="modal">Descargar lista
                            completa
                        </button>
                        <button type="button" class="btn-stroke button-accent" data-dismiss="modal">Descargar datos
                            filtrados
                        </button>
                    </div>
                </div>
            </div>
        </div>


        <section class="client-content">
            <div class="neutral-width">

                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <router-link to="/suppliers" class="">
                        <i class="zmdi zmdi-long-arrow-left"></i> Regreso a Proveedores
                    </router-link>
                </div>

                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1>
                                CONSTRUCCIONES MARRO SA DE CV
                            </h1>
                            <div class="side-right">
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>
                                <button class="btn-raised button-accent text-capi m-l-10" data-toggle="modal"
                                        data-target="#modalAlertSuccess" tabindex=""><i class="zmdi zmdi-download"></i>
                                    DESCARGAR DATOS DEL PROVEEDOR
                                </button>
                            </div>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">Aquí podrás encontrar la lista de todos los
                            contratos del proveedor
                            <strong class="principal-font-semibold">CONSTRUCCIONES MARRO SA DE CV</strong></p>
                        <div class="m-t-50">
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
                                <div class="m-t-20 float-left">
                                    <span class="tag-title">Filtros:</span>
                                    <div class="tag">
                      <span class="">
                        DIRECCIÓN DE OBRAS PÚBLICAS MUNICIPALES
                      </span>
                                        <button>
                                            <i class="zmdi zmdi-close"></i>
                                        </button>
                                    </div>
                                    <div class="tag">
                      <span class="">
                        Béisbol
                      </span>
                                        <button>
                                            <i class="zmdi zmdi-close"></i>
                                        </button>
                                    </div>
                                    <div class="tag">
                      <span class="">
                        Béisbol
                      </span>
                                        <button>
                                            <i class="zmdi zmdi-close"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Cantidades -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color accent">
                            <!--<span>$57,837,576.28</span>-->
                            <span>{{totals.total | currency}}</span>
                            <label>MONTO TOTAL</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color red">
                            <!--<span>$23,980,030.81</span>-->
                            <span>{{totals.public | currency}}</span>
                            <label>MONTO TOTAL DE CONTRATOS POR LICITACIÓN PÚBLICA</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color yellow">
                            <!--<span>$2,398,871.43</span>-->
                            <span>{{totals.invitation | currency}}</span>
                            <label>MONTO TOTAL DE CONTRATOS POR INVITACIÓN</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color green">
                            <!--<span>$31,458,674.04</span>-->
                            <span>{{totals.noBid | currency}}</span>
                            <label>MONTO TOTAL DE CONTRATOS POR ADJUDICACIÓN DIRECTA</label>
                        </div>
                    </div>
                </div>


                <div class="card">
                    <div class="floating-title-panel small">
                        <h1>Contratos</h1>
                        <p class="d-block f-14 c-plain_text principal-font-regular m-b-40">Se han registrado un total de {{totals.count}}
                            contratos para este Proveedor. <br/> Para ver
                            más información de un contrato en específico, haz clic en la opción “Expandir”.</p>

                        <div id="accordion" class="collapsible-status">
                            <div class="collapsible-content">
                                <div class="col-12 collapsible-header success" id="headingOne">
                                    <div class="info-container">
                                        <h4>{{public.length}}</h4>
                                        <h2>CONTRATO POR LICITACIÓN PÚBLICA</h2>
                                    </div>
                                    <div class="">
                                        <button class="collapsed btn-accordion" data-toggle="collapse"
                                                data-target="#collapseOne" aria-expanded="true"
                                                aria-controls="collapseOne">
                                            <div class="expand">
                                                <i class="zmdi zmdi-chevron-down"></i>
                                                Expandir

                                            </div>
                                            <div class="collapse">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                Colapsar

                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div id="collapseOne" class="collapse collapsible-body" aria-labelledby="headingOne"
                                     data-parent="#accordion">
                                    <div class="">

                                        <!-- CONTENIDO EXPANDIBLE -->
                                        <div class="row">
                                            <div class="col-12 col-md-4 col-lg-3" v-for="contract in public">
                                                <div class="card-background">
                                                    <p>{{contract.servicesDescription}}</p>
                                                    <div>
                                                    <span>
                                                        <label>{{contract.totalOrMaxAmount | currency}}</label>
                                                        <small>{{contract.informationDate}}</small>
                                                    </span>
                                                        <router-link :to="'/contracts/' + contract._id" class="btn-stroke xs button-primary">
                                                            Ver más
                                                        </router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="collapsible-content">
                                <div class="col-12 collapsible-header warning" id="headingTwo">
                                    <div class="info-container">
                                        <h4>{{invitation.length}}</h4>
                                        <h2>CONTRATO POR INVITACIÓN</h2>
                                    </div>
                                    <div class="">
                                        <button class="collapsed btn-accordion" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="true"
                                                aria-controls="collapseTwo">
                                            <div class="expand">
                                                <i class="zmdi zmdi-chevron-down"></i>
                                                Expandir

                                            </div>
                                            <div class="collapse">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                Colapsar

                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div id="collapseTwo" class="collapse collapsible-body" aria-labelledby="headingTwo"
                                     data-parent="#accordion">
                                    <div class="">

                                        <!-- CONTENIDO EXPANDIBLE -->
                                        <div class="row">
                                            <div class="col-12 col-md-4 col-lg-3" v-for="contract in invitation">
                                                <div class="card-background">
                                                    <p>{{contract.servicesDescription}}</p>
                                                    <div>
                                                    <span>
                                                        <label>{{contract.totalOrMaxAmount | currency}}</label>
                                                        <small>{{contract.informationDate}}</small>
                                                    </span>
                                                        <router-link :to="'/contracts/' + contract._id" class="btn-stroke xs button-primary">
                                                            Ver más
                                                        </router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div class="collapsible-content">
                                <div class="col-12 collapsible-header error" id="headingThree">
                                    <div class="info-container">
                                        <h4>{{noBid.length}}</h4>
                                        <h2>CONTRATOS POR ADJUDICACIÓN DIRECTA</h2>
                                    </div>
                                    <div class="">
                                        <button class="collapsed btn-accordion" data-toggle="collapse"
                                                data-target="#collapseThree" aria-expanded="true"
                                                aria-controls="collapseThree">
                                            <div class="expand">
                                                <i class="zmdi zmdi-chevron-down"></i>
                                                Expandir

                                            </div>
                                            <div class="collapse">
                                                <i class="zmdi zmdi-chevron-up"></i>
                                                Colapsar

                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div id="collapseThree" class="collapse collapsible-body"
                                     aria-labelledby="headingThree" data-parent="#accordion">

                                    <!-- CONTENIDO EXPANDIBLE -->
                                    <div class="row">
                                        <div class="col-12 col-md-4 col-lg-3" v-for="contract in noBid">
                                            <div class="card-background">
                                                <p>{{contract.servicesDescription}}</p>
                                                <div>
                                                    <span>
                                                        <label>{{contract.totalOrMaxAmount | currency}}</label>
                                                        <small>{{contract.informationDate}}</small>
                                                    </span>
                                                    <router-link :to="'/contracts/' + contract._id" class="btn-stroke xs button-primary">
                                                        Ver más
                                                    </router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>


                    </div>
                </div>


                <!-- ADITIONAL INFO ONLY -->
                <p class="f-12 c-plain_text principal-font-regular">
                    Todos los datos que se presentan en este informe son única y exclusivamente obtenidos de:
                    http://www.municipiochihuahua.gob.mx/Transparencia
                    <br>
                    Última actualización: <strong>27 de noviembre de 2018</strong>
                </p>

                <more-info></more-info>

            </div>
        </section>
    </div>
</template>

<style>

</style>

<script>
    import MoreInfo from '@/components/general/MoreInfo';
    
    import {mapState} from 'vuex';
    
    const storeModule = 'publicSuppliers';
    
    export default {
        data() {
            return {
                contratos: [
                    {
                        titulo: "OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE…",
                        cantidad: "$26,327,329.17",
                        fecha: "20 de octubre de 2017"
                    },
                    {
                        titulo: "RECONSTRUCCIÓN DE COLECTOR DE AGUAS RESIDUALES, UBICADO EN LA COLONIA CDP",
                        cantidad: "$1,799,989.08",
                        fecha: "23 de abril de 2018"
                    },
                    {
                        titulo: "CANALIZACIÓN DE ARROYO MAGALLANES,  DE C. CARMEN SERDAN A C. CAMILO TORRES DE LA COL…",
                        cantidad: "$1,180,547.00",
                        fecha: "20 de marzo de 2017"
                    },
                    {
                        titulo: "CONSTRUCCIÓN DE TECHUMBRE METÁLICA TIPO DOMO 17.50 X 22.25 M.  EN ESCUELA PRIMARIA FEDERAL…",
                        cantidad: "$787,340.64",
                        fecha: "14 de septiembre de 2017"
                    },
                    {
                        titulo: "TRABAJOS EN COMANDANCIA NORTE  DE LA DIRECCIÓN DE SEGURIDAD PUBLICA MUNICIPAL.",
                        cantidad: "$746,191.48",
                        fecha: "8 de agosto de 2018"
                    },
                    {
                        titulo: "CANALIZACIÓN DE ARROYO MAGALLANES,  DE C. CARMEN SERDAN A C. CAMILO TORRES DE LA COL…",
                        cantidad: "$415,054.032",
                        fecha: "31 de julio de 2018"
                    },
                    {
                        titulo: "OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE…",
                        cantidad: "$202,222.64",
                        fecha: "25 de junio de 2017"
                    }
                ]
            }
        },
        components: {
            MoreInfo
        },
        computed: {
            ...mapState({
                detail: state => state[storeModule].detail
            }),
            supplier() {
                return this.detail.supplier || {};
            },
            totals() {
                return this.detail.totals || {};
            },
            public() {
                return this.detail.public || [];
            },
            invitation() {
                return this.detail.invitation || [];
            },
            noBid() {
                return this.detail.noBid || [];
            },
        },
        methods: {},
        created() {
        },
        mounted() {
            let supplierId = this.$route.params.id;
            console.log('this.$route.params.id', supplierId);
            this.$store.dispatch('publicSuppliers/LOAD_SUPPLIER_DETAIL', supplierId);
        }
    }
</script>
