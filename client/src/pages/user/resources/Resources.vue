<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">

                <!--Titulo-->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <a href="/comparations" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir
                        a comparar monitores </a>
                </div>

                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1 m-t-0>
                                Recursos
                            </h1>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">Hemos recopilado los siguientes enlaces de
                            interés en donde puedes obtener mayor información con respecto a los recursos de consulta
                            utilizados y las actividades que realizamos.
                        </p>


                        <div class="row m-t-50">

                            <div class="col-md-7">
                                <div class="box-tabs">
                                    <div class="nav" id="box-tabs" role="tablist" aria-orientation="vertical">
                                        <a class="nav-link active" id="box-tab" data-toggle="pill"
                                           href="#box-content1"
                                           role="tab" aria-controls="box-content1" aria-selected="true">
                                            Articulos </a>
                                        <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content2"
                                           role="tab"
                                           aria-controls="box-content2" aria-selected="false"> Notas </a>
                                        <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content3"
                                           role="tab"
                                           aria-controls="box-content3" aria-selected="false"> Marco Legal </a>
                                        <a class="nav-link" id="box-tab" data-toggle="pill" href="#box-content4"
                                           role="tab"
                                           aria-controls="box-content4" aria-selected="false"> Sitio Web </a>
                                    </div>

                                    <div class="tab-content" id="box-tabsContent">
                                        <div class="tab-pane fade show active" id="box-content1" role="tabpanel"
                                             aria-labelledby="articulo-content">
                                            Contenido 1
                                        </div>
                                        <div class="tab-pane fade" id="box-content2" role="tabpanel"
                                             aria-labelledby="nota-content">
                                            Contenido 2
                                        </div>
                                        <div class="tab-pane fade" id="box-content3" role="tabpanel"
                                             aria-labelledby="marco-content">
                                            Contenido 3
                                        </div>
                                        <div class="tab-pane fade" id="box-content4" role="tabpanel"
                                             aria-labelledby="sitio-content">
                                            Contenido 4
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="filter col-md-5" style="max-height:35px">
                                <div class="filter-container">
                                    <input class="input-search" type="text" name="" value="" placeholder="Escribe el nombre del proveedor"/>
                                </div>
                                <button class="filter-btn" type="button" name="button">Buscar</button>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </section>
    </div>

</template>

<style>
</style>

<script>
    export default {
        data() {
            return {}
        },
        components: {}
    }
</script>
