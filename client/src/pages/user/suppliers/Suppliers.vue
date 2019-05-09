<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">
                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <router-link to="/" class="btn-outline text-unset">
                        <i class="zmdi zmdi-long-arrow-left"></i> Ir a Inicio </a>
                    </router-link>
                    <router-link to="/contracts" class="btn-outline text-unset m-auto-left">
                        Ir a Contratos <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i>
                    </router-link>
                </div>

                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1 m-t-0>
                                Proveedores
                            </h1>
                            <div class="side-right d-flex">
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>
                                <!--<a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i-->
                                        <!--class="zmdi zmdi-download"></i> DESCARGAR DATOS DE PROVEEDORES</a>-->

                                <div class="dropdown p-l-10">
                                    <button class="btn-raised button-accent" type="button" id="dropdownDownloadOptions"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="zmdi zmdi-download"></i> DESCARGAR DATOS DE PROVEEDORES
                                    </button>
                                    <div class="dropdown-menu dropdown-options dropdown-menu-right"
                                         aria-labelledby="dropdownDownloadOptions">
                                        <span>Descargar datos con formato:</span>
                                        <div class="container-dropdown">
                                            <a class="dropdown-item" href="downloadPdfUrl" target="_blank">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-pdf.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" :href="downloadXlsUrl" target="_blank">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-xls.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" href="downloadJsonUrl" target="_blank">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-json.svg"
                                                     alt="Empty"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!--<div class="row m-b-50">-->
                            <!--<h1 class="f-20 m-t-0 m-b-10 col-12">Dropdown</h1>-->
                            <!--<div class="dropdown col-12">-->
                                <!--<button class="btn-raised button-accent" type="button" id="dropdownOptions"-->
                                        <!--data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
                                    <!--Dropdown FILES-->
                                <!--</button>-->
                                <!--<div class="dropdown-menu dropdown-options dropdown-menu-right"-->
                                     <!--aria-labelledby="dropdownOptions">-->
                                    <!--<span>Title</span>-->
                                    <!--<div class="container-dropdown">-->
                                        <!--<a class="dropdown-item" href="#">-->
                                            <!--<img class="img-fluid" src="@/assets/images/Illustrations/icon-file-pdf.svg"-->
                                                 <!--alt="Empty"/>-->
                                        <!--</a>-->
                                        <!--<a class="dropdown-item" href="#">-->
                                            <!--<img class="img-fluid" src="@/assets/images/Illustrations/icon-file-xls.svg"-->
                                                 <!--alt="Empty"/>-->
                                        <!--</a>-->
                                        <!--<a class="dropdown-item" href="#">-->
                                            <!--<img class="img-fluid" src="@/assets/images/Illustrations/icon-file-json.svg"-->
                                                 <!--alt="Empty"/>-->
                                        <!--</a>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->

                        <p class="f-14 c-plain_text principal-font-regular">Aquí podrás encontrar la lista de todos los
                            proveedores que han sido contratados por el
                            <strong class="principal-font-semibold">Municipio de Chihuahua</strong></p>
                        <div class="m-t-50 row">
                            <div class="filter col-md-4">
                                <div class="filter-container">
                                    <input class="input-search" type="text" name="" value=""
                                           placeholder="Escribe el nombre del proveedor"/>
                                </div>
                                <button class="filter-btn" type="button" name="button">Buscar</button>
                            </div>
                            <div class="filter-box col-md-8">
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

                        <div class="row">
                            <div class="m-t-20 float-left col-md-12">
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

                <!-- Cantidades -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color accent">
                            <span>{{totals.totalCount}}</span>
                            <label>CONTRATOS EN TOTAL</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color red">
                            <span>{{totals.publicCount}}</span>
                            <label>CONTRATOS POR LICITACIÓN PÚBLICA</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color yellow">
                            <span>{{totals.invitationCount}}</span>
                            <label>CONTRATOS POR INVITACIÓN</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color green">
                            <span>{{totals.noBidCount}}</span>
                            <label>CONTRATOS POR ADJUDICACIÓN DIRECTA</label>
                        </div>
                    </div>
                </div>

                <!-- Tabla de proveedores -->
                <div class="row">
                    <div class="col-12">
                        <div class="card regular-table">
                            <div class="default-scrollbar ">
                                <table class="table form-table m-b-0">
                                    <thead>
                                    <tr>
                                        <th class="">NOMBRE DEL PROVEEDOR</th>
                                        <th class="text-align-r">LICITACIÓN PÚBLICA</th>
                                        <th class="text-align-r">POR INVITACIÓN</th>
                                        <th class="text-align-r">ADJ. DIRECTA</th>
                                        <th class="text-align-r">MONTO TOTAL<i
                                                class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                        <th class="text-align-c">OPCIONES</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="supplier in suppliers">
                                        <td class="">{{supplier.name}}</td>
                                        <td class="text-align-r">{{supplier.public | currency}}</td>
                                        <td class="text-align-r">{{supplier.invitation | currency}}</td>
                                        <td class="text-align-r">{{supplier.noBid | currency}}</td>
                                        <td class="text-align-r c-accent">{{supplier.total | currency}}</td>
                                        <td class="text-align-r">
                                            <router-link to="/supplier" class="btn-stroke button-primary table-btn-stroke">
                                                Ver más
                                            </router-link>
                                        </td>
                                    </tr>
                                    <tr class="bgm-cards">
                                        <td class="p-t-15 p-b-10 f-bold">TOTAL</td>
                                        <td class="text-align-r p-t-15 p-b-15">{{totals.public | currency}}</td>
                                        <td class="text-align-r p-t-15 p-b-15">{{totals.invitation | currency}}</td>
                                        <td class="text-align-r p-t-15 p-b-15">{{totals.noBid | currency}}</td>
                                        <td class="text-align-r p-t-15 p-b-15 c-accent">{{totals.total | currency}}</td>
                                        <td class="text-align-r p-t-15 p-b-15"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Pagination :store-module="storeModule" :changePageAction="changePageAction"/>

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

