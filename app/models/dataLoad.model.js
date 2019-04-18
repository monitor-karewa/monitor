const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

/**
 * Schema de Mongoose para el modelo DataLoad.
 * @type {mongoose.Schema}
 */
let DataLoadSchema = new Schema({
    data: [{}],
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
DataLoadSchema.plugin(pluginCreatedUpdated);

//Clase del modelo DataLoad.
class DataLoadClass {
    constructor() {

    }
}

//Cargar class en Schema
DataLoadSchema.loadClass(DataLoadClass);

const DataLoad = mongoose.model('DataLoad', DataLoadSchema);

module.exports = {
    DataLoad
};