const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Contract = require('./../models/contract.model').Contract;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Contract.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Contract;
    renderParams.permission = Contract.permission;
    res.render('contract', renderParams);
};

/**
 * Consulta los registros de Contract disponibles.
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

    Contract
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
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
 * Guarda un Contract. 
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

        Contract
            .findOne(qById)
            .exec((err, contract) => {
                if (err || !contract) {
                    logger.error(req, err, 'contract.controller#save', 'Error al consultar Contract');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                contract.name = req.body.name;
                
                contract.save((err, savedContract) => {
                    if (err) {
                        logger.error(req, err, 'contract.controller#save', 'Error al guardar Contract');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedContract
                    });
                });
            });
        
    } else {
        //Create

        let contract = new Contract({
            name: req.body.name
        });

        contract.save((err, savedContract) => {
            if (err) {
                logger.error(req, err, 'contract.controller#save', 'Error al guardar Contract');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedContract
            });
        });
    }
};

/**
 * Borra un Contract.
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
    
    Contract
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'contract.controller#delete', 'Error al realizar count de Contract');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, 'contract.controller#delete', 'Error al intentar borrar Contract; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Contract.update(
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
                    logger.error(req, err, 'contract.controller#delete', 'Error al borrar Contract.');
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