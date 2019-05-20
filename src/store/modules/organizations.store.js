import organizationsApi from '@/api/organizations.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const organizationsCatalog = catalog(organizationsApi, 'organizations');

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
        ...organizationsCatalog.state,
        ...state
    },
    getters: {
        ...organizationsCatalog.getters,
        ...getters
    },
    actions: {
        ...organizationsCatalog.actions,
        ...actions

    },
    mutations: {
        ...organizationsCatalog.mutations,
        ...mutations
    }
};