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
            let headingToViewThatRequiresOrganization = this.$route.path.match(new RegExp('^/(suppliers|contracts|comparations|detailComparations|calculations/corruption-index|resources)?$'));
            let hasOrganizationSelected = this.$session.has('currentOrganizationId') && this.$session.get('currentOrganizationId').length;

            if (headingToViewThatRequiresOrganization && !hasOrganizationSelected) {
                tShow(i18n.t('accounts.organization.info.redirecting'), 'info');
                return this.$router.push(`/select-organization?redirectTo=${this.$route.path}`);
            }
            
            let changeOrganization = this.$route.query.changeOrganization;
            
            if (changeOrganization) {
                return this.$router.push(`/select-organization?redirectTo=${this.$route.path}&autoSelectOrganization=${changeOrganization}`);
            }

        },
    }
</script>
