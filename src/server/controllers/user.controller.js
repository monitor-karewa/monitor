const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');
const async = require('async');

const mongoose = require('mongoose');
const User = require('./../models/user.model').User;
const Organization = require('./../models/organization.model').Organization;
const deletedSchema = require('./../models/schemas/deleted.schema');
const EmailClient = require('./../components/emailClient');
const encryptionManager = require('./../components/encryptionManager');

const {validationResult} = require('express-validator/check');
const File = require('./../models/file.model').File;


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


    async.parallel({
            mainQuery: function (callback) {
                User
                    .paginate(
                        query,
                        paginationOptions,
                        (err, result) => {
                            if (err) {
                                logger.error(err, req, 'user.controller#list', 'Error al consultar lista de User');
                                return callback(err,{
                                    errors: true,
                                    message: res.__('general.error.unexpected-error')
                                });
                            }

                            callback(null, {
                                data: {
                                    docs: result.docs,
                                    page: result.page,
                                    pages: result.pages,
                                    total: result.total
                                }
                            });
                        }
                    );
            },
            lastUpdate: function (callback) {
                User.find(
                    {},
                    {updatedAt:1},
                    {sort:{"updatedAt":-1}, limit:1},
                    function (err, result) {
                        if(err){
                            console.log("err", err);
                            callback(err)
                        } else {
                            callback(null,result)
                        }
                    }
                    )
            }
        },
        function(err, results) {
            let json = {...results.mainQuery};
            if(results.lastUpdate && results.lastUpdate.length){
                json = {...results.mainQuery, lastUpdate :  results.lastUpdate[0].updatedAt}
            }
            res.json(json);
        });



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
            emailClient.sendResetPasswordEmail(user, token, true);

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

    let _id = req.body._id;
    query["_id"] = _id;

    if (_id === req.user._id.toString()) {
    // if (true) {
        return res.json({
            error: true,
            message: req.__('general.error.delete')
        });
    }
    

    let qNotDeleted = deletedSchema.qNotDeleted();
    //Users are not bound by organization
    // let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted/*, ...qByOrganization*/};

    User
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'user.controller#delete', 'Error al realizar count de User');
                return res.json({
                    error: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(err, req, 'user.controller#delete', 'Error al intentar borrar User; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    error: true,
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
            ).exec((err) => {
                {multi: false}
                if (err) {
                    logger.error(err, req, 'user.controller#delete', 'Error al borrar User.');
                    return res.json({
                        error: true,
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

var multer  = require('multer');
var upload = multer();

exports.beforeUpload = upload.single('profilePicture');


exports.uploadProfilePicture = function(req, res, next){

    let pictureFileInfo = req.file;

    if (!pictureFileInfo || !req.user._id) {
        return res.json({
            error: true
        });
    }

    let profilePicture = new File({
        mimetype: pictureFileInfo.mimetype,
        size: pictureFileInfo.size,
        filename: pictureFileInfo.originalname,
        data: pictureFileInfo.buffer
    });

    profilePicture.save((err) => {
        if (err) {
            logger.error(err, null, 'settings.controller#changeCover', 'Error trying to save cover File for User [%s]', req.user._id);
        }

        let update = {
            profilePicture: profilePicture._id
        };

        let query = {_id: req.user._id};
        User.updateOne(query, {$set: update}, {}, (err) => {
            if (err) {
                logger.error(err, null, 'settings.controller#changeCover', 'Error trying to change profilePicture for User [%s]', req.user._id);
            }

            return res.json({
                error: !!err,
                data: update
            });
        });
    });
    
}



exports.updateProfileInfo = function(req, res , next){


    let passwordChange = false;

    if(!(req.user._id && (req.body.name && req.body.lastName) || (req.body.currentPassword && req.body.newPassword ) )){
        return res.json({
            message : "Complete correctamente los datos de la sección",
            error : true
        })
    }

    User.findOne({_id: req.user._id})
        .exec(function (err, user) {
            if(err){
                return res.json({
                    message : err.toString(),
                    error : true,
                })
            }

            if(!user){
                return res.json({
                    message : "No se ha encontrado usuario",
                    error : true,
                })
            }

            if(req.body.newPassword){
                // if(req.body.newPassword.length < 6){
                //     return res.json({
                //         message : "La nueva contraseña debe contener al menos 6 caracteres",
                //         error : true,
                //     })
                // }

                if(req.body.newPassword !== req.body.confirmPassword){
                    return res.json({
                        message : "Las contraseñas no coinciden",
                        error : true,
                    })
                }

                if(user.verifyPassword(req.body.currentPassword)){
                    passwordChange = true;
                } else {
                    return res.json({
                        message : "La contraseña actual no es correcta",
                        error : true,
                    })
                }
            }

            if(req.body.name && req.body.lastName){
                user.name = req.body.name;
                user.lastName = req.body.lastName;
            }


            if(passwordChange){
                user.setPassword(req.body.newPassword);
            }

            user.save((err, savedUser) => {
                if (err) {
                    logger.error(err, req, 'user.controller#save', 'Error al guardar User 1 ');
                    return res.json({
                        errors: true,
                        message: "Error al guardar el usuario"
                    });
                }

                return res.json({
                    errors: false,
                    message: "Se ha actualizado correctamente",
                    data: user
                });
            });
        });

}


exports.getProfileInfo = function(req, res , next){

    User.findOne({_id: req.user._id}).select("name lastName profilePicture updatedAt")
        .exec(function (err, result) {

            if(err){
                return res.json({
                    message: "Error al guardar el usuario",
                    // err: err,
                    error : true,
                })
            }

            return res.json({
                message : "UNSOPORTED FEATURE : user.controller#uploadProfilePicture",
                error : false,
                data : result
            })

        });


}