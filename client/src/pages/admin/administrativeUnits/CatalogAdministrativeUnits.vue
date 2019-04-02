<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Unidad Administrativa'" :plural="'Unidades Administrativas'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Unidad Administrativa'" :plural="'Unidades Administrativas'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre de la unidad administrativa"
                               v-model="doc.name">
                        <label class="fg-label">Nombre de la unidad administrativa
                            <small></small>
                            <br>
                            <strong>/Introduce el nombre del unidad</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce las notas adicionales"
                               v-model="doc.notes">
                        <label class="fg-label">Notas
                            <small></small>
                            <br>
                            <strong>/Introduce anotaciones sobre la unidad/</strong>
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
    import { bus } from '@/main';
    import { DELETE_SUCCESS } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    const storeModule = 'administrativeUnits';
    const docName = 'administrativeUnits.administrativeUnit';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : ['suppliers.name',
                     'suppliers.notes','general.created-at'],
                tableColumns: [
                    {field:'name'}, {field:'notes'},{field:'created_at', type:'Date'}
                ],
                doc : {}
            }
        },
        components: {
            ModalDanger
        },
        methods:{
            confirm(){
                console.log("confirm function");
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
