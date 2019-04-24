<template>
    <div>
        <AdminMainSection>
            <BackButton/>
            <CatalogHeader :singular="'Contrato'" :plural="'Contratos'"/>
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Contrato'" :plural="'Contratos'"
            />
        </AdminMainSection>

        <modalEntry v-bind:storeModule="storeModule" :validator="$v">
            <div>
                <!--Procedure Type-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.supplier._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.procedure-type.placeholder')"
                                title="Select placeholder">
                            <option value="PUBLIC"> {{$t('contracts.procedure-type.public')}}</option>
                            <option value="NO_BID">{{$t('contracts.procedure-type.no-bid')}}</option>
                            <option value="INVITATION"> {{$t('contracts.procedure-type.invitation')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.procedure-type.label')}}</label>
                    </div>
                </div>

                <!--Category-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.category" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.procedure-type.placeholder')"
                                title="Select placeholder">
                            <option value="EXTENSION"> {{$t('contracts.procedure-type.extension')}}</option>
                            <option value="MODIFICACION"> {{$t('contracts.procedure-type.modification')}}</option>
                            <option value="ADENDUM"> {{$t('contracts.procedure-type.public')}}</option>
                            <option value="ACQUISITION"> {{$t('contracts.procedure-type.public')}}</option>
                            <option value="SERVICES"> {{$t('contracts.procedure-type.public')}}</option>
                            <option value="LEASE"> {{$t('contracts.procedure-type.public')}}</option>
                            <option value="PUBLIC_WORKS"> {{$t('contracts.procedure-type.public')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.procedure-type.label')}}</label>
                    </div>
                </div>

                <!--administrationPeriod-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.administration-period.placeholder')"
                               v-model="entry.administrationPeriod">
                        <label class="fg-label">{{$t('contracts.new.administration-period.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.administration-period.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.administrationPeriod.$invalid && $v.entry.administrationPeriod.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.administration-period.label'})}}</span>-->
                </div>

                <!--fiscal year-->
                <div class="fg-line basic-input">
                    <input type="text" class="form-control fg-input"
                           :placeholder="$t('contracts.new.fiscal-year.placeholder')"
                           v-model="entry.fiscalYear">
                    <label class="fg-label">{{$t('contracts.new.fiscal-year.label')}}
                        <small></small>
                        <br>
                        <strong>{{$t('contracts.new.fiscal-year.sub-label')}}</strong>
                    </label>
                </div>
                <!--<span v-if="$v.entry.fiscalYear.$invalid && $v.entry.fiscalYear.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.administration-period.label')})}}</span>-->

                <!--period-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.period.placeholder')"
                               v-model="entry.period">
                        <label class="fg-label">{{$t('contracts.new.period.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.period.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.period.$invalid && $v.entry.period.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.administration-period.label'})}}</span>-->
                </div>

                <!--contractId-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.period.placeholder')"
                               v-model="entry.contractId">
                        <label class="fg-label">{{$t('contracts.new.contract-id.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.contract-id.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.contract-id.label'})}}</span>-->
                </div>


                <!--partida-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.partida.placeholder')"
                               v-model="entry.partida">
                        <label class="fg-label">{{$t('contracts.new.partida.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.partida.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.partida.label'})}}</span> -->
                </div>


                <!--&lt;!&ndash;ProcedureState&ndash;&gt;-->
                <!--<div class="form-group fg-float basic-select">-->
                    <!--<div class="fg-line">-->
                        <!--<select v-model="entry.procedureState" class="form-control select selectpicker"-->
                                <!--data-live-search="true"-->
                                <!--:data-live-search-placeholder="$t('contracts.new.procedure-state.placeholder')"-->
                                <!--title="Select placeholder">-->
                            <!--<option value="CONCLUDED"> {{$t('contracts.procedure-state.extension')}}</option>-->
                            <!--<option value="CANCELED"> {{$t('contracts.procedure-state.modification')}}</option>-->
                            <!--<option value="DESERTED"> {{$t('contracts.procedure-state.public')}}</option>-->
                            <!--<option value="IN_PROGRESS"> {{$t('contracts.procedure-state.public')}}</option>-->
                        <!--</select>-->
                        <!--<label class="fg-label">{{$t('contracts.new.procedure-state.label')}}</label>-->
                    <!--</div>-->
                <!--</div>-->


                <!--Announcement URL-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.announcementUrl.placeholder')"
                               v-model="entry.announcementUrl">
                        <label clas ="fg-label">{{$t('contracts.new.announcementUrl.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.announcementUrl.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.announcementUrl.label'})}}</span> -->
                </div>


                <!--announcementDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker"
                               :placeholder="$t('contracts.new.announcementDate.placeholder')"
                               v-model="entry.announcementDate">
                        <label class="fg-label">{{$t('contracts.new.announcementDate.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.announcementDate.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.announcementDate.label'})}}</span> -->
                </div>


                <!--Services Description-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.servicesDescription.placeholder')"
                               v-model="entry.servicesDescription">
                        <label class="fg-label">{{$t('contracts.new.servicesDescription.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.servicesDescription.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.servicesDescription.label'})}}</span> -->
                </div>


                <!--clarificationMeetingDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker"
                               :placeholder="$t('contracts.new.clarificationMeetingDate.placeholder')"
                               v-model="entry.clarificationMeetingDate">
                        <label class="fg-label">{{$t('contracts.new.clarificationMeetingDate.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.clarificationMeetingDate.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.clarificationMeetingDate.label'})}}</span> -->
                </div>

                <!--clarificationMeetingJudgmentUrl-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.clarificationMeetingJudgmentUrl.placeholder')"
                               v-model="entry.clarificationMeetingJudgmentUrl">
                        <label class="fg-label">{{$t('contracts.new.clarificationMeetingJudgmentUrl.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.clarificationMeetingJudgmentUrl.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.clarificationMeetingJudgmentUrl.label'})}}</span> -->
                </div>

                <!--presentationProposalsDocUrl-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.presentationProposalsDocUrl.placeholder')"
                               v-model="entry.presentationProposalsDocUrl">
                        <label class="fg-label">{{$t('contracts.new.presentationProposalsDocUrl.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.presentationProposalsDocUrl.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.presentationProposalsDocUrl.label'})}}</span> -->
                </div>

                <!-- Supplier-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.supplier._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.supplier.placeholder')"
                                title="Select placeholder">
                            <option v-for="supplier in suppliers" :value="supplier._id"> {{supplier.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.supplier.label')}}</label>
                    </div>
                </div>

                <!-- Organizer AdministrativeUnit-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.administrativeUnit._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.organizer-administrative-unit.placeholder')"
                                title="Select placeholder">
                            <option v-for="administrativeUnit in administrativeUnits" :value="administrativeUnit._id"> {{administrativeUnit.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.organizer-administrative-unit.label')}}</label>
                    </div>
                </div>

                <!-- Applicant AdministrativeUnit-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.administrativeUnit._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.applicant-administrative-unit.placeholder')"
                                title="Select placeholder">
                            <option v-for="administrativeUnit in administrativeUnits" :value="administrativeUnit._id"> {{administrativeUnit.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.applicant-administrative-unit.label')}}</label>
                    </div>
                </div>


                <!--administrativeUnitType-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.administrativeUnitType" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.administrative-unit-type.placeholder')"
                                title="Select placeholder">
                            <option value="CENTRALIZED"> {{$t('contracts.administrative-unit-type.centralized')}}</option>
                            <option value="DESCENTRALIZED"> {{$t('contracts.administrative-unit-type.descentralized')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.administrative-unit-type.label')}}</label>
                    </div>
                </div>




                <!--contractNumber-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.contract-number.placeholder')"
                               v-model="entry.contractNumber">
                        <label class="fg-label">{{$t('contracts.new.contract-number.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.contract-number.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.contract-number.label'})}}</span> -->
                </div>




                <!--contractDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker"
                               :placeholder="$t('contracts.new.contract-date.placeholder')"
                               v-model="entry.contractDate">
                        <label class="fg-label">{{$t('contracts.new.contract-date.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.contract-date.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.contractDate.label'})}}</span> -->
                </div>


                <!--Contract Date-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.contractType" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.contract-type.placeholder')"
                                title="Select placeholder">
                            <option value="OPEN"> {{$t('contracts.contract-type.open')}}</option>
                            <option value="NORMAL"> {{$t('contracts.contract-type.normal')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.contract-type.label')}}</label>
                    </div>
                </div>



                <!--minAmount-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.min-amount.placeholder')"
                               v-model="entry.minAmount">
                        <label class="fg-label">{{$t('contracts.new.min-amount.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.min-amount.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.min-amount.label'})}}</span> -->
                </div>


                <!--maxAmount-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.max-amount.placeholder')"
                               v-model="entry.maxAmount">
                        <label class="fg-label">{{$t('contracts.new.max-amount.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.max-amount.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.max-amount.label'})}}</span> -->
                </div>


                <!--totalOrMaxAmount-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.total-or-max-amount.placeholder')"
                               v-model="entry.totalOrMaxAmount">
                        <label class="fg-label">{{$t('contracts.new.total-or-max-amount.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.total-or-max-amount.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.total-or-max-amount.label'})}}</span> -->
                </div>


                <!--Contract Url-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.contract-url.placeholder')"
                               v-model="entry.contractUrl">
                        <label class="fg-label">{{$t('contracts.new.contract-url.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.contract-url.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.contract-url.label'})}}</span> -->
                </div>


                <!-- Area in charge -->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.areaInCharge._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :data-live-search-placeholder="$t('contracts.new.organizer-administrative-unit.placeholder')"
                                title="Select placeholder">
                            <option v-for="administrativeUnit in administrativeUnits" :value="administrativeUnit._id"> {{administrativeUnit.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.organizer-administrative-unit.label')}}</label>
                    </div>
                </div>



                <!--updateDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker"
                               :placeholder="$t('contracts.new.update-date.placeholder')"
                               v-model="entry.updateDate">
                        <label class="fg-label">{{$t('contracts.new.update-date.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.update-date.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.update-date.label'})}}</span> -->
                </div>

                <!--Notes -->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.notes.placeholder')"
                               v-model="entry.notes">
                        <label class="fg-label">{{$t('contracts.new.notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.notes.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.notes.label'})}}</span> -->
                </div>

                <!--Notes Karewa-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.karewa-notes.placeholder')"
                               v-model="entry.karewaNotes">
                        <label class="fg-label">{{$t('contracts.new.karewa-notes.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.karewa-notes.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.karewa-notes.label'})}}</span> -->
                </div>


                <!--information Date-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker"
                               :placeholder="$t('contracts.new.information-date.placeholder')"
                               v-model="entry.informationDate">
                        <label class="fg-label">{{$t('contracts.new.information-date.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.information-date.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.information-date.label'})}}</span> -->
                </div>

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" value="" v-model="entry.limitExceeded">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.enabled.checkbox-label')}}</span>
                            <p class="fg-label "> {{$t('users.new.enabled.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                    <span v-if="$v.doc.active.$invalid && $v.doc.active.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Habilitado'})}}</span>
                </div>


                <!--amountExceeded-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.amount-exceeded.placeholder')"
                               v-model="entry.amountExceeded">
                        <label class="fg-label">{{$t('contracts.new.amount-exceeded.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.amount-exceeded.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.amount-exceeded.label'})}}</span> -->
                </div>


                <!--=======================================-->

                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input" placeholder="Introduce el cantidad"
                               v-model="$v.entry.amount.$model">
                        <label class="fg-label">Cantidad
                            <small></small>
                            <br>
                            <strong>Introduce la cantidad</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.amount.$invalid && $v.entry.amount.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Cantidad'})}}</span>-->
                </div>
            </div>
        </modalEntry>

        <ModalDanger :id="'modal-delete-entry'" :title="'Elimaxar Contrato'" :confirm="confirmDeletion">
            <p class="text-centered">Esta acción borrará el usuario del catálogo permanentemente
                <br>
                <strong>¿Estás seguro de eliminarlo?</strong>
            </p>
        </ModalDanger>
        <ModalDefault :title="$t(modalProperties.title)" :store-module="storeModule" :action="modalProperties.action">
            <p class="text-centered">{{$t(modalProperties.message,{ docsUpdatedLength: docsUpdatedLength })}}
                <br/>
                <strong>{{$t(modalProperties.confirmationQuestion)}}</strong>
            </p>
        </ModalDefault>
    </div>
