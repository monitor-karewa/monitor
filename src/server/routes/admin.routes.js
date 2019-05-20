const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/admin.controller');

/**
 * GET /admin/
 * Render admin dashboard
 */
router.get('/', adminController.index);

router.post('/visits-month', adminController.visitsByMonths);

router.get('/visits-route', adminController.visitsByRoute);

module.exports = router;