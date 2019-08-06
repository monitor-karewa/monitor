const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');
const mongoose = require('mongoose');
const async = require('async');

const {
    Contract,
    
    procedureTypesEnumDict,
    procedureTypesEnum,
    getProcedureTypesEnumObject,

    categoryEnumDict,
    categoryEnum,
    getCategoryEnumObject,

    procedureStateEnumDict,
    procedureStateEnum,
    getProcedureStateEnumObject,

    administrativeUnitTypeEnumDict,
    administrativeUnitTypeEnum,
    getAdministrativeUnitTypeEnumObject,

    limitExceededEnumDict,
    limitExceededEnum,
    getLimitExceededEnumObject,

    contractTypeEnumDict,
    contractTypeEnum,
    getContractTypeEnumObject,
} = require('./../models/contract.model');
const Supplier = require('./../models/supplier.model').Supplier;
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const Organization = require('./../models/organization.model').Organization;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Contract.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Contract;
    renderParams.permission = Contract.permission;
    res.render('contract', renderParams);
};

/**
 * Consulta los registros de Contract disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);
    paginationOptions.lean = false;


    let query = {};

    let search = req.query.search;
    if (search) {
        let queryAsRegex = utils.toAccentsRegex(search, "gi");

        let orArray = [
            {administrationPeriod: queryAsRegex},
            {fiscalYear: queryAsRegex},
            {period: queryAsRegex},
            {contractId: queryAsRegex},
            {partida: queryAsRegex},
            {announcementUrl: search}, //non-regex for urls
            {servicesDescription: queryAsRegex},
            {clarificationMeetingJudgmentUrl: search}, //non-regex for urls
            {presentationProposalsDocUrl: search}, //non-regex for urls
            {'supplier.name': queryAsRegex},
            {'organizerAdministrativeUnit.name': queryAsRegex},
            {'applicantAdministrativeUnit.name': queryAsRegex},
            {contractNumber: queryAsRegex},
            {contractUrl: search}, //non-regex for urls
            {'areaInCharge': queryAsRegex},
            {notes: queryAsRegex},
            {karewaNotes: queryAsRegex},
        ];


        let procedureTypeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, procedureTypesEnum, procedureTypesEnumDict);
        if (procedureTypeEnumQueryAsRegexStr && procedureTypeEnumQueryAsRegexStr.length) {
            orArray.push(
                {procedureType: new RegExp(procedureTypeEnumQueryAsRegexStr)}
            );
        }

        let categoryEnumQueryAsRegexStr = utils.enumSearchRegexString(search, categoryEnum, categoryEnumDict);
        if (categoryEnumQueryAsRegexStr && categoryEnumQueryAsRegexStr.length) {
            orArray.push(
                {category: new RegExp(categoryEnumQueryAsRegexStr)}
            );
        }

        let procedureStateEnumQueryAsRegexStr = utils.enumSearchRegexString(search, procedureStateEnum, procedureStateEnumDict);
        if (procedureStateEnumQueryAsRegexStr && procedureStateEnumQueryAsRegexStr.length) {
            orArray.push(
                {procedureState: new RegExp(procedureStateEnumQueryAsRegexStr)}
            );
        }

        let administrativeUnitTypeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, administrativeUnitTypeEnum, administrativeUnitTypeEnumDict);
        if (administrativeUnitTypeEnumQueryAsRegexStr && administrativeUnitTypeEnumQueryAsRegexStr.length) {
            orArray.push(
                {administrativeUnitType: new RegExp(administrativeUnitTypeEnumQueryAsRegexStr)}
            );
        }

        let contractTypeTypeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, contractTypeEnum, contractTypeEnumDict);
        if (contractTypeTypeEnumQueryAsRegexStr && contractTypeTypeEnumQueryAsRegexStr.length) {
            orArray.push(
                {contractType: new RegExp(contractTypeTypeEnumQueryAsRegexStr)}
            );
        }

        query = {
            $or: orArray
        }
    }



    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};
    
    let aggregate = Contract.aggregate([]);

    utils.addLookupRefToAggregatePipeline(aggregate, Supplier, 'supplier');
    utils.addLookupRefToAggregatePipeline(aggregate, AdministrativeUnit, 'administrativeUnit');
    utils.addLookupRefToAggregatePipeline(aggregate, AdministrativeUnit, 'organizerAdministrativeUnit');
    // utils.addLookupRefToAggregatePipeline(aggregate, AdministrativeUnit, 'areaInCharge');
    utils.addLookupRefToAggregatePipeline(aggregate, AdministrativeUnit, 'applicantAdministrativeUnit');
    
    aggregate.append({
        "$match": query
    });


    let page = Number(req.query.page) || 1;
    let paginateOptions = {
        page: page,
        limit: 10,
        sortBy: {
            createdAt: -1
        }
    };

    async.parallel({
        mainQuery: function (callback) {
            Contract.aggregatePaginate(aggregate, paginateOptions, (err, docs, pageCount, itemCount) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
                    return callback({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                //To correctly show each enum's value to the user, virtual fields are used
                //To use virtuals, we must transform each doc to a model "instance", but we keep the populated refs

                let docsWithVirtualsAndRefs = [];

                for (let doc of docs) {
                    //Pass through the model to obtain the value for virtual fields
                    let docAsObjWithVirtuals = (new Contract(doc)).toObject();

                    //Keep the populated refs
                    docAsObjWithVirtuals.supplier = doc.supplier;
                    docAsObjWithVirtuals.administrativeUnit = doc.administrativeUnit;
                    docAsObjWithVirtuals.organizerAdministrativeUnit = doc.organizerAdministrativeUnit;
                    docAsObjWithVirtuals.areaInCharge = doc.areaInCharge;
                    docAsObjWithVirtuals.applicantAdministrativeUnit = doc.applicantAdministrativeUnit;

                    docsWithVirtualsAndRefs.push(docAsObjWithVirtuals);
                }

                return callback(null,{
                    errors: false,
                    message: "",
                    data: {
                        docs: docsWithVirtualsAndRefs,
                        page: page,
                        pages: pageCount,
                        total: itemCount
                    }
                });

            })
        },
            lastUpdate: function (callback) {
                Contract.find(
                    {...qByOrganization},
                    {updatedAt: 1},
                    {sort: {"updatedAt": -1}, limit: 1},
                    function (err, result) {
                        if (err) {
                            console.log("err", err);
                            callback(err)
                        } else {
                            callback(null, result)
                        }
                    }
                )
            }
        },
        function (err, results) {
            let json = {...results.mainQuery};
            if (results.lastUpdate && results.lastUpdate.length) {
                json = {...results.mainQuery, lastUpdate: results.lastUpdate[0].updatedAt}
            }
            res.json(json);
        });
    
    //Deprecated query without aggregate (unable to search in populated fields)
    // Contract
    //     .paginate(
    //         query,
    //         {
    //             ...paginationOptions,
    //             populate : [
    //                 'supplier',
    //                 'administrativeUnit ',
    //                 'organizerAdministrativeUnit ',
    //                 'areaInCharge ',
    //                 'applicantAdministrativeUnit '
    //             ]
    //         },
    //         (err, result) => {
    //             if (err) {
    //                 logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
    //                 return res.json({
    //                     errors: true,
    //                     message: res.__('general.error.unexpected-error')
    //                 });
    //             }
    //
    //             return res.json({
    //                 errors: false,
    //                 message: "",
    //                 data: {
    //                     docs: result.docs,
    //                     page: result.page,
    //                     pages: result.pages,
    //                     total: result.total
    //                 }
    //             });
    //         }
    //     );
};


/**
 * Queries the possible suppliers fot this contract
 */
