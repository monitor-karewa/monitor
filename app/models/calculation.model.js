const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');
const Contracts = require("./contract.model").Contract;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');
const math = require('mathjs');
const variables = require("./../components/variablesSeed").variables;

const permissions = require('./../components/permissions');

const variableSchema = new Schema({
    abbreviation: {
        type: String,
        required: true,
        index: {unique: true}
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
        // required: true
    }
    //TODO: definir campos faltantes
});


/**
 * Schema de Mongoose para el modelo Calculation.
 * @type {mongoose.Schema}
 */
let CalculationSchema = new Schema({});

const FormulaSchema = new Schema({
    expression: {
        type: String,
        required: true
    },
    variables: [variableSchema],
    calculations :  {
        type: [Schema.Types.ObjectId],
        ref : 'Calculation'
    }
});

CalculationSchema.add({
        name: {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        abbreviation: {
            type: String,
            required: true,
            min: 2,
            max: 8
        },
        type : {

            type: String,
            required: true,
            enum: ['GENERAL', 'CONTRACT']
        },
        enabled :  {

            type: Boolean,
            required: false
        },
        displayForm :  {
            type: String,
            required: true,
            enum: ['NORMAL', 'PERCENTAGE', 'AMOUNT']
        },
        notes : {

            type: String,
            required: false
        },
        formula: {
            type: FormulaSchema,
            required: false
        }
    }
)
    CalculationSchema.delete = require("./schemas/deleted.schema").Deleted;

//Agregar createdAt, modifiedAt automáticamente
CalculationSchema.plugin(pluginCreatedUpdated);

//Paginación
CalculationSchema.plugin(mongoosePagination);

//Clase del modelo Calculation.
class CalculationClass {
    constructor() {

    }

    static validateFormula(formula){
        // $NPEPE +
        try {
            if(formula && formula.expression){
                let regex = "\\${1,2}[A-Z0-9]+";
                let newExpression = this.constructor.replaceVariableForValue(regex, formula.expression, "1");
                let value = math.eval(newExpression);
                return {error:false, isValid:true };
            }
        } catch(err) {
            return { error:true, isValid:false, err:err };
        }
    }

    static calculateAndValidateFormula(formula,callback){
        console.log("Entro aqui @calculateAndValidateFormula");
        try {
            console.log("Entro aca @calculateAndValidateFormula");
            let formulaValidation = this.constructor.validateFormula(formula);
            if (formulaValidation.error) {
                return callback(formulaValidation.err);
            }

            let aggregatePromises = [];
            formula.variables.forEach((item) => {
                aggregatePromises.push(Contracts.aggregate(variables[item.abbreviation].query))
            });
            let finalValue = 0;
            Promise.all(aggregatePromises).then((results) => {
                // { abbreviation : "$NAD", results : 45.44} Estructura Que debe devolver el aggregate
                console.log("results");
                results.forEach((result) => {
                    console.log("result", result[0]);
                    let abbreviation = result[0].abbreviation;
                    let regex = abbreviation.replace(/\$/, "");
                    regex = "\\$" + regex;
                    console.log("regex", regex);
                    formula.expression = this.constructor.replaceVariableForValue(regex, formula.expression, result[0].result);
                });

                finalValue = math.eval(formula.expression);
                return callback(null, finalValue);


            }).catch((errors) => {
                return callback(errors);
            });

        } catch(err) {
            console.log("err", err);
            return callback(err);

        }
    }

    static replaceVariableForValue(regex, expression, value){
        let newExpression = expression.replace(new RegExp(regex,"g"), value);
        return newExpression;
    }

}

//Cargar class en Schema
CalculationSchema.loadClass(CalculationClass);

CalculationSchema.statics.permission = permissions.getDefault("Calculation");

CalculationSchema.statics.expressValidator = function() {
    
    //For a list of available validators, check:
    //https://github.com/chriso/validator.js#validators
    
    //For more information about express-validator:
    //https://express-validator.github.io/docs/
    
    return [
        //Some examples:
        // check('email').isEmail(),
        // check('type').isIn(allowedTypes),
        // check('url').isUrl()
    ]
};

const Calculation = mongoose.model('Calculation', CalculationSchema);

module.exports = {
    Calculation
};