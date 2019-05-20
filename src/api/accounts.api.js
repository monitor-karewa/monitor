const axios = require('axios');
import base from '@/api/base.api';
const accounts = 'accounts';

const namespace = 'accounts';

export default {
    login: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/login`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
