const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./../models/user.model').User;

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

const logger = require('./../components/logger').instance;
const deletedSchema = require('./../models/schemas/deleted.schema');

const _initLocalStrategy = () => {
};
/**
 * Initialize local login with PassportJS (email + password).
 */
passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, callback) => {
        logger.info(null, null, 'passportManager#_initLocalStrategy', '@local-login');
        User.findOne({email: username, active: true, ...deletedSchema.qNotDeleted()}, (err, user) => {
            //The same message is used to prevent "testing" for user existence
            if (err || !user) {
                return callback(null, false, {message: "Invalid username or password. Please try again.", email: username});
            }
            
            if (!user.active) {
                return callback(null, false, {message: "Invalid username or password. Please try again.", email: username});
            }
            //TODO: Validate account
            // if (!user.accountConfirmed) {
            //     return callback(null, false, {message: "Please activate your account to continue. Check your email for instructions.", email: username});
            // }
            
            if (!user.verifyPassword(password)) {
                return callback(null, false, {message: "Invalid username or password. Please try again.", email: username});
            }

            return callback(null, user, {message: "Welcome!", email: username});
        });
    }, 
    (err) => {
        console.log('Error trying to process passport strategy [local-login]', err);
    }
));

// const _initSerializer = () => {
//     passport.serializeUser((user, done) => {
//         done(null, user._id.toString());
//     });
// };
//
// const _initDeserializer = () => {
//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => {
//             if (err) {
//                 done(err);
//             } else {
//                 done(err, user);
//             }
//         });
//     });
// };

// exports.init = () => {
//     _initLocalStrategy();
//     // _initJwtStrategy();
//     // _initSerializer();
//     // _initDeserializer();
// };

exports.passport = passport;