const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const Calculation = require('./../models/calculation.model').Calculation;
const Contracts = require('./../models/contract.model').Contract;
const deletedSchema = require('./../models/schemas/deleted.schema');
const variables = require('./../components/variablesSeed').variables;
const async = require('async');
const math = require('mathjs');
const { each } = require('async/each');

const { validationResult } = require('express-validator/check');

/**
 * Renderiza la vista principal de consulta de Calculation.
 * @param req
 * @param res
 * @param next
 */
exports.index = (req, res, next) => {
    let renderParams = {};
    renderParams.model = Calculation;
    renderParams.permission = Calculation.permission;
    res.render('calculation', renderParams);
};
/**
 * Devuelve las variables simples a utilizar en los calculos
 * @param req
 * @param res
 */
exports.getVariables = (req, res) => {
  return res.json(variables);
};

/**
 * Consulta los registros de Calculation disponibles.
 * @param req
 * @param res
 * @param next
 */
exports.list = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};
    
    // query["field"] = value;
    
    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};


    Calculation
        .paginate(
            query,
            {
                ...paginationOptions,
                populate: [
                    'formula.calculations'
                ]
            },
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'calculation.controller#list', 'Error al consultar lista de Calculation');
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
 * Consulta los registros de Calculation disponibles para usarse en la formula
 * @param req
 * @param res
 * @param next
 */
exports.getCalculationsForFormula = (req, res, next) => {

    //TODO Add this validation later to avoid a infinity recursion
    // let idCalculationOrigin;

    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};

    // query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};

    Calculation
        .find(
            query,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'calculation.controller#list', 'Error al consultar lista de Calculation');
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


var done = [];
var calls = [];
var i = 0;
var exploreCalculationTree = function (calculation, mainCallback) {
    if (typeof calculation === 'string') {
        Calculation.findOne(
            {_id: mongoose.Types.ObjectId(calculation)}
        ).exec(function (err, res) {
                //Result (callback)

                let called = calls.find(function (element) {
                    return element == res.abbreviation;
                });

                let calculated = false;
                if (called) {
                    calculated = done.find(function (element) {
                        return element == res.abbreviation;
                    });
                }

                if (!called || (called && !calculated)) {
                    calls.push(res.abbreviation);

                    async.map(res.formula.calculations, (calc, calcCallback) => {
                        exploreCalculationTree(calc, function (valid) {
                            if (valid) {
                                done.push(calc.abbreviation);
                                return calcCallback(null, true);
                            } else {
                                console.log("false1");
                                return calcCallback(new Error('Invalid calculation'));
                                // return mainCallback(false);
                            }
                        })
                    }, (err, results) => {
                        if (err) {
                            //TODO: Handle err
                            return mainCallback(false);
                        }

                        return mainCallback(true);
                        // results.find(result => result)
                    });

                } else {
                    return mainCallback(false); //it means it's not a valid formula
                }
            }
        );
    } else {
        let called = calls.find(function (element) {
            return element == calculation.abbreviation;
        });

        let calculated = false;
        if (called) {
            let calculated = done.find(function (element) {
                return element == calculation.abbreviation;
            });
        }

        if (!called || (called && !calculated)) {
            calls.push(calculation.abbreviation);

            async.map(calculation.formula.calculations, (calc, calcCallback) => {
                exploreCalculationTree(calc, function (valid) {
                    if (valid) {
                        done.push(calc.abbreviation);
                        return calcCallback(null, true);
                    } else {
                        return calcCallback(new Error('Invalid calculation'));
                        // return mainCallback(false);
                    }
                })
            }, (err, results) => {
                if (err) {
                    //TODO: Handle err
                    return mainCallback(false);
                }

                return mainCallback(true);
                // results.find(result => result)
            });
        } else {
            return mainCallback(false); //it means it's not a valid formula
        }
    }
};


var resultsMap = {};

