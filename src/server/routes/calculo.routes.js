var express = require('express');
var router = express.Router();
var calculoController = require('./../controllers/calculo.controller');
var Calculo = require('./../models/calculo.model').Calculo;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Calculo.permission, 'read'), calculoController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Calculo.permission, 'read'), calculoController.list);

/**
 * POST /save
 * Guardar un registro
 */
// router.post('/save', securityController.validatePermission(Calculo.permission, 'edit'), Calculo.expressValidator(), calculoController.save);
router.post('/save',  calculoController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Calculo.permission, 'delete'), calculoController.delete);

module.exports = router;
