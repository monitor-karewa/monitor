<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<style>
</style>

<script>

    import {bus} from '@/main';
    import i18n from '@/plugins/i18n';
    
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        beforeMount() {
            let isLoggedIn = this.$session.has('jwt');
            let headingToOrganizationSelect = this.$route.path.match(new RegExp('^/admin/select-organization'));
            let hasOrganizationSelected = this.$session.has('currentOrganizationId');

            if (!isLoggedIn) {
                return this.$router.push(`/login?redirectTo=${this.$route.path}`);
            } else {
                if (!headingToOrganizationSelect && !hasOrganizationSelected) {
                    return this.$router.push(`/admin/select-organization?redirectTo=${this.$route.path}`);
                }
            }

        },
        created() {
            bus.$on('LOGOUT', () => {
                this.$session.destroy();
                this.$router.push('/');
            });
        }
    }
</script>
