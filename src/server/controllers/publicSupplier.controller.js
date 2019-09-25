const Supplier = require('./../models/supplier.model').Supplier;
const {Contract} = require('./../models/contract.model');
const {Organization} = require('./../models/organization.model');
const deletedSchema = require('./../models/schemas/deleted.schema');
const utils = require('./../components/utils.js');
const moment = require('moment');
const {PDFTable, PDFExporter} = require('./../components/pdfExporter');
const async = require('async');

const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const {ExcelExporter} = require('./../components/exporter');

function _getPageFromReq(req) {
    return Number(req.query.page) || 1;
}

function _getFormatedFilters(req, filters) {
    let formatedFilter = [];
    for (let item in filters) {
        let row = {
            key: req.__('suppliers.filters.' + item),
            values: ''
        }
        if (Array.isArray(filters[item])) {
            filters[item].forEach((filter) => {
                if (typeof filter == "string") {
                    row.values += `${req.__(filter)}. `;

                } else if (filter.hasOwnProperty('_id') && filter.hasOwnProperty('name')) {
                    row.values += `${filter.name}. `;
                } else {
                    row.values += `${filter._id}. `
                }
                // formatedFilter[item] = { value:filter._id};
            });
        } else if (typeof filters[item] == "string" || typeof filters[item] == "number") {
            row.values += filters[item];
            // formatedFilter[item] = filters[item]._id;
        }
        formatedFilter.push(row);
    }

    return formatedFilter
}

