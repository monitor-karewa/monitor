<template>
    <section class="client-content">
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
                        <div class="side-right">
                            <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                    class="zmdi zmdi-share"></i> Compartir</a>
                            <a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i
                                    class="zmdi zmdi-download"></i> Descargar comparación</a>
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
                                <router-link to="/" class="btn-stroke button-primary text-unset">Ir a Inicio</router-link>
                            </div>
                            <div class="col-4 p-30">
                                <div class="logo-full lg">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo">
                                    <div>
                                        <small>Monitor</small>
                                        <label :style="{color: detailRight.organization.color}">{{detailRight.organization.shortName}}</label>
                                    </div>
                                </div>
                                <router-link to="/" class="btn-stroke button-primary text-unset" tabindex="">
                                    Ir a Inicio
                                </router-link>
                            </div>


                            <span class="border-lines col-12">
                    <label>Índice de corrupción <i id="indice-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                <!-- TOOLTIP -->
                                <!--<template id="help-tooltip-indice">
                                 <div class="help-tooltip-div">
                                   <label>¿Qué significa esto?</label>
                                   <p>Es la sumatoria de los montos dados por cada contrato a lo largo de la administración 2016-2018.</p>
                                   <p>Estos se dividen en 3 tipos de procedimientos de los contratos, los cuales son: <i>Licitación pública, Por invitación y Adquisición directa.</i></p>
                                   <p class="m-b-0">Puedes consultar esta y más información en la sección de <i>Ayuda.</i></p>
                                 </div>
                                </template>-->
                  </span>
                            <div class="col-4 p-30 vertical-center">
                                <p class="f-12 c-plain_text principal-font-medium text-upper m-b-0 vertical-center">
                                    Tacómetro <i id="tacometro-tooltip"
                                                 class="zmdi zmdi-help-outline c-info f-18 m-l-5"></i></p>
                                <!-- TOOLTIP -->
                                <template id="help-tooltip-tacometro">
                                    <div class="help-tooltip-div">
                                        <!--<label>¿Qué significa esto?</label>-->
                                        <!--<p>TEXTO FALTANTE</p>-->
                                    </div>
                                </template>
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
                                        <div class="prob">text</div>
                                    </div>

                                </div>
                                <a href="" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se
                                    calcula?</a>
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
                                            <div id="gauge-text-right">25</div>
                                            %
                                        </div>
                                        <div class="prob">text</div>
                                    </div>

                                </div>
                                <a href="" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se
                                    calcula?</a>
                            </div>


                            <span class="border-lines col-12">
                    <label>Montos totales de la administración 2016-2018 <i id="totales-tooltip"
                                                                            class="zmdi zmdi-help-outline"></i></label>
                                <!-- TOOLTIP -->
                     <!--<template id="help-tooltip-totales">-->
                      <!--<div class="help-tooltip-div">-->
                        <!--&lt;!&ndash;<label>¿Qué significa esto?</label>-->
                        <!--<p>TEXTO FALTANTE</p>&ndash;&gt;-->
                      <!--</div>-->
                     <!--</template>-->
                  </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Licitación
                                    Pública </p>
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
                    <label>Contratos dados de la administración 2016-2018 <i id="contratos-tooltip"
                                                                             class="zmdi zmdi-help-outline"></i></label>
                                <!-- TOOLTIP -->
                     <!--<template id="help-tooltip-contratos">-->
                      <!--<div class="help-tooltip-div">-->
                        <!--<label>¿Qué significa esto?</label>-->
                        <!--<p>TEXTO FALTANTE</p>-->
                      <!--</div>-->
                     <!--</template>-->
                  </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    DE LICITACIÓN PÚBLICA </p>
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
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    POR INVITACIÓN </p>
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
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    DE ADJUDICACIÓN DIRECTA </p>
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
                    </div>
                </div>
            </div>


            <more-info></more-info>

        </div>
    </section>
</template>

<script>
    import MoreInfo from '@/components/general/MoreInfo';

    import {mapState} from 'vuex';
    import {Gauge} from 'gaugeJS';

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
            [0.0, "#6ec284"], [0.50, "#6ec284"],
            [0.51, "#ffc043"], [0.75, "#ffc043"],
            [0.76, "#eb6262"], [1.0, "#eb6262"]
        ]
    };

    export default {

        data() {
            return {
            }
        },
        components: {
            MoreInfo
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

            }
        },
        watch: {
            detailLeft(_detailLeft) {
                let elementId = 'gauge-graph-left';
                let textElementid = 'gauge-text-left';
                let gaugeValue = 0;

                if (_detailLeft && _detailLeft.corruptionIndex && _detailLeft.corruptionIndex.result) {
                    gaugeValue = _detailLeft.corruptionIndex.result;
                }
                this.initTachometer(elementId, textElementid, gaugeValue);
            },
            detailRight(_detailRight) {
                let elementId = 'gauge-graph-right';
                let textElementid = 'gauge-text-right';
                let gaugeValue = 0;

                if (_detailRight && _detailRight.corruptionIndex && _detailRight.corruptionIndex.result) {
                    gaugeValue = _detailRight.corruptionIndex.result;
                }
                this.initTachometer(elementId, textElementid, gaugeValue);
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



        }
    }
</script>


<style scoped>

</style>
