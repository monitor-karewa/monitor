<template>
    <div>
        <BackButton/>
        <CatalogHeader/>
        <EditableTable 
            :docs="docs" 
            :total="total" 
            :store-module="storeModule"
        />
    </div>
</template>

<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    
    const storeModule = 'suppliers';
    
    let catalogoProveedores = catalog.configure({
        storeModule: storeModule
    });
    
    export default {
        mixins: [catalogoProveedores],
        data () {
            return {
                storeModule: storeModule
            }
        },
        components: {
        }
    }
</script>