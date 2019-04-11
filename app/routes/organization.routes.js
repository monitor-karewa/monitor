var express = require('express');
var router = express.Router();

var organizationController = require('./../controllers/organization.controller');
var Organization = require('./../models/organization.model').Organization;
var securityController = require('./../controllers/security.controller');


/* GET organizations listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', securityController.validatePermission(Organization.permission, 'read'), organizationController.list);

/**
 * POST /save
 * Guardar un registro
 */
// router.post('/save', securityController.validatePermission(Organization.permission, 'edit'), Organization.expressValidator(), organizationController.save);
router.post('/save', organizationController.save);

/**
 * POST /delete
 * Borrar un registro
 */
router.post('/delete', securityController.validatePermission(Organization.permission, 'delete'), organizationController.delete);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', securityController.validatePermission(Organization.permission, 'edit'), organizationController.saveUpdatedDocs);

module.exports = router;
