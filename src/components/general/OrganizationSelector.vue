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
                    <div class="d-grid  col-12 col-sm-6 col-xl-3" v-for="organization in organizations">
                        <div class="card-compare">
                            <img class="img-fluid" src="@/assets/images/Cards/bgm-karewa.png" alt="Karewa"/>
                            <div class="logo-full">
                                <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png"
                                     alt="Logo"/>
                                <div>
                                    <small>Monitor</small>
                                    <label :style="{color: organization.color}">{{organization.shortName}}</label>
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
//    import BackButton from '@/components/general/BackButton';
//    import AdminMainSection from '@/components/admin/AdminMainSection';
    const storeModule = 'publicOrganizations';
    import {mapState} from 'vuex';
    import axios from 'axios';

//    import i18n from '@/plugins/i18n';

    export default {
        name: "SelectOrganization",
        data() {
            return {
                // organizations: []
            }
        },
        components: {
//            BackButton,
//            AdminMainSection
        },
//        mounted() {
        //Check if user was redirected
//            if (this.$router.currentRoute.query.redirectTo) {
//                tShow(i18n.t('accounts.organization.info.redirecting'), 'info');
//            }
//        },
        beforeMount() {
//            this.$store.dispatch(`${storeModule}/list`);
            
            let autoSelectOrganizationId = this.$route.query.autoSelectOrganization;

            let callback = null;
            if (autoSelectOrganizationId) {
                callback = () => {
                    
                    let autoSelectOrganization = null;
                    if (this.organizations && this.organizations.length) {
                        this.organizations.forEach((organization) => {
                            if (organization._id && organization._id.toString() === autoSelectOrganizationId) {
                                autoSelectOrganization = organization;
                            }
                        });
                    }

                    if (autoSelectOrganization) {
                        console.log('autoSelectOrganization', autoSelectOrganization);
                        this.selectOrganization(autoSelectOrganization);
                    }
                };
            }

            this.$store.dispatch(`${storeModule}/LOAD_ORGANIZATIONS`, {callback: callback});


        },
        computed: {
            ...mapState({
                organizations: state => state[storeModule].organizations,
            })
        },
        methods:{
            selectOrganization(organization){
                this.$session.set('currentOrganizationId', organization._id.toString());
                this.$session.set('currentOrganizationName', organization.name);
                this.$session.set('currentOrganizationShortName', organization.shortName);
                this.$session.set('currentOrganizationColor', organization.color);
                this.$session.set('currentOrganizationTheme', organization.theme);

                let body = document.getElementById('body');
                body.className = `theme-body ${organization.theme}`;
                
                this.$session.set('currentOrganizationCover', organization.cover);
                this.$session.set('currentOrganizationTitle', organization.title);
                this.$session.set('currentOrganizationDescription', organization.description);
//                this.$session.set('currentOrganizationContactLocation', organization.contactLocation);
//                this.$session.set('currentOrganizationContactEmail', organization.contactEmail);
                this.$session.set('currentOrganizationWelcomeTitle', organization.welcomeTitle);
                this.$session.set('currentOrganizationShowBackgroundText', organization.showBackgroundText);
                this.$session.set('currentOrganizationRound', organization.round);
                
                axios.defaults.headers.common['X-CURRENT-ORGANIZATION-ID'] = organization._id;
                this.$store.commit('SET_CURRENT_ORGANIZATION_DEFAULTS');
                this.$store.commit('CURRENT_ORGANIZATION', organization);

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
