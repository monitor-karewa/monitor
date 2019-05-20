const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');
const utils = require('./../components/utils');

const classificationEnumDict = {
    'ARTICLE': [
        {
            regexStr: utils.toAccentsRegex('articulo(s)?', null, true),
            flags: 'gi'
        },
    ],
    'NOTES': [
        {
            regexStr: utils.toAccentsRegex('nota(s)?', null, true),
            flags: 'gi'
        },
    ],
    'LEGAL_FRAMEWORK': [
        {
            regexStr: utils.toAccentsRegex('marco( legal)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('(marco )?legal', null, true),
            flags: 'gi'
        },
        // utils.toAccentsRegex('publico', 'gi')
    ],
    'WEBSITE': [
        {
            regexStr: utils.toAccentsRegex('sitio( web)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('pagina( web)?', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('web', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('url', null, true),
            flags: 'gi'
        },
        {
            regexStr: utils.toAccentsRegex('enlace', null, true),
            flags: 'gi'
        },
    ],
};

const classificationEnum = Object.keys(classificationEnumDict);

/**
 * Schema de Mongoose para el modelo Resource.
 * @type {mongoose.Schema}
 */
let ResourceSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        enum: classificationEnum,
        required: true
    },
    url: {
        type:String,
        required: false
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: false
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
ResourceSchema.plugin(pluginCreatedUpdated);

//Paginación
ResourceSchema.plugin(mongoosePagination);

//Clase del modelo Resource.
class ResourceClass {
    constructor() {

    }
}

//Cargar class en Schema
ResourceSchema.loadClass(ResourceClass);

//Indexes
ResourceSchema.index({title: 1, classification: 1, organization: 1, deleted: 1}, {unique: true});

ResourceSchema.statics.permission = permissions.getDefault("Resource");

ResourceSchema.statics.expressValidator = function() {
    
    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators
    
    //For more information about express-validator:
    //https://express-validator.github.io/docs/
    
    return [
        //TODO: i18n
        check('url').isURL().withMessage('Verifica que la URL del enlace es válido')
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

const Resource = mongoose.model('Resource', ResourceSchema);

module.exports = {
    Resource,
    classificationEnumDict,
    classificationEnum
};