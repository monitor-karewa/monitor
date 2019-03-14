<template>
    <div class="row m-b-50">
        <!--<h1 class="f-20 m-t-0 m-b-10 col-12">Pagination</h1>-->
        <div class="col-12">
            <nav aria-label="pagination">
                <!--<span class="f-12 c-primary principal-font-bold"> Catálogo de Proveedores vacio </span>-->
                <span class="f-12 c-primary principal-font-bold"> {{pagination.total}} Proveedores en total </span>
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" @click="changePage(1)" aria-label="Previous end"><i class="zmdi zmdi-chevron-right-double f-18"></i></a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" @click="changePage(pagination.page - 1)" aria-label="Previous"><i class="zmdi zmdi-chevron-left f-18"></i></a>
                    </li>

                    <li class="page-item" :class="[{'active': page === pagination.page}]" v-for="(page, index) in pagination.pages" :key="`pagination-${index}`">
                        <a class="page-link" @click="changePage(page)">{{page}}</a>
                    </li>

                    <!--<li class="page-item active">-->
                        <!--<a class="page-link" href="#">1</a>-->
                    <!--</li>-->
                    <!--<li class="page-item">-->
                        <!--<a class="page-link" @click="changePage(2)">2</a>-->
                    <!--</li>-->
                    <!--<li class="page-item">-->
                        <!--<a class="page-link" href="#">3</a>-->
                    <!--</li>-->

                    <li class="page-item">
                        <a class="page-link" @click="changePage(pagination.page + 1)" aria-label="Next"><i class="zmdi zmdi-chevron-right f-18"></i></a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" @click="changePage(pagination.pages)" aria-label="Next end"><i class="zmdi zmdi-chevron-left-double f-18"></i></a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style>
</style>

<script>
    
    import {mapState} from 'vuex';
    
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        computed: {
            ...mapState({
                pagination: function (state) {
                    return state[this.$props.storeModule].pagination;
                }
            })
        },
        methods: {
            changePage: function (page) {
                if (page < 1) {
                    page = 1;
                }
//                let pages = this.$store.state[this.$props.storeModule].pagination.pages;
                
                let pages = this.pagination.pages;
                let currentPage = this.pagination.page;
                
                if (page > pages) {
                    page = pages;
                }
                if (page === currentPage) {
                    return;
                }
                let storeModule = this.$props.storeModule;
                this.$store.dispatch(`${storeModule}/changePage`, page);
            }
        },
        props: {
            'total': Number,
            'storeModule': String
        }
    }
</script>