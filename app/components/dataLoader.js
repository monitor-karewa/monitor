const Excel = require('exceljs');
const async = require('async');
const mongoose = require('mongoose');
const Jaccard = require('jaccard-index');

const logger = require('./logger').instance;
const utils = require('./utils');

const Contract = require('./../models/contract.model').Contract;
const {
    
    procedureTypesEnumDict,
    procedureTypesEnum,
    
    categoryEnumDict,
    categoryEnum,

    procedureStateEnumDict,
    procedureStateEnum,

    administrativeUnitTypeEnumDict,
    administrativeUnitTypeEnum,

    limitExceededEnumDict,
    limitExceededEnum,

    // contractTypeEnumDict,
    // contractTypeEnum
} = require('./../models/contract.model');
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const Supplier = require('./../models/supplier.model').Supplier;
const DataLoad = require('./../models/dataLoad.model').DataLoad;

//Always the first sheet
const WORKSHEET_ID = 1;

//First row is used by the system to identify each column
const IDENTIFIERS_ROW_INDEX = 1;

//Second row is used by people to identify each column, hence the "human" part
const HUMAN_IDENTIFIERS_ROW_INDEX = 2;

const REF_STRATEGIES = {
    EXACT: 0,
    CONTAINS: 1,
    SUBSET: 2,
    FUZZY: 3
};

//Column identifiers
const C_IDS = {
    PROCEDURE_TYPE: 'C1',
    CATEGORY: 'C2',
    ADMINISTRATION: 'C3',
    FISCAL_YEAR: 'C4',
    PERIOD: 'C5',
    CONTRACT_ID: 'C6',
    PARTIDA: 'C7',
    PROCEDURE_STATE: 'C8',
    ACCOUNCEMENT_URL: 'C9',
    ACCOUNCEMENT_DATE: 'C10',
    SERVICES_DESCRIPTION: 'C11',
    CLARIFICATION_MEETING_DATE: 'C12',
    CLARIFICATION_MEETING_JUDGEMENT_URL: 'C13',
    PRESENTATION_PROPOSALS_DOC_URL: 'C14',
    SUPPLIER_NAME: 'C15',
    SUPPLIER_RFC: 'C16',
    ORGANIZER_ADMINISTRATIVE_UNIT: 'C17',
    APPLICANT_ADMINISTRATIVE_UNIT: 'C18',

    //Centralizada/Descentralizada
    ADMINISTRATIVE_UNIT_TYPE: 'C19',

    CONTRACT_NUMBER: 'C20',
    CONTRACT_DATE: 'C21',
    // CONTRACT_TYPE: 'C22',
    TOTAL_AMOUT: 'C22',
    MIN_AMOUNT: 'C23',
    MAX_AMOUNT: 'C24',
    MAX_OR_TOTAL_AMOUNT: 'C25',
    CONTRACT_URL: 'C26',
    AREA_IN_CHARGE: 'C27',
    UPDATE_DATE: 'C28',
    NOTES: 'C29',
    KAREWA_NOTES: 'C30',
    INFORMATION_DATE: 'C31',
    LIMIT_EXCEEDED: 'C32',
    AMOUNT_EXCEEDED: 'C33',

    //Catch-all for unrecognized columns
    UNKOWN_COLUMN: 'UNKOWN_COLUMN'
};

let columnIdsKeys = Object.keys(C_IDS);
let columnIdsValues = [];

for (let key of columnIdsKeys) {
    columnIdsValues.push(C_IDS[key]);
}

class ContractExcelReader {
    constructor(organizationId) {
        this.organizationId = organizationId;
        this.columns = [];
        this.elements = [];
    }

    _readIdentifiersRow(sheet, row, callback) {
        let columnCount = sheet.actualColumnCount;

        for (let i = 1; i < (columnCount + 1); i++) {
            let cell = row.getCell(i);

            //Save ordered column identifiers
            if (columnIdsValues.includes(cell.value)) {
                this.columns.push(cell.value);
            } else {
                //Unrecognized column, should be ignored
                this.columns.push(C_IDS.UNKOWN_COLUMN);
            }
        }

        return callback();
    }

    _readHumanIdentifiersRow(sheet, row, callback) {
        //Currently not used
        return callback();
    }

    _buildRefCheckQuery(model, field, value, strategy) {
        let query = {};
        switch (strategy) {
            case REF_STRATEGIES.EXACT:
                query[field] = value;
                break;
            case REF_STRATEGIES.CONTAINS:
                query[field] = new RegExp(`.*${value}.*`);
                break;
            case REF_STRATEGIES.SUBSET:

                let keywords = value.split(' ');

                let regexStr = "";

                //If the value is "ONE TWO THREE"
                //This will generate a regex ".*(ONE|TWO|THREE)? (ONE|TWO|THREE)? (ONE|TWO|THREE)?.*"
                keywords.forEach((keyword) => {
                    //Note: The space at the end is intended
                    regexStr += `(${keywords.join('|')})? `;
                });

                //Remove the last extra space
                regexStr = regexStr.substr(0, regexStr.length - 1);

                //Add a wildcard (".*") before and after
                regexStr = ".*" + regexStr + ".*";

                query[field] = new RegExp(regexStr);
                break;
            case REF_STRATEGIES.FUZZY:
                logger.info(null, null, 'dataLoader#_buildRefCheckQuery', 'TODO: Implement REF_STRATEGIES.FUZZY');
                break;
        }

        //Fields to retrieve: _id + the field used for the query
        let select = `_id ${field}`;

        return model.find(query)
            .select(select);
    }

