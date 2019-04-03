<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Proveedor'" :plural="'Proveedores'" />
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Proveedor'"
                    :plural="'Proveedores'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre" v-model="doc.name">
                        <label class="fg-label">Nombre del Cálculo
                            <small></small>
                            <br>
                            <strong>/Introduce el nombre del Proveedor/</strong>
                        </label>
                    </div>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Ej. VECJ880326" v-model="doc.rfc">
                        <label class="fg-label">RFC
                            <small></small>
                            <br>
                            <strong>Indica el RFC del proveedor</strong>
                        </label>
                    </div>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               placeholder="Escribe aquí tus notas sobre el proveedor" v-model="doc.notes">
                        <label class="fg-label">Notas Adicionales
                            <small></small>
                            <br>
                            <strong>Notas adicionales</strong>
                        </label>
                    </div>
                </div>

            </div>
        </NewEntryModal>

        <ModalDanger v-bind:confirm="confirmDeletion"/>
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    const storeModule = 'suppliers';
    const docName = 'suppliers.supplier';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableColumns: [
                    { label: 'suppliers.name', field:'name', visible : true},
                    { label: 'suppliers.rfc', field:'rfc', visible : true},
                    { label: 'suppliers.notes' ,field:'notes', visible : true},
                    { label: 'general.created-at', field:'created_at', type:'Date', visible : true}
                ],
                doc : {}
            }
        },
        components: {
            ModalDanger
        },
        methods:{
            confirmDeletion(){
                this.deleteElementSelected();
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, ()=>{
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
