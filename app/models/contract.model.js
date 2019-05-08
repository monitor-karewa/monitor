const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');
const utils = require('../components/utils');


const permissions = require('./../components/permissions');

const procedureTypesEnum = [
    'PUBLIC',
    'NO_BID',
    'INVITATION'
];
const categoryEnum = [
    'EXTENSION',
    'MODIFICATION',
    'ADENDUM',
    'ACQUISITION',
    'SERVICES',
    'LEASE',
    'PUBLIC_WORKS'
];
const procedureStateEnum = [
    'CONCLUDED',
    'CANCELED',
    'DESERTED',
    'IN_PROGRESS',
];
const administrativeUnitTypeEnum = [
    'CENTRALIZED',
    'DESCENTRALIZED'
];
const limitExceededEnum = [
    'NOT_EXCEEDED',
    'LIMIT_EXCEEDED'
];

const contractType = [
    'OPEN',
    'NORMAL'
];
/**
 * Schema de Mongoose para el modelo Contract.
 * @type {mongoose.Schema}
 */



function  getProcedureTypesEnumObject () {
    switch (this.procedureType) {
        case 'PUBLIC':
            return {description: "Público", key: "PUBLIC"};
        case 'NO_BID':
            return {description: "Adjudicación directa", key: "NO_BID"};
        case 'INVITATION':
            return {description: "Por Invitación", key: "INVITATION"};
    }
}
getCategoryEnumObject = function () {
    switch (this.category) {
        case 'EXTENSION':
            return {description: "Extensión", key: "EXTENSION"};
        case 'MODIFICATION':
            return {description: "Modificación", key: "MODIFICATION"};
        case 'ADENDUM':
            return {description: "Adendum", key: "ADENDUM"};
        case 'ACQUISITION':
            return {description: "Adquisición", key: "ACQUISITION"};
        case 'SERVICES':
            return {description: "Servicios", key: "SERVICES"};
        case 'LEASE':
            return {description: "Arrendamiento", key: "LEASE"};
        case 'PUBLIC_WORKS':
            return {description: "Obra Pública", key: "PUBLIC_WORKS"};
        default: return {}
    }
}
getProcedureStateEnumObject = function () {
    switch (this.procedureState) {
        case 'CONCLUDED':
            return {description: "Concluído", key: "CONCLUDED"};
        case 'CANCELED':
            return {description: "Cancelado", key: "CANCELED"};
        case 'DESERTED':
            return {description: "Desierto", key: "DESERTED"};
        case 'IN_PROGRESS':
            return {description: "En progreso", key: "IN_PROGRESS"};
    }
}
getAdministrativeUnitTypeEnumObject = function () {
    switch (this.administrativeUnitType) {
        case 'CENTRALIZED':
            return {description: "Centralizado", key: "CENTRALIZED"};
        case 'DESCENTRALIZED':
            return {description: "Descentralizado", key: "DESCENTRALIZED"};
    }
}
getLimitExceededEnumObject = function () {
    if (this.limitExceeded) {
        return {description: "Límite Excedido", key: "LIMIT_EXCEEDED"};
    }
    return {description: "No excedido", key: "NOT_EXCEEDED"};
}
getContractTypeEnumObject = function () {
    switch (this.contractType) {

        case 'OPEN':
            return {description: "Abierto", key: "OPEN"};
        case 'NORMAL':
            return {description: "Normal", key: "NORMAL"};
    }
}


