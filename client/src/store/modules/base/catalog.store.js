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
        docName: ''
    };

    const getters = {

    };

    const actions = {
        list ({commit}, pagination = {}) {
            Vue.$log.info(`Calling action ${storeName}/list`);
            let query = '?';
            if (pagination.page) {
                if (query.length > 1) {
                    query += '&';
                }
                query += `page=${pagination.page}`
            }
            //TODO: Add other pagination options and centralize all options
            api.list(
                {},
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

        changePage ({commit}, page = 1) {
            // console.log(`Calling action ${storeName}/changePage`);
            Vue.$log.info(`Calling action ${storeName}/changePage`);
            let query = '?';
            if (query.length > 1) {
                query += '&';
            }
            query += `page=${page}`;
            //TODO: Add other pagination options and centralize all options
            api.list(
                {query: query},
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
                    bus.$emit(`${storeName}${DELETE_SUCCESS}`);
                },
                (error) => {
                    Vue.$log.error('Response error', error);
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
        }
    };

    return {
        state,
        getters,
        actions,
        mutations
    }
}
