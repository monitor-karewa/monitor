import i18n from '@/plugins/i18n';
import dataLoadApi from '@/api/dataLoad.api.js';
import { bus } from '@/main';
import utils from '@/common/utils';

const state = {
    dataLoadInfo: {},
    dataLoad: null,
    filteredDataLoad: null,
    paginatedDataLoad: null,
    filtering: false,
    
    docName: 'contracts.contract',
    
    pagination: {
        total: 0,
        page: 1,
        records: 0,
        pages: 0,
        totalPages: 0
    }
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
        return state.dataLoad && state.dataLoad.details ? state.dataLoad.details : [];
    }
};

const actions = {
    LOAD_CURRENT_DATA_LOAD_INFO: ({commit}) => {
        dataLoadApi.getCurrentInfo({}, (response) => {
            if (!response.data.error && response.data && response.data.data) {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
                // commit('SET_PAGE_AND_PAGINATE', {page: 1});
            }
        }, (err) => {
            //Error trying to load current data load info
        });
    },
    
    LOAD_CURRENT_DATA_LOAD: ({commit}) => {
        commit('SET_FILTERING', true);
        dataLoadApi.getCurrent({}, (response) => {
            if (!response.data.error && response.data) {
                setTimeout(function () {
                    commit('SET_CURRENT_DATA_LOAD', {dataLoad: response.data.data});
                    commit('SET_FILTERED_CURRENT_DATA_LOAD', {filteredDataLoad: response.data.data.details});
                    commit('SET_PAGE_AND_PAGINATE', {page: 1});
                    commit('SET_FILTERING', false);
                });
            }
        }, (err) => {
            commit('SET_FILTERING', false);
            //Error trying to load current data load info
        })
    },
    
    CANCEL_CURRENT_DATA_LOAD: ({commit}) => {
        dataLoadApi.cancelCurrent({}, (response) => {
            if (response.data.error) {
                tShow(i18n.t(response.data.message), 'danger');
            } else {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
                // commit('SET_PAGE_AND_PAGINATE', {page: 1});
                tShow(i18n.t(response.data.message), 'success');
            }
        }, (err) => {
            tShow(i18n.t('data-load.cancel.error.unexpected'), 'danger');
        });
    },
    
    changePage: ({commit, state}, page) => {
        // commit('SET_PAGE_AND_PAGINATE', {page: 1});
        
        
        commit('SET_FILTERING', true);
        
        let paginatedPromise = new Promise((resolve, reject) => {
            let limit = 10;
            let skip = (state.pagination.page - 1) * limit;

            // state.paginatedDataLoad = state.filteredDataLoad;
            // state.paginatedDataLoad.details = state.paginatedDataLoad.details || [];

            // state.paginatedDataLoad.slice(skip, skip + limit);

            resolve(state.filteredDataLoad.slice(skip, skip + limit))
        });

        paginatedPromise.then((paginatedDataLoad) => {
            commit('SET_PAGE_AND_PAGINATE', {page: page, paginatedDataLoad: paginatedDataLoad});
            commit('SET_FILTERING', false);
        });
    },
    
    FILTER_CURRENT_DATA_LOAD: ({commit, getters}, search) => {

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
            commit('SET_PAGE_AND_PAGINATE', {page: 1});
            // commit('changePage', 1);
            commit('SET_FILTERING', false);
        }).catch((err) =>{
            commit('SET_FILTERED_CURRENT_DATA_LOAD', {dataToFilter});
            commit('SET_PAGE_AND_PAGINATE', {page: 1});
            // commit('changePage', 1);
            commit('SET_FILTERING', false);
        });
        
        
        // setTimeout(() => {
        //     commit('SET_FILTERED_CURRENT_DATA_LOAD', {filteredDataLoad});
        //     commit('SET_FILTERING', false);
        // }, 2000);
    },
    //Confirm current and save to database
    CONFIRM_CURRENT: ({commit}) => {
        dataLoadApi.confirmCurrent({}, (response) => {
            if (response.data.error) {
                tShow(i18n.t('data-load.confirm.error.unexpected'), 'danger');
            } else {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
                // commit('SET_PAGE_AND_PAGINATE', {page: 1});
                tShow(i18n.t('data-load.confirm.success'), 'success');
            }
        }, (err) => {
            tShow(i18n.t('data-load.confirm.error.unexpected'), 'danger');
        });
    },
    DOWNLOAD_VALIDATIONS: () => {
        dataLoadApi.downloadValidations({}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `monitor-karewa-validaciones-contratos.xlsx`);
            document.body.appendChild(link);
            link.click();
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
        
    },
    
    SET_PAGINATED_CURRENT_DATA_LOAD: (state, {filteredDataLoad}) => {

        let limit = 20;
        let skip = (state.pagination.page - 1) * limit;
        
        state.paginatedDataLoad = filteredDataLoad;
        state.paginatedDataLoad.details = state.paginatedDataLoad.details || [];

        state.paginatedDataLoad.details = state.paginatedDataLoad.details.splice(skip);

        state.filteredDataLoad = filteredDataLoad;
    },
    
    SET_FILTERED_CURRENT_DATA_LOAD: (state, {filteredDataLoad}) => {

        let startTime = new Date().getTime();


        state.filteredDataLoad = filteredDataLoad;
        //paginate then set paginatedDataLoad
        
        let count = 0;
        let total = filteredDataLoad.length || 0;

        let page = state.pagination.page;
        let limit = 10;
        // Calculate skips based on limit & page
        // let skip = (page - 1) * limit;


        state.pagination.total = total;
        state.pagination.page = page;
        state.pagination.pages = Math.floor(total / limit) + 1;
        //
        //
        //
        //
        // state.paginatedDataLoad = filteredDataLoad;
        // state.paginatedDataLoad.details = state.paginatedDataLoad.details || [];
        //
        // state.paginatedDataLoad.details = state.paginatedDataLoad.details.splice(skip);
        
        // If clasification is TODOS then all services are fetched
        // clasification = clasification === "TODOS" ? null : clasification;


        // filteredDataLoad.details.forEach((detail) => {
        //     if (skip < 1 && count < limit) {
        //         count++;
        //         return isValid;
        //     } else {
        //         skip--;
        //     }
        // });

        // let result = services.filter(function(service) {
        //     let isValid = clasification ? ( service.clasification === clasification ) : true;
        //     isValid = isValid && (service.comingSoon || service.activeService) && !(service.deleted && service.deleted.isDeleted);
        //     if (isValid) {
        //         total++;
        //         if (skip < 1 && count < limit) {
        //             count++;
        //             return isValid;
        //         } else {
        //             skip--;
        //         }
        //     }
        //     return false;
        // });
        // state.pagination.totalPages = Math.ceil(total / limit);
        // state.pagination.records = total;
        // state.pagination.pages = [];
        //
        // var idx = state.pagination.page - 2;
        // if(state.pagination.page == state.pagination.totalPages - 1){
        //     idx = state.pagination.page - 3;
        // }
        // if(state.pagination.page == state.pagination.totalPages){
        //     idx = state.pagination.page - 4;
        // }
        //
        // while(state.pagination.pages.length < 5 && state.pagination.pages.length < state.pagination.totalPages){
        //     if(idx > 0 && idx <= state.pagination.totalPages + 1){
        //         state.pagination.pages.push(idx);
        //     }
        //     idx++;
        // }
        //
        // return result;
        
        
        
    },

    SET_FILTERING: (state, setTo) => {
        state.filtering = setTo;
    },


    SET_PAGE_AND_PAGINATE: (state, {page, paginatedDataLoad}) => {
        state.pagination.page = page;


        // console.log('state.filteredDataLoad', state.filteredDataLoad);
        
        
        if (paginatedDataLoad) {
            state.paginatedDataLoad = paginatedDataLoad;
        } else {
            let limit = 10;
            let skip = (state.pagination.page - 1) * limit;
            
            state.paginatedDataLoad = state.filteredDataLoad;
            // state.paginatedDataLoad.details = state.paginatedDataLoad.details || [];
    
            state.paginatedDataLoad = state.paginatedDataLoad.slice(skip, skip + limit);
        }


        // console.log('state.paginatedDataLoad', state.paginatedDataLoad);
    }
};



export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};