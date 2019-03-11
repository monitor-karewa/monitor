const axios = require('axios');
import base from '@/api/base';

export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(base.baseUrl + '/api/list', params)
            .then(onSuccess)
            .catch(onError);
    },
    save: (params = {}, onSuccess, onError) => {
        return axios.post(base.baseUrl + '/api/save', params)
            .then(onSuccess)
            .catch(onError);
    },
    delete: (params = {}, onSuccess, onError) => {
        return axios.post(base.baseUrl + '/api/delete', params)
            .then(onSuccess)
            .catch(onError);;
    }
}