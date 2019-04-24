const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

/**
 * Schema de Mongoose para el modelo DataLoad.
 * @type {mongoose.Schema}
 */
let DataLoadSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        // required: true
        required: false
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    filename: {
        
    },
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

DataLoadSchema.statics.toJson = (dataLoad) => {
    return {
        filename: dataLoad.filename,
        data: dataLoad.data,
        uploadedBy: `${dataLoad.uploadedBy.name} ${dataLoad.uploadedBy.lastName}`,
        createdAt: dataLoad.createdAt
    };
};

//Cargar class en Schema
DataLoadSchema.loadClass(DataLoadClass);

//Indexes
DataLoadSchema.index({organization: 1, confirmed: 1, deleted: 1}, {unique: false});

const DataLoad = mongoose.model('DataLoad', DataLoadSchema);

module.exports = {
    DataLoad
};