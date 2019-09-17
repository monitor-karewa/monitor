const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const axios = require('axios');

const utils = require('../components/utils');

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

    paginationOptions.select = 'name shortName color theme cover title description contactEmail address schedule additionalInformation welcomeTitle showBackgroundText round';
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


exports.giveOrganizations = function(req, res, next) {

    Organization.find({}).exec(
        function (err,result){
            res.json(result)
        }
    )
};


let toggleHttpPrefix = function(url){
    let HTTP_PREFIX = "http://";
    let HTTPS_PREFIX = "https://";
    let httpsRegex = new RegExp('https://','i');
    let httpRegex = new RegExp('http://','i');

    if(httpRegex.test(url)){
        return url.replace(httpRegex,HTTPS_PREFIX);
    } else {
        return url.replace(httpsRegex,HTTP_PREFIX);
    }
};

exports.getOrganizationsFromOuterServer = function (req, res, next) {
    let ROUTE_SUFFIX = "/public-api/organizations/local/list";
    let HTTP_PREFIX = "http://";
    let normalSearchRegex = /^[a-z0-9\s]+$/i

    let search = req.query.search;
    let anyHttpRegex = new RegExp('https?://');
    let urlregex = new RegExp('(https?|ftp)://(-\\.)?([^\\s/?\\.#-]+\\.?)+(/[^\\s]*)?$', "is");
    let url = "", baseRemoteUrl;
    let index;


    if (search && search.length) {
        let match = search.match(anyHttpRegex);
        if (match && match[0]) {
            url = search.replace(match[0], "");
        } else {
            url = search;
        }

        if (url.indexOf("/") >= 0) {
            url = url.substr(0, url.indexOf("/"))
        }



        if (match && match[0]) {
            url = match[0] + url;
        } else {
            url = HTTP_PREFIX + url;
        }
        baseRemoteUrl =  url;//Scared of assigned relation

        url += ROUTE_SUFFIX;

        if (urlregex.test(url) && !normalSearchRegex.test(search)) {
            axios.get(url)
                .then(response => {
                    res.json({docs : response.data, baseRemoteUrl:baseRemoteUrl})
                })
                .catch(error => {
                    axios.get(toggleHttpPrefix(url))
                        .then(response => {
                            baseRemoteUrl = toggleHttpPrefix(baseRemoteUrl);
                            res.json({docs : response.data, baseRemoteUrl:baseRemoteUrl})
                        })
                        .catch(error => {
                            console.log("error");
                            console.log(error);
                            res.json({error: true, message : "Verifique la url"})
                        });
                });
        } else {
            Organization.find({
                name: utils.toAccentsRegex(req.query.search, "i", false)
            }).exec(
                function (err, result) {
                    return res.json({docs : result})
                }
            )
        }
    } else {
        Organization.find({}).exec(
            function (err, result) {
                return res.json({docs : result})
            }
        )
    }
};


exports.loadOrganizationSettings = (req, res, next) => {
    let currentOrganizationId = Organization.currentOrganizationId(req);

    Organization.findOne({_id: currentOrganizationId})
        .select('title description contactLocation contactEmail address schedule additionalInformation welcomeTitle showBackgroundText round updatedAt defaultAdministrationPeriod')
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