const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de AdministrativeUnit.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = AdministrativeUnit;
    renderParams.permission = AdministrativeUnit.permission;
    res.render('administrativeUnit', renderParams);
};

/**
 * Consulta los registros de AdministrativeUnit disponibles.
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

    AdministrativeUnit
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'administrativeUnit.controller#list', 'Error al consultar lista de AdministrativeUnit');
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
 * Guarda un AdministrativeUnit. 
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

        AdministrativeUnit
            .findOne(qById)
            .exec((err, administrativeUnit) => {
                if (err || !administrativeUnit) {
                    logger.error(req, err, 'administrativeUnit.controller#save', 'Error al consultar AdministrativeUnit');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                administrativeUnit.name = req.body.name;
                administrativeUnit.notes = req.body.notes;
                
                administrativeUnit.save((err, savedAdministrativeUnit) => {
                    if (err) {
                        logger.error(req, err, 'administrativeUnit.controller#save', 'Error al guardar AdministrativeUnit');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }
        
                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedAdministrativeUnit
                    });
                });
            });
        
    } else {
        //Create

        let administrativeUnit = new AdministrativeUnit({
            name: req.body.name,
            notes: req.body.notes
        });

        administrativeUnit.save((err, savedAdministrativeUnit) => {
            if (err) {
                logger.error(req, err, 'administrativeUnit.controller#save', 'Error al guardar AdministrativeUnit');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedAdministrativeUnit
            });
        });
    }
};


/**
 * Edita un grupo de AdministrativeUnits
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
                AdministrativeUnit
                    .findOne({_id: doc._id})
                    .exec((err, administrativeUnit) => {
                        administrativeUnit.name = doc.name;
                        administrativeUnit.notes = doc.notes;

                        administrativeUnit.save((err) => {
                            logger.error(err, req, 'administrativeUnit.controller#saveUpdatedDocs', 'Error al actualizar lista de AdministrativeUnit');
                        });

                    });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'administrativeUnit.controller#saveUpdatedDocs', 'Error al actualizar lista de AdministrativeUnit');
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
        });

    }
};

/**
 * Borra un AdministrativeUnit.
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
    
    AdministrativeUnit
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'administrativeUnit.controller#delete', 'Error al realizar count de AdministrativeUnit');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, 'administrativeUnit.controller#delete', 'Error al intentar borrar AdministrativeUnit; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            AdministrativeUnit.update(
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
                    logger.error(req, err, 'administrativeUnit.controller#delete', 'Error al borrar AdministrativeUnit.');
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