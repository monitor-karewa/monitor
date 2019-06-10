<template>
    <div>
        <AdminMainSection :storeModule="storeModule">
            <BackButton />
            <CatalogHeader :singular="'Recurso'" :plural="'Recursos'" :store-module="storeModule"/>
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Recurso'" :plural="'Recursos'" :hideEditButton="true"
            />
        </AdminMainSection>

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entry" :requestConfig="requestConfig">
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
                            <strong>Introduce la url del recurso (debe incluir http:// o https://)</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.url.$invalid && $v.entry.url.$dirty" class="c-error">{{$t(urlErrorMessage, {field:'Url'})}}</span>
                </div>
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="$v.entry.classification.$model" class="form-control select selectpicker" id="classification"
                                data-live-search="true"
                                :title="$t('resources.placeholder.classification')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option value="LEGAL_FRAMEWORK"> {{$t('resources.resource-type.marco-legal')}}</option>
                            <option value="ARTICLE"> {{$t('resources.resource-type.articulo')}}</option>
                            <option value="NOTES"> {{$t('resources.resource-type.notas')}}</option>
                            <option value="WEBSITE"> {{$t('resources.resource-type.website')}}</option>
                        </select>
                        <label class="fg-label">{{$t('resources.resource-type.label')}}</label>
                    </div>
                    <span v-if="$v.entry.classification.$invalid  && $v.entry.classification.$dirty && !$v.entry.classification.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('resources.resource-type.label')})}}</span>
                </div>
                <div class="row m-b-50" v-if="entry.classification === 'ARTICLE'">
                    <h1 class="f-20 m-t-0 m-b-10 col-12">Droplet</h1>
                    <div class="col-12">
                        <div class="button-upload">
                            <button type="" class="btn-stroke button-accent">
                                Cargar Imagen
                                <input type="file" id="file" :ref="dataFileRef" v-on:change="handleFileUpload()"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer aditional-text" slot="footer">
                <button type="button" class="btn-stroke button-info_text" @click.prevent="clearEntry()" data-dismiss="modal"> Cancelar </button>
                <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar </button>
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
                    {label: 'resources.classification', visible : true, 'field':'classification', 'type':'i18n'},
                    {label: 'resources.url', visible : true, 'field':'url'},
                    {label: 'general.created-at', visible : true, 'field':'createdAt', 'type':'Date'}
                ],
                entry:{
                    title:"",
                    url:"",
                    classification:""
                },
                requestConfig:{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                },
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                },
                dataFileRef: 'dataFile',
                dataFile: null
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
                    console.log('this.$v.entry.url', this.$v.entry.url);
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
                this.entry = {
                    title:"",
                    url:"",
                    classification:""
                };
                this.$v.$reset();
            },
            handleFileUpload() {

                this.entry.dataField = null;

                if (this.$refs[this.dataFileRef].files && this.$refs[this.dataFileRef].files.length) {
                    this.entry.dataField = this.$refs[this.dataFileRef].files[0];
                }

                if (!this.entry.dataField || !this.entry.dataField.size || !this.entry.dataField.type) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo para la carga de datos`, 'danger');
                    return;
                }
            },
            initAllBusEvents(){
                let busDelete = bus._events[storeModule + events.DELETE_SUCCESS];
                let busCreate = bus._events[storeModule + events.DOC_CREATED];
                let busUpdate = bus._events[storeModule + events.DOC_UPDATED];

                busDelete.splice(1, busDelete.length - 1);
                busCreate.splice(1, busCreate.length - 1);
                busUpdate.splice(1, busUpdate.length - 1);
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
                $('.selectpicker').selectpicker('refresh');
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
            this.initAllBusEvents();
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker();
            });
        }
    }
</script>
