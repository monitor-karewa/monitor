<template>
    <div>
        <AdminMainSection>
            <BackButton :label="showDetails ? 'data-load.back.button'  : ''" />
            <FloatingTitle title="data-load.title-strong" description="data-load.title.current-description" :descriptionProp="current.fileName"/>
            <CardUploading v-show="uploading" :loading="uploading" :cancel="cancelUpload"/>
            <div class="row m-0 w-100" v-show="!uploading">
                <div class="col-12 col-md-8 di-flex" v-if="!showDetails">
                    <div class="card w-100">
                        <div class="floating-text m-b-30">
                            <h1>Resultados de la validación <strong class="m-l-10 f-12 c-accent">{{`(${current.fileName})`}}</strong>
                            </h1>
                            <p class="m-b-30">Para corregir los registros encontrados con errores, descarga
                                el archivo generado, realiza las correcciones necesarias y súbelo
                                nuevamente.</p>
                            <button class="btn-stroke button-accent b-shadow-none" @click="toggleShowDetails()">
                                Mostrar detalles
                            </button>
                        </div>

                        <div class="details-list">
                            <ul>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newContractsCount || 0}}</span>
                                    Nuevos Contratos
                                </li>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newSuppliersCount || 0}}</span>
                                    Nuevos Proveedores
                                </li>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newAdministrativeUnitsCount || 0}}</span>
                                    Nuevas Unidades
                                    Administrativas
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedContractsCount || 0}}</span>
                                    Contratos omitidos (duplicados)
                                </li>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedSuppliersCount || 0}}</span>
                                    Proveedores omitidos (duplicados)
                                </li>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedAdministrativeUnitsCount || 0}}</span>
                                    Unidades Administrativas omitidas (duplicados)
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="c-error"><i class="zmdi zmdi-alert-triangle"></i> {{current.summary.errorsCount || 0}}</span>
                                    Registros con errores
                                </li>
                            </ul>
                        </div>

                        <button type="" class="btn-outline c-error" @click="cancel">Cancelar procesamiento</button>
                    </div>
                </div>

                <div class="col-12 col-md-12" v-if="showDetails">
                    <div class="card w-100">
                        <div class="card-header">


                            <TableHeaderSearch :store-module="storeModule" :action-name="filterActionName"/>
                            <TableHeaderButtonsWrapper>
                                <!--<TableHeaderButton :store-module="storeModule"/>-->
                                <button class="btn-stroke button-accent" @click.prevent="toggleHideDetails">Ocultar detalles</button>
                                <TableHeaderFilters :columns="filterRows" :hideTitle="true" :hideShowAllToggle="true"/>
                            </TableHeaderButtonsWrapper>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <div v-show="filtering" class="col-xs-12 m-40">
                                    <div class="d-flex justify-content-center">
                                        <div class="spinner-border" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                <table class="table table-hover form-table" v-show="!filtering">
                                    <thead>
                                    <tr>
                                        <!--<th>Proveedor<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <!--<th>Unidad Administrativa Solicitante<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <!--<th class="text-align-r">Monto Total<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <!--<th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <th></th>
                                        <th></th>
                                        <th>Tipo de procedimiento</th>
                                        <th>Materia</th>
                                        <th>Administración</th>
                                        <th>Ejercicio</th>
                                        <th>Periodo que se reporta </th>
                                        <th>ID</th>
                                        <th>Partida</th>
                                        <th>Estado del procedimiento</th>
                                        <th>Hipervínculo a la convocatoria o invitaciones</th>
                                        <th>Fecha de la convocatoria o invitación</th>
                                        <th>Descripción de las obras, bienes o servicios</th>
                                        <th>Fecha en la que se celebró la junta de aclaraciones</th>
                                        <th>Hipervínculo al fallo de Junta de Aclaraciones</th>
                                        <th>Hipervínculo al documento de la Presentación de Propuestas</th>
                                        <th>Nombre completo del o los contratista(s) elegidos</th>
                                        <th>RFC</th>
                                        <th>Unidad administrativa convocante</th>
                                        <th>Unidad administrativa solicitante</th>
                                        <th>Centralizada / Descentralizada</th>
                                        <th>Número identificador del contrato</th>
                                        <th>Fecha del contrato</th>
                                        <th>Monto total del contrato con impuestos incluidos</th>
                                        <th>Monto mínimo, en su caso</th>
                                        <th>Monto máximo, en su caso</th>
                                        <th>Monto total o Monto máximo, en su caso</th>
                                        <th>Hipervínculo al documento del contrato y anexos</th>
                                        <th>Área responsable de la información</th>
                                        <th>Fecha de actualización</th>
                                        <th>Notas</th>
                                        <th>Notas Monitor Karewa</th>
                                        <th>Fecha de obtención de los datos</th>
                                        <th>Adjudicaciones Directas que exceden el límite</th>
                                        <th>Monto que excede el límite de la Adjudicación Directa</th>
                                        <th>No se llevaron a cabo procedimientos</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <!--<tr class="height-60" v-for="(rowInfo, rowInfoIndex) in filteredDataLoad" v-if="isRowInfoVisible(rowInfo)">-->
                                    <tr class="height-60" v-for="(dataLoadDetail, dataLoadDetailIndex) in paginatedDataLoad" v-if="isRowInfoVisible(dataLoadDetail.data)" :key="dataLoadDetail._id">
                                        <td>{{dataLoadDetail.rowIndex}}</td>
                                        <TableTdDataLoadStatus :data="dataLoadDetail.data"></TableTdDataLoadStatus>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="procedureType"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="category"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="administration"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="fiscalYear"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="period"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="contractId"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="partida"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="procedureState"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="announcementUrl" format="url"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="announcementDate" format="date"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="servicesDescription"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="clarificationMeetingDate" format="date"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="clarificationMeetingJudgmentUrl" format="url"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="presentationProposalsDocUrl" format="url"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="supplierName"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="supplierRfc"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="organizerAdministrativeUnit"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="applicantAdministrativeUnit"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="administrativeUnitType"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="contractNumber"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="contractDate" format="date"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="totalAmount" format="currency"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="minAmount" format="currency"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="maxAmount" format="currency"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="totalOrMaxAmount" format="currency"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="contractUrl" format="url"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="areaInCharge"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="actualizationDate" format="date"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="notes"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="karewaNotes"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="informationDate" format="date"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="limitExceeded"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="amountExceeded" format="currency"/>
                                        <TableTdDataLoadResult :rowInfo="dataLoadDetail.data" fieldName="isEmpty" format="boolean"/>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button type="" class="btn-outline c-error m-t-30" @click="cancel">Cancelar procesamiento</button>
                    </div>
                    <Pagination storeModule="dataLoad" v-show="!filtering"/>
                    <div class="vertical-center" v-show="!filtering">
                        <!--<div class="floating-label-table info m-r-40">Omitidos (duplicados)</div>-->
                        <!--<div class="floating-label-table error">Registros con errores</div>-->
                        <div class="floating-label-table m-r-40"><i class="zmdi zmdi-alert-circle-o c-info f-16"></i> Omitidos (duplicados)</div>
                        <div class="floating-label-table  m-r-40"><i class="zmdi zmdi-alert-circle-o c-error f-16"></i> Registros con errores</div>
                        <div class="floating-label-table "><i class="zmdi zmdi-check-circle c-success f-16"></i> Se crearán uno o más registros</div>
                    </div>
                </div>
                
                
                <div class="col-12 col-md-4" v-if="!showDetails">
                    <div class="card" v-if="hasErrors">
                        <div class="note-transparent error">
                            <i class="zmdi zmdi-alert-triangle"></i>
                            <p>Hay errores en uno o más registros. Por favor, <strong>descarga el
                                archivo</strong> con validaciones y realiza las correcciones necesarias.</p>
                        </div>
                        <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                            Descargar archivo con validaciones</p>
                        <!--<button class="btn-stroke button-accent m-0-auto b-shadow-none">DESCARGAR-->
                            <!--VALIDACIONES-->
                        <!--</button>-->
                        <a @click.prevent="downloadValidations()" v-if="!loadingValidations" target="_blank" class="btn-stroke button-accent m-0-auto b-shadow-none">DESCARGAR
                            VALIDACIONES
                        </a>

                        <a  class="btn-stroke button-accent m-0-auto b-shadow-none btn-loading" v-if="loadingValidations">
                            <div class="m-r-10">
                                <svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                                            cy="33" r="30"></circle>
                                </svg>
                            </div>
                            Descargando...
                        </a>
                    </div>
                    <div class="card">
                        <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                            Cargar archivo con <br/> correcciones</p>
                        <!--<button class="btn-stroke button-accent m-0-auto b-shadow-none">CARGAR-->
                            <!--CORRECCIONES-->
                        <!--</button>-->
                        <button class="btn-stroke button-accent m-0-auto b-shadow-none">
                            CARGAR CORRECCIONES
                            <input type="file" id="file" :ref="dataFileRef" v-on:change="handleFileUpload()" :accept="fileAccept">
                        </button>
                        <!--<input type="file" id="file" :ref="dataFileRef" v-on:change="handleFileUpload()" :accept="fileAccept" />-->
                    </div>
                    <div class="card">
                        <!--<button class="btn-outline c-warning m-0-auto" data-toggle="modal" data-target="#modal-delete-entry" v-if="hasErrors">IGNORAR ERRORES Y CONTINUAR</button>-->
                        <button class="btn-outline m-0-auto" :class="{'c-warning': hasErrors, 'c-success': !hasErrors}" data-toggle="modal" data-target="#modal-confirm" v-if="!confirmingDataLoad">{{confirmButtonMessage}}</button>
                        <a  class="btn-outline button-accent m-0-auto b-shadow-none btn-loading" v-if="confirmingDataLoad">
                            <div class="m-r-10">
                                <svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                                            cy="33" r="30"></circle>
                                </svg>
                            </div>
                            Procesando...
                        </a>
                    </div>
                </div>
            </div>
        </AdminMainSection>
        <ModalDefault id="modal-confirm" :title="$t(modalProperties.title)" :store-module="storeModule" :action="modalProperties.action" :reload-notifications="true">
            <div class="details-list">
                <p class="text-centered m-b-20">{{$t(modalMessage, modalMessageParams)}}
                    <br/>
                </p>
                <ul>
                    <li>
                        <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newContractsCount || 0}}</span>
                        Nuevos Contratos
                    </li>
                    <li>
                        <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newSuppliersCount || 0}}</span>
                        Nuevos Proveedores
                    </li>
                    <li>
                        <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newAdministrativeUnitsCount || 0}}</span>
                        Nuevas Unidades
                        Administrativas
                    </li>
                </ul>
                <ul>
                    <li>
                        <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedContractsCount || 0}}</span>
                        Contratos omitidos (duplicados)
                    </li>
                    <li>
                        <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedSuppliersCount || 0}}</span>
                        Proveedores omitidos (duplicados)
                    </li>
                    <li>
                        <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedAdministrativeUnitsCount || 0}}</span>
                        Unidades Administrativas omitidas (duplicados)
                    </li>
                </ul>
                <ul class="m-b-20">
                    <li>
                        <span class="c-error"><i class="zmdi zmdi-alert-triangle"></i> {{current.summary.errorsCount || 0}}</span>
                        Registros con errores
                    </li>
                </ul>
                <p class="text-centered">
                    <strong>{{$t(modalProperties.confirmationQuestion)}}</strong>
                </p>
            </div>
        </ModalDefault>
        <!--<CardUploading v-show="uploading" :loading="uploading" :cancel="cancelUpload"/>-->
    </div>
