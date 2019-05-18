const jwt = require('jsonwebtoken');
const passport = require('./../components/passportManager').passport;

const config = require('./../../config/config').get();

const logger = require('./../components/logger').instance;

const {USER_PERMISSIONS} = require('./../models/user.model');

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
            fullName: user.fullName
        };

        let result = {token, permissions, user: resultUser};
        
        return res.json({
            error: false,
            data: result
        });
    })(req, res, next);
};