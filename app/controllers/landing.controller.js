const {Contract} = require('./../models/contract.model');

const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');


function _aggregateAmountByPeriods(req, res, callback) {

    let aggregate = Contract.aggregate([
        {
            $match:{
                "deleted.isDeleted":false
            }
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
                types:{
                    $push:{
                        totalAmount:"$totalAmount",
                        procedureType:"$_id.procedureType"
                    }
                }
            }
        },
        {
            $group:{
                _id:"$_id.year",
                periods:{
                    $push:{
                        period:"$_id.period",
                        types:"$types"
                    }
                }
            }
        }
        // {
        //     $lookup: {
        //         from: Supplier.collection.name,
        //         let: { "supplierId": "$_id" },
        //         pipeline: [
        //             {
        //                 "$match": {
        //                     "$expr": {
        //                         "$eq": [ "$_id", "$$supplierId" ] }
        //                 }
        //             },
        //             {
        //                 "$project": {
        //                     "name": 1
        //                 }
        //             }
        //         ],
        //         as: "supplier"
        //     }
        // },
        // {
        //     $unwind: {
        //         path: "$supplier",
        //         preserveNullAndEmptyArrays: true
        //     },
        // },
        // {
        //     $project: {
        //         name: "$supplier.name",
        //         contractsCount: 1,
        //         publicCount: 1,
        //         invitationCount: 1,
        //         noBidCount: 1,
        //
        //         public: 1,
        //         invitation: 1,
        //         noBid: 1,
        //         total: 1
        //     }
        // }
    ]);

    return aggregate.exec(callback);
}


exports.amountByPeriods = (req, res, next) => {

    _aggregateAmountByPeriods(req, res, (err, years, pageCount, itemCount) => {
        if (err) {
            logger.error(err, req, 'publicHome.controller#amountByPeriods', 'Error trying to query amounts by period');
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