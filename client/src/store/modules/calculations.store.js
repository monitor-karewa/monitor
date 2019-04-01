import calculationsApi from '@/api/calculations.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const calculationsCatalog = catalog(calculationsApi, 'calculations');

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