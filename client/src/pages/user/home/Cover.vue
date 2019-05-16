<template>
    <div>
        <section id="cover" class="client-cover">
            <div class="cover-container">
                <div class="img-container">
                    <img src="@/assets/images/Backgrounds/test-cover-page.svg" alt="">
                </div>
                <div class="neutral-width">
                    <div class=" info">
                        <h3>{{$t('general.welcome-to')}}</h3>
                        <!--<h1>Monitor <strong>Karewa</strong></h1>-->
                        <h1 v-html="$t('general.app.name.html-strong')"></h1>
                        <div class="divider"></div>
                        <!--<p>Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan en el Municipio de Chihuahua.</p>-->
                        <p>{{$t('general.app.description')}}</p>

                    </div>

                    <div v-if="showOrganizationSelect">
                        <OrganizationSelector :defaultRedirectTo="defaultRedirectTo"/>
                    </div>

                    <div class="horizontal-center m-t-50" v-if="showFilters">

                        <div class="filter-box">
                            <!--filters-->
                            <PublicFilter
                                    :storeModules="chartsModules"
                                    :administrativeUnits="adminstrativeUnitsForFilter"
                                    :fiscalYears="fiscalYears"
                                    :trimonths="trimonths"
                                    :administrationPeriods="administrationPeriods"
                                    :procedureTypes="procedureTypes"
                                    :actionName = "'getInfoForChart'"
                            >
                            </PublicFilter>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style></style>
<script>

    import OrganizationSelector from '@/components/general/OrganizationSelector';
    import PublicFilter from '@/components/filters/PublicFilter.vue';
    import { mapState} from 'vuex';

    const storeModule = "userHome";
    const chartsModules = ["millonesTrimestreChart","ejercidoProcedimientoChart"];

    export default {
        data () {
            return {
                storeModule : storeModule,
                chartsModules : chartsModules,
                defaultRedirectTo: '/'
            }
        },
        components: {
            OrganizationSelector,
            PublicFilter
        },
        props: {
            showFilters: {
                type: Boolean,
                default: true
            },
            showOrganizationSelect: {
                type: Boolean,
                default: false
            }
        },
        computed : {
        ...mapState({
                contracts: state => state[storeModule].contracts,
                adminstrativeUnitsForFilter: state => state[storeModule].adminstrativeUnitsForFilter,
                fiscalYears: state => state[storeModule].fiscalYears,
                trimonths: state => state[storeModule].trimonths,
                administrationPeriods: state => state[storeModule].administrationPeriods,
                procedureTypes: state => state[storeModule].procedureTypes,
            })
        },
        beforeMount() {
            //for the filters
            this.$store.dispatch(`${storeModule}/getAdministrativeUnitsForFilter`);
            this.$store.dispatch(`${storeModule}/getFiscalYears`);
            this.$store.dispatch(`${storeModule}/getTrimonths`);
            this.$store.dispatch(`${storeModule}/getAdministrationPeriods`);
            this.$store.dispatch(`${storeModule}/getProcedureTypes`);

        },

    }
</script>
