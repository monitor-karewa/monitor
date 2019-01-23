const passport = require('passport');

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
        return res.redirect('/login');
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
 * Attempts a user login with username/password. Additionally, [rememberMe] can be defined to keep user session for 
 * some time. For more information, see passportManager.
 * @param req -
 * @param res -
 * @param next -
 */
exports.doLogin = (req, res, next) => {
    //local-login is defined in passportManager
    console.log('doLogin');
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            //TODO: Log error
            return next(err)
        } else {
            if (!user) {
                return res.json({
                    error: true,
                    message: info.message
                });
            }
            req.login(user, function (err) {
                if (err) {
                    return res.json({
                        error: true,
                        message: 'An error occurred trying to log in. Please try again later.'
                    });
                }

                if (req.body.rememberMe) {
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
                } else {
                    req.session.cookie.expires = false; // Cookie expires at end of session
                }
                
                return res.json({
                    error: false,
                    message: info.message,
                    data: {
                        redirectTo: '/admin'
                    }
                });
            });
        }
    })(req, res, next);
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