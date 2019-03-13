var express = require('express');
var router = express.Router();
var resourceController = require('./../controllers/resource.controller');
var Resource = require('./../models/resource.model').Resource;
var securityController = require('./../controllers/security.controller');

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
router.post('/save', securityController.validatePermission(Resource.permission, 'edit'), Resource.expressValidator(), resourceController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Resource.permission, 'delete'), resourceController.delete);

module.exports = router;
