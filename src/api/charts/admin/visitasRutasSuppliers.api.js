const axios = require( 'axios');
import base from '@/api/base.api';
const namespace = 'api/admin';


export default {
    dataForChart: (params = {}, onSuccess, onError) => {
        return axios.get(`${base.baseUrl}/${namespace}/visits-route`, params)
            .then(onSuccess)
            .catch(onError);
    },
    transformDataForChart: (aggregationData = {}) => {
        let tempData = {
            data:aggregationData
        };
        return tempData;
    }
}
