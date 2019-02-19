var express = require('express');
var router = express.Router();
var proveedorController = require('./../controllers/proveedor.controller');
var Proveedor = require('./../models/proveedor.model').Proveedor;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', securityController.validatePermission(Proveedor.permission, 'read'), proveedorController.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Proveedor.permission, 'read'), proveedorController.list);

/**
 * POST /save
 * Guardar un registro
 */
// router.post('/save', securityController.validatePermission(Proveedor.permission, 'edit'), Proveedor.expressValidator(), proveedorController.save);
router.post('/save', Proveedor.expressValidator(), proveedorController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Proveedor.permission, 'delete'), proveedorController.delete);

module.exports = router;
