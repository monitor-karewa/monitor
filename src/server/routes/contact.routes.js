var express = require('express');
var router = express.Router();
var contactController = require('./../controllers/contact.controller');

/**
 * POST /submit contact information
 */
router.post('/submit', contactController.contact);

/**
 * POST load organization info
 */
router.get('/load-info', contactController.loadInfo);


module.exports = router;