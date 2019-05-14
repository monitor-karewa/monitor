<template>
    <div>
        <!--<AdminMainSection>-->
            <!--<BackButton/>-->
            <!--<OrganizationSelector/>-->
        <!--</AdminMainSection>-->
        <Cover :showFilters="showFilters" :showOrganizationSelect="showOrganizationSelect"/>

    </div>
</template>

<script>
//    import BackButton from '@/components/general/BackButton';
//    import AdminMainSection from '@/components/admin/AdminMainSection';
//    import OrganizationSelector from '@/components/general/OrganizationSelector';

    import Cover from './Cover';


    export default {
        data() {
            return {
                showFilters: false,
                showOrganizationSelect: true
            }
        },
        components: {
            Cover
//            BackButton,
//            AdminMainSection,
//            OrganizationSelector
        },
    }
</script>

<style scoped>

</style>
