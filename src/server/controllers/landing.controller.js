const {Contract} = require('./../models/contract.model');
const {Organization} = require('./../models/organization.model');

const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');
const mongoose = require('mongoose');


function _aggregateAmountByPeriods(req, res, callback) {


    let query = {};
    let orBuilder = [];
    let andBuilder = [];

    let filters = req.body;

    if (filters) {

        if (filters.search && filters.search.length) {
            orBuilder.push({contractId: utils.toAccentsRegex(filters.search, "gi")});
            orBuilder.push({contractNumber: utils.toAccentsRegex(filters.search, "gi")});
            orBuilder.push({servicesDescription: utils.toAccentsRegex(filters.search, "gi")});
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.administrationPeriods && filters.administrationPeriods.length) {
            for (let i = 0; i < filters.administrationPeriods.length; i++) {
                orBuilder.push({administrationPeriod: filters.administrationPeriods[i].administrationPeriod})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.fiscalYears && filters.fiscalYears.length) {
            for (let i = 0; i < filters.fiscalYears.length; i++) {
                orBuilder.push({fiscalYear: filters.fiscalYears[i].fiscalYear})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.trimonths && filters.trimonths.length) {
            for (let i = 0; i < filters.trimonths.length; i++) {
                orBuilder.push({period: filters.trimonths[i].period})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.procedureTypes && filters.procedureTypes.length) {
            for (let i = 0; i < filters.procedureTypes.length; i++) {
                orBuilder.push({procedureType: filters.procedureTypes[i]})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.suppliers && filters.suppliers.length) {
            for (let i = 0; i < filters.suppliers.length; i++) {
                orBuilder.push({supplier: new mongoose.Types.ObjectId(filters.suppliers[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.administrativeUnits && filters.administrativeUnits.length) {
            for (let i = 0; i < filters.administrativeUnits.length; i++) {
                orBuilder.push({applicantAdministrativeUnit: new mongoose.Types.ObjectId(filters.administrativeUnits[i]._id)})
                orBuilder.push({organizerAdministrativeUnit: new mongoose.Types.ObjectId(filters.administrativeUnits[i]._id)})
                orBuilder.push({areaInCharge: new mongoose.Types.ObjectId(filters.administrativeUnits[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if(andBuilder.length){
            query = {$and : andBuilder};
        }
    }

    let qProcedureStateConcluded = Contract.qProcedureStateConcluded(true);

    let finalQuery = {
        "deleted.isDeleted":false,
        "organization":Organization.currentOrganizationId(req),
        ...qProcedureStateConcluded,
        ...query,
    };

    if (finalQuery["$and"]) {
        finalQuery["$and"] = (qProcedureStateConcluded["$and"] || []).concat((query["$and"] || []))
    }

    let aggregate = Contract.aggregate([
        {
            $match: finalQuery
        },
        {
            $group: {
                _id: {
                    period:{$substr:["$period", 0,2]},
                    year:{$substr:["$period", 2,-1]},
                    procedureType:"$procedureType"
                },
                totalAmount:{$sum:"$totalOrMaxAmount"}
            }
        },
        {
            $group: {
                _id: {
                    period:"$_id.period",
                    year:"$_id.year",
                },
                totalPublic:{
                    $sum:{
                        // $cond:{if:{$eq:["$_id.procedureType", "PUBLIC"]}, then:{ $divide: [ "$totalAmount", 1000000] }, else:0}
                        $cond:{if:{$eq:["$_id.procedureType", "PUBLIC"]}, then:{ $divide: [ "$totalAmount", 1] }, else:0}
                    }
                },
                totalNoBid:{
                    $sum:{
                        // $cond:{if:{$eq:["$_id.procedureType", "NO_BID"]}, then:{ $divide: [ "$totalAmount", 1000000] }, else:0}
                        $cond:{if:{$eq:["$_id.procedureType", "NO_BID"]}, then:{ $divide: [ "$totalAmount", 1] }, else:0}
                    }
                },
                totalInvitation:{
                    $sum:{
                        // $cond:{if:{$eq:["$_id.procedureType", "INVITATION"]}, then:{ $divide: [ "$totalAmount", 1000000] }, else:0}
                        $cond:{if:{$eq:["$_id.procedureType", "INVITATION"]}, then:{ $divide: [ "$totalAmount", 1] }, else:0}
                    }
                }

            }
        },
        {
            $sort:{"_id.year":1, "_id.period":1}
        }
    ]);

    return aggregate.exec(callback);
}

function _aggregateAmountByProcedure(req, res, callback) {


    let query = {};
    var orBuilder = [];
    var andBuilder = [];

    let filters = req.body;

    if (filters) {

        if (filters.search && filters.search.length) {
            orBuilder.push({contractId: utils.toAccentsRegex(filters.search, "gi")});
            orBuilder.push({contractNumber: utils.toAccentsRegex(filters.search, "gi")});
            orBuilder.push({servicesDescription: utils.toAccentsRegex(filters.search, "gi")});
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.administrationPeriods && filters.administrationPeriods.length) {
            for (let i = 0; i < filters.administrationPeriods.length; i++) {
                orBuilder.push({administrationPeriod: filters.administrationPeriods[i].administrationPeriod})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.fiscalYears && filters.fiscalYears.length) {
            for (let i = 0; i < filters.fiscalYears.length; i++) {
                orBuilder.push({fiscalYear: filters.fiscalYears[i].fiscalYear})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.trimonths && filters.trimonths.length) {
            for (let i = 0; i < filters.trimonths.length; i++) {
                orBuilder.push({period: filters.trimonths[i].period})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.procedureTypes && filters.procedureTypes.length) {
            for (let i = 0; i < filters.procedureTypes.length; i++) {
                orBuilder.push({procedureType: filters.procedureTypes[i]})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.suppliers && filters.suppliers.length) {
            for (let i = 0; i < filters.suppliers.length; i++) {
                orBuilder.push({supplier: new mongoose.Types.ObjectId(filters.suppliers[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if (filters.administrativeUnits && filters.administrativeUnits.length) {
            for (let i = 0; i < filters.administrativeUnits.length; i++) {
                orBuilder.push({applicantAdministrativeUnit: new mongoose.Types.ObjectId(filters.administrativeUnits[i]._id)})
                orBuilder.push({organizerAdministrativeUnit: new mongoose.Types.ObjectId(filters.administrativeUnits[i]._id)})
                orBuilder.push({areaInCharge: new mongoose.Types.ObjectId(filters.administrativeUnits[i]._id)})
            }
            andBuilder.push({$or: orBuilder});
            orBuilder = [];
        }

        if(andBuilder.length){
            query = {$and : andBuilder};
        }
    }

    let qProcedureStateConcluded = Contract.qProcedureStateConcluded(true);

    let finalQuery = {
        "deleted.isDeleted":false,
        "organization":Organization.currentOrganizationId(req),
        ...qProcedureStateConcluded,
        ...query,
    };

    if (finalQuery["$and"]) {
        finalQuery["$and"] = (qProcedureStateConcluded["$and"] || []).concat((query["$and"] || []))
    }

    let aggregate = Contract.aggregate([
        {
            $match: finalQuery
        },
        {
            $group: {
                _id: "$procedureType",
                totalAmount:{$sum:"$totalOrMaxAmount"}
            }
        },
        {
            $group: {
                _id: 1,
                totalPublic:{
                    $sum:{
                        $cond:{if:{$eq:["$_id", "PUBLIC"]}, then:"$totalAmount", else:0}
                    }
                },
                totalNoBid:{
                    $sum:{
                        $cond:{if:{$eq:["$_id", "NO_BID"]}, then:"$totalAmount", else:0}
                    }
                },
                totalInvitation:{
                    $sum:{
                        $cond:{if:{$eq:["$_id", "INVITATION"]}, then:"$totalAmount", else:0}
                    }
                }

            }
        }
    ]);

    return aggregate.exec(callback);
}


exports.amountByPeriods = (req, res, next) => {
    _aggregateAmountByPeriods(req, res, (err, years) => {
        if (err) {
            logger.error(err, req, 'landing.controller#amountByPeriods', 'Error trying to query amounts by period');
            return res.json({
                error: true
            });
        }
        return res.json({
            error: false,
            data: years
        });
    });
};

exports.amountByProcedure = (req, res, next) => {
    _aggregateAmountByProcedure(req, res, (err, amounts) => {
        if (err) {
            logger.error(err, req, 'landing.controller#amountByProcedure', 'Error trying to query amounts by period');
            return res.json({
                error: true
            });
        }
        let labels = ["Lic. pública", "Por invitación"," Adj. Directa"];
        
        let datasets= [];
        if(amounts.length>0){
            datasets= [
                {
                    data: [amounts[0].totalPublic, amounts[0].totalInvitation, amounts[0].totalNoBid],
                    backgroundColor: ["#6ec284","#ffc043","#eb6262"]
                }
            ]
        } else {
            datasets= [
                {
                    data: [0, 0, 0],
                    backgroundColor: ["#6ec284","#ffc043","#eb6262"]
                }
            ]
        }


        let tempData= {data:{
                labels: labels,
                datasets: datasets
            }};
        return res.json({
            error: false,
            data: tempData
        });
    });
};