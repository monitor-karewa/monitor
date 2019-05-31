<template>
    <div class="col-12 col-md-6 m-b-30">
        <!--<p>-->
            <!--Button <strong> "btn-outline". </strong>-->
            <!--<br>-->
            <!--Sizes: class:"xs", no class: normal, class:"lg". Remove icon if no need.-->
        <!--</p>-->
        <a @click="goBack" class="btn-outline goback-btn"><i class="zmdi zmdi-long-arrow-left"></i> <strong> {{label ? $t(label) :$t('general.back')}} </strong> </a>
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        methods: {
            goBack: function () {
                this.$router.back();
            }
        },
        props:{
            label:String
        }
    }
</script>