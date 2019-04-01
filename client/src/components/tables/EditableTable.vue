<template>
    <div>
        <div class="row m-0 w-100">
            <div class="col-12">
                <div v-if="docs && docs.length">
                    <div class="card w-100">
                        <div class="card-header">
                            <TableHeaderSearch/>
                            <TableHeaderButtonsWrapper>
                                <TableHeaderButton/>
                                <TableHeaderFilters/>
                            </TableHeaderButtonsWrapper>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover form-table">
                                    <thead>
                                    <tr>
                                        <TableTh :name="$t(header)" v-for="header in tableHeaders" :key="header"/>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(doc, index) in docs" :key="`doc-${index}`">
                                        <td v-for="(column) in tableColumns">
                                            <span v-if="!column.type">
                                                {{ doc[column.field] }}
                                            </span>
                                            <span v-else-if="column.type === 'Date'">
                                                {{ doc[column.field] | moment }}
                                            </span>
                                            <!--
                                                OTHER TYPE OF FIELDS
                                                <span v-else-if="">
                                                    {{ doc[column.field] }}
                                                </span>
                                            -->
                                        </td>
                                        <TableTdButtons :id="doc._id" :store-module="storeModule"/>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row m-b-50">
                        <div class="col-12">
                            <div class="card">
                                <div class="empty-state">
                                    <img class="img-fluid"
                                         src="@/assets/images/Emptystates/empty-state-box.svg"
                                         alt="Empty"/>
                                    <p>
                                        <strong class="d-block">Por el momento no hay {{plural}}.</strong>
                                        Haz clic en el botón de nuevo para comenzar. Los registros que crees aparecerán aquí.
                                    </p>
                                    <button type="button" class="btn-raised button-accent" data-toggle="modal" data-target="#newEntry"><i class="zmdi zmdi-plus"></i>Nuevo(a) {{singular}} </button>
                                </div>
                                <div v-if="false"> <!-- If there's a query-->
                                    <div class="empty-state">
                                        <img class="img-fluid"
                                             src="@/assets/images/Emptystates/empty-state-box.svg"
                                             alt="Empty"/>
                                        <p>
                                            No se encontraron resultados con la búsqueda <!--strong>“Alicia
                                            Martinez”.<strong-->
                                        </p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination
                        :store-module="storeModule"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>

<script>
    import TableHeaderSearch from '@/components/tables/headers/TableHeaderSearch';
    import TableHeaderButtonsWrapper from '@/components/tables/headers/TableHeaderButtonsWrapper';
    import TableHeaderButton from '@/components/tables/headers/TableHeaderButton';
    import TableHeaderFilters from '@/components/tables/headers/TableHeaderFilters';
    import TableTh from '@/components/tables/ths/TableTh';
    import TableTdButtons from '@/components/tables/tds/TableTdButtons';
    
    import Pagination from '@/components/catalogs/Pagination';
    import moment from 'moment';

    export default {
        data() {
            return {
                proveedores: [],
            }
        },
        components: {
            TableHeaderSearch,
            TableHeaderButtonsWrapper,
            TableHeaderButton,
            TableHeaderFilters,
            TableTh,
            TableTdButtons,
            Pagination
        },
        props: {
            'docs': Array,
            'storeModule': String,
            'tableHeaders': Array,
            'tableColumns': Array,
            'singular': String,
            'plural': String
        },
        filters: {
            moment: function (date) {
                return moment(date).format('MM/DD/YYYY');
            }
        }
    }
</script>
