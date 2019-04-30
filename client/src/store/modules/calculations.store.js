import calculationsApi from '@/api/calculations.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const calculationsCatalog = catalog(calculationsApi, 'calculations');

const state = {
    variables:{}
};

const getters = {
};

const actions = {
    fetchVariables({commit}){
        calculationsApi.getVariables({}, (results) => {
            Vue.$log.info("Response", results);
            commit("SET_VARIABLES",results.data);
        },
        (error) => {
            Vue.$log.info("Response error", error);
            tShow(`Hubo un error al cargar las variables: ${error}`);
        });
    }

};

const mutations = {
    SET_VARIABLES(state,vars){
        state.variables = vars;
    }
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