function _aggregateSupplierDetail(req, res, callback) {
    let supplierId = req.query.id;

    if (supplierId) {
        supplierId = mongoose.Types.ObjectId(supplierId);
    }

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let query = {supplier: supplierId,...qNotDeleted, ...qByOrganization};

    let matchContracts = {};
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

        if (req.body.filters.administrativeUnits && req.body.filters.administrativeUnits.length) {
            for (let i = 0; i < req.body.filters.administrativeUnits.length; i++) {
                orBuilder.push({applicantAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({organizerAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({areaInCharge: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (andBuilder.length) {
            matchContracts = {$and: andBuilder};
            query = {
                "supplier": supplierId,
                ...matchContracts
            };
        }
    }


    let aggregate = Contract.aggregate([
        {
            $match: query
        },
        {
            $project: {
                supplier: 1,
                _id: 1,
                servicesDescription: 1,
                totalOrMaxAmount: 1,
                contractDate: 1,
                procedureType: 1,
                procedureState: 1,
                category: 1
            }
        },
        {
            $group: {
                _id: '$supplier',
                contracts: {$push: '$$ROOT'},
                'totalPublic': {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("PUBLIC","CONCLUDED"),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                'totalPublicCount': {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("PUBLIC"),
                            then: 1,
                            else: 0
                        }
                    }
                },
                'totalInvitation': {
                    $sum: {
                        $cond: {
                            if:Contract.aggregateCondProcedures("INVITATION","CONCLUDED"),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                'totalInvitationCount': {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("INVITATION"),
                            then: 1,
                            else: 0
                        }
                    }
                },
                'totalNoBid': {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("NO_BID","CONCLUDED"),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                'totalNoBidCount': {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("NO_BID"),
                            then: 1,
                            else: 0
                        }
                    }
                },
                total: {$sum: {
                    $cond: {
                        if: Contract.aggregateCondProcedures(null,"CONCLUDED"),
                        then: "$totalOrMaxAmount",
                        else: 0
                    }
                }},
                count: {$sum: 1}
            },

        },
        {
            $lookup: {
                from: Supplier.collection.name,
                let: {"supplierId": "$_id"},
                pipeline: [
                    {
                        "$match": {
                            "$expr": {
                                "$eq": ["$_id", "$$supplierId"]
                            }
                        }
                    },
                    {
                        "$project": {
                            "name": 1,
                            "updatedAt": 1
                        }
                    }
                ],
                as: "supplier"
            }
        },
        {
            $unwind: {
                path: "$supplier",
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $project: {
                supplier: 1,
                contracts: 1,
                totals: {
                    total: "$total",
                    public: "$totalPublic",
                    invitation: "$totalInvitation",
                    noBid: "$totalNoBid",
                    totalCount: "$count",
                    publicCount: "$totalPublicCount",
                    invitationCount: "$totalInvitationCount",
                    noBidCount: "$totalNoBidCount"
                }
            }
        },
        {
            $project: {
                supplier: 1,
                totals: 1,
                public: {
                    $filter: {
                        input: "$contracts",
                        as: "contract",
                        cond: {$eq: ["$$contract.procedureType", "PUBLIC"]}
                    }
                },
                invitation: {
                    $filter: {
                        input: "$contracts",
                        as: "contract",
                        cond: {$eq: ["$$contract.procedureType", "INVITATION"]}
                    }
                },
                noBid: {
                    $filter: {
                        input: "$contracts",
                        as: "contract",
                        cond: {$eq: ["$$contract.procedureType", "NO_BID"]}
                    }
                },
            }
        }

    ]);

    return aggregate.exec(callback);
}

function _aggregateSuppliersFromContracts(req, res, options = {}, callback) {

    let paginate = !!options.paginate;
    let query = {};
    let orBuilder = [];
    let andBuilder = [];

    if (req.body && req.body.filters) {
        if (req.body.filters.search && req.body.filters.search.length) {

            let searchRegex = utils.toAccentsRegex(req.body.filters.search, "gi");
            orBuilder.push({contractId: searchRegex});
            orBuilder.push({contractNumber: searchRegex});
            orBuilder.push({servicesDescription: searchRegex});
            orBuilder.push({'supplier.name': searchRegex});
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

        if (req.body.filters.administrativeUnits && req.body.filters.administrativeUnits.length) {
            for (let i = 0; i < req.body.filters.administrativeUnits.length; i++) {
                orBuilder.push({applicantAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({organizerAdministrativeUnit: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
                orBuilder.push({areaInCharge: new mongoose.Types.ObjectId(req.body.filters.administrativeUnits[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }
        
        let specificSuppliersFilter;
        const supplierIds = [];
        if (req.body.filters.suppliers && req.body.filters.suppliers.length) {
            req.body.filters.suppliers.forEach(s => supplierIds.push(new mongoose.Types.ObjectId(s._id)));
            
            specificSuppliersFilter = {$in:supplierIds};
            orBuilder.push({'supplier._id': {$in:supplierIds}});
            andBuilder.push({$or: orBuilder});
            orBuilder = [];

        }

        if (andBuilder.length) {
            query = {$and: andBuilder};
        }

        // if (supplierIds && supplierIds.length) {
            // query._id = specificSuppliersFilter;
        // }
    }


    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};

    let qProcedureStateConcluded = Contract.qProcedureStateConcluded(!!options.skipFilterByCategory);

    let finalQuery = {
        ...qProcedureStateConcluded,
        ...query,
    };

    if (finalQuery["$and"]) {
        finalQuery["$and"] = (query["$and"] || []).concat((qProcedureStateConcluded["$and"] || []))
    }
    
    query = finalQuery;

    let aggregate = Contract.aggregate([
        {
            $lookup: {
                from: Supplier.collection.name,
                let: {"supplierId": "$supplier"},
                pipeline: [
                    {
                        "$match": {
                            "$expr": {
                                "$eq": ["$_id", "$$supplierId"]
                            }
                        }
                    },
                    {
                        "$project": {
                            "_id": 1,
                            "name": 1
                        }
                    }
                ],
                as: "supplier"
            }
        },
        {
            $unwind: {
                path: "$supplier",
                preserveNullAndEmptyArrays: true
            },
        },
        {
            $match: query
        },
        {
            $group: {
                _id: '$supplier._id',
                supplier: {$first: '$supplier'},
                contractsCount: {$sum: 1},
                publicCount: {
                    $sum: {
                        $cond: {
                            if:Contract.aggregateCondProcedures("PUBLIC","CONCLUDED", options.skipFilterByCategory),
                            then: 1,
                            else: 0
                        }
                    }
                },
                invitationCount: {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("INVITATION","CONCLUDED", options.skipFilterByCategory),
                            then: 1,
                            else: 0
                        }
                    }
                },
                noBidCount: {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("NO_BID","CONCLUDED", options.skipFilterByCategory),
                            then: 1,
                            else: 0
                        }
                    }
                },

                public: {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("PUBLIC","CONCLUDED", options.skipFilterByCategory),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                invitation: {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("INVITATION","CONCLUDED", options.skipFilterByCategory),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                noBid: {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures("NO_BID","CONCLUDED", options.skipFilterByCategory),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                total: {
                    $sum: {
                        $cond: {
                            if: Contract.aggregateCondProcedures(null,"CONCLUDED", options.skipFilterByCategory),
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                }
            }
        },
        {
            $project: {
                name: "$supplier.name",
                contractsCount: 1,
                publicCount: 1,
                invitationCount: 1,
                noBidCount: 1,

                public: 1,
                invitation: 1,
                noBid: 1,
                total: 1
            }
        }
    ]);

    if (!paginate) {
        return aggregate.exec(callback);
    } else {

        let page = _getPageFromReq(req);
        let paginateOptions = {
            page: page,
            limit: 10,
            sortBy: {
                total: -1
            }
        };

        return Contract.aggregatePaginate(aggregate, paginateOptions, callback);
    }
}


exports.list = (req, res, next) => {

    let page = _getPageFromReq(req);

    async.parallel({
            mainQuery: function (callback) {
                _aggregateSuppliersFromContracts(req, res, {paginate: true, skipFilterByCategory: true}, (err, suppliers, pageCount, itemCount) => {
                    if (err) {
                        logger.error(err, req, 'publicSupplier.controller#list', 'Error trying to query suppliers info from aggregate');
                        return res.json({
                            error: true
                        });
                    }

                    _aggregateSuppliersFromContracts(req, res, {paginate: false, skipFilterByCategory: false}, (err, suppliersWithoutPagination, pageCountWithoutPagination, itemCountWithoutPagination) => {

                        if (err) {
                            logger.error(err, req, 'publicSupplier.controller#list', 'Error trying to query suppliers info from aggregate without pagination');
                            return res.json({
                                error: true
                            });
                        }
                        
                        let totals = {
                            totalCount: 0,
                            publicCount: 0,
                            invitationCount: 0,
                            noBidCount: 0,
    
                            total: 0,
                            public: 0,
                            invitation: 0,
                            noBid: 0,
                        };
    
                        suppliersWithoutPagination.forEach((supplierInfo) => {
                            totals.totalCount += (supplierInfo.publicCount + supplierInfo.invitationCount + supplierInfo.noBidCount);
                            totals.publicCount += supplierInfo.publicCount;
                            totals.invitationCount += supplierInfo.invitationCount;
                            totals.noBidCount += supplierInfo.noBidCount;
    
                            totals.total += supplierInfo.total;
                            totals.public += supplierInfo.public;
                            totals.invitation += supplierInfo.invitation;
                            totals.noBid += supplierInfo.noBid;
                        });
    
                        let pagination = {
                            total: itemCount,
                            page: page,
                            pages: pageCount
                        };
    
                        let data = {
                            totals: totals,
                            suppliers: suppliers,
                            pagination: pagination
                        };
    
                        return callback(null, {
                            error: false,
                            data: data
                        });
                    });

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

exports.downloadDetail = (req, res, next) => {
    let format = req.params.format;
    req.body.filters = JSON.parse(req.query.filters);

    _aggregateSupplierDetail(req, res, (err, supplierDetail) => {
        let filters = req.body.filters;
        let formatedFilter = _getFormatedFilters(req, filters);
        supplierDetail = supplierDetail && supplierDetail.length ? supplierDetail[0] : {};

        switch (format) {
            case 'xls':
                downloadDetailXls(req, res, {supplier: supplierDetail, filters: formatedFilter});
                break;
            case 'pdf':
                downloadDetailPDF(req, res, {supplier: supplierDetail, filters: formatedFilter});
                break;
            case 'json':
                return res.json({supplierDetail, filters: formatedFilter});
                break;
            default:
                break;
        }


    });

};


exports.detail = (req, res, next) => {

    _aggregateSupplierDetail(req, res, (err, supplierDetails) => {

        // {
        //     supplier: {
        //         _id: '',
        //         name: ''
        //     },
        //     totals: {
        //         total: 0,
        //         count: 0,
        //         public: 0,
        //         invitation: 0,
        //         noBid: 0
        //     },
        //     public: [{
        //         _id: '',
        //         servicesDescription: '',
        //         totalOrMaxAmount: 0,
        //         informationDate: Date()
        //     }],
        //     invitation: [{
        //         _id: '',
        //         servicesDescription: '',
        //         totalOrMaxAmount: 0,
        //         informationDate: Date()
        //     }],
        //     noBid: [{
        //         _id: '',
        //         servicesDescription: '',
        //         totalOrMaxAmount: 0,
        //         informationDate: Date()
        //     }]
        // }
        // console.log('supplierDetails[0]', supplierDetails[0]);

        if (err) {
            return res.json({
                error: true
            });
        }

        return res.json({
            error: false,
            data: supplierDetails[0]
        });
    });
};

exports.download = (req, res, next) => {
    let format = req.params.format;
    req.body.filters = JSON.parse(req.query.filters);

    if (!['xls', 'pdf', 'json'].includes(format)) {
        res.status(404);
        return res.end();
    }

    _aggregateSuppliersFromContracts(req, res, {paginate: false}, (err, suppliers) => {
        let totals = {
            totalCount: 0,
            publicCount: 0,
            invitationCount: 0,
            noBidCount: 0,

            total: 0,
            public: 0,
            invitation: 0,
            noBid: 0,
        };

        suppliers.forEach((supplierInfo) => {
            totals.totalCount += supplierInfo.contractsCount;
            totals.publicCount += supplierInfo.publicCount;
            totals.invitationCount += supplierInfo.invitationCount;
            totals.noBidCount += supplierInfo.noBidCount;

            totals.total += supplierInfo.total;
            totals.public += supplierInfo.public;
            totals.invitation += supplierInfo.invitation;
            totals.noBid += supplierInfo.noBid;
        });


        let filters = req.body.filters;
        let formatedFilter = _getFormatedFilters(req, filters);

        switch (format) {
            case 'xls':
                downloadXls(req, res, suppliers, formatedFilter);
                break;
            case 'pdf':
                downloadPDF(req, res, {totals, suppliers, filters: formatedFilter});
                break;
            case 'json':
                return res.json({totals, suppliers, filters: formatedFilter});
                break;
            default:
                break;
        }
    });
};

let downloadDetailXls = (req, res, suppliersDetail, filters) => {

    let excelInfo = {
        totals: {
            docs: [suppliersDetail.totals],
            sheetNumber: 1
        },
        supplierContracts: {
            docs: [...suppliersDetail.public, ...suppliersDetail.invitation, ...suppliersDetail.noBid],
            sheetNumber: 2
        }
    };

    new ExcelExporter()
        .setNumberOfSheets(2)
        .setPropInfoArray([
            {
                header: 'MONTO TOTAL',
                propName: 'total',
                format: 'currency',
                sheet: 1
            },
            {
                header: 'MONTO TOTAL DE CONTRATOS POR LICITACIÓN PÚBLICA',
                propName: 'public',
                format: 'currency',
                sheet: 1
            },
            {
                header: 'MONTO TOTAL DE CONTRATOS POR INVITACIÓN',
                propName: 'invitation',
                format: 'currency',
                sheet: 1
            },
            {
                header: 'MONTO TOTAL DE CONTRATOS POR ADJUDICACIÓN DIRECTA',
                propName: 'noBid',
                format: 'currency',
                sheet: 1
            },
            {
                header: 'CONTRATOS POR LICITACIÓN PÚBLICA',
                propName: 'publicCount',
                sheet: 1
            },
            {
                header: 'CONTRATOS POR INVITACIÓN',
                propName: 'invitationCount',
                sheet: 1
            },
            {
                header: 'CONTRATOS POR ADJUDICACIÓN DIRECTA',
                propName: 'noBidCount',
                sheet: 1
            },
            {
                header: 'TIPO DE PROCEDIMIENTO',
                propName: 'procedureType',
                sheet: 2,
                i18n: true
            },
            {
                header: 'DESCRIPCION DE LAS OBRAS, BIENES O SERVICIOS',
                propName: 'servicesDescription',
                sheet: 2
            },
            {
                header: 'MONTO TOTAL',
                propName: 'totalOrMaxAmount',
                format: 'currency',
                sheet: 2
            },
            {
                header: 'FECHA DE OBTENCIÓN DE LOS DATOS',
                propName: 'informationDate',
                format: 'date',
                sheet: 2
            },

        ])
        .setDocs(suppliersDetail)
        .setFilters(filters)
        .setTitle(`Proveedor ${suppliersDetail.supplier.name} Detalle`)
        .setFileName('proveedores-detalle')
        .exportToFileExtraSheets(req, res, excelInfo);
};


let downloadXls = (req, res, suppliers, filters) => {
    new ExcelExporter()
        .setPropInfoArray([
            {
                header: 'NOMBRE DEL PROVEEDOR',
                propName: 'name'
            },
            {
                header: 'LICITACIÓN PÚBLICA',
                propName: 'public',
                format: 'currency'
            },
            {
                header: 'POR INVITACIÓN',
                propName: 'invitation',
                format: 'currency'
            },
            {
                header: 'ADJ. DIRECTA',
                propName: 'noBid',
                format: 'currency'
            },
            {
                header: 'MONTO TOTAL',
                propName: 'total',
                format: 'currency'
            },
        ])
        .setDocs(suppliers)
        .setFilters(filters)
        .setTitle('Proveedores')
        .setFileName('proveedores')
        .exportToFile(req, res);
};

let downloadPDF = (req, res, {totals, suppliers, filters}) => {

    filters = filters.map((filter) => {
        if (filter.key && filter.values !== "") {
            return {text: `   ${filter.key} : ${filter.values}`, style: 'headerFilters'}
        }
    });

    if (filters && filters.length) {
        filters.unshift({text: 'Filtrado por:', style: 'headerFilters'});
    }
    let resultsTable = {
        style: 'statsExample',
        layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows: 1, docs: totals})
            .setTableMetadata([
                {
                    header: 'Contratos en Total',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'totalCount',
                    format: 'number'
                },
                {
                    header: 'Contratos por Licitación Pública',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'publicCount',
                    format: 'number'
                },
                {
                    header: 'Contratos por invitación',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'invitationCount',
                    format: 'number'
                },
                {
                    header: 'Contratos por adjudicación directa',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'noBidCount',
                    format: 'number'
                }
            ])
            .setHeaders()
            .setWidths(null, "auto")
            .transformDocs()
    };
    let suppliersTable = {
        style: 'tableExample',
        // layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows: 1, docs: suppliers})
            .setTableMetadata([
                {
                    header: 'Nombre del Proveedor',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowStyle',
                    propName: 'name'
                },
                {
                    header: 'Licitación Pública',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowCurrencyStyle',
                    propName: 'public',
                    format: 'currency'
                },
                {
                    header: 'Por Invitación',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowCurrencyStyle',
                    propName: 'invitation',
                    format: 'currency'
                },
                {
                    header: 'Adj. Directa',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowCurrencyStyle',
                    propName: 'noBid',
                    format: 'currency'
                },
                {
                    header: 'Monto Total',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowCurrencyStyle',
                    propName: 'total',
                    format: 'currency'
                },
            ])
            .setHeaders()
            .setWidths([145, 145, 145, 145, 145], "auto")
            .transformDocs()
    };

    let headers = [{text: "Monitor Karewa", style: 'header'},
        {text: moment(new Date()).format('DD/MM/YYYY'), style: 'header'}];

    new PDFExporter()
        .setFileName('monitor-karewa-proveedores.pdf')
        .addHeadersToPDF(headers)
        .addTitleToPDF({text: "Información general de Proveedores", style: 'title'})
        .addContentToPDF(filters)
        .addContentToPDF(resultsTable)
        .addContentToPDF(suppliersTable)
        .addFooterToPDF()
        .setPageOrientation('landscape')
        .exportToFile(req, res)
};


let downloadDetailPDF = (req, res, {supplier, filters}) => {

    filters = filters.map((filter) => {
        if (filter.key && filter.values !== "") {
            return {text: `   ${filter.key} : ${filter.values}`, style: 'headerFilters'}
        }
    });

    if (filters && filters.length) {
        filters.unshift({text: 'Filtrado por:', style: 'headerFilters'});
    }
    let totalsTable = {
        style: 'statsCurrency4Col',
        layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows: 1, docs: supplier.totals})
            .setTableMetadata([
                {
                    header: 'Monto Total',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'total',
                    format: 'currency'
                },
                {
                    header: 'Monto Total de Contratos por Licitación Pública',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'public',
                    format: 'currency'
                },
                {
                    header: 'Monto Total de Contratos por Invitación',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'invitation',
                    format: 'currency'
                },
                {
                    header: 'Monto Total de Contratos por Adjudicación Directa',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'noBid',
                    format: 'currency'
                }
                // {
                //     header: 'Monto Total de Contratos por Adjudicación Directa',
                //     headerStyle:'headerStyle',
                //     rowStyle:'rowNumberStyle',
                //     propName:'noBid',
                //     format:'currency'
                // },
            ])
            .setHeaders()
            .setWidths(null, "auto")
            .transformDocs()
    };

    let countTable = {
        style: 'statsExample',
        layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows: 1, docs: supplier.totals})
            .setTableMetadata([
                {
                    header: 'Contratos Totales',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'totalCount'
                },
                {
                    header: 'Contratos por Licitación Pública',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'publicCount'
                },
                {
                    header: 'Contratos por Invitación',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'invitationCount'
                },
                {
                    header: 'Contratos por Adjudicación Directa',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowNumberStyle',
                    propName: 'noBidCount'

                }
            ])
            .setHeaders()
            .setWidths(null, "auto")
            .transformDocs(req)
    };

    let rowsTable = {
        style: 'table4Col',
        // layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows: 1, docs: [...supplier.public, ...supplier.invitation, ...supplier.noBid]})
            .setTableMetadata([
                {
                    header: 'Tipo de Procedimiento',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowStyle',
                    propName: 'procedureType',
                    i18n: true
                },
                {
                    header: 'Descripción de las obras, bienes o servicios',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowStyle',
                    propName: 'servicesDescription'
                },
                {
                    header: 'Monto Total',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowStyle',
                    propName: 'totalOrMaxAmount',
                    format: 'currency'
                },
                {
                    header: 'Fecha de obtención de los datos',
                    headerStyle: 'headerStyle',
                    rowStyle: 'rowStyle',
                    propName: 'informationDate',
                    format: 'date'
                },
            ])
            .setHeaders()
            .setWidths(null, "auto")
            .transformDocs(req)
    };


    let headers = [{text: "Monitor Karewa", style: 'header'},
        {text: moment(new Date()).format('DD/MM/YYYY'), style: 'header'}];

    new PDFExporter()
        .setFileName('monitor-karewa-proveedores.pdf')
        .addHeadersToPDF(headers)
        .addTitleToPDF({text: `Información del Proveedor ${supplier.supplier.name}`, style: 'title'})
        .addContentToPDF(filters)
        .addContentToPDF(totalsTable)
        .addContentToPDF(countTable)
        .addContentToPDF(rowsTable)
        .addFooterToPDF()
        .setPageOrientation('landscape')
        .exportToFile(req, res)
};