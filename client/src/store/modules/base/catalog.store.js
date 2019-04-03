import Vue from 'vue';
import { bus } from '@/main';
import * as events from "../../events";

export default function (api, storeName) {
    const state = {
        docs: [],
        pagination: {
            total: 0,
            page: 1,
            pages: 1
        },
        docName: ''
    };

    const getters = {

        getPaginationQuery(state){
            let pagination = state.pagination;

            let query = '?';
            if (pagination.page) {
                if (query.length > 1) {
                    query += '&';
                }
                query += `page=${pagination.page}`
            }

            return query;
        }
    };

    const actions = {
        list ({commit,getters}) {
            Vue.$log.info(`Calling action ${storeName}/list`);
            let query = getters.getPaginationQuery;
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
            let query = getters.getPaginationQuery;
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
                    bus.$emit(storeName + events.DELETE_SUCCESS);
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
                    bus.$emit(storeName + events.DOC_CREATED);
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
        }
    };

    return {
        state,
        getters,
        actions,
        mutations
    }
}
