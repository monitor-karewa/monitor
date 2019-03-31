const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo Contract.
 * @type {mongoose.Schema}
 */
let ContractSchema = new Schema({
    supplier: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    administrativeUnit: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    amount: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    procedureType: {
        type: String,
        required: true,
        min: 2,
        max: 100
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
        check('name').isLength({
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