<template>
    <td class="">
        <template v-if="!format && needsi18n">
            <span :class="tippyTooltipClassName">{{$t(info.value ) | ellipsify}}</span>
        </template>
        <template v-else-if="format === 'url'">
            <a :href="info.value" :class="tippyTooltipClassName" target="_blank">{{info.value | ellipsify}}</a>
        </template>
        <template v-else-if="format === 'currency'">
            {{info.value | currency}}
        </template>
        <template v-else-if="format === 'date'">
            {{info.value | moment}}
        </template>
        <template v-else>
            <span :class="tippyTooltipClassName">{{info.value | ellipsify}}</span>
        </template>

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
                maxTextLength: 30
            }
        },
        components: {
        },
        filters: {
            moment: function (date) {
                let m = moment(date);
                if (!m.isValid()) {
                    return '';
                }
                let formattedDate = m.utc().format('DD/MM/YYYY');
                if (!formattedDate) {
                    return '';
                }

                return formattedDate;
            },
            ellipsify: function (str) {
                let charNum = 30;
                let suffix = '...';
                if (utils.isNotDefined(str)) {
                    str = '';
                }

//                if (utils.isNotDefined(charNum)) {
//                    charNum = 20;
//                }

                if (str.length > charNum) {
                    return str.substr(0, charNum - suffix.length) + suffix;
                } else {
                    return str;
                }
//                ellipsify(str, charNum, suffix) {
//                },
            }
        },
        computed: {
            //TODO: A better name for this computed value
            info() {
                return {value: this.$props.value};
            },
            needsi18n() {
                return !!this.$props.i18n;
            },

            tippyTooltipClassName() {
                if (this.info.value && this.info.value.length && this.info.value.length > this.maxTextLength) {

                    return `tippy-tooltip--${this.$props.fieldName}-${this._uid}`;
                } else {
                    return '';
                }
            },
            tippyInfosContent() {
                if (!this.hasInfos) {
                    return '';
                }
                return this.info.infos.map(e => `<span class="f-14"><i class="zmdi zmdi-alert-triangle c-info f-14"></i> ${e.message}</span>`).join('<br/>\n');
            }
        },
        props: {
            value : {},
            i18n:  Boolean,
            fieldName:  {
                type : String,
                required : true
            },
            format: {
                type: String,
                validator: function (value) {
                    return ['string', 'url', 'currency', 'date'].includes(value);
                }
            }
        },
        methods: {
            updateTooltips() {
                if (this.tippyTooltipClassName.length) {
                    tippy(`.${this.tippyTooltipClassName}`, {
                        content: `<span class="f-14">${this.info.value}</span>`,
                        interactive: true,
                        maxWidth: 750
                    });
                }
            }
        },
        watch: {
            'rowInfo': function (val, oldVal) {
                this.updateTooltips();
            }
        },
        mounted () {
            this.updateTooltips();
        }
    }
</script>