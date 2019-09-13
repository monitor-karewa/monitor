<template>
    <div class="contract-section">
        <AdminMainSection :storeModule="storeModule">
            <BackButton/>
            <CatalogHeader :singular="'Cálculo'" :plural="'Cálculo'" :storeModule="storeModule"/>
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Cálculo'"
                    :plural="'Cálculos'" :hideEditButton="true"
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
                            <span>{{$t('calculations.enabled')}} </span>
                            <p class="fg-label "> {{$t('calculations.enabled.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                </div>


                <div class="floating-text-form">
                    <h1>Cálculo corresponde a Índice de riesgo de corrupción</h1>
                </div>
                <div class="form-group fg-float dropdown-inside m-t-10 p-t-0">
                    <div class="fg-line basic-input">
                        <div class="toggle-switch col-12">
                            <div class="switch-border"></div>
                            <input id="locked" type="checkbox" hidden="hidden" v-model="entry.locked" @change="assignPercentScale($event)">
                            <label for="locked" class="ts-helper"></label>
                        </div>
                    </div>
                </div>

                <!--administrationPeriod-->
                <div class="form-group fg-float subtitle" v-show="entry.locked">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('calculations.administration-period.placeholder')"
                               v-model="entry.administrationPeriod"
                               @input="delayTouch($v.entry.administrationPeriod)">
                        <label class="fg-label">{{$t('calculations.administration-period.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('calculations.administration-period.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.administrationPeriod.$invalid  && $v.entry.administrationPeriod.$dirty && !$v.entry.administrationPeriod.validAdministrationPeriod"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('calculations.new.administration-period.label'), example:'2016-2018' })}}</span>
                    <!--<span v-if="$v.entry.administrationPeriod.$invalid  && $v.entry.administrationPeriod.$dirty && !$v.entry.administrationPeriod.required"-->
                          <!--class="c-error">{{$t(requiredErrorMessage, {field:$t('calculations.administration-period.label')})}}</span>-->
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
                                <h1>Escala de valores</h1>
                                <p>Establece la escala para determinar el valor del cálculo</p>
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
                                <strong>Min</strong>
                            </label>
                        </div>
                        <span class="w-10 m-r-10"><strong class="c-accent f-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                        <div class="fg-line basic-input col-md-2">
                            <input type="number" class="form-control fg-input" step="0.01" placeholder="0.0%"
                                   v-model="scale.max">
                            <label class="fg-label m-t-10" v-if="index === 0">
                                <small></small>
                                <strong>Max</strong>
                            </label>
                        </div>
                        <span class="w-10 m-r-10"><strong class="c-accent f-12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;=</strong></span>
                        <div class="fg-line basic-input col-md-2">
                            <input type="number" class="form-control fg-input" step="0.01" placeholder="0.0"
                                   v-model="scale.value">
                            <label class="fg-label m-t-10" v-if="index === 0">
                                <small></small>
                                <strong>Valor</strong>
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
                                    <li @click="setDisplayForm('NORMAL')" class="c-pointer">Normal</li>
                                    <li @click="setDisplayForm('AMOUNT')" class="c-pointer">Cantidad</li>
                                    <li @click="setDisplayForm('PERCENTAGE')" class="c-pointer">Porcentaje</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="vertical-center">
                    <div class="row w-100">
                        <div class="col-sm-8">
                            <div class="form-group fg-float basic-select scroll-select height-200px p-t-0 m-b-0">
                                <div class="fg-line">
                                    <select @change="addToFormula($event)" v-model="variableSelected" class="form-control select selectpicker" data-live-search="true"
                                            data-live-search-placeholder="Buscar variable"
                                            title="Agregar variable">
                                        <optgroup label="GENERAL">
                                            <option :value="item.abbreviation" v-for="item in variablesObj" style="white-space: normal;">{{item.name}}</option>
                                        </optgroup>
                                        <optgroup label="Otros Cálculos">
                                            <option :value="calculation.abbreviation" v-for="calculation in calculations">{{'('+calculation.abbreviation+') '+calculation.name}}</option>
                                        </optgroup>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-4 vertical-center">
                            <div class="mini-buttons">
                                <button type="button" class="mini-btn p-0" @click="addToFormula('+')"><span class="f-25 m-t--5 align-middle">+</span></button>
                                <button type="button" class="mini-btn p-0" @click="addToFormula('*')"><span class="f-30 align-middle">*</span></button>
                                <button type="button" class="mini-btn p-0" @click="addToFormula('-')"><span class="f-25 m-t--5 align-middle">-</span></button>
                                <button type="button" class="mini-btn m-r-0" @click="addToFormula('/')">/</button>
                            </div>

                        </div>
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
                    <div class="row vertical-center m-b-20" v-for="variable in entry.formula.variables">
                        <div class="col-md-6">

                            <span class="w-15 m-r-10"><strong class="c-accent f-12">{{variable.abbreviation}}　&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</strong></span>
                            <div class="floating-text-form">
                                <h1>{{variable.name}}</h1>
                                <p class="m-b-0"> {{variable.description}}</p>
                            </div>
                        </div>


                        <div class="col-md-6">
                                <div class="col-12 col-md-12 m-b-30">
                                    <a @click="addRowFilter(variable.abbreviation)" class="btn-stroke button-accent"><i class="zmdi zmdi-plus"></i> Agregar Filtro </a>
                                </div>
                        </div>

                        <div class="col-md-12 col-lg-12 row form-group fg-float subtitle p-t-0 m-t-20" v-for="(filter, indexFilter ) in entry.filters" v-show="filter.variableAbbreviation == variable.abbreviation">
                            <div class="col-md-3 col-lg-4 m-t-10" >
                                <div class="fg-line">
                                    <select v-model="filter.propertyName" class="form-control select selectpicker"
                                            data-live-search="true"
                                            :title="'Propiedad...'"
                                            data-live-search-placeholder="Realiza una búsqueda.."
                                            @change="changePropertyName($event,indexFilter)"
                                    >
                                        <option v-for="(options, index) in filtersOptions" :value="options.propertyName"> {{$t(options.i18n)}}</option>
                                    </select>
                                    <label class="fg-label m-t-10" >
                                        <small></small>
                                        <strong>Propiedad del filtro</strong>
                                    </label>
                                </div>

                            </div>
                            <div class="col-md-3 col-lg-3 m-t-10">
                                <div class="fg-line">
                                    <select v-model="filter.operator" class="form-control select selectpicker"
                                            data-live-search="true"
                                            :title="'Operador...'"
                                            data-live-search-placeholder="Selecciona el operador de tu preferencia.."
                                    >
                                        <option v-for="operator in operatorsOptions" :value="operator.value"> {{operator.displayName}}</option>
                                    </select>
                                    <label class="fg-label m-t-10" >
                                        <small></small>
                                        <strong>Operador del filtro</strong>
                                    </label>

                                </div>

                            </div>



                            <div class="col-md-3 col-lg-3 m-t-10" v-show="filter.propertyType == 'REF' && filter.onModel == 'Supplier'">
                                <div class="fg-line">
                                    <select v-model="filter.reference" class="form-control select selectpicker"
                                            data-live-search="true"
                                            :title="'Proveedores...'"
                                            data-live-search-placeholder="Selecciona al proveedor..."
                                    >
                                        <option v-for="refs in suppliers" :value="refs._id"> {{refs.name}}</option>
                                    </select>
                                    <label class="fg-label m-t-10" >
                                        <small></small>
                                        <strong>Valor del filtro</strong>
                                    </label>
                                </div>

                            </div>
                            <div class="col-md-3 col-lg-3 m-t-10" v-show="filter.propertyType == 'REF' && filter.onModel == 'AdministrativeUnit'">
                                <div class="fg-line">
                                    <select v-model="filter.reference" class="form-control select selectpicker"
                                            data-live-search="true"
                                            :title="'U.Administrativas...'"
                                            data-live-search-placeholder="Selecciona la U. Administrativa..."
                                    >
                                        <option v-for="refs in administrativeUnits" :value="refs._id"> {{refs.name}}</option>
                                    </select>

                                    <label class="fg-label m-t-10" >
                                        <small></small>
                                        <strong>Valor del filtro</strong>
                                    </label>
                                </div>

                            </div>




                            <div class="col-md-3 col-lg-3 m-t-10" v-show="filter.propertyType !== 'REF'">
                                <div class="fg-line">
                                    <input type="number" class="form-control fg-input"
                                           step="0.01" placeholder="$0.0"
                                           :placeholder="$t('contracts.new.contract-number.placeholder')"
                                           v-model="filter.value"/>
                                    <label class="fg-label m-t-10" >
                                        <small></small>
                                        <strong>Valor del filtro</strong>
                                    </label>
                                </div>

                            </div>
                            <div class="col-md-2 col-lg-2">
                                <a href="" class="btn-circle-icon" @click.prevent="removeRowFromFilters(indexFilter)"><i class="zmdi zmdi-minus"></i></a>
                            </div>


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
                    <p v-show="entry.type == 'GENERAL'">La vista previa del resultado se muestra para todos los contratos del monitor </p>
                    <p v-show="entry.type == 'CONTRACT'">La vista previa del resultado se muestra solamente para los contratos de la organización actual </p>
                </div>
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal">Cancelar
                </button>
                <button v-show="!isEditing" type="submit" class="btn-raised button-accent m-l-15">Agregar</button>
                <button v-show="isEditing" type="submit" class="btn-raised button-accent m-l-15">Actualizar</button>
            </div>


            <button id="refresh-selects-button" style="display:none" type="button" @click="refreshSelectsFilter()">click mee!!!
            </button>

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
                    {label: 'calculations.locked', field: 'locked', type:"boolean", visible: true},
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
                    locked:false,
                    administrationPeriod:'',
                    hasPercentScale:false,
                    scale:[],
                    filters:[]
                },
                defaultPercentScale:[
                    { min:0, max:33, value:2.67 },
                    { min:34, max:66, value:5.33},
                    { min:67, max:100, value:8 },
                ],
                errors : {
                    flag : false,
                    invalidVariables : []
                },
                operatorsOptions: [
                    {
                        value:'EQUAL',
                        displayName:"Igual que"
                    },
                    {
                        value:'GREATER',
                        displayName:"Mayor que"
                    },
                    {
                        value:'GREATER_EQUAL',
                        displayName:"Mayor o igual que"
                    },
                    {
                        value:'LESS',
                        displayName:"Menor que"
                    },
                    {
                        value:'LESS_EQUAL',
                        displayName:"Menor o igual que"
                    },
                    {
                        value:'NOT_EQUAL',
                        displayName:"Diferente que"
                    }
                ],
                filtersOptions : [
                    {
                        propertyName:'totalAmount',
                        propertyType:'NUMBER',
                        i18n:'contracts.new.total-or-max-amount.label'
                    },
                    {
                        propertyName:'minAmount',
                        propertyType:'NUMBER',
                        i18n:'contracts.new.min-amount.label'
                    },
                    {
                        propertyName:'maxAmount',
                        propertyType:'NUMBER',
                        i18n:'contracts.new.max-amount.label'
                    },
                    {
                        propertyName:'totalOrMaxAmount',
                        propertyType:'NUMBER',
                        i18n:'contracts.new.total-or-max-amount.sub-label'
                    },
                    {
                        propertyName:'supplier',
                        propertyType:'REF',
                        onModel:'Supplier',
                        i18n:'suppliers.supplier'
                    },
                    {
                        propertyName:'organizerAdministrativeUnit',
                        propertyType:'REF',
                        onModel:'AdministrativeUnit',
                        i18n:'contracts.organizerAdministrativeUnit'
                    },
                    {
                        propertyName:'applicantAdministrativeUnit',
                        propertyType:'REF',
                        onModel:'AdministrativeUnit',
                        i18n:'contracts.applicantAdministrativeUnit'
                    }
                ]

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
                administrationPeriod: {
//                    required,
                    validAdministrationPeriod: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return (/^[12][0-9]{3}-[12][0-9]{3}$/).test(value);
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
                    if (!this.entry.formula.expression) {
                        this.entry.formula.expression = '';
                    }
                    if (this.entry.formula.expression.length > 0) {
                        this.entry.formula.expression += " ";
                    }
                    if (typeof(element) === "string") {
                        this.entry.formula.expression += element;
                    } else { //then it's a variable
                        this.variableSelected = null;
                        this.refreshSelect();
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
                    const regex = /\$[A-Z0-9]+/g;
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
                const regex = /\$\$[A-Z0-9]+/g;
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
                this.validateFormula();
                if(this.entry.formula && this.entry.formula.expression){
                    this.entry.formula.variables = this.parseVariablesFromFormulaString();
                    this.entry.formula.calculations = this.parseCalculationsFromFormulaString();
                } else {
                    this.entry.formula.variables = [];
                    this.entry.formula.calculations = [];
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
                if (value === undefined || value === null) {
                    return '---';
                }
                let num = Number(value);
                switch (this.entry.displayForm) {
                    case 'AMOUNT': return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    case 'PERCENTAGE':
                        if(isNaN(num)){
                            return "0.00%"
                        }
                        if(String(num).split('.').length == 2 && String(num).split('.')[1].length >= 4){
                            return value.toFixed(4) +"%";
                        } else if(String(num).split('.') < 2){
                            return value.toFixed(2) +"%";
                        }
                        return value +"%";
                        break;
                    case 'NORMAL':
                        if(isNaN(num)){
                            return 0
                        }
                        if(String(num).split('.').length == 2 && String(num).split('.')[1].length >= 4){
                            return value.toFixed(4) ;
                        }
                        return value;
                        break;
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
                this.entry= {
                    _id:"",
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
                    locked:false,
                    administrationPeriod:'',
                    hasPercentScale:false,
                    scale:[],
                    filters:[]
                };
                this.$store.dispatch(`${storeModule}/clearFormulaValidation`);
                this.$v.$reset();
            },
            validateFormula(){
                this.$store.dispatch(`${storeModule}/validateFormula`, {
                    formula: this.entry.formula,
                    abbreviation : this.entry.abbreviation,
                    hasPercentScale:this.entry.hasPercentScale,
                    scale:this.entry.scale,
                    filters:this.entry.filters,
                    locked: this.entry.locked,
                    administrationPeriod: this.entry.administrationPeriod,
                    type: this.entry.type
                });
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
            },
            refreshSelect() {
                this.$nextTick(function () {
                    $('.selectpicker').selectpicker('refresh');
                })
            },
            addRowFilter(abbreviation){
                this.entry.filters.push({variableAbbreviation:abbreviation});
                this.refreshSelectPicker(200);
            },
            changePropertyName(event,indexFilter){
                let self = this;
                if(event.target.value === "" || indexFilter ===""){
                    return;
                }

                let propertyName = event.target.value;
                let selectedFilterOption = this.filtersOptions.find((element) => {
                    return element.propertyName == propertyName
                });
                    this.$set(self.entry.filters[indexFilter], 'propertyName', selectedFilterOption.propertyName);
                    this.$set(self.entry.filters[indexFilter], 'propertyType', selectedFilterOption.propertyType);
                    this.$set(self.entry.filters[indexFilter], 'onModel', selectedFilterOption.onModel);


                this.refreshSelectPicker(200);


            },
            removeRowFromFilters(index){
                if(this.entry.filters && this.entry.filters.length){
                    this.entry.filters.splice(index, 1);
                }
            },
            refreshSelectPicker(miliseconds){
                setTimeout(function(){
                    window.$('.selectpicker').selectpicker();
                    window.$('.selectpicker').selectpicker('refresh');
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                },miliseconds);
            },

            refreshSelectsFilter(){
                let dummyAbbr;
                this.addRowFilter(dummyAbbr);
                this.entry.filters.pop();
            },
            initAllBusEvents(){
                let busDelete = bus._events[storeModule + DELETE_SUCCESS];
                let busCreate = bus._events[storeModule + DOC_CREATED];
                let busUpdate = bus._events[storeModule + DOC_UPDATED];

                busDelete.splice(1, busDelete.length - 1);
                busCreate.splice(1, busCreate.length - 1);
                busUpdate.splice(1, busUpdate.length - 1);
            }
        },
        created() {
            bus.$on(storeModule + DOC_UPDATED, () => {
                $('#ModalEntry').modal('hide');
                tShow('El cálculo se ha actualizado correctamente', 'success');
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
                this.entry.locked = false;
                this.entry.administrationPeriod = '';
                this.entry.hasPercentScale = false;
                this.entry.scale = [];
                this.entry.filters = [];
                $('#ModalEntry').modal('hide');
                this.$store.dispatch (`${storeModule}/clearFormErrors`);
                this.$v.$reset();

                tShow("El cálculo fue creado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_START_CREATE, ()=>{
                this.clearEntry();
                this.$store.dispatch(`${storeModule}/fetchCalculations`, {});
                this.refreshSelect();
            });
            bus.$on(storeModule+DOC_START_EDIT, (entry)=>{
                this.clearEntry();
                let tempEntry = {};
                tempEntry._id = entry._id;

                this.$store.dispatch(`${storeModule}/fetchCalculations`, {id: entry._id});
                
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
                tempEntry.locked = entry.locked;
                tempEntry.administrationPeriod = entry.administrationPeriod;
                tempEntry.hasPercentScale = entry.hasPercentScale;
                tempEntry.scale = [];
                tempEntry.filters = [];
                if(entry.scale){
                    entry.scale.forEach((item) => {


                        let scaleEntry = Object.assign({},item);
                        tempEntry.scale.push(scaleEntry);
                    })
                }

                if(entry.filters){
                    entry.filters.forEach((item) => {
                        let filterEntry = Object.assign({},item);
                        tempEntry.filters.push(filterEntry);
                    })
                }

                this.entry =  {...tempEntry};


                this.$nextTick(function () {
                    setTimeout(function () {
                        $("#refresh-selects-button").click();
                    },1000);

                });
                this.refreshSelect();
            });
        },
        mounted() {
            this.initAllBusEvents();
            window.$(document).ready(function () {

                window.$('.selectpicker').selectpicker();
                window.$('.selectpicker').selectpicker('refresh');

                $('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker('refresh');

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
                    tShow("Se ha completado el proceso correctamente.", 'success');
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
            administrationPeriodMessage(){
                if(!this.$v.entry.administrationPeriod.required){
                    return "calculation.validation.required";
                }
                if(!this.$v.entry.administrationPeriod.validAdministrationPeriod){
                    return "calculations.validation.administrationPeriod"
                }
            },
            ...mapState({
                variables: state => state[storeModule].variables,
                calculations: state => state[storeModule].calculations,
                formulaValidation: state => state[storeModule].formulaValidation,
                formulaValidated: state => state[storeModule].formulaValidated,
                suppliers: state => state[storeModule].suppliers,
                administrativeUnits: state => state[storeModule].administrativeUnits,
            }),
            ...mapGetters(
                    storeModule , ['variablesObj','calculationsForFormula','formErrors']
            )
        },
        watch: {
            //Refresh selects on variable change
            variablesObj() {
                this.$nextTick(() => {
                    this.refreshSelect();
                });
            },
            calculationsForFormula() {
                this.$nextTick(() => {
                    this.refreshSelect();
                });
            }
        },
        beforeMount(){
            this.$store.dispatch(`${storeModule}/fetchVariables`);
            this.$store.dispatch(`${storeModule}/fetchCalculations`, {});
            this.$store.dispatch(`${storeModule}/getSuppliers`);
            this.$store.dispatch(`${storeModule}/getAdministrativeUnits`);
        },
    }
</script>
