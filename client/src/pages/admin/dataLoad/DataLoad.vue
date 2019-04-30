<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <FloatingTitle title="data-load.title-strong" description="data-load.title.description"/>
            <div class="row m-0 w-100" v-show="!uploading">
                <div class="col-12 col-md-7">
                    <div class="card">
                        <div class="floating-text m-b-40">
                            <h1>{{$t('data-load.data-load')}}</h1>
                            <p>{{$t('data-load.data-load.recommended-for')}}</p>
                            <button class="btn-stroke button-accent">
                                {{$t('data-load.upload-file')}}
                                <input type="file" id="file" :ref="dataFileRef" v-on:change="handleFileUpload()" :accept="fileAccept" />
                            </button>
                        </div>
                        <!--<div class="floating-text">-->
                            <!--<h1>¿Cómo funciona?</h1>-->
                            <!--<a href=""><p><strong class="c-accent">Revisa la guia rápida de uso aquí</strong></p></a>-->
                        <!--</div>-->
                        <div class="floating-text">
                            <h1>{{$t('data-load.download-template')}}</h1>
                            <a href=""><p><strong class="c-accent">{{$t('data-load.download-template.link')}}</strong></p></a>
                        </div>
                        <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-file-table.svg" alt="" />
                    </div>
                </div>
                <div class="col-12 col-md-5">
                    <div class="card">
                        <div class="floating-text">
                            <h1>{{$t('data-load.manual-capture')}}</h1>
                            <p>{{$t('data-load.manual-capture.recommended-for')}}</p>
                            <router-link to="/admin/contracts" class="btn-stroke button-accent">
                                {{$t('data-load.manual-capture.go-to-catalog')}}
                            </router-link>
                            <!--<a href="/admin/contracts" class="btn-stroke button-accent"> Ir al catálogo </a>-->
                        </div>
                        <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-document.svg" alt="" />
                    </div>
                    <div class="card" v-show="recentUploadedBy && recentUploadedBy.length">
                        <div class="floating-text">
                            <h1>Estatus</h1>
                            <p class="f-style-italic m-b-5">
                                Última carga de datos subida el día
                                <br>
                                <!--<strong>25 de julio del 2018</strong>-->
                                <strong>{{recentConfirmedAt | moment}}</strong>
                                <br>
                                Subida por: <strong>{{recentUploadedBy}}</strong>
                            </p>
                        </div>
                        <img class="img-fluid img-card-corner" src="@/assets/images/Cards/corner-information-outline.svg" alt="" />
                    </div>
                </div>
            </div>
            <CardUploading v-show="uploading" :loading="uploading" :cancel="cancelUpload"/>
        </AdminMainSection>
    </div>
</template>



<style>
</style>

<script>
    import Vue from 'vue';
    import router from '@/router';
    import { bus } from '@/main';
    import i18n from '@/plugins/i18n';
    import {mapState} from 'vuex';
    import moment from 'moment';
    
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import BackButton from '@/components/general/BackButton';
    import FloatingTitle from '@/components/general/FloatingTitle';
    import CatalogHeader from '@/components/catalogs/Header';
    
    import CardUploading from '@/components/files/CardUploading';
    
    import api from '@/api/dataLoad.api';
    
    const storeModule = 'dataLoad';

    export default {
        data () {
            return {
                dataFileRef: 'dataFile',
                dataFile: null,
                allowedMimeTypes: [
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ],
                uploading: false,
            }
        },
        computed: {
            fileAccept () {
                return this.allowedMimeTypes.join(',');
            },
            recentConfirmedAt () {
                if (!this.dataLoadInfo) {
                    return new Date();
                }
                return this.dataLoadInfo.recentConfirmedAt || new Date();
            },
            recentUploadedBy () {
                if (!this.dataLoadInfo) {
                    return '';
                }
                return this.dataLoadInfo.recentUploadedBy || '';
            },
            ...mapState({
                dataLoadInfo: state => state.dataLoad.dataLoadInfo
            })
        },
        components: {
            AdminMainSection,
            BackButton,
            FloatingTitle,
            CatalogHeader,
            CardUploading
        },
        filters: {
            moment: function (date) {
                return moment(date).format('MM/DD/YYYY');
            }
        },
        methods:{
            handleFileUpload() {

                this.dataFile = null;
                
                if (this.$refs[this.dataFileRef].files && this.$refs[this.dataFileRef].files.length) {
                    this.dataFile = this.$refs[this.dataFileRef].files[0];
                }
                
                if (!this.dataFile || !this.dataFile.size || !this.dataFile.type) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo para la carga de datos`, 'danger');
                    return;
                }
                
                if (!this.allowedMimeTypes.includes(this.dataFile.type)) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo de hoja de cálculos para la carga de datos (.xls o .xlsx)`, 'danger');
                    return;
                }
                
                this.setUploading(true);

                let formData = new FormData();
                formData.append('file', this.dataFile);

                api.upload(formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }, (result) => {
                    this.setUploading(false);
                    Vue.$log.info('Response', result);
                    
                    if (result.data.error) {
                        console.log('Vue', Vue);
                        console.log('i18n', i18n);
                        tShow(this.$t(result.data.message), 'danger');
                        
                        //When a data load is currently in progress, the data load info it is returned in the response
                        if (result.data.data) {
                            this.$store.commit('dataLoad/SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: result.data.data});
                        }
                    } else {
                        this.$store.commit('dataLoad/SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: result.data.data});
                    }
                }, (error) => {
                    this.setUploading(false);
                    Vue.$log.error('Response error', error);
                    tShow(`Ocurrió un error inesperado al cargar el archivo`);
                });
            },
            
            setUploading(value) {
                this.uploading = value;
            },
            
            cancelUpload() {
                //TODO: cancel
                this.setUploading(false); 
            },
            
            redirectToCurrent() {
                router.push('/admin/data-load/current');
            }
        },
        created(){
        },
        
        mounted(){
            bus.$on('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', ({dataLoadInfo})=>{
                if (dataLoadInfo.current) {
                    this.redirectToCurrent();
                }
            });
            
            this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO');
        }
    }
</script>
