const axios = require('axios');
import base from '@/api/base.api';
const namespace = 'settings';

export default {
    changeTheme: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/api/${namespace}/change-theme`, params)
            .then(onSuccess)
            .catch(onError);
    }
}
