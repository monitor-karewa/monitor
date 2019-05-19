<template>
    <div class="col-12">
        <!--<p>-->
        <!--Floating title for list.-->
        <!--</p>-->
        <div class="floating-title-form">
            <div class="side-left">
                <h1 v-html="$t(title)"></h1>
                <label v-html="$t(description)"></label>
            </div>
        </div>
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
        props: {
            title: String,
            description: String
        }
    }
</script>