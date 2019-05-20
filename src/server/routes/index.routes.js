var express = require('express');
var router = express.Router();
var indexController = require('./../controllers/index.controller');
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Application index / landing page
 */
router.get('/', indexController.index);

/**
 * GET /login
 * Render login form
 */
router.get('/login', securityController.login);

module.exports = router;
