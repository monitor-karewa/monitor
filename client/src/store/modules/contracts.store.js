import contractsApi from '@/api/contracts.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const contractsCatalog = catalog(contractsApi, 'contracts');

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
        ...contractsCatalog.state,
        ...state
    },
    getters: {
        ...contractsCatalog.getters,
        ...getters
    },
    actions: {
        ...contractsCatalog.actions,
        ...actions

    },
    mutations: {
        ...contractsCatalog.mutations,
        ...mutations
    }
};