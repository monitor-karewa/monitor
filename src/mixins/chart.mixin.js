import Vue from 'vue';


import { mapState } from 'vuex'

export default {
    configure: ({storeModule, defaultChartData}) => {
        return {
            data: function () {
                return {
                }
            },
            components: {
            },
            computed: {
                ...mapState({
                    customChartData: state => state[storeModule].data || defaultChartData,
                })
            },
            methods: {
                testList: function () {
                    Vue.$log.info('this.$store', this.dispatch(`${storeModule}/list`));
                },
            },
            beforeCreate() {
                this.$store.dispatch(`${storeModule}/getInfoForChart`);
            }
        }
    }
}
