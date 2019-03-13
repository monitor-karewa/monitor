const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Resource = require('./../models/resource.model').Resource;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Resource.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Resource;
    renderParams.permission = Resource.permission;
    res.render('resource', renderParams);
};

/**
 * Consulta los registros de Resource disponibles.
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

    Resource
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'resource.controller#list', 'Error al consultar lista de Resource');
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
 * Guarda un Resource. 
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

        Resource
            .findOne(qById)
            .exec((err, resource) => {
                if (err || !resource) {
                    logger.error(req, err, 'resource.controller#save', 'Error al consultar Resource');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                resource.name = req.body.name;
                
                resource.save((err, savedResource) => {
                    if (err) {
                        logger.error(req, err, 'resource.controller#save', 'Error al guardar Resource');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedResource
                    });
                });
            });
        
    } else {
        //Create

        let resource = new Resource({
            name: req.body.name
        });

        resource.save((err, savedResource) => {
            if (err) {
                logger.error(req, err, 'resource.controller#save', 'Error al guardar Resource');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedResource
            });
        });
    }
};

/**
 * Borra un Resource.
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
    
    Resource
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'resource.controller#delete', 'Error al realizar count de Resource');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, 'resource.controller#delete', 'Error al intentar borrar Resource; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Resource.update(
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
                    logger.error(req, err, 'resource.controller#delete', 'Error al borrar Resource.');
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