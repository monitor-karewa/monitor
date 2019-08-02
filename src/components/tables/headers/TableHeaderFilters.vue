<template>
    <div class="dropdown menu-filters scroll-dropdown">
        <button class="btn-stroke button-accent m-l-15" type="button" id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filtrar <i class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownFilters">
            <ul>
                <li v-if="!hideTitle">
                    <div class="floating-text m-l-10 m-r-10">
                        <h1>Selecciona las columnas que deseas mostrar en la tabla.</h1>
                    </div>
                </li>
                <li v-if="!hideShowAllToggle">
                    <div class="checkbox">
                        <input type="checkbox" v-model="chkShowAllColumns" @click="showAllColumns()" >
                        <i class="input-helper"></i>
                        <span>Todas las columnas</span>
                    </div>
                </li>
                <li class="divider p-0 m-0" v-if="!hideTitle && !hideShowAllToggle"></li>
            </ul>
            <ul>
                <li v-for="column in columns">
                    <div class="checkbox">
                        <input type="checkbox" v-model="column.visible" :disabled="isLastVisibleColumn(column.visible)">
                        <i class="input-helper"></i>
                        <span>{{$t(column.label)}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>

</style>

<script>
    export default {
        data () {
            return {
                allColumns : false
            }
        },
        components: {},
        props:{
            columns : {
                type: Array,
                required: true
            },
            hideTitle: {
                type: Boolean,
                default: false
            },
            hideShowAllToggle: {
                type: Boolean,
                default: false
            }
        },
        methods:{
            showAllColumns(){
                console.log("checks",this.chkShowAllColumns);
                if(this.chkShowAllColumns){
                    
                    this.$props.columns.some(p=>{
                        p.visible = false;
                    })
                    this.$props.columns[0].visible = true;
                }else{
                    this.$props.columns.some(p=>{
                        p.visible = true;
                    })   
                }
            },
            isLastVisibleColumn : function(visible){
                return this.$props.columns.filter(p => p.visible).length === 1 && visible === true
            }
        },
        computed: {
            chkShowAllColumns : {
                get: function () {
                    return !this.$props.columns.filter(p => !p.visible).length > 0;
                },
                set: function (newValue) {
                }
            }
        }
    }
</script>
