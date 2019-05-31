const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');


/**
 * Schema de Mongoose para el modelo Recurso.
 * @type {mongoose.Schema}
 */
let NotificationSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    createdUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    seenUsers:{
        type: Array
    },
    status:{
        type: String,
        required: true
    },
    deleted: require("./schemas/deleted.schema").Deleted
});

//Agregar createdAt, modifiedAt automáticamente
NotificationSchema.plugin(pluginCreatedUpdated);

//Paginación
NotificationSchema.plugin(mongoosePagination);

//Clase del modelo Recurso.
class NotificationClass {
    constructor() {

    }
}

//Cargar class en Schema
NotificationSchema.loadClass(NotificationClass);

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = {
    Notification
};