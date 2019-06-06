<template>
    <div>
        <div class="row m-0 w-100">
            <div class="col-12">
                <div class="card w-100 o-initial">
                    <div class="card-header">
                        <TableHeaderSearch :store-module="storeModule"/>
                        <TableHeaderButtonsWrapper>
                            <TableHeaderButton :store-module="storeModule" :hideEditButton="hideEditButtonResult"/>
                            <TableHeaderFilters :columns="tableColumns"/>
                        </TableHeaderButtonsWrapper>
                    </div>
                    <div v-if="docs && docs.length">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover form-table">
                                    <thead>
                                    <tr>
                                        <TableTh :name="$t(column.label)" :field="column.field" v-if="column.visible" v-for="column in tableColumns" />
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(doc, index) in orderedDocs" :key="`doc-${index}`">
                                        <td v-for="(column) in tableColumns" v-if="column.visible">
                                            <input v-if="isEditingTable" type="text" class="form-control fg-input"
                                                   :placeholder="doc[column.field]" :value="doc[column.field]"
                                                   @input="updateDocFromEditableTable($event,doc,column.field)"/>

                                            <span v-else-if="column.type == 'currency'">
                                                {{ getValueForField(doc, column) | currency}}
                                            </span>
                                            <span v-else-if="column.type == 'i18n'">
                                                {{ $tc(getValueForField(doc, column))}}
                                            </span>

                                            <span v-else-if="column.type == 'boolean'">
                                                <div v-if="getValueForField(doc, column)">
                                                    <span class="f-20 horizontal-center c-accent">
                                                        <i class="zmdi zmdi-check-square"></i>
                                                    </span>
                                                </div>
                                                <div v-else>
                                                    <span class="f-20 horizontal-center">
                                                        <i class="zmdi zmdi-square-o"></i>
                                                    </span>
                                                </div>
                                            </span>
                                            <span v-else-if="column.type == 'highlight'" class="c-accent">
                                                <strong>{{getValueForField(doc, column)}}</strong>
                                            </span>
                                            <span v-else>
                                                {{ getValueForField(doc, column)}}
                                            </span>

                                            <!--
                                                OTHER TYPE OF FIELDS
                                                <span v-else-if="">
                                                    {{ doc[column.field] }}
                                                </span>
                                            -->
                                        </td>
                                        <TableTdButtons :store-module="storeModule" :entry="doc" />
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div v-else v-cloak>
                        <div class="row m-b-50">
                            <div class="col-12">
                                <div class="">
                                    <div class="empty-state" v-if="searchExists">
                                        <img class="img-fluid"
                                             src="@/assets/images/Emptystates/empty-state-box.svg"
                                             alt="Empty"/>
                                        <p>
                                            <strong class="d-block">No se han encontrado {{plural}} que coincidan con tu búsqueda</strong>
                                            <span>Por favor intenta nuevamente</span>
                                        </p>

                                    </div>
                                    <div v-else class="empty-state" >
                                        <img class="img-fluid"
                                             src="@/assets/images/Emptystates/empty-state-box.svg"
                                             alt="Empty"/>
                                        <p>
                                            <strong class="d-block">Por el momento no hay {{plural}}. </strong> Haz clic en el botón de "Nuevo(a)" para comenzar.
                                        </p>
                                        <button type="button" class="btn-raised button-accent" data-toggle="modal"
                                                data-target="#ModalEntry"><i class="zmdi zmdi-plus"></i>Nuevo(a)
                                            {{singular}}
                                        </button>
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
    import orderBy from 'lodash/orderBy';



    import { mapState, mapGetters } from 'vuex';

    export default {
        data() {
            return {
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
        computed: {
            ...mapState({
                searchExists: function (state) {
                    let module = state[this.$props.storeModule];
                    return !!(module.listQuery.search && module.listQuery.search.length);
                },
                isEditingTable: function(state){
                    return state[this.$props.storeModule].isEditingTable;
                },
                hideEditButtonResult:function () {
                    return this.$props.hideEditButton;
                },
                sortTable: function(state){
                    return state[this.$props.storeModule].sortTable;
                },
            }),
            orderedDocs(){
                if(this.sortTable){
                    return orderBy(this.docs,this.sortTable.sortKey,this.sortTable.order)
                } else {
                    return orderBy(this.docs,'createdAt','desc');
                }
            }
        },
        props: {
            'docs': Array,
            'storeModule': String,
            'hideEditButton': Boolean,
            'tableColumns': {
                type: Array,
                required: true
            },
            'singular': String,
            'plural': String
        },
        filters: {
            moment: function (date) {
                return moment(date).format('DD/MM/YYYY');
            }
        },
        methods:{
            updateDocFromEditableTable(evt,doc, field){
                let value = evt.target.value;
                this.$store.dispatch(`${this.$props.storeModule}/updateDocFromEditableTable`, { value, doc, field});
            },
            getValueForField(row, column){
                const dateFieldNameRegex = new RegExp(/^date$/i);

                let fieldPath = column.field.split(".");
                let tempObject = row;
                for (let i = 0; i < fieldPath.length; i++) {
                    if(tempObject) {
                        tempObject = tempObject[fieldPath[i]]
                    }
                }

                if(tempObject && dateFieldNameRegex.test(column.type)){
                    return this.formatDate(tempObject);
                }

                return tempObject;
            },
            formatDate(date){
                    const monthNames = [
                        "Ene", "Feb", "Mar",
                        "Abr", "May", "Jun", "Jul",
                        "Aug", "Sep", "Oct",
                        "Nov", "Dec"
                    ];
                    if(typeof date === "string"){
                        date = new Date(date);
                    }

                    var day = date.getDate();
                    if(day < 10){
                        day = "0"+ day;
                    }
                    var monthIndex = date.getMonth();
                    var year = date.getFullYear();

                    return day + '/' + monthNames[monthIndex] + '/' + year;
            }
        }
    }
</script>
