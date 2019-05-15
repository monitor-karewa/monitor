var express = require('express');
var router = express.Router();
var publicComparationController = require('./../controllers/publicComparation.controller');

/**
 * GET /detail
 * Load Comparation detail
 */
router.get('/detail', publicComparationController.detail);

module.exports = router;