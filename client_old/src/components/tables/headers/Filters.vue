<template>
    <div class="dropdown menu-filters">
        <button class="btn-stroke button-accent m-l-15" type="button" id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filtrar <i class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownFilters">
            <ul>
                <li>
                    <div class="checkbox">
                        <input type="checkbox" value="">
                        <i class="input-helper"></i>
                        <span>Omitidos</span>
                    </div>
                </li>
                <li>
                    <div class="checkbox">
                        <input type="checkbox" value="">
                        <i class="input-helper"></i>
                        <span>Errores</span>
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
            }
        },
        components: {
        }
    }
</script>