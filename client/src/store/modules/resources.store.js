import resourcesApi from '@/api/resources.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const resourcesCatalog = catalog(resourcesApi, 'resources');

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
        ...resourcesCatalog.state,
        ...state
    },
    getters: {
        ...resourcesCatalog.getters,
        ...getters
    },
    actions: {
        ...resourcesCatalog.actions,
        ...actions

    },
    mutations: {
        ...resourcesCatalog.mutations,
        ...mutations
    }
};