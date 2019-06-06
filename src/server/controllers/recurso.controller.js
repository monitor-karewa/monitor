
const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Recurso = require('./../models/recurso.model').Recurso;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Recurso.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Recurso;
    renderParams.permission = Recurso.permission;
    res.render('recurso', renderParams);
};

/**
 * Consulta los registros de Recurso disponibles.
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

    Recurso
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'recurso.controller#list', 'Error al consultar lista de Recurso');
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
 * Guarda un Recurso. 
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

        Recurso
            .findOne(qById)
            .exec((err, recurso) => {


                if (err || !recurso) {
                    logger.error(err, req, 'recurso.controller#save', 'Error al consultar Recurso');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                recurso.titulo = req.body.titulo;
                recurso.clasificacion = req.body.clasificacion;
                recurso.enlace = req.body.enlace;

                recurso.save((err, savedRecurso) => {
                    if (err) {
                        logger.error(err, req, 'recurso.controller#save', 'Error al guardar Recurso');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedRecurso
                    });
                });
            });
        
    } else {

        //Create
        let recurso = new Recurso({
            "titulo": req.body.titulo,
            "clasificacion": req.body.clasificacion,
            "enlace": req.body.enlace
        });

        recurso.save((err, savedRecurso) => {
            if (err) {
                logger.error(err, req, 'recurso.controller#save', 'Error al guardar Recurso');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedRecurso
            });
        });
    }
};

/**
 * Borra un Recurso.
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
    
    Recurso
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'recurso.controller#delete', 'Error al realizar count de Recurso');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(err, req, 'recurso.controller#delete', 'Error al intentar borrar Recurso; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Recurso.update(
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
                    logger.error(err, req, 'recurso.controller#delete', 'Error al borrar Recurso.');
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