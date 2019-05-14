import apiPublicSuppliers from '@/api/publicSuppliers.api';
import contractsApi from '@/api/publicContracts.api';

import i18n from '@/plugins/i18n';
import Vue from "vue";

const state = {
    suppliers: [],
    totals: {},
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    },
    detail: {},
    adminstrativeUnitsForFilter : [],
    fiscalYears : [],
    trimonths : [],
    administrationPeriods : [],
    procedureTypes : [],
    lastQuery : {}
};

const storeName = 'publicSuppliers';

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
    },
    changePage ({commit, getters, state, dispatch}, page) {
        let oldPage = state.pagination.page;
        commit('UPDATE_PAGE',page);
        dispatch(`${storeName}/loadFilteredList`,state.lastQuery,{root:true});
    },
    loadContractDetail({commit}, id) {
        let query = `?id=${id}`;
        contractsApi.detail({query}, (result) => {
            commit('SET_CONTRACT_DETAIL', result.data);
        }, (err) => {
            tShow(i18n.t('suppliers.public.load.error'), 'danger');
            commit('SET_CONTRACT_DETAIL', {});
        })
    },
    getAdministrativeUnitsForFilter({commit}){
        contractsApi.retrieveAdministrativeUnitsForFilter({},
            (result)=>{
                commit('SET_ADMINISTRATIVE_UNITS_FILTER', result.data);
            })
    },
    getFiscalYears({commit}){
        contractsApi.retrieveFiscalYears({},
            (result)=>{
                commit('SET_FISCAL_YEARS', result.data);
            })
    },
    getTrimonths({commit}){
        contractsApi.retrieveTrimonths({},
            (result)=>{
                commit('SET_TRIMONTHS', result.data);
            })
    },
    getAdministrationPeriods({commit}){
        contractsApi.retrieveAdministrationPeriods({},
            (result)=>{
                commit('SET_ADMINISTRATION_PERIODS', result.data);
            })
    },
    getProcedureTypes({commit}){
        contractsApi.retrieveProceudureTypes({},
            (result)=>{
                if(result && result.data && result.data.length){
                    let procedureTypes = result.data.map(function (item) {
                        return item._id;
                    });
                    commit('SET_PROCEDURE_TYPES', procedureTypes);
                }
            })
    },
    filter({commit, dispatch},filters){
        commit('UPDATE_PAGE',1);
        dispatch(`${storeName}/loadFilteredList`,filters,{root:true});
    },
    loadFilteredList({commit, getters},filters){
        let query = getters.getUrlQuery;
        commit('SET_LAST_QUERY',filters);

        Vue.$log.info('filters' , filters);

        apiPublicSuppliers.filteredList(
            {
                query: query,
                filters : filters
            },
            (result) => {
                commit('SET_CONTRACTS', result.data.data);
            },
            (error) => {
                Vue.$log.error('Response error', error);
                tShow(`Hubo un error al cargar el listado : ${error}`);
            }
        )
    },
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
    },
    SET_ADMINISTRATIVE_UNITS_FILTER (state, administrativeUnits) {
        state.adminstrativeUnitsForFilter = administrativeUnits;
    },
    SET_FISCAL_YEARS (state, fiscalYears) {
        state.fiscalYears = fiscalYears;
    },
    SET_TRIMONTHS (state, trimonths) {
        state.trimonths = trimonths;
    },
    SET_ADMINISTRATION_PERIODS (state, administrationPeriods) {
        state.administrationPeriods = administrationPeriods;
    },
    SET_PROCEDURE_TYPES(state, procedureTypes) {
        state.procedureTypes = procedureTypes;
    },
    /**
     * Saves which was the last query used so it can change page when there are filtered results
     */
    SET_LAST_QUERY(state, lastQuery) {
        state.lastQuery.administrationPeriods = lastQuery.administrationPeriods;
        state.lastQuery.fiscalYears = lastQuery.fiscalYears;
        state.lastQuery.trimonths = lastQuery.trimonths;
        state.lastQuery.procedureTypes = lastQuery.procedureTypes;
        state.lastQuery.administrativeUnits = lastQuery.administrativeUnits;
        state.lastQuery.search = lastQuery.search;
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};