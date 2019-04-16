const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Contract = require('./../models/contract.model').Contract;
const Supplier = require('./../models/supplier.model').Supplier;
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
 * Queries the possible suppliers fot this contract
 */
exports.retrieveSuppliers = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Supplier
        .find(
            query,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Suppliers');
                    return res.json({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                return res.json({
                    errors: false,
                    message: "",
                    data: {
                        docs: result,
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
                contract.supplier = req.body.supplier;
                contract.administrativeUnit = req.body.administrativeUnit;
                contract.amount = req.body.amount;
                contract.procedureType = req.body.procedureType;

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

        //Update doc fields
        contract.supplier = req.body.supplier;
        contract.administrativeUnit = req.body.administrativeUnit;
        contract.amount = req.body.amount;
        contract.procedureType = req.body.procedureType;


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
 * Edita un grupo de Contracts
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
                Contract
                    .findOne({_id: doc._id})
                    .exec((err, contract) => {
                        contract.supplier = doc.supplier;
                        contract.administrativeUnit = doc.administrativeUnit;
                        contract.amount = doc.amount;
                        contract.procedureType = doc.procedureType;

                        contract.save((err) => {
                            logger.error(err, req, 'contract.controller#saveUpdatedDocs', 'Error al actualizar lista de Contract');
                        });

                    });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'contract.controller#saveUpdatedDocs', 'Error al actualizar lista de Contract');
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
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