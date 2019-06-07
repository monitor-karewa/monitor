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
    },
    retrieveSuppliers: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/suppliers`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveAdministrativeUnitsForFilter: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/administrative-units${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveFiscalYears: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/fiscal-years${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveAdministrationPeriods: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/administration-periods${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveTrimonths: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/trimonths${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveProceudureTypes : (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/procedure-types${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    },
    retrieveSuppliersForFilter: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/retrieve/suppliers-filter${params.query || ''}`, params)
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

}
