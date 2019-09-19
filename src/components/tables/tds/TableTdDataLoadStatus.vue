<template>
    <td>
        <i class="zmdi zmdi-alert-circle-o c-error f-16" :class="`tippy-errors-${_uid}`" v-if="!willCreateDoc && (hasErrors || hasInfos || skipRow)"></i>
        <i class="zmdi zmdi-alert-circle-o f-16" :class="`tippy-errors-${_uid}`" v-if="!hasErrors && willCreateDoc"></i>
    </td>
</template>

<script>
    import tippy from 'tippy.js';
    export default {
        name: 'TableTdDataLoadStatus',
        data(){
            return {}
        },
        computed:{
            hasErrors(){
                return this.data.summary.hasErrors
            },
            skipRow(){
                return this.data.summary.skipRow
            },
            willCreateDoc(){
                return this.data.summary.willCreateDoc
            },
            hasInfos(){
                return this.data.summary.hasInfos
            },
        },
        methods: {
            updateTooltips() {
                if (this.hasErrors || this.skipRow) {
                    tippy(`.tippy-errors-${this._uid}`, {
                        content: this.createTooltipMessage()
                    });
                }
            },
            createTooltipMessage(){
                let message = "";
                if(this.hasErrors){
                    message += `<span class="f-14"> - Uno o más valores tiene errores.</span><br/>\n`
                }
                if(this.skipRow){
                    message += `<span class="f-14"> - El registro se omitirá al detectarse un duplicado.</span><br/>\n`
                }
                if(this.hasErrors && this.willCreateDoc){
                    message += `<span class="f-14"> - Se creara por lo menos un registro.</span><br>\n`
                }

                return message

            }
        },
        watch: {
            'data': function (val, oldVal) {
                this.updateTooltips();
            }
        },
        mounted () {
            this.updateTooltips();
        },
        props:{
            data:Object
        }

    }
</script>

<style>

</style>