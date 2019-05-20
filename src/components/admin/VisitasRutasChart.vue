<template>
    <div>
        <div>
            <apexchart type=donut width=380 :options="chartOptions" :series="customChartData.datasets" />
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
                      show:true
                    },
                    responsive: [{
                        breakpoint: 800,
                        options: {
                            chart: {
                                width: 800
                            },
                            legend: {
                                position: 'bottom',
                            }
                        }
                    }]
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

