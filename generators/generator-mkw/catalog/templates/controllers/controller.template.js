const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const <%= modelName %> = require('./../models/<%= name %>.model').<%= modelName %>;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de <%= modelName %>.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = <%= modelName %>;
    renderParams.permission = <%= modelName %>.permission;
    res.render('<%= name %>', renderParams);
};

/**
 * Consulta los registros de <%= modelName %> disponibles.
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

    <%= modelName %>
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, '<%= name %>.controller#list', 'Error al consultar lista de <%= modelName %>');
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
 * Guarda un <%= modelName %>. 
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

        <%= modelName %>
            .findOne(qById)
            .exec((err, <%= name %>) => {
                if (err || !<%= name %>) {
                    logger.error(req, err, '<%= name %>.controller#save', 'Error al consultar <%= modelName %>');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                <%= name %>.name = req.body.name;
                
                <%= name %>.save((err, saved<%= modelName %>) => {
                    if (err) {
                        logger.error(req, err, '<%= name %>.controller#save', 'Error al guardar <%= modelName %>');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: saved<%= modelName %>
                    });
                });
            });
        
    } else {
        //Create

        let <%= name %> = new <%= modelName %>({
            name: req.body.name
        });

        <%= name %>.save((err, saved<%= modelName %>) => {
            if (err) {
                logger.error(req, err, '<%= name %>.controller#save', 'Error al guardar <%= modelName %>');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": saved<%= modelName %>
            });
        });
    }
};

/**
 * Borra un <%= modelName %>.
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
    
    <%= modelName %>
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, '<%= name %>.controller#delete', 'Error al realizar count de <%= modelName %>');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, '<%= name %>.controller#delete', 'Error al intentar borrar <%= modelName %>; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            <%= modelName %>.update(
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
                    logger.error(req, err, '<%= name %>.controller#delete', 'Error al borrar <%= modelName %>.');
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