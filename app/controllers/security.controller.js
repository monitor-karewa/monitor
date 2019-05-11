const passport = require('passport');
const jwt = require('jsonwebtoken');
const logger = require('./../components/logger').instance;
const config = require('./../../config/config').get();

const User = require('./../models/user.model').User;

/**
 * Middleware to check if user has logged in. If no session is detected, the user is redirected to '/login'.
 * @param req -
 * @param res -
 * @param next -
 */
exports.checkLogin = (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        //403 Not allowed
        let error = new Error('Acceso denegado');
        error.status = 403;
        return next(error);
        // return res.redirect('/login');
    }
};

exports.loadUserSession = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    let tokenPrefix = 'Bearer ';
    if (token && token.startsWith(tokenPrefix)) {
        // Remove 'Bearer ' from string
        token = token.slice(tokenPrefix.length, token.length);
    }

    if (token) {
        jwt.verify(token, config.session.options.secret, function(err, decoded) {

            if (err) {
                console.log('Error trying to verify jwt', err);
            }

            User.findOne({_id: decoded.userId, active: true}).lean().exec((err, user) => {
                if (err) {
                    console.log('Error trying to find User from jwt', err);
                    // let error = new Error('Acceso denegado');
                    // error.status = 403;
                    // return next(error);
                }
                // if (!user) {
                    // let error = new Error('Acceso denegado');
                    // error.status = 403;
                    // return next(error);
                // }
                req.user = user;
                return next();
            });
        });
    } else {
        //403 Not allowed
        // let error = new Error('Acceso denegado');
        // error.status = 403;
        // return next(error);

        return next();
        // return next();
    }

};

/**
 * Renders the login form.
 * @param req -
 * @param res -
 * @param next -
 */
exports.login = (req, res, next) => {
    return res.render('login');
};


/**
 * Valida si un usuario cuenta con el permiso indicado
 * @param user {User} usuario a validar
 * @param permission {string} clave del permiso
 * @param kind {string} tipo del permiso
 */
const hasPermission = (user, permission, kind) => {
    logger.warn(null, null, 'security.controller#hasPermission', 'All permissions are currently allowed.');
    return true;
};

exports.hasPermission = hasPermission;

/**
 * Devuelve un middleware para validar que el usuario actual cuenta con el permiso indicado.
 * @param permission {string} clave del permiso
 * @param kind {string} tipo del permiso
 * @returns {function(*, *, *)} middleware para validar el permiso
 */
exports.validatePermission = (permission, kind) => {
    //permission: 
    return (req, res, next) => {
        if (hasPermission(req.user, permission, kind)) {
            return next();
        } else {
            let error = new Error(res.__('access.error.denied'));
            error.status = 403;
            return next(error);
        }
    }
};