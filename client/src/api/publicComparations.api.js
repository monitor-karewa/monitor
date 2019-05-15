const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'comparations';

export default {
    detail: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/public-api/${namespace}/detail${params.query || ''}`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
