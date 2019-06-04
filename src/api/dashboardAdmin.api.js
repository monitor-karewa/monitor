import Vue from "vue";

const axios = require('axios');
import base from '@/api/base.api';

const namespace = 'api/admin';

export default {
    getCurrentInfo: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/${namespace}/info-dashboard`, params)
            .then(onSuccess)
            .catch(onError);
    },
    getCurrentNotifications: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/${namespace}/notifications`, params)
            .then(onSuccess)
            .catch(onError);
    },
    readNotifications: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/${namespace}/read-notifications`, params)
            .then(onSuccess)
            .catch(onError);
    }

}
