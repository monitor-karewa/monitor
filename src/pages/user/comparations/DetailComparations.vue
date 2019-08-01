<template>
    <section class="client-content">
        <!-- MODAL AUTO DISMISS-->
        <ModalAutoDismiss :message="$t('general.modal.wait.message')" ></ModalAutoDismiss>
        <div class="neutral-width">

            <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                <router-link to="/comparations" class="btn-outline text-unset">
                    <i class="zmdi zmdi-long-arrow-left"></i> Regresar a Selección de Monitor
                </router-link>
            </div>

            <div class="col-12 p-0">
                <div class="card">
                    <div class="floating-title-panel">
                        <h1>
                            Comparar Monitores
                        </h1>
                        <div class="side-right d-flex">
                            <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                    class="zmdi zmdi-share"></i> Compartir</a>
                            <div class="dropdown p-l-10">
                                <button class="btn-raised button-accent text-capi m-l-10" type="button" id="dropdownDownloadOptions"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="zmdi zmdi-download"></i> Descargar comparación

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

                    <p class="f-14 c-plain_text principal-font-regular">A continuación te
                        presentamos la comparación entre
                        <strong class="principal-font-semibold">{{detailLeft.organization.name}} y {{detailRight.organization.name}}:</strong></p>

                    <br/>

                    <div class="panel-table">
                        <div class="row m-0 p-b-20">
                            <span class="border-lines col-12">
                                <label>Monitores a comparar</label>
                            </span>
                            <div class="col-4 p-30"></div>
                            <div class="col-4 p-30">
                                <div class="logo-full lg">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo">
                                    <div>
                                        <small>Monitor</small>
                                        <label :style="{color: detailLeft.organization.color}">{{detailLeft.organization.shortName}}</label>
                                    </div>
                                </div>
                                <!--<a href="" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>-->
                                <router-link v-if="!isExternalCorruptionIndex(detailLeft.corruptionIndex)" :to="getInternalCorruptionIndexHomeUrl(detailLeft.corruptionIndex, detailLeft.organization)" class="btn-stroke button-primary text-unset">Ir a Inicio</router-link>
                                <!--<a v-show="!isExternalCorruptionIndex(detailLeft.corruptionIndex)" :href="getInternalCorruptionIndexHomeUrl(detailLeft.corruptionIndex, detailLeft.organization)" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>-->
                                <a v-if="isExternalCorruptionIndex(detailLeft.corruptionIndex)" target="_blank" :href="getExternalCorruptionIndexHomeUrl(detailLeft.corruptionIndex, detailLeft.organization)" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>
                            </div>
                            <div class="col-4 p-30">
                                <div class="logo-full lg">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo">
                                    <div>
                                        <small>Monitor</small>
                                        <label :style="{color: detailRight.organization.color}">{{detailRight.organization.shortName}}</label>
                                    </div>
                                </div>
                                <router-link v-if="!isExternalCorruptionIndex(detailRight.corruptionIndex)" :to="getInternalCorruptionIndexHomeUrl(detailRight.corruptionIndex, detailRight.organization)" class="btn-stroke button-primary text-unset">Ir a Inicio</router-link>
                                <!--<a v-show="!isExternalCorruptionIndex(detailRight.corruptionIndex)" :href="getInternalCorruptionIndexHomeUrl(detailRight.corruptionIndex, detailRight.organization)" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>-->
                                <a v-if="isExternalCorruptionIndex(detailRight.corruptionIndex)" target="_blank" :href="getExternalCorruptionIndexHomeUrl(detailRight.corruptionIndex, detailRight.organization)" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>
                            </div>


                            <span class="border-lines col-12">
                                <label>Índice de riesgo de corrupción {{detailRight.corruptionIndex.administrationPeriod+ '/'+ detailLeft.corruptionIndex.administrationPeriod}}<i id="corruption-index-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                <div id="help-tooltip-corruption-index-content" class="d-none">
                                    <div class="help-tooltip-div">
                                        <label>¿Qué significa esto?</label>
                                        <p>Este es un índice de riesgo de corrupción para la administración {{detailLeft.corruptionIndex.administrationPeriod}} de {{detailLeft.organization.name}} y la administración {{detailRight.corruptionIndex.administrationPeriod}} de {{detailRight.organization.name}}.</p>
                                        <p>El sistema analiza automáticamente la información de las contrataciones públicas cargadas en el sistema y mediante un cálculo avanzado y automatizado, obtiene un porcentaje que indica la posibilidad de que la organización presente actividades de corrupción.</p>
                                        <p>Este cálculo avanzado toma en cuenta 3 ejes principales. El manejo correcto de las contrataciones públicas por parte de la organización, la competencia económica, y un análisis de su transparencia.</p>
                                        <p>Para más información, puedes consultar nuestra sección de Recursos.</p>
                                    </div>
                                </div>
                            </span>
                            <div class="col-4 p-30 vertical-center">
                                <p class="f-12 c-plain_text principal-font-medium text-upper m-b-0 vertical-center">
                                    Tacómetro </p>
                            </div>
                            <div class="col-4 p-30">
                                <div class="tacometro-container">

                                    <div class="gauge-container">
                                        <div class="gauge gauge-element">
                                            <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                                 alt="">
                                            <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                                 alt="">
                                            <canvas id="gauge-graph-left"></canvas>
                                            <div class="range">
                                                <img class="" src="@/assets/images/All-Icons/tachometer-range.svg"
                                                     alt="">
                                            </div>

                                        </div>
                                        <div class="text">
                                            <div id="gauge-text-left">0</div>
                                            %
                                        </div>
                                        <div id="level-text-left" class="prob">---</div>
                                    </div>

                                </div>
                                <a data-toggle="modal" :data-target="`#${leftModalCorruptionIndexHow}`" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se
                                    calcula?</a>
                                <ModalCorruptionIndexHow :id="leftModalCorruptionIndexHow"/>
                            </div>
                            <div class="col-4 p-30">
                                <div class="tacometro-container">
                                    <div class="gauge-container">
                                        <div class="gauge gauge-element">
                                            <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                                 alt="">
                                            <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                                 alt="">
                                            <canvas id="gauge-graph-right"></canvas>
                                            <div class="range">
                                                <img class="" src="@/assets/images/All-Icons/tachometer-range.svg"
                                                     alt="">
                                            </div>

                                        </div>
                                        <div class="text">
                                            <div id="gauge-text-right">0</div>
                                            %
                                        </div>
                                        <div id="level-text-right" class="prob">---</div>
                                    </div>

                                </div>
                                <!--<a href="" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se-->
                                    <!--calcula?</a>-->
                                <a data-toggle="modal" :data-target="`#${rightModalCorruptionIndexHow}`" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se
                                    calcula?</a>
                                <ModalCorruptionIndexHow :id="rightModalCorruptionIndexHow"/>
                            </div>


                            <span class="border-lines col-12">
                                <label>Montos totales de la administración {{administrationPeriods}} <i id="totales-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                <!-- TOOLTIP -->
                                <div id="help-tooltip-totales-content" class="d-none">
                                    <div class="help-tooltip-div">
                                        <label>¿Qué significa esto?</label>
                                        <p>Es la sumatoria de los montos dados por cada contrato a lo largo de la administración {{detailLeft.corruptionIndex.administrationPeriod}} de {{detailLeft.organization.name}} y la administración {{detailRight.corruptionIndex.administrationPeriod}} de {{detailRight.organization.name}}.</p>
                                        <p>Estos se dividen en 3 tipos de procedimientos de los contratos, los cuales son Licitación pública, Por invitación y Adquisición directa.</p>
                                        <p>Si quieres saber más, puedes consultar nuestra sección de Recursos.</p>
                                    </div>
                                </div>
                            </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Licitación Pública </p>
                            </div>
                            <!--<div class="col-4 p-l-20 p-r-20 p-t-20">-->
                                <!--<p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">-->
                                    <!--$1,055,177,509.74 = 56% </p>-->
                            <!--</div>-->
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.totals.public | currency}} = {{detailLeft.totals.publicPercent | percentage}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.totals.public | currency}} = {{detailRight.totals.publicPercent | percentage}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Por
                                    Invitación </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.totals.invitation | currency}} = {{detailLeft.totals.invitationPercent | percentage}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.totals.invitation | currency}} = {{detailRight.totals.invitationPercent | percentage}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0">
                                    Adjudicación Directa </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.totals.noBid | currency}} = {{detailLeft.totals.noBidPercent | percentage}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.totals.noBid | currency}} = {{detailRight.totals.noBidPercent | percentage}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20"></div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <div class="divider"></div>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <div class="divider"></div>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Monto
                                    total </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.totals.total | currency}}
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.totals.total | currency}}
                                </p>
                            </div>


                            <span class="border-lines col-12">
                                <label>Contratos dados de la administración {{administrationPeriods}} <i id="contratos-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                <div id="help-tooltip-contratos-content" class="d-none">
                                    <div class="help-tooltip-div">
                                        <label>¿Qué significa esto?</label>
                                        <p>Estas cantidades son los contratos registrados para la administración {{detailLeft.corruptionIndex.administrationPeriod}} de {{detailLeft.organization.name}} y la administración {{detailRight.corruptionIndex.administrationPeriod}} de {{detailRight.organization.name}}.</p>
                                        <p>Los contratos se dividen en 3, dependiendo de su tipo de procedimiento.</p>
                                        <p>Los contratos de <strong>Licitación Pública</strong> llevan a cabo un proceso público y transparente de compra donde se invita a cierto número de proveedores. Después, se lleva a cabo un proceso de aclaración de dudas, para que todo proveedor involucrado conozca a detalle la contratación. Una vez concluido este proceso, la Licitación continúa con la evaluación de las propuestas de los proveedores, siempre manteniendo la transparencia en el proceso. Finalmente, se elige a un proveedor ganador con base en el análisis realizado, garantizando que sea la opción óptima.</p>
                                        <p>Los contratos <strong>Por Invitación</strong> solicitan cotización a un cierto número de proveedores, indicando las especificaciones del servicio o producto deseado. Después, se elige la mejor cotización como ganadora y el contrato procede con el proveedor cuya cotización fue elegida.</p>
                                        <p>Los contratos de <strong>Adjudicación Directa</strong> realizan la compra directamente con un Proveedor. Si bien el proceso es más ágil que los otros dos tipos de procedimento, en veces no permite buscar mejores opciones de costo, calidad, o cualquier otro parámetro importante para la contratación.</p>
                                    </div>
                                </div>
                            </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS DE LICITACIÓN PÚBLICA </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.counts.public || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.counts.public || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS POR INVITACIÓN </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.counts.invitation || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.counts.invitation || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS DE ADJUDICACIÓN DIRECTA </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.counts.noBid || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.counts.noBid || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20"></div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <div class="divider"></div>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <div class="divider"></div>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0">
                                    Contratos en total
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailLeft.counts.total || 0}} contratos
                                </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0">
                                    {{detailRight.counts.total || 0}} contratos
                                </p>
                            </div>


                            <!--<span class="border-lines col-12">-->
                            <!--<label>Datos generales <i id="datos-tooltip" class="zmdi zmdi-help-outline"></i></label>-->
                                <!--&lt;!&ndash; TOOLTIP &ndash;&gt;-->
                                <!--&lt;!&ndash;<template id="help-tooltip-datos">&ndash;&gt;-->
                                <!--&lt;!&ndash;<div class="help-tooltip-div">&ndash;&gt;-->
                                <!--&lt;!&ndash;<label>¿Qué significa esto?</label>&ndash;&gt;-->
                                <!--&lt;!&ndash;<p>TEXTO FALTANTE</p>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--&lt;!&ndash;</template>&ndash;&gt;-->
                          <!--</span>-->
                            <!--<div class="col-4 p-l-20 p-r-20 p-t-20">-->
                                <!--<p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Población-->
                                    <!--total </p>-->
                            <!--</div>-->
                            <!--<div class="col-4 p-l-20 p-r-20 p-t-20">-->
                                <!--<p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">-->
                                    <!--809,232 (2010) </p>-->
                            <!--</div>-->
                            <!--<div class="col-4 p-l-20 p-r-20 p-t-20">-->
                                <!--<p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">-->
                                    <!--1,391,180 (2015) </p>-->
                            <!--</div>-->
                        </div>
                        <PanelOtherCalculations :leftCalculationsInfo="detailLeft.calculationsInfo" :rightCalculationsInfo="detailRight.calculationsInfo"/>
                    </div>
                </div>
            </div>


            <more-info></more-info>

        </div>
    </section>