exports.validateFormula = (req, res, next) => {

    let expression = req.body.expression;
    let variables = req.body.variables;
    let calculations= req.body.calculations;
    let abbreviation = req.body.abbreviation;

    let calculation = {
        formula: req.body.formula,
        abbreviation : abbreviation
    };

    //restarts value for validating tree
    done = [];
    calls = [];
    i = 0;
    resultsMap = {};


    exploreCalculationTree(calculation, function (validTree) {
        if (validTree) {
            calculateAndValidateFormula(calculation, (err, results) => {
                if(results && (isNaN(results.value) || results.value == Number.Infinity)){
                    return res.json({error:true, message:req.__('calculations.formula.infinity.error'), err:err });
                }
                if(err){
                    return res.json({error:true, message:req.__(err.message), err:err.err });
                } else {
                    return res.json({error: false, results: results});
                }
            });
        } else {
            console.log("Formula is not Valid");
            return res.json({error:true, message:req.__('calculations.formula.reference-circular.error') ,err : new Error("Formula is not valid")});
        }
    });
    //placeholder yes or no answer
    // let date = new Date();
    // let minutes = date.getMinutes();
    // let data = {};
    //
    //
    // if(minutes % 2 === 0){
    //     data.valid = true;
    //     data.result = date.getTime();
    // } else {
    //     data.valid = false;
    // }

};



exports.evaluateFormula = (req, res, next) => {
    console.log("UNSPORTED OPERATION : calculation.controller#evaluateFormula");
    res.json({
        error : true,
        message : "UNSPORTED OPERATION : calculation.controller#evaluateFormula"
    })
};


/**
 * Guarda un Calculation. 
 * @param req
 * @param res
 * @param next
 */
exports.save = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    let id = req.body._id;

    if (id) {
        //Update
        let qById = {_id: id};

        Calculation
            .findOne(qById)
            .exec((err, calculation) => {
                if (err || !calculation) {
                    logger.error(err, req, 'calculation.controller#save', 'Error al consultar Calculation');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.save')
                    });
                }


                //Update doc fields
                calculation.name = req.body.name;
                calculation.description = req.body.description;
                calculation.abbreviation = req.body.abbreviation;
                calculation.type = req.body.type;
                calculation.enabled = req.body.enabled;
                calculation.notes = req.body.notes;
                //  Formula stuff
                calculation.formula = req.body.formula;
                let calculationObjectIds = [];
                for (let i = 0; i < calculation.formula.calculations.length; i++) {
                    calculationObjectIds.push(mongoose.Types.ObjectId(calculation.formula.calculations[i]._id));
                }
                let formulaValidation = validateFormula(calculation.formula);

                    if(formulaValidation.error){
                        return res.json({error: true, message: req.__('calculations.formula.syntax.error'), err:formulaValidation.err})
                    }
                    calculation.save((err, savedCalculation) => {
                        if (err) {
                            logger.error(err, req, 'calculation.controller#save', 'Error al guardar Calculation');
                            return res.json({
                                errors: true,
                                message: req.__('general.error.save')
                            });
                        }

                        return res.json({
                            errors: false,
                            message: req.__('general.success.updated'),
                            data: savedCalculation
                        });
                    });

            });
        
    } else {
        //Create


        let calculation = new Calculation({
            name : req.body.name,
            description : req.body.description,
            type : req.body.type,
            enabled : req.body.enabled,
            displayForm : req.body.displayForm,
            abbreviation : req.body.abbreviation,
            notes : req.body.notes
        });


        //Formula stuff
        calculation.formula = req.body.formula;
        let calculationObjectIds = [];
        for (let i = 0; i < calculation.formula.calculations.length; i++) {
            calculationObjectIds.push(mongoose.Types.ObjectId(calculation.formula.calculations[i]._id));
        }
        let isValid = validateFormula(calculation.formula);
            if(isValid.error){
                return res.json({error: true, message: req.__('calculations.formula.syntax.error'), err: isValid.err})
            }

        calculation.save((err, savedCalculation) => {
            if (err) {
                logger.error(err, req, 'calculation.controller#save', 'Error al guardar Calculation');
                return res.json({
                    "error": true,
                    "message": req.__('general.error.save')
                });
            }

            return res.json({
                "error": false,
                "message": req.__('general.success.created'),
                "data": savedCalculation
            });
        });


    }
};

let validateFormula = function(formula) {
    console.log("formula", formula);
    // $NPEPE +
    try {
        if (formula && formula.expression) {
            let regex = "\\${1,2}[A-Z0-9]+";
            let newExpression = replaceVariableForValue(regex, formula.expression, "1");
            let value = math.eval(newExpression);
            return { error: false, isValid: true };
        } else {
            return { error:true, isValid: false }
        }

    } catch (err) {
        return { error: true, isValid: false, err: err };
    }
};


let replaceVariableForValue = function(regex, expression, value = 0){
    let newExpression = expression.replace(new RegExp(regex,"g"), value);
    return newExpression;
};

