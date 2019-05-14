import axios from 'axios';
import baseApi from '@/api/base.api';

const namespace = 'route-logs';

export default {
    register: (params = {}, config = {}, onSuccess, onError) => {
        return axios.post(`${baseApi.baseUrl}/public-api/${namespace}/register`, params, config)
            .then(onSuccess)
            .catch(onError);
    },
}

