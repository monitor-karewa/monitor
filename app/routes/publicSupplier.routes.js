var express = require('express');
var router = express.Router();
var publicSupplierController = require('./../controllers/publicSupplier.controller');

/**
 * GET /list
 * Load Suppliers info
 */
router.get('/list', publicSupplierController.list);

/**
 * GET /detail
 * Load Supplier detail
 */
router.get('/detail', publicSupplierController.detail);

/**
 * GET /download/:format
 * Export/download Suppliers
 */
router.get('/download/:format', publicSupplierController.download);


module.exports = router;