<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <FloatingTitle title="data-load.title-strong" description="data-load.title.description"/>
            <div class="row m-0 w-100">
                <div class="col-12 col-md-8 di-flex" v-show="!showDetails">
                    <div class="card w-100">
                        <div class="floating-text m-b-30">
                            <h1>Resultados de la validación <strong class="m-l-10 f-12 c-accent">(datos2018.xls)</strong>
                            </h1>
                            <p class="m-b-30">Para corregir los registros encontrados con errores, descarga
                                el archivo generado, realiza las correcciones necesarias y súbelo
                                nuevamente.</p>
                            <button class="btn-stroke button-accent b-shadow-none" @click="toggleDetails()">
                                Mostrar detalles
                            </button>
                        </div>

                        <div class="details-list">
                            <ul>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newContractsCount}}</span>
                                    Nuevos Contratos
                                </li>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newSuppliersCount}}</span>
                                    Nuevos Proveedores
                                </li>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newAdministrativeUnitsCount}}</span>
                                    Nuevas Unidades
                                    Administrativas
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedContractsCount}}</span>
                                    Contratos omitidos (duplicados)
                                </li>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedSuppliersCount}}</span>
                                    Proveedores omitidos (duplicados)
                                </li>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedAdministrativeUnitsCount}}</span>
                                    Unidades Administrativas omitidas (duplicados)
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="c-error"><i class="zmdi zmdi-alert-triangle"></i> {{current.summary.errorsCount}}</span>
                                    Registros con errores
                                </li>
                            </ul>
                        </div>

                        <button type="" class="btn-outline c-error" @click="cancel">Cancelar procesamiento</button>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="card">
                        <div class="note-transparent error">
                            <i class="zmdi zmdi-alert-triangle"></i>
                            <p>Hay errores en uno o más registros. Por favor, <strong>descarga el
                                archivo</strong> con validaciones y realiza las correcciones necesarias.</p>
                        </div>
                        <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                            Descargar archivo con validaciones</p>
                        <button class="btn-stroke button-accent m-0-auto b-shadow-none">DESCARGAR
                            VALIDACIONES
                        </button>
                    </div>
                    <div class="card">
                        <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                            Cargar archivo con correcciones</p>
                        <button class="btn-stroke button-accent m-0-auto b-shadow-none">CARGAR
                            CORRECCIONES
                        </button>
                    </div>
                    <div class="card">
                        <button class="btn-outline c-warning m-0-auto">IGNORAR ERRORES Y CONTINUAR</button>
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
    import BackButton from '@/components/general/BackButton';
    import FloatingTitle from '@/components/general/FloatingTitle';
    
    import {mapState} from 'vuex';
    import { bus } from '@/main';
    
    export default {
        
        data () {
            return {
                showDetails: false
            }
        },
        components: {
            AdminMainSection,
            BackButton,
            FloatingTitle
        },
        computed: {
            current () {
                return this.dataLoadInfo.current;
            },
            ...mapState({
                dataLoadInfo: state => state.dataLoad.dataLoadInfo,
                dataLoad: state => state.dataLoad.dataLoad
            })
        },
        methods: {
            toggleDetails () {
                this.showDetails = !this.showDetails;
            },

            cancel () {
                this.$store.dispatch('dataLoad/CANCEL_CURRENT_DATA_LOAD');
            },
            canceled () {
                this.$router.push('/admin/data-load');
            }
        },
        created() {
        },
        mounted(){
            bus.$on('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', ({dataLoadInfo})=>{
                //Current was canceled, confirmed, or otherwise not available, so we redirect to the non-current view
                if (!dataLoadInfo.current) {
                    this.canceled();
                }
            });
            
            this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO');
        }
    }
</script>