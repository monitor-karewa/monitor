const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'contact';

export default {
    contact: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/submit`, params)
            .then(onSuccess)
            .catch(onError);
    },

    loadOrganization: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/load-info`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
