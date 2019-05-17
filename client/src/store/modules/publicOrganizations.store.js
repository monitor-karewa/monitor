import apiPublicOrganizations from '@/api/publicOrganizations.api';
import Vue from 'vue';

import i18n from '@/plugins/i18n';

const state = {
    organizations: [],
    baseRemoteUrl : undefined
};

const getters = {

};

const actions = {
    LOAD_ORGANIZATIONS ({commit}/*, page*/) {
        // let query = '';
        // if (page) {
        //     query += `?page=${page}`;
        // }
        apiPublicOrganizations.list({/*query*/}, (result) => {
            commit('SET_ORGANIZATIONS', result.data.data);
        }, (err) => {
            tShow(i18n.t('organizations.public.load.error'), 'danger');
            commit('SET_ORGANIZATIONS', {});
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
        console.log("docs", docs);
        console.log('baseRemoteUrl --> ' + baseRemoteUrl);
        state.organizations = docs || [];
        state.baseRemoteUrl = baseRemoteUrl;
        // state.totals = totals || {};
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};