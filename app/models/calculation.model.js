const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { check, validationResult } = require('express-validator/check');
const Contracts = require("./contract.model").Contract;

const pluginCreatedUpdated = require('mongoose-createdat-updatedat');
const mongoosePagination = require('mongoose-paginate');
const math = require('mathjs');

const permissions = require('./../components/permissions');



const variableSchema = new Schema({
    abbreviation: {
        type: String,
        required: true
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

const ScaleSchema = new Schema({
   min:{
       type: Number,
       min:[0,"El valor mínimo para el campo Min(%) es 0"],
       max:[99,"El valor máximo para el campo Max(%) es 99"],
       validate:{
           validator: function () {
               return this.min < this.max
           },
           message: props => "El valor mínimo de la escala no puede ser mayor al valor máximo"
       }
   },
   max:{
       type: Number,
       min:[1, "El valor mínimo para el campo Max(%) es 1"],
       max:[100, "El valor máximo para el campo Max(%) es 100"]
   },
   value:{
       type: Number
   }
});

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
        },
        hasPercentScale : {
            type : Boolean,
            required : true,
            default : false
        },
        scale:[ScaleSchema]
    }
);
    CalculationSchema.delete = require("./schemas/deleted.schema").Deleted;

//Agregar createdAt, modifiedAt automáticamente
CalculationSchema.plugin(pluginCreatedUpdated);

//Paginación
CalculationSchema.plugin(mongoosePagination);

//Clase del modelo Calculation.
class CalculationClass {
    constructor() {

    }

    validateFormula() {
        console.log("formula", this.formula);
        // $NPEPE +
        try {
            if (this.formula && this.formula.expression) {
                let regex = "\\${1,2}[A-Z0-9]+";
                let newExpression = this.constructor.replaceVariableForValue(regex, this.formula.expression, "1");
                let value = math.eval(newExpression);
                return  {error: false, isValid: true};
            } else {
                console.log("skhjdfbgkhsh guabeh bguha");
            }

        } catch (err) {
            return {error: true, isValid: false, err: err};
        }
    }

    //mirrored function on calculation controller
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