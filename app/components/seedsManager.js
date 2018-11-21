const async = require('async');

const config = require('./../../config/config').get();

const User = require('./../models/user.model').User;

exports.init = () => {
    async.series(
        {
            //Task 1 - If no users available, create default
            initUsers: (callback) => {
                User.find({})
                    .countDocuments({}, (err, userCount) => {
                        if (userCount > 0) {
                            return callback(null);
                        }
                        
                        let user = new User(config.defaults.user);
                        user.setPassword(user.password);

                        user.save((err) => {
                            //TODO: Logger
                            if (err) {
                                console.error('Error trying to save default User', err);
                            } else {
                                console.log('[seedsManager] Default User successfully created');
                            }
                            return callback(err);
                        });
                    });
            }
        },
        (err, results) => {
            //TODO: Logger
            if (err) {
                console.error('[seedsManager] Error trying to initialize seeds');
            } else {
                //No message
            }
        }
    )
};