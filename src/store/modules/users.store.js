import usersApi from '@/api/users.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";
import * as events from "../events";

const suppliersCatalog = catalog(usersApi, 'users');

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
        ...suppliersCatalog.state,
        ...state
    },
    getters: {
        ...suppliersCatalog.getters,
        ...getters
    },
    actions: {
        ...suppliersCatalog.actions,
        ...actions

    },
    mutations: {
        ...suppliersCatalog.mutations,
        ...mutations
    }
};
