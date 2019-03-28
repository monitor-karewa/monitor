<template>
    <!--<div>-->
        <!--<AdminMainSection>-->
            <!--<BackButton/>-->
            <!--<CatalogHeader/>-->
            <!--<EditableTable-->
                    <!--:docs="docs"-->
                    <!--:tableHeaders="tableHeaders"-->
                    <!--:tableColumns="tableColumns"-->
                    <!--:store-module="storeModule"-->
            <!--/>-->
        <!--</AdminMainSection>-->

        <!--<NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">-->
            <!--<div>-->
                <!--<div class="form-group fg-float subtitle">-->
                    <!--<div class="fg-line basic-input">-->
                        <!--<input type="text" class="form-control fg-input" placeholder="Introduce el nombre" v-model="doc.name">-->
                        <!--<label class="fg-label">Nombre del Cálculo-->
                            <!--<small></small>-->
                            <!--<br>-->
                            <!--<strong>/Introduce el nombre del Proveedor/</strong>-->
                        <!--</label>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="form-group fg-float subtitle">-->
                    <!--<div class="fg-line basic-input">-->
                        <!--<input type="text" class="form-control fg-input" placeholder="Ej. VECJ880326" v-model="doc.rfc">-->
                        <!--<label class="fg-label">RFC-->
                            <!--<small></small>-->
                            <!--<br>-->
                            <!--<strong>Indica el RFC del proveedor</strong>-->
                        <!--</label>-->
                    <!--</div>-->
                <!--</div>-->


                <!--<div class="form-group fg-float subtitle">-->
                    <!--<div class="fg-line basic-input">-->
                        <!--<input type="text" class="form-control fg-input"-->
                               <!--placeholder="Escribe aquí tus notas sobre el proveedor" v-model="doc.notes">-->
                        <!--<label class="fg-label">Notas Adicionales-->
                            <!--<small></small>-->
                            <!--<br>-->
                            <!--<strong>Notas adicionales</strong>-->
                        <!--</label>-->
                    <!--</div>-->
                <!--</div>-->

            <!--</div>-->
        <!--</NewEntryModal>-->
    <!--</div>-->
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
                ],
                doc : {}
            }
        },
        components: {},
        methods: {
            save(){
                //save new from modal
                console.log("Suppliers#save");
                console.log('doc.name --> ' + doc.name);
            },
            edit(doc){
                //Edit from table logic
            }
        }
    }
</script>
