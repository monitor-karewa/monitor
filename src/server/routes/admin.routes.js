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

router.get('/info-dashboard', adminController.infoValues);

router.get('/notifications', adminController.notifications);

router.get('/read-notifications', adminController.readNotifications);

module.exports = router;