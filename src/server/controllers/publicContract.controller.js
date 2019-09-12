const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');
const moment = require('moment');
const async = require('async');


const {Organization} = require('./../models/organization.model');
const Contract = require('./../models/contract.model').Contract;
const Supplier = require('./../models/supplier.model').Supplier;
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const deletedSchema = require('./../models/schemas/deleted.schema');

const utils = require('./../components/utils.js');

const { PDFTable, PDFExporter } = require('./../components/pdfExporter');
const {ExcelExporter} = require('./../components/exporter');

const { validationResult } = require('express-validator/check');


function _fetchContractsAndTotals(req, res, options = {}, callback) {
    let paginationOptions = {};
    let query = {};
    let orBuilder = [];
    let andBuilder = [];


    if (req.body && req.body.filters) {

        if (req.body.filters.search && req.body.filters.search.length) {
            orBuilder.push({contractId: utils.toAccentsRegex(req.body.filters.search, "gi")});
            orBuilder.push({contractNumber: utils.toAccentsRegex(req.body.filters.search, "gi")});
            orBuilder.push({servicesDescription: utils.toAccentsRegex(req.body.filters.search, "gi")});
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
                orBuilder.push({period: req.body.filters.trimonths[i].period})
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

        if (req.body.filters.suppliers && req.body.filters.suppliers.length) {
            for (let i = 0; i < req.body.filters.suppliers.length; i++) {
                orBuilder.push({supplier: new mongoose.Types.ObjectId(req.body.filters.suppliers[i]._id)});
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (req.body.filters.administrativeUnits && req.body.filters.administrativeUnits.length) {
            for (let i = 0; i < req.body.filters.administrativeUnits.length; i++) {
                orBuilder.push({applicantAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({organizerAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({areaInCharge: req.body.filters.administrativeUnits[i]})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if(andBuilder.length){
            query = {$and : andBuilder};
        }
    }

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

    let qProcedureStateConcluded = Contract.qProcedureStateConcluded();

    let finalQuery = {
        ...qProcedureStateConcluded,
        ...query,
    };

    if (finalQuery["$and"]) {
        finalQuery["$and"] = (qProcedureStateConcluded["$and"] || []).concat((query["$and"] || []))
    }

    let totalsQuery = Contract.aggregate([
            {
                $match : finalQuery
            },
            {
                $group  : {
                    _id : "totalAmountSum",
                    total : {$sum : "$totalOrMaxAmount"},
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
                    total : {$sum : "$totalOrMaxAmount"},
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
    );

let contractsQuery = {};

    if(!!options.paginate){
        paginationOptions = options.paginationOptions;
        paginationOptions.lean = false;
        paginationOptions.sort = {"totalOrMaxAmount": -1};
        contractsQuery = Contract.paginate(query, {
            ...paginationOptions,
            populate : [
                'supplier',
                'administrativeUnit ',
                'organizerAdministrativeUnit ',
                'applicantAdministrativeUnit '
            ]
        });
    } else {
        contractsQuery = Contract.find(query,{_id:0, deleted:0})
            .sort({"totalOrMaxAmount": -1})
            .populate('supplier administrativeUnit organizerAdministrativeUnit applicantAdministrativeUnit')
            .lean();
    }
    let promiseIterable = [totalsQuery,contractsQuery];

    Promise.all(promiseIterable).then(values => {
        let totals = values && values.length ? values[0] : [];
        let contracts = values && values.length ? values[1] : {};

        callback(null, { totals, contracts });
    }).catch(reason => {
        callback(reason);
    })


}


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

    async.parallel({
            mainQuery: function (callback) {
                let paginationOptions = pagination.getDefaultPaginationOptions(req);
                paginationOptions.lean = false;
                _fetchContractsAndTotals(req, res, {paginate: true, paginationOptions}, (err, {totals, contracts}) => {
                    if (err) {
                        logger.error(err, req, 'contract.controller#list', 'Error al consultar lista de Contract');
                        return callback({
                            errors: true,
                            message: res.__('general.error.unexpected-error')
                        });
                    } else {
                        return callback(null,{
                            errors: false,
                            message: "",
                            data: {
                                docs: contracts.docs,
                                page: contracts.page,
                                pages: contracts.pages,
                                total: contracts.total,
                                totals: totals
                            }
                        });

                    }
                })
            },
            lastUpdate: function (callback) {
                let qByOrganization = Organization.qByOrganization(req);
                Contract.find(
                    {...qByOrganization},
                    {updatedAt: 1},
                    {sort: {"updatedAt": -1}, limit: 1},
                    function (err, result) {
                        if (err) {
                            console.log("err", err);
                            callback(err)
                        } else {
                            callback(null, result)
                        }
                    }
                )
            }
        },
        function (err, results) {
            let json = {...results.mainQuery};
            if (results.lastUpdate && results.lastUpdate.length) {
                json = {...results.mainQuery, lastUpdate: results.lastUpdate[0].updatedAt}
            }
            res.json(json);
        });
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
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

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
 * @deprecated Se incluyo el calculo en el list
 */
exports.getTotals = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);
    paginationOptions.lean = false;

    let query = {};

    //query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};
    Contract.aggregate([
            {
                $match : query
            },
            {
                $group  : {
                    _id : "totalAmountSum",
                    total : {$sum : "$totalOrMaxAmount"},
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
                    total : {$sum : "$totalOrMaxAmount"},
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

    let query = {};
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};


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
    let query = {};
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};
    if(req.query && req.query.supplierId){
        query.supplier = new mongoose.Types.ObjectId(req.query.supplierId);
    }

    Contract.aggregate([
        {
            $match: query
        },
        {
            $group : {
                _id : "AdministrativeUnit",
                organizerAdministrativeUnits : {$push : "$organizerAdministrativeUnit"},
                applicantAdministrativeUnits : {$push : "$applicantAdministrativeUnit"},
                // areasInCharge : {$push : "$areaInCharge"},
            }
        },
        { $project:
                {
                    administrativeUnits:
                        {  $concatArrays: [ "$organizerAdministrativeUnits", "$applicantAdministrativeUnits" ]  }
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
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};
    if(req.query && req.query.supplierId){
        query.supplier = new mongoose.Types.ObjectId(req.query.supplierId);
    }

    Contract.aggregate([
        {
            $match: query
        },
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
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

    if(req.query && req.query.supplierId){
        query.supplier = new mongoose.Types.ObjectId(req.query.supplierId);
    }

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
        {
            $match: query
        },
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
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};
    if(req.query && req.query.supplierId){
        query.supplier = new mongoose.Types.ObjectId(req.query.supplierId);
    }

    Contract.aggregate([
        {
            $match: query
        },
        {
            $group : {
                _id:"$administrationPeriod",
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
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};

    if(req.query && req.query.supplierId){
        query.supplier = new mongoose.Types.ObjectId(req.query.supplierId);
    }
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

/**
 * Gets the procedure types of the current contracts
 */
exports.retrieveSuppliersForFilter = (req, res, next) => {

    //Filter everything by organization
    let query = {};
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...deletedSchema.qNotDeleted(), ...qByOrganization};
    if(req.query.supplierId){
        query.supplier = new mongoose.Types.ObjectId(req.query.supplierId);
    }
    //query["field"] = value;

    //let qNotDeleted = deletedSchema.qNotDeleted();
    //query = {...query, ...qNotDeleted};

    Contract.aggregate([
            {
                $match: query
            },
            {
                $group: {
                    _id: "$supplier"
                }
            },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "supplier"
                }
            },
            {
                $unwind: "$supplier"
            },
            {
                $replaceRoot: {newRoot: "$supplier"}
            }

        ]
    ).exec(function (err, result) {
            return res.json(
                result
            )
        },
        function (error) {
            console.log("error", error);
        })
};

exports.download = (req, res, next) => {
    let format = req.params.format;
    req.body.filters = JSON.parse(req.query.filters);

    if (!['xls', 'pdf', 'json'].includes(format)) {
        res.status(404);
        return res.end();
    }

    let filters = req.body.filters;
    let formatedFilter = [];
    for(let item in filters){
        let row = {
            key : req.__('suppliers.filters.'+item),
            values:''
        }
        if(Array.isArray(filters[item])){
            filters[item].forEach((filter) => {
                if(typeof filter == "string"){
                    row.values += `${req.__(filter)}. `;

                } else if(filter.hasOwnProperty('_id') && filter.hasOwnProperty('name')){
                    row.values += `${filter.name}. `;
                } else {
                    row.values += `${filter._id}. `
                }
                // formatedFilter[item] = { value:filter._id};
            });
        } else if(typeof filters[item] == "string" || typeof filters[item] == "number"){
            row.values += filters[item];
            // formatedFilter[item] = filters[item]._id;
        }
        formatedFilter.push(row);
    }
    _fetchContractsAndTotals(req, res, {paginate: false}, (err, {totals, contracts}) => {

            let totalsPretty = {};
            totals.forEach((item) => {
                totalsPretty[item._id] = item.total;
                totalsPretty['totalAmount'] = item.totalAmount;
            });



        switch(format){
            case 'xls':
                downloadXls(req, res, contracts, formatedFilter);
                break;
            case 'pdf':
                downloadPDF(req, res,{totals:totalsPretty, contracts:contracts, filters: formatedFilter});
                break;
            case 'json':
                return res.json({ totals:totalsPretty, contracts, filters: formatedFilter });
                break;
            default:
                break;
        }
    });
};

let downloadXls = (req,res, contracts, filters) => {
    new ExcelExporter()
        .setPropInfoArray([
            {
                header: 'ID. PROCESO',
                propName: 'contractId'
            },
            {
                header: 'ID. CONTRATO',
                propName: 'contractNumber'
            },
            {
                header: 'DESCRIPCIÓN DE LA OBRA',
                propName: 'servicesDescription'
            },
            {
                header: 'MONTO TOTAL',
                propName: 'totalOrMaxAmount',
                format: 'currency'
            },
            {
                header: 'TIPO DE PROCEDIMIENTO',
                propName: 'procedureType',
                i18n: true
            },
            {
                header: 'ESTADO DEL PROCEDIMIENTO',
                propName: 'procedureState',
                i18n: true
            },
            {
                header: 'UNIDAD ADMINISTRATIVA SOLICITANTE',
                propName: 'applicantAdministrativeUnit',
                childPropName: 'name'
            },
            {
                header: 'MATERIA',
                propName: 'category',
                i18n: true
            },
            {
                header: 'TIPO DE CONTRATO',
                propName: 'contractType',
                i18n: true
            },
            {
                header: 'NOTAS',
                propName: 'notes'
            },
            {
                header: 'HIPERVÍNCULO A LA CONVOCATORIA',
                propName: 'announcementUrl'
            },
            {
                header: 'HIPERVÍNCULO AL DOCUMENTO DEL CONTRATO',
                propName: 'contractUrl'
            },
            {
                header: 'HIPERVÍNCULO AL DOCUMENTO DE LA PRESENTACIÓN DE PROPUESTAS',
                propName: 'presentationProposalsDocUrl'
            },
            {
                header: 'FECHA DE OBTENCIÓN DE LOS DATOS',
                propName: 'informationDate'
            },
            {
                header: 'FECHA DEL CONTRATO ',
                propName: 'contractDate'
            },
        ])
        .setDocs(contracts)
        .setFilters(filters)
        .setTitle('Contratos')
        .setFileName('contratos')
        .exportToFile(req, res);
};

let downloadPDF = (req, res, { totals, contracts, filters }) => {

    filters = filters.map((filter)=>{
        if(filter.key && filter.values!==""){
            return { text:`   ${filter.key} : ${filter.values}`,style:'headerFilters' }
        }
    });

    if(filters && filters.length){
        filters.unshift({text:'Filtrado por:', style:'headerFilters'});
    }

    let resultsTable = {
        style:'statsA2Example',
        layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows:1,docs:totals})
            .setTableMetadata([
                {
                    header: 'Monto Total',
                    headerStyle:'headerA2Style',
                    rowStyle:'rowNumberA2Style',
                    propName:'totalOrMaxAmount',
                    format:'currency'
                },
                {
                    header: 'Monto Total de Contratos por Licitación Pública',
                    headerStyle:'headerA2Style',
                    rowStyle:'rowNumberA2Style',
                    propName:'PUBLIC',
                    format:'currency'
                },
                {
                    header: 'Monto Total de Contratos por Invitación',
                    headerStyle:'headerA2Style',
                    rowStyle:'rowNumberA2Style',
                    propName:'INVITATION',
                    format:'currency'
                },
                {
                    header: 'Monto Total de Contratos por Adjudicación Directa',
                    headerStyle:'headerA2Style',
                    rowStyle:'rowNumberA2Style',
                    propName:'NO_BID',
                    format:'currency'
                }
            ])
            .setHeaders()
            .setWidths(null,300)
            .transformDocs(req)
    };
    let suppliersTable = {
        style:'tableExample',
        // layout: 'lightHorizontalLines',
        table:new PDFTable({headerRows:1,docs:contracts})
            .setTableMetadata([
                {
                    header: 'Id. Proceso',
                    headerStyle:'headerStyle',
                    rowStyle:'rowStyle',
                    propName:'contractId'
                },
                {
                    header: 'Id. Contrato',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'contractNumber'
                },
                {
                    header: 'Descripción de la obra',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'servicesDescription'
                },
                {
                    header: 'Monto Total',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'totalOrMaxAmount',
                    format:'currency'
                },
                {
                    header: 'Fecha del Contrato',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'contractDate',
                    format:'date'
                },
                {
                    header: 'Tipo de procedimiento',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'procedureType',
                    i18n: true
                },
                {
                    header: 'Estado del Procedimiento',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'procedureState',
                    i18n: true
                },
                {
                    header: 'U. Administrativa Solicitante',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'applicantAdministrativeUnit',
                    childPropName:'name'
                },
                {
                    header: 'Materia',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'category',
                    i18n: true
                },
                {
                    header: 'Tipo de Contrato',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'contractType',
                    i18n: true
                },
                {
                    header: 'Notas',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'notes'
                },
                {
                    header: 'Hipervínculo a la convocatoria',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'announcementUrl'
                },
                {
                    header: 'Hipervínculo a la convocatoria',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'announcementUrl'
                },
                {
                    header: 'Hipervínculo al documento del contrato',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'contractUrl'
                },
                {
                    header: 'Hipervínculo al documento de la presentación de propuestas',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'presentationProposalsDocUrl'
                },
                {
                    header: 'Fecha de obtención de los datos',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'informationDate'
                },
            ])
            .setHeaders()
            .setWidths(null,"auto")
            .transformDocs(req)
    };

    let headers = [{ text:"Monitor Karewa", style:'header'},
        {text : moment(new Date()).format('DD/MM/YYYY'), style:'header'}];

    new PDFExporter()
        .setFileName('monitor-karewa-contratos.pdf')
        .addHeadersToPDF(headers)
        .setPageSize('A2')
        .addTitleToPDF({text:"Información general de Contratos", style:'title'})
        .addContentToPDF(filters)
        .addContentToPDF(resultsTable)
        .addContentToPDF(suppliersTable)
        .addFooterToPDF()
        .setPageOrientation('landscape')
        .exportToFile(req, res)
};