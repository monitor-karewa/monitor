<template>
    <div class="small">
        <bar-chart :chart-data="customChartData" :options="chartOptions"></bar-chart>
    </div>
</template>

<script>
    import BarChart from '@/components/charts/BarChart.js'
    import chart from '@/mixins/chart.mixin';
    const storeModule = 'millonesTrimestreChart';

    let defaultChartData = {
        labels: [],
        datasets: [

        ]
    };
    let baseChart = chart.configure({
        storeModule: storeModule, defaultChartData
    });
    export default {
        components: {
            BarChart
        },
        mixins: [baseChart],
        data () {
            return {
                storeModule: storeModule,
                chartOptions:{
                    responsive:true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: function(value, index, values) {
                                    return '$' + value;
                                }
                            }
                        }]
                    }
                }
            }
        },
        mounted () {
        },
        methods: {
        }
    }
</script>

<style>
    .small {
        /*max-width: 600px;*/
        /*margin:  150px auto;*/
    }
</style>

