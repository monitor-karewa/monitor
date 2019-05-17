const express = require('express');
const router = express.Router();
const settingsController = require('./../controllers/settings.controller');

/**
 * GET /change-theme
 * Change the current Organization's theme
 */
router.post('/change-theme', settingsController.changeTheme);

module.exports = router;
