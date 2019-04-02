<template>
    <div>
        <AdminMainSection>
            <BackButton/>
            <CatalogHeader :singular="'Cálculo'" :plural="'Cálculo'"/>
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Cálculo'" :plural="'Cálculo'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el símbolo del cálculo"
                               v-model="doc.symbol">
                        <label class="fg-label">Símbolo del Cálculo
                            <small></small>
                            <br>
                            <strong>Introduce el símbolo del Cálculo</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el título"
                               v-model="doc.title">
                        <label class="fg-label">Título del Cálculo
                            <small></small>
                            <br>
                            <strong>/Introduce el título del cálculo/</strong>
                        </label>
                    </div>
                </div>
                <div>
                    <div class="form-group fg-float subtitle">
                        <div class="fg-line basic-input">
                            <input type="text" class="form-control fg-input" placeholder="Introduce la descripción"
                                   v-model="doc.description">
                            <label class="fg-label">Descripción del Cálculo
                                <small></small>
                                <br>
                                <strong>Introduce la descripción del cálculo</strong>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce las notas adicionales"
                               v-model="doc.classification">
                        <label class="fg-label">Notas del cálculo
                            <small></small>
                            <br>
                            <strong>Introduce las notas adicionales del cálculo</strong>
                        </label>
                    </div>
                </div>

            </div>

        </NewEntryModal>


        <ModalDanger v-bind:confirm="confirm"/>
    </div>
</template>


<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import {bus} from '@/main';
    import {DELETE_SUCCESS} from "@/store/events";
    import ModalDanger from "@/components/modals/ModalDanger";

    const storeModule = 'calculations';
    const docName = 'calculations.calculation';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data() {
            return {
                storeModule: storeModule,
                tableHeaders: ['Símbolo', 'Título', 'Descripción','Notas','general.created-at'],
                tableColumns: [
                    {field: 'symbol'}, {field: 'title'}, {field: 'description'},{field: 'notas'} , {field: 'created_at', type: 'Date'}
                ],
                doc: {}
            }
        },
        components: {
            ModalDanger
        },
        methods: {
            confirm() {
                console.log("confirm function");
            }
        },
        created() {
            bus.$on(storeModule + DELETE_SUCCESS, (data) => {
                tShow("Elemento Eliminado!!", 'info');
            })
        },
        mounted() {
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();

                $('#toast-danger').click(function () {
                    tShow("Hubo un error en el proceso. Intenta de nuevo", 'danger');
                });
                $('#toast-info').click(function () {
                    tShow("Se informa del proceso por eso es un info", 'info');
                });
                $('#toast-warning').click(function () {
                    tShow("Complete todos los campos requeridos", 'alert');
                });
                $('#toast-success').click(function () {
                    tShow("Se ha completado el proceso correctamente sadasda adadasd sda dasdasdas dasda dasdasd ad adaspidjdj asoijdas", 'success');
                });
            });
        }
    }
</script>