    _readField(obj, value, fieldName, type, options = {}, mainCallback) {
        let _this = this;

        async.waterfall([
            //Initialize the fieldInfo
            (callback) => {
                let fieldInfo = {
                    fieldName: fieldName,
                    value: null,
                    valueToSaveOverride: null,
                    errors: [],
                    infos: [],
                    model: null,
                    duplicate: false,
                    shouldCreateDoc: false,
                    skipRow: false,
                    refLinkedBy: [],
                    refLink: null,
                    options: options
                };
                return callback(null, fieldInfo);
            },
            //Parse value
            (fieldInfo, callback) => {
                try {
                    switch (type) {
                        case String:
                            fieldInfo.value = value || '';
                            
                            //Try to obtain inner value "hyperlink" or "text", which is available only for URLs
                            if (options.hyperlink) {
                                if (fieldInfo.value.hyperlink) {
                                    fieldInfo.value = fieldInfo.value.hyperlink;
                                } else if (fieldInfo.value.text) {
                                    fieldInfo.value = fieldInfo.value.text;
                                }
                            }
                            
                            
                            if (typeof(fieldInfo.value) !== 'string') {
                                logger.error(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to read as String.', fieldName);

                                // fieldInfo.errors.push({
                                //     //TODO: i18n
                                //     message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                // });
                                //
                                // return callback(null, fieldInfo);
                                fieldInfo.value = fieldInfo.value.toString();
                                logger.warn(null, null, 'dataLoader#_readField', 'Field [%s] forced to String.', fieldName);
                            }


                            //Force uppercase
                            if (options.uppercase) {
                                if (fieldInfo.value.toUpperCase) {
                                    fieldInfo.value = fieldInfo.value.toUpperCase();
                                }
                            }

                            //Validate vs enum
                            if (options.enum) {
                                let enumKeys = Object.keys(options.enum);
                                
                                let matchFound = false;

                                for (let key of enumKeys) {
                                    let regexOptions = options.enum[key];
                                    for (let regexOption of regexOptions) {
                                        let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                                        let isMatch = regex.test(fieldInfo.value);
                                        if (isMatch) {
                                            
                                            //The value to save is the actual enum dict key (the allowed enum value)
                                            fieldInfo.valueToSaveOverride = key;

                                            matchFound = true;
                                            break;
                                        }
                                    }
                                    
                                    if (matchFound) {
                                        break;
                                    }
                                }
                                
                                
                                if (!matchFound) {
                                    fieldInfo.errors.push({
                                        //TODO: i18n
                                        // message: 'El valor indicado no está permitido para este campo.'
                                        message: 'El valor indicado no se encuentra en las opciones permitidas para este campo.'
                                    });
                                }
                                
                                
                                // if (!options.enum.includes(fieldInfo.value)) {
                                //     //Invalid value for enum!
                                //     // fieldInfo.value = '';
                                //     fieldInfo.errors.push({
                                //         //TODO: i18n
                                //         // message: 'El valor indicado no está permitido para este campo.'
                                //         message: 'El valor indicado no se encuentra en las opciones permitidas para este campo.'
                                //     });
                                // }
                            }

                            if (options.match && options.match.regexStr) {
                                let regex = new RegExp(options.match.regexStr, options.match.flags);
                                if (!regex.test(fieldInfo.value)) {
                                    //Invalid value for match / regex!
                                    // fieldInfo.value = '';
                                    fieldInfo.errors.push({
                                        //TODO: i18n
                                        message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                    });
                                }
                            }
                            break;
                        case Date:
                            value = value || '';

                            if (!utils.isDate(value) && typeof(value) !== 'string') {
                                logger.error(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to parse as String.', fieldName);

                                fieldInfo.errors.push({
                                    //TODO: i18n
                                    message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                });

                                return callback(null, fieldInfo);
                            } else if (utils.isDate(value)) {
                                fieldInfo.value = value;
                            } else {
                                fieldInfo.value = utils.parseDate(value, true);
                            }
                            // console.log('Date value', value);

                            console.log('fieldInfo.value', fieldInfo.value);
                            console.log('typeof(fieldInfo.value)', typeof(fieldInfo.value));
                            console.log('Object.prototype.toString.call(fieldInfo.value)', Object.prototype.toString.call(fieldInfo.value));;

                            break;
                        case Number:
                            value = value || '';

                            // console.log(fieldName + ' => ', value);

                            if (!utils.isNumber(value) && typeof(value) !== 'string') {
                                logger.error(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to parse as String.', fieldName);

                                fieldInfo.errors.push({
                                    //TODO: i18n
                                    message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                });

                                return callback(null, fieldInfo);
                            }
                            

                            if (utils.isNumber(value)) {
                                fieldInfo.value = value;
                            } else {
                                value = value.replace("$", "").replace(",", "").replace(" ", "");
                                fieldInfo.value = utils.parseNumber(value);
                            }
                            break;
                    }
                } catch (err) {
                    console.log('\t\terr', err);
                }
                return callback(null, fieldInfo);
            },
            //Check ref in a collection
            (fieldInfo, callback) => {
                // console.log('options.ref', options.ref);
                // console.log('utils.isDefined(options.ref)', utils.isDefined(options.ref));
                if (options.ref) {
                    // console.log('utils.isDefined(options.ref.model)', utils.isDefined(options.ref.model));
                }

                if (typeof(value) !== 'string') {
                    logger.error(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to parse as String.', fieldName);

                    // fieldInfo.errors.push({
                    //     //TODO: i18n
                    //     message: 'El valor indicado no cumple con el formato permitido para este campo.'
                    // });

                    return callback(null, fieldInfo);
                }
                
                if (utils.isDefined(options.ref) && utils.isDefined(options.ref.model)) {

                    let model = mongoose.model(options.ref.model);
                    
                    fieldInfo.col = model.collection.collectionName;

                    let defaultField = 'name';
                    let defaultStrategy = REF_STRATEGIES.EXACT;

                    if (!options.ref.field) {
                        logger.warn(null, null, 'dataLoader#_readField', `Using default field "${defaultField}" for ref match on field [${fieldName}]`)
                    }

                    if (!options.ref.strategy) {
                        logger.warn(null, null, 'dataLoader#_readField', `Using default strategy "${defaultStrategy}" for ref match on field [${fieldName}]`)
                    }

                    let field = options.ref.field || defaultField;
                    let strategy = options.ref.strategy || defaultStrategy;

                    let query = _this._buildRefCheckQuery(model, field, fieldInfo.value, strategy);
                    // console.log('query', query);

                    query.exec((err, docs) => {
                        if (err) {
                            logger.error(err, null, 'dataLoader#_readField', 'Error trying to query model [%s] with query: %j', fieldInfo.col, query);
                        }
                        
                        //No matches found
                        if (!docs || !docs.length) {
                            fieldInfo.shouldCreateDoc = true;
                            return callback(null, fieldInfo);
                        }
                        
                        //Default "best" match is the first result
                        let doc = docs[0];

                        //Check all matches and pick the best match
                        
                        //Error if there's more than one match
                        if (docs.length > 1) {
                            let valueMatchesString = docs.map(_doc => _doc[field] || "").join(", ");
                            let firstValue = docs[0][field] || "";
                            fieldInfo.errors.push({
                                message: `El registro coincide con varios registros cargados previamente [${valueMatchesString}] y se utilizará la mejor coincidencia encontrada.`
                            });
                            
                        }

                        let wordsInValue = fieldInfo.value.split(" ");
                        let logs = {
                            "value": wordsInValue
                        };
                        
                        docs.forEach((doc, index) => {

                            let matchFieldValue = doc[field] || "";
                            let wordsInMatch = matchFieldValue.split(" ");

                            logs[index.toString()] = wordsInMatch;
                        });
                        
                        let items = Object.keys(logs);

                        Jaccard({
                            getLog: function (item) {
                                return logs[item];
                            }
                        }).getLinks(items)
                            .then((links) => {
                                let highestJaccardValue = 0;
                                let bestJaccardMatch = null;


                                links.forEach((link) => {
                                    if (link.target = "value") {
                                        if (link.value > highestJaccardValue) {
                                            highestJaccardValue = link.value;
                                            bestJaccardMatch = link;
                                        }
                                    }
                                });

                                if (bestJaccardMatch) {
                                    let index = Number(bestJaccardMatch.source);
                                    doc = docs[index];
                                } else {
                                    doc = docs[0];
                                }
                                
                                //Match found
                                if (doc) {
                                    //Set doc._id as valueToSaveOverride
                                    fieldInfo.valueToSaveOverride = doc._id;
                                    fieldInfo.duplicate = true;
                                    fieldInfo.shouldCreateDoc = false;
        
                                    fieldInfo.infos.push({
                                        message: `El registro se omitirá ya que coincide con uno cargado previamente [${doc[field]}]`
                                    });
                                    
                                    //Check if doc.[field] matches fieldInfo.value will be (hopefully) done after this process
                                } else {
                                    fieldInfo.shouldCreateDoc = true;
                                }
        
                                return callback(null, fieldInfo);
                                
                            }).catch((err) => {
                                logger.error(err, null, 'dataLoader#_readField', 'Error trying to find the best suited match using Jaccard Index');
                                
                                //Match found
                                if (doc) {
                                    //Set doc._id as valueToSaveOverride
                                    fieldInfo.valueToSaveOverride = doc._id;
                                    fieldInfo.duplicate = true;
                                    fieldInfo.shouldCreateDoc = false;
        
                                    fieldInfo.infos.push({
                                        message: `El registro se omitirá ya que coincide con uno cargado previamente [${doc[field]}]`
                                    });
                                    //Check if doc.[field] matches fieldInfo.value will be (hopefully) done after this process
                                } else {
                                    fieldInfo.shouldCreateDoc = true;
                                }
        
                                return callback(null, fieldInfo);
                            });
                        
                    });

                } else {
                    return callback(null, fieldInfo);
                }
            },
            (fieldInfo, callback) => {
                let refLinkInfo = null;
                let model = null;
                let _id = null;
                let sourceFieldInfo = null;
                let targetFieldInfo = null;
                
                //Check if current field is a refLink
                if (utils.isDefined(options.refLink)
                    && utils.isDefined(options.refLink.linkToField) 
                    && utils.isDefined(options.refLink.shouldMatchField)) {

                    let linkFromField = fieldName;
                    let linkToField = options.refLink.linkToField;
                    let shouldMatchField = options.refLink.shouldMatchField;

                    if (obj[linkToField]) {
                        //Field has been already proccessed, so we can proceed to validate the link
                        
                        //Check if its a valid linked field; should have a model defined
                        if (!obj[linkToField].options || !obj[linkToField].options.ref || !obj[linkToField].options.ref.model) {
                            logger.error(null, null, 'dataLoader#_readField', 'Using refLink, but linked field [%s] has no valid ref in its options', linkToField);
                            return callback(null, fieldInfo);
                        }
                        
                        //Check if linked field found a match; if no match was found, the refLink validation is not possible
                        if (!obj[linkToField].valueToSaveOverride) {
                            return callback(null, fieldInfo);
                        }
                        
                        model = mongoose.model(obj[linkToField].options.ref.model);
                        _id = obj[linkToField].valueToSaveOverride;

                        refLinkInfo = {
                            linkFromField: linkFromField,
                            linkToField: linkToField,
                            shouldMatchField: shouldMatchField,
                            shouldMatchValue: fieldInfo.value
                        };
                        
                        obj[linkToField].refLinkedBy.push(refLinkInfo);
                        sourceFieldInfo = obj[linkToField];
                        targetFieldInfo = fieldInfo;
                    } else {
                        //Wait for field to be processed
                        obj.pendingRefLinks = obj.pendingRefLinks || {};
                        let pendingRefLinkInfo = {
                            linkFromField: linkFromField,
                            linkToField: linkToField,
                            shouldMatchField: shouldMatchField,
                            shouldMatchValue: fieldInfo.value
                        };
                        obj.pendingRefLinks[linkToField] = pendingRefLinkInfo
                    }
                }

                //Check if current field has a refLink pending
                if (obj.pendingRefLinks && obj.pendingRefLinks[fieldName]) {
                    refLinkInfo = obj.pendingRefLinks[fieldName];
                    fieldInfo.refLinkedBy.push(refLinkInfo);

                    model = mongoose.model(fieldInfo.options.ref.model);
                    _id = fieldInfo.valueToSaveOverride;
                    sourceFieldInfo = obj[refLinkInfo.linkFromField];
                    targetFieldInfo = fieldInfo;
                }
                
                //Do refLink check if needed
                if (refLinkInfo && model && _id && sourceFieldInfo && targetFieldInfo) {

                    
                    model
                        .findOne({
                            _id: _id
                        })
                        .select(`_id ${refLinkInfo.shouldMatchField}`)
                        .exec((err, linkedDoc) => {
                            if (err) {
                                logger.error(err, null, 'dataLoader#_readField', 'Error trying to validate refLink [%s] -> [%s]; could not query model [%s] with _id [%s]', sourceFieldInfo.fieldName, targetFieldInfo.fieldName, model.collection.collectionName, _id);
                                return callback(null, fieldInfo);
                            }

                            if (!linkedDoc) {
                                logger.error(err, null, 'dataLoader#_readField', 'Error trying to validate refLink [%s] -> [%s]; doc not found for model [%s] with _id [%s]', sourceFieldInfo.fieldName, sourceFieldInfo.fieldName, model.collection.collectionName, _id);
                                return callback(null, fieldInfo);
                            }

                            //Check match
                            if (linkedDoc[refLinkInfo.shouldMatchField] !== targetFieldInfo.value) {
                                //Current value does not match the linked ref's doc field
                                sourceFieldInfo.errors.push({
                                    message: `El valor ingresado no coincide con el actualmente registrado [${linkedDoc[refLinkInfo.shouldMatchField]}].`
                                });
                            }
                            return callback(null, fieldInfo);
                        });
                } else {
                    return callback(null, fieldInfo);
                }

                
            },
            //Validation fn moved to the end of validations due to requiring access to other fields' values
            // //Call a validation function if needed
            // (fieldInfo, callback) => {
            //     if (utils.isDefined(options.validator) && utils.isFunction(options.validator)) {
            //         logger.info(null, null, 'dataLoader#_readField', 'TODO: options.validator');
            //        
            //         return callback(null, fieldInfo);
            //     } else {
            //         return callback(null, fieldInfo);
            //     }
            // },

            //Required value or fn moved to the end due to requiring access to other fields' values when it's a fn
            // //Check if the field value is required
            // (fieldInfo, callback) => {
            //     if (utils.isDefined(options.required) && utils.isNotDefined(fieldInfo.value)) {
            //         if (utils.isFunction(options.required)) {
            //             logger.info(null, null, 'dataLoader#_readField', 'TODO: options.required as a Function');
            //         } else if (utils.isBoolean(options.required) && options.required) {
            //             fieldInfo.errors.push({
            //                 message: 'Este campo es requerido.'
            //             });
            //         } else if (options.required) {
            //             fieldInfo.errors.push({
            //                 message: 'Este campo es requerido.'
            //             });
            //         }
            //         //TODO: check required
            //         return callback(null, fieldInfo);
            //     } else {
            //         return callback(null, fieldInfo);
            //     }
            // },
            //Check if the field value is unique
            (fieldInfo, callback) => {
                if (utils.isDefined(options.unique) && utils.isNotDefined(fieldInfo.value)) {

                    let query = {
                        fieldName: fieldInfo.value
                    };
                    Contract
                        .find(query)
                        .count()
                        .exec((err, count) => {
                            if (err) {
                                logger.error(err, null, 'dataLoader#_readField', 'Error trying to count model [%s] with query: %j', Contract.collection.collectionName, query);
                            }

                            if (count) {
                                fieldInfo.infos.push({
                                    message: 'Este registro ya existe en la base de datos.'
                                });

                                fieldInfo.skipRow = true;
                            }
                            return callback(null, fieldInfo);
                        });
                } else {

                    return callback(null, fieldInfo);
                }
            }
        ], (err, fieldInfo) => {
            if (err) {
                logger.error(err, null, 'dataLoader#_readField', 'Error processing row');
            }
            obj[fieldName] = fieldInfo;

            // return mainCallback(null, obj);
            return mainCallback(null, fieldInfo);
        });
    }


    _checkValidationsForFieldInfo(rowInfo, fieldInfo, callback) {
        let options = fieldInfo.options || {};
        if (options && utils.isDefined(options.validator) && utils.isFunction(options.validator)) {
            // logger.info(null, null, 'dataLoader#_readField', 'TODO: options.validator');
            options.validator(rowInfo, (err, errorMessage) => {
                if (errorMessage) {
                    fieldInfo.errors.push({
                        message: errorMessage
                    });
                }
                return callback();
            });
        } else {
            return callback(null);
        }
    }

    _checkRequiredForFieldInfo(rowInfo, fieldInfo, callback) {
        let options = fieldInfo.options || {};

        //We can check if the fieldInfo.value is already defined to skip this check, but we have to take into account 
        // that an empty string is not fulfilling a required validation
        if (options && utils.isDefined(options.required) && (fieldInfo.value === '' || utils.isNotDefined(fieldInfo.value))) {
            if (utils.isFunction(options.required)) {
                //Required check is a fn

                options.required(rowInfo, (err, isRequired, errorMessage) => {
                    
                    if (isRequired/* && utils.isNotDefined(fieldInfo.value)*/) {
                        //Field is required, but no valid value was found.

                        //TODO: i18n
                        errorMessage = errorMessage || 'Este campo es requerido.';
                        
                        if (errorMessage) {
                            fieldInfo.errors.push({
                                message: errorMessage
                            });
                        }
                    }

                    return callback();
                });
            } else {
                //Required check is not a fn
                if (utils.isBoolean(options.required) && options.required) {
                    fieldInfo.errors.push({
                        //TODO: i18n
                        message: 'Este campo es requerido.'
                    });
                } else if (options.required) {
                    //"truthy" value, e.g. 1
                    logger.warn(null, null, 'dataLoader#_readField', 'options.required was truthy, read as [true] for fieldName [%s]', fieldInfo.fieldName);
                    fieldInfo.errors.push({
                        //TODO: i18n
                        message: 'Este campo es requerido.'
                    });
                }

                return callback();
            }
        } else {
            return callback(null, fieldInfo);
        }
    }

    _readContractRow(sheet, row, readRowCallback) {
        let _this = this;
        let cellsInfoArr = [];

        row.eachCell({
            includeEmpty: true
        }, (cell, colNumber) => {

            cellsInfoArr.push({
                cell: cell,
                colNumber: colNumber
            });
        });

        let rowInfo = {};

        async.map(cellsInfoArr, (cellInfo, callback) => {
            let cell = cellInfo.cell;
            let colNumber = cellInfo.colNumber;

            //Arrays are base 0; columns in file are base 1
            let columnsArrayIndex = colNumber - 1;

            let column = this.columns[columnsArrayIndex];


            if (!column) {
                console.log('undefined column, skipping');
                return callback();
            }
            
            switch(column) {
                case C_IDS.PROCEDURE_TYPE:
                    return _this._readField(rowInfo, cell.value, 'procedureType', String, {
                        enum: procedureTypesEnumDict,
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.CATEGORY:
                    return _this._readField(rowInfo, cell.value, 'category', String, {
                        enum: categoryEnumDict,
                        required: function (rowInfo, callback) {
                            //TODO: Centralize this validation
                            
                            let regexOptionMatch = null;
                            
                            
                            for (let category of categoryEnum) {
                                
                                let regexOptions = categoryEnumDict[category];
                                
                                if (regexOptions && regexOptions.length > 0) {
                                    
                                    for (let regexOption of regexOptions) {
                                        let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                                        if (regex.test(rowInfo.servicesDescription.value)) {
                                            regexOptionMatch = regexOption; 
                                            break;
                                        }
                                    }
                                    if (regexOptionMatch) {
                                        break;
                                    }
                                    
                                }
                            }

                            if (regexOptionMatch) {
                                let isRequired = true;
                                let errorMessage = "Este campo es requerido debido a que se indicó una categoría en la descripción del contrato.";
                                
                                return callback(null, isRequired, errorMessage);
                            }
                            
                            return callback(null, false);
                        },
                        validator: function (rowInfo, callback) {
                            let regexOptionMatch = null;
                            let matchingCategory = null;

                            if (rowInfo.procedureState.value) {

                                for (let category of categoryEnum) {

                                    let regexOptions = categoryEnumDict[category];

                                    if (regexOptions && regexOptions.length > 0) {

                                        for (let regexOption of regexOptions) {
                                            let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                                            if (regex.test(rowInfo.servicesDescription.value)) {
                                                regexOptionMatch = regexOption;
                                                matchingCategory = category;
                                                break;
                                            }
                                        }
                                        if (regexOptionMatch) {
                                            break;
                                        }

                                    }
                                }

                                if (regexOptionMatch && matchingCategory) {
                                    let errorMessage = "El valor de este campo no coincide con la categoría indicada en la descripción del contrato.";

                                    return callback(null, errorMessage);
                                }

                                return callback();
                            }

                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.ADMINISTRATION:
                    return _this._readField(rowInfo, cell.value, 'administration', String, {
                        required: true,
                        //TODO: Centralize this Regex
                        match: {
                            regexStr: "^[12][0-9]{3}-[12][0-9]{3}$"
                        }
                    }, callback);
                    break;
                case C_IDS.FISCAL_YEAR:
                    return _this._readField(rowInfo, cell.value, 'fiscalYear', String, {
                        required: true,
                        //TODO: Centralize this Regex
                        match: {
                            regexStr: "^[12][0-9]{3}" 
                        }
                    }, callback);
                    break;
                case C_IDS.PERIOD:
                    return _this._readField(rowInfo, cell.value, 'period', String, {
                        required: true,
                        //TODO: Centralize this Regex
                        match: {
                            regexStr: "^[1234]o\\s2[0-9]{3}$"
                        }
                    }, callback);
                    break;
                case C_IDS.CONTRACT_ID:
                    return _this._readField(rowInfo, cell.value, 'contractId', String, {
                        required: true
                        //TODO: Validations
                    }, callback);
                    break;
                case C_IDS.PARTIDA:
                    return _this._readField(rowInfo, cell.value, 'partida', String, {}, callback);
                    break;
                case C_IDS.PROCEDURE_STATE:
                    return _this._readField(rowInfo, cell.value, 'procedureState', String, {
                        enum: procedureStateEnumDict,
                        required: function (rowInfo, callback) {
                            //TODO: Centralize this validation
                            // let descriptionRegExp = utils.toAccentsRegex((rowInfo.notes.value || '').toUpperCase(),'i');
                            // return descriptionRegExp.test(rowInfo.procedureType.value);

                            //TODO: Centralize this validation

                            let regexOptionMatch = null;


                            for (let procedureState of procedureStateEnum) {

                                let regexOptions = procedureStateEnumDict[procedureState];

                                if (regexOptions && regexOptions.length > 0) {

                                    for (let regexOption of regexOptions) {
                                        let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                                        if (regex.test(rowInfo.notes.value)) {
                                            regexOptionMatch = regexOption;
                                            break;
                                        }
                                    }
                                    if (regexOptionMatch) {
                                        break;
                                    }

                                }
                            }

                            if (regexOptionMatch) {
                                let isRequired = true;
                                let errorMessage = "Este campo es requerido debido a que se indicó un estado de procedimiento en las notas del contrato.";

                                return callback(null, isRequired, errorMessage);
                            }

                            return callback(null, false);
                        },
                        validator: function (rowInfo, callback) {
                            let regexOptionMatch = null;
                            let matchingProcedureState = null;
                            
                            if (rowInfo.procedureState.value) {

                                for (let procedureState of procedureStateEnum) {

                                    let regexOptions = procedureStateEnumDict[procedureState];
    
                                    if (regexOptions && regexOptions.length > 0) {
    
                                        for (let regexOption of regexOptions) {
                                            let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                                            if (regex.test(rowInfo.notes.value)) {
                                                regexOptionMatch = regexOption;
                                                matchingProcedureState = procedureState;
                                                break;
                                            }
                                        }
                                        if (regexOptionMatch) {
                                            break;
                                        }
    
                                    }
                                }
    
                                if (regexOptionMatch && matchingProcedureState) {
                                    let errorMessage = "El valor de este campo no coincide con el estado de procedimiento indicado en las notas del contrato.";
    
                                    return callback(null, errorMessage);
                                }
    
                                return callback();
                            }

                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.ACCOUNCEMENT_URL:
                    return _this._readField(rowInfo, cell.value, 'announcementUrl', String, {
                        hyperlink: true,
                        //TODO: Centralize this Regex
                        // match: new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})", "gi"),
                        // match: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                        match: {
                            regexStr: "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.ACCOUNCEMENT_DATE:
                    return _this._readField(rowInfo, cell.value, 'announcementDate', Date, {}, callback);
                    break;
                case C_IDS.SERVICES_DESCRIPTION:
                    return _this._readField(rowInfo, cell.value, 'servicesDescription', String, {
                        required: true
                    }, callback);
                    break;
                case C_IDS.CLARIFICATION_MEETING_DATE:
                    return _this._readField(rowInfo, cell.value, 'clarificationMeetingDate', Date, {}, callback);
                    break;
                case C_IDS.CLARIFICATION_MEETING_JUDGEMENT_URL:
                    return _this._readField(rowInfo, cell.value, 'clarificationMeetingJudgmentUrl', String, {
                        hyperlink: true,
                        match: {
                            regexStr: "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.PRESENTATION_PROPOSALS_DOC_URL:
                    return _this._readField(rowInfo, cell.value, 'presentationProposalsDocUrl', String, {
                        hyperlink: true,
                        // match: new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})", "gi"),
                        match: {
                            regexStr: "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.SUPPLIER_NAME:
                    return _this._readField(rowInfo, cell.value, 'supplierName', String, {
                        required: true,
                        ref: {
                            model: Supplier.modelName,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.SUBSET
                        }
                    }, callback);
                    break;
                case C_IDS.SUPPLIER_RFC:
                    return _this._readField(rowInfo, cell.value, 'supplierRfc', String, {
                        // required: true,
                        //TODO: Centralize this Regex
                        // match: new RegExp("^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$"),
                        match: {
                            regexStr: "^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$"
                        },
                        
                        refLink: {
                            linkToField: 'supplierName',
                            shouldMatchField: 'rfc'
                        }
                    }, callback);
                    break;
                case C_IDS.ORGANIZER_ADMINISTRATIVE_UNIT:
                    return _this._readField(rowInfo, cell.value, 'organizerAdministrativeUnit', String, {
                        required: true,
                        ref: {
                            model: AdministrativeUnit.modelName,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.SUBSET
                        },
                        //TODO: Centralize this validation
                        validator: function(rowInfo, callback){
                            let isValid = rowInfo.administrativeUnitType.value === 'DESCENTRALIZADA' ? rowInfo.organizerAdministrativeUnit.value === rowInfo.applicantAdministrativeUnit.value : true;
                            
                            let errorMessage = null;
                            if (!isValid) {
                                //TODO: i18n
                                errorMessage = 'Debido a que la organización es descentralizada, la Unidad Administrativa convocante debe ser igual a la solicitante.'
                            }
                            
                            return callback(null, errorMessage);
                        }
                    }, callback);
                    break;
                case C_IDS.APPLICANT_ADMINISTRATIVE_UNIT:
                    return _this._readField(rowInfo, cell.value, 'applicantAdministrativeUnit', String, {
                        required: true,
                        ref: {
                            model: AdministrativeUnit.modelName,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.SUBSET
                        },
                    }, callback);
                    break;
                case C_IDS.ADMINISTRATIVE_UNIT_TYPE:
                    return _this._readField(rowInfo, cell.value, 'administrativeUnitType', String, {
                        enum: administrativeUnitTypeEnumDict,
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_NUMBER:
                    return _this._readField(rowInfo, cell.value, 'contractNumber', String, {
                        //TODO: required?
                        // required: true,
                        unique: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_DATE:
                    return _this._readField(rowInfo, cell.value, 'contractDate', Date, {
                        required: true,
                        //TODO: Centralize this validation
                        validator: function(rowInfo, callback){
                            let yearContractDate = new Date(rowInfo.contractDate.value).getFullYear();
                            let fiscalYear = Number(rowInfo.fiscalYear.value);
                            let isValid = yearContractDate === fiscalYear;

                            console.log('yearContractDate', yearContractDate);
                            console.log('fiscalYear', fiscalYear);

                            let errorMessage = null;
                            if (!isValid) {
                                //TODO: i18n
                                errorMessage = 'La fecha del contrato no coincide con el ejercicio fiscal.';
                            }

                            return callback(null, errorMessage);
                        }
                    }, callback);
                    break;
                // case C_IDS.CONTRACT_TYPE:
                //     return _this._readField(obj, cell.value, 'contractType', String, {
                //         //TODO: Enum values for validation
                //         enum: [],
                //         required: true
                //     }, callback);
                //     break;
                case C_IDS.TOTAL_AMOUT:
                    return _this._readField(rowInfo, cell.value, 'totalAmount', Number, {}, callback);
                    break;
                case C_IDS.MIN_AMOUNT:
                    return _this._readField(rowInfo, cell.value, 'minAmount', Number, {}, callback);
                    break;
                case C_IDS.MAX_AMOUNT:
                    return _this._readField(rowInfo, cell.value, 'maxAmount', Number, {}, callback);
                    break;
                case C_IDS.MAX_OR_TOTAL_AMOUNT:
                    return _this._readField(rowInfo, cell.value, 'totalOrMaxAmount', Number, {
                        required: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_URL:
                    return _this._readField(rowInfo, cell.value, 'contractUrl', String, {
                        required: true,
                        hyperlink: true,
                        //TODO: Centralize this regex
                        // match: new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})", "gi"),
                        match: {
                            regexStr: "(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})",
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.AREA_IN_CHARGE:
                    return _this._readField(rowInfo, cell.value, 'areaInCharge', String, {
                        required: true,
                        ref: {
                            model: AdministrativeUnit.modelName,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.SUBSET
                        },
                    }, callback);
                    break;
                case C_IDS.UPDATE_DATE:
                    return _this._readField(rowInfo, cell.value, 'actualizationDate', Date, {
                        required: true,
                    }, callback);
                    break;
                case C_IDS.NOTES:
                    return _this._readField(rowInfo, cell.value, 'notes', String, {}, callback);
                    break;
                case C_IDS.KAREWA_NOTES:
                    return _this._readField(rowInfo, cell.value, 'karewaNotes', String, {}, callback);
                    break;
                case C_IDS.INFORMATION_DATE:
                    return _this._readField(rowInfo, cell.value, 'informationDate', Date, {
                        required: true,
                    }, callback);
                    break;
                case C_IDS.LIMIT_EXCEEDED:
                    return _this._readField(rowInfo, cell.value, 'limitExceeded', String, {
                        enum: limitExceededEnumDict,
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.AMOUNT_EXCEEDED:
                    return _this._readField(rowInfo, cell.value, 'amountExceeded', Number, {}, callback);
                    break;
                case C_IDS.UNKOWN_COLUMN:
                default:
                    //Unrecognized column identifier value
                    logger.warn(null, null, 'dataLoader#_readContractRow', 'Unknown column value [%s], skipping', column);
                    return callback();
            }
        }, (err, results) => {
            //All columns processed for row

            //Create a summary for the row obj
            rowInfo.summary = {};
            
            let fieldNames = Object.keys(rowInfo);
            
            //Move to an array for easier parallel processing
            let fieldInfoArray = [];
            
            for (let fieldName of fieldNames) {
                let fieldInfo = rowInfo[fieldName];
                fieldInfoArray.push(fieldInfo);
            }

            //Check additional validations: 
            //validator fn, hasErrors, hasInfos, and skipRow
            async.each(fieldInfoArray, (fieldInfo, callback) => {
                if (fieldInfo) {
                    
                    if (fieldInfo.errors && fieldInfo.errors.length) {
                        rowInfo.summary.hasErrors = true;
                    }
    
                    if (fieldInfo.infos && fieldInfo.infos.length) {
                        rowInfo.summary.hasInfos = true;
                    }
    
                    if (fieldInfo.skipRow) {
                        rowInfo.summary.skipRow = true;
                    }
                    
                    
                    // this._checkValidationsForFieldInfo(rowInfo, fieldInfo, callback);
                    
                    //Apply multiple fns with the same params, then call callback when all fns are done
                    async.applyEach([
                        this._checkValidationsForFieldInfo, 
                        this._checkRequiredForFieldInfo
                    ], rowInfo, fieldInfo, callback);
                    
                } else {
                    logger.error(null, null, 'dataLoader#_readContractRow', '[null] or [undefined] fieldInfo found');
                    return callback(null, fieldInfo);
                }
            }, (err, results) => {
                //All additional validations done
                return readRowCallback(null, rowInfo);
            });

        });
    }

    readBuffer(buffer) {
        let _this = this;
        return new Promise((resolve, reject) => {
            let workbook = new Excel.Workbook();

            workbook.xlsx.load(buffer)
                .then(() => {
                    //Use workbook
                    let sheet = workbook.getWorksheet(WORKSHEET_ID);

                    let rowsInfo = [];
                    let rowObjs = [];
                    
                    sheet.eachRow(function(row, rowNumber) {

                        rowsInfo.push({
                            row: row,
                            rowNumber: rowNumber
                        });

                        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
                    });
                    
                    async.map(rowsInfo, (rowInfo, callback) => {
                        let row = rowInfo.row;
                        let rowNumber = rowInfo.rowNumber;
                        if (rowNumber === IDENTIFIERS_ROW_INDEX) {
                            _this._readIdentifiersRow(sheet, row, callback);
                        } else if (rowNumber === HUMAN_IDENTIFIERS_ROW_INDEX) {
                            _this._readHumanIdentifiersRow(sheet, row, callback);
                        } else {
                            _this._readContractRow(sheet, row, callback);
                        }
                    }, (err, objs) => {
                        //Delete first two rows
                        objs.splice(0, 2);
                        let dataLoad = new DataLoad({
                            data: objs
                        });
                        return resolve(dataLoad);
                    });

                })
                .catch((err) => {
                    //Could not read file
                    logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to read data from buffer');
                    return reject(err);
                });
        });
    }

}

module.exports = {
    ContractExcelReader
};