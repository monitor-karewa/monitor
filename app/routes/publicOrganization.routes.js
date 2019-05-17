var express = require('express');
var router = express.Router();
var publicOrganizationController = require('./../controllers/publicOrganization.controller');

/**
 * GET /list
 * Load Organization info
 */
router.get('/list', publicOrganizationController.list);

/**
 * GET /load-settings
 * Load the current Organization's settings
 */
router.get('/load-settings', publicOrganizationController.loadOrganizationSettings);

module.exports = router;