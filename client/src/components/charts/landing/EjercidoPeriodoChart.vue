<template>
    <div>
        <div class="small">
            <doughnut-chart :chart-data="customChartData" :options="chartOptions"></doughnut-chart>
        </div>
        <div class="graph-info">
            <div class="info">
                                    <span class="green">
                                        <label class="p-l-10">{{percentagePublic}}%</label>
                                        <p>Lic. pública</p>
                                    </span>
                <span class="yellow">
                                        <label class="p-l-10">{{percentageInvitation}}%</label>
                                        <p>Por invitación</p>
                                    </span>
                <span class="red">
                                        <label class="p-l-10">{{percentageNoBid}}%</label>
                                        <p>Adj. directa</p>
                                    </span>
            </div>
            <div class="divider-dash"></div>
            <div class="total">
                <label>{{totalAmount | currency}} MXN</label>
                <small>MONTO TOTAL</small>
            </div>
        </div>
    </div>
</template>

<script>
    import DoughnutChart from '@/components/charts/DoughnutChart.js'
    import chart from '@/mixins/chart.mixin';
    const storeModule = 'ejercidoProcedimientoChart';
    import { mapGetters } from 'vuex';

    let defaultChartData = {
        labels: [],
        datasets: [

        ],
    };
    let baseChart = chart.configure({
        storeModule: storeModule, defaultChartData
    });
    export default {
        components: {
            DoughnutChart
        },
        mixins: [baseChart],
        data () {
            return {
                storeModule: storeModule,
                chartOptions:{
                    legend: {
                        display: false
                    }
                },
                publicPorcentage:0,
                invitationPercentage:0,
                noBidPercentage:0,
                finalTotal:0
            }
        },
        mounted () {
        },
        computed: {
            percentagePublic() {
                return  this.publicPorcentage || 0;

            },
            percentageInvitation() {
                return this.invitationPercentage|| 0;
            },
            percentageNoBid() {
                return this.noBidPercentage || 0;
            },
            totalAmount(){
                return this.finalTotal || 0;
            }
        },
        methods: {
            calculatePercenta() {
                if (this.customChartData != undefined) {
                    let datasets = this.customChartData.datasets;
                    let data = datasets[0].data;
                    
                    
                    let totalAmount = 0;
                    for (let i = 0; i < data.length; i++) {
                      totalAmount+=data[i];  
                    }
                    this.publicPorcentage = ((data[0] * 100)/totalAmount).toFixed(2);
                    this.invitationPercentage = ((data[1] * 100)/totalAmount).toFixed(2);
                    this.noBidPercentage = ((data[2] * 100)/totalAmount).toFixed(2);
                    this.finalTotal = totalAmount;
                }
            },
            currencyFormat(num) {
                return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            }
        },
        watch: {
            customChartData: function (val) {
                this.calculatePercenta();
            }
        }
    }
</script>

<style>
    .small {

        max-height: 700px;
        margin:  10px auto;
        /*width: 80% !important;*/
    }
    .small #bar-chart {
        height: 500px !important;
        width: 100% !important;
    }
    .small #doughnut-chart {
        max-height: 240px !important;
        max-width: 240px !important;
        margin: auto;
    }
</style>

