const express = require('express');
const router = express.Router();

const organizationController = require('./../controllers/organization.controller');
const Organization = require('./../models/organization.model').Organization;
const securityController = require('./../controllers/security.controller');
const {USER_PERMISSIONS_DICT} = require('./../models/user.model');

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', organizationController.list);

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
router.post('/delete', organizationController.delete);

/**
 * POST /save-updated-docs
 * Actualiza la información de varios registros
 */
router.post('/save-updated-docs', organizationController.saveUpdatedDocs);

module.exports = router;
