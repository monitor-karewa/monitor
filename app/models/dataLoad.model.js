const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

/**
 * Schema de Mongoose para el modelo DataLoad.
 * @type {mongoose.Schema}
 */
let DataLoadSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        // required: true
        required: false
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmedAt: {
        type: Date
    },
    filename: {
        
    },
    data: [{}],
    summary: {
        newContractsCount: {
            type: Number,
            default: 0
        },
        newSuppliersCount: {
            type: Number,
            default: 0
        },
        newAdministrativeUnitsCount: {
            type: Number,
            default: 0
        },
        skippedContractsCount: {
            type: Number,
            default: 0
        },
        skippedSuppliersCount: {
            type: Number,
            default: 0
        },
        skippedAdministrativeUnitsCount: {
            type: Number,
            default: 0
        },
        errorsCount: {
            type: Number,
            default: 0
        },
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
DataLoadSchema.plugin(pluginCreatedUpdated);

//Clase del modelo DataLoad.
class DataLoadClass {
    constructor() {
        
    }
}

DataLoadSchema.statics.toJson = function (dataLoad) {
    return {
        filename: dataLoad.filename,
        data: dataLoad.data,
        uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
        createdAt: dataLoad.createdAt
    };
};

DataLoadSchema.statics.getSummary = function (dataLoad) {
    //TODO: Calculate summary

    let newContractsCount = 0;
    let newSuppliersCount = 0;
    let newAdministrativeUnitsCount = 0;
    
    let skippedContractsCount = 0;
    let skippedSuppliersCount = 0;
    let skippedAdministrativeUnitsCount = 0;
    
    let errorsCount = 0;
    
    let addedSuppliers = {};
    let addedAdministrativeUnits = {};

    dataLoad.data.forEach((rowInfo) => {
        if (rowInfo.summary.hasErrors) {
            errorsCount++;
        }
        
        if (rowInfo.summary.skipRow) {
            skippedContractsCount++;
        } else {
            newContractsCount++;
        }

        if (rowInfo.supplierName.shouldCreateDoc) {
            if (!addedSuppliers[rowInfo.supplierName.value]) {
                addedSuppliers[rowInfo.supplierName.value] = true;
                newSuppliersCount++;
            }
        } else {
            skippedSuppliersCount++;
        }

        if (rowInfo.organizerAdministrativeUnit.shouldCreateDoc) {
            if (!addedAdministrativeUnits[rowInfo.organizerAdministrativeUnit.value]) {
                addedAdministrativeUnits[rowInfo.organizerAdministrativeUnit.value] = true;
                newAdministrativeUnitsCount++;
            }
        } else {
            skippedAdministrativeUnitsCount++;
        }

        if (rowInfo.applicantAdministrativeUnit.shouldCreateDoc) {
            if (!addedAdministrativeUnits[rowInfo.applicantAdministrativeUnit.value]) {
                addedAdministrativeUnits[rowInfo.applicantAdministrativeUnit.value] = true;
                newAdministrativeUnitsCount++;
            }
        } else {
            skippedAdministrativeUnitsCount++;
        }

        if (rowInfo.areaInCharge.shouldCreateDoc) {
            if (!addedAdministrativeUnits[rowInfo.areaInCharge.value]) {
                addedAdministrativeUnits[rowInfo.areaInCharge.value] = true;
                newAdministrativeUnitsCount++;
            }
        } else {
            skippedAdministrativeUnitsCount++;
        }
    });
    
    return {
        newContractsCount: newContractsCount,
        newSuppliersCount: newSuppliersCount,
        newAdministrativeUnitsCount: newAdministrativeUnitsCount,
        skippedContractsCount: skippedContractsCount,
        skippedSuppliersCount: skippedSuppliersCount,
        skippedAdministrativeUnitsCount: skippedAdministrativeUnitsCount,
        errorsCount: errorsCount
    };
};

DataLoadSchema.statics.dataLoadInfo = function (currentOrganizationId, callback) {

    this
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
        .select({
            data: 0
        })
        .exec((err, currentDataLoad) => {
            if (err) {
                logger.error(err, req, 'dataLoad.model#dataLoadInfo', 'Error trying to fetch current DataLoad info');
            }

            console.log('dataLoad', currentDataLoad);

            this
                .findOne({
                    organization: currentOrganizationId,
                    confirmed: true,
                    'deleted.isDeleted': {'$ne': true}
                })
                .populate({
                    path: 'uploadedBy',
                    model: 'User',
                    select: 'name lastName'
                })
                .sort({
                    modifiedAt: -1
                })
                .select({
                    uploadedBy: 1,
                    confirmedAt: 1
                })
                .exec((err, recentDataLoad) => {

                    let dataLoadInfo = {};

                    if (currentDataLoad) {
                        dataLoadInfo.current = {
                            summary: currentDataLoad.summary,
                            uploadedBy: `${currentDataLoad.uploadedBy.name} ${currentDataLoad.uploadedBy.lastName}`,
                            createdAt: currentDataLoad.createdAt
                        };
                    }

                    if (recentDataLoad) {
                        dataLoadInfo.recent = {
                            recentUploadedBy: `${recentDataLoad.uploadedBy.name} ${recentDataLoad.uploadedBy.lastName}`,
                            recentConfirmedAt: recentDataLoad.confirmedAt
                        };
                    }
                    
                    callback(null, dataLoadInfo);
                });

        });
};

//Cargar class en Schema
DataLoadSchema.loadClass(DataLoadClass);

//Indexes
DataLoadSchema.index({organization: 1, confirmed: 1, deleted: 1}, {unique: false});

const DataLoad = mongoose.model('DataLoad', DataLoadSchema);

module.exports = {
    DataLoad
};