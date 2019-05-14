const express = require('express');
const router = express.Router();
const fileController = require('./../controllers/file.controller');

/**
 * GET /download/:id
 * Download a file
 */
router.get('/download/:id', fileController.download);

module.exports = router;
