<template>
    <td class="text-upper" 
        :class="{
            'c-error': hasErrors,
            'c-info': hasInfos,
            'c-success': willCreateDoc
        }">
        <i class="zmdi zmdi-alert-circle c-error f-16" :class="tippyErrorsClassName" v-if="hasErrors"></i>
        <i class="zmdi zmdi-alert-circle c-info f-16" :class="tippyInfosClassName" v-if="hasInfos"></i>
        <i class="zmdi zmdi-check-circle c-success f-16" :class="tippyCreateDocClassName" v-if="willCreateDoc"></i>
        &nbsp
        <template v-if="!format || format === 'string'">
            <span :class="tippyTooltipClassName">{{info.value | ellipsify}}</span>
        </template>
        <template v-if="format === 'url'">
            <a v-if="!hasErrors" :href="info.value" :class="tippyTooltipClassName" target="_blank">{{info.value | ellipsify}}</a>
            <span v-if="hasErrors">{{info.value}}</span>
        </template>
        <template v-if="format === 'currency'">
            {{info.value | currency}}
        </template>
        <template v-if="format === 'date'">
                {{info.value | moment}}
            </template>
                <template v-if="format === 'boolean'">

                    <div class="checkbox m-b-20">
                    <input type="checkbox" value="IS_EMPTY" :checked="info.value" disabled="true">
                    <i class="input-helper"></i>
                    </div>

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
                            return this.rowInfo[this.fieldName];
                        },

                        hasErrors() {
                            return this.info.errors.length;
                        },
                        hasInfos() {
                            return this.info.infos.length;
                        },
                        willCreateDoc() {
                            return this.info.shouldCreateDoc;
                        },

                        tippyTooltipClassName() {
                            if (this.info.value && this.info.value.length && this.info.value.length > this.maxTextLength) {
                                return `tippy-tooltip--${this.fieldName}-${this._uid}`;
                            } else {
                                return '';
                            }
                        },

                        tippyErrorsClassName() {
                            return `tippy-errors-${this.fieldName}-${this._uid}`;
                        },
                        tippyInfosClassName() {
                            return `tippy-infos-${this.fieldName}-${this._uid}`;
                        },
                        tippyCreateDocClassName() {
                            return `tippy-create-doc-${this.fieldName}-${this._uid}`;
                        },

                        tippyErrorsContent() {
                            if (!this.hasErrors) {
                                return '';
                            }
                return this.info.errors.map(e => `<span class="f-14"><i class="zmdi zmdi-alert-circle c-error f-16"></i> ${e.message}</span>`).join('<br/>\n');
            },
            tippyInfosContent() {
                if (!this.hasInfos) {
                    return '';
                }
                return this.info.infos.map(e => `<span class="f-14"><i class="zmdi zmdi-alert-circle c-info f-16"></i> ${e.message}</span>`).join('<br/>\n');
            },
            tippyCreateDocContent() {
                if (!this.willCreateDoc) {
                    return '';
                }
                return `<span class="f-14"><i class="zmdi zmdi-check-circle c-success f-16"></i> Se creará un nuevo registro</span>`;
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
                    return ['string', 'url', 'currency', 'date', 'boolean'].includes(value);
                },
                default: 'string'
            }
        },
        methods: {
            updateTooltips() {
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
                if (this.willCreateDoc) {
                    tippy(`.${this.tippyCreateDocClassName}`, {
                        content: this.tippyCreateDocContent
                    });
                }
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