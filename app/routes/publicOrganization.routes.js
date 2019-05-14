var express = require('express');
var router = express.Router();
var publicOrganizationController = require('./../controllers/publicOrganization.controller');

/**
 * GET /list
 * Load Organization info
 */
router.get('/list', publicOrganizationController.list);

module.exports = router;