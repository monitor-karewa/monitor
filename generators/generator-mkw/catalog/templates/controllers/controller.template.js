const pagination = require('./../components/pagination');

const deletedSchema = require('./../models/schemas/deleted.schema');

/**
 * Renderiza la vista principal de consulta de <%= modelName %>.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
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
                        error: true,
                        message: res.__('general.errors.unexpected-error')
                    });
                }

                return res.json({
                    error: false,
                    message: "",
                    data: {
                        results: result.docs,
                        page: result.page,
                        pages: result.pages,
                        records: result.total
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
    
    let id = req.body._id;
    
    if (id) {
        //Update
        let qById = {_id: id};

        <%= modelName %>
            .find(qById)
            .exec((err, <%= name %>) => {
                if (err || !<%= name %>) {
                    logger.error(req, err, '<%= name %>.controller#save', 'Error al consultar <%= modelName %>');
                    return res.json({
                        "error": true,
                        "message": req.__('general.errors.save')
                    });
                }
                
                <%= name %>.save((err, saved<%= modelName %>) => {
                    if (err) {
                        logger.error(req, err, '<%= name %>.controller#save', 'Error al guardar <%= modelName %>');
                        return res.json({
                            "error": true,
                            "message": req.__('general.errors.save')
                        });
                    }
        
                    return res.json({
                        "error": false,
                        "message": req.__('general.success.updated'),
                        "data": saved<%= modelName %>
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
                    "message": req.__('general.errors.save')
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


exports.delete = (req, res, next) => {
    //TODO: Implementation
};