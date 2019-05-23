const express = require('express');
const router = express.Router();
const accountController = require('./../controllers/account.controller');

/**
 * POST /login
 * Login
 */
router.post('/login', accountController.login);

/**
 *  Genera un password para el cliente y envía un email
 *  para continuar con el proceso.
 */
router.post('/reset-password', accountController.resetPassword);

/**
 * Valida el token y si es correcto restablece la contraseña del Usuario correspondiente
 */
router.post('/valid-token/', accountController.validToken);


module.exports = router;