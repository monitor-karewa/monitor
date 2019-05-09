import apiPublicSuppliers from '@/api/publicSuppliers.api';

import i18n from '@/plugins/i18n';

const state = {
    suppliers: [],
    totals: {},
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    },
};

const getters = {
    
};

const actions = {
    LOAD_SUPPLIERS ({commit}, page) {
        let query = '';
        if (page) {
            query += `?page=${page}`;
        }
        apiPublicSuppliers.list({query}, (result) => {
            commit('SET_SUPPLIERS', result.data.data); 
        }, (err) => {
            tShow(i18n.t('suppliers.public.load.error'), 'danger');
            commit('SET_SUPPLIERS', {}); 
        })
    }
};

const mutations = {
    SET_SUPPLIERS (state, {suppliers, totals, pagination}) {
        if (pagination) {
            state.pagination = pagination;
        }
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