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
                    <template v-if="currentDataLoadInfo && currentDataLoadInfo.uploadedBy">
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
            <p>Vistas del monitor</p>

            <div class="row">
                <img src="https://i.ibb.co/jZkhGVw/Screen-Shot-2019-03-29-at-2-15-26-PM.png"
                        alt="Screen-Shot-2019-03-29-at-2-15-26-PM" border="0" style="float:left;width:50%;height:100%;object-fit:cover;">
                <img src="https://i.ibb.co/6B5kCTm/Screen-Shot-2019-03-29-at-2-15-31-PM.png"
                     alt="Screen-Shot-2019-03-29-at-2-15-31-PM" border="0" style="float:left;width:50%;height:100%;object-fit:cover;">
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
    import catalog from '@/mixins/catalog.mixin';
    import AdminMainSection from '@/components/admin/AdminMainSection';
    
    import {mapState} from 'vuex';

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
                currentDataLoadInfo: state => state.dataLoad.dataLoadInfo
            })
        },
        components: {
            AdminMainSection
        },
        methods: {},
        created() {
        },
        mounted() {
            this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO');
            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
