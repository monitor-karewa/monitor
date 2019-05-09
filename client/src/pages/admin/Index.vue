<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        beforeMount() {
            let hasOrganizationSelected = this.$session.has('currentOrganizationId');

            if (this.$route.path !== '/admin/select-organization' && !hasOrganizationSelected) {
                return this.$router.push(`/admin/select-organization?redirectTo=${this.$route.path}`);
            }

        }
    }
</script>
