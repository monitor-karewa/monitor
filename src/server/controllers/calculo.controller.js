const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Calculo = require('./../models/calculo.model').Calculo;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Calculo.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Calculo;
    renderParams.permission = Calculo.permission;
    res.render('calculo', renderParams);
};

/**
 * Consulta los registros de Calculo disponibles.
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

    Calculo
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'calculo.controller#list', 'Error al consultar lista de Calculo');
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
 * Guarda un Calculo. 
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

        Calculo
            .findOne(qById)
            .exec((err, calculo) => {
                if (err || !calculo) {
                    logger.error(err, req, 'calculo.controller#save', 'Error al consultar Calculo');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                calculo.nombre = req.body.nombre;
                calculo.descripcion = req.body.descripcion;
                calculo.tipo = req.body.tipo;
                calculo.habilitado = req.body.habilitado;
                calculo.notas = req.body.notas;

                calculo.save((err, savedCalculo) => {
                    if (err) {
                        logger.error(err, req, 'calculo.controller#save', 'Error al guardar Calculo');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedCalculo
                    });
                });
            });
        
    } else {
        //Create
        let calculo = new Calculo({
            nombre: req.body.nombre,
            descripcion : req.body.descripcion,
            tipo : req.body.tipo,
            habilitado : req.body.habilitado,
            notas : req.body.notas
        });

        calculo.save((err, savedCalculo) => {
            if (err) {
                logger.error(err, req, 'calculo.controller#save', 'Error al guardar Calculo');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedCalculo
            });
        });
    }
};

/**
 * Borra un Calculo.
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
    
    Calculo
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'calculo.controller#delete', 'Error al realizar count de Calculo');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(err, req, 'calculo.controller#delete', 'Error al intentar borrar Calculo; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Calculo.update(
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
                    logger.error(err, req, 'calculo.controller#delete', 'Error al borrar Calculo.');
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