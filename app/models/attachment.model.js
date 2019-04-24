const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo Recurso.
 * @type {mongoose.Schema}
 */gridfs
let AttachmentSchema = new Schema({
});

//Agregar createdAt, modifiedAt automáticamente
AttachmentSchema.plugin(pluginCreatedUpdated);


//Clase del modelo Recurso.
class AttachmentClass {
    constructor() {

    }
}

//Cargar class en Schema
AttachmentSchema.loadClass(AttachmentClass);

AttachmentSchema.statics.permission = permissions.getDefault("Recurso");

AttachmentSchema.statics.expressValidator = function() {

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

const Attachment = mongoose.model('Attachment', AttachmentSchema);

module.exports = {
    Attachment
};