<style scoped>
</style>

<script>
    import MoreInfo from '@/components/general/MoreInfo';
    import Pagination from '@/components/catalogs/Pagination';
    
    import {mapState} from 'vuex';
    
    import baseApi from '@/api/base.api';
    
    
    const storeModule = 'publicSuppliers';
    const apiNamespace = 'suppliers';

    export default {
        data() {
            return {
                storeModule: storeModule,
                changePageAction: 'LOAD_SUPPLIERS',
                baseApi: baseApi,
            }
        },
        components: {
            MoreInfo,
            Pagination
        },
        computed: {
            ...mapState({
                suppliers: state => state[storeModule].suppliers,
                totals: state => state[storeModule].totals
            }),
            downloadPdfUrl () {
                return `${baseApi.baseUrl}/public-api/${apiNamespace}/download/pdf`;
            },
            downloadXlsUrl () {
                return `${baseApi.baseUrl}/public-api/${apiNamespace}/download/xls`;
            },
            downloadJsonUrl () {
                return `${baseApi.baseUrl}/public-api/${apiNamespace}/download/xls`;
            }
        },
        methods: {
            download (format) {
                this.$store.dispatch('publicSuppliers/DOWNLOAD', format);
            }
        },
        mounted() {
            this.$store.dispatch('publicSuppliers/LOAD_SUPPLIERS');
        },
        created() {
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();

                $('#toast-danger').click(function () {
                    tShow("Hubo un error en el proceso. Intenta de nuevo", 'danger');
                });
                $('#toast-info').click(function () {
                    tShow("Se informa del proceso por eso es un info", 'info');
                });
                $('#toast-warning').click(function () {
                    tShow("Complete todos los campos requeridos", 'alert');
                });
                $('#toast-success').click(function () {
                    tShow("Se ha completado el proceso correctamente sadasda adadasd sda dasdasdas dasda dasdasd ad adaspidjdj asoijdas", 'success');
                });
            });
        },
    }
</script>
