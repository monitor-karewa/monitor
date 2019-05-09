const mongoose = require('mongoose');

const ContractExcelReader = require('./../components/dataLoader').ContractExcelReader;
const ContractExcelWriter = require('./../components/dataLoader').ContractExcelWriter;
const DataLoad = require('./../models/dataLoad.model').DataLoad;

const logger = require('./../components/logger').instance;


/**
 * Carga un archivo con información a ser procesada.
 * @param req
 * @param res
 * @param next
 */
exports.upload = (req, res, next) => {

    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#upload', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;
    logger.info(null, req, 'dataLoad.controller#upload', 'TODO: Fetch current user id');
    // let currentUserId = null;
    logger.warn(null, req, 'dataLoad.controller#upload', 'Using hardcoded user id [5c9eafbfecdaff977f7184b1]');
    let currentUserId = mongoose.Types.ObjectId("5c9eafbfecdaff977f7184b1");
    
    //Optional id, received when reuploading corrections to the data previously uploaded
    let idDataLoad = null;
    if (req.body.idDataLoad) {
        idDataLoad = mongoose.Types.ObjectId(req.body.idDataLoad);
    }

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

            //If a DataLoad is currently in progress, and it's not a reupload of corrections to the data
            if (dataLoadInProgress && dataLoadInProgress._id.toString() !== (idDataLoad || '').toString()) {
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
            
            let reader = new ContractExcelReader(organizationId, idDataLoad);
            
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
                                return res.json({
                                    "error": true,
                                    "message": req.__('data-load.error.upload')
                                    // "data": savedOrganization
                                });
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

/**
 * Download an Excel file with annotations to fix them.
 * @param req
 * @param res
 * @param next
 */
exports.download = (req, res, next) => {

    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#download', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;
    
    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .populate({
            path: 'details',
            model: 'DataLoadDetail'
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#download', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: true,
                    data: null
                });
            }
            
            new ContractExcelWriter(dataLoad)
                .sendFileAsDownload(req, res);

            // return res.json({
            //     error: false,
            //     data: /*{
            //      filename: dataLoad.filename,
            //      data: dataLoad.data,
            //      uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
            //      createdAt: dataLoad.createdAt
            //      }*/DataLoad.toJson(dataLoad)
            // });
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
        .populate({
            path: 'details',
            model: 'DataLoadDetail'
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

exports.confirmCurrent = (req, res, next) => {

    //TODO: Fetch current organization id
    logger.info(null, req, 'dataLoad.controller#cancelCurrent', 'TODO: Fetch current organization id');
    let currentOrganizationId = null;
    
    DataLoad
        .findOne({
            organization: currentOrganizationId,
            confirmed: false,
            'deleted.isDeleted': {'$ne': true}
        })
        .populate({
            path: 'details',
            model: 'DataLoadDetail'
        })
        .exec((err, dataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
            }

            if (!dataLoad) {
                return res.json({
                    error: true,
                    message: req.__('data-load.confirm.error.no-data-load-in-progress'),
                    data: null
                });
            }

            DataLoad.confirm(dataLoad, (err, confirmResults) => {
                console.log('confirmResults', confirmResults);

                if (err) {
                    return res.json({
                        error: true,
                        data: null
                    });
                }
                
                DataLoad.dataLoadInfo(currentOrganizationId, (err, dataLoadInfo) => {
                    if (err) {
                        logger.error(err, req, 'dataLoad.controller#currentInfo', 'Error trying to fetch current DataLoad info');
                    }
                    
                    //To ensure no race conditions from reloading from the database, the current DataLoad is forced as undefined
                    dataLoadInfo.current = null;
                    
                    return res.json({
                        error: false,
                        data: dataLoadInfo
                    });
                });


            });

        });
};