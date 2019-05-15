import apiPublicComparations from '@/api/publicComparations.api';

import i18n from '@/plugins/i18n';

const state = {
    detailLeft: {
        organization: {},
        corruptionIndex: {},
        totals: {},
        counts: {},
    },
    detailRight: {
        organization: {},
        corruptionIndex: {},
        totals: {},
        counts: {},
    },
    corruptionIndex: {}
};

const getters = {

};

const actions = {
    LOAD_DETAIL ({commit}, {right, id, url}/*, page*/) {
        let query = `?id=${id}`;
        if (url && url.length) {
            query += `&url=${url}`;
        }
        apiPublicComparations.detail({query}, (result) => {
            
            let mutationName = right ? 'SET_DETAIL_RIGHT' : 'SET_DETAIL_LEFT';
            
            commit(mutationName, {
                detail: result.data.data, 
            });
        }, (err) => {
            tShow(i18n.t('comparations.public.load.error'), 'danger');
        });
    },
    LOAD_CORRUPTION_INDEX ({commit}, {id}) {
        let query = `?id=${id}`;
        apiPublicComparations.corruptionIndex({query}, (result) => {
            commit('SET_CORRUPTION_INDEX', {
                corruptionIndex: result.data.data, 
            });
        }, (err) => {
            tShow(i18n.t('comparations.public.load.corruption-index.error'), 'danger');
        });
    }
};

const mutations = {
    SET_DETAIL_LEFT (state, {detail}) {
        detail = detail || {};
        state.detailLeft = detail;
    },
    SET_DETAIL_RIGHT (state, {detail}) {
        detail = detail || {};
        state.detailRight = detail;
    },
    SET_CORRUPTION_INDEX (state, {corruptionIndex}) {
        corruptionIndex = corruptionIndex || {};
        state.corruptionIndex = corruptionIndex;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};