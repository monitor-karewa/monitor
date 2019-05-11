import Vue from "vue";

const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'contracts';

export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    calculateTotals: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/totals${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    detail: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/detail${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    }


}
