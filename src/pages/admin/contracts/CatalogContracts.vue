<template>
    <div class="contract-section">
        <AdminMainSection :storeModule="storeModule">
            <BackButton/>
            <CatalogHeader :singular="'Contrato'" :plural="'Contratos'" :store-module="storeModule"/>
            <EditableTable
                    :docs="docs"
                    :tableHeaders="tableHeaders"
                    :tableColumns="tableColumns"
                    :store-module="storeModule"
                    :singular="'Contrato'" :plural="'Contratos'" :hideEditButton="true"
            />
        </AdminMainSection>

        <modalEntry v-bind:storeModule="storeModule" :validator="$v" :entry="entry">
            <div>


                <div class="checkbox m-b-20">
                    <input type="checkbox" value="IS_EMPTY" v-model="$v.entry.isEmpty.$model">
                    <i class="input-helper"></i>
                    <span>No se llevaron a cabo procedimientos</span>
                </div>


                <!--Procedure Type-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.procedureType" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.procedure-type.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option value="PUBLIC"> {{$t('contracts.procedure-type.public')}}</option>
                            <option value="NO_BID">{{$t('contracts.procedure-type.no-bid')}}</option>
                            <option value="INVITATION"> {{$t('contracts.procedure-type.invitation')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.procedure-type.label')}}</label>
                    </div>
                    <span v-if="$v.entry.procedureType.$invalid  && $v.entry.procedureType.$dirty && !$v.entry.procedureType.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.procedure-type.label')})}}</span>
                </div>

                <!--Category-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.category" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.category.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option value="EXTENSION"> {{$t('contracts.procedure-type.extension')}}</option>
                            <option value="MODIFICATION"> {{$t('contracts.procedure-type.modification')}}</option>
                            <option value="ADENDUM"> {{$t('contracts.procedure-type.adendum')}}</option>
                            <option value="ACQUISITION"> {{$t('contracts.procedure-type.adquisition')}}</option>
                            <option value="SERVICES"> {{$t('contracts.procedure-type.services')}}</option>
                            <option value="LEASE"> {{$t('contracts.procedure-type.lease')}}</option>
                            <option value="PUBLIC_WORKS"> {{$t('contracts.procedure-type.public-works')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.category.label')}}</label>
                    </div>
                    <span v-if="$v.entry.category.$invalid  && $v.entry.category.$dirty && !$v.entry.category.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.category.label')})}}</span>
                </div>

                <!--administrationPeriod-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.administration-period.placeholder')"
                               v-model="entry.administrationPeriod"
                               @input="delayTouch($v.entry.administrationPeriod)">
                        <label class="fg-label">{{$t('contracts.new.administration-period.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.administration-period.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.administrationPeriod.$invalid  && $v.entry.administrationPeriod.$dirty && !$v.entry.administrationPeriod.validAdministrationPeriod"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.administration-period.label'), example:'2017-2019' })}}</span>
                    <span v-if="$v.entry.administrationPeriod.$invalid  && $v.entry.administrationPeriod.$dirty && !$v.entry.administrationPeriod.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.administration-period.label')})}}</span>
                </div>

                <!--fiscal year-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.fiscal-year.placeholder')"
                               v-model="entry.fiscalYear"
                               @input="delayTouch($v.entry.fiscalYear)"
                        >
                        <label class="fg-label">{{$t('contracts.new.fiscal-year.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.fiscal-year.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.fiscalYear.$invalid && $v.entry.fiscalYear.$dirty && !$v.entry.fiscalYear.validFiscalYear" class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.fiscal-year.label'), example:'2019'})}}</span>
                    <span v-if="$v.entry.fiscalYear.$invalid  && $v.entry.fiscalYear.$dirty && !$v.entry.fiscalYear.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.fiscal-year.label')})}}</span>
                </div>

                <!--period-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.period.placeholder')"
                               v-model="entry.period"
                                @input="delayTouch($v.entry.period)"
                        >
                        <label class="fg-label">{{$t('contracts.new.period.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.period.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.period.$invalid && $v.entry.period.$dirty  && !$v.entry.period.validPeriod"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.period.label'), example:"1o 2019"})}}</span>
                    <span v-if="$v.entry.period.$invalid  && $v.entry.period.$dirty && !$v.entry.period.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.period.label')})}}</span>
                </div>

                <!--contractId-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.contract-id.placeholder')"
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
                          class="c-error">{{$t(requiredErrorMessage, {field:'ccontracts.new.organizer-administrative-unit.placeholderontracts.new.partida.label'})}}</span> -->
                </div>


                <!--ProcedureState-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.procedureState" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.procedure-state.placeholder')"
                                data-live-search-placeholder="Select Realiza una búsqueda..">
                            <option value="CONCLUDED"> {{$t('contracts.procedure-state.concluded')}}</option>
                            <option value="CANCELED"> {{$t('contracts.procedure-state.canceled')}}</option>
                            <option value="DESERTED"> {{$t('contracts.procedure-state.deserted')}}</option>
                            <option value="IN_PROGRESS"> {{$t('contracts.procedure-state.in-progress')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.procedure-state.label')}}</label>
                    </div>
                </div>


                <!--Announcement URL-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.announcementUrl.placeholder')"
                               v-model="entry.announcementUrl" @input="delayTouch($v.entry.announcementUrl)">
                        <label class="fg-label">{{$t('contracts.new.announcementUrl.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.announcementUrl.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.announcementUrl.$invalid && $v.entry.announcementUrl.$dirty && !$v.entry.announcementUrl.validAnnouncementUrl"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.announcementUrl.label'), example:"http://www.ejemplo.com"})}}</span>
                </div>


                <!--announcementDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker" id="announcementDate"
                               :placeholder="$t('contracts.new.announcementDate.convocatoria.placeholder')"
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
                    <span v-if="$v.entry.servicesDescription.$invalid  && $v.entry.servicesDescription.$dirty && !$v.entry.servicesDescription.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.servicesDescription.label')})}}</span>
                </div>


                <!--clarificationMeetingDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker" id="clarificationMeetingDate"
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
                               v-model="entry.clarificationMeetingJudgmentUrl" @input="delayTouch($v.entry.clarificationMeetingJudgmentUrl)">
                        <label class="fg-label">{{$t('contracts.new.clarificationMeetingJudgmentUrl.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.clarificationMeetingJudgmentUrl.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.clarificationMeetingJudgmentUrl.$invalid && $v.entry.clarificationMeetingJudgmentUrl.$dirty && !$v.entry.clarificationMeetingJudgmentUrl.validClarificationMeetingJudgmentUrl"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.clarificationMeetingJudgmentUrl.label'), example:"http://www.ejemplo.com"})}}</span>
                </div>

                <!--presentationProposalsDocUrl-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.presentationProposalsDocUrl.placeholder')"
                               v-model="entry.presentationProposalsDocUrl" @input="delayTouch($v.entry.presentationProposalsDocUrl)">
                        <label class="fg-label">{{$t('contracts.new.presentationProposalsDocUrl.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.presentationProposalsDocUrl.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.presentationProposalsDocUrl.$invalid && $v.entry.presentationProposalsDocUrl.$dirty && !$v.entry.presentationProposalsDocUrl.validPresentationProposalsDocUrl"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.presentationProposalsDocUrl.label'), example:"http://www.ejemplo.com"})}}</span>
                </div>

                <!-- Supplier-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.supplier._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.supplier.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option v-for="supplier in suppliers" :value="supplier._id"> {{supplier.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.supplier.label')}}</label>
                    </div>
                    <span v-if="$v.entry.supplier.$invalid  && $v.entry.supplier.$dirty && !$v.entry.supplier.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.supplier.label')})}}</span>
                </div>

                <!-- Organizer AdministrativeUnit-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.organizerAdministrativeUnit._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.organizer-administrative-unit.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option v-for="administrativeUnit in administrativeUnits" :value="administrativeUnit._id"> {{administrativeUnit.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.organizer-administrative-unit.label')}}</label>
                    </div>
                    <span v-if="$v.entry.organizerAdministrativeUnit.$invalid  && $v.entry.organizerAdministrativeUnit.$dirty && !$v.entry.organizerAdministrativeUnit.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.organizer-administrative-unit.label')})}}</span>
                </div>

                <!-- Applicant AdministrativeUnit-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.applicantAdministrativeUnit._id" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.applicant-administrative-unit.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option v-for="administrativeUnit in administrativeUnits" :value="administrativeUnit._id"> {{administrativeUnit.name}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.applicant-administrative-unit.label')}}</label>
                    </div>
                    <span v-if="$v.entry.applicantAdministrativeUnit.$invalid  && $v.entry.applicantAdministrativeUnit.$dirty && !$v.entry.applicantAdministrativeUnit.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.applicant-administrative-unit.label')})}}</span>
                </div>


                <!--administrativeUnitType-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.administrativeUnitType" class="form-control select selectpicker"
                                data-live-search="true"
                                :title="$t('contracts.new.administrative-unit-type.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option value="CENTRALIZED"> {{$t('contracts.administrative-unit-type.centralized')}}</option>
                            <option value="DESCENTRALIZED"> {{$t('contracts.administrative-unit-type.descentralized')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.administrative-unit-type.label')}}</label>
                    </div>
                    <span v-if="$v.entry.administrativeUnitType.$invalid  && $v.entry.administrativeUnitType.$dirty && !$v.entry.administrativeUnitType.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.administrative-unit-type.label')})}}</span>
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
                        <input type="text" class="form-control fg-input datepicker" date="contractDate" id="contractDate"
                               :placeholder="$t('contracts.new.contract-date.placeholder')"
                               v-model="entry.contractDate">
                        <label class="fg-label">{{$t('contracts.new.contract-date.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.contract-date.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.contractDate.$invalid  && $v.entry.contractDate.$dirty && !$v.entry.contractDate.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.contract-date.label')})}}</span>
                </div>


                <!--Contract Date-->
                <div class="form-group fg-float basic-select">
                    <div class="fg-line">
                        <select v-model="entry.contractType" class="form-control select selectpicker" id="contractType"
                                data-live-search="true"
                                :title="$t('contracts.new.contract-type.placeholder')"
                                data-live-search-placeholder="Realiza una búsqueda..">
                            <option value="OPEN"> {{$t('contracts.contract-type.open')}}</option>
                            <option value="NORMAL"> {{$t('contracts.contract-type.normal')}}</option>
                        </select>
                        <label class="fg-label">{{$t('contracts.new.contract-type.label')}}</label>
                    </div>
                    <span v-if="$v.entry.contractType.$invalid  && $v.entry.contractType.$dirty && !$v.entry.contractType.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.contract-type.label')})}}</span>
                </div>

                <!--totalAmount-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.total-amount.placeholder')"
                               v-model="entry.totalAmount">
                        <label class="fg-label">{{$t('contracts.new.total-amount.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.total-amount.sub-label')}}</strong>
                        </label>
                    </div>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.min-amount.label'})}}</span> -->
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
                    <span v-if="$v.entry.totalOrMaxAmount.$invalid  && $v.entry.totalOrMaxAmount.$dirty && !$v.entry.totalOrMaxAmount.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.total-or-max-amount.label')})}}</span>
                </div>


                <!--Contract Url-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.contract-url.placeholder')"
                               v-model="entry.contractUrl" @input="delayTouch($v.entry.contractUrl)">
                        <label class="fg-label">{{$t('contracts.new.contract-url.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.contract-url.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.contractUrl.$invalid && $v.entry.contractUrl.$dirty && !$v.entry.contractUrl.validContractUrl"
                          class="c-error">{{$t(regExpErrorMessage, {field:$t('contracts.new.contract-url.label'), example:"http://www.ejemplo.com"})}}</span>
                </div>



                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input"
                               :placeholder="$t('contracts.new.responsible-administrative-unit.placeholder')"
                               v-model="entry.areaInCharge">
                        <label class="fg-label">{{$t('contracts.new.responsible-administrative-unit.label')}}
                            <small></small>
                            <br>
                            <!--<strong>{{$t('contracts.new.notes.sub-label')}}</strong>-->
                        </label>
                    </div>
                    <span v-if="$v.entry.areaInCharge.$invalid  && $v.entry.areaInCharge.$dirty && !$v.entry.areaInCharge.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.responsible-administrative-unit.label')})}}</span>
                </div>



                <!--updateDate-->
                <div class="form-group fg-float subtitle">
                    <div class="fg-line basic-input">
                        <input type="text" class="form-control fg-input datepicker" id="updateDate"
                               :placeholder="$t('contracts.new.update-date.placeholder')"
                               v-model="entry.updateDate">
                        <label class="fg-label">{{$t('contracts.new.update-date.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.update-date.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.updateDate.$invalid  && $v.entry.updateDate.$dirty && !$v.entry.updateDate.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.update-date.label')})}}</span>
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
                        <input type="text" class="form-control fg-input datepicker" id="informationDate"
                               :placeholder="$t('contracts.new.information-date.placeholder')"
                               v-model="entry.informationDate">
                        <label class="fg-label">{{$t('contracts.new.information-date.label')}}
                            <small></small>
                            <br>
                            <strong>{{$t('contracts.new.information-date.sub-label')}}</strong>
                        </label>
                    </div>
                    <span v-if="$v.entry.informationDate.$invalid  && $v.entry.informationDate.$dirty && !$v.entry.informationDate.required"
                          class="c-error">{{$t(requiredErrorMessage, {field:$t('contracts.new.information-date.label')})}}</span>
                    <!--<span v-if="$v.entry.contractId.$invalid && $v.entry.contractId.$dirty"
                          class="c-error">{{$t(requiredErrorMessage, {field:'contracts.new.information-date.label'})}}</span> -->
                </div>

                <div class="form-group fg-float subtitle" v-show="entry.procedureType === 'NO_BID'">
                    <div class="fg-line basic-input">
                        <div class="checkbox">
                            <input type="checkbox" v-model="entry.limitExceeded">
                            <i class="input-helper"></i>
                            <span>{{$t('users.new.limit-exceeded.checkbox-label')}}</span>
                            <p class="fg-label "> {{$t('users.new.limit-exceeded.label')}}
                                <small></small>
                                <br>
                            </p>
                        </div>
                    </div>
                    <span v-if="entry.limitExceeded.$invalid && entry.limitExceeded.$dirty" class="c-error">{{$t(requiredErrorMessage, {field:'Límite excedido'})}}</span>
                </div>


                <!--amountExceeded-->
                <div class="form-group fg-float subtitle" v-show="entry.procedureType === 'NO_BID'">
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

            </div>
            <div class="modal-footer aditional-text" slot="footer">
                <div v-if="formErrors && formErrors.length">
                    <p class="c-error" v-for="error in formErrors">{{error.message}}</p>
                </div>
                <button type="button" class="btn-stroke button-info_text" data-dismiss="modal"> Cancelar </button>
                <button type="submit"  class="btn-raised button-accent m-l-15" > Guardar </button>
            </div>
        </modalEntry>

        <ModalDanger :id="'modal-delete-entry'" :title="'Eliminar Contrato'" :confirm="confirmDeletion">
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
    import {DELETE_SUCCESS, DOC_CREATED, DOC_START_EDIT, DOC_UPDATED} from "@/store/events";
    import ModalDanger from "@/components/modals/ModalDanger";
    import ModalDefault from "@/components/modals/ModalDefault";
    import {requiredIf , required, minLength, maxLength } from 'vuelidate/lib/validators';
    import {mapGetters, mapState} from 'vuex';
    import ModalEntry from "@/components/catalogs/ModalEntry";

    const storeModule = 'contracts';
    const docName = 'contracts.contract';
    const touchMap = new WeakMap();
    const urlRegExp = new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})");

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
                    {label: "contracts.supplier", visible: true, field: 'supplier.name'},
                    {label: "contracts.category", visible: true, field: 'categoryEnumObject.description'},
                    {label: "contracts.procedureType", visible: true, field: 'procedureTypeEnumObject.description'},
                    {label: "contracts.administrationPeriod", visible: true, field: 'administrationPeriod'},
                    {label: "contracts.fiscalYear", visible: true, field: 'fiscalYear'},
                    {label: "contracts.period", visible: true, field: 'period'},
                    {label: "contracts.contractId ", visible: true, field: 'contractId'},
                    {label: "contracts.partida", visible: true, field: 'partida'},
                    {label: "contracts.procedureState", visible: true, field: 'procedureStateEnumObject.description'},
                    {label: "contracts.announcementUrl", visible: true, field: 'announcementUrl'},
                    {label: "contracts.announcementDate", visible: true, field: 'announcementDate', type: 'date'},
                    {label: "contracts.servicesDescription", visible: true, field: 'servicesDescription'},
                    {label: "contracts.clarificationMeetingDate", visible: true, field: 'clarificationMeetingDate', type: 'date'},
                    {label: "contracts.clarificationMeetingJudgmentUrl", visible: true, field: 'clarificationMeetingJudgmentUrl'},
                    {label: "contracts.presentationProposalsDocUrl", visible: true, field: 'presentationProposalsDocUrl'},
                    {label: "contracts.organizerAdministrativeUnit", visible: true, field: 'organizerAdministrativeUnit.name'},
                    {label: "contracts.applicantAdministrativeUnit", visible: true, field: 'applicantAdministrativeUnit.name'},
                    {label: "contracts.administrativeUnitType", visible: true, field: 'administrativeUnitTypeEnumObject.description'},
                    {label: "contracts.contractNumber", visible: true, field: 'contractNumber'},
                    {label: "contracts.contractDate", visible: true, field: 'contractDate', type: 'date'},
                    {label: "contracts.contractType", visible: true, field: 'contractTypeEnumObject.description'},
                    {label: "contracts.totalAmount", visible: true, field: 'totalAmount', type: 'currency'},
                    {label: "contracts.minAmount", visible: true, field: 'minAmount', type: 'currency'},
                    {label: "contracts.maxAmount", visible: true, field: 'maxAmount', type: 'currency'},
                    {label: "contracts.totalOrMaxAmount", visible: true, field: 'totalOrMaxAmount', type: 'currency'},
                    {label: "contracts.contractUrl", visible: true, field: 'contractUrl'},
                    {label: "contracts.areaInCharge", visible: true, field: 'areaInCharge'},
                    {label: "contracts.updateDate", visible: true, field: 'updateDate', type: 'date'},
                    {label: "contracts.isEmpty", visible: true, field: 'isEmpty', type: 'boolean'},

                    {label: "general.created-at", visible: false, field: 'createdAt', type: 'date'}
                ],
                entry: {
                    supplier: {},
                    administrativeUnit: {},
                    procedureType: "",
                                        /* Materia */
                    category: "",
                    /* Administracion */
                    administrationPeriod: "",
                    fiscalYear: "",
                    period: "",
                    contractId : "",
                    partida: "",
                    procedureState: undefined,
                    announcementUrl: "",
                    announcementDate:  "",
                    servicesDescription: "",
                    clarificationMeetingDate: "",
                    clarificationMeetingJudgmentUrl: "",
                    presentationProposalsDocUrl: "",
                    organizerAdministrativeUnit: {},
                    applicantAdministrativeUnit: {},
                    administrativeUnitType: {},
                    contractNumber: "",
                    contractDate: "",
                    contractType: "",
                    totalAmount: 0,
                    minAmount: 0,
                    maxAmount: 0,
                    totalOrMaxAmount: "",
                    contractUrl: "",
                    areaInCharge: "",
                    updateDate: "",
                    notes : "",
                    karewaNotes: "",
                    informationDate: "",
                    limitExceeded: false,
                    amountExceeded: 0,
                    isEmpty: false
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
                isEmpty: {},
                procedureType:{
                  required
                },
                category:{
                  required
                },
                administrationPeriod: {
                    required,
                    validAdministrationPeriod: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return (/^[12][0-9]{3}-[12][0-9]{3}$/).test(value)
                    }
                },
                fiscalYear: {
                    required,
                    validFiscalYear: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return (/^[12][0-9]{3}$/).test(value)

                    }
                },
                period: {
                    required,
                    validPeriod: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return (/^[1234]o\s2[0-9]{3}$/).test(value)

                    }
                },
                announcementUrl: {
                    validAnnouncementUrl: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return urlRegExp.test(value)
                    }
                },
                clarificationMeetingJudgmentUrl: {
                    validClarificationMeetingJudgmentUrl: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return urlRegExp.test(value)
                    }
                },
                presentationProposalsDocUrl: {
                    validPresentationProposalsDocUrl: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return urlRegExp.test(value)
                    }
                },
                contractUrl: {
                    validContractUrl: (value) => {
                        if (value == null || value == undefined || value == "") {
                            return true
                        }
                        return urlRegExp.test(value)
                    }
                },

                servicesDescription:{
                    required: requiredIf(function(form){
                        return !this.entry.isEmpty
                    })
                },
