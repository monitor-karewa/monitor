import calculationsApi from '@/api/calculations.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const calculationsCatalog = catalog(calculationsApi, 'calculations');

const state = {
    variables:{},
    calculations:[],
    formulaValidation : {},
    formulaValidated : false,
    suppliers : [],
    administrativeUnits : []
};

const getters = {
    variablesObj : function (state) {
        return state.variables;
    },
    calculationsForFormula : function (state) {
        return state.calculations;
    }
};

const actions = {
    getAdministrativeUnits({commit}){
        calculationsApi.retrieveAdministrativeUnits({},
            (result) => {
                commit('SET_ADMINISTRATIVE_UNITS', result.data.data.docs)
            })
    },
    getSuppliers({commit}){
        calculationsApi.retrieveSuppliers({},
            (result)=>{
                commit('SET_SUPPLIERS', result.data.data.docs);
            })
    },
    fetchVariables({commit}){
        calculationsApi.getVariables({}, (results) => {
            commit("SET_VARIABLES",results.data);
        },
        (error) => {
            Vue.$log.info("Response error", error);
            tShow(`Hubo un error al cargar las variables: ${error}`);
        });
    },
    fetchCalculations({commit}, {id}){
        let query = '';
        if (id) {
            query = `?currentCalculationId=${id}`;
        }
        calculationsApi.getCalculationsForFormula({query}, (results) => {
                commit("SET_FORMULA_CALCULATIONS",results.data.data.docs);
            },
            (error) => {
                Vue.$log.info("Response error", error);
                tShow(`Hubo un error al cargar las variables: ${error}`);
            });
    },
    validateFormula({commit}, formula){
        calculationsApi.validateFormula(formula, (results) => {
                commit("SET_FORMULA_VALIDATION",results.data);
            },
            (error) => {
                Vue.$log.info("Response error", error);
                tShow(`An error ocurred while trying to validate the formula: ${error}`);
            });
    },
    clearFormulaValidation({commit}){
        commit('CLEAR_FORMULA_VALIDATION');
    }

};

const mutations = {
    SET_VARIABLES(state,vars){
        state.variables = vars;
    },
    SET_FORMULA_CALCULATIONS(state,calculations){
        state.calculations = calculations;
    },
    SET_FORMULA_VALIDATION(state,result){
        state.formulaValidation = result;
        state.formulaValidated = true;
    },
    SET_ADMINISTRATIVE_UNITS (state, administrativeUnits) {
        state.administrativeUnits = administrativeUnits;
    },
    SET_SUPPLIERS(state, suppliers){
        state.suppliers = suppliers;
    },
    CLEAR_FORMULA_VALIDATION(state){
        state.formulaValidated = false;
        state.formulaValidation = {};
    },
};



export default {
    namespaced: true,
    state: {
        ...calculationsCatalog.state,
        ...state
    },
    getters: {
        ...calculationsCatalog.getters,
        ...getters
    },
    actions: {
        ...calculationsCatalog.actions,
        ...actions

    },
    mutations: {
        ...calculationsCatalog.mutations,
        ...mutations
    }
};