<template>
    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
        <div class="panel-button">
            <label>{{$t(title)}}</label>
                <small v-if="!hasUrl">{{$t('general.files.documents.download-unavailable')}}</small>
            <button v-if="hasUrl" class="btn-raised xs button-accent" data-toggle="modal" :data-target="'#' + modalId"><i class="zmdi zmdi-download"></i>{{$t(buttonText)}}</button>
        </div>
        <div class="modal fade" :id="modalId" width="600" tabindex="-1" role="dialog" v-if="hasUrl">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content min-w-600px">
    
                    <div class="modal-header">
                        <a class="close-modal" data-dismiss="modal"><i class="zmdi zmdi-close"></i></a>
                        <h1 class="modal-title">{{$t('general.files.documents.download')}} <strong>{{$t(title)}}</strong></h1>
                        <label class="modal-subtitle">{{$t('general.files.backup.description')}}</label>
                    </div>
    
    
                    <div class="modal-body d-flex">
                        <div class="col-sm-6">
                            <a v-if="url && url.length" :href="url" class="btn-raised xs button-accent c-white" target="_blank"><i class="zmdi zmdi-download"></i> {{$t('general.files.backup.original-download')}}</a>
                            <small v-if="!url || !url.length">{{$t('general.files.backup.original-unavailable')}}</small>
                        </div>
                        <div class="col-sm-6 p-l-40">
                            <a v-if="urlBackup && urlBackup.length" :href="baseUrl + '/public-api/files/download/' + urlBackup" class="btn-raised xs button-accent c-white" target="_blank"><i class="zmdi zmdi-download"></i> {{$t('general.files.backup.backup-download')}}</a>
                            <small v-if="!urlBackup || !urlBackup.length">{{$t('general.files.backup.backup-unavailable')}}</small>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    import baseApi from '@/api/base.api';
    
    export default {
        data () {
            return {
            }
        },
        components: {
        },
        computed: {
            modalId() {
                return `file-backup-modal-${this._uid}`;
            },
            hasUrl() {
                return this.url && this.url.length;
            },
            baseUrl() {
                return baseApi.baseUrl;
            }
        },
        props: {
            title: {
                type: String,
                required: true
            },
            buttonText: {
                type: String,
                default: 'general.files.documents.download-document'
            },
            url: {
                type: String,
                required: false
            },
            urlBackup: {
                type: String
            },
        }
    }
</script>