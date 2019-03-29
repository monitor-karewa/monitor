<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">
                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <a href="/" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir a Inicio </a>
                    <a href="" class="btn-outline text-unset m-auto-left"> Ir a Contratos <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i></a>
                </div>
                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1 m-t-0>
                                Proveedores
                            </h1>
                            <div class="side-right">
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>
                                <a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i
                                        class="zmdi zmdi-download"></i> DESCARGAR DATOS DE PROVEEDORES</a>
                            </div>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">Aquí podrás encontrar la lista de todos los
                            proveedores que han sido contratados por el
                            <strong class="principal-font-semibold">Municipio de Chihuahua</strong></p>
                        <div class="m-t-50">
                            <div class="filter-box">
                                <div class="filter">
                                    <div class="filter-container row m-0">
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar administración"
                                                        title="Por administración">
                                                    <option>ADMINISTRACIÓN 2016-2018</option>
                                                    <option>ADMINISTRACIÓN 2013-2015</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar año" title="Por año…">
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar trimestre"
                                                        title="Por trimestre…">
                                                    <optgroup label="2018">
                                                        <option>3º 2018</option>
                                                        <option>2º 2018</option>
                                                        <option>1º 2018</option>
                                                    </optgroup>
                                                    <optgroup label="2017">
                                                        <option>3º 2017</option>
                                                        <option>2º 2017</option>
                                                        <option>1º 2017</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                            <div class="fg-line m-0">
                                                <select class="form-control select selectpicker" data-live-search="true"
                                                        data-live-search-placeholder="Buscar administrativa"
                                                        title="Por unidad administrativa…">
                                                    <option>ATENCIÓN CIUDADANA</option>
                                                    <option>CENTRO DE ATENCIÓN Y PREVENCIÓN PSICOLÓGICAS</option>
                                                    <option>COMUNICACIÓN SOCIAL</option>
                                                    <option>CONSEJO DE URBANIZACIÓN</option>
                                                    <option>DESARROLLO ECONOMICO Y TURÍSTICO</option>
                                                    <option>DESARROLLO HUMANO Y EDUCACIÓN</option>
                                                    <option>DESARROLLO INTEGRAL DE LA FAMILIA</option>
                                                    <option>DESARROLLO RURAL</option>
                                                    <option>DESARROLLO URBANO Y ECOLOGÍA</option>
                                                    <option>DESPACHO DE LA PRESIDENCIA</option>
                                                    <option>DIRECCIÓN DE OBRAS PUBLICAS MUNICIPALES</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="filter-btn" type="button" name="button">Filtrar</button>
                                </div>
                                <div class="m-t-20 float-left">
                                    <span class="tag-title">Filtros:</span>
                                    <div class="tag">
                      <span class="">
                        DIRECCIÓN DE OBRAS PÚBLICAS MUNICIPALES
                      </span>
                                        <button>
                                            <i class="zmdi zmdi-close"></i>
                                        </button>
                                    </div>
                                    <div class="tag">
                      <span class="">
                        Béisbol
                      </span>
                                        <button>
                                            <i class="zmdi zmdi-close"></i>
                                        </button>
                                    </div>
                                    <div class="tag">
                      <span class="">
                        Béisbol
                      </span>
                                        <button>
                                            <i class="zmdi zmdi-close"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cantidades -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color accent">
                            <span>1,768</span>
                            <label>CONTRATOS EN TOTAL</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color red">
                            <span>163</span>
                            <label>CONTRATOS POR LICITACIÓN PÚBLICA</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color yellow">
                            <span>68</span>
                            <label>CONTRATOS POR INVITACIÓN</label>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color green">
                            <span>1537</span>
                            <label>CONTRATOS POR ADJUDICACIÓN DIRECTA</label>
                        </div>
                    </div>
                </div>

                <!-- Tabla de proveedores -->
                <div class="row">
                    <div class="col-12">
                        <div class="card regular-table">
                            <div class="default-scrollbar ">
                                <table class="table form-table m-b-0">
                                    <thead>
                                    <tr>
                                        <th class="">NOMBRE DEL PROVEEDOR</th>
                                        <th class="text-align-r">LICITACIÓN PÚBLICA</th>
                                        <th class="text-align-r">POR INVITACIÓN</th>
                                        <th class="text-align-r">ADJ. DIRECTA</th>
                                        <th class="text-align-r">MONTO TOTAL<i
                                                class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>
                                        <th class="text-align-c">OPCIONES</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="supplier in suppliers">
                                        <td class="">{{supplier.name}}</td>
                                        <td class="text-align-r">{{supplier.licitacionPublica}}</td>
                                        <td class="text-align-r">{{supplier.porInvitacion}}</td>
                                        <td class="text-align-r">{{supplier.adjudicacionDirecta}}</td>
                                        <td class="text-align-r c-accent">{{supplier.montoTotal}}</td>
                                        <td class="text-align-r">
                                            <a href="/supplier" class="btn-stroke button-primary table-btn-stroke">Ver más</a>
                                        </td>
                                    </tr>
                                    <tr class="bgm-cards">
                                        <td class="p-t-15 p-b-10 f-bold">TOTAL</td>
                                        <td class="text-align-r p-t-15 p-b-15">$1,055,177,509.74</td>
                                        <td class="text-align-r p-t-15 p-b-15">$149,337,687.59</td>
                                        <td class="text-align-r p-t-15 p-b-15">$1,098,345,291.46</td>
                                        <td class="text-align-r p-t-15 p-b-15 c-accent">$2,302,860,488.81</td>
                                        <td class="text-align-r p-t-15 p-b-15"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <more-info></more-info>

            </div>
        </section>
    </div>