//                supplier:{
//                    required
//                },
                organizerAdministrativeUnit:{
                    required
                },
                applicantAdministrativeUnit:{
                    required
                },
                administrativeUnitType:{
                    required: requiredIf(function(form){
                        return !this.entry.isEmpty
                    })
                },
                contractType:{
                    required: requiredIf(function(form){
                        return !this.entry.isEmpty
                    })
                },
                contractDate:{
                    required: requiredIf(function(form){
                        return !this.entry.isEmpty
                    })
                },
                totalOrMaxAmount:{
                    required: requiredIf(function(form){
                        return !this.entry.isEmpty
                    })
                },
                areaInCharge:{
                    required
                },
//                updateDate:{
//                    required
//                },
//                informationDate:{
//                    required
//                },


//                 procedureType: {
//                     required
//                 },
                /* Materia */
//                 category: {
//                     required
//                 },
                /* Administracion */
//                 administrationPeriod: {
                //     required,
                //     minLength: minLength(2),
                //     maxLength: maxLength(100)
//                 },
                /* Ejercicio */
//                 fiscalYear: {
                //     required
//                 },
                /* Periodo que se reporta */
//                 period: {
                //     required
                //     //TODO Regex validation
                //     // match:new RegExp("^[1234]o\\s2[0-9]{3}$")
