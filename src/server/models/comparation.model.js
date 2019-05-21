const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {check} = require('express-validator/check');
const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');
const permissions = require('./../components/permissions');
const Organization = require('./../models/organization.model').Organization;
const axios = require('axios');

/**
 * Schema de Mongoose para el modelo Calculo.
 * @type {mongoose.Schema}
 */
let ComparationSchema = new Schema({
    targetName: {
        type: String,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
    },
    target: {
        type: Schema.Types.ObjectId,
        required: true
    },
    remoteUrl: {
        type: String
    },
    deleted: require("./schemas/deleted.schema").Deleted
});


/**
 * Class for the User model.
 */
class ComparationClass {
    constructor() {

    }

    prepareComparationforSaving(callback) {
        this.getTargetName((err, result) => {
            console.log("getTargetName#result", result);
            if(err){
                console.log("error", err);
                return callback(err);
            }
            if(result.error){
                return callback(null, {error: true, message : result.message})
            }
            console.log("this", this);
            console.log('this.targetName --> ' + this.targetName);
            console.log('RESULT NAME --> ' + result.data);
            if(this.targetName !== result.data){
                this.targetName = result.data;
                console.log("name changed");
                return callback(null,  {message : "Name changed --> " + result.data, mustSave : true })
            }
            return callback(null,  {message : "All good", mustSave : false})
        })
    }


    getTargetName(callback) {
        const URL_DETAIL_SUFFIX = "/public-api/comparations/detail/?id=";
        let url = "";
        if (this.remoteUrl) {
            url = this.remoteUrl + URL_DETAIL_SUFFIX + this.target;
            axios.get(url)
                .then(function (response) {
                    return callback(null, {
                        error: false,
                        data: response.data.data.organization.shortName,
                    })
                })
                .catch(error => {
                    return callback(error, {
                        error: true,
                        message: "Ocurrió un error consultando la organización remota"
                    });
                });
        } else {
            Organization.findOne(
                {_id: mongoose.Types.ObjectId(this.target)}
                , (err, response) => {
                    if (err) {
                        console.log("err", err);
                        return callback(err, {
                            error: true,
                            message: "Error retrieving local organization"
                        })
                    }
                    console.log("response", response);
                    console.log('this.target --> ' + this.target);
                    return callback(null, {
                        error: false,
                        data: response.shortName,
                    })
                });
        }
    }
}


//Load class
ComparationSchema.loadClass(ComparationClass);


//Agregar createdAt, modifiedAt automáticamente
ComparationSchema.plugin(pluginCreatedUpdated);

//Indexes
ComparationSchema.index({from: 1, target: 1}, {unique: true});


const Comparation = mongoose.model('Comparation', ComparationSchema);

module.exports = {
    Comparation
};