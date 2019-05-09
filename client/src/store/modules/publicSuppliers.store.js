import apiPublicSuppliers from '@/api/publicSuppliers.api'; 

const state = {
    suppliers: [],
    totals: {}
};

const getters = {
    
};

const actions = {
    LOAD_SUPPLIERS ({commit}) {
        apiPublicSuppliers.list({}, (result) => {
            commit('SET_SUPPLIERS', result.data.data); 
        }, (err) => {
            
        })
    }
};

const mutations = {
    SET_SUPPLIERS (state, {suppliers, totals}) {
        state.suppliers = suppliers || [];
        state.totals = totals || {};
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};