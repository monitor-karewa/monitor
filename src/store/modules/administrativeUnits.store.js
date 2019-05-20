import administrativeUnitsApi from '@/api/administrativeUnits.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const administrativeUnitsCatalog = catalog(administrativeUnitsApi, 'administrativeUnits');

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
        ...administrativeUnitsCatalog.state,
        ...state
    },
    getters: {
        ...administrativeUnitsCatalog.getters,
        ...getters
    },
    actions: {
        ...administrativeUnitsCatalog.actions,
        ...actions

    },
    mutations: {
        ...administrativeUnitsCatalog.mutations,
        ...mutations
    }
};