import apiPublicOrganizations from '@/api/publicOrganizations.api';

import i18n from '@/plugins/i18n';

const state = {
    organizations: []
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
    }
};

const mutations = {
    SET_ORGANIZATIONS (state, {docs/*, totals, pagination*/}) {
        // if (pagination) {
        //     state.pagination = pagination;
        // }
        state.organizations = docs || [];
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