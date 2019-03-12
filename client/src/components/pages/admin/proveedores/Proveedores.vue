<template>
    <div>
        <BackButton/>
        <CatalogHeader/>
        <EditableTable v-bind:docs="docs" v-bind:total="total" v-bind:storeModule="storeModule"/>
    </div>
</template>

<style>
</style>

<script>
    import catalog from '@/mixins/catalog';
    import { mapState } from 'vuex';
    
    const storeModule = 'proveedores';
    
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