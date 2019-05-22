const bcrypt = require('bcrypt-nodejs');

const config = require('./../config/config').get();

let crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = config.app.secret;

const utils = require('./../components/utils');


/**
 * Decifra un texto y devuelve el resultado descifrado.
 * @param {string} text texto a descifrar
*/
function decrypt(payload) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(payload, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

/**
 * Cifra un texto y devuelve el resultado del cifrado.
 * @param {string} payload texto a cifrar
 * @returns {string} texto cifrado
 */
function encrypt(payload) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(payload, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};


exports.encryptWithDate = function (payload) {
    let date = new Date().getTime() + "";
    return encrypt(payload + "_" + date);
};

exports.decryptWithDate = function (encryptedPayload) {
    let date = null;
    let dateAsStr = '';
    
    let decryptedPayload = decrypt(encryptedPayload);

    if (decryptedPayload.indexOf('_') !== -1) {
        dateAsStr = decryptedPayload.substring(decryptedPayload.indexOf('_') + 1, decryptedPayload.length);
        date = utils.dateFromTimestamp(dateAsStr);
    }

    let payload = decryptedPayload.replace("_" + dateAsStr, "");
    
    return {
        payload,
        date
    };
};


exports.decrypt = decrypt;
exports.encrypt = encrypt;
