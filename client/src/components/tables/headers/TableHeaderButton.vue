<template>
    <div>
        <button class="btn-stroke button-accent" v-if="isEditingTable" @click="saveDocs()">Guardar</button>
        <button class="btn-stroke button-accent" v-if="!isEditingTable" @click="editTable(true)">Editar</button>
        <button class="btn-stroke button-accent" v-if="isEditingTable" @click="editTable(false)">Volver</button>
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
          },
          saveDocs(){
              this.$store.dispatch(`${this.$props.storeModule}/saveDocsUpdated`);
           }
        },
        components: {
        },
        props:{
            'storeModule': String
        }
    }
</script>