const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');
const utils = require('../components/utils');


//TODO Usar Regex para aceptar mayusculas, minusculas y acentos
const permissions = require('./../components/permissions');

//RECUERDA USAR LA MISMA EXPRESION REGULAR AL BUSCAR POR ALGUNO DE ESTOS ENUMS
const procedureTypesEnum = [
    utils.toAccentsRegex('PUBLICA',"i"),
    utils.toAccentsRegex('ADJ DIRECTA', "i"),
    utils.toAccentsRegex('POR INVITACION',"i")
];
//TODO:Agrgar todos los valroes que vienen en la columna de materia
const categoryEnum = [
    utils.toAccentsRegex('AMPLIACION', "i"),
    utils.toAccentsRegex('MODIFICACION', "i"),
    utils.toAccentsRegex('ADENDUM',"i")
];
const procedureStateEnum = [
    utils.toAccentsRegex('CONCLUIDO', "i"),
    utils.toAccentsRegex('CANCELADO', "i"),
    utils.toAccentsRegex('DESIERTO', "i"),
    utils.toAccentsRegex('EN_PROCESO', "i")
];
const administrativeUnitTypeEnum = [
    utils.toAccentsRegex('CENTRALIZADA', "i"),
    utils.toAccentsRegex('DESCENTRALIZADA', "i")
];
const limitExceededEnum = [
    utils.toAccentsRegex('NO EXCEDE EL LIMITE', "i"),
    utils.toAccentsRegex('EXCEDE EL LIMITE', "i")
];
/**
 * Schema de Mongoose para el modelo Contract.
 * @type {mongoose.Schema}
 */

//TODO: Preguntar cual es el numero de expediente, folio, nomenclatura(es igual al contractId)
//TODO: Agregar tipo de contrato (Si agregar)

let ContractSchema = new Schema({
    procedureType: {
        type: String,
        enum:procedureTypesEnum,
        required: true,
        uppercase:true
    },
    category: {
        type: String,
        enum: categoryEnum,
        required: function(){
            let descriptionRegExp = utils.toAccentsRegex(this.servicesDescription.toUpperCase(),'i');
            return descriptionRegExp.test(this.category);
        },
        uppercase:true
    },
    administration: {
        required:true,
        match:new RegExp("^[12][0-9]{3}-[12][0-9]{3}$")
    },
    //OR exercise, practice, test
    fiscalYear: {
        type:String,
        required:true,
        match:new RegExp("^[12][0-9]{3}")
    },
    period: {
        type:String,
        required:true,
        match:new RegExp("^[1234]o\\s2[0-9]{3}$")
    },
    contractId:{
        type:String,
        required:true,
        //TODO:Definir otro Id que sea karewaId(Pendiente)
        //TODO:Definir el formato que debe llevar el ID(Dejarlo Libre)
    },
    //OR departure, game
    partida: {
        type:String
    },
    procedureState: {
        type:String,
        enum:procedureStateEnum,
        // required:true,
        required:function(){
            let descriptionRegExp = utils.toAccentsRegex(this.notes.toUpperCase(),'i');
            return descriptionRegExp.test(this.procedureType);
        },
        uppercase:true
    },
    announcementUrl:{
        type:String
    },
    announcementDate:{
        type:Date
    },
    servicesDescription:{
        type:String,
        required:true
    },
    clarificationMeetingDate:{
        type:Date,
    },
    clarificationMeetingJudgmentUrl:{
        type:String,
    },
    presentationProposalsDocUrl:{
        type:String
    },
    // FechaEnLaQueSeCelebroLaJuntaDeAclaraciones
    //DateInWhereTheClarificationMeetingWasCelebrated
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    organizerAdministrativeUnit: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: true,
        validator: function(){
            return this.administrativeUnitType === 'DESCENTRALIZADA' ? this.organizerAdministrativeUnit == this.applicantAdministrativeUnit : true
        }
    },
    applicantAdministrativeUnit: {
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: true
    },
    administrativeUnitType:{
        type:String,
        enum:administrativeUnitTypeEnum,
        required:true,
        uppercase:true
    },
    contractNumber:{
       type:String,
        unique:true
    },
    contractDate:{
        type:Date,
        required:true,
        validator: function(){
            let yearContractDate = new Date(this.contractDate).getFullYear();
            let fiscalYear = Number(this.fiscalYear);
            return yearContractDate === fiscalYear;
        }
    },
    contractType:{
      type:String,
      enum:[]
    },
    totalAmount:{
        type:Number
    },
    minAmount:{
        type:Number
    },
    maxAmount:{
        type:Number,
    },
    totalOrMaxAmount:{
        type:Number,
        required:true
        // Si es NORMAL - es el monto total
        // Si es ABIERTO - es el monto máximo
    },
    contractUrl:{
        type:String
        // required:true
    },
    areaInCharge:{
        type: Schema.Types.ObjectId,
        ref: 'AdministrativeUnit',
        required: true
    },
    actualizationDate:{
        type:Date,
        required:true
    },
    notes:{
        type:String
    },
    karewaNotes:{
        type:String
    },
    informationDate:{
        type:Date,
        required:true
    },
    limitExceeded:{
        type:String,
        enum:limitExceededEnum,
        required:true,
        uppercase:true
    },
    amountExceeded:{
        type:Number
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

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

ContractSchema.statics.expressValidator = function() {
    
    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators
    
    //For more information about express-validator:
    //https://express-validator.github.io/docs/
    
    return [
        //TODO change this
        check('supplier').isLength({
            min: 2,
            max: 100
        })
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

const Contract = mongoose.model('Contract', ContractSchema);

module.exports = {
    Contract
};