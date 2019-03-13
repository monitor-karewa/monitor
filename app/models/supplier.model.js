const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo Supplier.
 * @type {mongoose.Schema}
 */
let SupplierSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    rfc: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
SupplierSchema.plugin(pluginCreatedUpdated);

//Paginación
SupplierSchema.plugin(mongoosePagination);

//Clase del modelo Supplier.
class SupplierClass {
    constructor() {

    }
}

//Cargar class en Schema
SupplierSchema.loadClass(SupplierClass);

SupplierSchema.statics.permission = permissions.getDefault("Supplier");

SupplierSchema.statics.expressValidator = function() {
    
    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators
    
    //For more information about express-validator:
    //https://express-validator.github.io/docs/
    
    return [
        check('rfc').matches(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/).withMessage('Verifica que el RFC es válido')
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

const Supplier = mongoose.model('Supplier', SupplierSchema);

module.exports = {
    Supplier
};