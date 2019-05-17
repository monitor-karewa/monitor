const mongoose = require('mongoose');
const logger = require('./../components/logger').instance;

exports.image = (req, res, next) => {
    let id = req.params.id;
    if (!id || id === 'undefined' || id === 'null') {
        return res.end();
    }
    id = mongoose.Types.ObjectId(id);
    File.findOne({_id: id})
        .lean()
        .exec((err, file) => {
            if (err || !file || !file.data) {
                if (err) {
                    logger.error(err, req, 'file.controller#image', 'Error trying to find File [%s]', id);
                } else {
                    logger.error(err, req, 'file.controller#image', 'Invalid File [%s]', id);
                }
                return res.end();
            } else {
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

exports.download = (req, res, next) => {
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
                    // 'Content-disposition': 'attachment; filename=' + 'filename.png',
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