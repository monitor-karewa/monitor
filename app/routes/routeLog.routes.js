let express = require('express');
let router = express.Router();

const routeLogController = require('./../controllers/routeLog.controller');

router.post('/register', routeLogController.register);

module.exports = router;