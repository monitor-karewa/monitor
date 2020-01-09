let Variable = require('./variablesManager');


let getVariables = function () {
    return {
        //  Manejo de Contrataciones
        $MTG: Variable.makeVariable({
            name: "Monto total gastado",
            description: "Monto total gastado acorde a los contratos públicos de la organización",
            abbreviation: "$MTG",
            query: [
                {
                    $match: {}
                },
                {
                    $group: {_id: null, totalAmount: {$sum: "$totalOrMaxAmount"}}
                },
                {
                    $project: {_id: 0, result: "$totalAmount", abbreviation: {$literal: "$MTG"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$MTG"}}
                }]
        }),
        $MGLP: Variable.makeVariable({
            name: "Monto gastado bajo Licitaciones Públicas",
            description: "Monto gastado en contratos hechos bajo Licitaciones Públicas",
            abbreviation: "$MGLP",
            query: [
                {
                    $match: {procedureType: 'PUBLIC'}
                },
                {
                    $group: {_id: null, totalAmount: {$sum: "$totalOrMaxAmount"}}
                },
                {
                    $project: {_id: 0, result: "$totalAmount", abbreviation: {$literal: "$MGLP"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$MGLP"}}
                }]
        }),
        $MGAD: Variable.makeVariable({
            name: "Monto gastado bajo Adjudicación Directa",
            description: "Monto gastado en contratos hechos bajo Adjudicación Directa",
            abbreviation: "$MGAD",
            query: [
                {
                    $match: {procedureType: 'NO_BID'}
                },
                {
                    $group: {_id: null, totalAmount: {$sum: "$totalOrMaxAmount"}}
                },
                {
                    $project: {_id: 0, result: "$totalAmount", abbreviation: {$literal: "$MGAD"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$MGAD"}}
                }]

        }),
        $MGIR: Variable.makeVariable({
            name: "Monto gastado bajo Invitaciones Restringidas",
            description: "Monto gastado en contratos hechos bajo Invitaciones Restringidas",
            abbreviation: "$MGIR",
            query: [
                {
                    $match: {procedureType: 'INVITATION'}
                },
                {
                    $group: {_id: null, totalAmount: {$sum: "$totalOrMaxAmount"}}
                },
                {
                    $project: {_id: 0, result: "$totalAmount", abbreviation: {$literal: "$MGIR"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$MGIR"}}
                }]
        }),
        $NTC: Variable.makeVariable({
            name: "Número total de contratos",
            description: "Número total de contratos públicos de la organización",
            abbreviation: "$NTC",
            query: [
                {
                    $match: {}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NTC"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NTC"}}
                }]
        }),
        $NTCLP: Variable.makeVariable({
            name: "Número total de contratos bajo licitaciones públicas",
            description: "Número total de contratos bajo licitaciones públicas de la organización",
            abbreviation: "$NTCLP",
            query: [
                {
                    $match: {procedureType: 'PUBLIC'}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NTCLP"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NTCLP"}}
                }]
        }),
        $NCSF: Variable.makeVariable({
            name: "Número de contratos sin No. de Folio",
            description: "Número de contratos públicos de la organización que no cuentan con un número de folio",
            abbreviation: "$NCSF",
            query: [
                {
                    $match: {contractId: {$exists: false}}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NCSF"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NCSF"}}
                }]
        }),
        $NCADSM: Variable.makeVariable({
            name: "Numero de contratos de adjudicaciones directas que sobrepasan monto",
            description: "Numero de adjudicaciones directas que sobrepasan el monto máximo aprobado",
            abbreviation: "$NCADSM",
            query: [
                {
                    $match: {procedureType: 'NO_BID', limitExceeded: true}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NCADSM"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NCADSM"}}
                }]
        }),
        $NAC: Variable.makeVariable({
            name: "Numero de ampliaciones de contratos",
            description: "Numero de contratos que se categorizan como ampliacion de contrato",
            abbreviation: "$NAC",
            query: [
                {
                    $match: {category: 'EXTENSION'}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NAC"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NCADSM"}}
                }]
        }),
        $NCAD: Variable.makeVariable({
            name: "Numero de contratos bajo adjudicaciones directas",
            description: "Numero de contratos públicos de la organización bajo adjudicaciones directas",
            abbreviation: "$NCAD",
            query: [
                {
                    $match: {procedureType: 'NO_BID'}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NCAD"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NCAD"}}
                }]
        }),

        // Competencia Económica
        $NTP: Variable.makeVariable({
            name: "Número total de proveedores",
            description: "Número total de proveedores registrados por la organización",
            abbreviation: "$NTP",
            query: [
                {
                    $match: {}
                },
                {
                    $group: {_id: "$supplier"}
                },
                {
                    $count: "noSuppliers"
                },
                {
                    $project: {result: "$noSuppliers", abbreviation: {$literal: "$NTP"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NTP"}}
                }]
        }),
        $NPEPE: Variable.makeVariable({
            name: "Número de proveedores por encima del promedio ejercido",
            description: "Número de proveedores que se encuentran por encima del promedio ejercido",
            abbreviation: "$NPEPE",
            query: [
                {
                    $match: {}
                },
                {
                    $group: {_id: "$supplier", amount: {$sum: "$totalOrMaxAmount"}}
                },
                {
                    $group: {
                        _id: null,
                        suppliersContracts: {$push: {supplier: "$_id", amount: "$amount"}},
                        average: {$avg: "$amount"}
                    }
                },
                {
                    $unwind: "$suppliersAmounts"
                },
                {
                    $addFields: {
                        isSupplierAboveAvg: {$gt: ["$suppliersAmounts.amount", "$average"]}
                    }
                },
                {
                    $group: {_id: null, suppliersAboveAvg: {$sum: "$isSupplierAboveAvg"}}
                },
                {
                    $project: {result: "$suppliersAboveAvg", abbreviation: {$literal: "$NPEPE"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NPEPE"}}
                }]
        }),
        $NPCGE: Variable.makeVariable({
            name: "Número de proveedores que concentran el 40% del gasto ejercido",
            description: "Número de proveedores que concentran el 40% del gasto ejercido",
            abbreviation: "$NPCGE",
            query: [
                {
                    $match: {}
                },
                {
                    $group: {_id: "$supplier", amount: {$sum: "$totalOrMaxAmount"}}
                },
                {
                    $group: {
                        _id: null,
                        suppliersAmounts: {$push: {supplier: "$_id", amount: "$amount"}},
                        totalAmount: {$sum: "$amount"}
                    }
                },
                {
                    $unwind: "$suppliersAmounts"
                },
                {
                    $sort: {"suppliersAmounts.amount": -1}
                },
                {
                    $addFields: {
                        resultOfDivition: {$divide: ["$suppliersAmounts.amount", "$totalAmount"]},
                        isComplex: true
                    }
                },
                {
                    $project: {
                        supplier: "$suppliersAmounts.supplier",
                        amount: "$suppliersAmounts.amount",
                        avgOfTotal: {$multiply: [100, "$resultOfDivition"]},
                        // total40Percent : { $multiply:["$totalAmount", 0.8]},
                        isComplex: 1,
                        abbreviation: {$literal: "$NPCGE"}
                    }
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NPCGE"}}
                }],
            complexFn: function (docs, abbreviation) {
                if (docs && docs.length) {
                    // let total40Percent = docs[0].total40Percent;
                    let totalSuppliers = 0;
                    let sumAvg = 0;
                    while (sumAvg < 40) {
                        sumAvg += docs[totalSuppliers].avgOfTotal;
                        totalSuppliers++;
                    }

                    return {result: totalSuppliers, abbreviation};
                } else {
                    return {result: 0, abbreviation};
                }
            }
        }),
        $NPEPCP: Variable.makeVariable({
            name: "Número de proveedores por encima del promedio de contratos por proveedor",
            abbreviation: "$NPEPCP",
            query: [
                {
                    $match: {}
                },
                {
                    $group: {_id: "$supplier", noContracts: {$sum: 1}}
                },
                {
                    $group: {
                        _id: null,
                        suppliersContracts: {$push: {supplier: "$_id", noContracts: "$amount"}},
                        average: {$avg: "$noContracts"}
                    }
                },
                {
                    $unwind: "$suppliersContracts"
                },
                {
                    $addFields: {
                        isSupplierAboveAvg: {$gt: ["$suppliersContracts.noContracts", "$average"]}
                    }
                },
                {
                    $group: {_id: null, suppliersAboveAvg: {$sum: "$isSupplierAboveAvg"}}
                },
                {
                    $project: {result: "$suppliersAboveAvg", abbreviation: {$literal: "$NPEPCP"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NPEPCP"}}
                }]
        }),
        // Transparencia
        $NCDPT: Variable.makeVariable({
            name: "Número de contratos disponibles en el Portal de Transparencia",
            abbreviation: "$NCDPT",
            query: [
                {
                    $match: {contractUrl: {$exists: true}}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NCDPT"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NCDPT"}}
                }]
        }),
        $NIDPT: Variable.makeVariable({
            name: "Número de convocatorias o invitaciones disponibles en el Portal de Transparencia",
            abbreviation: "$NIDPT",
            query: [
                {
                    $match: {announcementUrl: {$exists: true}}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NIDPT"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NIDPT"}}
                }]
        }),
        $NCPJA: Variable.makeVariable({
            name: "Número de contratos tipo licitación pública de los que fueron publicadas las juntas de aclaraciones",
            abbreviation: "$NCPJA",
            query: [
                {
                    $match: {
                        $and: [
                            {clarificationMeetingJudgmentUrl: {$exists: true}},
                            {clarificationMeetingJudgmentUrl: {$ne: ""}}
                            ],
                        procedureType: 'PUBLIC'
                    }
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: {result: "$noContracts", abbreviation: {$literal: "$NCPJA"}}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NCPJA"}}
                }]
        }),
        $NTF: Variable.makeVariable({
            //contrato y anexos
            name: "Número total de formatos XXVIII publicados",
            abbreviation: "$NTF",
            query: [
                {
                    $match: {informationDate: {$exists: true}}
                },
                {
                    $addFields : {
                        type: { $cond: {
                            if:{ $eq:["$procedureType","NO_BID"] },
                            then:"B",
                            else:"A"
                        }}
                    }
                },
                {
                    $group: { _id: {
                            period:"$period",
                            organizerAdministrativeUnit:"$organizerAdministrativeUnit",
                            type:"$type"
                        }
                    }
                },
                {
                    $count: "noFormats"
                },
                {
                    $project: {result: "$noFormats", abbreviation: {$literal: "$NTF"}}
                },
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NFXXVII"}}
                }]
        }),
        $NFXXVII: Variable.makeVariable({
            //contrato y anexos
            name: "Número de formatos XXVIII publicados a tiempo en el Portal de Transparencia",
            abbreviation: "$NFXXVII",
            query: [
                {
                    $match: {informationDate: {$exists: true}}
                },
                {
                    $sort:{ informationDate: -1 }
                },
                {
                    $addFields : {
                        type: { $cond: {
                            if:{ $eq:["$procedureType","NO_BID"] },
                            then:"B",
                            else:"A"
                        }}
                    }
                },
                {
                    $group: { _id: {
                        period:"$period",
                        organizerAdministrativeUnit:"$organizerAdministrativeUnit",
                        type:"$type"
                    },
                        informationDate:{ $first: "$informationDate"}
                    }
                },
                {
                    $project: {
                        period:"$_id.period",
                        organizerAdministrativeUnit:"$_id.organizerAdministrativeUnit",
                        informationDate:1,
                    }
                },
                {
                    $addFields: {isComplex: true}
                },
                {
                    $project: {period: 1, informationDate: 1, abbreviation: {$literal: "$NFXXVII"}, isComplex: 1}
                }
            ],
            queryDummy: [{
                $group: {_id: null, myCount: {$sum: 1}}
            },
                {
                    $project: {result: "$myCount", abbreviation: {$literal: "$NFXXVII"}}
                }],
            complexFn: function (docs, abbreviation) {
                if (docs && docs.length) {
                    let totalFormats = 0;
                    for (let i = 0; i < docs.length; i++) {
                        let periodArray = docs[i].period ? docs[i].period.split(" ") : [];
                        if (periodArray.length) {
                            let month = 0;
                            switch (periodArray[0]) {
                                case '1o':
                                    month = 2// Marzo
                                    break
                                case '2o':
                                    month = 5// Junio
                                    break
                                case '3o':
                                    month = 8// Septiembre
                                    break
                                case '4o':
                                    month = 11// Diciembre
                                    break
                            }
                            let dateToSearch = new Date(Number(periodArray[1]), month + 1, 0);
                            dateToSearch.setDate(dateToSearch.getDate() + 31);

                            if (docs[i].informationDate && dateToSearch >= docs[i].informationDate) {
                                totalFormats++;
                            }
                        }
                    }
                    return {result: totalFormats, abbreviation};
                } else {
                    return {result: 0, abbreviation};
                }
            }
        }),
        addOrganizationFilter: function (abbreviation, idOrganization) {
            this[abbreviation].query[0].match["organization"] = idOrganization
        }
    };
};

module.exports.getVariables = getVariables;