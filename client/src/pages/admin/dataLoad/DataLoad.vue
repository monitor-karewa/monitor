<template>
    <div>

        <AdminMainSection>
            <BackButton />
            <div class="row m-0 w-100">
                <div class="col-12 col-md-7">
                    <div class="card">
                        <div class="floating-text m-b-40">
                            <h1>Carga Rápida </h1>
                            <p>Recomendada para 20 o más registros</p>
                            <button class="btn-stroke button-accent">
                                Cargar Archivo
                                <input type="file" />
                            </button>
                        </div>
                        <div class="floating-text">
                            <h1>¿Cómo funciona?</h1>
                            <a href=""><p><strong class="c-accent">Revisa la guia rápida de uso aquí</strong></p></a>
                        </div>
                        <div class="floating-text">
                            <h1>Descarga la plantilla</h1>
                            <a href=""><p><strong class="c-accent">Descarga la plantilla aquí</strong></p></a>
                        </div>
                        <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-file-table.svg" alt="" />
                    </div>
                </div>
                <div class="col-12 col-md-5">
                    <div class="card">
                        <div class="floating-text">
                            <h1>Carga Manual</h1>
                            <p>Recomendada para 1 o 20 registros</p>
                            <a href="/admin/contracts" class="btn-stroke button-accent"> Ir al catálogo </a>
                        </div>
                        <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-document.svg" alt="" />
                    </div>
                    <div class="card">
                        <div class="floating-text">
                            <h1>Estatus</h1>
                            <p class="f-style-italic m-b-5">
                                Última carga de datos subida el día
                                <br>
                                <strong>25 de julio del 2018</strong>
                                <br>
                                Subida por: <strong>César González</strong>
                            </p>
                        </div>
                        <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-information-outline.svg" alt="" />
                    </div>
                </div>
            </div>
        </AdminMainSection>

    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';

    //TODO Remove or change initialization because THIS IS NOT A CATALOG ()
    let baseCatalog = catalog.configure({
        storeModule: 'DataLoad',
        docName: 'dataLoad.DataLoad'
    });

    export default {
        mixins : [baseCatalog],
        data () {
            return {}
        },
        components: {
        },
        methods:{
        },
        created(){
        },
        mounted(){
        }
    }
</script>
