var express = require('express');
var router = express.Router();

var userController = require('./../controllers/user.controller');
var User = require('./../models/user.model').User;
var securityController = require('./../controllers/security.controller');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(User.permission, 'read'), userController.list);

/**
 * POST /save
 * Guardar un registro
 */
// router.post('/save', securityController.validatePermission(User.permission, 'edit'), User.expressValidator(), userController.save);
router.post('/save', userController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(User.permission, 'delete'), userController.delete);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', securityController.validatePermission(User.permission, 'edit'),  userController.saveUpdatedDocs);

module.exports = router;