</template>

<style>
</style>

<script>
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import BackButton from '@/components/general/BackButton';
    import FloatingTitle from '@/components/general/FloatingTitle';
    import TableHeaderSearch from '@/components/tables/headers/TableHeaderSearch';
    import TableHeaderButtonsWrapper from '@/components/tables/headers/TableHeaderButtonsWrapper';
//    import TableHeaderButton from '@/components/tables/headers/TableHeaderButton';
    import TableHeaderFilters from '@/components/tables/headers/TableHeaderFilters';
    import TableTdDataLoadResult from '@/components/tables/tds/TableTdDataLoadResult';
    import TableTdDataLoadStatus from '@/components/tables/tds/TableTdDataLoadStatus';
    import Pagination from '@/components/catalogs/Pagination.vue';

    import CardUploading from '@/components/files/CardUploading';
    import ModalDefault from '@/components/modals/ModalDefault';

    import api from '@/api/dataLoad.api';
    import baseApi from '@/api/base.api';

    import Vue from 'vue';
    import {mapState} from 'vuex';
    import { bus } from '@/main';
    import moment from 'moment';
    import utils from '@/common/utils';
    
    export default {
        
        data () {
            return {
                baseUrl: baseApi.baseUrl,
                storeModule: 'dataLoad',
                showDetails: false,
                filterActionName: 'LOAD_CURRENT_DATA_LOAD',
                filterRows: [
                    {
                        label: 'data-load.review.columns.no-issues',
                        visible: true
                    },
                    {
                        label: 'data-load.review.columns.skipped',
                        visible: true
                    },
                    {
                        label: 'data-load.review.columns.errors',
                        visible: true
                    }
                ],
                dataFileRef: 'dataFile',
                allowedMimeTypes: [
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ],
                uploading: false,
                modalProperties: {
                    action: 'CONFIRM_CURRENT',
                    title: 'data-load.confirm.modal.title',
                    message: 'data-load.confirm.modal.confirm-operation',
                    messageIgnoreErrors: 'data-load.confirm.modal.confirm-operation-ignore-errors',
                    confirmationQuestion: 'data-load.confirm.modal.confirm-operation.question'
                },
                busListenerSet: false,
                loadingValidations: false,
                confirmingDataLoad: false
            }
        },
        components: {
            AdminMainSection,
            BackButton,
            FloatingTitle,
            TableHeaderSearch,
            TableHeaderButtonsWrapper,
//            TableHeaderButton,
            TableHeaderFilters,
            TableTdDataLoadResult,
            Pagination,
            CardUploading,
            ModalDefault,
            TableTdDataLoadStatus
        },
        sockets: {
            connect: function () {
            }
        },
        watch: {
            showNoIssues() {
                this.$store.dispatch('dataLoad/FILTER_CURRENT_DATA_LOAD', this.filters);
            },
            showSkipped() {
                this.$store.dispatch('dataLoad/FILTER_CURRENT_DATA_LOAD', this.filters);
            },
            showErrors() {
                this.$store.dispatch('dataLoad/FILTER_CURRENT_DATA_LOAD', this.filters);
            },
        },
        computed: {
            current () {
                //Ensure there's a current or at least a functional placeholder
                return this.dataLoadInfo.current || {
                        summary: {
                            
                        }
                    };
            },
            showNoIssues () {
                return this.filterRows[0].visible;
            },
            showSkipped () {
                return this.filterRows[1].visible;
            },
            showErrors () {
                return this.filterRows[2].visible;
            },
            filters () {
                return {
                    showNoIssues: this.showNoIssues,
                    showSkipped: this.showSkipped,
                    showErrors: this.showErrors,
                };
            },
            ...mapState({
                dataLoadInfo: state => state.dataLoad.dataLoadInfo,
//                dataLoad: state => state.dataLoad.dataLoad,
//                filteredDataLoad: state => state.dataLoad.filteredDataLoad,
                paginatedDataLoad: (state) => {
                    return state.dataLoad.paginatedDataLoad
                },
                filtering: state => state.dataLoad.filtering
//                filtering: state => true
            }),
            fileAccept () {
                return this.allowedMimeTypes.join(',');
            },
            modalMessage () {
                if (this.hasErrors) {
                    return this.modalProperties.messageIgnoreErrors;
                } else {
                    return this.modalProperties.message;
                }
            },
            modalMessageParams () {
                return {
                    contractsCount: 0,
                    suppliersCount: 0,
                    administrativeUnitsCount: 0,
                    errorsCount: 0
                }
            },
            hasErrors () {
                return !!this.current.summary.errorsCount;
            },
            confirmButtonMessage () {
                return this.hasErrors ? 'IGNORAR ERORRES Y CONTINUAR' : 'CONFIRMAR REGISTROS';
            }
        },
        filters: {
            moment: function (date) {
                if (!utils.isDate(date)) {
                    return '';
                }
                return moment(date).format('DD/MM/YYYY');
            }
        },
        methods: {
            toggleShowDetails () {
                this.showDetails = true;
                this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD');
            },
            
            toggleHideDetails () {
                this.showDetails = false;
            },

            cancel () {
                this.$store.dispatch('dataLoad/CANCEL_CURRENT_DATA_LOAD');
            },
            canceled () {
                this.$socket.emit('new_notifications');
                this.$router.push('/admin/data-load');
            },
            isRowInfoVisible (rowInfo) {
                //Filters moved to query
//                if (!this.showSkipped && rowInfo.summary.skipRow) {
//                    return false;
//                }
//                if (!this.showErrors && rowInfo.summary.hasErrors) {
//                    return false;
//                }
//                if (!this.showNoIssues && !rowInfo.summary.skipRow && !rowInfo.summary.hasErrors) {
//                    return false;
//                }
                return true;
            },
            resetInput () {
                const input = this.$refs[this.dataFileRef];
                input.type = 'text';
                input.type = 'file';
            },
            //TODO: Centralize
            handleFileUpload() {

                this.dataFile = null;

                if (this.$refs[this.dataFileRef].files && this.$refs[this.dataFileRef].files.length) {
                    this.dataFile = this.$refs[this.dataFileRef].files[0];
                }

                if (!this.dataFile || !this.dataFile.size || !this.dataFile.type) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo para la carga de datos`, 'danger');
                    return;
                }

                if (!this.allowedMimeTypes.includes(this.dataFile.type)) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo de hoja de cálculos para la carga de datos (.xls o .xlsx)`, 'danger');
                    return;
                }

                this.setUploading(true);

                let formData = new FormData();
                formData.append('file', this.dataFile);
                formData.append('idDataLoad', this.dataLoadInfo.current._id);

                api.upload(formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }, (result) => {
                    this.setUploading(false);
                    Vue.$log.info('Response', result);

                    if (result.data.error) {
                        tShow(this.$t(result.data.message), 'danger');

                        //When a data load is currently in progress, the data load info it is returned in the response
                        if (result.data.data) {
                            this.$store.commit('dataLoad/SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: result.data.data});
                        }
                    } else {
                        //No error, upload success
                        this.$store.commit('dataLoad/SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: result.data.data});
                        this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD');
                    }
                    this.resetInput();
                }, (error) => {
                    this.setUploading(false);
                    Vue.$log.error('Response error', error);
                    tShow(`Ocurrió un error inesperado al cargar el archivo`);
                    this.resetInput();
                });
            },
            setUploading(value) {
                this.uploading = value;
            },
            cancelUpload() {
                //noop
            },
            downloadValidations() {
                this.loadingValidations = true;
                this.$store.dispatch('dataLoad/DOWNLOAD_VALIDATIONS');
            },
        },
        created() {
        },
        mounted(){
            if (!this.busListenerSet) {
                bus.$on('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', ({dataLoadInfo})=>{
                    this.busListenerSet = true;
                    //Current was canceled, confirmed, or otherwise not available, so we redirect to the non-current view
                    if (!dataLoadInfo.current) {
                        this.canceled();
                    }
                });
                bus.$on('dataLoad/VALIDATIONS_DOWNLOADED',()=>{
                    this.loadingValidations = false;
                });
                bus.$on('dataLoad/CONFIRMATION_FINISHED',(isConfirming)=>{
                    this.confirmingDataLoad = isConfirming;
                });

            }
            
            this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO');
        }
    }
</script>