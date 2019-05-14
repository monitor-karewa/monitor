const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

/**
 * Schema de Mongoose para el modelo RouteLog.
 * @type {mongoose.Schema}
 */
let RouteLogSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        //Some routes are organization-free, such as contact, about, select-organizations
        required: false
    },
    path: {
        type: String,
        required: true
    }/*,
    count: {
        type: Number,
        required: true,
        default: 1
    }*/
});

//Agregar createdAt, modifiedAt automáticamente
RouteLogSchema.plugin(pluginCreatedUpdated);

//Clase del modelo RouteLog.
class RouteLogClass {
    constructor() {

    }
}

RouteLogSchema.statics.toJson = function (routeLog) {
    return {
        filename: routeLog.filename,
        data: routeLog.data,
        uploadedBy: `${routeLog.uploadedBy.name} ${routeLog.uploadedBy.lastName}`,
        createdAt: routeLog.createdAt
    };
};

//Cargar class en Schema
RouteLogSchema.loadClass(RouteLogClass);

//Indexes
RouteLogSchema.index({path: 1, createdAt: -1}, {unique: false});

const RouteLog = mongoose.model('RouteLog', RouteLogSchema);

module.exports = {
    RouteLog
};