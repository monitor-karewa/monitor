<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <CatalogHeader :singular="'Contrato'" :plural="'Contratos'" />
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Contrato'" :plural="'Contratos'"
            />
        </AdminMainSection>

        <NewEntryModal v-bind:storeModule="storeModule" v-bind:data="{supplier:this.supplier, administrativeUnit:this.administrativeUnit,
        amount:this.amount, procedureType:this.procedureType}" :validator="$v">
            <div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Selecciona el proveedor"
                               v-model="$v.supplier.$model">
                        <label class="fg-label">Proveedor
                            <small></small>
                            <br>
                            <strong>Selecciona el proveedor/</strong>
                        </label>
                    </div>
                    <span v-if="$v.supplier.$invalid && $v.supplier.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Proveedor'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               v-model="$v.administrativeUnit.$model">
                        <label class="fg-label">Nombre del Cálculo
                            <small></small>
                            <br>
                            <strong>Selecciona la unidad administrativa</strong>
                        </label>
                    </div>
                    <span v-if="$v.administrativeUnit.$invalid && $v.administrativeUnit.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'U. Administrativa'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el cantidad"
                               v-model="$v.amount.$model">
                        <label class="fg-label">Cantidad
                            <small></small>
                            <br>
                            <strong>Introduce la cantidad</strong>
                        </label>
                    </div>
                    <span v-if="$v.amount.$invalid && $v.amount.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Cantidad'})}}</span>
                </div>
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Selecciona el tipo de procedimiento"
                               v-model="$v.procedureType.$model">
                        <label class="fg-label">Tipo de procedimiento
                            <small></small>
                            <br>
                            <strong>Selecciona el tipo de procedimiento</strong>
                        </label>
                    </div>
                    <span v-if="$v.procedureType.$invalid && $v.procedureType.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Tipo de procedimiento'})}}</span>
                </div>


            </div>
        </NewEntryModal>

        <ModalDanger :title="'Eliminar Contrato'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el usuario del catálogo permanentemente
                <br>
                <strong>¿Estás seguro de eliminarlo?</strong>
            </p>
        </ModalDanger>
    </div>
</template>



<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import { bus } from '@/main';
    import { DELETE_SUCCESS, DOC_CREATED } from "@/store/events";
    import  ModalDanger from "@/components/modals/ModalDanger";
    import { required } from "vuelidate/lib/validators"

    const storeModule = 'contracts';
    const docName = 'contracts.contract';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data () {
            return {
                storeModule: storeModule,
                tableHeaders : [
                    'Proveedor',
                    'Unidad Administrativa',
                    'Monto Total',
                    'Tipo de procedimiento',
                    'general.created-at'],
                tableColumns: [
                    {label: "contracts.supplier", visible : true,   field:'supplier'},
                    {label: "contracts.administrativeUnit", visible : true,   field:'administrativeUnit'},
                    {label: "contracts.amount", visible : true,   field:'amount'},
                    {label: "contracts.procedureType", visible : true,   field:'procedureType'},
                    {label: "general.created-at", visible : true,   field:'created_at', type:'Date'}
                ],
                supplier:"",
                administrativeUnit:"",
                amount:"",
                procedureType:""
            }
        },
        validations:{
          supplier:{ required },
          administrativeUnit:{ required },
          amount:{ required },
          procedureType:{ required }
        },
        computed:{
            requiredErrorMessage(){
                return 'contracts.validation.required'
            }
        },
        components: {
            ModalDanger
        },
        methods:{
            confirmDeletion(){
                this.deleteElementSelected();
            },
        },
        created(){
            bus.$on(storeModule+DELETE_SUCCESS, (data)=>{
                tShow("El contrato fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule+DOC_CREATED, ()=>{
                this.supplier = "";
                this.amount = "";
                this.administrativeUnit = "";
                this.procedureType = "";
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
