const mongoose = require('mongoose');
const async = require('async');
const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');

const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const Organization = require('./../models/organization.model').Organization;
const Contract = require('./../models/contract.model').Contract;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de AdministrativeUnit.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = AdministrativeUnit;
    renderParams.permission = AdministrativeUnit.permission;
    res.render('administrativeUnit', renderParams);
};

/**
 * Consulta los registros de AdministrativeUnit disponibles.
 * @param req\
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};

    //query["field"] = value;

    let search = req.query.search;
    if (search) {
        let queryAsRegex = utils.toAccentsRegex(search, "gi" );
        query = {
            $or: [
                {name: queryAsRegex},
                {notes: queryAsRegex}
            ]
        }
    }

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...qByOrganization, ...query, ...qNotDeleted};

    async.parallel({
        mainQuery: function (callback) {
    AdministrativeUnit
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'administrativeUnit.controller#list', 'Error al consultar lista de AdministrativeUnit');
                    return callback({
                        errors: true,
                        message: res.__('general.error.unexpected-error'),
                        err:err
                    });
                }

                return callback(null,{
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
        )},
            lastUpdate: function (callback) {
                AdministrativeUnit.find(
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
};

/**
 * Guarda un AdministrativeUnit.
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

        AdministrativeUnit
            .findOne(query)
            .exec((err, administrativeUnit) => {
                if (err || !administrativeUnit) {
                    logger.error(err, req, 'administrativeUnit.controller#save', 'Error al consultar AdministrativeUnit');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                administrativeUnit.name = req.body.name;
                administrativeUnit.notes = req.body.notes;

                administrativeUnit.save((err, savedAdministrativeUnit) => {
                    if (err) {
                        logger.error(err, req, 'administrativeUnit.controller#save', 'Error al guardar AdministrativeUnit');
                        if (err.code === 11000) {
                            return res.json({
                                "error": true,
                                "message": req.__('administrative-units.error.save')
                            });
                        }
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }

                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedAdministrativeUnit
                    });
                });
            });

    } else {
        //Create

        let administrativeUnit = new AdministrativeUnit({
            organization: Organization.currentOrganizationId(req),
            name: req.body.name,
            notes: req.body.notes
        });

        administrativeUnit.save((err, savedAdministrativeUnit) => {
            if (err) {
                logger.error(err, req, 'administrativeUnit.controller#save', 'Error al guardar AdministrativeUnit');
                if (err.code === 11000) {
                    return res.json({
                        "error": true,
                        "message": req.__('administrative-units.error.save')
                    });
                }
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedAdministrativeUnit
            });
        });
    }
};


/**
 * Edita un grupo de AdministrativeUnits
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

            let errorMessage = null;

            async.each(docsUpdated, (doc, callback) => {
                let qById = {_id: doc._id};
                let qByOrganization = Organization.qByOrganization(req);

                let query = {...qById, ...qByOrganization};
                AdministrativeUnit
                    .findOne(query)
                    .exec((err, administrativeUnit) => {
                        administrativeUnit.name = doc.name;
                        administrativeUnit.notes = doc.notes;

                        administrativeUnit.save((err) => {
                            if (err) {
                                logger.error(err, req, 'administrativeUnit.controller#saveUpdatedDocs', 'Error al actualizar lista de AdministrativeUnit');
                                errorMessage = req.__('general.success.updated-with-errors');
                            }
                            return callback();
                        });

                    });
                
            }, (err, results) => {
                if (errorMessage) {
                    return res.json({
                        error:true,
                        message: errorMessage,
                    });
                }

                return res.json({
                    error:false,
                    message: req.__('general.success.updated'),
                });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'administrativeUnit.controller#saveUpdatedDocs', 'Error al actualizar lista de AdministrativeUnit');
            return res.json({
                error:false,
                message: req.__('general.error.updated')
            });
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
        });

    }
};

/**
 * Borra un AdministrativeUnit.
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

    AdministrativeUnit
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'administrativeUnit.controller#delete', 'Error al realizar count de AdministrativeUnit');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(err, req, 'administrativeUnit.controller#delete', 'Error al intentar borrar AdministrativeUnit; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            let id = mongoose.Types.ObjectId(req.body._id);
            let usedQuery = {...qNotDeleted, $or: [
                {organizerAdministrativeUnit: id},
                {applicantAdministrativeUnit: id},
                {areaInCharge: id},
            ]};

            Contract.find(usedQuery).count().exec((err, countUses) => {
                if (err) {
                    logger.error(err, req, 'supplier.controller#delete', 'Error al buscar Contracts que usen al Supplier.');
                }

                if (countUses) {
                    return res.json({
                        errors: true,
                        message: req.__('general.error.in-use')
                    });
                }
                
                AdministrativeUnit.update(
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
                        logger.error(err, req, 'administrativeUnit.controller#delete', 'Error al borrar AdministrativeUnit.');
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
        });
};
