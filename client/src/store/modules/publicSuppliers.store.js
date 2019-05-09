import apiPublicSuppliers from '@/api/publicSuppliers.api';

import i18n from '@/plugins/i18n';

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
            tShow(i18n.t('suppliers.public.load.error'), 'danger');
            commit('SET_SUPPLIERS', {}); 
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