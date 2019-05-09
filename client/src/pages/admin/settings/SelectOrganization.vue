<template>
    <div>
        <AdminMainSection>
            <BackButton/>

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
                                        <small>Organization</small>
                                    </div>
                                </div>
                                <small>{{organization.name}}</small>
                                <a v-on:click.prevent="selectOrganization(organization._id)" class="btn-stroke xs button-primary" tabindex="">Seleccionar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminMainSection>
    </div>
</template>

<script>
    import BackButton from '@/components/general/BackButton';
    import AdminMainSection from '@/components/admin/AdminMainSection';
    let storeModule = 'organizations';
    import {mapState} from 'vuex';
    import axios from 'axios';

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
        beforeMount() {
            this.$store.dispatch(`${storeModule}/list`);
        },
        computed: {
            ...mapState({
                organizations: state => state[storeModule].docs,
            })
        },
        methods:{
            selectOrganization(id){
                this.$session.set('currentOrganizationId', id);
                axios.defaults.headers.common['X-CURRENT-ORGANIZATION-ID'] = id;
                
                let redirectTo = this.$router.currentRoute.query.redirectTo || '/admin';

                this.$router.push(redirectTo);
            }
        }
    }
</script>

<style scoped>

</style>
