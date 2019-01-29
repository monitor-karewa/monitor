const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo <%= modelName %>.
 * @type {mongoose.Schema}
 */
let <%= modelName %>Schema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
<%= modelName%>Schema.plugin(pluginCreatedUpdated);

//Paginación
<%= modelName%>Schema.plugin(mongoosePagination);

//Clase del modelo <%= modelName %>.
class <%= modelName %>Class {
    constructor() {

    }
}

//Cargar class en Schema
<%= modelName %>Schema.loadClass(<%= modelName %>Class);

<%= modelName %>Schema.statics.permission = permissions.getDefault("<%= modelName %>");

<%= modelName %>Schema.statics.expressValidator = function() {
    
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

const <%= modelName %> = mongoose.model('<%= modelName %>', <%= modelName %>Schema);

module.exports = {
    <%= modelName %>
};