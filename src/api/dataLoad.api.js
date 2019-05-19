import axios from 'axios';
import baseApi from '@/api/base.api';

const namespace = 'data-load';

export default {
    // upload: (params = {}, onSuccess, onError) => {
    //     return axios.post(`${base.baseUrl}/api/${namespace}/list${params.query || ''}`, params)
    //         .then(onSuccess)
    //         .catch(onError);
    // },
    upload: (params = {}, config = {}, onSuccess, onError) => {
        return axios.post(`${baseApi.baseUrl}/api/${namespace}/upload`, params, config)
            .then(onSuccess)
            .catch(onError);
    },
    getCurrent: (params = {}, onSuccess, onError) => {
        return axios.get(`${baseApi.baseUrl}/api/${namespace}/current${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    getCurrentInfo: (params = {}, onSuccess, onError) => {
        return axios.get(`${baseApi.baseUrl}/api/${namespace}/current-info${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    cancelCurrent: (params = {}, onSuccess, onError) => {
        return axios.post(`${baseApi.baseUrl}/api/${namespace}/cancel-current`, params)
            .then(onSuccess)
            .catch(onError);
    },
    confirmCurrent: (params = {}, onSuccess, onError) => {
        return axios.post(`${baseApi.baseUrl}/api/${namespace}/confirm-current`, params)
            .then(onSuccess)
            .catch(onError);
    },
    downloadValidations: (params = {}, onSuccess, onError) => {
        return axios({
            url: `${baseApi.baseUrl}/api/${namespace}/download-validations`,
            method: 'GET',
            responseType: 'blob'
        }, params)
            .then(onSuccess)
            .catch(onError);
    },
    downloadPlantilla: (params = {}, onSuccess, onError) => {
        return axios({
            url: `${baseApi.baseUrl}/api/${namespace}/download-plantilla`,
            method: 'GET',
            responseType: 'blob'
        }, params)
            .then(onSuccess)
            .catch(onError);
    }
    // delete: (params = {}, onSuccess, onError) => {
    //     return axios.post(`${base.baseUrl}/api/${namespace}/delete`, { "_id" : params.id })
    //         .then(onSuccess)
    //         .catch(onError);
    // },
    // saveUpdatedDocs: (params = {}, onSuccess, onError) => {
    //     return axios.post(`${base.baseUrl}/api/${namespace}/save-updated-docs`,   params )
    //         .then(onSuccess)
    //         .catch(onError);
    // }
}

