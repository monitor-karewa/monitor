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
                                        <TableTh :name="$t('suppliers.name')"/>
                                        <TableTh :name="$t('suppliers.rfc')"/>
                                        <TableTh :name="$t('suppliers.notes')"/>
                                        <TableTh :name="$t('general.created-at')"/>
                                        <!--<th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i><i></i></th>-->
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr v-for="(doc, index) in docs" :key="`doc-${index}`">
                                        <td>{{doc.name}}</td>
                                        <td>{{doc.rfc}}</td>
                                        <td>{{doc.notes}}</td>
                                        <td></td>
                                        <!--<td></td>-->
                                        <TableTdButtons/>
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
                                        <strong class="d-block">/Agrega Proveedores a la
                                            Organización.</strong>
                                        Los usuarios invitados a la Organización recibirán un correo
                                        electrónico con un enlace para acceder a la plataforma./
                                    </p>
                                    <button type="button" class="btn-raised button-accent" data-toggle="modal" data-target="#newEntry">/Nuevo Registro/ </button>
                                </div>
                                <div v-if="false"> <!-- If there's a query-->
                                    <div class="empty-state">
                                        <img class="img-fluid"
                                        src="@/assets/images/Emptystates/empty-state-box.svg"
                                        alt="Empty"/>
                                        <p>
                                            No se encontraron resultados con la búsqueda <strong>“Alicia
                                            Martinez”.</strong>
                                        </p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <input v-model="testModel" value="secondValue" class="input-border"/>
                <Pagination
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
                proveedores: [],
                testModel : 'marco'
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
            'storeModule': String
        }
    }
</script>