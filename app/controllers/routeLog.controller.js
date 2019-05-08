const RouteLog = require('./../models/routeLog.model').RouteLog;

exports.register = (req, res, next) => {
    let path = req.body.path;
    if (!path) {
        return res.status(204).send({});
    }
    
    let routeLog = new RouteLog({
        path: path
    });

    routeLog.save((err) => {
        if(err) return console.log(err);
        
        if (err) {
            logger.err(err, req, 'routeLog.controller#register', 'Error trying to upsert RouteLog: %j', routeLog);
        }

        return res.status(204).send({});
    });
};