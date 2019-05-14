<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
</style>

<script>
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
                return this.$router.push(`/select-organization?redirectTo=${this.$route.path}`);
            }

        },
    }
</script>
