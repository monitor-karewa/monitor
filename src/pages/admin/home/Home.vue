<template>
    <div>
        <AdminMainSection>
            <div class="row">
                <div class="col-12 m-t-40">
                    <div class="floating-title-dash">
                        <div class="side-left">
                            <h1>¡Hola, {{currentUser.fullName}}!</h1>
                            <label>{{actualDateFormat}}</label>
                        </div>
                        <template v-if="currentDataLoadInfo && currentDataLoadInfo.uploadedBy && hasAccessToDataLoad">
                            <div class="side-right">
                                <p>Tienes una carga de <strong>datos pendiente</strong></p>
                                <small>Comenzada por: <strong>{{currentDataLoadInfo.uploadedBy}}</strong></small>
                            </div>
                            <router-link to="admin/data-load/current" class="btn-raised button-accent">Continuar</router-link>
                        </template>
                    </div>
                </div>
                <div class="container-panel-info m-b-30">
                    <div>
                        <div class="panel-info">
                            <div class="w-70">
                                <label>Vistas</label>
                                <span class="min-h-20px">{{currentGeneralInfoInfo.visitsCount}}</span>
                            </div>
                            <div class="w-30">
                                <i class="zmdi zmdi-eye"></i>
                            </div>
                        </div>
                    </div>
                    <div v-if="hasAccess('CONTRACTS')">
                        <div class="panel-info">
                            <div class="w-70">
                                <label>Contratos</label>
                                <span class="min-h-20px">{{currentGeneralInfoInfo.contractsCount}}</span>
                            </div>
                            <div class="w-30">
                                <i class="zmdi zmdi-eye"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="panel-info">
                            <div class="w-70">
                                <label>Proveedores</label>
                                <span class="min-h-20px">{{currentGeneralInfoInfo.proveedoresCount}}</span>
                            </div>
                            <div class="w-30">
                                <i class="zmdi zmdi-eye"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="panel-info">
                            <div class="w-70">
                                <label>U. Administrativas</label>
                                <span class="min-h-20px">{{currentGeneralInfoInfo.unidadesCount}}</span>
                            </div>
                            <div class="w-30">
                                <i class="zmdi zmdi-eye"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="panel-info">
                            <div class="w-70">
                                <label>Cálculos</label>
                                <span class="min-h-20px">{{currentGeneralInfoInfo.calculosCount}}</span>
                            </div>
                            <div class="w-30">
                                <i class="zmdi zmdi-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-md-12 col-lg-6 m-b-50">
                    <div class="floating-title-table">
                        <h2>Visitas al monitor</h2>
                    </div>
                    <div class="card min-h-520px p-b-20 h-100">
                        <div class="switcher-tabs">
                            <div class="tab">
                                <input checked="" class="checkboxtab" id="checkbox1" v-on:click="changeFilterVisitasMonitor('MONTHS')" name="checkbox-tabs-group"
                                       type="radio">
                                <label class="btn waves-effect bordered-first" for="checkbox1">Mensual</label>
                                <div class="content">
                                    <VisitasMonitorChart></VisitasMonitorChart>
                                </div>
                            </div>
                            <div class="tab">
                                <input class="checkboxtab" id="checkbox2" name="checkbox-tabs-group" v-on:click="changeFilterVisitasMonitor('QUARTER')" type="radio">
                                <label class="btn waves-effect" for="checkbox2">Trimestres</label>
                                <!--<div class="content"> Content Switch 2</div>-->
                            </div>
                            <div class="tab">
                                <input class="checkboxtab" id="checkbox3" name="checkbox-tabs-group" v-on:click="changeFilterVisitasMonitor('YEAR')" type="radio">
                                <label class="btn waves-effect bordered-last" for="checkbox3">Año</label>
                                <!--<div class="content"> Content Switch 3</div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-12 col-lg-6 m-b-50">
                    <div class="floating-title-table">
                        <h2>Información más consultada</h2>
                    </div>
                    <div class="card min-h-520px p-b-20 h-100 donut-graph-admin">
                        <VisitasRutasChart></VisitasRutasChart>
                    </div>
                </div>
            </div>


            <div class="row m-b-50 m-t-80">
                <div class="col-12 col-md-4 d-grid">
                    <div class="card-img-corner">
                        <h1>Configuración</h1>
                        <p>Aquí puedes configurar tu logo, colores, descripción de tu organización…</p>
                        <!--<a href="#" class="link-to" tabindex="">Configurar aquí</a>-->
                        <router-link to="/admin/settings" class="link-to">
                            Configurar aquí
                        </router-link>
                        <img class="img-fluid" src="@/assets/images/Cards/corner-setting.svg" alt=""/>
                    </div>
                </div>
                <div class="col-12 col-md-4 d-grid" v-if="hasAccess('CONTRACTS')">
                    <div class="card-img-corner">
                        <h1>Contratos</h1>
                        <p>Aquí puedes crear nuevos contratos o editarlos …</p>
                        <!--<a href="#" class="link-to" tabindex="">Configurar aquí</a>-->
                        <router-link to="/admin/contracts" class="link-to">
                            Configurar aquí
                        </router-link>
                        <img class="img-fluid" src="@/assets/images/Cards/corner-document.svg" alt=""/>
                    </div>
                </div>
                <div class="col-12 col-md-4 d-grid">
                    <div class="card-img-corner">
                        <h1>Registra tus proveedores</h1>
                        <p>Aquí puedes registrar tus nuevos proveedores o editarlos…</p>
                        <!--<a href="#" class="link-to" tabindex="">Configurar aquí</a>-->
                        <router-link to="/admin/suppliers" class="link-to">
                            Configurar aquí
                        </router-link>
                        <img class="img-fluid" src="@/assets/images/Cards/corner-account.svg" alt="" />
                    </div>
                </div>
            </div>

        </AdminMainSection>
    </div>
