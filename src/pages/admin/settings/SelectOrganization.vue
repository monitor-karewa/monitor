<template>
    <div>
        <AdminMainSection>
            <BackButton/>
            <div class="col-12">
                <OrganizationSelector/>
            </div>
        </AdminMainSection>
    </div>
</template>

<script>
    import BackButton from '@/components/general/BackButton';
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import OrganizationSelector from '@/components/general/OrganizationSelector';

    export default {
        data() {
            return {
            }
        },
        components: {
            BackButton,
            AdminMainSection,
            OrganizationSelector
        },
    }
</script>

<style scoped>

</style>
