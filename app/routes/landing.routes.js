var express = require('express');
var router = express.Router();
var publicHomeController = require('./../controllers/publicHome.controller');

/**
 * GET /amountByPeriod
 * Load the total amount by year and period from every contract in the system
 */
router.get('/amountByPeriod', publicHomeController.amountByPeriods);


module.exports = router;