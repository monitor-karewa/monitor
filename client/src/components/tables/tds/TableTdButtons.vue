<template>
    <td class="row-buttons-hover">
        <div class="table-buttons-hover">
            <button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>
            <button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom" data-toggle="modal" data-target="#ModalEntry" @click="editEntry"><i class="zmdi zmdi-edit"></i></button>
            <button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom" data-toggle="modal" data-target="#modalAlertDanger" @click="deleteEntry"><i class="zmdi zmdi-delete"></i></button>
        </div>
    </td>
</template>

<style>
</style>

<script>
    import { bus } from '@/main';
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
            editEntry(){
                console.log("edit entry");
                this.$store.commit(`${this.$props.storeModule}/SELECT_ENTRY`, this.$props.entry);
            }
        },
        props:{
            //     type: String,
            //     required: true,
            //     default: "none",
            //     validator: function(value){
            //         return true
            //     }
            // },
            'storeModule' : String,
            'editEvent' : Function,
            'entry' : Object
        }
    }
</script>