</template>

<style>
</style>

<script>
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import VisitasMonitorChart from '@/components/admin/VisitasMonitorChart';

    import {mapState} from 'vuex';
    import VisitasRutasChart from "../../../components/admin/VisitasRutasChart";

    //TODO Remove or change initialization because THIS IS NOT A CATALOG ()
//    let baseCatalog = catalog.configure({
//        storeModule: 'DataLoad',
//        docName: 'dataLoad.DataLoad'
//    });

    export default {
//        mixins: [baseCatalog],
        data() {
            return {}
        },
        computed: {
            ...mapState({
                currentDataLoadInfo: state => state.dataLoad.dataLoadInfo.current,
                currentGeneralInfoInfo: state => state.adminHomeStore,
                currentUser: state => state.currentUser
            }),
            permissions () {
                return this.$session.get('permissions') || [];
            },
            hasAccessToDataLoad() {
                return this.permissions && this.permissions.includes('CONTRACTS');
            },
            actualDateFormat() {
                let actualDate = new Date();
                let month = actualDate.getMonth() + 1;
                let year = actualDate.getFullYear();
                let numberDay = actualDate.getDate();
                let days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                let dayName = days[actualDate.getDay()];
                return dayName + " " + numberDay + " de " + this.getNameOfMonth(month) + " del " + year;
            },
        },
        components: {
            VisitasRutasChart,
            AdminMainSection,
            VisitasMonitorChart
        },
        methods: {
            changeFilterVisitasMonitor(value){
                let tempParams = {
                    type:value
                }
                this.$store.dispatch(`visitasMonitorChart/getInfoForChart`, tempParams);
            },
            getNameOfMonth(value) {
                switch (value) {
                    case 1:
                        return "Enero";
                    case 2:
                        return "Febrero";
                    case 3:
                        return "Marzo";
                    case 4:
                        return "Abril";
                    case 5:
                        return "Mayo";
                    case 6:
                        return "Junio";
                    case 7:
                        return "Julio";
                    case 8:
                        return "Agosto";
                    case 9:
                        return "Septiembre";
                    case 10:
                        return "Octubre";
                    case 11:
                        return "Noviembre";
                    case 12:
                        return "Diciembre";
                }

            },
            hasAccess (permission) {
                if (!permission) {
                    return true;
                }

                return this.permissions && this.permissions.includes(permission);
            },
        },
        created() {
        },
        mounted() {
            if (this.hasAccessToDataLoad) {
                this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO', true);
                this.$store.dispatch('adminHomeStore/LOAD_GENERAL_INFO_DASHBOARD');
            }
            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
