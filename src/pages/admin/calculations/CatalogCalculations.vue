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
                        <input type="text" class="form-control fg-input" placeholder="Introduce la abreviación del cálculo"
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
                    <h1>Activar escala al calculo</h1>
                </div>
                <div class="form-group fg-float dropdown-inside m-t-10 p-t-0">
                    <div class="fg-line basic-input">
                        <div class="toggle-switch col-12">
                            <div class="switch-border"></div>
                            <input id="ts1" type="checkbox" hidden="hidden" v-model="entry.hasPercentScale" @change="assignPercentScale($event)">
                            <label for="ts1" class="ts-helper"></label>
                        </div>
                    </div>
                </div>
                <div class="form-group fg-float subtitle p-t-0" v-if="entry.hasPercentScale">
                    <div class="row m-b-30">
                        <div class="col-md-6">
                            <div class="floating-text-form">
                                <h1>Escala de porcentajes</h1>
                                <p>Establece la escala para determinar la calificación del indicador</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-12 col-md-12 m-b-30">
                                <a href="" class="btn-circle-icon" @click.prevent="addRowToScale()"><i class="zmdi zmdi-plus"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="row col-md-12 col-lg-12" v-for="(scale, index ) in entry.scale">
                        <div class="fg-line basic-input col-md-2">
                            <input type="number" class="form-control fg-input" step="0.01" placeholder="0.0%"
                                   v-model="scale.min">
                            <label class="fg-label m-t-10" v-if="index === 0">
                                <small></small>
                                <strong>Min(%)</strong>
                            </label>
                        </div>
                        <span class="w-10 m-r-10"><strong class="c-accent f-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="fg-line basic-input col-md-2">
                            <input type="number" class="form-control fg-input" step="0.01" placeholder="0.0%"
                                   v-model="scale.max">
                            <label class="fg-label m-t-10" v-if="index === 0">
                                <small></small>
                                <strong>Max(%)</strong>
                            </label>
                        </div>
                        <span class="w-10 m-r-10"><strong class="c-accent f-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=</strong></span>
                        <div class="fg-line basic-input col-md-2">
                            <input type="number" class="form-control fg-input" step="0.01" placeholder="0.0"
                                   v-model="scale.value">
                            <label class="fg-label m-t-10" v-if="index === 0">
                                <small></small>
                                <strong>Calificación</strong>
                            </label>
                        </div>
                        <div class="col-md-2">
                            <a href="" class="btn-circle-icon" @click.prevent="removeRowFromScale(index)"><i class="zmdi zmdi-minus"></i></a>
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
                                    <option :value="calculation.abbreviation" v-for="calculation in calculations">{{'('+calculation.abbreviation+') '+calculation.name}}</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="mini-buttons">
                        <button type="button" class="mini-btn p-0" @click="addToFormula('+')"><span class="f-25 m-t--5 align-middle">+</span></button>
                        <button type="button" class="mini-btn p-0" @click="addToFormula('*')"><span class="f-30 align-middle">*</span></button>
                        <button type="button" class="mini-btn p-0" @click="addToFormula('-')"><span class="f-25 m-t--5 align-middle">-</span></button>
                        <button type="button" class="mini-btn m-r-0" @click="addToFormula('/')">/</button>
                    </div>
                </div>

                <div class="m-t-40 m-b-50">
                    <div class="row">

                        <div class="col-md-6">
                            <div class="floating-text-form">
                                <h1>Variables usadas</h1>
                                <p>Cálculo para mostrar el indice de perdidas al año</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="col-12 col-md-12 m-b-30">
                                <a @click="validateFormula()" class="btn-stroke button-accent"><i class="zmdi zmdi-plus"></i> Verificar fórmula</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 m-b-30">
                        <span v-if="formulaValidation.error" class="c-error">{{formulaValidation.message}}</span>
                    </div>
                    <!--<div>-->
                        <!--<p>-->
                            <!--{{formulaValidated}}-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--{{formulaValidation}}-->
                        <!--</p>-->
                    <!--</div>-->
                    <div class="vertical-center m-b-20" v-for="variable in entry.formula.variables">
                        <span class="w-15 m-r-10"><strong class="c-accent f-12">{{variable.abbreviation}}　&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="floating-text-form">
                            <h1>{{variable.name}}</h1>
                            <p class="m-b-0"> {{variable.description}}</p>
                        </div>
                    </div>
                    <div class="vertical-center m-b-20" v-for="calculation in entry.formula.calculations">
                        <span class="w-15 m-r-10"><strong class="c-accent f-12">{{calculation.abbreviation}}　&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="floating-text-form">
                            <h1>{{calculation.name}}</h1>
                            <p class="m-b-0"> {{calculation.description}}</p>
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

            <div class="modal-footer aditional-text" slot="footer">
                <div v-if="formErrors && formErrors.length">
                    <p class="c-error" v-for="error in formErrors">{{error.message}}</p>
                </div>
                <div class="total-footer">
                    <span v-if="formulaValidated && !formulaValidation.error" > RESULTADO: <strong>{{displayResult(formulaValidation.results.value)}}</strong></span>
                    <p>La vista previa del resultado del cálculo solo está disponible en cálculos
                        generales</p>
                </div>
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                </button>
                <button type="submit" class="btn-raised button-accent m-l-15">Agregar</button>
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
    import { DELETE_SUCCESS, DOC_CREATED, DOC_START_EDIT, DOC_UPDATED, DOC_START_CREATE } from "@/store/events";
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
                    {label: 'calculations.name', field: 'name', visible: true},
                    {label: 'calculations.description', field: 'description', visible: true},
                    {label: 'calculations.type', field: 'type', visible: true, type:"i18n" },
                    {label: 'calculations.formula.expression', field: 'formula.expression', visible: true, type:"highlight" },
                    {label: 'calculations.enabled', field: 'enabled', type:"boolean", visible: true},
                    {label: 'calculations.notes', field: 'notes', visible: true},
                    {label: 'general.created-at', field: 'createdAt', type: 'Date', visible: true}
                ],
                variableSelected : undefined,
                displayFormLabel : "Normal",
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
                    hasPercentScale:false,
                    scale:[]
                },
                defaultPercentScale:[
                    { min:0, max:33, value:2.67 },
                    { min:34, max:66, value:5.33},
                    { min:67, max:100, value:8 },
                ],
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
                        return (/^\${2}[A-Z0-9]{1,7}$/).test(value);
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
                    if (typeof element == "string") {
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
            findCalculationsByAbbreviation(abbr) {
                for (let i = 0; i < this.calculationsForFormula.length; i++) {
                    if(this.calculationsForFormula[i].abbreviation == abbr){
                        return this.calculationsForFormula[i];
                    }
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
                    if(variablesFound && variablesFound.length > 0) {
                        for (let i = 0; i < variablesFound.length; i++) {
                            tempVariable = this.findVariableByAbbreviation(variablesFound[i]);
                            if (tempVariable) {
                                tempVariables.push(tempVariable);
                            } else {
                                this.errors.flag = true;
                                this.errors.invalidVariables.push(variablesFound[i]);
                            }
                        }
                    }
                    return tempVariables;
                // }, 1000, false)
            },
            parseCalculationsFromFormulaString() {
                // this.debounce(function () {
                this.errors.flag = false;
                const regex = /\$\$[A-Z]+/g;
                let tempCalculation;
                let tempCalculations = [];
                let calculationsFound = this.entry.formula.expression.match(regex);
                if(calculationsFound && calculationsFound.length > 0) {
                    for (let i = 0; i < calculationsFound.length; i++) {
                        tempCalculation = this.findCalculationsByAbbreviation(calculationsFound[i]);
                        if (tempCalculation) {
                            tempCalculations.push(tempCalculation);
                        } else {
                            this.errors.flag = true;
                            this.errors.invalidVariables.push(calculationsFound[i]);
                        }
                    }
                }
                return tempCalculations;
                // }, 1000, false)
            },
            addVariablesFromFormulaString(){
                if(this.entry.formula && this.entry.formula.expression){
                    this.entry.formula.variables = this.parseVariablesFromFormulaString();
                    this.entry.formula.calculations = this.parseCalculationsFromFormulaString();
                }
            },
            setDisplayForm(value) {
                this.entry.displayForm = value;
                switch (value) {
                    case 'AMOUNT': this.displayFormLabel = "Cantidad"; break;
                    case 'PERCENTAGE': this.displayFormLabel = "Porcentaje"; break;
                    case 'NORMAL': this.displayFormLabel = "Normal"; break;
                }
            },
            displayResult(value) {
                switch (this.entry.displayForm) {
                    case 'AMOUNT': return "$" + value;
                    case 'PERCENTAGE': return value +"%";
                    case 'NORMAL': return value;
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
            },
            clearEntry(){
                this.entry = {
                    formula:{}
                };
                this.$v.$reset();
            },
            validateFormula(){
                this.$store.dispatch(`${storeModule}/validateFormula`, {formula: this.entry.formula, abbreviation : this.entry.abbreviation, hasPercentScale:this.entry.hasPercentScale, scale:this.entry.scale});
            },
            assignPercentScale(){
                if(this.entry.hasPercentScale){
                    this.entry.scale = this.entry.scale && this.entry.scale.length ? this.entry.scale :this.defaultPercentScale;
                } else {
                    this.entry.scale = [];
                }
            },
            addRowToScale(){
                this.entry.scale.push({min:0,max:0, value:0});
            },
            removeRowFromScale(index){
                if(this.entry.scale && this.entry.scale.length){
                    this.entry.scale.splice(index, 1);
                }
            }

        },
        created() {
            bus.$on(storeModule + DOC_UPDATED, () => {
                $('#ModalEntry').modal('hide');
                this.$store.dispatch (`${storeModule}/clearFormErrors`);
                this.clearEntry();
            });
            bus.$on(storeModule + DELETE_SUCCESS, (data) => {
                tShow("El cálculo fue eliminado correctamente", 'info');
            }),
            bus.$on(storeModule + DOC_CREATED, () => {
                this.entry.name = "";
                this.entry.description= "";
                this.entry.type= "";
                this.entry.enabled= "";
                this.entry.notes= "";
                this.entry.abbreviation= "";
                this.entry.hasPercentScale = false;
                this.entry.scale = [];
                $('#ModalEntry').modal('hide');
                this.$store.dispatch (`${storeModule}/clearFormErrors`);
                this.$v.$reset();

                tShow("El cálculo fue creado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_START_CREATE, ()=>{
                this.clearEntry();
            });
            bus.$on(storeModule+DOC_START_EDIT, (entry)=>{
                this.clearEntry();
                let tempEntry = {};
                tempEntry._id = entry._id;
                tempEntry.formula = {};
                tempEntry.notes = entry.notes;
                tempEntry.name = entry.name;
                tempEntry.description = entry.description;
                tempEntry.type = entry.type;
                tempEntry.enabled  = entry.enabled;

                tempEntry.formula.expression  = entry.formula.expression;
                tempEntry.formula.variables  = entry.formula.variables;
                tempEntry.formula.calculations  = entry.formula.calculations;
                tempEntry.displayForm = entry.displayForm;
                tempEntry.notes = entry.notes;
                tempEntry.abbreviation = entry.abbreviation;
                tempEntry.hasPercentScale = entry.hasPercentScale;
                tempEntry.scale = entry.scale;

                this.entry = {...tempEntry};
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
                variables: state => state[storeModule].variables,
                calculations: state => state[storeModule].calculations,
                formulaValidation: state => state[storeModule].formulaValidation,
                formulaValidated: state => state[storeModule].formulaValidated
            }),
            ...mapGetters(
                    storeModule , ['variablesObj','calculationsForFormula','formErrors']
            )
        },
        beforeMount(){
            this.$store.dispatch(`${storeModule}/fetchVariables`);
            this.$store.dispatch(`${storeModule}/fetchCalculations`);
        },
    }
</script>
