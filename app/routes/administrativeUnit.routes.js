var express = require('express');
var router = express.Router();
var administrativeUnitController = require('./../controllers/administrativeUnit.controller');
var AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(AdministrativeUnit.permission, 'read'), administrativeUnitController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(AdministrativeUnit.permission, 'read'), administrativeUnitController.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', securityController.validatePermission(AdministrativeUnit.permission, 'edit'), AdministrativeUnit.expressValidator(), administrativeUnitController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(AdministrativeUnit.permission, 'delete'), administrativeUnitController.delete);

module.exports = router;
