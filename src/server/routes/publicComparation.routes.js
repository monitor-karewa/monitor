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


/**
 * GET /corruption-index
 * Load Corruption Index detail
 */
router.post('/save', publicComparationController.saveComparation);

/**
 * GET /corruption-index
 * Load Corruption Index detail
 */
router.get('/retrieve', publicComparationController.retrieveRecentComparations);



module.exports = router;