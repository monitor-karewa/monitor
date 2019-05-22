const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');

const mongoose = require('mongoose');
const User = require('./../models/user.model').User;
const Organization = require('./../models/organization.model').Organization;
const deletedSchema = require('./../models/schemas/deleted.schema');
const EmailClient = require('./../components/emailClient');
const encryptionManager = require('./../components/encryptionManager');

const {validationResult} = require('express-validator/check');


/**
 * Renderiza la vista principal de consulta de User.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = User;
    renderParams.permission = User.permission;
    res.render('user', renderParams);
};

/**
 * Consulta los registros de User disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};

    let search = req.query.search;
    if (search) {
        let queryAsRegex = utils.toAccentsRegex(search, "gi" );
        query = {
            $or: [
                {name: queryAsRegex},
                {lastName: queryAsRegex},
                {email: queryAsRegex}
            ]
        }
    }

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    
    //Users are not bound by organization
    // let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted/*, ...qByOrganization*/};

    User
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'user.controller#list', 'Error al consultar lista de User');
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
 * Guarda un User.
 * @param req
 * @param res
 * @param next
 */
exports.save = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let id = req.body._id;

    if (id) {
        //Update
        let qById = {_id: id};
        //Users are not bound by organization
        // let qByOrganization = Organization.qByOrganization(req);
        let query = {...qById/*, ...qByOrganization*/};

        User
            .findOne(query)
            .exec((err, user) => {
                if (err || !user) {
                    logger.error(err, req, 'user.controller#save', 'Error al consultar User');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                user.name = req.body.name;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.notes = req.body.notes;
                user.active = Boolean(req.body.active);
                user.administratorType = req.body.administratorType;
                user.permissions = req.body.permissions;

                user.save((err, savedUser) => {
                    if (err) {
                        logger.error(err, req, 'user.controller#save', 'Error al guardar User 1 ');
                        return res.json({
                            errors: true,
                            message: req.__('general.error.save')
                        });
                    }

                    return res.json({
                        errors: false,
                        message: req.__('general.success.updated'),
                        data: savedUser
                    });
                });
            });

    } else {
        //Create

        let user = new User({
            //Users are not bound by organization
            // organization: Organization.currentOrganizationId(req),
            name: req.body.name,
            lastName : req.body.lastName,
            email : req.body.email,
            permissions : req.body.permissions,
            administratorType : req.body.administratorType,
            notes : req.body.notes,
        });
        
        let token = encryptionManager.encryptWithDate(user._id);
        user.resetPasswordToken = token;

        user.save((err, savedUser) => {
            if (err) {
                logger.error(err, req, 'user.controller#save', 'Error al guardar User 2');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            //Send an email to set password
            let emailClient = new EmailClient(user.email, "Monitor Karewa | Bienvenido a la plataforma", req);
            emailClient.sendResetPasswordEmail(user, token);

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedUser
            });
        });
    }
};


/**
 * Edita un grupo de Users
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
                let qById = {_id: doc._id};
                //Users are not bound by organization
                // let qByOrganization = Organization.qByOrganization(req);
                let query = {...qById/*, ...qByOrganization*/};
                User
                    .findOne(query)
                    .exec((err, user) => {
                        user.name = doc.name;
                        user.lastName = doc.lastName;
                        user.email = doc.email;
                        user.notes = doc.notes;
                        user.active = doc.active;
                        user.administratorType = doc.administratorType;
                        user.permissions = doc.permissions;

                        user.save((err) => {
                            logger.error(err, req, 'user.controller#saveUpdatedDocs', 'Error al actualizar lista de User');
                        });

                    });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'user.controller#saveUpdatedDocs', 'Error al actualizar lista de User');
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
        });

    }
};

/**
 * Borra un User.
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => {
    //TODO: Implementation

    let query = {};

    query["_id"] = req.body._id;

    let qNotDeleted = deletedSchema.qNotDeleted();
    //Users are not bound by organization
    // let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted/*, ...qByOrganization*/};

    User
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'user.controller#delete', 'Error al realizar count de User');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(req, err, 'user.controller#delete', 'Error al intentar borrar User; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }

            User.update(
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
                    logger.error(req, err, 'user.controller#delete', 'Error al borrar User.');
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
