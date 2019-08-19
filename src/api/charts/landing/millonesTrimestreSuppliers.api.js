const axios = require( 'axios');
import base from '@/api/base.api';
const namespace = 'landing';


export default {
    dataForChart: (params = {}, onSuccess, onError) => {
        return axios.post(`${base.baseUrl}/public-api/${namespace}/amountByPeriod`, params)
            .then(onSuccess)
            .catch(onError);
    },
    transformDataForChart: (aggregationData = {}) => {
        let labels = [];
        let datasets= [
            {
                name: 'Lic. pública',
                backgroundColor: '#6ec284',
                data: []
            },
            {
                name: 'Por invitación',
                backgroundColor: '#ffc043',
                data: []
            },
            {
                name: 'Adj. directa',
                backgroundColor: '#eb6262',
                data: []
            }
        ]
        for (let i = 0; i < aggregationData.length; i++) {
            labels.push(aggregationData[i]._id.period + " " + aggregationData[i]._id.year)
            datasets[0].data.push(aggregationData[i].totalPublic);
            datasets[1].data.push (aggregationData[i].totalInvitation);
            datasets[2].data.push(aggregationData[i].totalNoBid);
        }
        let tempData= {data:{
                labels: labels,
                datasets: datasets
            }};
        return tempData;
    }
}
