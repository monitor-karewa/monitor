var express = require('express');
var router = express.Router();
var calculationController = require('./../controllers/calculation.controller');
var Calculation = require('./../models/calculation.model').Calculation;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Calculation.permission, 'read'), calculationController.index);

/**
 * GET /
 * Obtener variables de calculos
 */
router.get('/variables', securityController.validatePermission(Calculation.permission, 'read'), calculationController.getVariables);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Calculation.permission, 'read'), calculationController.list);

/**
 * GET /retrieve/calculations
 * Consulta de registros de cálculos para el uso de la fórmula
 */
router.get('/retrieve/calculations', securityController.validatePermission(Calculation.permission, 'read'), calculationController.getCalculationsForFormula);

/**
 * GET /retrieve/calculations
 * Consulta de registros de cálculos para el uso de la fórmula
 */
router.post('/formula/validate', securityController.validatePermission(Calculation.permission, 'read'), calculationController.validateFormula);

/**
 * GET /retrieve/calculations
 * Consulta de registros de cálculos para el uso de la fórmula
 */
router.get('/formula/evaluate', securityController.validatePermission(Calculation.permission, 'read'), calculationController.evaluateFormula);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', securityController.validatePermission(Calculation.permission, 'edit'), Calculation.expressValidator(), calculationController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Calculation.permission, 'delete'), calculationController.delete);

/**
 * GET /delete
 * Obtains the suppliers available for this contract
 */
router.get('/retrieve/suppliers', securityController.validatePermission(Calculation.permission, 'edit'), calculationController.retrieveSuppliers);

/**
 * GET /delete
 * Obtains the suppliers available for this contract
 */
router.get('/retrieve/administrative-units', securityController.validatePermission(Calculation.permission, 'edit'), calculationController.retrieveAdministrativeUnits);

module.exports = router;
