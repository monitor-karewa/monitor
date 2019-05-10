import contractsApi from '@/api/publicContracts.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";


const storeName = "publicContracts";

const state = {
    docs: [],
    docsUpdated :[],
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    },
    listQuery : {
        search : ""
    },
    docName: '',
    selectedDocId: '',
    isEditingTable : false,
    entrySelected : {},
    contracts : [],
    administrativeUnits : [],
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
    docsUpdatedLength: state => state.docsUpdated.length,
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
    getSuppliers({commit}){
        contractsApi.retrieveSuppliers({},
            (result)=>{
                commit('SET_SUPPLIERS', result.data.data.docs);
            })
    },
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
        Vue.$log.info(`Calling action ${storeName}/list`);

        let query = getters.getUrlQuery;

        contractsApi.list(
            { query },
            (result) => {
                // console.log('result', result);
                Vue.$log.info('Response', result);
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
        // console.log(`Calling action ${storeName}/changePage`);
        Vue.$log.info(`Calling action ${storeName}/changePage`);
        let query = getters.getUrlQuery;
        contractsApi.list(
            { query },
            (result) => {
                Vue.$log.info('Response', result);
                //result.data.data.docs
                // commit('updateDocs', {
                //     docs: result.data.data.docs
                // });
                commit('updateDocs', result.data.data);
            },
            (error) => {
                Vue.$log.error('Response error', error);
                tShow(`Hubo un error en el paginado: ${error}`);
            }
        )
    },
    };

const mutations = {
    SET_CONTRACTS(state, {docs, total, page, pages}) {
        Vue.$log.info("contracts", docs);
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