<template>
    <div v-if="lastUpdate && lastUpdate.length">
        Última actualización: <strong> {{lastUpdate | moment}}</strong>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import moment from 'moment';


    export default {
        name: "LastUpdateLabel",
        data () {
            return {
            }
        },
        props: {
            storeModule : String
        },
        computed : {
            ...mapState({
                lastUpdate: function (state) {
                    return this.$props.storeModule ? state[this.$props.storeModule].lastUpdate : "";
                }
            })
        },
        filters: {
            moment: function (date) {
                moment.locale('es');
                if(!date){
                    return
                }
                return moment(date).format('DD [de] MMMM [de] YYYY')
            }
        },
    }
</script>

<style scoped>

</style>