var express = require('express');
var router = express.Router();
var <%= name %>Controller = require('./../controllers/<%= name %>.controller');
var <%= modelName %> = require('./../models/<%= name %>.model').<%= modelName %>;
var securityController = require('./../controllers/security.controller');

/**
 * GET /
 * Renderizar vista principal
 */
router.get('/', <%= name %>Controller.index);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/list', <%= name %>Controller.list);

/**
 * GET /list
 * Consulta de registros
 */
router.get('/save', <%= modelName %>.validateRequestFields(), <%= name %>Controller.list);

module.exports = router;