//                 },
                /* ID / Número de Folio o Nomenclatura / Identificador */
                 contractId:{
                //     required
                 },
                /* Partida */
                 partida: {
                 },
                /* Estado del procedimiento */
                 procedureState: {
                //     required
                 },
                /*Hipervínculo a la convocatoria o invitaciones*/
//                 announcementUrl:{
//                 },
                /* Fecha de la convocatoria o invitación */
                 announcementDate:{
                 },
                /* Descripción de las obras, bienes o servicios */
//                 servicesDescription:{
                //     required
//                 },
                /* Fecha en la que se celebró la junta de aclaraciones */
                 clarificationMeetingDate:{
                 },
                /* Hipervínculo al fallo de Junta de Aclaraciones */
//                 clarificationMeetingJudgmentUrl:{
//                 },
                /* Hipervínculo al documento de la Presentación de Propuestas */
//                 presentationProposalsDocUrl:{
//                 },
                /* Proveedor */
                 supplier: {
                //     required
                 },
                /* Unidad administrativa convocante */
//                 organizerAdministrativeUnit: {
                //     //TODO Learn how to do dynamic validations
                //     // validator: function(){
                //     //     return this.administrativeUnitType === 'DESCENTRALIZADA' ? this.organizerAdministrativeUnit == this.applicantAdministrativeUnit : true
                //     // }
