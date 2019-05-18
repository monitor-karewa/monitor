const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'resources';

export default {
    list: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/list${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
