const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');

/**
 * Schema de Mongoose para el modelo <%= modelName %>.
 * @type {mongoose.Schema}
 */
let <%= modelName %>Schema = new Schema({
    name: {
        type: String,
        required: true
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

<%= modelName %>Schema.statics.validateRequestFields = function() {
    //TODO: Validate fields from request
};

const <%= modelName %> = mongoose.model('<%= modelName %>', <%= modelName %>Schema);

module.exports = {
    <%= modelName %>
};