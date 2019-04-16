import axios from 'axios';
import baseApi from '@/api/base.api';

export default {
    // upload: (params = {}, onSuccess, onError) => {
    //     return axios.post(`${base.baseUrl}/api/${namespace}/list${params.query || ''}`, params)
    //         .then(onSuccess)
    //         .catch(onError);
    // },
    upload: (params = {}, config = {}, onSuccess, onError) => {
        return axios.post(`${baseApi.baseUrl}/api/data-load/upload`, params, config)
            .then(onSuccess)
            .catch(onError);
    },
    // delete: (params = {}, onSuccess, onError) => {
    //     return axios.post(`${base.baseUrl}/api/${namespace}/delete`, { "_id" : params.id })
    //         .then(onSuccess)
    //         .catch(onError);
    // },
    // saveUpdatedDocs: (params = {}, onSuccess, onError) => {
    //     return axios.post(`${base.baseUrl}/api/${namespace}/save-updated-docs`,   params )
    //         .then(onSuccess)
    //         .catch(onError);
    // }
}

