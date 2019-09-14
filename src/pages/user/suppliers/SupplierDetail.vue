<template>
    <div>

        <!-- MODAL AUTO DISMISS-->
        <ModalAutoDismiss :message="$t('general.modal.wait.message')" ></ModalAutoDismiss>

        <!-- MODAL ALERT SUCCESS -->
        <ModalAlert :title="$t('general.modal-alert.download.title')"
                    :message="$t('general.modal-alert.download.message')"
                    :question="$t('general.modal-alert.download.question')">
                <button type="button" @click.prevent="downloadFile(false)"
                        class="btn-stroke button-accent" data-dismiss="modal">{{$t('general.modal-alert.download.all')}}
                </button>
                <button type="button" @click.prevent="downloadFile(true)"
                        class="btn-stroke button-accent" data-dismiss="modal">{{$t('general.modal-alert.download.filtered')}}
                </button>
        </ModalAlert>


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
                                {{ supplier.name }}
                            </h1>
                            <div class="side-right d-flex">
                                <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>

                                <div class="dropdown p-l-10">
                                    <button class="btn-raised button-accent text-capi m-l-10" type="button" id="dropdownDownloadOptions"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="zmdi zmdi-download"></i> DESCARGAR DATOS DEl PROVEEDOR
                                    </button>
                                    <div class="dropdown-menu dropdown-options dropdown-menu-right"
                                         aria-labelledby="dropdownDownloadOptions">
                                        <span>Descargar datos con formato:</span>
                                        <div class="container-dropdown">
                                            <a class="dropdown-item" @click.prevent="openModalAndSetFormat('pdf')" target="_blank">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-pdf.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" @click.prevent="openModalAndSetFormat('xls')">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-xls.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" @click.prevent="openModalAndSetFormat('json')">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-json.svg"
                                                     alt="Empty"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>




                                <!--<button class="btn-raised button-accent text-capi m-l-10" data-toggle="modal"-->
                                        <!--data-target="#modalAlertSuccess" tabindex=""><i class="zmdi zmdi-download"></i>-->
                                    <!--DESCARGAR DATOS DEL PROVEEDOR-->
                                <!--</button>-->
                            </div>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">{{$t('suppliers.detail.description')}}
                            <strong class="principal-font-semibold"> {{ supplier.name }} </strong></p>

                        <PublicFilter
                                :storeModule="storeModule"
                                :administrativeUnits="adminstrativeUnitsForFilter"
                                :fiscalYears="fiscalYears"
                                :trimonths="trimonths"
                                :administrationPeriods="administrationPeriods"
                                :procedureTypes="procedureTypes"
                                :actionName="'LOAD_SUPPLIER_DETAIL'"
                                :additionalParams="{id: supplierId}"
                                :projection="{supplier :0}"
                        >
                        </PublicFilter>

                    </div>
                </div>


                <!-- Cantidades -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color accent">
                            <!--<span>$57,837,576.28</span>-->
                            <span class="f-25">{{totals.total | currency}}</span>
                            <label>MONTO TOTAL</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color green">
                            <!--<span>$23,980,030.81</span>-->
                            <span class="f-25">{{totals.public | currency}}</span>
                            <label>MONTO TOTAL DE CONTRATOS POR LICITACIÓN PÚBLICA</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color yellow">
                            <!--<span>$2,398,871.43</span>-->
                            <span class="f-25">{{totals.invitation | currency}}</span>
                            <label>MONTO TOTAL DE CONTRATOS POR INVITACIÓN</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color red">
                            <!--<span>$31,458,674.04</span>-->
                            <span class="f-25">{{totals.noBid | currency}}</span>
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
                                                        <small>{{contract.contractDate | date}}</small>
                                                    </span>

                                                    </div>
                                                    <br />
                                                        <router-link :to="'/contracts/' + contract._id" class="btn-stroke xs button-primary">
                                                            Ver más
                                                        </router-link>
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
                                                        <small>{{contract.contractDate}}</small>
                                                    </span>

                                                    </div>
                                                        <br />
                                                        <router-link :to="'/contracts/' + contract._id" class="btn-stroke xs button-primary">
                                                            Ver más
                                                        </router-link>
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
                                                            <small>{{contract.contractDate | date}}</small>
                                                        </span>

                                                    </div>
                                                    <br />
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


                <!-- ADITIONAL INFO ONLY -->
                <p class="f-12 c-plain_text principal-font-regular">
                    Todos los datos que se presentan en este informe son única y exclusivamente obtenidos de:
                    {{fuenteInformacion}}
                    <br>
                    Última actualización: <strong>{{supplier.updatedAt | moment}}</strong>
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
    import moment from 'moment';
    
    import {mapState} from 'vuex';
    
    const storeModule = 'publicSuppliers';
    import PublicFilter from '@/components/filters/PublicFilter.vue';
    import ModalAutoDismiss from '@/components/catalogs/ModalAutoDismiss.vue';
    import ModalAlert from '@/components/catalogs/ModalAlert.vue';

    import aboutInfo from '@/karewaPlatform.info';

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
                ],
                storeModule : storeModule,
                supplierId : undefined,
                format: "",
                fuenteInformacion: aboutInfo.infoFuenteInformacion.fuenteInformacion || "https://www.plataformadetransparencia.org.mx"
            }
        },
        components: {
            MoreInfo,
            PublicFilter,
            ModalAutoDismiss,
            ModalAlert
        },
        computed: {
            ...mapState({
                detail: state => state[storeModule].detail,
                adminstrativeUnitsForFilter: state => state[storeModule].adminstrativeUnitsForFilter,
                fiscalYears: state => state[storeModule].fiscalYears,
                trimonths: state => state[storeModule].trimonths,
                administrationPeriods: state => state[storeModule].administrationPeriods,
                procedureTypes: state => state[storeModule].procedureTypes,
                lastQuery: state => state[storeModule].lastQuery,
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
        methods: {
            copyUrlToClipBoard(){
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value =  window.location.href;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                tShow('Se ha copiado el enlace correctamente', 'info');

            },
            // modalAutoDismiss
            openModalAndSetFormat(format){
                this.format = format;
                $('#modalAlertSuccess').modal('show');
            },
            downloadFile(withFilters){
                $('#modalAutoDismiss').modal('show');
                let filters = withFilters ? this.lastQuery : {};
                this.$store.dispatch('publicSuppliers/downloadFile', {format:this.format,filters,isDetail:true, id:this.supplier._id});

            }
        },
        created() {
        },
        beforeMount() {
            this.supplierId = this.$route.params.id;
            console.log('this.$route.params.id', this.supplierId);
            this.$store.dispatch('publicSuppliers/LOAD_SUPPLIER_DETAIL', {id: this.supplierId});

            this.$store.dispatch(`${storeModule}/getAdministrativeUnitsForFilter`,this.supplierId);
            this.$store.dispatch(`${storeModule}/getFiscalYears`,this.supplierId);
            this.$store.dispatch(`${storeModule}/getTrimonths`,this.supplierId);
            this.$store.dispatch(`${storeModule}/getAdministrationPeriods`,this.supplierId);
            this.$store.dispatch(`${storeModule}/getProcedureTypes`,this.supplierId);
        },
        filters: {
            moment: function (date) {
                moment.locale('es');
                if(!date){
                    return
                }
                return moment(date).format('DD [de] MMMM [de] YYYY')
            }
        }

    }
</script>
