var express = require('express');
var router = express.Router();
var indexController = require('./../controllers/index.controller');

/**
 * GET /
 * Application index / landing page
 */
router.get('/', indexController.index);

module.exports = router;
