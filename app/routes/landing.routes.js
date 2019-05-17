var express = require('express');
var router = express.Router();
var landingController = require('./../controllers/landing.controller');

/**
 * GET /amountByPeriod
 * Load the total amount by year and period from every contract in the system
 */
router.post('/amountByPeriod', landingController.amountByPeriods);
/**
 * GET /amountByProcedure
 * Load the total amount type of procedure from every contract in the system
 */
router.post('/amountByProcedure', landingController.amountByProcedure);


module.exports = router;