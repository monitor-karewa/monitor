import apiPublicResources from '@/api/publicResources.api';

import i18n from '@/plugins/i18n';

const state = {
    article: [],
    notes: [],
    legalFramework: [],
    website: [],
};

const getters = {
};

const actions = {
    LOAD_RESOURCES ({commit}, {page, search}) {
        let query = '';
        if (page) {
            query += `?page=${page}`;
        }
        if (search) {
            if (!query.length) {
                query += `?`;
            } else {
                query += `&`;
            }
            query += `search=${search}`;
        }
        apiPublicResources.list({query}, (result) => {
            commit('SET_RESOURCES', result.data.data);
        }, (err) => {
            tShow(i18n.t('resources.public.load.error'), 'danger');
            commit('SET_RESOURCES', {});
        })
    }
};

const mutations = {
    SET_RESOURCES (state, {article, notes, legalFramework, website/*, totals, pagination*/}) {
        // if (pagination) {
        //     state.pagination = pagination;
        // }
        state.article = article || [];
        state.notes = notes || [];
        state.legalFramework = legalFramework || [];
        state.website = website || [];
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