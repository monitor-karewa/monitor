const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Supplier = require('./../models/supplier.model').Supplier;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

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
    if(req.query.search){
        let queryAsRegex = utils.toAccentsRegex(req.query.search, "i" );
        query = {
            $or : [
                {name : queryAsRegex},
                {rfc : queryAsRegex},
                {notes : queryAsRegex}

            ]
        }
    }


    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    Supplier
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'supplier.controller#list', 'Error al consultar lista de Supplier');
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
            docsUpdated.forEach((doc) => {
               Supplier
                  .findOne({_id: doc._id})
                  .exec((err, supplier) => {
                      supplier.name = doc.name;
                      supplier.rfc = doc.rfc;
                      supplier.notes = doc.notes;

                      supplier.save((err) => {
                          logger.error(err, req, 'supplier.controller#saveUpdatedDocs', 'Error al actualizar lista de Suppliers');
                      });

                  });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'supplier.controller#saveUpdatedDocs', 'Error al actualizar lista de Suppliers');
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

        Supplier
            .findOne(qById)
            .exec((err, supplier) => {
                if (err || !supplier) {
                    logger.error(req, err, 'supplier.controller#save', 'Error al consultar Supplier');
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
                        logger.error(req, err, 'supplier.controller#save', 'Error al guardar Supplier');
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
            name : req.body.name,
            rfc : req.body.rfc,
            notes : req.body.notes
        });

        supplier.save((err, savedSupplier) => {
            if (err) {
                logger.error(req, err, 'supplier.controller#save', 'Error al guardar Supplier');
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
    query = {...query, ...qNotDeleted};

    Supplier
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'supplier.controller#delete', 'Error al realizar count de Supplier');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(req, err, 'supplier.controller#delete', 'Error al intentar borrar Supplier; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
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
                    logger.error(req, err, 'supplier.controller#delete', 'Error al borrar Supplier.');
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
