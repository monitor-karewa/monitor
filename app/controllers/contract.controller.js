const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const Contract = require('./../models/contract.model').Contract;
const Supplier = require('./../models/supplier.model').Supplier;
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
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

    let query = {};
    
    //query["field"] = value;
    
    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    Contract
        .paginate(
            query,
            {
                ...paginationOptions,
                populate : [
                    'supplier',
                    'administrativeUnit ',
                    'organizerAdministrativeUnit ',
                    'areaInCharge ',
                    'applicantAdministrativeUnit '
                ]
            },
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
                    return res.json({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                return res.json({
                    errors: false,
                    message: "",
                    data: {
                        docs: result.docs,
                        page: result.page,
                        pages: result.pages,
                        total: result.total
                    }
                });
            }
        );
};


/**
 * Queries the possible suppliers fot this contract
 */
exports.retrieveSuppliers = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

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

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

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

        Contract
            .findOne(qById)
            .exec((err, contract) => {
                if (err || !contract) {
                    logger.error(req, err, 'contract.controller#save', 'Error al consultar Contract');
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
                contract.areaInCharge = mongoose.Types.ObjectId(req.body.areaInCharge._id);
                contract.updateDate = req.body.updateDate;
                contract.notes = req.body.notes;
                contract.karewaNotes = req.body.karewaNotes;
                contract.informationDate = req.body.informationDate;
                contract.limitExceeded = req.body.limitExceeded;
                contract.amountExceeded = req.body.amountExceeded;

                                contract.save((err, savedContract) => {
                                    if (err) {
                                        logger.error(req, err, 'contract.controller#save', 'Error al guardar Contract');
                                        return res.json({
                                            errors: true,
                                            message: req.__('general.error.save')
                                        });
                                    }

                                    return res.json({
                                        errors: false,
                                        message: req.__('general.success.updated'),
                                        data: savedContract
                                    });
                                });
                            });

                    } else {
                        //Create

                        let contract = new Contract({
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
                            areaInCharge : mongoose.Types.ObjectId(req.body.areaInCharge._id),
                        });


                        contract.save((err, savedContract) => {
                            if (err) {
                                logger.error(req, err, 'contract.controller#save', 'Error al guardar Contract');
                                return res.json({
                                    "error": true,
                                    "message": req.__('general.error.save')
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
                Contract
                    .findOne({_id: doc._id})
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
    query = {...query, ...qNotDeleted};
    
    Contract
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'contract.controller#delete', 'Error al realizar count de Contract');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, 'contract.controller#delete', 'Error al intentar borrar Contract; el registro no existe o ya fue borrado anteriormente');
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
                    logger.error(req, err, 'contract.controller#delete', 'Error al borrar Contract.');
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