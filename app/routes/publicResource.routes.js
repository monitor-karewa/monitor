var express = require('express');
var router = express.Router();
var publicResourceController = require('./../controllers/publicResource.controller');

/**
 * GET /list
 * Load Resources
 */
router.get('/list', publicResourceController.list);

module.exports = router;