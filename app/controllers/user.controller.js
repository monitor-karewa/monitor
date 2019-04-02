const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const User = require('./../models/user.model').User;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

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
    
    //query["field"] = value;
    
    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

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
        return res.status(422).json({ errors: errors.array() });
    }
    
    let id = req.body._id;
    
    if (id) {
        //Update
        let qById = {_id: id};

        User
            .findOne(qById)
            .exec((err, user) => {
                if (err || !user) {
                    logger.error(req, err, 'user.controller#save', 'Error al consultar User');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                //Update doc fields
                user.name = req.body.name;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.password = req.body.password;

                
                user.save((err, savedUser) => {
                    if (err) {
                        logger.error(req, err, 'user.controller#save', 'Error al guardar User 1 ');
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
            name: req.body.name,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        });

        user.save((err, savedUser) => {
            if (err) {
                console.log("err", err);
                logger.error(req, err, 'user.controller#save', 'Error al guardar User 2');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedUser
            });
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
    query = {...query, ...qNotDeleted};
    
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