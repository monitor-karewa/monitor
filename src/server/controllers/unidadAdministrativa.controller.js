const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const UnidadAdministrativa = require('./../models/unidadAdministrativa.model').UnidadAdministrativa;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de UnidadAdministrativa.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = UnidadAdministrativa;
    renderParams.permission = UnidadAdministrativa.permission;
    res.render('unidadAdministrativa', renderParams);
};

/**
 * Consulta los registros de UnidadAdministrativa disponibles.
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

    UnidadAdministrativa
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'unidadAdministrativa.controller#list', 'Error al consultar lista de UnidadAdministrativa');
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
 * Guarda un UnidadAdministrativa. 
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

        UnidadAdministrativa
            .findOne(qById)
            .exec((err, unidadAdministrativa) => {
                if (err || !unidadAdministrativa) {
                    logger.error(err, req, 'unidadAdministrativa.controller#save', 'Error al consultar UnidadAdministrativa');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                unidadAdministrativa.nombre = req.body.nombre;
                unidadAdministrativa.notas = req.body.notas;

                unidadAdministrativa.save((err, savedUnidadAdministrativa) => {
                    if (err) {
                        logger.error(err, req, 'unidadAdministrativa.controller#save', 'Error al guardar UnidadAdministrativa');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedUnidadAdministrativa
                    });
                });
            });
        
    } else {
        //Create

        let unidadAdministrativa = new UnidadAdministrativa({
            nombre: req.body.nombre,
            notas: req.body.notas
        });

        unidadAdministrativa.save((err, savedUnidadAdministrativa) => {
            if (err) {
                logger.error(err, req, 'unidadAdministrativa.controller#save', 'Error al guardar UnidadAdministrativa');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedUnidadAdministrativa
            });
        });
    }
};

/**
 * Borra un UnidadAdministrativa.
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
    
    UnidadAdministrativa
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'unidadAdministrativa.controller#delete', 'Error al realizar count de UnidadAdministrativa');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(err, req, 'unidadAdministrativa.controller#delete', 'Error al intentar borrar UnidadAdministrativa; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            UnidadAdministrativa.update(
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
                    logger.error(err, req, 'unidadAdministrativa.controller#delete', 'Error al borrar UnidadAdministrativa.');
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