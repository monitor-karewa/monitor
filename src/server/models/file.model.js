const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

const permissions = require('./../components/permissions');

/**
 * Schema de Mongoose para el modelo File.
 * @type {mongoose.Schema}
 */
let FileSchema = new Schema({
    filename: {
        type: String
    },
    mimetype: {
        type: String
    },
    encoding: {
        type: String
    },
    size: {
        type: Number
    },
    //md5 hash for the file content
    md5: {
        type: String,
        // required: true
    },
    data: {
        type: Buffer, 
        required: true
    },
});

//Agregar createdAt, modifiedAt automáticamente
FileSchema.plugin(pluginCreatedUpdated);

//Clase del modelo File.
class FileClass {
    constructor() {

    }
}

//Cargar class en Schema
FileSchema.loadClass(FileClass);

const File = mongoose.model('File', FileSchema);

module.exports = {
    File
};
