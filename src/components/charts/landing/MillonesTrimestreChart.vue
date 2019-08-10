<template>
    <div>
        <apexchart type=bar height=500 :options="chartOptions" :series="customChartData.datasets" />
    </div>
</template>

<script>
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
        },
        mixins: [baseChart],
        data () {
            return {
                storeModule: storeModule,
                chartOptions: {
                    colors: ['#6ec284', '#ffc043', '#eb6262'],
                    chart: {
                        toolbar: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%'
                            // endingShape: 'rounded'
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },

                    xaxis: {
                        categories: [],
                    },
                    yaxis: {
                        title: {
                            // text: '$ (millones de pesos)'
                            text: '$ pesos'
                        },
                        labels: {
                            formatter: function (val) {
                                // return val ? '$' + val.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'M' : "";
                                return val ? '$' + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "";
                            }
                        },
                        // min: 1,
                        tickAmount: 6
                    },
                    fill: {
                        opacity: 1,
                        colors: ['#6ec284', '#ffc043', '#eb6262']
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                // return val ? '$' + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' Millones' : "";
                                return val ? '$' + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : "";
                            }
                        }
                    }
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

