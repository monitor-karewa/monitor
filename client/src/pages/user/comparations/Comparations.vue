<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">
                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex" v-if="!comparisonActive">
                    <a href="/" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir a Índice de
                        corrupción </a>
                    <a href="/contracts" class="btn-outline text-unset m-auto-left"> Ir a Recursos <i
                            class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i></a>
                </div>

                <div class="col-12 p-0 m-t-20 m-b-20 d-flex" v-if="comparisonActive">
                    <a v-on:click.stop="comparisonActive = false" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Regresar a Selección de Monitor </a>
                </div>
            </div>

            <div class="col-12 p-0">
                <div class="card">
                    <div class="floating-title-panel">
                        <h1 v-if="!comparisonActive">
                            Comparar Monitores
                        </h1>
                        <h1 v-if="comparisonActive">
                            Comparación
                        </h1>
                        <div class="side-right">
                            <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                    class="zmdi zmdi-share"></i> Compartir</a>
                            <a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i
                                    class="zmdi zmdi-download"></i> Descargar comparación</a>
                        </div>
                    </div>


                    <p class="f-14 c-plain_text principal-font-regular" v-if="!comparisonActive">Seleccionar un monitor con el cual comparar
                        <strong class="principal-font-semibold">Monito Karewa del Municipio de Chihuahua</strong></p>

                    <p class="f-14 c-plain_text principal-font-regular" v-if="comparisonActive">A continuación te presentamos la comparación entre
                        <strong class="principal-font-semibold">Monitor Karewa y Monitor Juárez:</strong></p>


                    <div class="filter" v-if="!comparisonActive">
                        <div class="filter-container">
                            <input class="input-search" type="text" name="" value=""
                                   placeholder="Escribe el nombre del monitor"/>
                        </div>
                        <button class="filter-btn" type="button" name="button">Buscar</button>
                    </div>

                    <br/>

                    <div class="row" v-if="!comparisonActive">
                        <div class="col-12 col-md-4 col-lg-3" v-for="monitor in monitores">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label :style="{color:monitor.color}">{{monitor.abrev}}</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa {{monitor.name}}</small>
                                <a v-on:click.stop="comparisonActive = true" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>


                        <!--<div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #393a3d;">Monterrey</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #007ac9;">Tijuana</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3">
                            <div class="card-compare">
                                <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                                <div class="logo-full">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo"/>
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #edae44;">Parral</label>
                                    </div>
                                </div>
                                <small>Monitor Karewa Cd. Juárez</small>
                                <a href="" class="btn-stroke xs button-primary" tabindex="">Comparar</a>
                            </div>
                        </div>-->
                    </div>

                    <br/>

                    <div class="panel-table" v-if="comparisonActive">
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
                                        <label style="color: #19babd;">Karewa</label>
                                    </div>
                                </div>
                                <a href="" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>
                            </div>
                            <div class="col-4 p-30">
                                <div class="logo-full lg">
                                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo">
                                    <div>
                                        <small>Monitor</small>
                                        <label style="color: #b32530;">CD. JUÁREZ</label>
                                    </div>
                                </div>
                                <a href="" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>
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
                                        <div class="gauge">
                                            <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                                 alt="">
                                            <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png"
                                                 alt="">
                                            <canvas id="gauge-graph-test1"></canvas>
                                            <div class="range">
                                                <img class="" src="@/assets/images/All-Icons/tachometer-range.svg"
                                                     alt="">
                                            </div>

                                        </div>
                                        <div class="text">
                                            <div id="gauge-text-test1">0</div>
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
                                            <canvas id="gauge-graph-test2"></canvas>
                                            <div class="range">
                                                <img class="" src="@/assets/images/All-Icons/tachometer-range.svg"
                                                     alt="">
                                            </div>

                                        </div>
                                        <div class="text">
                                            <div id="gauge-text-test2">0</div>
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
                     <template id="help-tooltip-totales">
                      <div class="help-tooltip-div">
                        <!--<label>¿Qué significa esto?</label>
                        <p>TEXTO FALTANTE</p>-->
                      </div>
                     </template>
                  </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Licitación
                                    Pública </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $1,055,177,509.74 = 56% </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $1,553,903,392.98 = 68% </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Por
                                    Invitación </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $149,337,687.59 = 16% </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $94,761,976.88 = 4% </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0">
                                    Adjudicación Directa </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $1,098,345,291.46 = 27% </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $606,038,977.48 = 28% </p>
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
                                    $2,302,860,488.81 </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0">
                                    $2,254,704,347.36 </p>
                            </div>


                            <span class="border-lines col-12">
                    <label>Contratos dados de la administración 2016-2018 <i id="contratos-tooltip"
                                                                             class="zmdi zmdi-help-outline"></i></label>
                                <!-- TOOLTIP -->
                     <template id="help-tooltip-contratos">
                      <div class="help-tooltip-div">
                        <label>¿Qué significa esto?</label>
                        <p>TEXTO FALTANTE</p>
                      </div>
                     </template>
                  </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    DE LICITACIÓN PÚBLICA </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    163 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    294 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    POR INVITACIÓN </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    68 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    59 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    DE ADJUDICACIÓN DIRECTA </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    1,537 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    328 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS
                                    DE ADJUDICACIÓN DIRECTA </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    1,537 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    328 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20"></div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <div class="divider"></div>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <div class="divider"></div>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Contratos
                                    en total </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0">
                                    1,768 contratos </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0"> 681
                                    contratos </p>
                            </div>


                            <span class="border-lines col-12">
                    <label>Datos generales <i id="datos-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                <!-- TOOLTIP -->
                     <template id="help-tooltip-datos">
                      <div class="help-tooltip-div">
                        <label>¿Qué significa esto?</label>
                        <p>TEXTO FALTANTE</p>
                      </div>
                     </template>
                  </span>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Población
                                    total </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    809,232 (2010) </p>
                            </div>
                            <div class="col-4 p-l-20 p-r-20 p-t-20">
                                <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0">
                                    1,391,180 (2015) </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <more-info></more-info>


        </section>
    </div>
</template>

<style>
</style>

<script>
    import MoreInfo from '@/components/general/MoreInfo';

    export default {

        data() {
            return {
                comparisonActive: false,
                monitores: [
                    {
                        name: "Cd. Juarez",
                        abrev: "Cd. Juarez",
                        color: "#b32530",
                    },
                    {
                        name: "Monterrey",
                        abrev: "Monterrey",
                        color: "#393a3d",
                    },
                    {
                        name: "Tijuana",
                        abrev: "Tijuana",
                        color: "#007ac9",
                    },
                    {
                        name: "Parral",
                        abrev: "Parral",
                        color: "#edae44",
                    },
                    {
                        name: "Mérida",
                        abrev: "Mérida",
                        color: "#13419e",
                    },
                    {
                        name: "Guadalajara",
                        abrev: "Guadalajara",
                        color: "#2cbcb6",
                    },
                    {
                        name: "Ciudad de México",
                        abrev: "CDMX",
                        color: "#23b10d",
                    },
                    {
                        name: "Toluca",
                        abrev: "Toluca",
                        color: "#cd2122",
                    },
                    {
                        name: "Morelia",
                        abrev: "Morelia",
                        color: "#8b1c40",
                    },
                    {
                        name: "Cuernavaca",
                        abrev: "Cuernavaca",
                        color: "#de1982",
                    },
                    {
                        name: "La Paz",
                        abrev: "La Paz",
                        color: "#676739",
                    },
                    {
                        name: "León",
                        abrev: "León",
                        color: "#f6901e",
                    }
                ]
            }
        },
        components: {
            MoreInfo
        }
    }
</script>
