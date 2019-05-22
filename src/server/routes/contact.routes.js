var express = require('express');
var router = express.Router();
var contactController = require('./../controllers/contact.controller');

/**
 * GET /amountByPeriod
 * Load the total amount by year and period from every contract in the system
 */
router.post('/submit', contactController.contact);


module.exports = router;