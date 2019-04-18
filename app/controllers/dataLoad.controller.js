const ContractExcelReader = require('./../components/dataLoader').ContractExcelReader;

/**
 * Carga un archivo con información a ser procesada.
 * @param req
 * @param res
 * @param next
 */
exports.upload = (req, res, next) => {

    console.log('req.file', req.file);



    // paymentExcelReader.readObject(excelObject, req, (err, result) => {
    
    // TODO: fetch current organization id
    let organizationId = null;
    
    let reader = new ContractExcelReader(organizationId);
    
    try {
        reader.readBuffer(req.file.buffer)
            .then((dataLoad) => {
                console.log('dataLoad', dataLoad);
                dataLoad.save((err) => {
                    if (err) {
                        //TODO: Handle err
                        console.log('save err', err);
                        // return res.json(...);
                    }
                    return res.json({
                        error: false,
                        //TODO: Success message
                        "message": "Success!",
                        data: dataLoad.data
                    });
                });
                // console.log('reader.readBuffer result', result);
            })
            .catch((err) => {
                console.log('reader.readBuffer err', err);
                return res.json({
                    "error": true,
                    "message": req.__('data-load.error.upload')
                    // "data": savedOrganization
                });
            
            })
    } catch (err) {
        console.log('err in try', err);
        return res.json({
            "error": true,
            "message": req.__('data-load.error.upload')
            // "data": savedOrganization
        });
    }
    
    
    //TODO: Read file
    //TODO: Validate file extension
    
    //"Processing"
    // setTimeout(function () {
    //     return res.json({
    //         "error": true,
    //         "message": req.__('data-load.error.upload')
    //         // "data": savedOrganization
    //     });
    // }, 2000);

};


var multer  = require('multer');
var upload = multer();

exports.beforeUpload = upload.single('file');