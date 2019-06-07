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
 * Consulta de registros
 */
router.post('/filtered-list', securityController.validatePermission(Contract.permission, 'read'), publicContractController.list);


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


/**
 * GET /retrieve/suppliers
 * Obtains the suppliers available according to the currenct contracts
 */
router.get('/retrieve/suppliers', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveSuppliers);

/**
 * GET /retrieve/administrative-units
 * Obtains the administrative units available according to the currenct contracts
 */
router.get('/retrieve/administrative-units', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveAdministrativeUnits);

/**
 * GET /retrieve/trimonths
 * Obtains the administrative units available according to the currenct contracts
 */
router.get('/retrieve/trimonths', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveTrimonths);

/**
 * GET /retrieve/retrieveAdministration-periods
 * Obtains the administration periods available according to the currenct contracts
 */
router.get('/retrieve/administration-periods', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveAdministrationPeriods);


/**
 * GET /retrieve/contracts
 * Obtains the suppliers units available according to the current contracts
 */
router.get('/retrieve/suppliers-filter', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveSuppliersForFilter);


/**
 * GET /retrieve/fiscal-years
 * Obtains the fiscal years available according to the currenct contracts
 */
router.get('/retrieve/fiscal-years', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveFiscalYears);

/**
 * GET /retrieve/fiscal-years
 * Obtains the fiscal years available according to the currenct contracts
 */
router.get('/retrieve/procedure-types', securityController.validatePermission(Contract.permission, 'read'), publicContractController.retrieveProceudureTypes);

/**
 * GET /download/:format
 * Export/download Suppliers
 */
router.get('/download/:format', publicContractController.download);



module.exports = router;
