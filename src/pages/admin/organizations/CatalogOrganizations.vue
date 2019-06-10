<template>
    <div>
        <AdminMainSection :storeModule="storeModule">
            <BackButton />
            <CatalogHeader :singular="'Organización'" :plural="'Organizaciones'" :store-module="storeModule"/>
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Organización'"
                    :plural="'Organizaciones'"
            />
        </AdminMainSection>

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entry">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre" v-model="entry.name">
                        <label class="fg-label">Nombre de la organización
                            <small></small>
                            <br>
                            <strong>Introduce el nombre de la organización</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.name.$invalid && $v.entry.name.$dirty" class="c-error">{{$t(nameErrorMessage, {field:'Nombre', maxLength:$v.entry.name.$params.maxLength.max})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre corto" v-model="$v.entry.shortName.$model">
                        <label class="fg-label">Nombre corto de la organización
                            <small></small>
                            <br>
                            <strong>Introduce el nombre corto de la organización (máximo 12 caracteres)</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.shortName.$invalid && $v.entry.shortName.$dirty" class="c-error">{{$t(shortNameErrorMessage, {field:'Nombre corto', maxLength:$v.entry.shortName.$params.maxLength.max, minLength:$v.entry.shortName.$params.minLength.min})}}</span>
                </div>

            </div>
            <div class="modal-footer aditional-text" slot="footer">
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal"> Cancelar </button>
                <button type="submit"  class="btn-raised button-accent m-l-15"> Guardar </button>
            </div>
        </ModalEntry>

        <ModalDanger :id="'modal-delete-entry'" :title="'Eliminar Organización'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará a la organización del catálogo permanentemente
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
    const storeModule = 'organizations';
    const docName = 'organizations.organization';
    const touchMap = new WeakMap();
    import { required, maxLength, minLength } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableColumns: [
                    {label:"organizations.name", field:'name', visible : true },
                    {label:"organizations.short-name", field:'shortName', visible : true },
                    {label:"general.created-at", field:'createdAt', visible : true , type:'Date'}
                ],
                entry:{
                    name:0,
                    shortName:0
                },
                modalProperties:{
                    title:"general.modal-editable-table.title",
                    message:"general.modal-editable-table.message",
                    confirmationQuestion:"general.modal-editable-table.confirmation-question",
                    action:"saveDocsUpdated"
                }
            }
        },
        computed:{
            nameErrorMessage(){
                if(!this.$v.entry.name.required){
                    return 'organizations.validation.required';
                }
                if(!this.$v.entry.name.maxLength){
                    return 'organizations.validation.max.name';
                }
            },
            shortNameErrorMessage(){
                if(!this.$v.entry.shortName.required){
                    return 'organizations.validation.required';
                }
                if(!this.$v.entry.shortName.maxLength){
                    return 'organizations.validation.max.short-name';
                }
                if(!this.$v.entry.shortName.minLength){
                    return 'organizations.validation.min.short-name';
                }
            },
            ...mapGetters(storeModule,['docsUpdatedLength'])
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
                    name:"",
                    shortName:""
                };
                this.$v.$reset();
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
            bus.$on(storeModule+events.DELETE_SUCCESS, () => {
                tShow("La organización fue eliminada correctamente", 'info');
            });
            bus.$on(storeModule+events.DOC_CREATED, () => {
                this.clearEntry();
                tShow("La organización fue creada correctamente", 'info');
            });
//            bus.$on(storeModule+events.DOC_START_EDIT, (entry)=>{
//                this.entry.name = entry.name;
//                this.$v.entry.name.$touch();
//                
//                this.entry.shortName = entry.shortName;
//                this.$v.entry.shortName.$touch();
//            });
            bus.$on(storeModule+events.DOC_UPDATED, ()=>{
                tShow("Los cambios en la organización fueron guardados", 'info');
                this.clearEntry();
            });
            bus.$on(storeModule+events.DOC_START_CREATE, ()=>{
                this.clearEntry();
            });
            bus.$on(storeModule+events.DOC_START_EDIT, (entry)=>{
                this.clearEntry();
                this.entry._id = entry._id;
                
                this.entry.name = entry.name;
                this.$v.entry.name.$touch();
                
                this.entry.shortName = entry.shortName || "";
                this.$v.entry.shortName.$touch();
            });
        },
        mounted(){
            this.initAllBusEvents();
        },
        validations:{
            entry: {
                name: {
                    required,
                    maxLength: maxLength(100)
                },
                shortName: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(12)
                }
            }
        }
    }
</script>
