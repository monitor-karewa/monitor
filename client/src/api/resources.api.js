import Vue from "vue";

const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'resources';

export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/api/${namespace}/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    save: (params = {}, onSuccess, onError, ...args) => {
        let formData = new FormData();
        formData.append('file', params.dataField);
        formData.append('_id', params._id != undefined ? params._id : "");
        formData.append('title', params.title);
        formData.append('url', params.url);
        formData.append('classification', params.classification);
        return axios.post(`${base.baseUrl}/api/${namespace}/save`, formData, params.requestConfig)
            .then(onSuccess)
            .catch(onError);
    },
    delete: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/delete`, { "_id" : params.id })
            .then(onSuccess)
            .catch(onError);
    },
    saveUpdatedDocs: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/save-updated-docs`,   params )
            .then(onSuccess)
            .catch(onError);
    }
}