//                 },
                // /* Unidad administrativa solicitante */
//                 applicantAdministrativeUnit: {
                //     required
//                 },
                // /* Centralizada/Descentralizada */
//                 administrativeUnitType:{
                //     required
//                 },
                // /* Número que identifique al contrato */
                 contractNumber:{
                     required: requiredIf(function(form){
                         return !this.entry.isEmpty
                     })
                 },
                /* Fecha del contrato */
//                 contractDate:{
                //     required
                    //TODO Learn how to do dynamic validations
                    // validator: function(){
                    //     let yearContractDate = new Date(this.contractDate).getFullYear();
                    //     let fiscalYear = Number(this.fiscalYear);
                    //     return yearContractDate === fiscalYear;
                    // }
//                 },
                /* Tipo de Contrato */
//                 contractType:{
                //     required
//                 },
                /* Monto total del contrato con impuestos incluidos */
                 totalAmount:{
                 },
                /* Monto mínimo, en su caso */
                 minAmount:{
                 },
                /* Monto máximo, en su caso */
                 maxAmount:{
                 },

                /* Monto total o Monto máximo, en su caso */
//                 totalOrMaxAmount:{
                //     required
                    // Si es NORMAL - es el monto total
                    // Si es ABIERTO - es el monto máximo
//                 },
                /*Hipervínculo al documento del contrato y anexos*/
