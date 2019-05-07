const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

/**
 * Schema de Mongoose para el modelo DataLoadDetail.
 * @type {mongoose.Schema}
 */
let DataLoadDetailSchema = new Schema({
    data: {}
});

//Agregar createdAt, modifiedAt automáticamente
DataLoadDetailSchema.plugin(pluginCreatedUpdated);

//Clase del modelo DataLoadDetail.
class DataLoadDetailClass {
    constructor() {

    }
}

//Cargar class en Schema
DataLoadDetailSchema.loadClass(DataLoadDetailClass);

const DataLoadDetail = mongoose.model('DataLoadDetail', DataLoadDetailSchema);

module.exports = {
    DataLoadDetail
};