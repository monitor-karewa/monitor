const async = require('async');
const mongoose = require('mongoose');

const Contract = require('./../models/contract.model').Contract;
const Organization = require('./../models/organization.model').Organization;
const Calculation = require('./../models/calculation.model').Calculation;
const deletedSchema = require('./../models/schemas/deleted.schema');

const {calculateAndValidateFormula} = require('./../controllers/calculation.controller');
const logger = require('./../components/logger').instance;

exports.corruptionIndex = (req, res, next) => {
    let id = req.query.id;

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = {"organization": mongoose.Types.ObjectId(id)};

    let query = {...qNotDeleted, ...qByOrganization, locked: true};
    Calculation
        .findOne(query)
        .lean()
        .exec((err, corruptionIndex) => {
        
            if (err) {
                //Error
                logger.error(err, req, 'publicComparation.controller#corruptionIndex', 'Error trying to find Corruption index');
                return res.json({
                    error: true,
                    data: {}
                });
            } else if (!corruptionIndex) {
                //Not found
                logger.error(null, req, 'publicComparation.controller#corruptionIndex', 'Corruption index not found');
                // return res.json({
                //     error: true,
                //     data: {}
                // });
            }

            corruptionIndex = corruptionIndex || {};

            corruptionIndex.result = 0;

            if (!corruptionIndex._id) {
                return res.json({
                    error: true,
                    data: corruptionIndex
                });
            }

            let cache = {
                done: [],
                calls: [],
                i: 0,
                resultsMap: {},
            };

            calculateAndValidateFormula(cache, corruptionIndex._id, (err, result) => {
                if (result && result.value) {
                    corruptionIndex.result = result.value;
                }

                return res.json({
                    error: true,
                    data: corruptionIndex
                });
            });

        });
};

exports.detail = (req, res, next) => {
    
    let id = req.query.id;
    let url = req.query.url;

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = {"organization": mongoose.Types.ObjectId(id)};
    let query = {...qNotDeleted, ...qByOrganization};

    Contract.aggregate([
        {
            $match: query
        },
        {
            $group: {
                _id: null,

                publicCount: {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "PUBLIC"]},
                            then: 1,
                            else: 0
                        }
                    }
                },
                invitationCount: {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "INVITATION"]},
                            then: 1,
                            else: 0
                        }
                    }
                },
                noBidCount: {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "NO_BID"]},
                            then: 1,
                            else: 0
                        }
                    }
                },
                totalCount: {$sum: 1},

                public: {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "PUBLIC"]},
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                invitation: {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "INVITATION"]},
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                noBid: {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "NO_BID"]},
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                total: {$sum: "$totalOrMaxAmount"}
            }
        },
        {
            $project: {
                publicCount: 1,
                invitationCount: 1,
                noBidCount: 1,
                totalCount: 1,

                public: 1,
                invitation: 1,
                noBid: 1,
                total: 1    
            }
        }
    ]).exec((err, results) => {
        let result = results[0] || {};
        
        async.parallel({
            corruptionIndex: (callback) => {
                let query = {...qNotDeleted, ...qByOrganization, locked: true};
                Calculation
                    .findOne(query)
                    .lean()
                    .exec((err, corruptionIndex) => {

                        corruptionIndex = corruptionIndex || {};
                        
                        corruptionIndex.result = 0;
                        
                        if (!corruptionIndex._id) {
                            return callback(null, corruptionIndex);
                        }

                        let cache = {
                            done: [],
                            calls: [],
                            i: 0,
                            resultsMap: {},
                        };

                        calculateAndValidateFormula(cache, corruptionIndex._id, (err, result) => {
                            if (result && result.value) {
                                corruptionIndex.result = result.value;
                            }
                            return callback(null, corruptionIndex);
                        });
                    
                    });
            },
            organization: (callback) => {
                let qById = {_id: id};
                let query = {...qById, ...qNotDeleted};
                Organization
                    .findOne(query)
                    .exec((err, organization) => {
                        return callback(null, organization);
                    });
            },
        }, (err, results) => {
            let corruptionIndex = results.corruptionIndex;
            let organization = results.organization;

            let total = result.total || 0;
            let publicCount = result.publicCount || 0;
            let invitationCount = result.invitationCount || 0;
            let noBidCount = result.noBidCount || 0;
            let totalCount = result.totalCount || 0;
            
            let detail = {
                organization: {
                    _id: organization._id.toString(),
                    name: organization.name,
                    shortName: organization.shortName,
                    color: organization.color,
                },
                corruptionIndex: {
                    result: corruptionIndex.result
                },
                totals: {
                    public: result.public || 0,
                    invitation: result.invitation || 0,
                    noBid: result.noBid || 0,

                    publicPercent: publicCount / totalCount,
                    invitationPercent: invitationCount / totalCount,
                    noBidPercent: noBidCount / totalCount,
                    
                    total: total
                },
                counts: {
                    public: publicCount,
                    invitation: invitationCount,
                    noBid: noBidCount,
                    total: totalCount,
                }
            };

            return res.json({
                error: false,
                data: detail
            });
            
        });

    });
};
