const express = require('express');
const router = express.Router();
const accountController = require('./../controllers/account.controller');

/**
 * POST /login
 * Login
 */
router.post('/login', accountController.login);

module.exports = router;