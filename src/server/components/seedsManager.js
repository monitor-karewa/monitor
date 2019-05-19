const async = require('async');

const config = require('./../config/config').get();

const Organization = require('./../models/organization.model').Organization;
const User = require('./../models/user.model').User;
const deletedSchema = require('./../models/schemas/deleted.schema');

exports.init = () => {
    async.series(
        {
            //Task 2 - If no organizations available, create default
            initOrganizations: (callback) => {
                Organization.find(deletedSchema.qNotDeleted())
                    .countDocuments({}, (err, organizationCount) => {
                        if (organizationCount > 0) {
                            return callback(null);
                        }
                        
                        let organization = new Organization(config.defaults.organization);

                        organization.save((err) => {
                            //TODO: Logger
                            if (err) {
                                console.log('Error trying to save default Organization', err);
                            } else {
                                console.log('[seedsManager] Default Organization successfully created');
                            }
                            return callback(err);
                        });
                    });
            },
            //Task 1 - If no users available, create default
            initUsers: (callback) => {
                User.find(deletedSchema.qNotDeleted())
                    .countDocuments({}, (err, userCount) => {
                        if (userCount > 0) {
                            return callback(null);
                        }
                        
                        let user = new User(config.defaults.user);
                        user.setPassword(user.password);

                        user.save((err) => {
                            //TODO: Logger
                            if (err) {
                                console.log('Error trying to save default User', err);
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
                console.log('[seedsManager] Error trying to initialize seeds', err);
            } else {
                //No message
            }
        }
    )
};