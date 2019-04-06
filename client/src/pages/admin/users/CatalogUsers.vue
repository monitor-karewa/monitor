<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Usuario'" :plural="'Usuarios'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Usuario'"
                    :plural="'Usuarios'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="doc">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.name.placeholder')"
                               v-model="doc.name">
                        <label class="fg-label">{{$t('users.new.name.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.name.sub-label')}}}</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.last-name.placeholder')"
                               v-model="doc.lastName">
                        <label class="fg-label">{{$t('users.new.last-name.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.last-name.sub-label')}}</strong>
                        </label>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('users.new.email.placeholder')"
                               v-model="doc.email">
                        <label class="fg-label"> {{$t('users.new.email.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.email.sub-label')}}</strong>
                        </label>
                    </div>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" value="">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.enabled.checkbox-label')}}</span>
                            <p class="fg-label "> {{$t('users.new.enabled.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="input-radio-check col-md-12 p-0">
                            <div class=" check-container col-md-6">
                                <input class="m-t-20" type="radio" value="GENERAL" v-model="doc.administratorType" name="administratorType" id="one">
                                <span class="role m-t-20"
                                      for="general">{{$t('users.new.admin-type.radio-button.general')}}</span>
                                <p class="fg-label"> {{$t('users.new.admin-type.label')}}
                                    <small></small>
                                    <br>
                                    <strong>{{$t('users.new.admin-type.sub-label')}}</strong>
                                </p>
                            </div>
                            <div class=" check-container col-md-6">
                                <input value="CUSTOM" type="radio" v-model="doc.administratorType" name="role" id="two">
                                <span for="custom">{{$t('users.new.admin-type.radio-button.custom')}}</span>
                            </div>
                        </div>
                    </div>

                    <div v-if="doc.administratorType == 'CUSTOM'">
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="USERS" v-model="doc.permissions">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.users')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="SUPPLIERS" v-model="doc.permissions">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.suppliers')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="ADMINISTRATIVE_UNITS" v-model="doc.permissions">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.administrative-units')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="CONTRACTS" v-model="doc.permissions">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.contracts')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="CALCULATIONS" v-model="doc.permissions">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.calculations')}}</span>
                        </div>
                        <div class="checkbox m-b-20">
                            <input type="checkbox" value="SETTINGS" v-model="doc.permissions">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.admin-type.radio-button.custom.settings')}}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('users.new.notes.placeholder')"
                               v-model="doc.notes">
                        <label class="fg-label">{{$t('users.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('users.new.notes.sub-label')}}}</strong>
                        </label>
                    </div>
                </div>
            </div>


        </NewEntryModal>


        <ModalDanger v-bind:confirm="confirm"/>
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    const storeModule = 'users';
    const docName = 'users.user';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : ['suppliers.name','Apellido','E-mail','general.created-at'],
                tableColumns: [
                    {label:'users.name', field : 'name', visible : true},
                    {label:'users.lastName', field : 'lastName', visible : true},
                    {label:'users.email', field : 'email', visible : true} ,
                    {label:'general.created-at', field : 'created_at', visible : true, type:'Date'}
                ],
                doc : {
                    permissions : [],
                    administratorType : "CUSTOM"
                }
            }
        },
        components: {
            ModalDanger
        },
        methods:{
            confirm(){
                console.log("confirm function");
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, (data)=>{
                tShow("Elemento Eliminado!!", 'info');
            })
        },
        mounted(){
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();

                $('.selectpicker').selectpicker();

                $('#toast-danger').click(function () {
                    tShow("Hubo un error en el proceso. Intenta de nuevo", 'danger');
                });
                $('#toast-info').click(function () {
                    tShow("Se informa del proceso por eso es un info", 'info');
                });
                $('#toast-warning').click(function () {
                    tShow("Complete todos los campos requeridos", 'alert');
                });
                $('#toast-success').click(function () {
                    tShow("Se ha completado el proceso correctamente sadasda adadasd sda dasdasdas dasda dasdasd ad adaspidjdj asoijdas", 'success');
                });
            });
        }
    }
</script>
