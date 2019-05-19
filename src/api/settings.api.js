const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'settings';

export default {
    loadSettings: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/api/${namespace}/load-settings`, params)
            .then(onSuccess)
            .catch(onError);
    },
    changeCover: (params = {}, config = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/change-cover`, params, config)
            .then(onSuccess)
            .catch(onError);
    },
    changeSettings: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/change-settings`, params)
            .then(onSuccess)
            .catch(onError);
    },
    changeTheme: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/change-theme`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
