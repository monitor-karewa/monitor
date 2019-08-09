<template>
    <section class="client-content">
        <!-- MODAL AUTO DISMISS-->
        <ModalAutoDismiss :message="$t('general.modal.wait.message')" ></ModalAutoDismiss>

        <div class="neutral-width">

            <!--<div class="col-12 p-0 m-t-20 m-b-20 d-flex">-->
                <!--<router-link to="/suppliers" class="btn-outline text-unset">-->
                    <!--<i class="zmdi zmdi-long-arrow-left"></i> Ir a Proveedores-->
                <!--</router-link>-->
            <!--</div>-->

            <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                <router-link to="/contracts" class="btn-outline text-unset">
                    <i class="zmdi zmdi-long-arrow-left"></i>Ir a Contratos
                </router-link>
                <router-link to="/comparations" class="btn-outline text-unset m-auto-left">
                    Ir a Comparar <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i>
                </router-link>
            </div>
            
            <div class="col-12 p-0">
                <div class="card d-flex">
                    <div class="floating-title-panel big">
                        <h1>Índice de Riesgo de Corrupción {{`(${corruptionIndex.administrationPeriod})`}}</h1>

                        <div class="side-right d-flex">
                            <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                    class="zmdi zmdi-share"></i> Compartir</a>

                            <div class="dropdown p-l-10">
                                <button class="btn-raised button-accent text-capi m-l-10" type="button" id="dropdownDownloadOptions"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="zmdi zmdi-download"></i> DESCARGAR DATOS DEl ÍNDICE DE RIESGO DE CORRUPCIÓN

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




                            <!--<button class="btn-raised button-accent text-capi m-l-10" data-toggle="modal"-->
                            <!--data-target="#modalAlertSuccess" tabindex=""><i class="zmdi zmdi-download"></i>-->
                            <!--DESCARGAR DATOS DEL PROVEEDOR-->
                            <!--</button>-->
                        </div>

                    </div>
                    
                    <div class="row">
                        <div class="col-md-4 col-xs-12 p-l-30 p-r-30 p-b-30">
                            <div class="tacometro-container">

                                <div class="gauge-container">
                                    <div class="gauge gauge-element">
                                        <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                             alt="">
                                        <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                             alt="">
                                        <canvas id="gauge-graph"></canvas>
                                        <div class="range">
                                            <img class="" src="@/assets/images/All-Icons/tachometer-range.svg"
                                                 alt="">
                                        </div>

                                    </div>
                                    <div class="text">
                                        <div id="gauge-text">0</div>
                                        %
                                    </div>
                                    <div class="prob">{{corruptionLevelProbabilityText}}</div>
                                </div>

                            </div>
                            <!--<a href="" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se-->
                                <!--calcula?</a>-->
                        </div>
                        <div class="col-md-8 col-xs-12">
                            <p class="f-14 c-plain_text principal-font-regular">
                                <strong class="f-16">¿Qué es?</strong>
                                <br>
                                <!--<strong class="principal-font-semibold">KAREWA ES AMAR CHIHUAHUA, en lo sucesivo (Karewa)</strong>, que de acuerdo con la ley aplicable en México y que es la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, (LFPDPPP) se entiende como (el “Responsable”) ya que decide sobre el tratamiento de los datos personales que recaba de usted como “Titular” de los mismos, entendiéndose como tal la persona física a quien corresponden los datos personales, y por éstos últimos cualquier información concerniente a una persona física identificada o identificable. Los datos personales pueden recabarse en ciertas páginas del sitio http://karewa.org/, en lo sucesivo el (sitio web).-->
                                <!--<br>-->
                                <!--<br>-->
                                El Índice de Riesgo de Corrupción es una variable que mide, en una escala de cero (alto riesgo)
                                a cien (bajo riesgo), los niveles de riesgo de corrupción en los procedimientos de
                                contrataciones públicas en un gobierno determinado, y consiste en un índice compuesto que
                                se basa en la información pública de las fuentes oficiales de transparencia.
                                <br>
                                <br>
                                <strong class="f-16">¿Qué significa que el índice de riesgo de corrupción sea <span :style="{color: corruptionLevelColor}">{{corruptionLevel}}</span>?</strong>
                                <br>
                                <!--<strong class="principal-font-semibold">KAREWA ES AMAR CHIHUAHUA, en lo sucesivo (Karewa)</strong>, que de acuerdo con la ley aplicable en México y que es la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, (LFPDPPP) se entiende como (el “Responsable”) ya que decide sobre el tratamiento de los datos personales que recaba de usted como “Titular” de los mismos, entendiéndose como tal la persona física a quien corresponden los datos personales, y por éstos últimos cualquier información concerniente a una persona física identificada o identificable. Los datos personales pueden recabarse en ciertas páginas del sitio http://karewa.org/, en lo sucesivo el (sitio web).-->
                                <!--<br>-->
                                <!--<br>-->
                                La información se analiza automáticamente y el sistema indica que existe un <span style="color: #19babd;">{{corruptionLevelRisk}}</span> de que ocurran casos de corrupción.
                                <br>
                                <br>
                                <strong class="f-16">¿Cómo se calcula?</strong>
                                <br>
                                El índice de Riesgo de Corrupción se calcula analizando la información de transparencia de las
                                contrataciones públicas, tomando en cuenta diferentes variables para generar un índice
                                exacto.
                                <br>
                                <br>
                                <strong class="f-16">Administración</strong>
                                <br>
                                {{corruptionIndex.administrationPeriod}}

                            </p>
                            <a data-toggle="modal" data-target="#corruption-index-modal" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se
                                calcula?</a>
                            <ModalCorruptionIndexHow id="corruption-index-modal"/>
                        </div>
                    </div>

                    <PanelOtherCalculations :calculationsInfo="calculationsInfo"/>

                    <!--<div class="panel-table m-t-50" v-show="calculationsInfo && calculationsInfo.length">-->
                        <!--<div class="row m-0 p-b-20">-->
                            <!--<span class="border-lines col-12">-->
                                <!--<label>Otros cálculos</label>-->
                            <!--</span>-->
                            <!--<template v-for="(calculationInfo) in calculationsInfo">-->
                                <!--<div class="col-6 p-l-20 p-r-20 p-t-20">-->
                                    <!--<p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> {{calculationInfo.name}} - {{calculationInfo.description}}</p>-->
                                <!--</div>-->
                                <!--<div class="col-6 p-l-20 p-r-20 p-t-20">-->
                                    <!--<p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">-->
                                        <!--{{calculationInfo.result | currency}}-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>
            </div>

            <more-info></more-info>
        </div>
    </section>
