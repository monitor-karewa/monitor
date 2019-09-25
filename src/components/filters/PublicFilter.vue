<template>
    <div>
        <div class="filter" v-if="checkIfShown('search')">
            <div class="filter-container">
                <input class="input-search" type="text" name="" value="" v-model="query.search"
                       :placeholder="placeHolder" @keyup.enter="filter" />
            </div>
            <button @click="filter" class="filter-btn" type="button" name="button">Buscar</button>
        </div>
        <div class="m-t-10">
            <div>
                <div class="filter">
                    <div class="filter-container row m-0" >
                        <div :class="`form-group fg-float border-select m-0 p-0 col-lg-${colSizes['administrationPeriod']} col-6`" v-if="checkIfShown('administrationPeriod')" :key="keys.administrationPeriods">
                            <div class="fg-line m-0">
                                <select v-model="temp.administrationPeriod" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar administración"
                                        title="Por administración" @change="addFilter(query.administrationPeriods, temp.administrationPeriod, 'administrationPeriods')">
                                    <option v-for="item in administrationPeriods" :value="item">
                                        {{item.administrationPeriod}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div :class="`form-group fg-float border-select m-0 p-0 col-lg-${colSizes['fiscalYear']} col-6`" v-if="checkIfShown('fiscalYear')" :key="keys.fiscalYears">
                            <div class="fg-line m-0">
                                <select v-model="temp.fiscalYear" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar año" title="Por año…" @change="addFilter(query.fiscalYears, temp.fiscalYear, 'fiscalYears')">
                                    <optGroup>
                                        <option :value="undefined"> Por año...</option>
                                    </optGroup>
                                    <option v-for="item in fiscalYearsSorted" :value="item">{{item.fiscalYear}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div :class="`form-group fg-float border-select m-0 p-0 col-lg-${colSizes['trimonth']} col-6`" v-if="checkIfShown('trimonth')" :key="keys.trimonths">
                            <div class="fg-line m-0">
                                <select v-model="temp.trimonth" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar trimestre"
                                        title="Por trimestre…" @change="addFilter(query.trimonths, temp.trimonth, 'trimonths')">
                                        <option v-for="trimonth in trimonthsSorted"  :value="trimonth">
                                            {{trimonth.period}}
                                        </option>
                                </select>
                            </div>
                        </div>
                        <div :class="`form-group fg-float border-select m-0 p-0 col-lg-${colSizes['procedureType']} col-6`" v-if="checkIfShown('procedureType')" :key="keys.procedureTypes">
                            <div class="fg-line m-0">
                                <select v-model="temp.procedureType" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar trimestre"
                                        title="Por tipo de procedimiento" @change="addFilter(query.procedureTypes, temp.procedureType, 'procedureTypes')">
                                        <option v-for="procedureType in procedureTypesSorted" :value="procedureType">
                                            {{$t(procedureType)}}
                                        </option>
                                </select>
                            </div>
                        </div>
                        <div :class="`form-group fg-float border-select m-0 p-0 col-lg-${colSizes['administrativeUnit']} col-12`" v-if="checkIfShown('administrativeUnit')" :key="keys.administrativeUnits">
                            <div class="fg-line m-0">
                                <select v-model="temp.administrativeUnit" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar administrativa"
                                        title="Por unidad administrativa…" @change="addFilter(query.administrativeUnits, temp.administrativeUnit, 'administrativeUnits')">
                                            <optGroup>
                                                <option :value="undefined"> Por Unidad...</option>
                                            </optGroup>
                                    <option v-for="unit in administrativeUnitsSorted" :value="unit">{{unit.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div :class="`form-group fg-float border-select m-0 p-0 thing-${numberOfFiltersExcludingSearch()} col-lg-${numberOfFiltersExcludingSearch() === 5 ? 4 : colSizes['supplier']} col-12`" v-if="checkIfShown('supplier')" :key="keys.suppliers">
                            <div class="fg-line m-0">
                                <select v-model="temp.supplier" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar proveedor"
                                        title="Por proveedor…" @change="addFilter(query.suppliers, temp.supplier, 'suppliers')">
                                    <optGroup>
                                        <option :value="undefined"> Por Proveedor...</option>
                                    </optGroup>
                                    <option v-for="supplier in suppliersSorted" :value="supplier">{{supplier.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="filter-btn" type="button" name="button" @click="filter">Filtrar</button>
                </div>
            </div>
        </div>
            <div class="col-12">
                <div class="m-t-20">
                    <span class="tag-title" v-show="showFilters">Filtros:</span>
                    <div class="tag" v-for="item in query.administrationPeriods">
                                <span class="">
                                  {{item.administrationPeriod}}
                                </span>
                        <button @click="removeFilter(query.administrationPeriods, item)">
                            <i class="zmdi zmdi-close"></i>
                        </button>
                    </div>
                </div>
                <div class="tag" v-for="item in query.fiscalYears">
                    <span class="">
                      {{item.fiscalYear}}
                    </span>
                    <button @click="removeFilter(query.fiscalYears, item)">
                        <i class="zmdi zmdi-close"></i>
                    </button>
                </div>
                <div class="tag" v-for="trimonth in query.trimonths">
                    <span class="">
                      {{trimonth.period}}
                    </span>
                    <button @click="removeFilter(query.trimonths, trimonth)">
                        <i class="zmdi zmdi-close"></i>
                    </button>
                </div>
                <div class="tag" v-for="procedureType in query.procedureTypes">
                    <span class="">
                      {{$t(procedureType)}}
                    </span>
                    <button @click="removeFilter(query.procedureTypes, procedureType)">
                        <i class="zmdi zmdi-close"></i>
                    </button>
                </div>
                <div class="tag" v-for="administrativeUnit in query.administrativeUnits">
                    <span class="">
                      {{administrativeUnit.name}}
                    </span>
                    <button @click="removeFilter(query.administrativeUnits, administrativeUnit)">
                        <i class="zmdi zmdi-close"></i>
                    </button>
                </div>
                <div class="tag" v-for="supplier in query.suppliers">
                    <span class="">
                      {{supplier.name}}
                    </span>
                    <button @click="removeFilter(query.suppliers, supplier)">
                        <i class="zmdi zmdi-close"></i>
                    </button>
                </div>
            </div>
        <!--Button dummy, do not delete; used to ensure selects are properly shown-->
        <button id="refresh-selects-button" style="display:none" type="button" @click="refreshSelects">
        </button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import EventBus from '@/bus';
    import i18n from '@/plugins/i18n';
    
    const FIRST_ROW_TOTAL = 1;
    const SECOND_ROW_TOTAL = 6;

    export default {
        name: "publicFilter",
        data() {
            return {
                query : {
                    administrationPeriods : [],
                    fiscalYears : [],
                    trimonths : [],
                    procedureTypes : [],
                    administrativeUnits : [],
                    search : "",
                    suppliers : []
                },
                temp : {
                    administrationPeriod : undefined,
                    fiscalYear : undefined,
                    trimonth : undefined,
                    procedureType : undefined,
                    administrativeUnit : undefined,
                    supplier : undefined
                },
                colSizes : {
                    administrationPeriod : 2,
                    fiscalYear : 2,
                    trimonth : 2,
                    procedureType : 2,
                    administrativeUnit : 2,
                    supplier : 2,
                },
                keys : {
                    administrationPeriods : 0,
                    fiscalYears : 10000,
                    trimonths : 20000,
                    procedureTypes : 30000,
                    administrativeUnits : 40000,
                    suppliers : 50000
                },
                testkey : "thisisakey",
                vifhack : true
            }
        },
        components : {
        },
        computed : {
            ...mapGetters('settings', ['GET_SETTINGS']),
           showFilters : function(){

           return (this.query.administrationPeriods && this.query.administrationPeriods.length >  0 ) ||
                      (this.query.fiscalYears && this.query.fiscalYears.length>  0 ) ||
                      (this.query.trimonths && this.query.trimonths.length>  0 ) ||
                      (this.query.procedureTypes && this.query.procedureTypes.length >  0 ) ||
                      (this.query.suppliers && this.query.suppliers.length >  0 ) ||
                      (this.query.administrativeUnits && this.query.administrativeUnits.length >  0 );
           },
            fiscalYearsSorted : function () {
                let newFiscalYears = JSON.parse(JSON.stringify(this.$props.fiscalYears));
                newFiscalYears.sort(function (a, b) {
                    try {
                        let aInt = parseInt(a.fiscalYear);
                        let bInt = parseInt(b.fiscalYear);
                        return aInt - bInt;
                    } catch (error){
                        console.log("Error trying to parse fiscal years");
                        return 0;
                    }
                });
                return newFiscalYears;
            },
            administrativeUnitsSorted : function(){
                let newAdministrativeUnits = JSON.parse(JSON.stringify(this.$props.administrativeUnits));
                newAdministrativeUnits.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (b.name > a.name) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return newAdministrativeUnits;
            },
            suppliersSorted : function(){
                let newSuppliers = JSON.parse(JSON.stringify(this.$props.suppliers));
                newSuppliers.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (b.name > a.name) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return newSuppliers;
            },
            trimonthsSorted: function () {
                let newTrimonths = JSON.parse(JSON.stringify(this.$props.trimonths));
                let regex = /^([1-4])o[\s]([0-9]{4})$/;
                newTrimonths.sort(function (a, b) {
                    let aObj = {};
                    let bObj = {};
                    let aRegexRes = a.period.match(regex);
                    let bRegexRes = b.period.match(regex);
                    if (aRegexRes && bRegexRes) {
                        aObj.periodNumber = aRegexRes[1];
                        aObj.year = aRegexRes[2];
                        bObj.periodNumber = bRegexRes[1];
                        bObj.year = bRegexRes[2];

                        if (aObj.year === bObj.year) {
                            return aObj.periodNumber - bObj.periodNumber;
                        } else {
                            return aObj.year - bObj.year;
                        }
                    }
                    return 0;
                });
                return newTrimonths;
            },
            procedureTypesSorted: function () {
                let newProcedureTypes = JSON.parse(JSON.stringify(this.$props.procedureTypes));
                newProcedureTypes.sort(function (a, b) {
                    let translatedA = i18n.t(a);
                    let translatedB = i18n.t(b);
                    if (translatedA > translatedB) {
                        return 1;
                    } else if (translatedB > translatedA) {
                        return -1
                    } else {
                        return 0;
                    }
                });
                return newProcedureTypes;
            }
        },
        props: {
            administrationPeriods: {
                type: Array,
                default: function () {
                    return []
                }
            },
            fiscalYears: {
                type: Array,
                default: function () {
                    return []
                }
            },
            trimonths: {
                type: Array,
                default: function () {
                    return []
                }
            },
            procedureTypes: {
                type: Array,
                default: function () {
                    return []
                }
            },
            administrativeUnits: {
                type: Array,
                default: function () {
                    return []
                }
            },
            actionName: String,
            storeModule: {
                type: String
            },
            storeModules: {
                type: Array
            },
            additionalParams: {
                type: Object
            },
            placeHolder: {
                type: String,
                default: "Escribe el nombre del contrato.."
            },
            suppliers: {
                type: Array,
                default: function () {
                    return []
                }
            },
            projection : {
                validator : function (value) {
                    let thereArePositives = false;
                    let thereAreFalsities = false;

                    if(value == undefined  || (Object.entries(value).length === 0 && value.constructor === Object)){ //if it's empty
                        return true;
                    } else if(Object.keys(value).length > FIRST_ROW_TOTAL + SECOND_ROW_TOTAL){ //if it's "==" won't show any filters
                        return false;
                    }

                    const values = Object.values(value);
                    for (let i = 0; i < values.length; i++){
                        if(thereArePositives || values[i]){
                            thereArePositives = true;
                        } else {
                            thereAreFalsities = true;
                        }
                        if(thereArePositives && thereAreFalsities){
                            return false;
                        }
                    }
                    return true;
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                $(document).ready( () => {
                    setTimeout(function () {
                        $("#refresh-selects-button").click();
                    },2000);
                })
            })    

            EventBus.$on('settings-loaded', (settings) => {
                if (settings && settings.defaultAdministrationPeriod && settings.defaultAdministrationPeriod.length > 0) {
                    let administrationPeriod = settings.defaultAdministrationPeriod;
                    this.addFilter(this.query.administrationPeriods, { _id:administrationPeriod, administrationPeriod}, 'administrationPeriods', true);
                    this.filter();
                } 
            });
        },
        beforeMount() {
            this.$store.dispatch('settings/LOAD_SETTINGS');

            if(!(this.$props.projection == undefined  || (Object.entries(this.$props.projection).length === 0 && this.$props.projection.constructor === Object))) { //if it's not  empty

                let truthyProjection = Object.values(this.$props.projection)[0]; //Assuming validation was correct, values must be all false or all true
                let filtersCount;
                let leftoverSpace, colSize, colCount;
                let projectionKeys = Object.keys(this.$props.projection);
                filtersCount = projectionKeys.length;


                if (projectionKeys.includes("search")) {
                    filtersCount--;
                }
                if (!truthyProjection) {
                    colCount = SECOND_ROW_TOTAL - filtersCount;
                    for (let i = 0; i < projectionKeys.length; i++) {
                        delete this.colSizes[projectionKeys[i]];
                    }
                } else {
                    colCount = filtersCount;
                    this.colSizes = {};
                    for (let i = 0; i < projectionKeys.length; i++) {
                        this.colSizes[projectionKeys[i]] = 2;
                    }
                }

                leftoverSpace = 12 % colCount;
                let colSizesKeys = Object.keys(this.colSizes);
                colSize = (12 - leftoverSpace) / colCount;



                for (let i = 0; i < colSizesKeys.length; i++) {
                    this.colSizes[colSizesKeys[i]] = colSize;
                }

                if (filtersCount > 6) {
                    for (let i = 1; i <= leftoverSpace; i++) {
                        this.colSizes[colSizesKeys[i]]++;
                    }
                } else if (leftoverSpace !== 0 && leftoverSpace % 2 === 0) {
                    this.colSizes[colSizesKeys[0]] += (leftoverSpace / 2);
                    this.colSizes[colSizesKeys[colSizesKeys.length - 1]] += (leftoverSpace / 2);
                } else {
                    this.colSizes[colSizesKeys[0]] += leftoverSpace;
                }

            }

        },
        methods: {
            filter() {
                let params = this.query;
                let modulesToDispatch = [];
                let actionName = "filter";

                if(this.$props.actionName && this.$props.actionName.length) {
                    actionName = this.$props.actionName;
                }

                if (this.$props.storeModule) {
                    modulesToDispatch.push(this.$props.storeModule)
                }


                if (this.$props.storeModules) {
                    for(let index in this.$props.storeModules){
                        modulesToDispatch.push(this.$props.storeModules[index]);
                    }
                }

                if (this.$props.additionalParams) {
                    params = {filters: this.query, ...this.$props.additionalParams}
                }

                for (let i = 0; i < modulesToDispatch.length; i++) {
                    this.$store.dispatch(`${modulesToDispatch[i]}/${actionName}`, params);
                }
            },
            refreshSelects() {
                this.$nextTick(function () {
                    window.$('.selectpicker').selectpicker();
                    window.$('.selectpicker').selectpicker('refresh');
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                })
            },
            addFilter(array, element, keyName){
                if(element){
                    if(array.indexOf(element) < 0){
                        array.push(element);
                    }
                    element = undefined;
                    const keys = Object.keys(this.keys)
                    for (const key of keys) {
                        this.keys[key]++;
                    }
                    this.refreshSelects();
                }
            },
            removeFilter(array, element){
                array.splice(array.indexOf(element),1);
            },
            checkIfShown(filterKey){
                if(this.$props.projection == undefined  || (Object.entries(this.$props.projection).length === 0 && this.$props.projection.constructor === Object)) { //if it's empty
                    return true;
                }
                    let truthyProjection;
                if((Object.entries(this.$props.projection).length === 0 && this.$props.projection.constructor === Object)) { //if it's empty
                    return true;
                }
                truthyProjection = Object.values(this.$props.projection)[0]; //Assuming validation was correct, values must be all false or all true

                if((truthyProjection && this.$props.projection[filterKey]) || (!truthyProjection && !Object.keys(this.$props.projection).includes(filterKey))){
                    return true;
                }
                return false;
            }
            , numberOfFiltersExcludingSearch() {
                if(this.$props.projection == undefined  || (Object.entries(this.$props.projection).length === 0 && this.$props.projection.constructor === Object)) { //if it's empty
                    return 6;
                } else {
                    const dummy = JSON.parse(JSON.stringify(this.$props.projection));
                    delete dummy.search;
                    return Object.keys(dummy).length;
                }
            }
        }
    }
</script>

<style scoped>

</style>