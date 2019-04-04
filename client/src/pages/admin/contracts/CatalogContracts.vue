<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Contrato'" :plural="'Contratos'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Contrato'" :plural="'Contratos'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Selecciona el proveedor"
                               v-model="doc.supplier">
                        <label class="fg-label">Proveedor
                            <small></small>
                            <br>
                            <strong>Selecciona el proveedor/</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               v-model="doc.administrativeUnit">
                        <label class="fg-label">Nombre del Cálculo
                            <small></small>
                            <br>
                            <strong>Selecciona la unidad administrativa</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el cantidad"
                               v-model="doc.amount">
                        <label class="fg-label">Cantidad
                            <small></small>
                            <br>
                            <strong>Introduce la cantidad</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Selecciona el tipo de procedimiento"
                               v-model="doc.procedureType">
                        <label class="fg-label">Tipo de procedimiento
                            <small></small>
                            <br>
                            <strong>Selecciona el tipo de procedimiento</strong>
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
    const storeModule = 'contracts';
    const docName = 'contracts.contract';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : [
                    'Proveedor',
                    'Unidad Administrativa',
                    'Monto Total',
                    'Tipo de procedimiento',
                    'general.created-at'],
                tableColumns: [
                    {label: "contracts.supplier", visible : true,   field:'supplier'},
                    {label: "contracts.administrativeUnit", visible : true,   field:'administrativeUnit'},
                    {label: "contracts.amount", visible : true,   field:'amount'},
                    {label: "contracts.procedureType", visible : true,   field:'procedureType'},
                    {label: "general.created-at", visible : true,   field:'created_at', type:'Date'}
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
