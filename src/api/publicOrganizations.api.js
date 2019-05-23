const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'organizations';


export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    getOrganizationsFromOuterServer: (params = {}, onSuccess, onError) => {
        console.log(`${base.baseUrl}/public-api/${namespace}/remote/list${params.query || ''}`);
        return axios.get(`${base.baseUrl}/public-api/${namespace}/remote/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
