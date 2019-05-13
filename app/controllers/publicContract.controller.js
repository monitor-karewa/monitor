const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const Contract = require('./../models/contract.model').Contract;
const Supplier = require('./../models/supplier.model').Supplier;
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const deletedSchema = require('./../models/schemas/deleted.schema');

const utils = require('./../components/utils.js');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Contract.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Contract;
    renderParams.permission = Contract.permission;
    res.render('contract', renderParams);
};

/**
 * Consulta los registros de Contract disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {




    let paginationOptions = pagination.getDefaultPaginationOptions(req);
    paginationOptions.lean = false;

    let query = {};
    var orBuilder = [];
    var andBuilder = [];


    if (req.body && req.body.filters) {

        if (req.body.filters.search && req.body.filters.search.length) {
            orBuilder.push({contractId: utils.toAccentsRegex(req.body.filters.search)});
            orBuilder.push({contractNumber: utils.toAccentsRegex(req.body.filters.search)});
            orBuilder.push({servicesDescription: utils.toAccentsRegex(req.body.filters.search)});
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (req.body.filters.administrationPeriods && req.body.filters.administrationPeriods.length) {
            for (let i = 0; i < req.body.filters.administrationPeriods.length; i++) {
                orBuilder.push({administrationPeriod: req.body.filters.administrationPeriods[i].administrationPeriod})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (req.body.filters.fiscalYears && req.body.filters.fiscalYears.length) {
            for (let i = 0; i < req.body.filters.fiscalYears.length; i++) {
                orBuilder.push({fiscalYear: req.body.filters.fiscalYears[i].fiscalYear})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (req.body.filters.trimonths && req.body.filters.trimonths.length) {
            for (let i = 0; i < req.body.filters.trimonths.length; i++) {
                orBuilder.push({period: req.body.filters.trimonths[i].trimonth})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (req.body.filters.procedureTypes && req.body.filters.procedureTypes.length) {
            for (let i = 0; i < req.body.filters.procedureTypes.length; i++) {
                orBuilder.push({procedureType: req.body.filters.procedureTypes[i]})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (req.body.filters.administrativeUnits && req.body.filters.administrativeUnits.length) {
            for (let i = 0; i < req.body.filters.administrativeUnits.length; i++) {
                orBuilder.push({applicantAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({organizerAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({areaInCharge: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            console.log("administrativeUnits", orBuilder);
            orBuilder = [];
        }

        if(andBuilder.length){
            query = {$and : andBuilder};
        }
    }

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    Contract
        .paginate(
            query,
            {
                ...paginationOptions,
                populate : [
                    'supplier',
                    'administrativeUnit ',
                    'organizerAdministrativeUnit ',
                    'areaInCharge ',
                    'applicantAdministrativeUnit '
                ]
            },
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
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



/**
 * Consulta los registros de Contract disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.detail = (req, res, next) => {
    let contractId = req.query.id;
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {"_id": contractId};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    Contract
        .findOne(
            query).populate(['supplier','applicantAdministrativeUnit']).exec(
        (err, result) => {
            if (err) {
                logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
                return res.json({
                    errors: true,
                    message: res.__('general.error.unexpected-error')
                });
            }

            return res.json({
                errors: false,
                message: "",
                data: result
            });
        }
    );
};



/**
 * Consulta los totales de los contratos, totales y por tipo
 */
exports.getTotals = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);
    paginationOptions.lean = false;

    let query = {};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};
    Contract.aggregate([
            {
                $match : {}
            },
            {
                $group  : {
                    _id : "totalAmountSum",
                    total : {$sum : "$totalAmount"},
                    contracts: { $push : "$$ROOT" }
                }

            },
            {
                $unwind : "$contracts"
            },
            {
                $addFields : {
                    "contracts.total" : "$total",
                }
            },
            {
                $project : {
                    "contracts" : true
                }
            },    {
                $replaceRoot : {
                    newRoot : "$contracts"
                }
            },
            //procedureType
            {
                $group  : {
                    _id : "$procedureType",
                    total : {$sum : "$totalAmount"},
                    totalAmount: {$first : "$total"}
                }
            },
            {
                $project : {
                    total : true,
                    totalAmount : true

                }
            }

        ]
    ).exec(function (err,result) {

    if(err){
        console.log("err", err);
        res.json({error:true, message: err.toString()});
    } else {
        res.json(result);
    }

    })
};




/**
 * Queries the possible suppliers fot this contract
 */
exports.retrieveSuppliers = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    //Filter everything by organization
    //Filter all the things by the current things
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Supplier
        .find(
            query,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Suppliers');
                    return res.json({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }

                return res.json({
                    errors: false,
                    message: "",
                    data: {
                        docs: result,
                    }
                });
            }
        );
};


/**
 * Queries the possible suppliers fot this contract
 */
exports.retrieveAdministrativeUnits = (req, res, next) => {
    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
        {
            $group : {
                _id : "AdministrativeUnit",
                organizerAdministrativeUnits : {$push : "$organizerAdministrativeUnit"},
                applicantAdministrativeUnits : {$push : "$applicantAdministrativeUnit"},
                areasInCharge : {$push : "$areaInCharge"},
            }
        },
        { $project:
                {
                    administrativeUnits:
                        {  $concatArrays: [ "$organizerAdministrativeUnits", "$applicantAdministrativeUnits", "$areasInCharge" ]  }
                }
        },
        {$unwind : "$administrativeUnits"},
        {
            $group : { _id : "$administrativeUnits"},
        },
        {
            $lookup : {
                from : "administrativeunits",
                localField: "_id",
                foreignField:"_id",
                as: "administrativeUnit"
            }
        },
        {$unwind : "$administrativeUnit"},
        {$replaceRoot : { newRoot : "$administrativeUnit"}}
    ]).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};


/**
 * Gets the periods (trimonths) of the current contracts
 */
exports.retrieveTrimonths = (req, res, next) => {
    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
        {
            $group : {
                _id:"$period",
                period : {$first : "$period"}
            }
        }
    ]).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};



/**
 * Gets the fiscal years of the current contracts
 */
exports.retrieveFiscalYears = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
        {
            $group : {
                _id:"$fiscalYear",
                fiscalYear : {$first : "$fiscalYear"}
            }
        }
    ]).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};


/**
 * Gets the fiscal years of the current contracts
 */
exports.retrieveFiscalYears = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
        {
            $group : {
                _id:"$fiscalYear",
                fiscalYear : {$first : "$fiscalYear"}
            }
        }
    ]).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};


/**
 * Gets the fiscal years of the current contracts
 */
exports.retrieveAdministrationPeriods = (req, res, next) => {

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
        {
            $group : {
                _id:"administrationPeriod",
                administrationPeriod : {$first : "$administrationPeriod"}
            }
        }
    ]).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};


/**
 * Gets the procedure types of the current contracts
 */
exports.retrieveProceudureTypes = (req, res, next) => {

    //Filter everything by organization
    let query = {};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate(
        [
            {
                $group: {
                    _id: "$procedureType"
                }
            }
        ]).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};