<template>
    <div>
        <Cover/>
        <Content/>
    </div>
</template>
<style></style>
<script>
    import Cover from './Cover';
    import Content from './Content';
    
    export default {
        data () {
            return {
                
            }
        },
        mounted () {
            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });
        },
        components: {
            Cover,
            Content
        }
    }
</script>