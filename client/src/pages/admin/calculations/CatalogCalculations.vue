<template>
    <div>
        <AdminMainSection>
            <BackButton/>
            <CatalogHeader :singular="'Cálculo'" :plural="'Cálculo'"/>
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Cálculo'"
                    :plural="'Cálculos'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc" v-bind:validator="$v">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre del cálculo"
                               v-model="$v.doc.name.$model">
                        <label class="fg-label">Nombre del Cálculo
                            <small></small>
                            <br>
                            <strong>Introduce el nombre del Cálculo</strong>
                        </label>
                        <span v-if="$v.doc.name.$invalid && $v.doc.name.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'nombre'})}}</span>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la descripción"
                               v-model="$v.doc.description.$model">
                        <label class="fg-label">Descripción del cálculo
                            <small></small>
                            <br>
                            <strong>Introduce las descripción del cálculo</strong>
                        </label>
                    </div>
                    <span v-if="$v.doc.description.$invalid && $v.doc.description.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'descripción'})}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" value="" v-model="doc.enabled">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.enabled.checkbox-label')}} </span>
                            <p class="fg-label "> {{$t('users.new.enabled.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="input-radio-check col-md-12 p-0">
                            <div class=" check-container col-md-6">
                                <input class="m-t-20" type="radio" value="GENERAL" v-model="$v.doc.type.$model"
                                       name="type" id="one">
                                <span class="role m-t-20"
                                      for="general">{{$t('calculation.new.calculation-type.radio-button.general')}}</span>
                                <p class="fg-label"> {{$t('calculation.new.calculation-type.label')}}
                                    <small></small>
                                    <br>
                                    <strong>{{$t('calculation.new.calculation-type.sub-label')}}</strong>
                                </p>
                            </div>
                            <div class=" check-container col-md-6">
                                <input value="CONTRACT" type="radio" v-model="$v.doc.type.$model" name="role" id="two">
                                <span for="custom">{{$t('calculation.new.calculation-type.radio-button.contract')}}</span>
                            </div>
                            <span v-if="$v.doc.type.$invalid && $v.doc.type.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Tipo de Cálculo'})}}</span>
                        </div>
                    </div>
                </div>

                <div class="floating-text-form">
                    <h1>Fórmula</h1>
                    <p>Formula para obtener el resultado del cálculo</p>
                </div>

                <div class="form-group fg-float dropdown-inside p-t-0">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la fórmula">
                        <div class="dropdown">
                            <button class="btn-stroke xs button-accent" type="button" id="dropdownInput"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Porcentaje <i class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownInput"
                                 x-placement="bottom-end">
                                <ul>
                                    <li>Porcentaje</li>
                                    <li>Porcentaje</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="vertical-center">
                    <div class="form-group fg-float basic-select w-70 m-r-30 p-t-0 m-b-0">
                        <div class="fg-line">
                            <select class="form-control select selectpicker" data-live-search="true"
                                    data-live-search-placeholder="Search placeholder"
                                    title="Agregar variable">
                                <optgroup label="GENERAL">
                                    <option v-for="item in variables">{{item.name}}</option>
                                </optgroup>
                                <optgroup label="CONTRATOS">
                                    <option>Número de contratos</option>
                                    <option>Número de contratos entregados a tiempo</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="mini-buttons">
                        <button class="mini-btn m-l-0">+</button>
                        <button class="mini-btn">-</button>
                        <button class="mini-btn">*</button>
                        <button class="mini-btn m-r-0">/</button>
                    </div>
                </div>

                <div class="m-t-40 m-b-50">
                    <div class="floating-text-form">
                        <h1>Variables usadas</h1>
                        <p>Cálculo para mostrar el indice de perdidas al año</p>
                    </div>
                    <div class="vertical-center m-b-20">
                        <span class="w-15 m-r-10"><strong class="c-accent f-12">$NP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="floating-text-form">
                            <h1>Número de proveedores</h1>
                            <p class="m-b-0">Número total de proveedores disponibles en el catálogo de
                                proveedores</p>
                        </div>
                    </div>
                    <div class="vertical-center">
                        <span class="w-15 m-r-10"><strong class="c-accent f-12">$IRC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="floating-text-form">
                            <h1>Índice de riesgo de corrupción</h1>
                            <p class="m-b-0">Índice de riesgo de que la organización presente casos de
                                corrupción</p>
                        </div>
                    </div>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce las notas adicionales"
                               v-model="doc.notes">
                        <label class="fg-label">Notas del cálculo
                            <small></small>
                            <br>
                            <strong>Introduce las notas adicionales del cálculo</strong>
                        </label>
                    </div>
                </div>


            </div>

        </NewEntryModal>

        <ModalDanger :id="'modal-delete-entry'"  :title="$tc(docName, 1)" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el registro del catálogo permanentemente
                <br>
                <strong>¿Estás seguro de eliminarlo?</strong>
            </p>
        </ModalDanger>

    </div>
</template>


<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import {bus} from '@/main';
    import ModalDanger from "@/components/modals/ModalDanger";
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    const touchMap = new WeakMap();
    import { mapState } from 'vuex';

    const storeModule = 'calculations';
    const docName = 'calculations.calculation';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data() {
            return {
                storeModule: storeModule,
                tableHeaders: ['Nombre', 'Descripción', 'Tipo','Habilitado','Notas','general.created-at'],
                tableColumns: [
                    {label: 'calculations.name', field: 'name', visible:true},
                    {label: 'calculations.description', field: 'description', visible:true},
                    {label: 'calculations.type', field: 'type', visible:true},
                    {label: 'calculations.enabled', field: 'enabled', visible:true},
                    {label: 'calculations.notes', field: 'notes', visible:true},
                    {label: 'general.created-at', field: 'created_at', type: 'Date', visible:true}
                ],
                doc: {
                    name: "",
                    description: "",
                    type: undefined,
                    enabled: false,
                    notes: ""
                }
            }
        },
        validations:{
            doc : {
                name: {
                    required,
                },
                description: {
                    required,
                },
                type: {
                    required,
                }
            }
        },
        components: {
            ModalDanger
        },
        methods: {
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
        created() {
            bus.$on(storeModule + DELETE_SUCCESS, (data) => {
                tShow("El calculo fue eliminado correctamente", 'info');
            }),
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.doc.name= "";
                this.doc.description= "";
                this.doc.type= "";
                this.doc.enabled= "";
                this.doc.notes= "";
                this.$v.$reset();
                tShow("El proveedor fue creado correctamente", 'info');
            });
        },
        mounted() {
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();

                $('#toast-danger').click(function () {
                    tShow("Hubo un error en el proceso. Intenta de nuevo", 'danger');
                });
                $('#toast-info').click(function () {
                    tShow("Se informa del proceso por eso es un info", 'info');
                });
                $('#toast-warning').click(function () {
                    tShow("Complete todos los campos requeridos", 'alert');
                });
                $('#toast-success').click(function () {
                    tShow("Se ha completado el proceso correctamente sadasda adadasd sda dasdasdas dasda dasdasd ad adaspidjdj asoijdas", 'success');
                });
            });
        },
        computed : {
            requiredErrorMessage(){
                return 'calculation.validation.required'
            },
            ...mapState({
                variables: state => state[storeModule].variables
            })
        },
        beforeMount(){
            this.$store.dispatch(`${storeModule}/fetchVariables`)
        }
    }
</script>
