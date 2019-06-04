const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const mongoosePagination = require('mongoose-paginate');
const pluginCreatedUpdated = require('mongoose-createdat-updatedat');

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USER_PERMISSIONS = ["USERS", "SUPPLIERS", "ORGANIZATIONS", "ADMINISTRATIVE_UNITS", "CONTRACTS", "RESOURCES", "CALCULATIONS", "SETTINGS"];
const USER_PERMISSIONS_DICT = {
    USERS: "USERS",
    SUPPLIERS: "SUPPLIERS",
    ORGANIZATIONS: "ORGANIZATIONS",
    ADMINISTRATIVE_UNITS: "ADMINISTRATIVE_UNITS",
    CONTRACTS: "CONTRACTS",
    RESOURCES: "RESOURCES",
    CALCULATIONS: "CALCULATIONS",
    SETTINGS: "SETTINGS"
};

/**
 * Mongoose Schema for User.
 * @type {mongoose.Schema}
 */
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validator: (val) => {
            if (val && typeof(val) === 'string') {
                return regexEmail.test(val);
            } else {
                return false;
            }
        }
    },
    password: {
        type: String, 
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    administratorType: {
        type: String,
        required: true,
        enum: ['GENERAL', 'CUSTOM']
    },
    permissions: {
        type: Array,
        required: true
        // enum: ['GENERAL', 'CONTRATO']
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: false
    },
    deleted: require("./schemas/deleted.schema").Deleted
});


//Agregar createdAt, modifiedAt automáticamente
userSchema.plugin(pluginCreatedUpdated);

//Paginación
userSchema.plugin(mongoosePagination);


/**
 * Class for the User model.
 */
class UserClass {
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
    
    getPermissions () {
        if (this.administratorType === 'GENERAL') {
            return USER_PERMISSIONS;
        } else {
            return this.permissions || [];
        }
    }
    
    hasPermission (permission) {
        if (this.administratorType === 'GENERAL' || !permission) {
            return true;
        } else {
            return (this.permissions || []).includes(permission);
        }
    }
}

userSchema.virtual("fullName").get(function() {
    return `${this.name} ${this.lastName}`;
});

//Load class
userSchema.loadClass(UserClass);

//Indexes
userSchema.index({email: 1, deleted: 1}, {unique: true});

let User = mongoose.model('User', userSchema);

module.exports = {
    User,
    USER_PERMISSIONS,
    USER_PERMISSIONS_DICT
};