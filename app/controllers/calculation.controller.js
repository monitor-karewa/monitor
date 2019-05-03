const pagination = require('./../components/pagination');
const logger = require('./../components/logger').instance;
const mongoose = require('mongoose');

const Calculation = require('./../models/calculation.model').Calculation;
const deletedSchema = require('./../models/schemas/deleted.schema');
const variables = require('./../components/variablesSeed').variables;

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

                console.log("result", result);

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
                let formulaValidation = calculation.validateFormula(calculation.formula);

                    if(formulaValidation.error){
                        return res.json({error: true, message: "La formula no es válida", err:formulaValidation.err})
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

        Calculation.validateFormula(calculation.formula, (err, isValid)=>{
            console.log("err", err);
            console.log("isValid", isValid);
            if(err){
                return res.json({error: true, message: "La formula no es válida", err:err})
            }

            Calculation.calculateAndValidateFormula(calculation.formula, (err, value) => {
                console.log("err", err);
                console.log("+++ Resultado Final +++", value);
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
            });
        });
    }
};

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