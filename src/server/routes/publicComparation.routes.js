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

/**
 * GET /download
 * Download Corruption Index File in PDF,XLS and JSON format
 */
router.get('/download/:format/:id', publicComparationController.download);

/**
 * GET /download-comparison
 * Download file in PDF,XLS and JSON format of comparison between two monitors
 */
router.post('/download-comparison/:format/:id', publicComparationController.downloadComparison);



module.exports = router;