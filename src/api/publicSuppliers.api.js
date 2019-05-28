const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'suppliers';


export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    detail: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/detail${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    detailFiltered: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/detail${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    filteredList: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/filtered-list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    download: (params = {}, onSuccess, onError) => {

        return axios({
            url: `${base.baseUrl}/public-api/${namespace}/download/${params.format}${params.query || ''}`,
            method: 'GET',
            responseType: 'blob',
            // data:params,
            // query:params,
            params
        })
            .then(onSuccess)
            .catch(onError);
    },
    downloadDetail: (params = {}, onSuccess, onError) => {

        return axios({
            url: `${base.baseUrl}/public-api/${namespace}/download-detail/${params.id}/${params.format}${params.query || ''}`,
            method: 'GET',
            responseType: 'blob',
            // data:params,
            // query:params,
            params
        })
            .then(onSuccess)
            .catch(onError);
    },



    /*,
    delete: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/delete`, { "_id" : params.id })
            .then(onSuccess)
            .catch(onError);
    },
    saveUpdatedDocs: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/save-updated-docs`, params)
            .then(onSuccess)
            .catch(onError);
    }*/
}
