<template>
    <div>
        <AdminMainSection>
            <!--<BackButton/>-->
            <div class="col-12 m-t-40">
                <div class="floating-title-dash">
                    <div class="side-left">
                        <h1>¡Hola, Cesar!</h1>
                        <label>LUNES 03 DE DICIEMBRE DEL 2018</label>
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
                            <span>20876</span>
                        </div>
                        <div class="w-30">
                            <i class="zmdi zmdi-eye"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="panel-info">
                        <div class="w-70">
                            <label>Contratos</label>
                            <span>1678</span>
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
                            <span>240</span>
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
                            <span>23</span>
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
                            <span>7</span>
                        </div>
                        <div class="w-30">
                            <i class="zmdi zmdi-eye"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!--<p>Vistas del monitor</p>-->
            <div class="switcher-tabs">
                <p>Vistas del monitor</p>
                <div class="tab">
                    <input checked="" class="checkboxtab" id="checkbox1" v-on:click="changeFilterVisitasMonitor('MONTHS')" name="checkbox-tabs-group"
                           type="radio">
                    <label class="btn waves-effect bordered-first" for="checkbox1">Mensual</label>
                    <!--<div class="content"> Content Switch 1</div>-->
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
            <div class="row">
                <VisitasMonitorChart></VisitasMonitorChart>
                <VisitasRutasChart></VisitasRutasChart>
                <!--<img src="https://i.ibb.co/jZkhGVw/Screen-Shot-2019-03-29-at-2-15-26-PM.png"-->
                <!--alt="Screen-Shot-2019-03-29-at-2-15-26-PM" border="0" style="float:left;width:50%;height:100%;object-fit:cover;">-->
                <!--<img src="https://i.ibb.co/6B5kCTm/Screen-Shot-2019-03-29-at-2-15-31-PM.png"-->
                <!--alt="Screen-Shot-2019-03-29-at-2-15-31-PM" border="0" style="float:left;width:50%;height:100%;object-fit:cover;">-->
            </div>


            <div class="row m-b-50 m-t-80">
                <div class="col-12 col-md-4">
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
                <div class="col-12 col-md-4">
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
                <div class="col-12 col-md-4">
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
            }),
            permissions () {
                return this.$session.get('permissions') || [];
            },
            hasAccessToDataLoad() {
                return this.permissions && this.permissions.includes('CONTRACTS');
            }
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
            }
        },
        created() {
        },
        mounted() {
            if (this.hasAccessToDataLoad) {
                this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO');
            }
            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
