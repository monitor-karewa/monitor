<template>
    <div>
        <button class="btn-stroke button-accent" v-show="!isEditingTable" @click.prevent="editTable(true)">Editar</button>
        <button class="btn-stroke button-accent" v-show="isEditingTable" data-toggle="modal" data-target="#modalAlertDefault">Guardar</button>
        <button class="btn-stroke button-accent" v-show="isEditingTable" @click.prevent="editTable(false)">Volver</button>
    </div>
</template>

<style>
</style>

<script>
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
            }
        },
        computed:{
            ...mapState({
                isEditingTable: function(state){
                    return state[this.$props.storeModule].isEditingTable;
                }
            })
        },
        methods: {
          editTable(value){
              this.$store.dispatch(`${this.$props.storeModule}/setEditTable`,value);
          }
        },
        components: {
        },
        props:{
            'storeModule': String
        }
    }
</script>