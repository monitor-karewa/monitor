var express = require('express');
var router = express.Router();
var recursoController = require('./../controllers/recurso.controller');
var Recurso = require('./../models/recurso.model').Recurso;
var securityController = require('./../controllers/security.controller');

const { check, validationResult } = require('express-validator/check');


/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Recurso.permission, 'read'), recursoController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Recurso.permission, 'read'), recursoController.list);

/**
 * POST /save
 * Guardar un registro
 */
// router.post('/save', securityController.validatePermission(Recurso.permission, 'edit'), Recurso.expressValidator(), recursoController.save);
router.post('/save', Recurso.expressValidator(), recursoController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Recurso.permission, 'delete'), recursoController.delete);

module.exports = router;
