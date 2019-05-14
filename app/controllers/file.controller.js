const mongoose = require('mongoose');
const logger = require('./../components/logger').instance;

exports.download = (req, res, next) => {
    console.log('req.params.id', req.params.id);
    File.findOne({_id: mongoose.Types.ObjectId(req.params.id)})
        .lean()
        .exec((err, file) => {
            if (err || !file) {
                if (err) {
                    logger.error(err, req, 'file.controller#download', 'Error querying File');
                }

                let error = new Error("File not found.");
                error.status = 404;
                return next(error);
            } else {
                if (!file.mimetype || !file.size || !file.data) {
                    logger.error(err, req, 'file.controller#download', 'File corrupted');
                    let error = new Error("File not found.");
                    error.status = 404;
                    return next(error);
                }

                res.writeHead(200, {
                    'Content-Type': file.mimetype,
                    'Content-Length': file.size,
                    "Pragma": "public",
                    "Cache-Control": "max-age=8640000",
                    "Expires": new Date(Date.now() + 8640000000).toUTCString(),
                    "Last-Modified": new Date(Date.now()).toUTCString()
                });
                
                res.end(file.data.buffer || file.data);
            }
        });
};

const File = require('./../models/file.model').File;