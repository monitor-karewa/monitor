const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const mongoosePagination = require('mongoose-paginate');
const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Mongoose Schema for Organization.
 * @type {mongoose.Schema}
 */
organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true,
        min: 2,
        max: 12
    },
    color: {
        type: String,
        required: true,
        default: "#2cbcb6"
    },
    deleted: require("./schemas/deleted.schema").Deleted
});


//Agregar createdAt, modifiedAt automáticamente
organizationSchema.plugin(pluginCreatedUpdated);

//Paginación
organizationSchema.plugin(mongoosePagination);


/**
 * Class for the Organization model.
 */
class OrganizationClass {
    constructor() {
    }

    /**
     * Hashes and sets a password value.
     * @param password {string} un-hashed password
     */
    setPassword(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }

    /**
     * Verifies that the received password matches the current password
     * @param password {string} un-hashed password to verify
     * @returns {boolean} true if both passwords match
     */
    verifyPassword(password) {
        return this.password && bcrypt.compareSync(password, this.password);
    };
}

//Load class
organizationSchema.loadClass(OrganizationClass);

//Indexes
organizationSchema.index({name: 1}, {unique: true});

organizationSchema.statics.qByOrganization = function (req) {
    let currentOrganizationId = this.currentOrganizationId(req);
    return {
        organization: currentOrganizationId
    };
};

organizationSchema.statics.currentOrganizationId = function (req) {
    let currentOrganizationId = req.currentOrganizationId;
    if (currentOrganizationId) {
        currentOrganizationId = mongoose.Types.ObjectId(currentOrganizationId);
    }
    return currentOrganizationId;
};

let Organization = mongoose.model('Organization', organizationSchema);


module.exports = {
    Organization
};
