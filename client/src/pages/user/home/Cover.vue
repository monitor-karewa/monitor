<template>
    <div>
        <section id="cover" class="client-cover">
            <div class="cover-container">
                <div class="img-container">
                    <img src="@/assets/images/Backgrounds/test-cover-page.svg" alt="">
                </div>
                <div class="neutral-width">
                    <div class=" info">
                        <h3>{{$t('general.welcome-to')}}</h3>
                        <!--<h1>Monitor <strong>Karewa</strong></h1>-->
                        <h1 v-html="$t('general.app.name.html-strong')"></h1>
                        <div class="divider"></div>
                        <!--<p>Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan en el Municipio de Chihuahua.</p>-->
                        <p>{{$t('general.app.description')}}</p>

                    </div>
                    <div class="horizontal-center m-t-50">
                        <div class="filter-box">
                            <div class="filter">
                                <div class="filter-container row m-0">
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar administración" title="Por administración">
                                                <option>ADMINISTRACIÓN 2016-2018</option>
                                                <option>ADMINISTRACIÓN 2013-2015</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar año" title="Por año…">
                                                <option>2019</option>
                                                <option>2018</option>
                                                <option>2017</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar trimestre" title="Por trimestre…">
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
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar administrativa" title="Por unidad administrativa…">
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
        </section>
    </div>
</template>
<style></style>
<script></script>
