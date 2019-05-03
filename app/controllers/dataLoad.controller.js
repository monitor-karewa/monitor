const mongoose = require('mongoose');

const ContractExcelReader = require('./../components/dataLoader').ContractExcelReader;
const DataLoad = require('./../models/dataLoad.model').DataLoad;

const logger = require('./../components/logger').instance;


/**
 * Carga un archivo con información a ser procesada.
 * @param req
 * @param res
 * @param next
 */
exports.upload = (req, res, next) => {

    console.log('req.file', req.file);
    
    
    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#upload', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;
    logger.info(null, req, 'dataLoad.controller#upload', 'TODO: Fetch current user id');
    // let currentUserId = null;
    logger.warn(null, req, 'dataLoad.controller#upload', 'Using hardcoded user id [5c9eafbfecdaff977f7184b1]');
    let currentUserId = mongoose.Types.ObjectId("5c9eafbfecdaff977f7184b1");

    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        // .count()
        .exec((err, dataLoadInProgress) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#upload', 'Error trying to count current DataLoad');
                return res.json({
                    "error": true,
                    "message": req.__('data-load.error.upload.check-in-progress')
                });
                //TODO: Error
            }
            if (dataLoadInProgress) {
                //DataLoad in progress; error!
                return res.json({
                    "error": true,
                    "message": req.__('data-load.error.upload.data-load-in-progress'),
                    data: DataLoad.toJson(dataLoadInProgress)
                });
            }
            
            // paymentExcelReader.readObject(excelObject, req, (err, result) => {
            
            // TODO: fetch current organization id
            let organizationId = null;
            
            let reader = new ContractExcelReader(organizationId);
            
            try {
                reader.readBuffer(req.file.buffer)
                    .then((dataLoad) => {
                        // console.log('dataLoad', dataLoad);
                        
                        //Assign filename
                        dataLoad.filename = req.file.originalname;
                        //Assign current user
                        dataLoad.uploadedBy = currentUserId;
                        
                        dataLoad.summary = DataLoad.getSummary(dataLoad);
                        
                        dataLoad.save((err) => {
                            if (err) {
                                //TODO: Handle err
                                console.log('save err', err);
                                // return res.json(...);
                            }


                            DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {

                                return res.json({
                                    error: false,
                                    //TODO: Success message
                                    // "message": "Success!",
                                    data: dataLoadInfo
                                });
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
        });
};


var multer  = require('multer');
var upload = multer();

exports.beforeUpload = upload.single('file');

exports.current = (req, res, next) => {
    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#currentInfo', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;

    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .populate({
            path: 'uploadedBy',
            model: 'User',
            select: 'name lastName'
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: false,
                    data: null
                });
            }

            return res.json({
                error: false,
                data: /*{
                    filename: dataLoad.filename,
                    data: dataLoad.data,
                    uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
                    createdAt: dataLoad.createdAt
                }*/DataLoad.toJson(dataLoad)
            });
        });
};


exports.currentInfo = (req, res, next) => {
    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#currentInfo', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;

    DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
        return res.json({
            error: false,
            data: dataLoadInfo
        });
    });

    // DataLoad
    //     .findOne({
    //         organization: currentOrganizationId,
    //         confirmed: false,
    //         'deleted.isDeleted': {'$ne': true}
    //     })
    //     .populate({
    //         path: 'uploadedBy',
    //         model: 'User',
    //         select: 'name lastName'
    //     })
    //     .exec((err, dataLoad) => {
    //         if (err) {
    //             logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
    //         }
    //
    //
    //         DataLoad
    //             .findOne({
    //                 organization: currentOrganizationId,
    //                 confirmed: true,
    //                 'deleted.isDeleted': {'$ne': true}
    //             })
    //             .populate({
    //                 path: 'uploadedBy',
    //                 model: 'User',
    //                 select: 'name lastName'
    //             })
    //             .sort({
    //                 modifiedAt: -1
    //             })
    //             .exec((err, recentDataLoad) => {
    //                
    //                 let data = {};
    //
    //                 if (dataLoad) {
    //                     data.current = {
    //                         uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
    //                         createdAt: dataLoad.createdAt
    //                     };
    //                 }
    //                
    //                 if (recentDataLoad) {
    //                     data.recent = {
    //                         recentUploadedBy: `${recentDataLoad.uploadedBy.name} ${recentDataLoad.uploadedBy.lastName}`,
    //                         recentConfirmedAt: recentDataLoad.confirmedAt
    //                     };
    //                 }
    //                 return res.json({
    //                     error: false,
    //                     data: data
    //                 });
    //             });
    //        
    //     });
    
};

exports.cancelCurrent = (req, res, next) => {

    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#cancelCurrent', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;

    logger.info(null, req, 'dataLoad.controller#cancelCurrent', 'TODO: Fetch current user id');
    let currentUserId = null;
    
    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: true,
                    message: req.__('data-load.cancel.error.no-data-load-in-progress'),
                    data: null
                });
            }

            dataLoad.deleted = {
                isDeleted: true,
                user: currentUserId,
                date: new Date()
            };
            
            dataLoad.save((err) => {
                if (err) {
                    logger.error(err, req, 'dataLoad.controller#cancelCurrent', 'Ocurrió un error inesperado al borrar el DataLoad con id [%j]', dataLoad._id);
                    return res.json({
                        error: false,
                        message: req.__('data-load.cancel.error.unexpected'),
                        data: null
                    });
                }
                
                DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
                    //We just canceled/deleted the current DataLoad. To avoid race conditions, we ensure that the dataLoadInfo returned has no "current" value
                    logger.warn(null, req, 'dataLoad.controller#cancelCurrent', 'We just canceled/deleted the current DataLoad. To avoid race conditions, we ensure that the dataLoadInfo returned has no "current" value');
                    dataLoadInfo.current = null;
                    
                    return res.json({
                        error: false,
                        message: req.__('data-load.cancel.success'),
                        data: dataLoadInfo
                    });
                });
                
            });

        });
};