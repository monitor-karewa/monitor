<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Recurso'" :plural="'Recursos'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Recurso'" :plural="'Recursos'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el título"
                               v-model="doc.title">
                        <label class="fg-label">Título del recurso
                            <small></small>
                            <br>
                            <strong>Introduce el título del recurso</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la url"
                               v-model="doc.url">
                        <label class="fg-label">URL
                            <small></small>
                            <br>
                            <strong>Introduce la url del recurso</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la clasificación"
                               v-model="doc.classification">
                        <label class="fg-label">Clasificación del recurso
                            <small></small>
                            <br>
                            <strong>Introduce el la clasificación del recurso/</strong>
                        </label>
                    </div>
                </div>

            </div>
        </NewEntryModal>



        <ModalDanger :title="'Eliminar Recurso'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el usuario del catálogo permanentemente
                <br>
                <strong>¿Estás seguro de eliminarlo?</strong>
            </p>
        </ModalDanger>
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    const storeModule = 'resources';
    const docName = 'resources.resource';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule,
                tableHeaders : ['título','clasificación','url','general.created-at'],
                tableColumns: [
                    {field:'title'}, {field:'classification'}, {field:'url'},{field:'created_at', type:'Date'}
                ],
                doc : {}
            }
        },
        components: {
            ModalDanger
        },
        methods:{
            confirmDeletion(){
                tShow("El recurso fue eliminado correctamente", 'info');
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, (data)=>{
                tShow("Elemento Eliminado!!", 'info');
            })
        },
        mounted(){
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
