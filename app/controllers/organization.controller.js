const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');

const Organization = require('./../models/organization.model').Organization;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Organization.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Organization;
    renderParams.permission = Organization.permission;
    res.render('organization', renderParams);
};

/**
 * Consulta los registros de Organization disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    let search = req.query.search;
    if(search){
        query = {
            $or : [
                {name : utils.toAccentsRegex(search, "gi")},
                {shortName : utils.toAccentsRegex(search, "gi")},
            ]
        }
    }


    Organization
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'organization.controller#list', 'Error al consultar lista de Organization');
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
 * Guarda un Organization.
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

        Organization
            .findOne(qById)
            .exec((err, organization) => {
                if (err || !organization) {
                    logger.error(req, err, 'organization.controller#save', 'Error al consultar Organization');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                organization.name = req.body.name;
                organization.shortName = req.body.shortName;


                organization.save((err, savedOrganization) => {
                    if (err) {
                        logger.error(req, err, 'organization.controller#save', 'Error al guardar Organization');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }

                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedOrganization
                    });
                });
            });

    } else {
        //Create

        let organization = new Organization({
            name: req.body.name,
            shortName: req.body.shortName
        });

        organization.save((err, savedOrganization) => {
            if (err) {
                logger.error(req, err, 'organization.controller#save', 'Error al guardar Organization');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedOrganization
            });
        });
    }
};

/**
 * Edita un grupo de Organizations
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
                Organization
                    .findOne({_id: doc._id})
                    .exec((err, organization) => {
                        organization.name = doc.name;
                        organization.shortName = doc.shortName;

                        organization.save((err) => {
                            if (err) {
                                logger.error(err, req, 'organization.controller#saveUpdatedDocs', 'Error al actualizar lista de Organization');
                            }
                        });

                    });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'organization.controller#saveUpdatedDocs', 'Error al actualizar lista de Organization');
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
        });

    }
};


/**
 * Borra un Organization.
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

    Organization
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'organization.controller#delete', 'Error al realizar count de Organization');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(req, err, 'organization.controller#delete', 'Error al intentar borrar Organization; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }

            Organization.update(
                query,
                {
                    $set: {
                        deleted: {
                            organization: req.organization ? req.organization._id : null,
                            isDeleted: true,
                            date: new Date()
                        }
                    }
                },
                {multi: false}
            ).exec((err, par) => {
                if (err) {
                    logger.error(req, err, 'organization.controller#delete', 'Error al borrar Organization.');
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
