import ejercidoProcedimientoSuppliers from '@/api/charts/landing/ejercidoProcedimientoChartSuppliers.api';
import chart from '@/store/modules/base/charts.store';
import Vue from "vue";

const ejercidoProcedimientoChart = chart(ejercidoProcedimientoSuppliers, 'landingCharts');

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
        ...ejercidoProcedimientoChart.state,
        ...state
    },
    getters: {
        ...ejercidoProcedimientoChart.getters,
        ...getters
    },
    actions: {
        ...ejercidoProcedimientoChart.actions,
        ...actions

    },
    mutations: {
        ...ejercidoProcedimientoChart.mutations,
        ...mutations
    }
};