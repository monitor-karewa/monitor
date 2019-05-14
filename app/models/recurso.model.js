const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo Recurso.
 * @type {mongoose.Schema}
 */
let RecursoSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    clasificacion: {
        type: String,
        enum: ['MARCO LEGAL', 'ARTICULO', 'NOTAS'],
        required: true
    },
    enlace: {
        type:String,
        required: true
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
RecursoSchema.plugin(pluginCreatedUpdated);

//Paginación
RecursoSchema.plugin(mongoosePagination);

//Clase del modelo Recurso.
class RecursoClass {
    constructor() {

    }
}

//Cargar class en Schema
RecursoSchema.loadClass(RecursoClass);

RecursoSchema.statics.permission = permissions.getDefault("Recurso");

RecursoSchema.statics.expressValidator = function() {
    
    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators
    
    //For more information about express-validator:
    //https://express-validator.github.io/docs/
    
    return [
        // check('titulo').isLength({
        //     min: 2,
        //     max: 100
        // })
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        check('enlace').isURL().withMessage('Verifica que la URL del enlace es válido')
    ]
};

const Recurso = mongoose.model('Recurso', RecursoSchema);

module.exports = {
    Recurso
};