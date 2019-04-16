var express = require('express');
var router = express.Router();
var contractController = require('./../controllers/contract.controller');
var Contract = require('./../models/contract.model').Contract;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Contract.permission, 'read'), contractController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Contract.permission, 'read'), contractController.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', securityController.validatePermission(Contract.permission, 'edit'), Contract.expressValidator(), contractController.save);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', securityController.validatePermission(Contract.permission, 'edit'), Contract.expressValidator(), contractController.saveUpdatedDocs);


/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Contract.permission, 'delete'), contractController.delete);

module.exports = router;
