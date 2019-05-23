import visitasMonitorSuppliers from '@/api/charts/admin/visitasMonitorSuppliers.api';
import chart from '@/store/modules/base/charts.store';
import Vue from "vue";

const visitasMonitorChart = chart(visitasMonitorSuppliers, 'adminCharts');

const state = {
};

const getters = {
};

const actions = {
};

const mutations = {
};



export default {
    namespaced: true,
    state: {
        ...visitasMonitorChart.state,
        ...state
    },
    getters: {
        ...visitasMonitorChart.getters,
        ...getters
    },
    actions: {
        ...visitasMonitorChart.actions,
        ...actions

    },
    mutations: {
        ...visitasMonitorChart.mutations,
        ...mutations
    }
};