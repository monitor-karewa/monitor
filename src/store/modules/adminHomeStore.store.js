import dashboardApi from '@/api/dashboardAdmin.api';
import Vue from "vue";

const state = {
    visitsCount: 0,
    contractsCount : 0,
    proveedoresCount : 0,
    unidadesCount : 0,
    calculosCount : 0
};

const getters = {

};

const actions = {
    LOAD_GENERAL_INFO_DASHBOARD: ({commit}) => {
        dashboardApi.getCurrentInfo({}, (response) => {
            if (!response.data.error && response.data && response.data.data) {
                commit('SET_CURRENT_DATA_LOAD_INFO', {data: response.data.data});
            }
        }, (err) => {
            //Error trying to load current data load info
        });
    },
}

const mutations = {
    SET_CURRENT_DATA_LOAD_INFO: (state, {data}) =>{
        state.visitsCount = data.visitsCount;
        state.contractsCount = data.contractsCount;
        state.proveedoresCount = data.proveedoresCount;
        state.unidadesCount = data.unidadesCount;
        state.calculosCount = data.calculosCount;
    }
};



export default {
    namespaced: true,
    state: {
        ...state
    },
    getters: {
        ...getters
    },
    actions: {
        ...actions

    },
    mutations: {
        ...mutations
    }
};