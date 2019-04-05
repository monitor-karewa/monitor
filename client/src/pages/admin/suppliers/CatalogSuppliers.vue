<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Proveedor'" :plural="'Proveedores'" />
            <EditableTable
                    :docs="docs"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Proveedor'"
                    :plural="'Proveedores'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:validator="$v" v-bind:data="{name:this.name,rfc:this.rfc,notes:this.notes}">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">

                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.name.placeholder')" v-model="$v.name.$model"/>
                        <label class="fg-label">{{$t('suppliers.new.name.label')}}

                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.name.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span style="float: right">{{ doc && doc.name ? doc.name.length : 0}}/100</span>-->
                    <span v-if="$v.name.$invalid && $v.name.$dirty" class="c-error">{{nameErrorMessage}}</span>
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" :placeholder="$t('suppliers.new.rfc.placeholder')" v-model.trim="$v.rfc.$model"
                        @input="delayTouch($v.rfc)">
                        <label class="fg-label">{{$t('suppliers.new.rfc.label')}}
                            <small></small>
                            <br/>
                            <strong>{{$t('suppliers.new.rfc.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.rfc.$invalid && $v.rfc.$dirty" class="c-error">{{rfcErrorMessage}}</span>
                    <!--<span v-if="fieldErrors.fields.rfc" class="c-error">{{ fieldErrors.fields.rfc }}</span>-->
                </div>


                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('suppliers.new.notes.placeholder')" v-model="notes">
                        <label class="fg-label">{{$t('suppliers.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('suppliers.new.notes.sub-label')}}</strong>
                        </label>
                    </div>
                </div>

            </div>
        </NewEntryModal>

        <ModalDanger v-bind:confirm="confirmDeletion"/>
    </div>
</template>



<style>

</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    const storeModule = 'suppliers';
    const docName = 'suppliers.supplier';
    import { mapGetters } from 'vuex';
    import { required, minLength, maxLength } from 'vuelidate/lib/validators';
    const touchMap = new WeakMap();

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableColumns: [
                    { label: 'suppliers.name', field:'name', visible : true},
                    { label: 'suppliers.rfc', field:'rfc', visible : true},
                    { label: 'suppliers.notes' ,field:'notes', visible : true},
                    { label: 'general.created-at', field:'created_at', type:'Date', visible : true}
                ],
                name:"",
                rfc:"",
                notes:""

            }
        },
        validations:{
            name:{
                required,
                minLength:minLength(2),
                maxLength:maxLength(100)
            },
            rfc:{
                required,
                validRFC: (value) => {
                    if(value == null || value == undefined || value == ""){
                        return true
                    }
                    return (/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/).test(value);
                }
            }
        },
        computed: {
            nameErrorMessage(){
               if(!this.$v.name.required){
                   return "El nombre del Proveedor es requerido"
               }
               if(!this.$v.name.minLength || !this.$v.name.maxLength){
                   return `Debe estar entre ${this.$v.name.$params.minLength.min} y ${this.$v.name.$params.maxLength.max}`
               }
            },
            rfcErrorMessage(){
               if(!this.$v.rfc.required){
                   return "El RFC del Proveedor es requerido"
               }
               if(!this.$v.rfc.validRFC ){
                   return "El RFC introducido no tiene un formato válido"
               }

            }


        },
        components: {
            ModalDanger
        },
        methods:{

            confirm(){
                console.log("confirm function");
            },
            confirmDeletion(){
                this.deleteElementSelected();
            },
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 1000))
            }
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, ()=>{
                tShow("Elemento Eliminado!", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.name = "";
                this.rfc = "";
                this.notes = "";
                this.$v.$reset();
                tShow("Elemento Creado!", 'info');
            });
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
