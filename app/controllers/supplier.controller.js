const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Supplier = require('./../models/supplier.model').Supplier;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

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
    
    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

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
 * Guarda un Supplier. 
 * @param req
 * @param res
 * @param next
 */
exports.save = (req, res, next) => {
    console.log("=======================  supplier.controller#save =================");

    console.log("req.body", req.body);
    const errors = validationResult(req);
    console.log("errors.array()", errors.array());
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
            name: req.body.name
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
    //TODO: Implementation

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