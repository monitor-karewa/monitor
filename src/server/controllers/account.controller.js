const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');

const config = require('./../config/config').get();
const passport = require('./../components/passportManager').passport;
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');
const EmailClient = require('./../components/emailClient');

const encryptionManager = require('./../components/encryptionManager');

const {USER_PERMISSIONS, User} = require('./../models/user.model');

const deletedSchema = require('./../models/schemas/deleted.schema');

let crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = config.app.secret;

/**
 * Decifra un texto y devuelve el resultado descifrado.
 * @param {string} text texto a descifrar
 */
function decrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

/**
 * Cifra un texto y devuelve el resultado del cifrado.
 * @param {string} text texto a cifrar
 * @returns {string} texto cifrado
 */
function encrypt(text) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * Attempts a user login with username/password. Additionally, [rememberMe] can be defined to keep user session for
 * some time. For more information, see passportManager.
 * @param req -
 * @param res -
 * @param next -
 */
exports.login = (req, res, next) => {

    //local-login is defined in passportManager

    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            logger.error(err, req, 'account.controller#login', 'Error trying to authenticate with passport strategy [local-login]');
            return next(err);
        }
        
        if (!user) {
            return res.json({
                error: true
            });
        }

        let payload = {
            //Expire in 24 hours
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            "userId": user._id.toString()
        };

        let token = jwt.sign(payload, config.session.options.secret);
        
        let permissions = user.getPermissions();
        
        let resultUser = {
            fullName: user.fullName,
            profilePicture : user.profilePicture
        };

        let result = {token, permissions, user: resultUser};
        
        return res.json({
            error: false,
            data: result
        });
    })(req, res, next);
};


/**
 * Servicio para enviar el correo de restablecer contraseña
 * @param req
 * @param res
 * @param next
 */
exports.resetPassword = (req, res, next) => {

    let userEmail = req.body.email;

    // request.post({
    //     url: 'https://www.google.com/recaptcha/api/siteverify',
    //     form: {
    //         secret: config.googleRecapcha.secretKey,
    //         response: req.body["g-recaptcha-response"],
    //         remoteip: req.connection.remoteAddress
    //     }
    // }, function (err, httpResponse, body) {
    //     if (err) {
    //         logger.error(err, req, 'securityController#doResetPassword', res.__('error.is.not.a.robot'));
    //     }
    //     body = JSON.parse(body);
    //
    //     if (body.success) {

    let qNotDeleted = deletedSchema.qNotDeleted();

    let queryFind = {email: userEmail};
    queryFind = {...queryFind, ...qNotDeleted};

    User.findOne(queryFind).lean().exec((err, user) => {
        if (err || !user) {
            if (err) {
                logger.error(err, req, 'userController#doResetPassword', 'Hubo un error al buscar el usuario');
            }
            return res.json({
                error: true
            });
        }else{
            
            let token = encryptionManager.encryptWithDate(user._id);
            
            let update = {
                resetPasswordToken: token
            };

            let query = {_id: user._id};
            query = {...query, ...qNotDeleted};

            //Save the token to the db to validate later 
            User.updateOne(query, {$set: update}, {}, (err) => {
                if (err) {
                    return res.json({
                        error: true
                    });   
                }
                
                var emailClient = new EmailClient(user.email, "Monitor Karewa | Restablecer contraseña", req);
                emailClient.sendResetPasswordEmail(user, token, false);
                return res.json({
                    error: false
                });
            });
            
            
        }
    });
};


/**
 * Valida el token y si es correcto restablece la contraseña del Usuario correspondiente
 * @param {Request} req Request actual
 * @param {Response} res Response actual
 * @param {function} next función para llamar al siguiente middleware
 */
exports.validToken = (req, res, next) => {

    let encryptedToken = req.body.token;

    let tokenInfo = encryptionManager.decryptWithDate(encryptedToken);

    console.log('tokenInfo', tokenInfo);

    let userId = tokenInfo.payload;
    let dateOfRetrieval = tokenInfo.date;
    
    // let token = decrypt(encryptedToken);

    let currentDate = new Date();

    // let dateOfRetrieval = null;
    // let dateOfRetrievalAsStr = "";

    let errorMsg = 'accounts.password.updated.error';

    // if (token.indexOf('_') !== -1) {
    //     dateOfRetrievalAsStr = token.substring(token.indexOf('_') + 1, token.length);
    //     dateOfRetrieval = utils.dateFromTimestamp(dateOfRetrievalAsStr);
    // } else {
    //     return res.json({error: true, message: errorMsg});
    // }

    if (!dateOfRetrieval) {
        return res.json({error: true, message: errorMsg});
    }

    let timeDiff = Math.abs(currentDate.getTime() - dateOfRetrieval.getTime());
    var diffMinutes = Math.ceil(timeDiff / (1000 * 60));

    //Expire in 1 hour
    if (diffMinutes >= 60) {
        return res.json({error: true, message: 'accounts.password.updated.token-invalid', data: {tokenExpired: true}});
    }

    // let userId = token.replace("_" + dateOfRetrievalAsStr, "");
    if (userId.length !== 24) {
        return res.json({error: true, message: errorMsg});
    }
    
    if (!req.body.password) {
        res.json({error: true, message: "Por favor ingresa tu nueva contraseña."});
    }


    User.findOne({_id: mongoose.Types.ObjectId(userId), resetPasswordToken: encryptedToken}).exec((err, user) => {
        if (err) {
            logger.error(err, req, 'securityController#establishPassword', res.__('error.consult.user.id'), userId);
            res.json({error: true, message: errorMsg});
        }
        
        if (!user) {
            res.json({error: true, message: 'accounts.password.updated.token-invalid', data: {tokenExpired: true}});
        }
        
        if(req.body.password !== req.body.confirmPassword){
            res.json({error: true, message: "Las contraseñas no coinciden."});
        }else{
            user.setPassword(req.body.password);
            user.resetPasswordToken = null;
            user.save((err) => {
                if (err) {
                    res.json({error: true, message: errorMsg});
                } else {
                    res.json({error: false, message: "La contraseña ha sido restablecida."});
                    // return res.render('./login', {formSuccessMessage: res.__('update.password.successful'), email: user.email});
                }
            });
        }
    });
}
