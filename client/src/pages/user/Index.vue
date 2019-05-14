<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
</style>

<script>
    import i18n from '@/plugins/i18n';
    
    export default {
        data () {
            return {
            }
        },
        beforeMount() {
            let isLoggedIn = this.$session.has('jwt');
            let headingToViewThatRequiresOrganization = this.$route.path.match(new RegExp('^/(suppliers|contracts|comparations|detailComparations|calculations|resources)?$'));
            let hasOrganizationSelected = this.$session.has('currentOrganizationId');

            if (headingToViewThatRequiresOrganization && !hasOrganizationSelected) {
                tShow(i18n.t('accounts.organization.info.redirecting'), 'info');
                return this.$router.push(`/select-organization?redirectTo=${this.$route.path}`);
            }

        },
    }
</script>
