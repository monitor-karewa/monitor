<template>
    <td class="row-buttons-hover">
        <div class="table-buttons-hover">
            <!--<button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>-->
            <button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom" data-toggle="modal" data-target="#ModalEntry" @click="editEvent"><i class="zmdi zmdi-edit"></i></button>
            <button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom" data-toggle="modal" data-target="#modal-delete-entry" @click="deleteEntry"><i class="zmdi zmdi-delete"></i></button>
        </div>
    </td>
</template>

<style>
</style>

<script>
    import { bus } from '@/main';
    import { DOC_START_EDIT } from "@/store/events";
    export default {
        data () {
            return {
            }
        },
        components: {},
        methods:{
            deleteEntry(){
                this.$store.commit(`${this.$props.storeModule}/SET_DOC_ID`, this.$props.entry.id);
            },
            editEvent(){
                this.$store.commit(`${this.$props.storeModule}/SET_EDIT`, true);
                //fix to pass the entry through the state and manage the state & vuelidate
                $('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker('refresh');
                bus.$emit(this.$props.storeModule+DOC_START_EDIT, this.$props.entry);
                this.$nextTick(function () {
                    $('.selectpicker').selectpicker();
                    $('.selectpicker').selectpicker('refresh');
                })

            }
        },
        props:{
            'storeModule' : String,
            'entry' : Object
        }
    }
</script>
