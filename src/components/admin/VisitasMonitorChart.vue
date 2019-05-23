<template>
    <div>
        <apexchart type=line height=500 :options="chartOptions" :series="customChartData.datasets" />
    </div>
</template>

<script>
    import chart from '@/mixins/chart.mixin';
    const storeModule = 'visitasMonitorChart';

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
        },
        mixins: [baseChart],
        data () {
            return {
                storeModule: storeModule,
                chartOptions: {
                    chart: {
                        zoom: {
                            enabled: false
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: [],
                    },

                    colors: ['#19babd'],
                    responsive: [{
                        breakpoint: undefined,
                        options: {},
                    }]
                }
            }
        },
        mounted () {
        },
        methods: {
        },
        watch: {
            customChartData: function (val) {
                this.chartOptions = {
                    xaxis:{
                        categories:val.labels
                    }
                }
            }
        }
    }
</script>

<style>
</style>