let ContractSchema = new Schema({
    /* Tipo de procedimiento */
    procedureType: {
        type: String,
        enum: procedureTypesEnum,
        required: true,
        uppercase: true
    },
    /* Materia */
    category: {
        type: String,
        enum: categoryEnum,
        required: function () {
            let descriptionRegExp = utils.toAccentsRegex(this.servicesDescription.toUpperCase(), 'i');
            return descriptionRegExp.test(this.category);
        },
        uppercase: true
    },
    /* Administracion */
    administrationPeriod: {
        type: String,
        required: true,
        match: new RegExp("^[12][0-9]{3}-[12][0-9]{3}$")
    },
    /* Ejercicio */
    fiscalYear: {
        type: String,
        required: true,
        match: new RegExp("^[12][0-9]{3}")
    },
    /* Periodo que se reporta */
    period: {
        type: String,
        required: true,
        match: new RegExp("^[1234]o\\s2[0-9]{3}$")
    },
    /* ID / Número de Folio o Nomenclatura / Identificador */
    contractId: {
        type: String,
        //TODO:Definir otro Id aparte que sea karewaId(Pendiente)
        //TODO:Definir el formato que debe llevar el ID(Dejarlo Libre)
    },
    /* Partida */
    partida: {
        type: String
    },
    /* Estado del procedimiento */
    procedureState: {
        type: String,
        enum: procedureStateEnum,
        // required:true,
        required: function () {
            let descriptionRegExp = utils.toAccentsRegex(this.notes.toUpperCase(), 'i');
            return descriptionRegExp.test(this.procedureType);
        },
        uppercase: true
    },
    /*Hipervínculo a la convocatoria o invitaciones*/
    announcementUrl:{
        //TODO: match regex?
        type:String
    },
    /* Fecha de la convocatoria o invitación */
    announcementDate:{
        //TODO: required?
        type:Date
    },
    /* Descripción de las obras, bienes o servicios */
    servicesDescription: {
        type: String,
        required: true
    },
    /* Fecha en la que se celebró la junta de aclaraciones */
    clarificationMeetingDate:{
        //TODO: required?
        type:Date,
    },
    /* Hipervínculo al fallo de Junta de Aclaraciones */
    clarificationMeetingJudgmentUrl:{
        //TODO: match regex?
        type:String,
    },
    /* Hipervínculo al documento de la Presentación de Propuestas */
    presentationProposalsDocUrl:{
        //TODO: match regex?
        type:String
    },
    /* Proveedor */
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    /* Unidad administrativa convocante */
    organizerAdministrativeUnit: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: true,
        validator: function () {
            return this.administrativeUnitType === 'DESCENTRALIZADA' ? this.organizerAdministrativeUnit == this.applicantAdministrativeUnit : true
        }
    },
    /* Unidad administrativa solicitante */
    applicantAdministrativeUnit: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: true
    },
    /* Centralizada/Descentralizada */
    administrativeUnitType: {
        type: String,
        enum: administrativeUnitTypeEnum,
        required: true,
        uppercase: true
    },
    /* Número que identifique al contrato */
    contractNumber:{
        //TODO: Required?
       type:String,
        unique:true
    },
    /* Fecha del contrato */
    contractDate: {
        type: Date,
        required: true,
        validator: function () {
            let yearContractDate = new Date(this.contractDate).getFullYear();
            let fiscalYear = Number(this.fiscalYear);
            return yearContractDate === fiscalYear;
        }
    },
    /* Tipo de Contrato */
    contractType: {
        type: String,
        enum: contractType,
        required: true
    },
    /* Monto total del contrato con impuestos incluidos */
    totalAmount: {
        type: Number
    },
    /* Monto mínimo, en su caso */
    minAmount: {
        type: Number
    },
    /* Monto máximo, en su caso */
    maxAmount: {
        type: Number,
    },

    /* Monto total o Monto máximo, en su caso */
    totalOrMaxAmount: {
        type: Number,
        required: true
        // Si es NORMAL - es el monto total
        // Si es ABIERTO - es el monto máximo
    },
    /*Hipervínculo al documento del contrato y anexos*/
    contractUrl:{
        //TODO: match uri?
        type : String
        // required:true
    },
    /*Área responsable de la información*/
    areaInCharge: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: true
    },
    /*Fecha de actualización*/
    updateDate: {
        type: Date,
        required: true
    },
    /*Notas*/
    notes: {
        type: String
    },
    /*Notas Karewa*/
    karewaNotes: {
        type: String
    },
    /*Fecha de obtención de los datos*/
    informationDate: {
        type: Date,
        required: true
    },
    /*Adjudicaciones Directas que exceden el límite*/
    limitExceeded: {
        type: Boolean
    },
    /*Monto que excede el límite de la Adjudicación Directa*/
    amountExceeded: {
        type: Number
    },
    deleted: require("./schemas/deleted.schema").Deleted,


});


    ContractSchema.virtual('procedureTypeEnumObject').get(getProcedureTypesEnumObject);
    ContractSchema.virtual('procedureStateEnumObject').get(getProcedureStateEnumObject);
    ContractSchema.virtual('administrativeUnitTypeEnumObject').get(getAdministrativeUnitTypeEnumObject);
    ContractSchema.virtual('contractTypeEnumObject').get(getContractTypeEnumObject);
    ContractSchema.virtual('categoryEnumObject').get(getCategoryEnumObject);

    ContractSchema.set('toObject', { virtuals: true });
    ContractSchema.set('toJSON', { virtuals: true });


//Agregar createdAt, modifiedAt automáticamente
ContractSchema.plugin(pluginCreatedUpdated);

//Paginación
ContractSchema.plugin(mongoosePagination);

//Clase del modelo Contract.
class ContractClass {
    constructor() {

    }
}

//Cargar class en Schema
ContractSchema.loadClass(ContractClass);

ContractSchema.statics.permission = permissions.getDefault("Contract");

ContractSchema.statics.expressValidator = function () {

    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators

    //For more information about express-validator:
    //https://express-validator.github.io/docs/

    return [
        //TODO change this
        // check('supplier').isLength({
        //     min: 2,
        //     max: 100
        // })
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

ContractSchema.index({contractNumber: 1, deleted: 1}, {unique: true});


const Contract = mongoose.model('Contract', ContractSchema);


module.exports = {
    Contract
};