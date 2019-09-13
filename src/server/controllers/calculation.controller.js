const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const utils = require('./../components/utils');
const mongoose = require('mongoose');

// const {
//     Calculation,
//
//     typeEnum,
//     typeEnumDict,
//
//     displayFormEnum,
//     displayFormEnumDict
// } = require('./../models/calculation.model');

let Calculation/* = require('./../models/calculation.model').Calculation*/;
let typeEnum/* = require('./../models/calculation.model').typeEnum*/;
let typeEnumDict/* = require('./../models/calculation.model').typeEnumDict*/;
let displayFormEnum/* = require('./../models/calculation.model').displayFormEnum*/;
let displayFormEnumDict/* = require('./../models/calculation.model').displayFormEnumDict*/;

const Contract = require('./../models/contract.model').Contract;
const Organization = require('./../models/organization.model').Organization;
const Supplier = require('./../models/supplier.model').Supplier;
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const deletedSchema = require('./../models/schemas/deleted.schema');
const getVariables = require('./../components/variablesSeed').getVariables;
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
  return res.json(getVariables());
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
    
    let search = req.query.search;
    if (search) {

        search = search.replace(/\$/g, '\\$');

        let queryAsRegex = utils.toAccentsRegex(search, "gi");

        let orArray = [
            {name: queryAsRegex},
            {description: queryAsRegex},
            {abbreviation: queryAsRegex},
            {notes: queryAsRegex},
            {'formula.expression': queryAsRegex},
        ];

        let typeEnumQueryAsRegexStr = utils.enumSearchRegexString(search, typeEnum, typeEnumDict);

        if (typeEnumQueryAsRegexStr && typeEnumQueryAsRegexStr.length) {
            orArray.push(
                {type: new RegExp(typeEnumQueryAsRegexStr)}
            );
        }

        let displayFormEnumQueryAsRegexStr = utils.enumSearchRegexString(search, displayFormEnum, displayFormEnumDict);

        if (displayFormEnumQueryAsRegexStr && displayFormEnumQueryAsRegexStr.length) {
            orArray.push(
                {displayForm: new RegExp(displayFormEnumQueryAsRegexStr)}
            );
        }

        query = {
            $or: orArray
        }
    }

    let qNotDeleted = deletedSchema.qNotDeleted();
    // let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted/*, ...qByOrganization*/};


    async.parallel({
        mainQuery: function (callback) {
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
                    return callback({
                        errors: true,
                        message: res.__('general.error.unexpected-error')
                    });
                }
                return callback(null,{
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
        )},
            lastUpdate: function (callback) {
                Calculation.find(
                    {},
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
 * Consulta los registros de Calculation disponibles para usarse en la formula
 * @param req
 * @param res
 * @param next
 */
exports.getCalculationsForFormula = (req, res, next) => {

    //TODO Add this validation later to avoid a infinity recursion
    // let idCalculationOrigin;
    
    let currentCalculationId = req.query.currentCalculationId;

    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let query = {};

    // query["field"] = value;

    let qNotDeleted = deletedSchema.qNotDeleted();
    // let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted/*, ...qByOrganization*/};
    
    if (currentCalculationId) {
        query = {...query, _id: {$ne: mongoose.Types.ObjectId(currentCalculationId)}};
    }

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


// var done = [];
// var calls = [];
// var i = 0;
var exploreCalculationTree = function (cache, calculation, mainCallback) {
    
    let {done, calls, i, resultsMap} = cache;
    
    if (typeof calculation === 'string' || calculation instanceof mongoose.Types.ObjectId) {
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

                if (!called || !(called && !calculated)) {
                    calls.push(res.abbreviation);

                    async.map(res.formula.calculations, (calc, calcCallback) => {
                        exploreCalculationTree(cache, calc, function (valid) {
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

        if (!called || !(called && !calculated)) {
            calls.push(calculation.abbreviation);

            async.map(calculation.formula.calculations, (calc, calcCallback) => {
                exploreCalculationTree(cache, calc, function (valid) {
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


// var resultsMap = {};

exports.validateFormula = (req, res, next) => {

    let expression = req.body.expression;
    let variables = req.body.variables;
    let calculations= req.body.calculations;
    let abbreviation = req.body.abbreviation;

    let calculation = {
        formula: req.body.formula,
        abbreviation : abbreviation,
        locked : req.body.locked,
        administrationPeriod : req.body.administrationPeriod,
        administrationPeriodFromYear: Contract.parseAdministrationPeriodFromYear(req.body.administrationPeriod),
        administrationPeriodToYear: Contract.parseAdministrationPeriodToYear(req.body.administrationPeriod),
        hasPercentScale : req.body.hasPercentScale,
        scale : req.body.scale || [],
        filters : req.body.filters || [],
        type: req.body.type
    };

    //restarts value for validating tree
    // done = [];
    // calls = [];
    // i = 0;
    // resultsMap = {};
    
    let cache = {
        done: [],
        calls: [],
        i: 0,
        resultsMap: {},
    };
    let options = {};
    if(calculation.locked){
        options.query = Calculation.qAdministrationPeriod(calculation);
    }


    exploreCalculationTree(cache, calculation, function (validTree) {
        if (validTree) {
            calculateAndValidateFormula(req, cache, calculation, options, (err, results) => {
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
    console.log("UNSUPPORTED OPERATION : calculation.controller#evaluateFormula");
    res.json({
        error : true,
        message : "UNSUPPORTED OPERATION : calculation.controller#evaluateFormula"
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

    let cache = {
        done: [],
        calls: [],
        i: 0,
        resultsMap: {},
    };

    if (id) {
        //Update
        let qById = {_id: id};
        // let qByOrganization = Organization.qByOrganization(req);
        let query = {...qById/*, ...qByOrganization*/};

        Calculation
            .findOne(query)
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
                calculation.displayForm = req.body.displayForm;
                // calculation.locked = false;
                calculation.notes = req.body.notes;
                //  Formula stuff
                calculation.formula = req.body.formula;
                calculation.scale = req.body.scale;

                calculation.filters = req.body.filters;

                calculation.locked = req.body.locked;
                calculation.administrationPeriod= req.body.administrationPeriod;

                calculation.administrationPeriodFromYear = Contract.parseAdministrationPeriodFromYear(req.body.administrationPeriod);
                calculation.administrationPeriodToYear = Contract.parseAdministrationPeriodToYear(req.body.administrationPeriod);
                
                calculation.hasPercentScale = req.body.hasPercentScale;

                let calculationObjectIds = [];
                for (let i = 0; i < calculation.formula.calculations.length; i++) {
                    calculationObjectIds.push(mongoose.Types.ObjectId(calculation.formula.calculations[i]._id));
                }

                let formulaValidation = validateFormula(cache, calculation.formula);

                    if(formulaValidation.error){
                        return res.json({error: true, message: req.__('calculations.formula.syntax.error'), err:formulaValidation.err})
                    }

                exploreCalculationTree(cache, calculation, function (validTree) {
                    if (!validTree) {
                        return res.json({
                            error: true,
                            message: req.__('calculations.formula.reference-circular.error'),
                            err: new Error("Formula is not valid")
                        });
                    }
                    calculation.save((err, savedCalculation) => {
                        if (err) {
                            let errors = [];
                            if (err.code === 11000) {
                                errors.push({message: "Se encontro otro registro con la misma abreviación de calculo o con el mismo nombre"})
                            }
                            for (let item in err.errors) {
                                errors.push(err.errors[item]);
                            }
                            logger.error(err, req, 'calculation.controller#save', 'Error al guardar Calculation');
                            return res.json({
                                error: true,
                                message: req.__('general.error.save'),
                                errors: errors
                            });
                        }
                        if (calculation.locked) {
                            let qNotDeleted = deletedSchema.qNotDeleted();
                            let query = {
                                _id: {$ne: calculation._id},
                                ...qNotDeleted
                            };

                            Calculation.updateMany({
                                _id: {$ne: calculation._id},
                                ...qNotDeleted
                            }, {
                                $set: {"locked": false}
                            }).exec((err) => {

                            });
                        }

                        if (calculation.hasPercentScale) {
                            calculation.scale = calculation.scale.sort(function (a, b) {
                                if (a.max > b.max) {
                                    return 1;
                                }
                                if (a.max < b.max) {
                                    return -1;
                                }
                                return 0;
                            });
                            for (let i = 0; i < calculation.scale.length; i++) {
                                let maxValue = calculation.scale[i].max;
                                let nextIndex = i + 1;
                                if (nextIndex < calculation.scale.length) {
                                    if (maxValue > calculation.scale[nextIndex].max || maxValue > calculation.scale[nextIndex].min) {
                                        return res.json({
                                            error: true,
                                            message: req.__('general.error.save'),
                                            errors: [{message: "Algunos de los rangos en la escala se traslapan, favor de verificarlo"}]
                                        })
                                    }
                                }
                            }
                        }

                        return res.json({
                            error: false,
                            message: req.__('general.success.updated'),
                            data: savedCalculation
                        });
                    });
                });


            });
        
    } else {
        //Create

        let calculation = new Calculation({
            // organization: Organization.currentOrganizationId(req),
            name : req.body.name,
            description : req.body.description,
            type : req.body.type,
            enabled : req.body.enabled,
            displayForm : req.body.displayForm,
            abbreviation : req.body.abbreviation,
            notes : req.body.notes,
            scale : req.body.scale,
            filter : req.body.filter,
            locked : req.body.locked,
            administrationPeriod : req.body.administrationPeriod,
            administrationPeriodFromYear: Contract.parseAdministrationPeriodFromYear(req.body.administrationPeriod),
            administrationPeriodToYear: Contract.parseAdministrationPeriodToYear(req.body.administrationPeriod),
            hasPercentScale : req.body.hasPercentScale,
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

        exploreCalculationTree(cache, calculation, function (validTree) {
            if (!validTree) {
                return res.json({
                    error: true,
                    message: req.__('calculations.formula.reference-circular.error'),
                    err: new Error("Formula is not valid")
                });
            }

            calculation.save((err, savedCalculation) => {
                if (err) {
                    let errors = [];
                    if (err.code == 11000) {
                        errors.push({message: "Se encontro otro registro con la misma abreviación de calculo o con el mismo nombre"})
                    }
                    for (let item in err.errors) {
                        errors.push(err.errors[item]);
                    }
                    logger.error(err, req, 'calculation.controller#save', 'Error al guardar Calculation');
                    return res.json({
                        "error": true,
                        "message": req.__('general.error.save'),
                        "errors": errors
                    });
                }

                if (calculation.locked) {
                    let qNotDeleted = deletedSchema.qNotDeleted();
                    Calculation.updateMany({
                        // _id: {$ne: calculation._id},
                        ...qNotDeleted
                    }, {
                        $set: {"locked": false}
                    }).exec((err) => {

                    });
                }

                if (calculation.hasPercentScale) {
                    calculation.scale = calculation.scale.sort(function (a, b) {
                        if (a.max > b.max) {
                            return 1;
                        }
                        if (a.max < b.max) {
                            return -1;
                        }
                        return 0;
                    });
                    for (let i = 0; i < calculation.scale.length; i++) {
                        let maxValue = calculation.scale[i].max;
                        let nextIndex = i + 1;
                        if (nextIndex < calculation.scale.length) {
                            if (maxValue > calculation.scale[nextIndex].max || maxValue > calculation.scale[nextIndex].min) {
                                return res.json({
                                    error: true,
                                    message: req.__('general.error.save'),
                                    errors: [{message: "Algunos de los rangos en la escala se traslapan, favor de verificarlo"}]
                                })
                            }
                        }
                    }
                }

                return res.json({
                    "error": false,
                    "message": req.__('general.success.created'),
                    "data": savedCalculation
                });
            });
        });



    }
};

let buildAggregateQuerysFromFilters = function(filters){
    //$AND
    let query = {};
    let filtersMap = {};

    filters.forEach((filter) => {
        if(filtersMap[filter.propertyName] && filtersMap[filter.propertyName].count){
            filtersMap[filter.propertyName].count = filtersMap[filter.propertyName].count + 1;
        } else {
            filtersMap[filter.propertyName] = {
                count:1
            }
        }
    });


    filters.forEach((filter) => {
       let matchFilter = {};

       if(filtersMap[filter.propertyName].count > 1){
           let logicalOperator = filter.propertyType == 'REF' ? '$or' : '$and';
           if(filtersMap[filter.propertyName].logicalObj){
               matchFilter = _createMatchFilter(filter);
               filtersMap[filter.propertyName].logicalObj[logicalOperator].push(matchFilter)
           } else {
               filtersMap[filter.propertyName].logicalObj = {};
               filtersMap[filter.propertyName].logicalObj[logicalOperator] = [];
               matchFilter = _createMatchFilter(filter);
               filtersMap[filter.propertyName].logicalObj[logicalOperator].push(matchFilter)
           }
           query = {...query, ...filtersMap[filter.propertyName].logicalObj}

       } else {
           matchFilter = _createMatchFilter(filter);
           query = {...query, ...matchFilter}
       }
    });
    return query
};

let _parseValue = function(value,type){
    switch (type){
        case 'REF':
            return mongoose.Types.ObjectId(value);
            break;
        case 'NUMBER':
            return Number(value);
            break;
        case 'STRING':
            return String(value);
            break;
        default:
            return String(value);
    }
};

let _createMatchFilter = function(filter){
    let matchFilter = {};
    matchFilter[filter.propertyName] = {};
    matchFilter[filter.propertyName][_getOperator(filter.operator)] = filter.propertyType == 'REF' ? _parseValue(filter.reference, filter.propertyType) : _parseValue(filter.value, filter.propertyType);
    return matchFilter;
};

let _getOperator = function(wordOperator){
   switch (wordOperator){
       case 'EQUAL':
           return "$eq";
           break;
       case 'GREATER':
           return "$gt";
           break;
       case 'GREATER_EQUAL':
           return "$gte";
           break;
       case 'LESS':
           return "$lt";
           break;
       case 'LESS_EQUAL':
           return "$lte";
           break;
       case 'NOT_EQUAL':
           return "$ne";
           break;
   }
};

let validateFormula = function(cache, formula) {
    let {done, calls, i, resultsMap} = cache;
    
    try {
        if (formula && formula.expression) {
            let regex = "\\${1,2}[A-Z0-9]+";
            let newExpression = replaceVariableForValue(regex, formula.expression, "1");
            let value = math.eval(newExpression);
            return { error: false, isValid: true };
        } else {
            return { error:false, isValid: false }
        }

    } catch (err) {
        return { error: true, isValid: false, err: err };
    }
};


let replaceVariableForValue = function(regex, expression, value = 0){
    let newExpression = expression.replace(new RegExp(regex + "\\b","g"), value);
    return newExpression;
};



let calculateAndValidateFormula = function(req, cache, calculation, options, callback){

    // let {done, calls, i, resultsMap} = cache;

    if (typeof calculation === 'string' || calculation instanceof mongoose.Types.ObjectId) {
        Calculation.findOne(
            {_id: mongoose.Types.ObjectId(calculation)}
        ).exec(function (err, res) {
            //Result (callback)
            if(err){
                console.log('@calculateAndValidateFormula - err', err);
            } else {
                calculation = res;
                processCalculation(req, cache, calculation, options, callback)
            }
        });
    } else {
        processCalculation(req, cache, calculation, options, callback)
    }
};

exports.calculateAndValidateFormula = calculateAndValidateFormula;

let convertResultAccordingToScale = function(calculation, result = 0){
    let convertedResult = 0;
    if (calculation.hasPercentScale) {
        calculation.scale.forEach((item) => {
            if (item.min <= result  && item.max >= result) {
                convertedResult = item.value;
            }
        });
        result = convertedResult;
    }

    return result
};

let  processCalculation = function(req, cache, calculation, options = {}, mainCallback){
    let {done, calls, i, resultsMap} = cache;

    // console.log("calculation", calculation);
    
    let variables = getVariables();

    if(resultsMap[calculation.abbreviation]){
        let result = {
            abbreviation: calculation.abbreviation,
            results : resultsMap[calculation.abbreviation]
        };
        // return result;
        return mainCallback(null, resultsMap[calculation.abbreviation]);
    }

    try {
        let formulaValidation = validateFormula(cache, calculation.formula);
        if (formulaValidation.error) {
            return mainCallback({error:true, message:'calculations.formula.syntax.error', err:formulaValidation.err});
        }

        let aggregatePromises = {
            queries:[],
            abbreviation:[]
        };


        calculation.formula.variables.forEach((item) => {
            let queryArray = variables[item.abbreviation].query;
            let filters = calculation.filters ? calculation.filters.filter(f => { return f.variableAbbreviation == item.abbreviation }) : [];
            let matchQuery = buildAggregateQuerysFromFilters(filters);
            let qNotDeleted = deletedSchema.qNotDeleted();

            const skipFilterByProcedureState = item.abbreviation === '$NFXXVII' || item.abbreviation === '$NTF';
            let query = {...Contract.qProcedureStateConcluded(true, skipFilterByProcedureState), ...qNotDeleted};
            
            if (options.query) {
                // query = {...query, ...options.query};

                let finalQuery = {
                    ...query,
                    ...options.query,
                };

                if (finalQuery["$and"]) {
                    finalQuery["$and"] = (query["$and"] || []).concat((options.query["$and"] || []))
                }
                
                query = finalQuery;
            }

            //Check if calculation is filtered by organization, even if it's the corruption index
            if (/*!calculation.locked && */calculation.type === 'CONTRACT') {
                let qByOrganization;
                if (options.currentOrganizationId) {
                    qByOrganization = {organization: options.currentOrganizationId};
                } else {
                    qByOrganization = Organization.qByOrganization(req);
                }
                query = {...query, ...qByOrganization, ...matchQuery};
            }

            delete query.currentOrganizationId;

            if (Object.keys(query).length) {
                queryArray.unshift({$match: query});
            }

            let aggregate = Contract.aggregate(variables[item.abbreviation].query);

            aggregatePromises.queries.push(aggregate);
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

            if (calculation.formula.calculations && calculation.formula.calculations.length) {
                let innerCalculations = [];
                for (let k = 0; k < calculation.formula.calculations.length; k++) {
                    innerCalculations.push(calculation.formula.calculations[k])
                    ///async parallel
                    /////
                }
                let variablesToReplace = [];
                async.each(innerCalculations,
                    function (calculation, AsyncEachCallback) {
                        calculateAndValidateFormula(req, cache, calculation, options, function (err, res) {
                            if (err) {
                                AsyncEachCallback(err);
                            } else {
                                variablesToReplace.push(res);
                                AsyncEachCallback(null, res);
                            }
                        })
                    }
                    , function(err){
                        if(err){
                            logger.error(err, req, 'calculation.controller#processCalculation', 'Error trying to process innerCalculations');
                            return mainCallback({ error:true, message:'calculations.formula.unexpected.error', err:err});
                        } else {
                            try {
                                variablesToReplace.forEach((item) => {
                                    let regex = item.abbreviation.replace(/\$\$/, "");
                                    regex = "\\$\\$" + regex;
                                    calculation.formula.expression = replaceVariableForValue(regex, calculation.formula.expression, item.value);
                                });

                                finalValue = math.eval(calculation.formula.expression);
                                finalValue = convertResultAccordingToScale(calculation, finalValue);

                                let result = {
                                    abbreviation: calculation.abbreviation,
                                    value : finalValue,
                                    displayForm : calculation.displayForm,
                                };
                                resultsMap[calculation.abbreviation] = result;
                                return mainCallback(null, result);
                            } catch(err) {
                                logger.error(err, req, 'calculation.controller#processCalculation', 'Error trying to replace variables with their values');
                                return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:err});
                            }
                        }
                    });
            } else {
                try {
                    finalValue = math.eval(calculation.formula.expression);
                    finalValue = convertResultAccordingToScale(calculation, finalValue);
                    let result = {
                        abbreviation: calculation.abbreviation,
                        value : finalValue,
                        displayForm : calculation.displayForm,
                    };
                    resultsMap[calculation.abbreviation] = result;
                    return mainCallback(null, result);
                } catch(err) {
                    logger.error(err, req, 'calculation.controller#processCalculation', 'Error trying to process value for calculation without inner calculations.');
                    return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:err});
                }
            }
        }).catch((errors) => {
            logger.error(errors, req, 'calculation.controller#processCalculation', 'Error querying calculations.');
            return mainCallback({error:true, message:'calculations.formula.unexpected.error', err:errors});
        });

    } catch(err) {
        logger.error(err, req, 'calculation.controller#processCalculation', 'Error trying to process calculation result');
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
    // let qByOrganization = Organization.qByOrganization(req);
    query = {...query, ...qNotDeleted/*, ...qByOrganization*/};
    
    Calculation
        .find(query)
        .count()
        .exec((err, count) => {
            if (err) {
                logger.error(err, req, 'calculation.controller#delete', 'Error al realizar count de Calculation');
                return res.json({
                    errors: true,
                    message: req.__('general.error.delete')
                });
            }
            
            if (count === 0) {
                logger.error(err, req, 'calculation.controller#delete', 'Error al intentar borrar Calculation; el registro no existe o ya fue borrado anteriormente');
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
                    logger.error(err, req, 'calculation.controller#delete', 'Error al borrar Calculation.');
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

/**
 * Queries the possible suppliers fot this contract
 */
exports.retrieveSuppliers = (req, res, next) => {
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let query = {...qNotDeleted, ...qByOrganization};

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
    let paginationOptions = pagination.getDefaultPaginationOptions(req);

    let qNotDeleted = deletedSchema.qNotDeleted();
    let qByOrganization = Organization.qByOrganization(req);
    let query = {...qNotDeleted, ...qByOrganization};

    AdministrativeUnit
        .find(
            query,
            (err, result) => {
                if (err) {
                    logger.error(err, req, 'contract.controller#list', 'There was an error retrieving the Admiinstrative Units');
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


Calculation = require('./../models/calculation.model').Calculation;
typeEnum = require('./../models/calculation.model').typeEnum;
typeEnumDict = require('./../models/calculation.model').typeEnumDict;
displayFormEnum = require('./../models/calculation.model').displayFormEnum;
displayFormEnumDict = require('./../models/calculation.model').displayFormEnumDict;