//                 contractUrl:{
//                 },
                /*Área responsable de la información*/
//                 areaInCharge:{
                //     required
//                 },
                /*Fecha de actualización*/
                 updateDate:{
                //     required
                 },
                /*Notas*/
                 notes:{
                 },
                /*Notas Karewa*/
                 karewaNotes:{
                 },
                /*Fecha de obtención de los datos*/
                 informationDate:{
                //     required
                 },
                /*Adjudicaciones Directas que exceden el límite*/
                 limitExceeded:{
                 },
                /*Monto que excede el límite de la Adjudicación Directa*/
                 amountExceeded:{
                 }
            }
        },
        computed: {
            requiredErrorMessage() {
                return 'contracts.validation.required'
            },
            regExpErrorMessage(){
                return 'contracts.validation.regex.message';
            },
            ...mapGetters(storeModule, ['docsUpdatedLength','formErrors']),
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
//                this.$store.dispatch (`${storeModule}/clearSelectedEntry`);
                this.$v.$reset();
            },
            initAllBusEvents(){
                let busDelete = bus._events[storeModule + DELETE_SUCCESS];
                let busCreate = bus._events[storeModule + DOC_CREATED];
                let busUpdate = bus._events[storeModule + DOC_UPDATED];

                busDelete.splice(1, busDelete.length - 1);
                busCreate.splice(1, busCreate.length - 1);
                busUpdate.splice(1, busUpdate.length - 1);
            }
        },
        created() {
            bus.$on(storeModule + DELETE_SUCCESS, (data) => {
                tShow("El contrato fue eliminado correctamente", 'info');
            });
            bus.$on(storeModule + DOC_CREATED, () => {
                // this.administrationPeriod = "";
                $('#ModalEntry').modal('hide');
                this.$store.dispatch (`${storeModule}/clearFormErrors`);
                this.$v.$reset();
                tShow("Elemento Creado!", 'info');
            });
            bus.$on(storeModule + DOC_UPDATED, () => {
                $('#ModalEntry').modal('hide');
                this.$store.dispatch (`${storeModule}/clearFormErrors`);
                this.$v.$reset();
                tShow("Elemento Actualizado!", 'info');
            });
            bus.$on(storeModule + DOC_START_EDIT, (entry) => {
                    this.clearEntry();
                    this.entry._id = entry._id;
                    this.entry.supplier = {...entry.supplier};
//                    this.entry.supplier.name = entry.supplier.name;
                    this.entry.administrativeUnit = entry.administrativeUnit;
                    this.entry.procedureType = entry.procedureType;
                    this.entry.category = entry.category;
                    this.entry.administrationPeriod = entry.administrationPeriod;
                    this.entry.fiscalYear = entry.fiscalYear;
                    this.entry.period = entry.period;
                    this.entry.contractId  = entry.contractId;
                    this.entry.partida = entry.partida;
                    this.entry.procedureState = entry.procedureState;
                    this.entry.announcementUrl = entry.announcementUrl;
                    this.entry.announcementDate = entry.announcementDate;
                    this.entry.servicesDescription = entry.servicesDescription;
                    this.entry.clarificationMeetingDate = entry.clarificationMeetingDate;
                    this.entry.clarificationMeetingJudgmentUrl = entry.clarificationMeetingJudgmentUrl;
                    this.entry.presentationProposalsDocUrl = entry.presentationProposalsDocUrl;
                    this.entry.organizerAdministrativeUnit = {...entry.organizerAdministrativeUnit};
                    this.entry.applicantAdministrativeUnit = {...entry.applicantAdministrativeUnit};
                    this.entry.administrativeUnitType = entry.administrativeUnitType;
                    this.entry.contractNumber = entry.contractNumber;
                    this.entry.contractDate = entry.contractDate;
                    this.entry.contractType = entry.contractType;
                    this.entry.totalAmount = entry.totalAmount;
                    this.entry.minAmount = entry.minAmount;
                    this.entry.maxAmount = entry.maxAmount;
                    this.entry.totalOrMaxAmount = entry.totalOrMaxAmount;
                    this.entry.contractUrl = entry.contractUrl;
                    this.entry.areaInCharge = entry.areaInCharge;
                    this.entry.updateDate = entry.updateDate;
                    this.entry.notes  = entry.notes;
                    this.entry.karewaNotes = entry.karewaNotes;
                    this.entry.informationDate = entry.informationDate;
                    this.entry.limitExceeded = entry.limitExceeded;
                    this.entry.amountExceeded = entry.amountExceeded;
                    this.entry.isEmpty= entry.isEmpty;
                    // this.$nextTick(function () {
                    //     $('.selectpicker').selectpicker('refresh');
                    // })

                    //Update date through the datepicker API to avoid showing hours, minutes, seconds, timezone, etc.
                    this.$nextTick(() => {
                        if (entry.announcementDate) {
                            $('#announcementDate').datepicker('update', new Date(entry.announcementDate));
                        }
                        if (entry.clarificationMeetingDate) {
                            $('#clarificationMeetingDate').datepicker('update', new Date(entry.clarificationMeetingDate));
                        }
                        if (entry.contractDate) {
                            $('#contractDate').datepicker('update', new Date(entry.contractDate));
                        }
                        if (entry.updateDate) {
                            $('#updateDate').datepicker('update', new Date(entry.updateDate));
                        }
                        if (entry.informationDate) {
                            $('#informationDate').datepicker('update', new Date(entry.informationDate));
                        }
                    });

            });
        },
        mounted() {
            this.initAllBusEvents();
            window.$(document).ready(function () {

                window.$.fn.datepicker.dates['es-MX'] = {
                    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                    daysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
                    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
                    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                    today: "Hoy",
                    clear: "Limpiar",
                    format: "dd/mm/yyyy",
                    titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
                    weekStart: 0
                };
                
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
                    tShow("Se ha completado el proceso correctamente", 'success');
                });

                $('.datepicker').datepicker({
                    format: 'dd/mm/yyyy',
                    autoclose: true,
                    language: 'es-MX',
                });

            });

            $('.datepicker').on('changeDate',  (event) => {
                this.entry[event.target.id] = event.date;
                this.$nextTick(() => {
                    $('#' + event.target.id).datepicker('update', event.date);
                });
            });

        }
        ,
        beforeMount() {
            this.$store.dispatch(`${storeModule}/getSuppliers`);
            this.$store.dispatch(`${storeModule}/getAdministrativeUnits`);
        }
    }
</script>
