var express = require('express');
var router = express.Router();
var <%= name %>Controller = require('./../controllers/<%= name %>.controller');
var <%= modelName %> = require('./../models/<%= name %>.model').<%= modelName %>;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(<%= modelName %>.permission, 'read'), <%= name %>Controller.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(<%= modelName %>.permission, 'read'), <%= name %>Controller.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', securityController.validatePermission(<%= modelName %>.permission, 'edit'), <%= modelName %>.expressValidator(), <%= name %>Controller.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(<%= modelName %>.permission, 'delete'), <%= name %>Controller.delete);

module.exports = router;
