const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

const variableSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        index: {unique: true}
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    //TODO: definir campos faltantes
});

const formulaSchema = new Schema({
    expression: {
        type: String,
        required: true
    },
    variables: [variableSchema]
});

/**
 * Schema de Mongoose para el modelo Calculation.
 * @type {mongoose.Schema}
 */
let CalculationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['GENERAL', 'CONTRACT']
    },
    enabled: {
        type: Boolean,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
CalculationSchema.plugin(pluginCreatedUpdated);

//Paginación
CalculationSchema.plugin(mongoosePagination);

//Clase del modelo Calculation.
class CalculationClass {
    constructor() {

    }
}

//Cargar class en Schema
CalculationSchema.loadClass(CalculationClass);

CalculationSchema.statics.permission = permissions.getDefault("Calculation");

CalculationSchema.statics.expressValidator = function() {
    
    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators
    
    //For more information about express-validator:
    //https://express-validator.github.io/docs/
    
    return [
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

const Calculation = mongoose.model('Calculation', CalculationSchema);

module.exports = {
    Calculation
};