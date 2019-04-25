<template>
    <div>
        <AdminMainSection>
            <BackButton />
            <FloatingTitle title="data-load.title-strong" description="data-load.title.description"/>
            <div class="row m-0 w-100">
                <div class="col-12 col-md-8 di-flex" v-if="!showDetails">
                    <div class="card w-100">
                        <div class="floating-text m-b-30">
                            <h1>Resultados de la validación <!--<strong class="m-l-10 f-12 c-accent">(datos2018.xls)</strong>-->
                            </h1>
                            <p class="m-b-30">Para corregir los registros encontrados con errores, descarga
                                el archivo generado, realiza las correcciones necesarias y súbelo
                                nuevamente.</p>
                            <button class="btn-stroke button-accent b-shadow-none" @click="toggleShowDetails()">
                                Mostrar detalles
                            </button>
                        </div>

                        <div class="details-list">
                            <ul>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newContractsCount || 0}}</span>
                                    Nuevos Contratos
                                </li>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newSuppliersCount || 0}}</span>
                                    Nuevos Proveedores
                                </li>
                                <li>
                                    <span class="c-success"><i class="zmdi zmdi-check-circle"></i> {{current.summary.newAdministrativeUnitsCount || 0}}</span>
                                    Nuevas Unidades
                                    Administrativas
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedContractsCount || 0}}</span>
                                    Contratos omitidos (duplicados)
                                </li>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedSuppliersCount || 0}}</span>
                                    Proveedores omitidos (duplicados)
                                </li>
                                <li>
                                    <span class="c-info"><i class="zmdi zmdi-info-outline"></i> {{current.summary.skippedAdministrativeUnitsCount || 0}}</span>
                                    Unidades Administrativas omitidas (duplicados)
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span class="c-error"><i class="zmdi zmdi-alert-triangle"></i> {{current.summary.errorsCount || 0}}</span>
                                    Registros con errores
                                </li>
                            </ul>
                        </div>

                        <button type="" class="btn-outline c-error" @click="cancel">Cancelar procesamiento</button>
                    </div>
                </div>

                <div class="col-12 col-md-8" v-if="showDetails">
                    <div class="card w-100">
                        <div class="card-header">


                            <TableHeaderSearch :store-module="storeModule" :action-name="filterActionName"/>
                            <TableHeaderButtonsWrapper>
                                <!--<TableHeaderButton :store-module="storeModule"/>-->
                                <TableHeaderFilters :columns="filterRows" :hideTitle="true" :hideShowAllToggle="true"/>
                            </TableHeaderButtonsWrapper>
                            
                            
                            <!--<div class="search-container">-->
                                <!--<div class="form-search">-->
                                    <!--<input class="input-search" type="text" name="" value=""-->
                                           <!--placeholder="Buscar Contratos"/>-->
                                    <!--<i class="icon zmdi zmdi-search"></i>-->
                                    <!--<i class="icon zmdi zmdi-close"></i>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="form-btn-top">-->
                                <!---->
                                <!---->
                                <!---->
                                <!--<div class="dropdown menu-filters">-->
                                    <!--<button class="btn-stroke button-accent m-l-15" type="button"-->
                                            <!--id="dropdownFilters" data-toggle="dropdown" aria-haspopup="true"-->
                                            <!--aria-expanded="false">Filtrar <i-->
                                            <!--class="zmdi zmdi-caret-down m-r-0 m-l-5 f-18"></i></button>-->
                                    <!--<div class="dropdown-menu dropdown-menu-right"-->
                                         <!--aria-labelledby="dropdownFilters">-->
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
                                        <!--<th>Proveedor<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <!--<th>Unidad Administrativa Solicitante<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <!--<th class="text-align-r">Monto Total<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <!--<th>Title Header<i class="zmdi zmdi-caret-down m-l-5 f-16"></i></th>-->
                                        <th></th>
                                        <th>Tipo de procedimiento</th>
                                        <th>Categoría</th>
                                        <th>Administración</th>
                                        <th>Año fiscal</th>
                                        <th>Periodo</th>
                                        <th>Id del Contrato</th>
                                        <th>Partida</th>
                                        <th>Estado del procedimiento</th>
                                        <th>Hipervínculo a convocatoria / invitaciones</th>
                                        <th>Fecha de convocatoria / invitación</th>
                                        <th>Descripción</th>
                                        <th>Fecha junta de aclaraciones</th>
                                        <th>Hipervínculo al fallo de Junta de Aclaraciones</th>
                                        <th>Hipervínculo al documento de la Presentación de Propuestas</th>
                                        <th>Nombre del contratista</th>
                                        <th>RFC</th>
                                        <th>Unidad administrativa convocante</th>
                                        <th>Unidad administrativa solicitante</th>
                                        <th>Centralizada / Descentralizada</th>
                                        <th>Número identificador del contrato</th>
                                        <th>Fecha del contrato</th>
                                        <th>Monto total c/impuestos</th>
                                        <th>Monto mínimo*</th>
                                        <th>Monto máximo*</th>
                                        <th>Monto total / máximo</th>
                                        <th>Hipervínculo al documento del contrato y anexos</th>
                                        <th>Área responsable de la información</th>
                                        <th>Fecha de actualización</th>
                                        <th>Notas</th>
                                        <th>Notas Monitor Karewa</th>
                                        <th>Fecha de obtención de datos</th>
                                        <th>¿Excede límite de adj. directas?</th>
                                        <th>Monto excedente sobre límite de adj. directa</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="height-60" v-for="(rowInfo, rowInfoIndex) in filteredDataLoad" v-if="isRowInfoVisible(rowInfo)">
                                        <td>
                                            <i class="zmdi zmdi-alert-triangle c-info f-14" v-if="rowInfo.summary.skipRow"></i>
                                            <i class="zmdi zmdi-alert-triangle c-error f-14" v-if="rowInfo.summary.hasErrors"></i>
                                        </td>
                                        <td class="text-upper" 
                                            :class="{
                                                'c-error': rowInfo.procedureType.errors.length,
                                                'c-info': rowInfo.procedureType.infos.length
                                            }">
                                            {{rowInfo.procedureType.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.category.errors.length,
                                                'c-info': rowInfo.category.infos.length
                                            }">
                                            {{rowInfo.category.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.administration.errors.length,
                                                'c-info': rowInfo.administration.infos.length
                                            }">
                                            {{rowInfo.administration.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.fiscalYear.errors.length,
                                                'c-info': rowInfo.fiscalYear.infos.length
                                            }">
                                            {{rowInfo.fiscalYear.value}}
                                        </td>
                                        <td class=""
                                            :class="{
                                                'c-error': rowInfo.period.errors.length,
                                                'c-info': rowInfo.period.infos.length
                                            }">
                                            {{rowInfo.period.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.contractId.errors.length,
                                                'c-info': rowInfo.contractId.infos.length
                                            }">
                                            {{rowInfo.contractId.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.partida.errors.length,
                                                'c-info': rowInfo.partida.infos.length
                                            }">
                                            {{rowInfo.partida.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.procedureState.errors.length,
                                                'c-info': rowInfo.procedureState.infos.length
                                            }">
                                            {{rowInfo.procedureState.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.announcementUrl.errors.length,
                                                'c-info': rowInfo.announcementUrl.infos.length
                                            }">
                                            <a v-if="!rowInfo.announcementUrl.errors.length" :href="rowInfo.announcementUrl.value" target="_blank">{{rowInfo.announcementUrl.value}}</a>
                                            <span v-if="rowInfo.announcementUrl.errors.length">{{rowInfo.announcementUrl.value}}</span>
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.announcementDate.errors.length,
                                                'c-info': rowInfo.announcementDate.infos.length
                                            }">
                                            {{rowInfo.announcementDate.value | moment}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.servicesDescription.errors.length,
                                                'c-info': rowInfo.servicesDescription.infos.length
                                            }">
                                            {{rowInfo.servicesDescription.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.clarificationMeetingDate.errors.length,
                                                'c-info': rowInfo.clarificationMeetingDate.infos.length
                                            }">
                                            {{rowInfo.clarificationMeetingDate.value | moment}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.clarificationMeetingJudgmentUrl.errors.length,
                                                'c-info': rowInfo.clarificationMeetingJudgmentUrl.infos.length
                                            }">
                                            <!--{{rowInfo.clarificationMeetingJudgmentUrl.value}}-->
                                            <a v-if="!rowInfo.clarificationMeetingJudgmentUrl.errors.length" :href="rowInfo.clarificationMeetingJudgmentUrl.value" target="_blank">{{rowInfo.clarificationMeetingJudgmentUrl.value}}</a>
                                            <span v-if="rowInfo.clarificationMeetingJudgmentUrl.errors.length">{{rowInfo.clarificationMeetingJudgmentUrl.value}}</span>
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.presentationProposalsDocUrl.errors.length,
                                                'c-info': rowInfo.presentationProposalsDocUrl.infos.length
                                            }">
                                            <!--{{rowInfo.presentationProposalsDocUrl.value}}-->
                                            <a v-if="!rowInfo.clarificationMeetingJudgmentUrl.errors.length" :href="rowInfo.presentationProposalsDocUrl.value" target="_blank">{{rowInfo.presentationProposalsDocUrl.value}}</a>
                                            <span v-if="rowInfo.presentationProposalsDocUrl.errors.length">{{rowInfo.presentationProposalsDocUrl.value}}</span>
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.supplierName.errors.length,
                                                'c-info': rowInfo.supplierName.infos.length
                                            }">
                                            {{rowInfo.supplierName.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.supplierRfc.errors.length,
                                                'c-info': rowInfo.supplierRfc.infos.length
                                            }">
                                            {{rowInfo.supplierRfc.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.organizerAdministrativeUnit.errors.length,
                                                'c-info': rowInfo.organizerAdministrativeUnit.infos.length
                                            }">
                                            {{rowInfo.organizerAdministrativeUnit.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.applicantAdministrativeUnit.errors.length,
                                                'c-info': rowInfo.applicantAdministrativeUnit.infos.length
                                            }">
                                            {{rowInfo.applicantAdministrativeUnit.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.administrativeUnitType.errors.length,
                                                'c-info': rowInfo.administrativeUnitType.infos.length
                                            }">
                                            {{rowInfo.administrativeUnitType.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.contractNumber.errors.length,
                                                'c-info': rowInfo.contractNumber.infos.length
                                            }">
                                            {{rowInfo.contractNumber.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.contractDate.errors.length,
                                                'c-info': rowInfo.contractDate.infos.length
                                            }">
                                            {{rowInfo.contractDate.value | moment}}
                                        </td>
                                        <td class="c-accent text-align-r f-14"
                                            :class="{
                                                'c-error': rowInfo.totalAmount.errors.length,
                                                'c-info': rowInfo.totalAmount.infos.length
                                            }">
                                            {{rowInfo.totalAmount.value | currency}}
                                        </td>
                                        <td class="c-accent text-align-r f-14"
                                            :class="{
                                                'c-error': rowInfo.minAmount.errors.length,
                                                'c-info': rowInfo.minAmount.infos.length
                                            }">
                                            {{rowInfo.minAmount.value | currency}}
                                        </td>
                                        <td class="c-accent text-align-r f-14"
                                            :class="{
                                                'c-error': rowInfo.maxAmount.errors.length,
                                                'c-info': rowInfo.maxAmount.infos.length
                                            }">
                                            {{rowInfo.maxAmount.value | currency}}
                                        </td>
                                        <td class="c-accent text-align-r f-14"
                                            :class="{
                                                'c-error': rowInfo.totalOrMaxAmount.errors.length,
                                                'c-info': rowInfo.totalOrMaxAmount.infos.length
                                            }">
                                            {{rowInfo.totalOrMaxAmount.value | currency}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.contractUrl.errors.length,
                                                'c-info': rowInfo.contractUrl.infos.length
                                            }">
                                            <!--{{rowInfo.contractUrl.value}}-->
                                            <a v-if="!rowInfo.contractUrl.errors.length" :href="rowInfo.contractUrl.value" target="_blank">{{rowInfo.contractUrl.value}}</a>
                                            <span v-if="rowInfo.contractUrl.errors.length">{{rowInfo.contractUrl.value}}</span>
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.areaInCharge.errors.length,
                                                'c-info': rowInfo.areaInCharge.infos.length
                                            }">
                                            {{rowInfo.areaInCharge.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.actualizationDate.errors.length,
                                                'c-info': rowInfo.actualizationDate.infos.length
                                            }">
                                            {{rowInfo.actualizationDate.value | moment}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.notes.errors.length,
                                                'c-info': rowInfo.notes.infos.length
                                            }">
                                            {{rowInfo.notes.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.karewaNotes.errors.length,
                                                'c-info': rowInfo.karewaNotes.infos.length
                                            }">
                                            {{rowInfo.karewaNotes.value}}
                                        </td>
                                        <td class="text-upper"
                                            :class="{
                                                'c-error': rowInfo.informationDate.errors.length,
                                                'c-info': rowInfo.informationDate.infos.length
                                            }">
                                            {{rowInfo.informationDate.value | moment}}
                                        </td>
                                        <td class="text-upper":class="{
                                                'c-error': rowInfo.limitExceeded.errors.length,
                                                'c-info': rowInfo.limitExceeded.infos.length
                                            }">
                                            {{rowInfo.limitExceeded.value}}
                                        </td>
                                        <td class="c-accent text-align-r f-14"
                                            :class="{
                                                'c-error': rowInfo.amountExceeded.errors.length,
                                                'c-info': rowInfo.amountExceeded.infos.length
                                            }">
                                            {{rowInfo.amountExceeded.value | currency}}
                                        </td>
                                        
                                        
                                        
                                        
                                        
                                        <!--<td class="c-error text-align-r"><strong-->
                                                <!--class="f-14">$81,400,000</strong></td>-->
                                        <!--<td class="text-upper c-info">Body text</td>-->
                                        <!--<td class="text-upper c-info">Body text</td>-->
                                        <!--<td class="row-buttons-hover">-->
                                            <!--<div class="table-buttons-hover">-->
                                                <!--<button data-tippy="Ver" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-eye"></i></button>-->
                                                <!--<button data-tippy="Editar" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-edit"></i></button>-->
                                                <!--<button data-tippy="Eliminar" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-delete"></i></button>-->
                                            <!--</div>-->
                                        <!--</td>-->
                                    </tr>
                                    <!--<tr class="height-60">-->
                                        <!--<td class="text-upper">FUTUFARMA SA DE CV</td>-->
                                        <!--<td class="text-upper">INSTITUTO MUNICIPAL DE PENSIONES</td>-->
                                        <!--<td class="c-accent text-align-r"><strong-->
                                                <!--class="f-14">$81,400,000</strong></td>-->
                                        <!--<td class="text-upper">Body text</td>-->
                                        <!--<td class="text-upper">Body text</td>-->
                                        <!--<td class="row-buttons-hover">-->
                                            <!--<div class="table-buttons-hover">-->
                                                <!--<button data-tippy="Ver" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-eye"></i></button>-->
                                                <!--<button data-tippy="Editar" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-edit"></i></button>-->
                                                <!--<button data-tippy="Eliminar" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-delete"></i></button>-->
                                            <!--</div>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    <!--<tr class="height-60">-->
                                        <!--<td class="text-upper c-error">FUTUFARMA SA DE CV</td>-->
                                        <!--<td class="text-upper c-error">INSTITUTO MUNICIPAL DE PENSIONES</td>-->
                                        <!--<td class="c-error text-align-r"><strong-->
                                                <!--class="f-14">$81,400,000</strong></td>-->
                                        <!--<td class="text-upper c-error">Body text</td>-->
                                        <!--<td class="text-upper c-error">Body text</td>-->
                                        <!--<td class="row-buttons-hover">-->
                                            <!--<div class="table-buttons-hover">-->
                                                <!--<button data-tippy="Ver" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-eye"></i></button>-->
                                                <!--<button data-tippy="Editar" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-edit"></i></button>-->
                                                <!--<button data-tippy="Eliminar" data-tippy-arrow="true"-->
                                                        <!--data-tippy-placement="bottom"><i-->
                                                        <!--class="zmdi zmdi-delete"></i></button>-->
                                            <!--</div>-->
                                        <!--</td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="vertical-center">
                        <!--<div class="floating-label-table info m-r-40">Omitidos (duplicados)</div>-->
                        <!--<div class="floating-label-table error">Registros con errores</div>-->
                        <div class="floating-label-table m-r-40"><i class="zmdi zmdi-alert-triangle c-info f-14"></i> Omitidos (duplicados)</div>
                        <div class="floating-label-table "><i class="zmdi zmdi-alert-triangle c-error f-14"></i> Registros con errores</div>
                    </div>
                </div>
                
                
                <div class="col-12 col-md-4">
                    <div class="card">
                        <div class="note-transparent error">
                            <i class="zmdi zmdi-alert-triangle"></i>
                            <p>Hay errores en uno o más registros. Por favor, <strong>descarga el
                                archivo</strong> con validaciones y realiza las correcciones necesarias.</p>
                        </div>
                        <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                            Descargar archivo con validaciones</p>
                        <button class="btn-stroke button-accent m-0-auto b-shadow-none">DESCARGAR
                            VALIDACIONES
                        </button>
                    </div>
                    <div class="card">
                        <p class="f-12 c-plain_text principal-font-semibold text-align-c d-block m-b-15">
                            Cargar archivo con correcciones</p>
                        <button class="btn-stroke button-accent m-0-auto b-shadow-none">CARGAR
                            CORRECCIONES
                        </button>
                    </div>
                    <div class="card">
                        <button class="btn-outline c-warning m-0-auto">IGNORAR ERRORES Y CONTINUAR</button>
                    </div>
                </div>
            </div>
        </AdminMainSection>
    </div>
</template>

<style>
</style>

<script>
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import BackButton from '@/components/general/BackButton';
    import FloatingTitle from '@/components/general/FloatingTitle';
    import TableHeaderSearch from '@/components/tables/headers/TableHeaderSearch';
    import TableHeaderButtonsWrapper from '@/components/tables/headers/TableHeaderButtonsWrapper';
//    import TableHeaderButton from '@/components/tables/headers/TableHeaderButton';
    import TableHeaderFilters from '@/components/tables/headers/TableHeaderFilters';
    
    import {mapState} from 'vuex';
    import { bus } from '@/main';
    import moment from 'moment';
    import utils from '@/common/utils';
    
    export default {
        
        data () {
            return {
                showDetails: false,
                storeModule: 'dataLoad',
                filterActionName: 'FILTER_CURRENT_DATA_LOAD',
                filterRows: [
                    {
                        label: 'data-load.review.columns.no-issues',
                        visible: true
                    },
                    {
                        label: 'data-load.review.columns.skipped',
                        visible: true
                    },
                    {
                        label: 'data-load.review.columns.errors',
                        visible: true
                    }
                ]
            }
        },
        components: {
            AdminMainSection,
            BackButton,
            FloatingTitle,
            TableHeaderSearch,
            TableHeaderButtonsWrapper,
//            TableHeaderButton,
            TableHeaderFilters
        },
        computed: {
            current () {
                return this.dataLoadInfo.current || {
                        summary: {
                            
                        }
                    };
            },
            showNoIssues () {
                return this.filterRows[0].visible;
            },
            showSkipped () {
                return this.filterRows[1].visible;
            },
            showErrors () {
                return this.filterRows[2].visible;
            },
            ...mapState({
                dataLoadInfo: state => state.dataLoad.dataLoadInfo,
                dataLoad: state => state.dataLoad.dataLoad,
                filteredDataLoad: state => state.dataLoad.filteredDataLoad,
                filtering: state => state.dataLoad.filtering
            })
        },
        filters: {
            moment: function (date) {
                if (!utils.isDate(date)) {
                    return '';
                }
                return moment(date).format('MM/DD/YYYY');
            }
        },
        methods: {
            toggleShowDetails () {
                this.showDetails = true;
                this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD');
            },

            cancel () {
                this.$store.dispatch('dataLoad/CANCEL_CURRENT_DATA_LOAD');
            },
            canceled () {
                this.$router.push('/admin/data-load');
            },
            isRowInfoVisible (rowInfo) {
                if (!this.showSkipped && rowInfo.summary.skipRow) {
                    return false;
                }
                if (!this.showErrors && rowInfo.summary.hasErrors) {
                    return false;
                }
                if (!this.showNoIssues && !rowInfo.summary.skipRow && !rowInfo.summary.hasErrors) {
                    return false;
                }
                return true;
            }
        },
        created() {
        },
        mounted(){
            bus.$on('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', ({dataLoadInfo})=>{
                //Current was canceled, confirmed, or otherwise not available, so we redirect to the non-current view
                if (!dataLoadInfo.current) {
                    this.canceled();
                }
            });
            
            this.$store.dispatch('dataLoad/LOAD_CURRENT_DATA_LOAD_INFO');
        }
    }
</script>