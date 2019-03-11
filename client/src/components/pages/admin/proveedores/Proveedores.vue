<template>
    <div>
        <BackButton/>
        <button v-on:click="testList">Test list</button>
        <CatalogHeader/>
        <EditableTable/>
    </div>
</template>

<style>
</style>

<script>
    import catalog from '@/mixins/catalog';
    
    let catalogoProveedores = catalog.configure({
        storeModule: 'proveedores'
    });
    
    export default {
        mixins: [catalogoProveedores],
        data () {
            return {
            }
        },
        components: {
        }
    }
</script>