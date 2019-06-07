const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');

const {Resource, classificationEnumDict, classificationEnum} = require('./../models/resource.model');
const Organization = require('./../models/organization.model').Organization;
const File = require('./../models/file.model').File;
const deletedSchema = require('./../models/schemas/deleted.schema');

const { validationResult } = require('express-validator/check');

const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');
const async = require('async');

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

let multer  = require('multer');
let upload = multer();

exports.beforeUpload = upload.single('file');

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

    let search = req.query.search;
    if (search) {
        let queryAsRegex = utils.toAccentsRegex(search, "gi");
        
        let orArray = [
            {title: queryAsRegex},
            {url: queryAsRegex}
        ];
        
        
        let enumQueryAsRegexStr = utils.enumSearchRegexString(search, classificationEnum, classificationEnumDict);

        if (enumQueryAsRegexStr && enumQueryAsRegexStr.length) {
            orArray.push(
                {classification: new RegExp(enumQueryAsRegexStr)}
            );
        }
            
        query = {
            $or: orArray
        }
    }


    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};

    async.parallel({
            mainQuery: function (callback) {
                Resource
                    .paginate(
                        query,
                        paginationOptions,
                        (err, result) => {
                            if (err) {
                                logger.error(err, req, 'resource.controller#list', 'Error al consultar lista de Resource');
                                return callback({
                                    errors: true,
                                    message: res.__('general.error.unexpected-error')
                                });
                            }

                            return callback(null, {
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
                    )
            },
            lastUpdate: function (callback) {
                Resource.find(
                    {...qNotDeleted, ...qByOrganization},
                    {updatedAt: 1},
                    {sort: {"updatedAt": -1}, limit: 1},
                    function (err, result) {
                        if (err) {
                            console.log("err", err);
                            callback(err)
                        } else {
                            callback(null, result)
                        }
                    }
                )
            }
        },
        function (err, results) {
            let json = {...results.mainQuery };
            if (results.lastUpdate && results.lastUpdate.length) {
                json = {...results.mainQuery, lastUpdate: results.lastUpdate[0].updatedAt}
            }
            res.json(json);
        });
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

    if (id !== undefined && id !== "") {
        //Update
        let qById = {_id: id};
        let qByOrganization = Organization.qByOrganization(req);
        let query = {...qById, ...qByOrganization};

        Resource
            .findOne(query)
            .exec((err, resource) => {
                if (err || !resource) {
                    logger.error(err, req, 'resource.controller#save', 'Error al consultar Resource');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }

                async.waterfall([
                    (callback) => {
                        if (!req.file) {
                            return callback();
                        }

                        let file = new File({
                            mimetype: req.file.mimetype,
                            size: req.file.size,
                            filename: req.file.originalname,
                            data: req.file.buffer
                        });

                        file.save((err) => {
                            if (err) {
                                logger.error(err, req, 'resource.controller#save', 'Error trying to save Resource image File');
                                return callback();
                            }

                            return callback(null, file);
                        });
                    },
                ], (err, file) => {
                    //Update doc fields
                    resource.title = req.body.title ;
                    resource.classification = req.body.classification ;
                    resource.url= req.body.url;
                    if(file){
                        resource.image = file._id
                    }
    
                    resource.save((err, savedResource) => {
                        if (err) {
                            logger.error(err, req, 'resource.controller#save', 'Error al guardar Resource');
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
            });

    } else {
        //Create\


        // img: {
        //     data: req.file.buffer,
        //         contentType: type
        // }
        
        async.waterfall([
            (callback) => {
                if (!req.file) {
                    return callback();
                }
                
                let file = new File({
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                    filename: req.file.originalname,
                    data: req.file.buffer
                });

                file.save((err) => {
                    if (err) {
                        logger.error(err, req, 'resource.controller#save', 'Error trying to save Resource image File');
                        return callback();
                    }
                    
                    return callback(null, file);
                });
            },
        ], (err, file) => {
            let resource = null;
            if(file){
                resource = new Resource({
                    organization: Organization.currentOrganizationId(req),
                    title : req.body.title,
                    classification : req.body.classification,
                    url: req.body.url,
                    image: file._id
                });
            } else {
                resource = new Resource({
                    organization: Organization.currentOrganizationId(req),
                    title : req.body.title,
                    classification : req.body.classification,
                    url: req.body.url
                });
            }


            resource.save((err, savedResource) => {
                if (err) {
                    logger.error(err, req, 'resource.controller#save', 'Error al guardar Resource');
                    return res.json({
                        "error": true,
                        "message": req.__('general.error.save')
                    });
                }

                // downloadFile(savedResource.url, savedResource._id+'.pdf');

                return res.json({
                    "error": false,
                    "message": req.__('general.success.created'),
                    "data": savedResource
                });
            });
        });
    }
};

/**
 * Edita un grupo de Resources
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
                let qByOrganization = Organization.qByOrganization(req);
                let query = {...qById, ...qByOrganization};
                Resource
                    .findOne(query)
                    .exec((err, resource) => {
                        resource.title = doc.title;
                        resource.classification = doc.classification;
                        resource.url = doc.url;

                        resource.save((err) => {
                            logger.error(err, req, 'resource.controller#saveUpdatedDocs', 'Error al actualizar lista de Resource');
                        });

                    });
            });

            return res.json({
                error:false,
                message: req.__('general.success.updated'),
            });

        } catch(err) {
            logger.error(err, req, 'resource.controller#saveUpdatedDocs', 'Error al actualizar lista de Resource');
        }

    } else {
        return res.json({
            error:false,
            message: req.__('general.success.updated')
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
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};

    Resource
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'resource.controller#delete', 'Error al realizar count de Resource');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }

            if (count === 0) {
                logger.error(err, req, 'resource.controller#delete', 'Error al intentar borrar Resource; el registro no existe o ya fue borrado anteriormente');
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
                    logger.error(err, req, 'resource.controller#delete', 'Error al borrar Resource.');
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

function downloadFile (url, fileName, callback) {

    var file = fs.createWriteStream(fileName);

    http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(callback);  // close() is async, call callback after close completes.
            //TODO: create a field in the model
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (callback) callback(err.message);
    });

};
