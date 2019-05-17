const express = require('express');
const router = express.Router();
const fileController = require('./../controllers/file.controller');

/**
 * GET /image/:id
 * Render an image file
 */
router.get('/image/:id', fileController.image);

/**
 * GET /download/:id
 * Download a file
 */
router.get('/download/:id', fileController.download);

module.exports = router;
