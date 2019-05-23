import visitasRutasSuppliers from '@/api/charts/admin/visitasRutasSuppliers.api';
import chart from '@/store/modules/base/charts.store';
import Vue from "vue";

const visitasRutasChart = chart(visitasRutasSuppliers, 'adminCharts');

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
        ...visitasRutasChart.state,
        ...state
    },
    getters: {
        ...visitasRutasChart.getters,
        ...getters
    },
    actions: {
        ...visitasRutasChart.actions,
        ...actions

    },
    mutations: {
        ...visitasRutasChart.mutations,
        ...mutations
    }
};