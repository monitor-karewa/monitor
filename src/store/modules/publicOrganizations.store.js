import apiPublicOrganizations from '@/api/publicOrganizations.api';
import apiPublicComparations from '@/api/publicComparations.api';
import Vue from 'vue';

import i18n from '@/plugins/i18n';

const state = {
    organizations: [],
    baseRemoteUrl : undefined,
    comparations : []
};

const getters = {

};

const actions = {
    LOAD_ORGANIZATIONS ({commit},/*, page*/{callback}) {
        // let query = '';
        // if (page) {
        //     query += `?page=${page}`;
        // }
        apiPublicOrganizations.list({/*query*/}, (result) => {
            commit('SET_ORGANIZATIONS', result.data.data);
            if (callback) {
                callback();
            }
        }, (err) => {
            tShow(i18n.t('organizations.public.load.error'), 'danger');
            commit('SET_ORGANIZATIONS', {});
        })
    },
    LOAD_COMPARATIONS ({commit}/*, page*/) {
        apiPublicComparations.retrieveRecentComparations({/*query*/}, (result) => {
            commit('SET_COMPARATIONS', result.data.data);
        }, (err) => {
            commit('SET_COMPARATIONS', []);
        })
    },
    SEARCH_ORGANIZATIONS ({commit}, search) {
        let query = `/?search=${search}`;
        apiPublicOrganizations.getOrganizationsFromOuterServer({query :  query}, (result) => {
            Vue.$log.info('result' , result.data);
            commit('SET_ORGANIZATIONS', result.data);
        }, (err) => {
            tShow(i18n.t('organizations.public.load.error'), 'danger');
            commit('SET_ORGANIZATIONS', {});
        })
    },
};

const mutations = {
    SET_ORGANIZATIONS (state, {docs, baseRemoteUrl/*, totals, pagination*/}) {
        // if (pagination) {
        //     state.pagination = pagination;
        // }
        state.organizations = docs || [];
        state.baseRemoteUrl = baseRemoteUrl;
        // state.totals = totals || {};
    },
    SET_COMPARATIONS (state, comparations) {
        state.comparations = comparations || [];
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};