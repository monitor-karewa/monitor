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
    save: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/save`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveSuppliers: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/suppliers`,   params )
            .then(onSuccess)
            .catch(onError);
    },
    retrieveAdministrativeUnits: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/administrative-units`,   params )
            .then(onSuccess)
            .catch(onError);
    }

}
