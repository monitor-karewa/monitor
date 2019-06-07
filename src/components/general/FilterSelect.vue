<template>
    <div>
        <slot></slot>
    </div>
</template>



<script>
    import Vue from 'vue';

    export default {
        name: "FilterSelect",
        mounted(){
            setTimeout(function () {
                console.log("hiii");
                // this.$forceUpdate();
            },10000)
        }
    }
</script>

<style scoped>


</style>