let  calculateAndValidateFormula = function(calculation, mainCallback){
    if(resultsMap[calculation.abbreviation] != undefined){
        let result = {
            abbreviation: calculation.abbreviation,
            results : resultsMap[calculation.abbreviation]
        };
        return result;
    }
    //populate calculations
    try {
        let formulaValidation = validateFormula(calculation.formula);
        if (formulaValidation.error) {
            return mainCallback({error:true, message:'calculations.formula.syntax.error', err:formulaValidation.err});
        }

        let aggregatePromises = {
            queries:[],
            abbreviation:[]
        };
        calculation.formula.variables.forEach((item) => {
            aggregatePromises.queries.push(Contracts.aggregate(variables[item.abbreviation].query));
            aggregatePromises.abbreviation.push(item.abbreviation);
        });
        let finalValue = 0;
        Promise.all(aggregatePromises.queries).then((results) => {
            // { abbreviation : "$NAD", results : 45.44} Estructura Que debe devolver el aggregate
            results.forEach((result, index) => {
                if(result[0] && result[0].isComplex){
                    result[0] = variables[result[0].abbreviation].complexFn(result, result[0].abbreviation);
                } else if(!result[0]){
                    result[0] = { abbreviation:aggregatePromises.abbreviation[index] }
                }
                let abbreviation = result[0].abbreviation;
                let regex = abbreviation.replace(/\$/, "");
                regex = "\\$" + regex;
                calculation.formula.expression = replaceVariableForValue(regex, calculation.formula.expression, result[0].result);
            });

            if(calculation.formula.calculations && calculation.formula.calculations.length){
                let innerCalculations = [];
                for (let k = 0; k <  calculation.formula.calculations.length; k++) {
                    innerCalculations.push(calculation.formula.calculations[k])
                    ///async parallel
                    /////
                }
                async.each(innerCalculations,
                    function (calculation, AsyncEachCallback) {
                        calculateAndValidateFormula(calculation, function (err, res) {
                            if (err) {
                                AsyncEachCallback(err);
                            } else {
                                calculation.result = res;

                                AsyncEachCallback(null, res);
                            }
                        })
                    }
                    , function(err){
                        if(err){
                            return mainCallback({ error:true, message:'calculations.formula.unexpected.error', err:err});
                        } else {
                            try {
                                innerCalculations.forEach((item) => {
                                    console.log("calculation", item.result);
                                    let regex = item.result.abbreviation.replace(/\$\$/, "");
                                    console.log("regex", regex);
                                    regex = "\\$\\$" + regex;
                                    console.log("regex", regex);
                                    calculation.formula.expression = replaceVariableForValue(regex, calculation.formula.expression, item.result.value);
                                });
                                finalValue = math.eval(calculation.formula.expression);
                                let result = {
                                    abbreviation: calculation.abbreviation,
                                    results : finalValue
                                };
                                resultsMap[calculation.abbreviation] = finalValue;
                                return mainCallback(null, result);
                            } catch(err) {
                                return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:err});
                            }
                        }
                    });
            } else {
                try {
                    finalValue = math.eval(calculation.formula.expression);
                    let result = {
                        abbreviation: calculation.abbreviation,
                        value : finalValue
                    };
                    resultsMap[calculation.abbreviation] = finalValue;
                    return mainCallback(null, result);
                } catch(err) {
                    return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:err});
                }
            }
        }).catch((errors) => {
            return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:errors});
        });

    } catch(err) {
        return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:err});

    }
}


/**
 * Borra un Calculation.
 * @param req
 * @param res
 * @param next
 */
exports.delete = (req, res, next) => {
    //TODO: Implementation

    let query = {};

    query["_id"] = req.body._id;

    let qNotDeleted = deletedSchema.qNotDeleted();
    query = {...query, ...qNotDeleted};
    
    Calculation
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(req, err, 'calculation.controller#delete', 'Error al realizar count de Calculation');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(req, err, 'calculation.controller#delete', 'Error al intentar borrar Calculation; el registro no existe o ya fue borrado anteriormente');
                return res.json({
                    errors: true,
                    message: req.__('general.error.not-exists-or-already-deleted')
                });
            }


            Calculation.update(
                query,
                {
                    $set: {
                        deleted: {
                            user: req.user ? req.user._id : null,
                            isDeleted: true,
                            date: new Date()
                        }
                    }
                },
                {multi: false}
            ).exec((err) => {
                if (err) {
                    logger.error(req, err, 'calculation.controller#delete', 'Error al borrar Calculation.');
                    return res.json({
                        errors: true,
                        message: req.__('general.error.delete')
                    });
                }
                return res.json({
                    error: false,
                    message: req.__('general.success.deleted')
                });
            });
            
            
        });
};