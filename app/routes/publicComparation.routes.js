var express = require('express');
var router = express.Router();
var publicComparationController = require('./../controllers/publicComparation.controller');

/**
 * GET /detail
 * Load Comparation detail
 */
router.get('/detail', publicComparationController.detail);


/**
 * GET /corruption-index
 * Load Corruption Index detail
 */
router.get('/corruption-index', publicComparationController.corruptionIndex);

module.exports = router;