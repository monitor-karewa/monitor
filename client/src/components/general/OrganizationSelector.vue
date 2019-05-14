<template>
    <div>
        <div class="col-12 p-0">
            <div class="card">
                <div class="floating-title-panel">
                    <h1>
                        Seleccionar Organización
                    </h1>
                </div>

                <br/>

                <div class="row">
                    <div class="col-12 col-md-4 col-lg-3" v-for="organization in organizations">
                        <div class="card-compare">
                            <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                            <div class="logo-full">
                                <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png"
                                     alt="Logo"/>
                                <div>
                                    <small>Monitor</small>
                                    <label>{{organization.shortName}}</label>
                                </div>
                            </div>
                            <small>{{organization.name}}</small>
                            <a v-on:click.prevent="selectOrganization(organization)" class="btn-stroke xs button-primary" tabindex="">Seleccionar</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BackButton from '@/components/general/BackButton';
    import AdminMainSection from '@/components/admin/AdminMainSection';
    const storeModule = 'publicOrganizations';
    import {mapState} from 'vuex';
    import axios from 'axios';

    import i18n from '@/plugins/i18n';

    export default {
        name: "SelectOrganization",
        data() {
            return {
                // organizations: []
            }
        },
        components: {
            BackButton,
            AdminMainSection
        },
//        mounted() {
        //Check if user was redirected
//            if (this.$router.currentRoute.query.redirectTo) {
//                tShow(i18n.t('accounts.organization.info.redirecting'), 'info');
//            }
//        },
        beforeMount() {
//            this.$store.dispatch(`${storeModule}/list`);
            this.$store.dispatch(`${storeModule}/LOAD_ORGANIZATIONS`);
        },
        computed: {
            ...mapState({
                organizations: state => state[storeModule].organizations,
            })
        },
        methods:{
            selectOrganization(organization){
                console.log('organization', organization);
                this.$session.set('currentOrganizationId', organization._id);
                this.$session.set('currentOrganizationName', organization.name);
                this.$session.set('currentOrganizationShortName', organization.shortName);
                axios.defaults.headers.common['X-CURRENT-ORGANIZATION-ID'] = organization._id;

                this.$store.commit('currentOrganizationName', organization.name);
                this.$store.commit('currentOrganizationShortName', organization.shortName);

                let redirectTo = this.$router.currentRoute.query.redirectTo || this.defaultRedirectTo;

                this.$router.push(redirectTo);
            }
        },
        props: {
            defaultRedirectTo: {
                type: String,
                default: '/admin'
            }
        }
    }
</script>

<style scoped>

</style>
