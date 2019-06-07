import Vue from 'vue';
import { bus } from '@/main';
import * as events from "../../events";
import i18n from '@/plugins/i18n';

export default function (api, storeName) {
    const state = {
        storeModule: storeName,
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
        isEditing : false,
        isEditingTable : false,
        entrySelected : {},
        formErrors : [],
        sortTable:{
            sortKey:'createdAt',
            order:'desc'
        },
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
        docsUpdatedLength: state => state.docsUpdated.length,
        getSearchString(state){
            if(state.listQuery){
                return state.listQuery.search;
            }
            return "";
        },
        formErrors:  state => state.formErrors,
        sortTable: state => state.sortTable

    };

    const actions = {
        selectEntry ({commit,getters}, entry ) {
            commit('SELECT_ENTRY', entry);
        },
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
                    // Vue.$log.info('Response', result);
                    //result.data.data.docs
                    // commit('updateDocs', {
                    //     docs: result.data.data.docs
                    // });
                    // console.log('result.data.data', result.data.data);
                    commit('updateDocs', result.data.data);
                    commit('SET_LAST_UPDATE', result.data.lastUpdate);
                },
                (error) => {
                    // console.log('error', error);
                    Vue.$log.error('Response error', error);
                    tShow(`No fue posible cargar los registros.`, 'danger');
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
                    // Vue.$log.info('Response', result);
                    //result.data.data.docs
                    // commit('updateDocs', {
                    //     docs: result.data.data.docs
                    // });
                    commit('updateDocs', result.data.data);
                },
                (error) => {
                    Vue.$log.error('Response error', error);
                    tShow(`No fue posible cargar los registros.`, 'danger');
                }
            )
        },
        delete({commit, dispatch}, id) {
            api.delete(
                { id : id },
                (result) => {
                    dispatch(`${storeName}/list`,{},{root:true});
                    if (result.data.error || result.data.errors) {
                        tShow(`No fue posible eliminar el registro.`, 'danger');
                    } else {
                        bus.$emit(storeName + events.DELETE_SUCCESS);
                    }
                },
                (error) => {
                    Vue.$log.error('Response error', error);
                    tShow(`No fue posible eliminar el registro.`, 'danger');
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

                    // Vue.$log.info('Response', result);
                    if (result.data.error || result.data.errors) {
                        Vue.$log.error('Response error', result.data.message);
                        tShow(result.data.message, 'danger');
                        commit("SET_FORM_ERRORS", result.data.errors);
                    } else {//result.data.data.docs
                        // commit('updateDocs', {
                        //     docs: result.data.data.docs
                        // });
                        dispatch(`${storeName}/list`, {}, {root: true});

                        if (data._id) {
                            bus.$emit(storeName + events.DOC_UPDATED);
                        } else {
                            bus.$emit(storeName + events.DOC_CREATED);
                        }
                    }
                },
                (error) => {
                    let errorsStr = "";
                    error.response.data.errors.some(e=>{
                        errorsStr += e.msg + "\n";
                    });
                    Vue.$log.error('Response error', error);
                    // tShow(`Hubo un error al guardar un registro: ${errorsStr}`);
                    tShow(`No fue posible guardar el registro.`, 'danger');
                },
                data.requestConfig
            )
        },
        saveDocsUpdated({state, dispatch, commit}){
            let data = state.docsUpdated;
            api.saveUpdatedDocs(
                data,
                (result) => {
                    // Vue.$log.info('Response', result);
                    dispatch(`${storeName}/list`,{},{root:true});
                    dispatch(`${storeName}/setEditTable`,false,{root:true});
                    commit('CLEAR_DOCS_UPDATED');
                    if (result.data.error) {
                        tShow(result.data.message, 'danger');
                    } else {
                        tShow(result.data.message, 'info');
                    }
                },
                (error) => {
                    // Vue.$log.error('Response error', error);
                    tShow(`No fue posible guardar los registros.`, 'danger');
                }
            )

        },
        updateDocFromEditableTable({commit, state}, data){
            let field = data.field;
            let value = data.value;
            let docId = data.doc._id;
            let docUpdated = Vue.util.extend({}, state.docs.find(doc => { return doc._id === docId }));
            let updatedDocIndexIfExists = state.docsUpdated.findIndex(doc => { return doc._id === docUpdated._id });

            let payload = {
                field,
                value,
                docUpdated,
                updatedDocIndexIfExists
            };

            commit('UPDATE_DOC_FROM_EDITABLE_TABLE', payload);
        },
        setEditTable({commit},payload){
            commit('CLEAR_DOCS_UPDATED');
            commit('SET_EDIT_TABLE',payload);
        },
        clearFormErrors({commit}){
            commit('CLEAR_FORM_ERRORS');
        },
        sortTableBy({commit},payload){
            commit('SORT_TABLE_BY', payload);
        }
        // clearSelectedEntry({commit}){
        //     commit('CLEAR_SELECTED_ENTRY');
        // }
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
        },
        SET_DOC_ID(state, id){
            state.selectedDocId = id;
        },
        SELECT_ENTRY(state, entry){
            state.entrySelected = entry;
        },
        UPDATE_DOC_FROM_EDITABLE_TABLE(state,{ field, value, docUpdated, updatedDocIndexIfExists}){
            if(updatedDocIndexIfExists !== -1 ){
                state.docsUpdated[updatedDocIndexIfExists][field] = value;
            } else {
                docUpdated[field] = value;
                state.docsUpdated.push(docUpdated);
            }
        },
        SET_EDIT(state, isEditing){
            state.isEditing = isEditing;
        },
        SET_EDIT_TABLE(state, payload){
            state.isEditingTable = payload;
        },
        CLEAR_DOCS_UPDATED(state){
            state.docsUpdated = [];
        },
        SET_FORM_ERRORS(state, payload){
            state.formErrors = payload
        },
        CLEAR_FORM_ERRORS(state){
            state.formErrors = []
        },
        SORT_TABLE_BY(state, payload){
            state.sortTable = payload;
        },
        SET_LAST_UPDATE(state, lastUpdate){
            state.lastUpdate = lastUpdate
        }

        // CLEAR_SELECTED_ENTRY(state){
        //     state.entrySelected = {};
        // }
    };

    return {
        state,
        getters,
        actions,
        mutations
    }
}
