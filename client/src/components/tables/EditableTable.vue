<template>
    <div>
        <div class="row m-0 w-100">
            <div class="col-12">
                <div class="card w-100">
                    <div class="card-header">
                        <Search/>
                        <ButtonsWrapper>
                            <Button/>
                            <Filters/>
                        </ButtonsWrapper>
                        <!--<div class="search-container">-->
                            <!--<div class="form-search">-->
                                <!--<input class="input-search" type="text" name="" value="" placeholder="Buscar Proveedores" />-->
                                <!--<i class="icon zmdi zmdi-search"></i>-->
                                <!--<i class="icon zmdi zmdi-close"></i>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="form-btn-top">-->
                            <!--<button class="btn-stroke button-accent">Editar</button>-->
                            <!--<div class="dropdown menu-filters">-->
                                <!--<button class="btn-stroke button-accent m-l-15" type="button" id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filtrar <i class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>-->
                                <!--<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownFilters">-->
                                    <!--<ul>-->
                                        <!--<li>-->
                                            <!--<div class="checkbox">-->
                                                <!--<input type="checkbox" value="">-->
                                                <!--<i class="input-helper"></i>-->
                                                <!--<span>Omitidos</span>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                            <!--<div class="checkbox">-->
                                                <!--<input type="checkbox" value="">-->
                                                <!--<i class="input-helper"></i>-->
                                                <!--<span>Errores</span>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover form-table">
                                <thead>
                                <tr>
                                    <TableHeader v-bind:name="$t('proveedores.nombre-razon-social')"/>
                                    <TableHeader v-bind:name="$t('proveedores.rfc')"/>
                                    <TableHeader v-bind:name="$t('proveedores.notas')"/>
                                    <TableHeader v-bind:name="$t('general.fecha-creacion')"/>
                                    <!--<th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i><i></i></th>-->
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>PETROMAX SA DE CV</td>
                                    <td>PETMX6548760</td>
                                    <td>Sin notas adicionales</td>
                                    <!--<td class="text-align-c">-->
                                        <!--<div class="checkbox m-0-auto">-->
                                            <!--<input type="checkbox" value="">-->
                                            <!--<i class="input-helper"></i>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                    <!--<td class="text-upper">Personalizado</td>-->
                                    <td>29/11/2018</td>
                                    <EditButtons/>
                                    <!--<td class="row-buttons-hover">-->
                                        <!--<div class="table-buttons-hover">-->
                                            <!--<button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>-->
                                            <!--<button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i></button>-->
                                            <!--<button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-delete"></i></button>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                </tr>
                                <!--<tr>-->
                                    <!--<td>Ley de Adquisiciones, Arrendamientos y Contratación de Servicios del Estado de Chihuahua.</td>-->
                                    <!--<td>Marco legal</td>-->
                                    <!--<td class="max-w-250px">-->
                                        <!--<strong class="c-info">http://www.congresochihuahua2.gob.mx/biblioteca/leyes/archivosLeyes/1420.pdf</strong>-->
                                    <!--</td>-->
                                    <!--<td class="text-align-c">-->
                                        <!--<div class="checkbox m-0-auto">-->
                                            <!--<input type="checkbox" value="">-->
                                            <!--<i class="input-helper"></i>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                    <!--<td class="text-upper">Personalizado</td>-->
                                    <!--<td>25/11/2018</td>-->
                                    <!--<td class="row-buttons-hover">-->
                                        <!--<div class="table-buttons-hover">-->
                                            <!--<button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>-->
                                            <!--<button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i></button>-->
                                            <!--<button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-delete"></i></button>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td>Indice de Corrupción</td>-->
                                    <!--<td>Cálculo para mostrar el presupuesto por tipo de contrato</td>-->
                                    <!--<td class="text-upper">General</td>-->
                                    <!--<td class="text-align-c">-->
                                        <!--<div class="checkbox m-0-auto">-->
                                            <!--<input type="checkbox" value="">-->
                                            <!--<i class="input-helper"></i>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                    <!--<td class="text-upper"><strong class="c-accent f-14">($CO x $NA)  / .005 - $IRC</strong></td>-->
                                    <!--<td>25/11/2018</td>-->
                                    <!--<td class="row-buttons-hover">-->
                                        <!--<div class="table-buttons-hover">-->
                                            <!--<button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>-->
                                            <!--<button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i></button>-->
                                            <!--<button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-delete"></i></button>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td><button class="btn-outline m-0-auto"><i class="zmdi zmdi-link m-r-0 c-accent"></i></button></td>-->
                                    <!--<td>Licitación Pública para adquisición de concreto hidráulico y material triturado</td>-->
                                    <!--<td>1 de Diciembre de 2017</td>-->
                                    <!--<td class="text-align-c">-->
                                        <!--<div class="checkbox m-0-auto">-->
                                            <!--<input type="checkbox" value="">-->
                                            <!--<i class="input-helper"></i>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                    <!--<td><strong class="c-primary text-upper">CANCELADO</strong></td>-->
                                    <!--<td>Adquisiciones</td>-->
                                    <!--<td class="row-buttons-hover">-->
                                        <!--<div class="table-buttons-hover">-->
                                            <!--<button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>-->
                                            <!--<button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i></button>-->
                                            <!--<button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-delete"></i></button>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                <!--</tr>-->
                                <!--<tr>-->
                                    <!--<td class="text-upper">MERP EDIFICACIONES Y TERRACERIAS SA DE CV</td>-->
                                    <!--<td class="text-upper">DIRECCION DE OBRAS PUBLICAS MUNICIPALES</td>-->
                                    <!--<td class="text-align-r"><strong class="c-accent f-16">$35,389,806.09</strong></td>-->
                                    <!--<td class="text-align-c">-->
                                        <!--<div class="checkbox m-0-auto">-->
                                            <!--<input type="checkbox" value="">-->
                                            <!--<i class="input-helper"></i>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                    <!--<td>-->
                                        <!--<div class="badge badge-green">Adjudicación Directa</div>-->
                                    <!--</td>-->
                                    <!--<td>Adquisiciones</td>-->
                                    <!--<td class="row-buttons-hover">-->
                                        <!--<div class="table-buttons-hover">-->
                                            <!--<button data-tippy="Ver" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-eye"></i></button>-->
                                            <!--<button data-tippy="Editar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-edit"></i></button>-->
                                            <!--<button data-tippy="Eliminar" data-tippy-arrow="true"  data-tippy-placement="bottom"><i class="zmdi zmdi-delete"></i></button>-->
                                        <!--</div>-->
                                    <!--</td>-->
                                <!--</tr>-->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--<div class="vertical-center">-->
                    <!--<div class="floating-label-table info m-r-40">Omitidos (duplicados)</div>-->
                    <!--<div class="floating-label-table error">Registros con errores</div>-->
                <!--</div>-->
                <Pagination/>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
    import Search from '@/components/tables/headers/Search';
    import ButtonsWrapper from '@/components/tables/headers/ButtonsWrapper';
    import Button from '@/components/tables/headers/Button';
    import Filters from '@/components/tables/headers/Filters';
    
    import TableHeader from '@/components/tables/headers/TableHeader';
    
    import EditButtons from '@/components/tables/tds/EditButtons';
    
    import Pagination from '@/components/catalogs/Pagination';
    
    export default {
        data () {
            return {
            }
        },
        components: {
            Search,
            ButtonsWrapper,
            Button,
            Filters,
            TableHeader,
            EditButtons,
            Pagination
        }
    }
</script>