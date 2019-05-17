const express = require('express');
const router = express.Router();
const settingsController = require('./../controllers/settings.controller');
var publicOrganizationController = require('./../controllers/publicOrganization.controller');

/**
 * GET /load-settings
 * Load the current Organization's settings
 */
router.get('/load-settings', publicOrganizationController.loadOrganizationSettings);

/**
 * POST /change-cover
 * Change the current Organization's cover
 */
router.post('/change-cover', settingsController.beforeChangeCover, settingsController.changeCover);

/**
 * POST /change-settings
 * Change the current Organization's settings
 */
router.post('/change-settings', settingsController.changeSettings);

/**
 * POST /change-theme
 * Change the current Organization's theme
 */
router.post('/change-theme', settingsController.changeTheme);

module.exports = router;
