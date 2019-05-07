import i18n from '@/plugins/i18n';
import dataLoadApi from '@/api/dataLoad.api.js';
import { bus } from '@/main';
import utils from '@/common/utils';

const state = {
    dataLoadInfo: {},
    dataLoad: null,
    filteredDataLoad: null,
    filtering: false,
    
    docName: 'contracts.contract'
};

const getters = {
    // filteredDataLoad (state) {
    //     if (state._filteredDataLoad) {
    //         console.log('returning state._filteredDataLoad', state._filteredDataLoad);
    //         return state._filteredDataLoad;
    //     } else if (state.dataLoad) {
    //         console.log('returning state.dataLoad', state.dataLoad);
    //         return state.dataLoad.data;
    //     } else {
    //         console.log('returning []');
    //         return [];
    //     }
    // },
    rawData (state) {
        return state.dataLoad && state.dataLoad.data ? state.dataLoad.data : [];
    }
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
                commit('SET_FILTERED_CURRENT_DATA_LOAD', {filteredDataLoad: response.data.data.details});
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
    },
    
    FILTER_CURRENT_DATA_LOAD: ({commit, getters}, search) => {

        console.log('state', state);
        // let filteredDataLoad = getters.rawData;
        // let filteredDataLoad = [];
        //
        // console.log('filteredDataLoad', filteredDataLoad);

        //TODO: filter data
        commit('SET_FILTERING', true);
        let dataToFilter = getters.rawData;
        
        let filterPromise = new Promise((resolve, reject) =>{
            let filteredData = [];
            
            if (!search || !search.length) {
                return resolve(dataToFilter);
            }
            
            dataToFilter.forEach((rowInfo) => {
                let keys = Object.keys(rowInfo);
                for (let key of keys) {
                    if (rowInfo[key].value && rowInfo[key].value.toString().match(utils.toAccentsRegex(search, 'i'))) {
                        filteredData.push(rowInfo);
                        break;
                    }
                }
            });

            return resolve(filteredData);
        });

        filterPromise.then((filteredDataLoad) => {
            commit('SET_FILTERED_CURRENT_DATA_LOAD', {filteredDataLoad});
            commit('SET_FILTERING', false);
        }).catch((err) =>{
            commit('SET_FILTERED_CURRENT_DATA_LOAD', {dataToFilter});
            commit('SET_FILTERING', false);
        });
        
        
        // setTimeout(() => {
        //     commit('SET_FILTERED_CURRENT_DATA_LOAD', {filteredDataLoad});
        //     commit('SET_FILTERING', false);
        // }, 2000);
    },
};

const mutations = {
    SET_CURRENT_DATA_LOAD_INFO: (state, {dataLoadInfo}) =>{
        state.dataLoadInfo = dataLoadInfo;
        bus.$emit('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', {dataLoadInfo});
    },
    
    SET_CURRENT_DATA_LOAD: (state, {dataLoad, canceled = false}) => {
        state.dataLoad = dataLoad;
        bus.$emit('dataLoad/CURRENT_DATA_LOAD_LOADED', {dataLoad, canceled});
    },
    
    SET_FILTERED_CURRENT_DATA_LOAD: (state, {filteredDataLoad}) => {
        state.filteredDataLoad = filteredDataLoad;
    },

    SET_FILTERING: (state, setTo) => {
        console.log('setTo', setTo);
        state.filtering = setTo;
    }
};



export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};