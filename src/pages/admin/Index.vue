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
            let expireDate = this.$session.get('expireDate');
            let headingToOrganizationSelect = this.$route.path.match(new RegExp('^/admin/select-organization'));
            let hasOrganizationSelected = this.$session.has('currentOrganizationId');
            if (!isLoggedIn || (expireDate != undefined && expireDate < new Date().getTime()/1000 )) {
                this.$session.remove('jwt');
                this.$session.remove('expireDate');
                return this.$router.push(`/login?redirectTo=${this.$route.path}`);
            } else {
                if (!headingToOrganizationSelect && !hasOrganizationSelected) {
                    return this.$router.push(`/admin/select-organization?redirectTo=${this.$route.path}`);
                }
            }
            
            
            let routeAccessValidations = [
                {
                    path: '/admin/users',
                    permission: 'USERS'
                },
                {
                    path: "/admin/suppliers",
                    permission: "SUPPLIERS"
                },
                {
                    path: "/admin/organizations",
                    permission: "ORGANIZATIONS"
                },
                {
                    path: "/admin/administrative-units",
                    permission: "ADMINISTRATIVE_UNITS"
                },
                {
                    path: "/admin/contracts",
                    permission: "CONTRACTS"
                },
                {
                    path: "/admin/resources",
                    permission: "RESOURCES"
                },
                {
                    path: "/admin/calculations",
                    permission: "CALCULATIONS"
                },
                {
                    path: "/admin/settings",
                    permission: "SETTINGS"
                }
            ];

            
            for (let validation of routeAccessValidations) {
                if (this.$route.path.includes(validation.path) && !this.hasAccess(validation.permission)) {
                    return this.$router.push(`/access-denied`);
                }
            }

        },
        computed: {
            permissions () {
                return this.$session.get('permissions') || [];
            }
        },
        methods: {
            hasAccess (permission) {
                if (!permission) {
                    return true;
                }

                return this.permissions && this.permissions.includes(permission);
            }
        },
        created() {
//            bus.$on('LOGOUT', () => {
//                this.$session.destroy();
//                this.$router.push('/');
//            });
        }
    }
</script>
