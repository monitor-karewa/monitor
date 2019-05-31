<template>
    <div class="col-12">
        <!--<p>-->
        <!--Floating title for list.-->
        <!--</p>-->
        <div class="floating-title-form">
            <div class="side-left">
                <h1 v-html="$t(title)"></h1>
                <label v-if="!descriptionProp || !descriptionProp.length" v-html="$t(description)"></label>
                <label v-if="descriptionProp && descriptionProp.length" v-html="$t(description,{fileName:descriptionProp})"></label>

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
            description: String,
            descriptionProp: String
        }
    }
</script>