exports.retrieveSuppliers = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let query = {...qNotDeleted, ...qByOrganization};

    Supplier
        .find(
            query,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Suppliers');
                    return res.json({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                return res.json({
                    errors: false,
                    message: "",
                    data: {
                        docs: result,
                    }
                });
            }
        );
};


/**
 * Queries the possible suppliers fot this contract
 */
exports.retrieveAdministrativeUnits = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let query = {...qNotDeleted, ...qByOrganization};

    AdministrativeUnit
        .find(
            query,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'There was an error retrieving the Admiinstrative Units');
                    return res.json({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                return res.json({
                    errors: false,
                    message: "",
                    data: {
                        docs: result,
                    }
                });
            }
        );
};

/**
 * Guarda un Contract. 
 * @param req
 * @param res
 * @param next
 */
exports.save = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let id = req.body._id;
    if (id) {
        //Update
        let qById = {_id: id};
        let qByOrganization = Organization.qByOrganization(req);
        let query = {...qById, ...qByOrganization};

        Contract
            .findOne(query)
            .exec((err, contract) => {
                if (err || !contract) {
                    logger.error(err, req, 'contract.controller#save', 'Error al consultar Contract');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                contract.supplier = mongoose.Types.ObjectId(req.body.supplier._id);
                contract.amount = req.body.amount;
                contract.procedureType = req.body.procedureType;
                contract.category = req.body.category;
                contract.administrationPeriod = req.body.administrationPeriod;
                contract.administrationPeriodFromYear = Contract.parseAdministrationPeriodFromYear(req.body.administrationPeriod);
                contract.administrationPeriodToYear = Contract.parseAdministrationPeriodToYear(req.body.administrationPeriod);
                contract.fiscalYear = req.body.fiscalYear;
                contract.period = req.body.period;
                contract.contractId = req.body.contractId;
                contract.partida = req.body.partida;
                contract.procedureState = req.body.procedureState;
                contract.announcementUrl = req.body.announcementUrl;
                contract.announcementDate = req.body.announcementDate;
                contract.servicesDescription = req.body.servicesDescription;
                contract.clarificationMeetingDate = req.body.clarificationMeetingDate;
                contract.clarificationMeetingJudgmentUrl = req.body.clarificationMeetingJudgmentUrl;
                contract.presentationProposalsDocUrl = req.body.presentationProposalsDocUrl;
                contract.supplier = req.body.supplier;
                contract.organizerAdministrativeUnit = mongoose.Types.ObjectId(req.body.organizerAdministrativeUnit._id);
                contract.applicantAdministrativeUnit = mongoose.Types.ObjectId(req.body.applicantAdministrativeUnit._id);
                contract.administrativeUnitType = req.body.administrativeUnitType;
                contract.contractNumber = req.body.contractNumber;
                contract.contractDate = req.body.contractDate;
                contract.contractType = req.body.contractType;
                contract.totalAmount = req.body.totalAmount;
                contract.minAmount = req.body.minAmount;
                contract.maxAmount = req.body.maxAmount;
                contract.totalOrMaxAmount = req.body.totalOrMaxAmount;
                contract.contractUrl = req.body.contractUrl;
                contract.areaInCharge = req.body.areaInCharge;
                contract.updateDate = req.body.updateDate;
                contract.notes = req.body.notes;
                contract.karewaNotes = req.body.karewaNotes;
                contract.informationDate = req.body.informationDate;
                contract.limitExceeded = req.body.limitExceeded;
                contract.amountExceeded = req.body.amountExceeded;
                contract.isEmpty = req.body.isEmpty;

                                contract.save((err, savedContract) => {
                                    if (err) {
                                        let errors = [];
                                        if(err.code == 11000){
                                            errors.push({message:"El campo Número de contrato debe ser único, se encontro otro registro con el mismo valor."})
                                        }
                                        for(let item in err.errors){
                                            errors.push(err.errors[item]);
                                        }
                                        logger.error(err, req, 'contract.controller#save', 'Error al guardar Contract');
                                        return res.json({
                                            error: true,
                                            message: req.__('general.error.save'),
                                            errors: errors
                                        });
                                    }

                                    return res.json({
                                        error: false,
                                        message: req.__('general.success.updated'),
                                        data: savedContract
                                    });
                                });
                            });

                    } else {
                        //Create

                        let contract = new Contract({
                            organization: Organization.currentOrganizationId(req),
                            amount : req.body.amount,
                            procedureType : req.body.procedureType,
                            category : req.body.category,
                            administrationPeriod : req.body.administrationPeriod,
                            fiscalYear : req.body.fiscalYear,
                            period : req.body.period,
                            contractId : req.body.contractId,
                            partida : req.body.partida,
                            procedureState : req.body.procedureState,
                            announcementUrl : req.body.announcementUrl,
                            announcementDate : req.body.announcementDate,
                            servicesDescription : req.body.servicesDescription,
                            clarificationMeetingDate : req.body.clarificationMeetingDate,
                            clarificationMeetingJudgmentUrl : req.body.clarificationMeetingJudgmentUrl,
                            presentationProposalsDocUrl : req.body.presentationProposalsDocUrl,
                            administrativeUnitType : req.body.administrativeUnitType,
                            contractNumber : req.body.contractNumber,
                            contractDate : req.body.contractDate,
                            contractType : req.body.contractType,
                            totalAmount : req.body.totalAmount,
                            minAmount : req.body.minAmount,
                            maxAmount : req.body.maxAmount,
                            totalOrMaxAmount : req.body.totalOrMaxAmount,
                            contractUrl : req.body.contractUrl,
                            updateDate : req.body.updateDate,
                            notes : req.body.notes,
                            karewaNotes : req.body.karewaNotes,
                            informationDate : req.body.informationDate,
                            limitExceeded : req.body.limitExceeded,
                            amountExceeded : req.body.amountExceeded,
                            supplier :  mongoose.Types.ObjectId(req.body.supplier._id),
                            administrativeUnit :  mongoose.Types.ObjectId(req.body.administrativeUnit._id),
                            organizerAdministrativeUnit :  mongoose.Types.ObjectId(req.body.organizerAdministrativeUnit._id),
                            applicantAdministrativeUnit :  mongoose.Types.ObjectId(req.body.applicantAdministrativeUnit._id),
                            areaInCharge : req.body.areaInCharge,
                            isEmpty : req.body.isEmpty
                        });

                        contract.administrationPeriodFromYear = Contract.parseAdministrationPeriodFromYear(req.body.administrationPeriod);
                        contract.administrationPeriodToYear = Contract.parseAdministrationPeriodToYear(req.body.administrationPeriod);


                        contract.save((err, savedContract) => {
                            if (err) {
                                let errors = [];
                                if(err.code == 11000){
                                    errors.push({message:"El campo Número de contrato debe ser único, se encontro otro registro con el mismo valor."})
                                }
                                for(let item in err.errors){
                                    errors.push(err.errors[item]);
                                }
                                logger.error(err, req, 'contract.controller#save', 'Error al guardar Contract');
                                return res.json({
                                    "error": true,
                                    "message": req.__('general.error.save'),
                                    "errors":errors
                                });
                            }

                            return res.json({
                                "error": false,
                                "message": req.__('general.success.created'),
                                "data": savedContract
                            });
                        });
                    }
                };

                /**
                 * Edita un grupo de Contracts
                 * @param req
                 * @param res
                 * @param next
                 */
