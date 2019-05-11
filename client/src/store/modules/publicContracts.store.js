import contractsApi from '@/api/publicContracts.api';
import catalog from '@/store/modules/base/catalog.store';
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
    contractDetail : {}
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
    /**
     * Retrieves suppliers from DB to make them available at selection
     */
    getAdministrativeUnits({commit}){
        contractsApi.retrieveAdministrativeUnits({},
            (result)=>{
                commit('SET_ADMINISTRATIVE_UNITS', result.data.data.docs);
            })
    },

    list ({commit,getters}, searchString ) {
        console.log("publicContracts.store#list");
        if(searchString && searchString.length){
            commit('SET_SEARCH',searchString);
            commit('UPDATE_PAGE',1);
        } else {
            commit('SET_SEARCH',"");
        }
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
    changePage ({commit, getters, state}, page) {
        console.log('page --> ' + page);
        let oldPage = state.pagination.page;
        commit('UPDATE_PAGE',page);
        let query = getters.getUrlQuery;
        contractsApi.list(
            { query },
            (result) => {
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('SET_CONTRACTS', result.data.data);
            },
            (error) => {
                Vue.$log.error('Response error', error);
                tShow(`Hubo un error en el paginado: ${error}`);
            }
        )
    },
    loadContractDetail({commit}, id) {

        let query = `?id=${id}`;
        contractsApi.detail({query}, (result) => {
            commit('SET_CONTRACT_DETAIL', result.data);
        }, (err) => {
            tShow(i18n.t('suppliers.public.load.error'), 'danger');
            commit('SET_CONTRACT_DETAIL', {});
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
            for (let i = 0; i < results.length; i++) {
                state.totals[results[i]._id] = results[i].total;
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
    }
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