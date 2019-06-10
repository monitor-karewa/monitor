<template>
    <div>
        <!-- MAIN ADMIN SECTION -->
        <section id="main" class="">
            <section id="content" class="page-view">
                <div class="container">
                    <slot></slot>
                    
                <div class="container-footer">
                    <div>
                        <label v-if="lastUpdate && lastUpdate.length"> Última actualización: {{lastUpdate | moment}}</label>
                    </div>
                    <div>
                        <label> © 2019 Black Labs </label>
                    </div>
                    <div>
                        <a href="" class="m-r-20"> FAQ </a>
                        <a href="" class="m-l-20"> Contact </a>
                    </div>
                </div>
                </div>
            </section>
        </section>
        <!-- END MAIN ADMIN SECTION -->
    </div>
</template>

<style>
</style>



<script>
    import {mapState} from 'vuex';
    import moment from 'moment';


    export default {
        data () {
            return {

            }
        },
        props: {
            storeModule : String
        },
        components: {
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