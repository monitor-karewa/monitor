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
    const storeModule = 'suppliers';
    const docName = 'suppliers.supplier';

    let catalogoProveedores = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [catalogoProveedores],
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
        }
    }
</script>
