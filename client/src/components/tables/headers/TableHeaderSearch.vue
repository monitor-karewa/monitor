<template>
    <div class="search-container">
        <div class="form-search">
            <input class="input-search" type="text" v-model="searchString"  @input="doSearch" :placeholder="`Buscar ${$tc(docName, 0)}`" />
            <i class="icon zmdi zmdi-search"></i>
            <i class="icon zmdi zmdi-close"></i>
        </div>
    </div>
</template>

<style>
</style>

<script>

    import {mapState} from 'vuex';


    var debounce = function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        }
    };

    export default {
        data () {
            return {
                searchString : ""
            }
        },
        components: {
        },
        props: {
            'storeModule': String
        },
        computed : {
            ...mapState({
                pagination: function (state) {
                    return state[this.$props.storeModule].pagination;
                },
                docName: function (state) {
                    return state[this.$props.storeModule].docName;
                }
            }),
        },
        methods: {
            doSearch: debounce(function () {
                        let actionName = "list";
                        this.$store.dispatch(`${this.$props.storeModule}/${actionName}`, this.searchString);
                    },1000, false)

        },
    };

</script>