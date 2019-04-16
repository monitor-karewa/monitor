<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Recurso'" :plural="'Recursos'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Recurso'" :plural="'Recursos'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule"
                       :data="doc" :validator="$v">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el título"
                               v-model="$v.doc.title.$model">
                        <label class="fg-label">Título del recurso
                            <small></small>
                            <br>
                            <strong>Introduce el título del recurso</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.title.$invalid && $v.doc.title.$dirty" class="c-error">{{$t(titleErrorMessage, {field:'Título'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la url"
                               @input="delayTouch($v.doc.url)"
                               v-model="$v.doc.url.$model">
                        <label class="fg-label">URL
                            <small></small>
                            <br>
                            <strong>Introduce la url del recurso</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.url.$invalid && $v.doc.url.$dirty" class="c-error">{{$t(urlErrorMessage, {field:'Url'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la clasificación"
                               v-model="$v.doc.classification.$model">
                        <label class="fg-label">Clasificación del recurso
                            <small></small>
                            <br>
                            <strong>Introduce el la clasificación del recurso/</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.classification.$invalid && $v.doc.classification.$dirty" class="c-error">{{$t(classificationErrorMessage, {field:'Clasificación'})}}</span>
                </div>

            </div>
        </NewEntryModal>



        <ModalDanger :id="'modal-delete-entry'"  :title="'Eliminar Recurso'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el usuario del catálogo permanentemente
                <br>
                <strong>¿Estás seguro de eliminarlo?</strong>
            </p>
        </ModalDanger>
        <ModalDefault :title="$t(modalProperties.title)" :store-module="storeModule" :action="modalProperties.action">
            <p class="text-centered">{{$t(modalProperties.message,{ docsUpdatedLength: docsUpdatedLength })}}
                <br/>
                <strong>{{$t(modalProperties.confirmationQuestion)}}</strong>
            </p>
        </ModalDefault>
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import  ModalDefault from "@/components/modals/ModalDefault";
    import { required, url } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';
    const storeModule = 'resources';
    const docName = 'resources.resource';
    const touchMap = new WeakMap();

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule,
                tableHeaders : ['título','clasificación','url','general.created-at'],
                tableColumns: [
                    {label: 'resources.title', visible : true, 'field':'title'},
                    {label: 'resources.classification', visible : true, 'field':'classification'},
                    {label: 'resources.url', visible : true, 'field':'url'},
                    {label: 'general.created-at', visible : true, 'field':'created_at', 'type':'Date'}
                ],
                doc:{
                    title:"",
                    url:"",
                    classification:""
                },
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                }
            }
        },
        validations: {
            doc: {

                title: {required},
                classification: {
                    required,
                    validValue: function (value) {
                        return this.classificationTypes.includes(value);
                    }
                },
                url: {
                    required,
                    url
                }
            }
        },
        computed:{
            ...mapGetters(storeModule,['classificationTypes','docsUpdatedLength']),
            titleErrorMessage(){
                if(!this.$v.doc.title.required){
                    return 'resources.validation.required';
                }
            },
            urlErrorMessage(){
                if(!this.$v.doc.url.url){
                    return 'resources.validation.url';
                }
                if(!this.$v.doc.url.required){
                    return 'resources.validation.required';
                }
            },
            classificationErrorMessage(){
                if(!this.$v.doc.classification.required){
                    return 'resources.validation.required';
                }
                if(!this.$v.doc.classification.validValue){
                    return 'resources.validation.classification';
                }
            }
        },
        components: {
            ModalDanger,
            ModalDefault
        },
        methods:{
            confirmDeletion(){
                this.deleteElementSelected();
            },
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 1000))
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, (data)=>{
                tShow("El recurso fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.doc.title = "";
                this.doc.url = "";
                this.doc.classification = "";
                this.$v.$reset();
                tShow("Elemento Creado!", 'info');
            });
        },
        mounted(){
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
