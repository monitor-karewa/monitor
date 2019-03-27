<template>
    <td class="row-buttons-hover">
        <div class="table-buttons-hover">
            <button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>
            <button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom" ><i class="zmdi zmdi-edit"></i></button>
            <button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom" @click="deleteElement"><i class="zmdi zmdi-delete"></i></button>
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
            deleteElement(){
                bus.$emit(this.$props.deleteEvent, this.$props.id);
            }
        },
        props:{
            'id' : String,
            //     type: String,
            //     required: true,
            //     default: "none",
            //     validator: function(value){
            //         return true
            //     }
            // },
            'deleteEvent' : {
                type: String,
                required: true,
                default: "none"
            }
        }
    }
</script>