</template>

<style>
</style>

<script>

    import MoreInfo from '@/components/general/MoreInfo';
    import ModalAutoDismiss from '@/components/catalogs/ModalAutoDismiss.vue';
    import ModalCorruptionIndexHow from '@/components/modals/ModalCorruptionIndexHow';
    
    import PanelOtherCalculations from '@/components/panels/PanelOtherCalculations';

    import {Gauge} from 'gaugeJS';
    import {mapState} from 'vuex';
    
    const RISK_COLORS = {
        LOW: '#6ec284', 
        MEDIUM: '#ffc043', 
        HIGH: '#eb6262', 
    };

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
        colorStart: '#eb6262',
        generateGradient: true,
        percentColors: [
//            [0.0, "#6ec284"], [0.50, "#6ec284"],
//            [0.51, "#ffc043"], [0.75, "#ffc043"],
//            [0.76, "#eb6262"], [1.0, "#eb6262"]
            [0.0, RISK_COLORS.HIGH], [0.50, RISK_COLORS.HIGH],
            [0.51, RISK_COLORS.MEDIUM], [0.75, RISK_COLORS.MEDIUM],
            [0.76, RISK_COLORS.LOW], [1.0, RISK_COLORS.LOW]
        ]
    };
    
    const storeModule = 'publicComparations';
    
    export default {
        data () {
            return {
            }
        },
        components: {
            MoreInfo,
            ModalAutoDismiss,
            ModalCorruptionIndexHow,
            PanelOtherCalculations,
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
            copyUrlToClipBoard(){
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value =  window.location.href;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                tShow('Se ha copiado el enlace correctamente', 'info');

            },

            downloadFile(format){
                $('#modalAutoDismiss').modal('show');
                this.$store.dispatch(`${storeModule}/downloadFile`, { format, id : this.currentOrganization._id});

            }
        },
        watch: {
            tachometerValue(val) {
                let elementId = 'gauge-graph';
                let textElementid = 'gauge-text';
                let gaugeValue = val;
                this.initTachometer(elementId, textElementid, gaugeValue);
            }
        },
        computed: {
            ...mapState({
                corruptionIndex: state => state[storeModule].corruptionIndex,
                calculationsInfo: state => state[storeModule].calculationsInfo,
                currentOrganization: state => state.currentOrganization,
            }),
            tachometerValue() {
                return this.corruptionIndex.result || 0;
            },
            corruptionLevel() {
                if (this.tachometerValue <= 50) {
                    return 'ALTO'
                } else if (this.tachometerValue <= 75) {
                    return 'MEDIO'
                } else {
                    return 'BAJO'
                }
            },
            corruptionProbability() {
                if (this.tachometerValue <= 50) {
                    return 'ALTA'
                } else if (this.tachometerValue <= 75) {
                    return 'MEDIA'
                } else {
                    return 'BAJA'
                }
            },
            corruptionLevelRisk() {
                return `riesgo ${this.corruptionLevel.toLowerCase()}`;
            },
            corruptionLevelProbabilityText() {
                return `Probabilidad ${this.corruptionProbability.toLowerCase()}`;
            },
            corruptionLevelColor() {
                switch(this.corruptionLevel) {
                    case 'ALTO':
                        return RISK_COLORS.HIGH;
                    case 'MEDIO':
                        return RISK_COLORS.MEDIUM;
                    case 'BAJO':
                    default:
                        return RISK_COLORS.LOW;
                }
            },
        },
        mounted() {

            let elementId = 'gauge-graph';
            let textElementid = 'gauge-text';
            let gaugeValue = this.tachometerValue;
            this.initTachometer(elementId, textElementid, gaugeValue);
            
            this.$store.dispatch(`${storeModule}/LOAD_CORRUPTION_INDEX`, {
              id: this.currentOrganization._id
            });
//            let elementId = 'gauge-graph';
//            let textElementid = 'gauge-text';
//            let gaugeValue = 55;
//            this.initTachometer(elementId, textElementid, gaugeValue);
            
            
//            let otherOrganizationId = this.$route.params.id;
//            this.$store.dispatch(`${storeModule}/LOAD_DETAIL`, {
//                id: this.currentOrganization._id,
//                right: false,
//                url: null,//TODO: implement comparations to other urls
//            });
//            this.$store.dispatch(`${storeModule}/LOAD_DETAIL`, {
//                id: otherOrganizationId,
//                right: true,
//                url: null,//TODO: implement comparations to other urls
//            });
        }
    }
</script>