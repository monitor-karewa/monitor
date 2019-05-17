const Supplier = require('./../models/supplier.model').Supplier;
const {Contract} = require('./../models/contract.model');
const {Organization} = require('./../models/organization.model');
const deletedSchema = require('./../models/schemas/deleted.schema');
const utils = require('./../components/utils.js');
const moment = require('moment');
const { PDFTable, PDFExporter } = require('./../components/pdfExporter');

const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const {ExcelExporter} = require('./../components/exporter');

function _getPageFromReq(req) {
    return Number(req.query.page) || 1;
}

function _aggregateSuppliersFromContracts(req, res, options = {}, callback) {
    
    let paginate = !!options.paginate;
    let query = {};
    let orBuilder = [];
    let andBuilder = [];

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

        if(andBuilder.length){
            query = {$and : andBuilder};
        }
    }



    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted, ...qByOrganization};

    let aggregate = Contract.aggregate([
        {
            $match: query
        },
        {
            $group: {
                _id: '$supplier',

                contractsCount: {$sum: 1},
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
            $lookup: {
                from: Supplier.collection.name,
                let: { "supplierId": "$_id" },
                pipeline: [
                    {
                        "$match": {
                            "$expr": {
                                "$eq": [ "$_id", "$$supplierId" ] }
                        }
                    },
                    {
                        "$project": {
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

    _aggregateSuppliersFromContracts(req, res, {paginate: true}, (err, suppliers, pageCount, itemCount) => {
        if (err) {
            logger.error(err, req, 'publicSupplier.controller#list', 'Error trying to query suppliers info from aggregate');
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

        return res.json({
            error: false,
            data: data
        });
    });
};

exports.detail = (req, res, next) => {
    let supplierId = req.query.id;

    if (supplierId) {
        supplierId = mongoose.Types.ObjectId(supplierId);
    }

    let query = {supplier : supplierId};

    let matchContracts = {};
    let orBuilder = [];
    let andBuilder = [];


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

        if(andBuilder.length){
            matchContracts = {$and : andBuilder};
            query = {
                "supplier": supplierId,
                ...matchContracts
            };
        }
    }


    Contract.aggregate([
        {
            $match: query
        },
        {
            $project: {
                supplier: 1,
                _id: 1,
                servicesDescription: 1,
                totalOrMaxAmount: 1,
                informationDate: 1,
                procedureType: 1
            }
        },
        {
            $group: {
                _id: '$supplier',
                contracts: {$push: '$$ROOT'},
                'totalPublic': {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "PUBLIC"]},
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                'totalInvitation': {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "INVITATION"]},
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                'totalNoBid': {
                    $sum: {
                        $cond: {
                            if: {$eq: ["$procedureType", "NO_BID"]},
                            then: "$totalOrMaxAmount",
                            else: 0
                        }
                    }
                },
                total: {$sum: "$totalOrMaxAmount"},
                count: {$sum: 1}
            },
            
        },
        {
            $lookup: {
                from: Supplier.collection.name,
                let: { "supplierId": "$_id" },
                pipeline: [
                    {
                        "$match": {
                            "$expr": {
                                "$eq": [ "$_id", "$$supplierId" ] }
                        }
                    },
                    {
                        "$project": {
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
            $project: {
                supplier: 1,
                contracts: 1,
                totals: {
                    total: "$total",
                    public: "$totalPublic",
                    invitation: "$totalInvitation",
                    noBid: "$totalNoBid"
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
                        cond: { $eq: [ "$$contract.procedureType", "PUBLIC" ] }
                    }
                },
                invitation: {
                    $filter: {
                        input: "$contracts",
                        as: "contract",
                        cond: { $eq: [ "$$contract.procedureType", "INVITATION" ] }
                    }
                },
                noBid: {
                    $filter: {
                        input: "$contracts",
                        as: "contract",
                        cond: { $eq: [ "$$contract.procedureType", "NO_BID" ] }
                    }
                },
            }
        }
        
    ]).exec((err, supplierDetails) => {


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




        
        switch(format){
            case 'xls':
                downloadXls(req, res, suppliers);
                break;
            case 'pdf':
                downloadPDF(req, res,{totals, suppliers});
                break;
            case 'json':
                return res.json({totals, suppliers});
                break;
            default:
                break;
        }
    });
};


let downloadXls = (req,res, suppliers) => {
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
        .setTitle('Proveedores')
        .setFileName('proveedores')
        .exportToFile(req, res);
};

let downloadPDF = (req, res, {totals, suppliers}) => {
    let resultsTable = {
        style:'statsExample',
        layout: 'lightHorizontalLines',
        table: new PDFTable({headerRows:1,docs:totals})
                    .setTableMetadata([
                        {
                            header: 'Contratos en Total',
                            headerStyle:'headerStyle',
                            rowStyle:'rowNumberStyle',
                            propName:'totalCount',
                            format:'number'
                        },
                        {
                            header: 'Contratos por Licitación Pública',
                            headerStyle:'headerStyle',
                            rowStyle:'rowNumberStyle',
                            propName:'publicCount',
                            format:'number'
                        },
                        {
                            header: 'Contratos por invitación',
                            headerStyle:'headerStyle',
                            rowStyle:'rowNumberStyle',
                            propName:'invitationCount',
                            format:'number'
                        },
                        {
                            header: 'Contratos por adjudicación directa',
                            headerStyle:'headerStyle',
                            rowStyle:'rowNumberStyle',
                            propName:'noBidCount',
                            format:'number'
                        }
                    ])
                    .setHeaders()
                    .setWidths(null,"auto", 4)
                    .transformDocs()
    };
    let suppliersTable = {
        style:'tableExample',
        // layout: 'lightHorizontalLines',
        table:new PDFTable({headerRows:1,docs:suppliers})
            .setTableMetadata([
                {
                    header: 'Nombre del Proveedor',
                    headerStyle:'headerStyle',
                    rowStyle:'rowStyle',
                    propName:'name'
                },
                {
                    header: 'Licitación Pública',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'public',
                    format:'currency'
                },
                {
                    header: 'Por Invitación',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'invitation',
                    format:'currency'
                },
                {
                    header: 'Adj. Directa',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'noBid',
                    format:'currency'
                },
                {
                    header: 'Monto Total',
                    headerStyle:'headerStyle',
                    rowStyle:'rowCurrencyStyle',
                    propName:'total',
                    format:'currency'
                },
            ])
            .setHeaders()
            .setWidths([145,145,145,145,145],"auto", 5)
            .transformDocs()
    };

    let headers = [{ text:"Monitor Karewa", style:'header'},
                    {text : moment(new Date()).format('MM/DD/YYYY'), style:'header'}];

    new PDFExporter()
        .setFileName('monitor-karewa-proveedores.pdf')
        .addHeadersToPDF(headers)
        .addTitleToPDF({text:"Información general de Proveedores", style:'title'})
        .addContentToPDF(resultsTable)
        .addContentToPDF(suppliersTable)
        .addFooterToPDF()
        .setPageOrientation('landscape')
        .exportToFile(req, res)
};