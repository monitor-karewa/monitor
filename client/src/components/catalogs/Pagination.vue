<template>
    <div class="row m-b-50">
        <!--<h1 class="f-20 m-t-0 m-b-10 col-12">Pagination</h1>-->
        <div class="col-12">
            <nav aria-label="pagination">
                <!--<span class="f-12 c-primary principal-font-bold"> Catálogo de Proveedores vacio </span>-->
                <span class="f-12 c-primary principal-font-bold"> 24 Proveedores en total </span>
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous end"><i class="zmdi zmdi-chevron-right-double f-18"></i></a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous"><i class="zmdi zmdi-chevron-left f-18"></i></a>
                    </li>

                    <li class="page-item active">
                        <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#">3</a>
                    </li>

                    <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Next"><i class="zmdi zmdi-chevron-right f-18"></i></a>
                    </li>
                    <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Next end"><i class="zmdi zmdi-chevron-left-double f-18"></i></a>
                    </li>
                </ul>
            </nav>
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
        }
    }
</script>