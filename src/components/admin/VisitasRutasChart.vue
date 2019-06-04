<template>
    <div>
        <div>
            <apexchart height=450 type=donut :options="chartOptions" :series="customChartData.datasets" />
        </div>
    </div>
</template>

<script>
    import chart from '@/mixins/chart.mixin';
    const storeModule = 'visitasRutasChart';

    let defaultChartData = {
        labels: [],
        datasets: [

        ],
    };
    let baseChart = chart.configure({
        storeModule: storeModule, defaultChartData
    });
    export default {
        components: {},
        mixins: [baseChart],
        data () {
            return {
                storeModule: storeModule,
                chartOptions: {
                    colors: ['#19babd', '#454e7b', '#6a7296', '#b4b8ca', '#dadce5', '#454e7b', '#587fe3', '#8f95b0'],
                    legend:{
                      show:true,
                        position:"bottom"
                    },
                    plotOptions: {
                        pie: {
                            expandOnClick:true,
                            // donut: {
                            //     size: '60%',
                            //     labels: {
                            //         show: true
                            //     }
                            // }
                        }
                    }
                }
            }
        },
        mounted () {
        },
        computed: {
        },
        watch: {
            customChartData: function (val) {
                this.chartOptions = {
                    labels:val.labels
                }
            }
        }
    }
</script>

<style>
</style>

