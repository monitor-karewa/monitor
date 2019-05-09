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
    detail: {}
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
    },
    LOAD_SUPPLIER_DETAIL ({commit}, id) {
        let query = `?id=${id}`;
        apiPublicSuppliers.detail({query}, (result) => {
            commit('SET_SUPPLIER_DETAIL', result.data.data); 
        }, (err) => {
            tShow(i18n.t('suppliers.public.load.error'), 'danger');
            commit('SET_SUPPLIER_DETAIL', {}); 
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
    },
    SET_SUPPLIER_DETAIL (state, detail) {
        state.detail = detail;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};