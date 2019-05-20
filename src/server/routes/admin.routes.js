const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/admin.controller');

/**
 * GET /admin/
 * Render admin dashboard
 */
router.get('/', adminController.index);

module.exports = router;