</template>


<style>
</style>

<script>
    import catalog from '@/mixins/catalog.mixin';
    import {bus} from '@/main';
    import {DELETE_SUCCESS, DOC_CREATED, DOC_START_EDIT} from "@/store/events";
    import ModalDanger from "@/components/modals/ModalDanger";
    import ModalDefault from "@/components/modals/ModalDefault";
    import {required} from "vuelidate/lib/validators"
    import {mapGetters, mapState} from 'vuex';
    import ModalEntry from "@/components/catalogs/ModalEntry";

    const storeModule = 'contracts';
    const docName = 'contracts.contract';

    let baseCatalog = catalog.configure({
        storeModule: storeModule,
        docName: docName
    });

    export default {
        mixins: [baseCatalog],
        data() {
            return {
                storeModule: storeModule,
                tableHeaders: [
                    'Proveedor',
                    'Unidad Administrativa',
                    'Monto Total',
                    'Tipo de procedimiento',
                    'general.created-at'],
                tableColumns: [
                    {label: "contracts.supplier", visible: true, field: 'supplier'},
                    {label: "contracts.administrativeUnit", visible: true, field: 'administrativeUnit'},
                    {label: "contracts.amount", visible: true, field: 'amount'},
                    {label: "contracts.procedureType", visible: true, field: 'procedureType'},
                    {label: "general.created-at", visible: true, field: 'created_at', type: 'Date'}
                ],
                entry: {
                    supplier: {},
                    administrativeUnit: undefined,
                    amount: 0.00,
                    procedureType: undefined,
                },
                modalProperties: {
                    title: "general.modal-editable-table.title",
                    message: "general.modal-editable-table.message",
                    confirmationQuestion: "general.modal-editable-table.confirmation-question",
                    action: "saveDocsUpdated"
                },

            }
        },
        validations: {
            entry: {
                supplier: {required},
                administrativeUnit: {required},
                amount: {required},
                procedureType: {required}
            }
        },
        computed: {
            requiredErrorMessage() {
                return 'contracts.validation.required'
            },
            ...mapGetters(storeModule, ['docsUpdatedLength']),
            ...mapState({
                suppliers: state => state[storeModule].suppliers,
                administrativeUnits: state => state[storeModule].administrativeUnits,
            })
        },
        components: {
            ModalDanger,
            ModalDefault,
            ModalEntry
        },
        methods: {
            confirmDeletion() {
                this.deleteElementSelected();
            },
            delayTouch($v) {
                $v.$reset();
                if (touchMap.has($v)) {
                    clearTimeout(touchMap.get($v))
                }
                touchMap.set($v, setTimeout($v.$touch, 1000))
            },
            clearEntry() {
                this.$store.dispatch(`${storeModule}/clearSelectedEntry`);
                this.$v.$reset();
            }
        },
        created() {
            bus.$on(storeModule + DELETE_SUCCESS, (data) => {
                tShow("El contrato fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule + DOC_CREATED, () => {
                this.supplier = "";
                this.administrativeUnit = "";
                this.amount = "";
                this.procedureType = "";
                this.$v.$reset();
                tShow("Elemento Creado!", 'info');
            });
            bus.$on(storeModule + DOC_START_EDIT, (entry) => {
                this.entry.supplier = entry.name;
                this.$v.entry.supplier.$touch();
                this.entry.administrativeUnit = entry.rfc;
                this.$v.entry.administrativeUnit.$touch();
                this.entry.amount = entry.notes;
                this.$v.entry.amount.$touch();
                this.entry.procedureType = entry.notes;
                this.$v.entry.procedureType.$touch();
            });
        },
        mounted() {
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();
                window.$('.selectpicker').selectpicker('refresh');

                $('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker('refresh');

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

                $('.datepicker').datepicker({
                    format: 'mm/dd/yyyy',
                    startDate: '-3d'
                });

            });
        }
        ,
        beforeMount() {
            this.$store.dispatch(`${storeModule}/getSuppliers`);
        }
    }
</script>
