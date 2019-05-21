const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'comparations';

export default {
    corruptionIndex: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/corruption-index${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    detail: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/detail${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    saveComparation: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/save`, params)
            .then(onSuccess)
            .catch(onError);
    },

    retrieveRecentComparations: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