</template>

<script>
    import MoreInfo from '@/components/general/MoreInfo';
    import ModalCorruptionIndexHow from "@/components/modals/ModalCorruptionIndexHow";
    import PanelOtherCalculations from '@/components/panels/PanelOtherCalculations';
    import ModalAutoDismiss from '@/components/catalogs/ModalAutoDismiss.vue';

    import {mapState} from 'vuex';
    import {Gauge} from 'gaugeJS';
    import tippy from 'tippy.js';
    import baseApi from '@/api/base.api';

    const storeModule = 'publicComparations';

    const tachometerOpts = {
        lines: 12,
        angle: -0.22,
        lineWidth: 0.1,
        pointer: {
            length: 0.3,
            strokeWidth: 0.03,
            color: '#454e7b'
        },
        limitMax: true,
        limitMin: true,
        colorStart: '#6ec284',
        generateGradient: true,
        percentColors: [
            [0.0, "#eb6262"], [0.50, "#eb6262"],
            [0.51, "#ffc043"], [0.75, "#ffc043"],
            [0.76, "#6ec284"], [1.0, "#6ec284"]
        ]
    };

    export default {

        data() {
            return {
                leftModalCorruptionIndexHow: 'left-corruption-index-modal',
                rightModalCorruptionIndexHow: 'right-corruption-index-modal',
            }
        },
        components: {
            MoreInfo,
            ModalCorruptionIndexHow,
            PanelOtherCalculations,
            ModalAutoDismiss
        },
        filters: {
            percentage(num) {
                num = num || 0;
                return ((num * 100 * 100).toFixed() / 100).toString() + '%';
            }
        },
        computed: {
            ...mapState({
                currentOrganization: state => state.currentOrganization,
                detailLeft: state => state[storeModule].detailLeft,
                detailRight: state => state[storeModule].detailRight,
            }),
            leftAdministrationPeriod() {
                if (this.detailLeft && this.detailLeft.corruptionIndex && this.detailLeft.corruptionIndex.administrationPeriod && this.detailLeft.corruptionIndex.administrationPeriod.length) {
                    return this.detailLeft.corruptionIndex.administrationPeriod;
                } else {
                    return '';
                }
            },
            rightAdministrationPeriod() {
                if (this.detailRight && this.detailRight.corruptionIndex && this.detailRight.corruptionIndex.administrationPeriod && this.detailRight.corruptionIndex.administrationPeriod.length) {
                    return this.detailRight.corruptionIndex.administrationPeriod;
                } else {
                    return '';
                }
            },
            administrationPeriods() {
                return `${this.leftAdministrationPeriod} / ${this.rightAdministrationPeriod}`;
            }

        },
        methods: {
            initTachometer(elementId, textElementId, value) {
                let gaugeElement = document.getElementById(elementId);
                let gauge = new Gauge(gaugeElement).setOptions(tachometerOpts);
                gauge.maxValue = 100;
                gauge.animationSpeed = 60;
                gauge.setTextField(document.getElementById(textElementId));

                gauge.set(value);
            },
            corruptionLevel(value) {
                if (value <= 50) {
                    return 'ALTO'
                } else if (value <= 75) {
                    return 'MEDIO'
                } else {
                    return 'BAJO'
                }
            },
            initTextLevel(elementId,value) {
                let levelElement = document.getElementById(elementId);
                let corruptionLevelRisk = this.corruptionLevel(value);
                levelElement.innerHTML = corruptionLevelRisk;

            },
            copyUrlToClipBoard(){
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value =  window.location.href;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                tShow('Se ha copiado el enlace correctamente', 'info');

            },
            initTooltip(contentElementId, tooltipElementId) {
                $(document).ready(function () {
//                const templateTotales = document.getElementById('help-tooltip-totales');
                    const templateContent = document.getElementById(contentElementId);
                    tippy(`#${tooltipElementId}`, {
                        allowHTML: true,
//                        placement: "top",
                        content: templateContent.innerHTML,
                        arrow: true,
                        animation: "fade",
//                        distance: 15,
                        interactive: true,
                        maxWidth: 750
                    });
                });
            },
            initTooltipCorruptionIndex() {
                this.initTooltip('help-tooltip-corruption-index-content', 'corruption-index-tooltip');
            },
            initTooltipTotals() {
                this.initTooltip('help-tooltip-totales-content', 'totales-tooltip');
            },
            initTooltipContracts() {
                this.initTooltip('help-tooltip-contratos-content', 'contratos-tooltip');
            },
            isExternalCorruptionIndex(corruptionIndex) {
                return corruptionIndex.url && corruptionIndex.url.length;
            },
            getInternalCorruptionIndexHomeUrl(corruptionIndex, organization) {
//                return `/calculations/corruption-index?changeOrganization=${organization._id}`;
                return `/select-organization`;
            },
            getExternalCorruptionIndexHomeUrl(corruptionIndex) {
                if (!corruptionIndex) {
                    return '';
                }

                let urlPrefix = '';
                if (corruptionIndex.url && corruptionIndex.url.length) {
                    urlPrefix = corruptionIndex.url;
                }

//                return `${urlPrefix}/calculations/corruption-index`;
                return `${urlPrefix}/select-organization`;
            },
            downloadFile(format){
                $('#modalAutoDismiss').modal('show');
                this.$store.dispatch(`${storeModule}/downloadComparisonFile`, { format, id : this.currentOrganization._id});

            }
        },
        watch: {
            detailLeft(_detailLeft) {
                let elementId = 'gauge-graph-left';
                let textElementid = 'gauge-text-left';
                let gaugeValue = 0;
                let elementLevelId='level-text-left';

                if (_detailLeft && _detailLeft.corruptionIndex && _detailLeft.corruptionIndex.result) {
                    gaugeValue = _detailLeft.corruptionIndex.result;
                }
                this.initTachometer(elementId, textElementid, gaugeValue);
                this.initTextLevel(elementLevelId,gaugeValue);

                this.initTooltipCorruptionIndex();
                this.initTooltipTotals();
                this.initTooltipContracts();
            },
            detailRight(_detailRight) {
                let elementId = 'gauge-graph-right';
                let textElementid = 'gauge-text-right';
                let gaugeValue = 0;
                let elementLevelId='level-text-right';

                if (_detailRight && _detailRight.corruptionIndex && _detailRight.corruptionIndex.result) {
                    gaugeValue = _detailRight.corruptionIndex.result;
                }
                this.initTachometer(elementId, textElementid, gaugeValue);
                this.initTextLevel(elementLevelId,gaugeValue);

                this.initTooltipCorruptionIndex();
                this.initTooltipTotals();
                this.initTooltipContracts();
            },
        },
        mounted() {
            let otherOrganizationId = this.$route.params.id;
            let url = this.$route.query.baseRemoteUrl;

            this.$store.dispatch(`${storeModule}/LOAD_DETAIL`, {
                id: this.currentOrganization._id,
                right: false,
                url: null,//TODO: implement comparations to other urls
            });
            this.$store.dispatch(`${storeModule}/LOAD_DETAIL`, {
                id: otherOrganizationId,
                right: true,
                url: url,//TODO: implement comparations to other urls
            });

            this.$store.dispatch(`${storeModule}/SAVE_COMPARATION`, {
                target: otherOrganizationId,
                url: url,
            });


            this.initTooltipCorruptionIndex();
            this.initTooltipTotals();
            this.initTooltipContracts();
//            $(document).ready(function () {
////                const templateTotales = document.getElementById('help-tooltip-totales');
//                const templateTotalesContent = document.getElementById('help-tooltip-totales-content');
//                tippy('#totales-tooltip', {
//                    allowHTML: true,
//                    placement: "top",
//                    content: templateTotalesContent.innerHTML,
//                    arrow: true,
//                    animation: "fade",
//                    distance: 15
//                });
//            });



        }
    }
</script>


<style scoped>

</style>
