import calculationsApi from '@/api/calculations.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const calculationsCatalog = catalog(calculationsApi, 'calculations');

const state = {
    variables:{},
    calculations:[],
    formulaValidation : {},
    formulaValidated : false
};

const getters = {
    variablesObj : function (state) {
        return state.variables;
    },
    calculationsForFormula : function (state) {
        Vue.$log.info('state.calculations' , state.calculations);
        return state.calculations;
    }
};

const actions = {
    fetchVariables({commit}){
        calculationsApi.getVariables({}, (results) => {
            commit("SET_VARIABLES",results.data);
        },
        (error) => {
            Vue.$log.info("Response error", error);
            tShow(`Hubo un error al cargar las variables: ${error}`);
        });
    },
    fetchCalculations({commit}){
        calculationsApi.getCalculationsForFormula({}, (results) => {
                commit("SET_FORMULA_CALCULATIONS",results.data.data.docs);
            },
            (error) => {
                Vue.$log.info("Response error", error);
                tShow(`Hubo un error al cargar las variables: ${error}`);
            });
    },
    validateFormula({commit}){
        calculationsApi.validateFormula({}, (results) => {
                commit("SET_FORMULA_VALIDATION",results.data);
            },
            (error) => {
                Vue.$log.info("Response error", error);
                tShow(`An error ocurred while trying to validate the formula: ${error}`);
            });
    },

};

const mutations = {
    SET_VARIABLES(state,vars){
        Vue.$log.info('vars' , vars);
        state.variables = vars;
    },
    SET_FORMULA_CALCULATIONS(state,calculations){
        state.calculations = calculations;
    },
    SET_FORMULA_VALIDATION(state,result){
        state.formulaValidation = result;
        state.formulaValidated = true;
    },
    clearFormulaValidation(state){
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