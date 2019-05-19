var express = require('express');
var router = express.Router();
var resourceController = require('./../controllers/resource.controller');
var Resource = require('./../models/resource.model').Resource;
var securityController = require('./../controllers/security.controller');
var resourceController = require('./../controllers/resource.controller');
/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Resource.permission, 'read'), resourceController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Resource.permission, 'read'), resourceController.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', resourceController.beforeUpload, securityController.validatePermission(Resource.permission, 'edit'), Resource.expressValidator(), resourceController.save);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', securityController.validatePermission(Resource.permission, 'edit'), Resource.expressValidator(), resourceController.saveUpdatedDocs);


/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Resource.permission, 'delete'), resourceController.delete);

module.exports = router;
