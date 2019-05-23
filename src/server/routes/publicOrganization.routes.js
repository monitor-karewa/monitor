var express = require('express');
var router = express.Router();
var publicOrganizationController = require('./../controllers/publicOrganization.controller');

/**
 * GET /list
 * Load Organization info
 */
router.get('/list', publicOrganizationController.list);

/**
 * Sets the service for other servers to load our organizations
 */
router.get('/local/list', publicOrganizationController.giveOrganizations);


/**
 * GET /outer/organizations
 * Loads organizations from a given server url
 */
router.get('/remote/list', publicOrganizationController.getOrganizationsFromOuterServer);


/**
 * GET /load-settings
 * Load the current Organization's settings
 */
router.get('/load-settings', publicOrganizationController.loadOrganizationSettings);

module.exports = router;