import Vue from 'vue';
import { bus } from '@/main';
import { DELETE_SUCCESS } from "../../events";

export default function (api, storeName) {
    const state = {
        docs: [],
        pagination: {
            total: 0,
            page: 1,
            pages: 1
        },
        listQuery : {
            search : ""
        },
        docName: ''
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
        list ({commit,getters}, searchString ) {
            if(searchString && searchString.length){
                commit('SET_SEARCH',searchString);
                commit('UPDATE_PAGE',1);
            } else {
                commit('SET_SEARCH',"");
            }
            Vue.$log.info(`Calling action ${storeName}/list`);

            let query = getters.getUrlQuery;

            api.list(
                { query },
                (result) => {
                    // console.log('result', result);
                    Vue.$log.info('Response', result);
                    //result.data.data.docs
                    // commit('updateDocs', {
                    //     docs: result.data.data.docs
                    // });
                    commit('updateDocs', result.data.data);
                },
                (error) => {
                    // console.log('error', error);
                    Vue.$log.error('Response error', error);
                }
            )
        },

        changePage ({commit, getters, state}, page) {
            let oldPage = state.pagination.page;
            commit('UPDATE_PAGE',page);
            // console.log(`Calling action ${storeName}/changePage`);
            Vue.$log.info(`Calling action ${storeName}/changePage`);
            let query = getters.getUrlQuery;
            api.list(
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
                    // console.log('error', error);
                }
            )
        },
        delete({commit, dispatch}, id) {
            api.delete(
                { id : id },
                (result) => {
                    dispatch(`${storeName}/list`,{},{root:true});
                    bus.$emit(storeName + DELETE_SUCCESS);
                },
                (error) => {
                    Vue.$log.error('Response error', error);
                }
            )
        },

        save ({commit, dispatch}, data) {
            if(!data){
                //scold user #(>__<!!)
            }

            //TODO: Add other pagination options and centralize all options
            api.save(
                data,
                (result) => {
                    Vue.$log.info('Response', result);
                    //result.data.data.docs
                    // commit('updateDocs', {
                    //     docs: result.data.data.docs
                    // });
                    dispatch(`${storeName}/list`,{},{root:true});
                },
                (error) => {
                    Vue.$log.error('Response error', error);
                    // console.log('error', error);
                }
            )
        }
    };

    const mutations = {
        updateDocs (state, {docs, total, page, pages}) {
            state.docs = docs;
            state.pagination.total = total;
            state.pagination.page = page;
            state.pagination.pages = pages;
        },
        setDocName (state, {docName}) {
            state.docName = docName;
        },
        UPDATE_PAGE(state,page){
            state.pagination.page = page;
        },
        SET_SEARCH(state,search){
            state.listQuery.search = search;
        }
    };

    return {
        state,
        getters,
        actions,
        mutations
    }
}
