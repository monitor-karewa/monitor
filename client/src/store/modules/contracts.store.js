import contractsApi from '@/api/contracts.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const contractsCatalog = catalog(contractsApi, 'contracts');

const state = {
    suppliers : []
};

const getters = {
};

const actions = {
    /**
     * Retrieves suppliers from DB to make them available at selection
     */
    getSuppliers({commit}){
        contractsApi.retrieveSuppliers({},
            (result)=>{
                commit('SET_SUPPLIERS', result.data.data.docs);
            })
    }
};

const mutations = {
    SET_SUPPLIERS(state, suppliers){
        state.suppliers = suppliers;
    },
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