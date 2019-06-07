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
    corruptionIndex: {},
    calculationsInfo: []
};

const getters = {

};

const actions = {
    downloadFile({commit},{format, id}) {
        apiPublicComparations.download({format,id}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            format = format == 'xls' ? 'xlsx' : format;
            link.setAttribute('download', `monitor-karewa-indice-corrupcion.${format}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    },
    downloadComparisonFile({commit,state},{format, id}) {
        let comparison = {
            detailRight:state.detailRight,
            detailLeft:state.detailLeft,
        };
        apiPublicComparations.downloadComparison({format,id, comparison}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            format = format == 'xls' ? 'xlsx' : format;
            link.setAttribute('download', `monitor-karewa-indice-corrupcion.${format}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    },

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
            // console.log('result.data.data', result.data.data);
            commit('SET_CORRUPTION_INDEX', result.data.data);
        }, (err) => {
            tShow(i18n.t('comparations.public.load.corruption-index.error'), 'danger');
        });
    },

    SAVE_COMPARATION({commit}, data) {
        apiPublicComparations.saveComparation(data, (result) => {
        }, (err) => {
            console.log("err", err);
        });
    },


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
    SET_CORRUPTION_INDEX (state, {corruptionIndex, calculationsInfo}) {
        corruptionIndex = corruptionIndex || {};

        calculationsInfo = calculationsInfo || [];
        state.corruptionIndex = corruptionIndex;
        state.calculationsInfo = calculationsInfo;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};