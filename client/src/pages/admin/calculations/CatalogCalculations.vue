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

        <ModalEntry :storeModule="storeModule" :validator="$v" :entry="entry">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el nombre del cálculo"
                               v-model="entry.name">
                        <label class="fg-label">Nombre del Cálculo
                            <small></small>
                            <br>
                            <strong>Introduce el nombre del Cálculo</strong>
                        </label>
                        <span v-if="$v.entry.name.$invalid && $v.entry.name.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'nombre'})}}</span>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la descripción"
                               v-model="entry.description">
                        <label class="fg-label">Descripción del cálculo
                            <small></small>
                            <br>
                            <strong>Introduce la descripción del cálculo</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.description.$invalid && $v.entry.description.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'descripción'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce la abreviación del cálcuo"
                               v-model="$v.entry.abbreviation.$model" @input="delayTouch($v.entry.abbreviation)">
                        <label class="fg-label">Abreviación del cálculo
                            <small></small>
                            <br>
                            <strong>Introduce la abreviación del cálculo</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.abbreviation.$invalid && $v.entry.abbreviation.$dirty" class="c-error">{{$t(abbreviationErrorMessage, {field:'abreviación'})}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" value="" v-model="entry.enabled">
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
                                <input class="m-t-20" type="radio" value="GENERAL" v-model="entry.type"
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
                                <input value="CONTRACT" type="radio" v-model="entry.type" name="role" id="two">
                                <span for="custom">{{$t('calculation.new.calculation-type.radio-button.contract')}}</span>
                            </div>
                            <span v-if="$v.entry.type.$invalid && $v.entry.type.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Tipo de Cálculo'})}}</span>
                        </div>
                    </div>
                </div>

                <div class="floating-text-form">
                    <h1>Fórmula</h1>
                    <p>Formula para obtener el resultado del cálculo</p>
                </div>

                <div class="form-group fg-float dropdown-inside p-t-0">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" @change="addVariablesFromFormulaString()" v-model="entry.formula.expression" placeholder="Introduce la fórmula">
                        <div class="dropdown">
                            <button class="btn-stroke xs button-accent" type="button" id="dropdownInput"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{displayFormLabel}} <i class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownInput"
                                 x-placement="bottom-end">
                                <ul>
                                    <li @click="setDisplayForm('NORMAL')">Normal</li>
                                    <li @click="setDisplayForm('AMOUNT')">Cantidad</li>
                                    <li @click="setDisplayForm('PERCENTAGE')">Porcentaje</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="vertical-center">
                    <div class="form-group fg-float basic-select w-70 m-r-30 p-t-0 m-b-0">
                        <div class="fg-line">
                            <select @change="addToFormula($event)" v-model="variableSelected" class="form-control select selectpicker" data-live-search="true"
                                    data-live-search-placeholder="Search placeholder"
                                    title="Agregar variable">
                                <optgroup label="GENERAL">
                                    <option :value="item.abbreviation" v-for="item in variablesObj">{{item.name}}</option>
                                </optgroup>
                                <optgroup label="Otros Cálculos">
                                    <option :value="calculo.abbreviation" v-for="calculo in docs">{{'('+calculo.abbreviation+') '+calculo.name}}</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="mini-buttons">
                        <button class="mini-btn m-l-0" @click.prevent="addToFormula('+')">+</button>
                        <button class="mini-btn" @click.prevent="addToFormula('-')">-</button>
                        <button class="mini-btn" @click.prevent="addToFormula('*')">*</button>
                        <button class="mini-btn m-r-0" @click.prevent="addToFormula('/')">/</button>
                    </div>
                </div>

                <div class="m-t-40 m-b-50">
                    <div class="floating-text-form">
                        <h1>Variables usadas</h1>
                        <p>Cálculo para mostrar el indice de perdidas al año</p>
                    </div>
                    <div class="vertical-center m-b-20" v-for="variable in entry.formula.variables">
                        <span class="w-15 m-r-10"><strong class="c-accent f-12">{{variable.abbreviation}}　&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="floating-text-form">
                            <h1>{{variable.name}}</h1>
                            <p class="m-b-0"> {{variable.description}}</p>
                        </div>
                    </div>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce las notas adicionales"
                               v-model="entry.notes">
                        <label class="fg-label">Notas del cálculo
                            <small></small>
                            <br>
                            <strong>Introduce las notas adicionales del cálculo</strong>
                        </label>
                    </div>
                </div>


            </div>

        </modalEntry>

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
    import { mapState, mapGetters } from 'vuex';

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
                    {label: 'general.created-at', field: 'createdAt', type: 'Date', visible:true}
                ],
                variableSelected : undefined,
                displayFormLabel : "Porcentaje",
                entry : {
                    name: "",
                    description: "",
                    abbreviation: "",
                    type: undefined,
                    enabled: false,
                    formula : {
                        expression : "",
                        variables : [],
                        calculations : []
                    },
                    displayForm : "NORMAL",
                    notes: "",
                },
                errors : {
                    flag : false,
                    invalidVariables : []
                }

            }
        },
        validations:{
            entry : {
                name: {
                    required,
                },
                description: {
                    required,
                },
                abbreviation: {
                    required,
                    validAbbreviation: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return (/^\${2}[a-zA-Z0-9]{1,7}$/).test(value);
                    }
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
            confirmDeletion() {
                this.deleteElementSelected();
            },
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 1000))
            },
            addToFormula(element) {
                if (element) {
                    if (this.entry.formula.expression.length > 0) {
                        this.entry.formula.expression += " ";
                    }
                    if (typeof  element == "string") {
                        this.entry.formula.expression += element;
                    } else { //then it's a variable
                        this.entry.formula.expression += element.target.value;
                        this.addVariablesFromFormulaString();
                    }
                }
            },
            findVariableByAbbreviation(abbr) {
                    if (this.variablesObj[abbr]) {
                        return this.variablesObj[abbr];
                    }
                return undefined;
            },
            parseVariablesFromFormulaString() {
                // this.debounce(function () {
                    this.errors.flag = false;
                    const regex = /\$[A-Z]+/g;
                    let tempVariable;
                    let tempVariables = [];
                    let variablesFound = this.entry.formula.expression.match(regex);
                    for (let i = 0; i < variablesFound.length ; i++) {
                        tempVariable = this.findVariableByAbbreviation(variablesFound[i]);
                        if (tempVariable) {
                            tempVariables.push(tempVariable);
                        } else {
                            this.errors.flag = true;
                            this.errors.invalidVariables.push(variablesFound[i]);
                        }
                    }
                    return tempVariables;
                // }, 1000, false)
            },
            addVariablesFromFormulaString(){
                this.entry.formula.variables = this.parseVariablesFromFormulaString();
            },
            setDisplayForm(value) {
                this.entry.displayForm = value;
                switch (value) {
                    case 'AMOUNT': this.displayFormLabel = "Cantidad"; break;
                    case 'PERCENTAGE': this.displayFormLabel = "Porcentaje"; break;
                    case 'NORMAL': this.displayFormLabel = "Normal"; break;
                }
            },
            debounce: function debounce(func, wait, immediate) {
                var timeout;
                return function () {
                    var context = this, args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                }
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
                bus.$on(storeModule + DOC_CREATED, () => {
                this.entry.name = "";
                this.entry.description= "";
                this.entry.type= "";
                this.entry.enabled= "";
                this.entry.notes= "";
                this.entry.abbreviation= "";
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
            abbreviationErrorMessage(){
                if(!this.$v.entry.abbreviation.required){
                    return "calculation.validation.required";
                }
                if(!this.$v.entry.abbreviation.validAbbreviation){
                    return "calculations.validation.abbreviation"
                }
            },
            ...mapState({
                variables: state => state[storeModule].variables
            }),
            ...mapGetters(
                    storeModule, ['variablesObj']
            )
        },
        beforeMount(){
            this.$store.dispatch(`${storeModule}/fetchVariables`)
        }
    }
</script>
