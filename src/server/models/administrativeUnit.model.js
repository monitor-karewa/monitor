const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo AdministrativeUnit.
 * @type {mongoose.Schema}
 */
let AdministrativeUnitSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    deleted: require("./schemas/deleted.schema").Deleted
});



//Agregar createdAt, modifiedAt automáticamente
AdministrativeUnitSchema.plugin(pluginCreatedUpdated);

//Paginación
AdministrativeUnitSchema.plugin(mongoosePagination);

//Clase del modelo AdministrativeUnit.
class AdministrativeUnitClass {
    constructor() {

    }
}

//Cargar class en Schema
AdministrativeUnitSchema.loadClass(AdministrativeUnitClass);

//Indexes
AdministrativeUnitSchema.index({name: 1, organization: 1, deleted: 1}, {unique: true});

AdministrativeUnitSchema.statics.permission = permissions.getDefault("AdministrativeUnit");

AdministrativeUnitSchema.statics.expressValidator = function() {
    
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

const AdministrativeUnit = mongoose.model('AdministrativeUnit', AdministrativeUnitSchema);

module.exports = {
    AdministrativeUnit
};