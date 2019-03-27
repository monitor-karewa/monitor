<template>
    <div>
        <BackButton/>
        <CatalogHeader/>
        <EditableTable
            :docs="docs"
            :deleteEvent="deleteEvent"
            :tableHeaders="tableHeaders"
            :tableColumns="tableColumns"
            :store-module="storeModule"
        />
    </div>
</template>

<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    const storeModule = 'suppliers';
    const docName = 'suppliers.supplier';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
        //add parameter for event delete
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : ['suppliers.name','suppliers.rfc','suppliers.notes','general.created-at'],
                tableColumns: [
                    {field:'name'}, {field:'rfc'}, {field:'notes'},{field:'created_at', type:'Date'}
                ],
                deleteEvent: 'deleteSupplier'
            }
        },
        components: {
        },
        methods:{
        },
        created(){
            bus.$on(this.deleteEvent, (data)=>{
                this.deleteElement(data);
                tShow("Elemento Eliminado", 'info');
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
