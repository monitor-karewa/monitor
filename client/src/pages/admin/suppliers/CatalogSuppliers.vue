<template>
    <div>
        <BackButton/>
        <CatalogHeader/>
        <EditableTable
            :docs="docs"
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
    import { DELETE_SUCCESS }  from "@/store/events";
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
                tableHeaders : ['suppliers.name','suppliers.rfc','suppliers.notes','general.created-at'],
                tableColumns: [
                    {field:'name'}, {field:'rfc'}, {field:'notes'},{field:'created_at', type:'Date'}
                ]
            }
        },
        components: {
        },
        methods:{
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
