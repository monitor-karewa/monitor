import suppliersApi from '@/api/suppliers.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const suppliersCatalog = catalog(suppliersApi, 'suppliers');

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
