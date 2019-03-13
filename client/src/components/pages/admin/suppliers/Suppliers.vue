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
    import catalog from '@/mixins/catalog.mixin';
    import { mapState } from 'vuex';
    
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