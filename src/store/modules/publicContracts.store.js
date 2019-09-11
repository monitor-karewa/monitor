import contractsApi from '@/api/publicContracts.api';
import Vue from "vue";


const storeName = "publicContracts";

const state = {
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    },
    listQuery : {
        search : ""
    },
    docName: "",
    selectedDocId: '',
    isEditingTable : false,
    contracts : [],
    totals: {
        totalAmount: 0.00,
        NO_BID: 0.00,
        PUBLIC: 0.00,
        INVITATION: 0.00
    },
    contractDetail : {},
    adminstrativeUnitsForFilter : [],
    fiscalYears : [],
    trimonths : [],
    administrationPeriods : [],
    procedureTypes : [],
    suppliers : [],
    lastQuery : {},
    lastUpdate : undefined
};

const getters = {
    getUrlQuery(state){
        let query = '?';
        if (state.pagination.page) {
            query += `page=${state.pagination.page}`
        }
        if(state.listQuery && state.listQuery.search){
            if(query.length > 2){
                query += '&';
            }
            query += `search=${state.listQuery.search}`
        }
        return query;
    },
    getSearchString(state){
        if(state.listQuery){
            return state.listQuery.search;
        }
        return "";
    }
};

const actions = {

    downloadFile({commit},{filters,format}) {
        contractsApi.download({filters,format}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            format = format == 'xls' ? 'xlsx' : format;
            link.setAttribute('download', `monitor-karewa-contratos.${format}`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    },

    /**
     * Retrieves administrative units from DB to make them available at selection
     */
    getAdministrativeUnits({commit}){
        contractsApi.retrieveAdministrativeUnits({},
            (result)=>{
                commit('SET_ADMINISTRATIVE_UNITS', result.data.data.docs);
            })
    },

    list ({commit,getters}, searchString ) {
        let query = getters.getUrlQuery;

        contractsApi.list(
            { query },
            (result) => {
                // console.log('result', result);
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('SET_CONTRACTS', result.data.data);
                commit('SET_TOTALS', result.data.data.totals);
                commit('SET_LAST_UPDATE', result.data.lastUpdate);
            },
            (error) => {
                // console.log('error', error);
                Vue.$log.error('Response error', error);
                tShow(`Hubo un error al cargar el listado : ${error}`);
            }
        )
    },
    getTotals({commit}) {
        contractsApi.calculateTotals({}, function (result) {
            commit('SET_TOTALS', result.data);
        })
    },
    getSearchString(state) {
        if (state.listQuery) {
            return state.listQuery.search;
        }
        return "";
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

        contractsApi.filteredList(
            {
                query: query,
                filters : filters
            },
            (result) => {
                commit('SET_CONTRACTS', result.data.data);
                commit('SET_TOTALS', result.data.data.totals);
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
    SET_CONTRACTS(state, {docs, total, page, pages}) {
        state.contracts = docs;
        state.pagination.total = total;
        state.pagination.page = page;
        state.pagination.pages = pages;
    },
    SET_ADMINISTRATIVE_UNITS(state, administrativeUnits){
        state.administrativeUnits = administrativeUnits;
    },
    setDocName (state, docName) {
        state.docName = docName;
    },
    SET_SEARCH(state,search){
        state.listQuery.search = search;
    },
    UPDATE_PAGE(state,page){
        state.pagination.page = page;
    },
    SET_TOTALS(state,results){
        if(results && results.length){
            state.totals.totalAmount = results[0].totalAmount;

            // Totals to update
            let totalsToUpdate = Object.keys(state.totals);

            // Delete unnecessary element totalAmount
            try {
                totalsToUpdate.splice( totalsToUpdate.indexOf("totalAmount"), 1 );
            } catch (e) {
                console.error("Unable to delete element from totals to update");
            }

            for (let i = 0; i < results.length; i++) {
                state.totals[results[i]._id] = results[i].total;

                // Update totalsToUpdate
                try {
                    totalsToUpdate.splice( totalsToUpdate.indexOf(results[i]._id), 1 );
                } catch (e) {
                    console.error("Unable to delete element from totals to update");
                }

            }

            // Iterate missing contract type and assign 0 in result
            for (let i = 0; i < totalsToUpdate.length; i++) {
                state.totals[totalsToUpdate[i]] = 0;
            }
        } else {
            state.totals = {
                totalAmount: 0.00,
                NO_BID: 0.00,
                PUBLIC: 0.00,
                INVITATION: 0.00
            }
        }

        // state.pagination.page = page;
    },
    SET_CONTRACT_DETAIL (state, detail) {
        state.contractDetail = detail.data;
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
    SET_SUPPLIERS_FOR_FILTER(state, suppliers) {
        state.suppliers = suppliers;
    },
    SET_LAST_UPDATE(state, lastUpdate){
        state.lastUpdate = lastUpdate
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
        state.lastQuery.suppliers = lastQuery.suppliers;
        state.lastQuery.search = lastQuery.search;
    },
};



export default {
    namespaced: true,
    state: {
        ...state
    },
    getters: {
        ...getters
    },
    actions: {
        ...actions

    },
    mutations: {
        ...mutations
    }
};