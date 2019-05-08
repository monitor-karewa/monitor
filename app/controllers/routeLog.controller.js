const RouteLog = require('./../models/routeLog.model').RouteLog;

exports.register = (req, res, next) => {
    let path = req.body.path;
    if (!path) {
        return res.status(204).send({});
    }

    let query = {
        path: path
    };
    
    let routeLogObj = {
        path: path
    };

    RouteLog.updateOne(query, {$set: routeLogObj, $inc : {count: 1}}, {upsert: true}, function(err, data){
        if(err) return console.log(err);
        
        if (err) {
            logger.err(err, req, 'routeLog.controller#register', 'Error trying to upsert RouteLog: %j', routeLogObj);
        }

        return res.status(204).send({});
    });
};