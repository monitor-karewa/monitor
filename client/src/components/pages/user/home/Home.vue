<template>
    <div>
        <h1>Home</h1>
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
        components: {
            Cover,
            Content
        }
    }
</script>