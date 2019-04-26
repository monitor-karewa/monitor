<template>
    <td class="text-upper" 
        :class="{
            'c-error': hasErrors,
            'c-info': hasInfos
        }">
        <template v-if="!format || format === 'string'">
            {{info.value}}
        </template>
        <template v-if="format === 'url'">
            <a v-if="!hasErrors" :href="info.value" target="_blank">{{info.value}}</a>
            <span v-if="hasErrors">{{info.value}}</span>
        </template>
        <template v-if="format === 'currency'">
            {{info.value | currency}}
        </template>
        <template v-if="format === 'date'">
            {{info.value | moment}}
        </template>
        <i class="zmdi zmdi-alert-triangle c-error f-14" :class="tippyErrorsClassName" v-if="hasErrors"></i>
        <i class="zmdi zmdi-alert-triangle c-info f-14" :class="tippyInfosClassName" v-if="hasInfos"></i>
    </td>
</template>

<style>
</style>

<script>
    import moment from 'moment';
    import utils from '@/common/utils';
    import tippy from 'tippy.js';
    
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        filters: {
            moment: function (date) {
                if (!utils.isDate(date)) {
                    return '';
                }
                return moment(date).format('MM/DD/YYYY');
            }
        },
        computed: {
            //TODO: A better name for this computed value
            info() {
                return this.rowInfo[this.fieldName];
            },
            
            hasErrors() {
                return this.info.errors.length;
            },
            hasInfos() {
                return this.info.infos.length;
            },
            
            tippyErrorsClassName() {
                return `tippy-errors-${this.fieldName}`;
            },
            tippyInfosClassName() {
                return `tippy-infos-${this.fieldName}`;
            },
            
            tippyErrorsContent() {
                if (!this.hasErrors) {
                    return '';
                }
                return this.info.errors.map(e => `<span class="f-14"><i class="zmdi zmdi-alert-triangle c-error f-14"></i> ${e.message}</span>`).join('<br/>\n');
            },
            tippyInfosContent() {
                if (!this.hasInfos) {
                    return '';
                }
                return this.info.infos.map(e => `<span class="f-14"><i class="zmdi zmdi-alert-triangle c-info f-14"></i> ${e.message}</span>`).join('<br/>\n');
            }
        },
        props: {
            rowInfo: {
                type: Object,
                required: true
            },
            fieldName: {
                type: String,
                required: true
            },
            format: {
                type: String,
                validator: function (value) {
                    return ['string', 'url', 'currency', 'date'].includes(value);
                },
                default: 'string'
            }
        },
        mounted () {
            if (this.hasErrors) {
                tippy(`.${this.tippyErrorsClassName}`, {
                    content: this.tippyErrorsContent
                });
            }
            if (this.hasInfos) {
                tippy(`.${this.tippyInfosClassName}`, {
                    content: this.tippyInfosContent
                });
            }
        }
    }
</script>