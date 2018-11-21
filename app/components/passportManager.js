const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./../models/user.model').User;

const _initLocalStrategy = () => {
    /**
     * Initialize local login with PassportJS (email + password).
     */
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (username, password, callback) => {
            User.findOne({email: username}, (err, user) => {
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
        }
    ));
};

const _initSerializer = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id.toString());
    });
};

const _initDeserializer = () => {
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) {
                done(err);
            } else {
                done(err, user);
            }
        });
    });
};

exports.init = () => {
    _initLocalStrategy();
    _initSerializer();
    _initDeserializer();
};