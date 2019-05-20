var express = require('express');
var router = express.Router();
var supplierController = require('./../controllers/supplier.controller');
var Supplier = require('./../models/supplier.model').Supplier;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Supplier.permission, 'read'), supplierController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Supplier.permission, 'read'), supplierController.list);

/**
 * POST /save
 * Guardar un registro
 */
router.post('/save', securityController.validatePermission(Supplier.permission, 'edit'), Supplier.expressValidator(), supplierController.save);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', securityController.validatePermission(Supplier.permission, 'edit'), Supplier.expressValidator(), supplierController.saveUpdatedDocs);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Supplier.permission, 'delete'), supplierController.delete);

module.exports = router;
