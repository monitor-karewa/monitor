const mongoose = require('mongoose');
const Schema = mongoose.Schema;

variableSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    simbolo: {
        type: String,
        required: true,
        index: {unique: true}
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
    //TODO: definir campos faltantes
});

const formulaSchema = new Schema({
    expresion: {
        type: String,
        required: true
    },
    variables: [variableSchema]
});

const {check } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo Calculo.
 * @type {mongoose.Schema}
 */
let CalculoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['GENERAL', 'CONTRATO']
    },
    habilitado: {
        type: Boolean,
        required: true
    },
    notas: {
        type: String,
        required: true
    },
    // formula: {
    //     type: formulaSchema,
    //     required: false
    // },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
CalculoSchema.plugin(pluginCreatedUpdated);

//Paginación
CalculoSchema.plugin(mongoosePagination);

//Clase del modelo Calculo.
class CalculoClass {
    constructor() {

    }
}

//Cargar class en Schema
CalculoSchema.loadClass(CalculoClass);

CalculoSchema.statics.permission = permissions.getDefault("Calculo");

CalculoSchema.statics.expressValidator = function () {

    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators

    //For more information about express-validator:
    //https://express-validator.github.io/docs/

    return true
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()

};

const Calculo = mongoose.model('Calculo', CalculoSchema);

module.exports = {
    Calculo
};