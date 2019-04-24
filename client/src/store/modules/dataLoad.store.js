import i18n from '@/plugins/i18n';
import dataLoadApi from '@/api/dataLoad.api.js';
import { bus } from '@/main';

const state = {
    dataLoadInfo: {},
    dataLoad: null
};

const getters = {
};

const actions = {
    LOAD_CURRENT_DATA_LOAD_INFO: ({commit}) => {
        dataLoadApi.getCurrentInfo({}, (response) => {
            console.log('response', response);
            if (!response.data.error && response.data && response.data.data) {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
            }
        }, (err) => {
            //Error trying to load current data load info
        });
    },
    LOAD_CURRENT_DATA_LOAD: ({commit}) => {
        dataLoadApi.getCurrent({}, (response) => {
            console.log('response', response);
            if (!response.data.error && response.data) {
                commit('SET_CURRENT_DATA_LOAD', {dataLoad: response.data.data});
            }
        }, (err) => {
            //Error trying to load current data load info
        })
    },
    CANCEL_CURRENT_DATA_LOAD: ({commit}) => {
        dataLoadApi.cancelCurrent({}, (response) => {
            if (response.data.error) {
                tShow(i18n.t(response.data.message), 'danger');
            } else {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
                tShow(i18n.t(response.data.message), 'success');
            }
        }, (err) => {
            tShow(i18n.t('data-load.cancel.error.unexpected'), 'danger');
        });
    }
};

const mutations = {
    SET_CURRENT_DATA_LOAD_INFO: (state, {dataLoadInfo}) =>{
        state.dataLoadInfo = dataLoadInfo;
        bus.$emit('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', {dataLoadInfo});
    },
    
    SET_CURRENT_DATA_LOAD: (state, {dataLoad, canceled = false}) => {
        state.dataLoad = dataLoad;
        bus.$emit('dataLoad/CURRENT_DATA_LOAD_LOADED', {dataLoad, canceled});
    }
};



export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};