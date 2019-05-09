const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

const Contract = require('./contract.model').Contract;

/**
 * Schema de Mongoose para el modelo DataLoadDetail.
 * @type {mongoose.Schema}
 */
let DataLoadDetailSchema = new Schema({
    confirmed: {
        type: Boolean,
        default: false,
        required: true
    },
    data: {}
});

//Agregar createdAt, modifiedAt automáticamente
DataLoadDetailSchema.plugin(pluginCreatedUpdated);

//Clase del modelo DataLoadDetail.
class DataLoadDetailClass {
    constructor() {

    }
}

DataLoadDetailSchema.statics.toContractObj = function (detailObj) {
    //Actual detail
    let detail = detailObj.data;
    
    if (detail.summary.hasErrors || detail.summary.skipRow) {
        return null;
    }

    return {
        detail: detail,
        // supplierId: 
        contract: {
            
            //enum
            procedureType: detail.procedureType.valueToSaveOverride,
            
            //enum
            category : detail.category.valueToSaveOverride,
            
            //Someone renamed the model name
            // administrationPeriod : detail.administrationPeriod.value,
            administrationPeriod : detail.administration.value,
            
            fiscalYear : detail.fiscalYear.value,
            period : detail.period.value,
            contractId : detail.contractId.value,
            partida : detail.partida.value,
            
            //enum
            procedureState : detail.procedureState.valueToSaveOverride,
            
            announcementUrl : detail.announcementUrl.value,
            announcementDate : detail.announcementDate.value,
            servicesDescription : detail.servicesDescription.value,
            clarificationMeetingDate : detail.clarificationMeetingDate.value,
            clarificationMeetingJudgmentUrl : detail.clarificationMeetingJudgmentUrl.value,
            presentationProposalsDocUrl : detail.presentationProposalsDocUrl.value,
            
            
            //ref
            supplier: detail.supplierName.valueToSaveOverride,
            //ref
            organizerAdministrativeUnit: detail.organizerAdministrativeUnit.valueToSaveOverride,
            //ref
            applicantAdministrativeUnit:  detail.applicantAdministrativeUnit.valueToSaveOverride,

            //enum
            administrativeUnitType : detail.administrativeUnitType.valueToSaveOverride,
            
            contractNumber : detail.contractNumber.value,
            contractDate : detail.contractDate.value,
            
            //enum
            // contractType : detail.contractType.valueToSaveOverride,
            contractType : 'OPEN',
            
            totalAmount : detail.totalAmount.value,
            minAmount : detail.minAmount.value,
            maxAmount : detail.maxAmount.value,
            totalOrMaxAmount : detail.totalOrMaxAmount.value,
            contractUrl : detail.contractUrl.value,
            
            //ref
            areaInCharge : detail.areaInCharge.valueToSaveOverride,
            
            // updateDate : detail.updateDate.value,
            updateDate : detail.actualizationDate.value,
            notes : detail.notes.value,
            karewaNotes : detail.karewaNotes.value,
            informationDate : detail.informationDate.value,

            //enum -> boolean
            limitExceeded : !!/no/gi.test(detail.limitExceeded.valueToSaveOverride),
            
            amountExceeded : detail.amountExceeded.value,
        }
    };
};

DataLoadDetailSchema.statics.toSuppliersArray = function (detailObj) {
    //Actual detail
    let detail = detailObj.data;
    
    if (detail.summary.hasErrors || detail.summary.skipRow) {
        return null;
    }
    
    
    //Match already found, no need to create
    if (!detail.supplierName.shouldCreateDoc) {
        return null;
    }
    
    return [
        {
            name: detail.supplierName.value,
            rfc: detail.supplierRfc.value
        }
    ]
};

DataLoadDetailSchema.statics.toAdministrativeUnitsArray = function (detailObj) {
    //Actual detail
    let detail = detailObj.data;
    
    if (detail.summary.hasErrors || detail.summary.skipRow) {
        return null;
    }
    
    let administrativeUnits = [];
    
    if (detail.organizerAdministrativeUnit.shouldCreateDoc) {
        administrativeUnits.push({
            name: detail.organizerAdministrativeUnit.value
        });
    }
    
    if (detail.applicantAdministrativeUnit.shouldCreateDoc) {
        administrativeUnits.push({
            name: detail.applicantAdministrativeUnit.value
        });
    }
    
    if (detail.areaInCharge.shouldCreateDoc) {
        administrativeUnits.push({
            name: detail.areaInCharge.value
        });
    }
    
    return administrativeUnits;
};

//Cargar class en Schema
DataLoadDetailSchema.loadClass(DataLoadDetailClass);

const DataLoadDetail = mongoose.model('DataLoadDetail', DataLoadDetailSchema);

module.exports = {
    DataLoadDetail
};