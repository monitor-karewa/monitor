<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Organización'" :plural="'Organizaciones'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Organización'" :plural="'Organizaciones'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre"
                               v-model="doc.name">
                        <label class="fg-label">Nombre de la organización
                            <small></small>
                            <br>
                            <strong>/Introduce el nombre de la organización/</strong>
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
    const storeModule = 'organizations';
    const docName = 'organizations.organization';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : ['suppliers.name','general.created-at'],
                tableColumns: [
                    {label:"organizations.name", field:'name', visible : true },
                    {label:"general.created-at", field:'created_at', visible : true , type:'Date'}
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
