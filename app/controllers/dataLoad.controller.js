/**
 * Carga un archivo con información a ser procesada.
 * @param req
 * @param res
 * @param next
 */
exports.upload = (req, res, next) => {

    console.log('req.file', req.file);
    
    //TODO: Read file
    //TODO: Validate file extension
    
    //"Processing"
    setTimeout(function () {
        return res.json({
            "error": true,
            "message": req.__('data-load.error.upload')
            // "data": savedOrganization
        });
    }, 2000);

};


var multer  = require('multer');
var upload = multer();

exports.beforeUpload = upload.single('file');