const {Organization} = require('./../models/organization.model');
const {RouteLog} = require('./../models/routeLog.model');
const {Contract} = require('./../models/contract.model');
const {Notification} = require('./../models/notification.model');
const {Supplier} = require('./../models/supplier.model');
const {AdministrativeUnit} = require('./../models/administrativeUnit.model');
const {Calculation} = require('./../models/calculation.model');

const deletedSchema = require('./../models/schemas/deleted.schema');

exports.index = (req, res, next) => {
    res.render('admin/index');
};

exports.visitsByRoute= (req, res, next) => {
    RouteLog.aggregate([
        {
            $match:{
                "path":{$in:[/\/suppliers/, /\/resources/, /\/comparations/, /\/contracts/, /\/calculations\//]}
            }
        },
        {
            $project:{
                arrayPath:{ $split: ["$path", "/"] }
            }
        },
        {
            $project:{
                principalPath:{$arrayElemAt:["$arrayPath", 1]},
                sizeArray:{$size:"$arrayPath"}
            }
        },
        {
            $project:{
                principalPath:1,
                hasDetail: {$cond:{if:{$eq:["$sizeArray", 3]}, then:true, else:false}}
            }
        },
        {
            $group:{
                _id:{
                    path:"$principalPath",
                    hasDetail:"$hasDetail"
                },
                visits:{$sum:1}
            }
        }
    ]).exec((err, data) => {
        if (err) {
            logger.error(err, req, 'landing.controller#amountByPeriods', 'Error trying to query amounts by period');
            return res.json({
                error: true
            });
        }
        let datasets = [];
        let finalLabels = [];
        for (let i = 0; i < data.length; i++) {
            switch (data[i]._id.path) {
                case "suppliers":
                    if(data[i]._id.hasDetail){
                        finalLabels.push("Detalle de proveedores");
                    } else {
                        finalLabels.push("Listado de proveedores");
                    }
                    break;
                case "resources":
                    finalLabels.push("Recursos");
                    break;
                case "comparations":
                    if(data[i]._id.hasDetail){
                        finalLabels.push("Detalle de comparación de tableros");
                    } else {
                        finalLabels.push("Listado de comparación de tableros");
                    }
                    break;
                case "contracts":
                    if(data[i]._id.hasDetail){
                        finalLabels.push("Detalle de contratos");
                    } else {
                        finalLabels.push("Listado de contratos");
                    }
                    break;
                case "calculations":
                    finalLabels.push("Índice de Riesgo de Corrupción");
                    break;
                default:
                    finalLabels.push(data[i]._id.path);
            }
            datasets.push(data[i].visits);
        }


        return res.json({
            error: false,
            data: {
                datasets:datasets,
                labels:finalLabels
            }
        });
    });
};

exports.infoValues= (req, res, next) => {
    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let query = {...qByOrganization, ...qNotDeleted};
    Promise.all([
        RouteLog.count({"path":{$in:["/select-organization"]}}),
        Contract.count(query),
        Supplier.count(query),
        AdministrativeUnit.count(query),
        Calculation.count(query)
    ]).then(function (counts) {
        return res.json({
            error: false,
            data: {
                visitsCount:counts[0],
                contractsCount:counts[1],
                proveedoresCount:counts[2],
                unidadesCount:counts[3],
                calculosCount:counts[4],
            }
        });
    })
};

exports.notifications= (req, res, next) => {
    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let currentUserId = req.user._id;
    let query = {...qByOrganization, ...qNotDeleted, seenUsers:{$nin:[currentUserId]}};
    Notification
        .find(query)
        .populate('createdUser')
        .exec((err, notifications) => {
            if(err){
                return res.json({
                    error: true,
                    data: []
                });
            } else {
                return res.json({
                    error: false,
                    data: notifications
                });
            }
    });
};
exports.readNotifications= (req, res, next) => {
    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let currentUserId = req.user._id;
    let query = {...qByOrganization, ...qNotDeleted, seenUsers:{$nin:[currentUserId]}};
    Notification
        .find(query)
        .exec((err, notifications) => {
            if(err){
                return res.json({
                    error: true,
                    data: []
                });
            } else {
                for (let i = 0; i < notifications.length; i++) {
                    notifications[i].seenUsers.push(currentUserId);
                    notifications[i].save()
                }
                return res.json({
                    error: false,
                    data: []
                });
            }
    });
};

exports.visitsByMonths = (req, res, next) => {
    //Sacar los primeros dos meses
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let actualQuerter = 1;
    switch (month) {
        case 1:
        case 2:
        case 3:
            actualQuerter = 1;
            break;
        case 4:
        case 5:
        case 6:
            actualQuerter = 2;
            break;
        case 7:
        case 8:
        case 9:
            actualQuerter = 3;
            break;
        case 10:
        case 11:
        case 12:
            actualQuerter = 4;
            break;

    }

    let typeRequest = req.body != undefined && req.body.type != undefined ? req.body.type : "MONTHS";

    let aggregateList = [];
    aggregateList.push({
        $match:{
            "path":{$in:["/select-organization"]},
            // "path":{$nin:["/login", "/admin", "/select-organization", "/style", "/style/client"]},
            // "organization":Organization.currentOrganizationId(req),
        }
    });
    aggregateList.push({
        $project:{
            month:{$month: "$createdAt"},
            year:{$year:"$createdAt"}
        }
    });

    let aviableYears = [];
    aviableYears.push(year);
    let aviableMatchs = [];

    switch (typeRequest) {
        case "MONTHS":
            for (let i = month; i > 0; i--) {
                aviableMatchs.push({month:i, year:year})
            }

            if(aviableMatchs.length != 12){
                let behindYear = year - 1;
                for (let i = 12; i > month; i--) {
                    aviableMatchs.push({month:i, year:behindYear})
                }
            }

            aggregateList.push( {
                $match:{
                    $or:aviableMatchs
                }
            });
            aggregateList.push({
                $group:{
                    _id:{
                        year:"$year",
                        month:"$month"
                    },
                    total:{$sum:1}
                }
            });
            aggregateList.push({
                $sort:{"_id.year":-1, "_id.month":-1}
            });
            break;
        case "QUARTER":
            for (let i = actualQuerter; i > 0; i--) {
                aviableMatchs.push({quarter:i, year:year})
            }


            if(aviableMatchs.length != 4){
                let behindYear = year - 1;
                for (let i = 4; i > actualQuerter; i--) {
                    aviableMatchs.push({quarter:i, year:behindYear})
                }
            }
            aggregateList.push({
                $project:{
                    quarter:{
                        $switch:{
                            branches:[
                                {case:{$or:[{$eq:["$month",1]},{$eq:["$month",2]}, {$eq:["$month",3]}]}, then:1},
                                {case:{$or:[{$eq:["$month",4]},{$eq:["$month",5]}, {$eq:["$month",6]}]}, then:2},
                                {case:{$or:[{$eq:["$month",7]},{$eq:["$month",8]}, {$eq:["$month",9]}]}, then:3},
                                {case:{$or:[{$eq:["$month",10]},{$eq:["$month",11]}, {$eq:["$month",12]}]}, then:4},
                            ]
                        }
                    },
                    year:"$year"
                }
            });
            aggregateList.push( {
                $match:{
                    $or:aviableMatchs
                }
            });
            aggregateList.push({
                $group:{
                    _id:{
                        year:"$year",
                        quarter:"$quarter"
                    },
                    total:{$sum:1}
                }
            });
            aggregateList.push({
                $sort:{"_id.year":-1, "_id.quarter":-1}
            });
            break;
        case "YEAR":
            for (let i = 5; i >0; i--) {
                aviableYears.push(year-i);
            }

            aggregateList.push( {
                $match:{
                    year:{$in:aviableYears}
                }
            });
            aggregateList.push({
                $group:{
                    _id:{
                        year:"$year"
                    },
                    total:{$sum:1}
                }
            });
            aggregateList.push({
                $sort:{"_id.year": -1}
            });
            break;
    }




    RouteLog.aggregate(
       aggregateList

    ).exec((err, data) => {
        if (err) {
            logger.error(err, req, 'landing.controller#amountByPeriods', 'Error trying to query amounts by period');
            return res.json({
                error: true
            });
        }
        let datasets = [];
        let finalLabels = [];
        let chartData = {
            name:"Visitas",
            data:[]
        };
        switch (typeRequest) {
            case "MONTHS":
                aviableMatchs = aviableMatchs.reverse();
                for (let i = 0; i < aviableMatchs.length; i++) {
                    let tempMatch = aviableMatchs[i];
                    let hasVisits = false;
                    for (let j = 0; j < data.length; j++) {
                        if(data[j]._id.year == tempMatch.year && data[j]._id.month == tempMatch.month){
                            chartData.data.push(data[j].total);
                            hasVisits = true;
                        }
                    }
                    if(!hasVisits){
                        chartData.data.push(0);
                    }
                    finalLabels.push(_getNameOfMonth(tempMatch.month) + " " + tempMatch.year)
                }
                break;
            case "QUARTER":
                aviableMatchs = aviableMatchs.reverse();
                for (let i = 0; i < aviableMatchs.length; i++) {
                    let tempMatch = aviableMatchs[i];
                    let hasVisits = false;
                    for (let j = 0; j < data.length; j++) {
                        if(data[j]._id.year == tempMatch.year && data[j]._id.quarter == tempMatch.quarter){
                            chartData.data.push(data[j].total);
                            hasVisits = true;
                        }
                    }
                    if(!hasVisits){
                        chartData.data.push(0);
                    }
                    finalLabels.push(_getDescQ(tempMatch.quarter) + " " + tempMatch.year)
                }
                break;
            case "YEAR":
                aviableYears = aviableYears.sort(function(a, b){return a-b});
                for (let i = 0; i <aviableYears.length; i++) {
                    let yearI = aviableYears[i];
                    let hasVisits = false;
                    finalLabels = [];
                    for (let j = 0; j < data.length; j++) {
                        if(data[j]._id.year == yearI ){
                            chartData.data.push(data[j].total);
                            hasVisits = true;
                        }
                    }
                    if(!hasVisits){
                        chartData.data.push(0);
                    }
                    finalLabels = aviableYears;
                }
                break;

        }

        datasets.push(chartData);

        return res.json({
            error: false,
            data: {
                datasets:datasets,
                labels:finalLabels
            }
        });
    });
};

function _getNameOfMonth(value) {
    switch (value) {
        case 1:
            return "Enero";
        case 2:
            return "Febrero";
        case 3:
            return "Marzo";
        case 4:
            return "Abril";
        case 5:
            return "Mayo";
        case 6:
            return "Junio";
        case 7:
            return "Julio";
        case 8:
            return "Agosto";
        case 9:
            return "Septiembre";
        case 10:
            return "Octubre";
        case 11:
            return "Noviembre";
        case 12:
            return "Diciembre";
    }

}

function _getDescQ(value) {
    return value + " Q";

}