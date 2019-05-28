let Variable = require('./variablesManager');



let getVariables = function() {
    return {
        //  Manejo de Contrataciones
        $MTG: Variable.makeVariable({
            name:"Monto total gastado",
            description :"Monto total gastado acorde a los contratos públicos de la organización",
            abbreviation:"$MTG",
            query:[
                {
                    $match:{}
                },
                {
                    $group:{_id:null, totalAmount:{ $sum : "$totalOrMaxAmount"}}
                },
                {
                    $project: { _id:0, result: "$totalAmount", abbreviation: { $literal:"$MTG" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$MTG"}}
                }]
        }),
        $MGLP: Variable.makeVariable({
            name:"Monto gastado bajo Licitaciones Públicas",
            description:"Monto gastado en contratos hechos bajo Licitaciones Públicas",
            abbreviation:"$MGLP",
            query:[
                {
                    $match:{ procedureType: 'PUBLIC' }
                },
                {
                    $group:{_id:null, totalAmount:{ $sum : "$totalOrMaxAmount"}}
                },
                {
                    $project: { _id:0, result: "$totalAmount", abbreviation: { $literal:"$MGLP" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$MGLP"}}
                }]
        }),
        $MGAD: Variable.makeVariable({
            name:"Monto gastado bajo Adjudicación Directa",
            description:"Monto gastado en contratos hechos bajo Adjudicación Directa",
            abbreviation:"$MGAD",
            query:[
                {
                    $match:{ procedureType: 'NO_BID' }
                },
                {
                    $group:{_id:null, totalAmount:{ $sum : "$totalOrMaxAmount"}}
                },
                {
                    $project: { _id:0, result: "$totalAmount", abbreviation: { $literal:"$MGAD" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$MGAD"}}
                }]

        }),
        $MGIR: Variable.makeVariable({
            name:"Monto gastado bajo Invitaciones Restringidas",
            description:"Monto gastado en contratos hechos bajo Invitaciones Restringidas",
            abbreviation:"$MGIR",
            query:[
                {
                    $match:{ procedureType: 'INVITATION' }
                },
                {
                    $group:{_id:null, totalAmount:{ $sum : "$totalOrMaxAmount"}}
                },
                {
                    $project: { _id:0, result: "$totalAmount", abbreviation: { $literal : "$MGIR"}}
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$MGIR"}}
                }]
        }),
        $NTC: Variable.makeVariable({
            name:"Número total de contratos",
            description:"Número total de contratos públicos de la organización",
            abbreviation:"$NTC",
            query:[
                {
                    $match:{}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: { result:"$noContracts", abbreviation: { $literal : "$NTC" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NTC"}}
                }]
        }),
        $NCSF: Variable.makeVariable({
            name:"Número de contratos sin No. de Folio",
            description:"Número de contratos públicos de la organización que no cuentan con un número de folio",
            abbreviation:"$NCSF",
            query:[
                {
                    $match:{ contractId:{ $exists: false }}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: { result:"$noContracts", abbreviation: { $literal : "$NCSF" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NCSF"}}
                }]
        }),
        $NCADSM: Variable.makeVariable({
            name:"Numero de contratos de adjudicaciones directas que sobrepasan monto",
            description:"Numero de adjudicaciones directas que sobrepasan el monto máximo aprobado",
            abbreviation:"$NCADSM",
            query:[
                {
                    $match: {procedureType: 'NO_BID', limitExceeded:true}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: { result:"$noContracts", abbreviation: { $literal : "$NCADSM" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NCADSM"}}
                }]
        }),
        $NCAD: Variable.makeVariable({
            name:"Numero de contratos bajo adjudicaciones directas",
            description:"Numero de contratos públicos de la organización bajo adjudicaciones directas",
            abbreviation:"$NCAD",
            query:[
                {
                    $match:{ procedureType: 'NO_BID'}
                },
                {
                    $count: "noContracts"
                },
                {
                    $project: { result:"$noContracts", abbreviation: { $literal : "$NCAD" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NCAD"}}
                }]
        }),

        // Competencia Económica
        $NTP: Variable.makeVariable({
            name:"Número total de proveedores",
            description:"Número total de proveedores registrados por la organización",
            abbreviation:"$NTP",
            query:[
                {
                    $match : {}
                },
                {
                    $group: { _id:"$supplier" }
                },
                {
                    $count: "noSuppliers"
                },
                {
                    $project: { result:"$noSuppliers", abbreviation: { $literal : "$NTP" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NTP"}}
                }]
        }),
        $NPEPE: Variable.makeVariable({
            name:"Número de proveedores por encima del promedio ejercido",
            description:"Número de proveedores que se encuentran por encima del promedio ejercido",
            abbreviation:"$NPEPE",
            query:[
                {
                    $match : {
                    }
                },
                {
                    $group:{ _id:"$supplier", amount:{ $sum : "$totalOrMaxAmount" } }
                },
                {
                    $group:{ _id:null,
                        suppliersContracts: { $push : { supplier: "$_id", amount : "$amount"} },
                        average : { $avg : "$amount" }
                    }
                },
                {
                    $unwind: "$suppliersAmounts"
                },
                {
                    $addFields: {
                        isSupplierAboveAvg : { $gt: ["$suppliersAmounts.amount", "$average"] }
                    }
                },
                {
                    $group:{_id:null, suppliersAboveAvg:{ $sum : "$isSupplierAboveAvg" } }
                },
                {
                    $project:{ result:"$suppliersAboveAvg", abbreviation:{ $literal:"$NPEPE" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NPEPE"}}
                }]
        }),
        $NP80E: Variable.makeVariable({
            name:"Número de proveedores que concentran el 80% del gasto ejercido",
            description:"Número de proveedores que concentran el 80% del gasto ejercido",
            abbreviation:"$NP80E",
            query:[
                {
                    $match: {}
                },
                {
                    $group:{ _id:"$supplier", amount:{ $sum : "$totalOrMaxAmount" } }
                },
                {
                    $group:{ _id:null,
                        suppliersAmounts: { $push : { supplier: "$_id", amount : "$amount"} },
                        totalAmount : { $sum : "$amount" }
                    }
                },
                {
                    $unwind: "$suppliersAmounts"
                },
                {
                    $sort:{"suppliersAmounts.amount":-1}
                },
                {
                    $addFields:{
                        resultOfDivition:{ $divide: ["$suppliersAmounts","$totalAmount"]}
                    }
                },
                {
                    $project:{
                        supplier: "$suppliersAmounts.supplier",
                        amount: "$suppliersAmounts.amount",
                        avgOfTotal : { $multiply:[100, "$resultOfDivition"] },
                        // total80Percent : { $multiply:["$totalAmount", 0.8]},
                        isComplex: true,
                        abbreviation:{ $literal: "$NP80E"}
                    }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NP80E"}}
                }],
            complexFn: function (docs, abbreviation) {
                if(docs && docs.length){
                    // let total80Percent = docs[0].total80Percent;
                    let totalSuppliers = 0;
                    let sumAvg = 0;
                    while(sumAvg < 80){
                        sumAvg += docs[totalSuppliers].avgOfTotal;
                        totalSuppliers++;
                    }

                    return {result:totalSuppliers,abbreviation};
                } else {
                    return {result:0,abbreviation};
                }
            }
        }),
        $NPEPCP: Variable.makeVariable({
            name:"Número de proveedores por encima del promedio de contratos por proveedor",
            abbreviation:"$NPEPCP",
            query:[
                {
                    $match : {

                    }
                },
                {
                    $group:{ _id:"$supplier", noContracts:{ $sum : 1 } }
                },
                {
                    $group:{ _id:null,
                        suppliersContracts: { $push : { supplier: "$_id", noContracts : "$amount"} },
                        average : { $avg : "$noContracts" }
                    }
                },
                {
                    $unwind: "$suppliersContracts"
                },
                {
                    $addFields: {
                        isSupplierAboveAvg : { $gt: ["$suppliersContracts.noContracts", "$average"] }
                    }
                },
                {
                    $group:{_id:null, suppliersAboveAvg:{ $sum : "$isSupplierAboveAvg" } }
                },
                {
                    $project:{ result:"$suppliersAboveAvg", abbreviation:{ $literal:"$NPEPCP" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NPEPCP"}}
                }]
        }),
        // Transparencia
        $NCDPT: Variable.makeVariable({
            name:"Número de contratos disponibles en el Portal de Transparencia",
            abbreviation:"$NCDPT",
            query:[
                {
                    $match:{presentationProposalsDocUrl: { $exists: true} }
                },
                {
                    $count: "noContracts"
                },
                {
                    $project:{ results:"$noContracts", abbrevation:{ $literal : "$NCPJA" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NCDPT"}}
                }]
        }),
        $NIDPT: Variable.makeVariable({
            name:"Número de convocatorias o invitaciones disponibles en el Portal de Transparencia",
            abbreviation:"$NIDPT",
            query:[
                {
                    $match:{announcementUrl: { $exists: true} }
                },
                {
                    $count: "noContracts"
                },
                {
                    $project:{ results:"$noContracts", abbrevation:{ $literal : "$NCPJA" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NIDPT"}}
                }]
        }),
        $NCPJA: Variable.makeVariable({
            name:"Número de contratos de los que fueron publicadas las juntas de aclaraciones",
            abbreviation:"$NCPJA",
            query:[
                {
                    $match:{clarificationMeetingJudgmentUrl: { $exists: true} }
                },
                {
                    $count: "noContracts"
                },
                {
                    $project:{ results:"$noContracts", abbrevation:{ $literal : "$NCPJA" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                {$project:{ result : "$myCount", abbreviation : { $literal : "$NCPJA"}}
                }]
        }),
        $NFXXVII: Variable.makeVariable({
            //contrato y anexos
            name:"Número de formatos XXVIII publicados a tiempo en el Portal de Transparencia",
            abbreviation:"$NFXXVII",
            query:[
                {
                    $match:{contractUrl: { $exists: true} }
                },
                {
                    $count: "noContracts"
                },
                {
                    $project:{ results:"$noContracts", abbrevation:{ $literal : "$NCPJA" } }
                }
            ],
            queryDummy:[{
                $group:{_id: null, myCount: {$sum: 1 } }},
                { $project:{ result : "$myCount", abbreviation : { $literal : "$NFXXVII"}}
                }]
        }),
        addOrganizationFilter : function(abbreviation,idOrganization){
            this[abbreviation].query[0].match["organization"] = idOrganization
        }
    };
};

module.exports.getVariables = getVariables;