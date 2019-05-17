const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;

const Organization = require('./../models/organization.model').Organization;
const deletedSchema = require('./../models/schemas/deleted.schema');

/**
 * Consulta los registros de Organization disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    paginationOptions.select = 'name shortName color theme cover title description';
    paginationOptions.limit = 999999;//no limit per page

    let query = {};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    if(req.query.search){
        query = {
            $or : [
                {name : new RegExp(req.query.search,"i")},
            ]
        }
    }


    Organization
        .paginate(
            query,
            paginationOptions,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'organization.controller#list', 'Error al consultar lista de Organization');
                    return res.json({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                return res.json({
                    errors: false,
                    message: "",
                    data: {
                        docs: result.docs,
                        page: result.page,
                        pages: result.pages,
                        total: result.total
                    }
                });
            }
        );
};


exports.loadOrganizationSettings = (req, res, next) => {
    let currentOrganizationId = Organization.currentOrganizationId(req);

    Organization.findOne({_id: currentOrganizationId})
        .select('title description contactLocation contactEmail')
        .lean()
        .exec((err, organization) => {
            if (err) {
                logger.error(err, null, 'settings.controller#changeSettings', 'Error trying to load settings for Organization [%s]', currentOrganizationId);
            }

            return res.json({
                error: !!err,
                data: organization
            });
        });
};