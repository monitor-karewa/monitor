const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo UnidadAdministrativa.
 * @type {mongoose.Schema}
 */
let UnidadAdministrativaSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    notas: {
        type: String,
        required: true
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
UnidadAdministrativaSchema.plugin(pluginCreatedUpdated);

//Paginación
UnidadAdministrativaSchema.plugin(mongoosePagination);

//Clase del modelo UnidadAdministrativa.
class UnidadAdministrativaClass {
    constructor() {

    }
}

//Cargar class en Schema
UnidadAdministrativaSchema.loadClass(UnidadAdministrativaClass);

UnidadAdministrativaSchema.statics.permission = permissions.getDefault("UnidadAdministrativa");

UnidadAdministrativaSchema.statics.expressValidator = function() {
    
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

const UnidadAdministrativa = mongoose.model('UnidadAdministrativa', UnidadAdministrativaSchema);

module.exports = {
    UnidadAdministrativa
};