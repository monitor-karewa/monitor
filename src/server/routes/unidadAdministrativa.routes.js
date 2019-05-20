var express = require('express');
var router = express.Router();
var unidadAdministrativaController = require('./../controllers/unidadAdministrativa.controller');
var UnidadAdministrativa = require('./../models/unidadAdministrativa.model').UnidadAdministrativa;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(UnidadAdministrativa.permission, 'read'), unidadAdministrativaController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(UnidadAdministrativa.permission, 'read'), unidadAdministrativaController.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', UnidadAdministrativa.expressValidator(), unidadAdministrativaController.save);
// router.post('/save', securityController.validatePermission(UnidadAdministrativa.permission, 'edit'), UnidadAdministrativa.expressValidator(), unidadAdministrativaController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(UnidadAdministrativa.permission, 'delete'), unidadAdministrativaController.delete);

module.exports = router;
