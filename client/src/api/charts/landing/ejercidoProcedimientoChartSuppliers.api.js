const axios = require( 'axios');
import base from '@/api/base.api';
const namespace = 'landing';


export default {
    dataForChart: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/amountByProcedure`, params)
            .then(onSuccess)
            .catch(onError);
    },
    transformDataForChart: (aggregationData = {}) => {
        return aggregationData;
    }
}
