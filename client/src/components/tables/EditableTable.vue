<template>
    <div>
        <div class="row m-0 w-100">
            <div class="col-12">
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
                                    <TableTh :name="$t('proveedores.nombre-razon-social')"/>
                                    <TableTh :name="$t('proveedores.rfc')"/>
                                    <TableTh :name="$t('proveedores.notas')"/>
                                    <TableTh :name="$t('general.fecha-creacion')"/>
                                    <!--<th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i><i></i></th>-->
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(doc, index) in docs" :key="`doc-${index}`">
                                    <td>{{doc.nombre}}</td>
                                    <td>{{doc.rfc}}</td>
                                    <td>{{doc.notas}}</td>
                                    <td></td>
                                    <!--<td></td>-->
                                    <TableTdButtons/>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination 
                    :total="total" 
                    :store-module="storeModule"
                />
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    import TableHeaderSearch from '@/components/tables/headers/TableHeaderSearch';
    import TableHeaderButtonsWrapper from '@/components/tables/headers/TableHeaderButtonsWrapper';
    import TableHeaderButton from '@/components/tables/headers/TableHeaderButton';
    import TableHeaderFilters from '@/components/tables/headers/TableHeaderFilters';
    
    import TableTh from '@/components/tables/ths/TableTh';
    
    import TableTdButtons from '@/components/tables/tds/TableTdButtons';
    
    import Pagination from '@/components/catalogs/Pagination';
    
    export default {
        data () {
            return {
                proveedores: []
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
            'total': Number,
            'storeModule': String
        }
    }
</script>