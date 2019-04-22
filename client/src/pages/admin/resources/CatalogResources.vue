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

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entry">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el título"
                               v-model="entry.title">
                        <label class="fg-label">Título del recurso
                            <small></small>
                            <br>
                            <strong>Introduce el título del recurso</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.title.$invalid && $v.entry.title.$dirty" class="c-error">{{$t(titleErrorMessage, {field:'Título'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la url"
                               @input="delayTouch($v.entry.url)"
                               v-model="$v.entry.url.$model">
                        <label class="fg-label">URL
                            <small></small>
                            <br>
                            <strong>Introduce la url del recurso</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.url.$invalid && $v.entry.url.$dirty" class="c-error">{{$t(urlErrorMessage, {field:'Url'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la clasificación"
                               v-model="$v.entry.classification.$model">
                        <label class="fg-label">Clasificación del recurso
                            <small></small>
                            <br>
                            <strong>Introduce el la clasificación del recurso/</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.classification.$invalid && $v.entry.classification.$dirty" class="c-error">{{$t(classificationErrorMessage, {field:'Clasificación'})}}</span>
                </div>

            </div>
        </ModalEntry>


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
    import * as events from "@/store/events";
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
                entry:{
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
            entry: {

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
                if(!this.$v.entry.title.required){
                    return 'resources.validation.required';
                }
            },
            urlErrorMessage(){
                if(!this.$v.entry.url.url){
                    return 'resources.validation.url';
                }
                if(!this.$v.entry.url.required){
                    return 'resources.validation.required';
                }
            },
            classificationErrorMessage(){
                if(!this.$v.entry.classification.required){
                    return 'resources.validation.required';
                }
                if(!this.$v.entry.classification.validValue){
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
            },
            clearEntry(){
                this.entry = {};
                this.$v.$reset();
            }
        },
        created(){
            bus.$on(storeModule+events.DELETE_SUCCESS, (data)=>{
                tShow("El recurso fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule+events.DOC_CREATED, ()=>{
                this.entry.title = "";
                this.entry.url = "";
                this.entry.classification = "";
                this.$v.$reset();
                tShow("El recurso fue creado correctamente!", 'info');
            });
            bus.$on(storeModule+events.DOC_START_EDIT, (entry)=>{
                this.clearEntry();
                this.entry._id = entry._id;
                this.entry.title = entry.title;
                this.$v.entry.title.$touch();
                this.entry.url = entry.url;
                this.$v.entry.url.$touch();
                this.entry.classification = entry.classification;
                this.$v.entry.classification.$touch();
            });
            bus.$on(storeModule+events.DOC_UPDATED, ()=>{
                tShow("Los cambios en el recurso fueron guardados", 'info');
                this.clearEntry();
            });
            bus.$on(storeModule+events.DOC_START_CREATE, ()=>{
                this.clearEntry();
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
