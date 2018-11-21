const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

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
}

//Load class
userSchema.loadClass(UserClass);

//Indexes
userSchema.index({email: 1}, {unique: true});

let User = mongoose.model('User', userSchema);

module.exports = {
    User
};