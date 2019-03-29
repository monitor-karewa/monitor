const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Proveedor = require('./../models/proveedor.model').Proveedor;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Proveedor.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Proveedor;
    renderParams.permission = Proveedor.permission;
    res.render('proveedor', renderParams);
};

/**
 * Consulta los registros de Proveedor disponibles.
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

    Proveedor
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'proveedor.controller#list', 'Error al consultar lista de Proveedor');
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
 * Guarda un Proveedor. 
 * @param req
 * @param res
 * @param next
 */
exports.save = (req, res, next) => {
    let id = req.body._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    if (id) {
        //Update
        let qById = {_id: id};

        Proveedor
            .findOne(qById)
            .exec((err, proveedor) => {
                if (err || !proveedor) {
                    logger.error(req, err, 'proveedor.controller#save', 'Error al consultar Proveedor');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                proveedor.nombre = req.body.nombre;
                proveedor.rfc = req.body.rfc;
                proveedor.notas =  req.body.notas;
                
                proveedor.save((err, savedProveedor) => {
                    if (err) {
                        logger.error(req, err, 'proveedor.controller#save', 'Error al guardar Proveedor');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedProveedor
                    });
                });
            });
        
    } else {
        //Create

        let proveedor = new Proveedor({
            nombre: req.body.nombre,
            rfc: req.body.rfc,
            notas: req.body.notas
        });

        proveedor.save((err, savedProveedor) => {

            if (err) {
                logger.error(req, err, 'proveedor.controller#save', 'Error al guardar Proveedor');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedProveedor
            });
        });
    }
};

/**
 * Borra un Proveedor.
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
    
    Proveedor
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'proveedor.controller#delete', 'Error al realizar count de Proveedor');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, 'proveedor.controller#delete', 'Error al intentar borrar Proveedor; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Proveedor.update(
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
                    logger.error(req, err, 'proveedor.controller#delete', 'Error al borrar Proveedor.');
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