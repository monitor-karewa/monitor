const axios = require('axios');
import base from '@/api/base';
const namespace = 'suppliers';

export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/api/${namespace}/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    save: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/save`, params)
            .then(onSuccess)
            .catch(onError);
    },
    delete: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/delete`, params)
            .then(onSuccess)
            .catch(onError);;
    }
}