const mongoose = require('mongoose');
const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Supplier = require('./../models/supplier.model').Supplier;
const Organization = require('./../models/organization.model').Organization;
const Contract = require('./../models/contract.model').Contract;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

const async = require('async');

const utils = require('./../components/utils');

/**
 * Renderiza la vista principal de consulta de Supplier.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Supplier;
    renderParams.permission = Supplier.permission;
    res.render('supplier', renderParams);
};

/**
 * Consulta los registros de Supplier disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};

    //query["field"] = value;
    let search = req.query.search;
    if(search){
        let queryAsRegex = utils.toAccentsRegex(search, "gi" );
        query = {
            $or : [
                {name : queryAsRegex},
                {rfc : queryAsRegex},
                {notes : queryAsRegex}

            ]
        }
    }


    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};


    async.parallel({
            mainQuery: function (callback) {
                Supplier
                    .paginate(
                        query,
                        paginationOptions,
                        (err, result) => {
                            if (err) {
                                logger.error(err, req, 'supplier.controller#list', 'Error al consultar lista de Supplier');
                                return callback(err, {
                                    errors: true,
                                    message: res.__('general.error.unexpected-error')
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
                    )
            },
            lastUpdate: function (callback) {
                Supplier.find(
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
 * Edita un grupo de Users
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
                Supplier
                  .findOne(query)
                  .exec((err, supplier) => {
                      supplier.name = doc.name;
                      supplier.rfc = doc.rfc;
                      supplier.notes = doc.notes;

                      supplier.save((err) => {
                          if (err) {
                              logger.error(err, req, 'supplier.controller#saveUpdatedDocs', 'Error al actualizar lista de Suppliers');
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
            
            // docsUpdated.forEach((doc) => {
            // });

        } catch(err) {
            logger.error(err, req, 'supplier.controller#saveUpdatedDocs', 'Error al actualizar lista de Suppliers');
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
 * Guarda un Supplier.
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

        Supplier
            .findOne(query)
            .exec((err, supplier) => {
                if (err || !supplier) {
                    logger.error(err, req, 'supplier.controller#save', 'Error al consultar Supplier');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                supplier.name = req.body.name;
                supplier.rfc = req.body.rfc;
                supplier.notes = req.body.notes;

                supplier.save((err, savedSupplier) => {
                    if (err) {
                        logger.error(err, req, 'supplier.controller#save', 'Error al guardar Supplier');
                        if (err.code === 11000) {
                            return res.json({
                                "error": true,
                                "message": req.__('suppliers.error.save')
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
                        data: savedSupplier
                    });
                });
            });

    } else {
        //Create
        let supplier = new Supplier({
            //Update doc fields
            organization: Organization.currentOrganizationId(req),
            name : req.body.name,
            rfc : req.body.rfc,
            notes : req.body.notes
        });

        supplier.save((err, savedSupplier) => {
            if (err) {
                logger.error(err, req, 'supplier.controller#save', 'Error al guardar Supplier');
                if (err.code === 11000) {
                    return res.json({
                        "error": true,
                        "message": req.__('suppliers.error.save')
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
                "data": savedSupplier
            });
        });
    }
};

/**
 * Borra un Supplier.
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => {

    let query = {};

    query["_id"] = req.body._id;

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};

    Supplier
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'supplier.controller#delete', 'Error al realizar count de Supplier');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(err, req, 'supplier.controller#delete', 'Error al intentar borrar Supplier; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }
            
            let usedQuery = {supplier: mongoose.Types.ObjectId(req.body._id), ...qNotDeleted};            
            
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
                
                Supplier.update(
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
                        logger.error(err, req, 'supplier.controller#delete', 'Error al borrar Supplier.');
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
