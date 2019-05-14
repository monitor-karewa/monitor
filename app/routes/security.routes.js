const express = require('express');
const router = express.Router();
const securityController = require('./../controllers/security.controller');

/**
 * POST /security/login
 * Attempt user login
 */
// router.post('/login', securityController.doLogin);

module.exports = router;