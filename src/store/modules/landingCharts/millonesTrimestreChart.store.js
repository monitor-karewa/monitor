import millonesTrimestreSuppliers from '@/api/charts/landing/millonesTrimestreSuppliers.api';
import chart from '@/store/modules/base/charts.store';
import Vue from "vue";

const millonesDePesosChart = chart(millonesTrimestreSuppliers, 'landingCharts');

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
        ...millonesDePesosChart.state,
        ...state
    },
    getters: {
        ...millonesDePesosChart.getters,
        ...getters
    },
    actions: {
        ...millonesDePesosChart.actions,
        ...actions

    },
    mutations: {
        ...millonesDePesosChart.mutations,
        ...mutations
    }
};