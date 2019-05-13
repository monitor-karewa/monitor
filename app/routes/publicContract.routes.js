var express = require('express');
var router = express.Router();
var publicContractController = require('./../controllers/publicContract.controller');
var Contract = require('./../models/contract.model').Contract;
var securityController = require('./../controllers/security.controller');

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Contract.permission, 'read'), publicContractController.list);


/**
 * GET /list
 * Consulta de  suma de cantidad total en contratos
 */
router.get('/totals', securityController.validatePermission(Contract.permission, 'read'), publicContractController.getTotals);

/**
 * GET /list
 * Consulta de  suma de cantidad total en contratos
 */
router.get('/totals', securityController.validatePermission(Contract.permission, 'read'), publicContractController.getTotals);


/**
 * GET /detail
 * Load Contract detail
 */
router.get('/detail', publicContractController.detail);



module.exports = router;
