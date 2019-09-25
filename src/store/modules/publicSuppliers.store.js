import apiPublicSuppliers from '@/api/publicSuppliers.api';
import contractsApi from '@/api/publicContracts.api';

import i18n from '@/plugins/i18n';
import Vue from "vue";

const state = {
    suppliers: [],
    allSuppliers: [],
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
    lastQuery : {},
    lastUpdate : undefined,
    filters: {}
};

const storeName = 'publicSuppliers';

const getters = {
    
};

const actions = {
    downloadFile({commit},{filters,format, isDetail, id}) {
        let action = isDetail ? 'downloadDetail' : 'download';
        apiPublicSuppliers[action]({filters,format,id}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            format = format == 'xls' ? 'xlsx' : format;
            link.setAttribute('download', `monitor-karewa-proveedores.${format}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    },
    LOAD_SUPPLIERS ({commit}, page) {
        let query = '';
        if (page) {
            query += `?page=${page}`;
        }
        apiPublicSuppliers.list({query}, (result) => {
            commit('SET_SUPPLIERS', result.data.data);
            commit('SET_LAST_UPDATE', result.data.lastUpdate);
        }, (err) => {
            tShow(i18n.t('suppliers.public.load.error'), 'danger');
            commit('SET_SUPPLIERS', {});
        })
    },
    LOAD_SUPPLIER_DETAIL ({commit}, {filters, id}) {
        let query = `?id=${id}`;

        if(filters){
            commit('SET_LAST_QUERY',filters);
            apiPublicSuppliers.detailFiltered({query, filters}, (result) => {
                commit('SET_SUPPLIER_DETAIL_CONTRACTS', result.data.data);
            }, (err) => {
                tShow(i18n.t('suppliers.public.load.error'), 'danger');
                commit('SET_SUPPLIER_DETAIL', {});
            })
        } else {
            apiPublicSuppliers.detail({query}, (result) => {
                commit('SET_SUPPLIER_DETAIL', result.data.data);
            }, (err) => {
                tShow(i18n.t('suppliers.public.load.error'), 'danger');
                commit('SET_SUPPLIER_DETAIL', {});
            })
        }
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
    getAdministrativeUnitsForFilter({commit}, supplierId){
        let query;
        if(supplierId){
            query = "?supplierId=" + supplierId;
        }
        contractsApi.retrieveAdministrativeUnitsForFilter({query: query},
            (result)=>{
                commit('SET_ADMINISTRATIVE_UNITS_FILTER', result.data);
            })
    },
    getFiscalYears({commit}, supplierId){
        let query;
        if(supplierId){
            query = "?supplierId=" + supplierId;
        }
            contractsApi.retrieveFiscalYears({query : query},
            (result)=>{
                commit('SET_FISCAL_YEARS', result.data);
            })
    },
    getTrimonths({commit}, supplierId){
        let query;
        if(supplierId){
            query = "?supplierId=" + supplierId;
        }
        contractsApi.retrieveTrimonths({query : query},
            (result)=>{
                commit('SET_TRIMONTHS', result.data);
            })
    },
    getAdministrationPeriods({commit}, supplierId){
        let query;
        if(supplierId){
            query = "?supplierId=" + supplierId;
        }
        contractsApi.retrieveAdministrationPeriods({query : query},
            (result)=>{
                commit('SET_ADMINISTRATION_PERIODS', result.data);
            })
    },
    getProcedureTypes({commit}, supplierId){
        let query;
        if(supplierId){
            query = "?supplierId=" + supplierId;
        }
        contractsApi.retrieveProceudureTypes({query : query},
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
        this.state.filters = JSON.parse(JSON.stringify(filters));
        commit('UPDATE_PAGE',1);
        dispatch(`${storeName}/loadFilteredList`, 1,{root:true});
    },
    loadFilteredList({commit, getters}, page){
        let filters = this.state.filters;
        let query = getters.getUrlQuery ? `${getters.getUrlQuery}&page=${page}` : `?page=${page}`;
        if (filters) {
            commit('SET_LAST_QUERY',filters);
        }

        Vue.$log.info('filters' , filters);

        apiPublicSuppliers.filteredList(
            {
                query,
                filters
            },
            (result) => {
                commit('SET_SUPPLIERS', result.data.data);
            },
            (error) => {
                Vue.$log.error('Response error', error);
                tShow(`Hubo un error al cargar el listado : ${error}`);
            }
        )
    },
    getSuppliersForFilter({commit}) {
        contractsApi.retrieveSuppliersForFilter({},
            (result) => {
                if (result && result.data) {
                    commit('SET_SUPPLIERS_FOR_FILTER', result.data);
                }
            })
    }
};

const mutations = {
    SET_SUPPLIERS (state, {suppliers, totals, pagination}) {
        if (pagination) {
            state.pagination = pagination;
        }
        state.suppliers = suppliers || [];
        state.totals = totals || {};
    },
    SET_LAST_UPDATE(state, lastUpdate){
        state.lastUpdate = lastUpdate
    },
    SET_SUPPLIER_DETAIL (state, detail) {
        state.detail = detail;
    },
    SET_SUPPLIER_DETAIL_CONTRACTS(state, detail) {
        if(detail){
            state.detail = detail;
        } else {
            state.detail.totals = 0;
            state.detail.public = [];
            state.detail.invitation = [];
            state.detail.noBid = [];
        }
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
    UPDATE_PAGE(state, page) {
        state.pagination.page = page;
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
    SET_SUPPLIERS_FOR_FILTER(state, suppliers) {
        state.allSuppliers = suppliers;
    },
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};