exports.saveUpdatedDocs = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log("errors.array()", errors.array());
    //     return res.status(422).json({ errors: errors.array() });
    // }

    let docsUpdated = req.body;

    if(docsUpdated){
        try{
            docsUpdated.forEach((doc) => {
                let qById = {_id: doc._id};
                let qByOrganization = Organization.qByOrganization(req);
                let query = {...qById, ...qByOrganization};
                Contract
                    .findOne(query)
                    .exec((err, contract) => {
                        contract.supplier = doc.supplier;
                        contract.administrativeUnit = doc.administrativeUnit;
                        contract.amount = doc.amount;
                        contract.procedureType = doc.procedureType;

                        contract.save((err) => {
                            logger.error(err, req, 'contract.controller#saveUpdatedDocs', 'Error al actualizar lista de Contract');
                        });

                    });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'contract.controller#saveUpdatedDocs', 'Error al actualizar lista de Contract');
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
        });

    }
};

/**
 * Borra un Contract.
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => {
    //TODO: Implementation

    let query = {};

    query["_id"] = req.body._id;

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};
    
    Contract
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'contract.controller#delete', 'Error al realizar count de Contract');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(err, req, 'contract.controller#delete', 'Error al intentar borrar Contract; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Contract.update(
                query,
                {
                    $set: {
                        deleted: {
                            user: req.user ? req.user._id : null,
                            isDeleted: true,
                            date: new Date()
                        }
                    }
                },
                {multi: false}
            ).exec((err) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#delete', 'Error al borrar Contract.');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.delete')
                    });
                }
                return res.json({
                    error: false,
                    message: req.__('general.success.deleted')
                });
            });
            
            
        });
};