</template>

<style scoped>
</style>

<script>
    import MoreInfo from '@/components/general/MoreInfo';

    export default {
        data() {
            return {
                suppliers: [
                    {
                        name: "CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA METABOLISMO MINERAL COMMSA SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "CENTRO PARA EL ESTUDIO DE LA OSTEOPOROSIS MENOPAUSIA METABOLISMO MINERAL COMMSA SA DE CV",
                        montoTotal: "$267,438,726.85"
                    },
                    {
                        name: "MERP EDIFICACIONES Y TERRACERIAS SA DE CV",
                        licitacionPublica: "$83,760,842.79",
                        porInvitacion: "$39,924,791.80",
                        adjudicacionDirecta: "$24,085,369.24",
                        montoTotal: "$147,771,003.84"
                    },
                    {
                        name: "GCC comercial SA DE CV",
                        licitacionPublica: "$102,866,337.58",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "$17,178.62",
                        montoTotal: "$102,883,516.20"
                    },
                    {
                        name: "CONSTRUCCIONES MARRO SA DE CV",
                        licitacionPublica: "$23,980,030.81",
                        porInvitacion: "$2,398,871.43",
                        adjudicacionDirecta: "$31,458,674.04",
                        montoTotal: "$57,837,576.28"
                    },
                    {
                        name: "TEPORACA CONSTRUCTORA SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$$4,399,802.55",
                        adjudicacionDirecta: "$31,369,617.86",
                        montoTotal: "$35,769,420.41"
                    },
                    {
                        name: "URBANIZADORA Y EDIFICADORA DE MEXICO SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "$27,779,997.20",
                        montoTotal: "$27,779,997.20"
                    },
                    {
                        name: "JOEL OSCAR ESPARZA GONZALEZ",
                        licitacionPublica: "$19,248,367.08",
                        porInvitacion: "$4,589,931.52",
                        adjudicacionDirecta: "$1,159,603.18",
                        montoTotal: "$24,997,901.77"
                    },
                    {
                        name: "STAHL CONSTRUCCIONES SA DE CV",
                        licitacionPublica: "$12,807,926.08",
                        porInvitacion: "$5,406,479.39",
                        adjudicacionDirecta: "$5,418,698.23",
                        montoTotal: "$23,633,103.70"
                    },
                    {
                        name: "DELICIAS TRANSPORTE DE ASFALTO SA DE CV",
                        licitacionPublica: "$0.00",
                        porInvitacion: "$5,527,786.63",
                        adjudicacionDirecta: "$15,389,188.93",
                        montoTotal: "$20,916,975.56"
                    },
                    {
                        name: "IVAN NOE SIMENTAL ORTEGA",
                        licitacionPublica: "$19,762,898.31",
                        porInvitacion: "$0.00",
                        adjudicacionDirecta: "$19,762,898.31",
                        montoTotal: "$19,762,898.31"
                    },
                ]
            }
        },
        components: {
            MoreInfo
        }
    }
</script>
