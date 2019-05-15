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
                                <a type="button" @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir </i>
                                </a>
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
                                            <a class="dropdown-item" @click.prevent="downloadFile('pdf')" target="_blank">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-pdf.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" @click.prevent="downloadFile('xls')">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-xls.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" @click.prevent="downloadFile('json')">
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


                        <!--filters-->
                        <PublicFilter
                                :storeModule="storeModule"
                                :administrativeUnits="adminstrativeUnitsForFilter"
                                :fiscalYears="fiscalYears"
                                :trimonths="trimonths"
                                :administrationPeriods="administrationPeriods"
                                :procedureTypes="procedureTypes"
                        >

                        </PublicFilter>


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
                                            <router-link :to="'/suppliers/' + supplier._id" class="btn-stroke button-primary table-btn-stroke">
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
    import PublicFilter from '@/components/filters/PublicFilter.vue';
    
    
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
            Pagination,
            PublicFilter
        },
        computed: {
            ...mapState({
                suppliers: state => state[storeModule].suppliers,
                totals: state => state[storeModule].totals,
                adminstrativeUnitsForFilter: state => state[storeModule].adminstrativeUnitsForFilter,
                fiscalYears: state => state[storeModule].fiscalYears,
                trimonths: state => state[storeModule].trimonths,
                administrationPeriods: state => state[storeModule].administrationPeriods,
                procedureTypes: state => state[storeModule].procedureTypes,
            })
        },
        methods: {

            downloadFile (format) {
                console.log("format", format);
                this.$store.dispatch('publicSuppliers/downloadFile', {format});
            },
            copyUrlToClipBoard(){
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value =  window.location.href;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                tShow('Se ha copiado el enlace correctamente', 'info');

            }
        },
        mounted() {

        },
        beforeMount() {
            this.$store.dispatch('publicSuppliers/LOAD_SUPPLIERS');
            //for the filters
            this.$store.dispatch(`${storeModule}/getAdministrativeUnitsForFilter`);
            this.$store.dispatch(`${storeModule}/getFiscalYears`);
            this.$store.dispatch(`${storeModule}/getTrimonths`);
            this.$store.dispatch(`${storeModule}/getAdministrationPeriods`);
            this.$store.dispatch(`${storeModule}/getProcedureTypes`);
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
