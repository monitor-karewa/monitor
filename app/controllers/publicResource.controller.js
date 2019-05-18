const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');

const Organization = require('./../models/organization.model').Organization;
const Resource = require('./../models/resource.model').Resource;
const deletedSchema = require('./../models/schemas/deleted.schema');

/**
 * Consulta los registros de Resource disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    // paginationOptions.select = 'name shortName color theme cover title description';
    paginationOptions.limit = 999999;//no limit per page

    let query = {};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};

    let search = req.query.search;
    if(search){
        let searchAsRegex = utils.toAccentsRegex(search, 'gi');
        query = {
            $or : [
                {title : searchAsRegex},
                {url : search},
            ]
        }
    }

    Resource.aggregate([
        {
            $match: query
        },
        {
            $group: {
                //group all matches
                _id: null,
                resources: {$push: '$$ROOT'},
            },

        },
        {
            $project: {
                // resources: 1,
                // totals: 1,
                article: {
                    $filter: {
                        input: "$resources",
                        as: "resource",
                        cond: { $eq: [ "$$resource.classification", "ARTICLE" ] }
                    }
                },
                notes: {
                    $filter: {
                        input: "$resources",
                        as: "resource",
                        cond: { $eq: [ "$$resource.classification", "NOTES" ] }
                    }
                },
                legalFramework: {
                    $filter: {
                        input: "$resources",
                        as: "resource",
                        cond: { $eq: [ "$$resource.classification", "LEGAL_FRAMEWORK" ] }
                    }
                },
                website: {
                    $filter: {
                        input: "$resources",
                        as: "resource",
                        cond: { $eq: [ "$$resource.classification", "WEBSITE" ] }
                    }
                },
            }
        },
        {
            $project: {
                article: 1,
                notes: 1,
                legalFramework: 1,
                website: 1
            }
        }
    ]).exec((err, result) => {
        
        if (err) {
            logger.error(err, req, 'publicResource.controller#list', 'Error trying to query Resources for query:\n%j', query);
        }

        result = result || [];
        let resourcesByClassification = result[0] || {
            article: [],
            notes: [],
            legalFramework: [],
            website: [],
        };
        
        return res.json({
            error: !!err,
            data: resourcesByClassification
        })
    });

    // Resource
    //     .paginate(
    //         query,
    //         paginationOptions,
    //         (err, result) => {
    //             if (err) {
    //                 logger.error(err, req, 'organization.controller#list', 'Error al consultar lista de Organization');
    //                 return res.json({
    //                     errors: true,
    //                     message: res.__('general.error.unexpected-error')
    //                 });
    //             }
    //
    //             return res.json({
    //                 errors: false,
    //                 message: "",
    //                 data: {
    //                     docs: result.docs,
    //                     page: result.page,
    //                     pages: result.pages,
    //                     total: result.total
    //                 }
    //             });
    //         }
    //     );
};