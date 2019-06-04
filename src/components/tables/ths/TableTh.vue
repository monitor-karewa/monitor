<template>
    <th>{{name}}<i class="zmdi m-l-5 f-16" :class="{'zmdi-caret-down' :(sortTable.sortKey != field || sortTable.order == 'desc'), 'zmdi-caret-up':(sortTable.sortKey == field && sortTable.order == 'asc')}" @click="sortBy(field)"></i></th>
</template>

<style>
</style>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
            }
        },
        computed:{
        ...mapState({
                sortTable: function(state){
                    return state[this.$parent.storeModule].sortTable;
                },
            })
        },
        components: {
        },
        props: {
            name: String,
            field: String

        },
        methods:{
            sortBy(sortKey){
                let order = 'asc';
                if(this.sortTable && this.sortTable.sortKey == sortKey){
                   order = this.sortTable.order == 'desc' ? 'asc' : 'desc';
                }
                this.$store.dispatch(`${this.$parent.storeModule}/sortTableBy`, {order, sortKey});
            }
        }

    }
</script>