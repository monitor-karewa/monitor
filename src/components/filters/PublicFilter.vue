<template>
    <div>
        <div class="filter">
            <div class="filter-container">
                <input class="input-search" type="text" name="" value="" v-model="query.search"
                       :placeholder="placeHolder" />
            </div>
            <button @click="filter" class="filter-btn" type="button" name="button">Buscar</button>
        </div>
        <div class="m-t-10">
            <div class="filter-box">
                <div class="filter">
                    <div class="filter-container row m-0">
                        <div class="form-group fg-float border-select m-0 p-0 col-lg-3 col-6">
                            <div class="fg-line m-0">
                                <select v-model="temp.administrationPeriod" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar administración"
                                        title="Por administración" @change="addFilter(query.administrationPeriods, temp.administrationPeriod)">
                                    <option v-for="item in administrationPeriods" :value="item">
                                        ADMINISTRACIÓN {{item.administrationPeriod}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                            <div class="fg-line m-0">
                                <select v-model="temp.fiscalYear" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar año" title="Por año…" @change="addFilter(query.fiscalYears, temp.fiscalYear)">
                                    <optGroup>
                                        <option :value="undefined"> Por año...</option>
                                    </optGroup>
                                    <option v-for="item in fiscalYears" :value="item">{{item.fiscalYear}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                            <div class="fg-line m-0">
                                <select v-model="temp.trimonth" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar trimestre"
                                        title="Por trimestre…" @change="addFilter(query.trimonths, temp.trimonth)">
                                        <option v-for="trimonth in trimonths"  :value="trimonth">
                                            {{trimonth.period}}
                                        </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                            <div class="fg-line m-0">
                                <select v-model="temp.procedureType" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar trimestre"
                                        title="Por tipo de procedimiento" @change="addFilter(query.procedureTypes, temp.procedureType)">
                                        <option v-for="procedureType in procedureTypes" :value="procedureType">
                                            {{$t(procedureType)}}
                                        </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group fg-float border-select m-0 p-0 col-lg-3 col-6">
                            <div class="fg-line m-0">
                                <select v-model="temp.administrativeUnit" class="form-control select selectpicker" data-live-search="true"
                                        data-live-search-placeholder="Buscar administrativa"
                                        title="Por unidad administrativa…" @change="addFilter(query.administrativeUnits, temp.administrativeUnit)">
                                            <optGroup>
                                                <option :value="undefined"> Por Unidad...</option>
                                            </optGroup>
                                    <option v-for="unit in administrativeUnits" :value="unit">{{unit.name}}</option>
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
                    <span class="tag-title">Filtros:</span>
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
            </div>
        <!--<button id="refresh-selects-button" style="display:none" type="button" @click="refreshSelects">click mee!!!-->
        </button>
    </div>
</template>

<script>
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
                    search : ""
                },
                temp : {
                    administrationPeriod : undefined,
                    fiscalYear : undefined,
                    trimonth : undefined,
                    procedureType : undefined,
                    administrativeUnit : undefined
                }
            }
        },
        props: {
            administrationPeriods: {
                type: Array,
                default: []
            },
            fiscalYears: {
                type: Array,
                default: []
            },
            trimonths: {
                type: Array,
                default: []
            },
            procedureTypes: {
                type: Array,
                default: []
            },
            administrativeUnits: {
                type: Array,
                default: []
            },
            actionName : String,
            storeModule : {
                type: String
            },
            storeModules : {
                type: Array
            },
            additionalParams : {
                type: Object
            },
            placeHolder: {
                type: String,
                default:"Escribe el nombre del contrato.."
            }
        },
        mounted() {
            this.$nextTick(function () {
                $(document).ready(function () {
                    setTimeout(function () {
                        $("#refresh-selects-button").click();
                    },2000);
                })
            })
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
                    window.$('.selectpicker').selectpicker();
                    window.$('.selectpicker').selectpicker('refresh');
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
            },
            addFilter(array, element){
                if(array.indexOf(element) < 0){
                    array.push(element);
                }
                element = undefined;
                this.refreshSelects();
            },
            removeFilter(array, element){
                array.splice(array.indexOf(element),1);
            }
        }
    }
</script>

<style scoped>

</style>