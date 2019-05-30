import dashboardApi from '@/api/dashboardAdmin.api';
import Vue from "vue";

const state = {
    visitsCount: 0,
    contractsCount : 0,
    proveedoresCount : 0,
    unidadesCount : 0,
    calculosCount : 0,
    notifications: []
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
    RELOAD_NOTIFICATIONS:({commit}) => {
        dashboardApi.getCurrentNotifications({}, (response) => {
            if (!response.data.error && response.data && response.data.data) {
                commit('SET_NOTIFICATION_DATA', {data: response.data.data});
            }
        }, (err) => {
            commit('SET_NOTIFICATION_DATA', {data: []});
        });
    }
}

const mutations = {
    SET_CURRENT_DATA_LOAD_INFO: (state, {data}) =>{
        state.visitsCount = data.visitsCount;
        state.contractsCount = data.contractsCount;
        state.proveedoresCount = data.proveedoresCount;
        state.unidadesCount = data.unidadesCount;
        state.calculosCount = data.calculosCount;
    },
    SET_NOTIFICATION_DATA:(state, {data}) =>{
        state.notifications = data.data;
        console.log("data");
        console.log(data);
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