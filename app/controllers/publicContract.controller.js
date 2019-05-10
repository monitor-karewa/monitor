const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const Contract = require('./../models/contract.model').Contract;
const Supplier = require('./../models/supplier.model').Supplier;
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const deletedSchema = require('./../models/schemas/deleted.schema');

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
    
    //query["field"] = value;
    
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
 * Consulta los totales de los contratos, totales y por tipo
 */
exports.getTotals = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);
    paginationOptions.lean = false;

    let query = {};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};
    console.log("publicContract.controller#getTotals");
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
        console.log("result", result);
        res.json(result);
    }

    })
};