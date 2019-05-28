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
    color: {
        type: String,
        required: true,
        default: "#2cbcb6"
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
        this.getTarget((err, result) => {
            // console.log("getTargetName#result", result);
            if(err){
                // console.log("error", err);
                return callback(err);
            }
            if(result.error){
                return callback(null, {error: true, message : result.message})
            }
            
            let mustSave = false;
            
            if(this.targetName !== result.data.shortName){
                this.targetName = result.data.shortName;
                mustSave = true;
            }
            
            if(this.color !== result.data.color){
                this.color = result.data.color;
                mustSave = true;
            }
            return callback(null,  {message : ""/* + result.data*/, mustSave : mustSave});
            // return callback(null,  {message : "All good", mustSave : false})
        })
    }


    getTarget(callback) {
        const URL_DETAIL_SUFFIX = "/public-api/comparations/detail/?id=";
        let url = "";
        if (this.remoteUrl) {
            url = this.remoteUrl + URL_DETAIL_SUFFIX + this.target;
            axios.get(url)
                .then(function (response) {
                    return callback(null, {
                        error: false,
                        data: response.data.data.organization,
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
                , (err, organization) => {
                    if (err) {
                        return callback(err, {
                            error: true,
                            message: "Error retrieving local organization"
                        })
                    }
                    return callback(null, {
                        error: false,
                        data: organization,
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