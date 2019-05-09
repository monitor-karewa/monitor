var express = require('express');
var router = express.Router();
var publicSupplierController = require('./../controllers/publicSupplier.controller');

/**
 * GET /list
 * Load Suppliers info
 */
router.get('/list', publicSupplierController.list);
router.get('/download/:format', publicSupplierController.download);


module.exports = router;