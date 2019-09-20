const Excel = require('exceljs');
const async = require('async');
const mongoose = require('mongoose');
const Jaccard = require('jaccard-index');

let logger = {};
const utils = require('./utils');

const Contract = require('./../models/contract.model').Contract;
const deletedSchema = require('./../models/schemas/deleted.schema');
const {

    procedureTypesEnumDict,
    procedureTypesEnum,
    getProcedureTypesEnumObject,

    categoryEnumDict,
    categoryEnum,
    getCategoryEnumObject,

    procedureStateEnumDict,
    procedureStateEnum,
    getProcedureStateEnumObject,

    administrativeUnitTypeEnumDict,
    administrativeUnitTypeEnum,
    getAdministrativeUnitTypeEnumObject,

    limitExceededEnumDict,
    limitExceededEnum,
    getLimitExceededEnumObject,

    contractTypeEnumDict,
    contractTypeEnum,
    getContractTypeEnumObject,

    CONTRACT_VALIDATION_REGEX_DICT
} = require('./../models/contract.model');
const AdministrativeUnit = require('./../models/administrativeUnit.model').AdministrativeUnit;
const {Supplier, SUPPLIER_VALIDATION_REGEX_DICT} = require('./../models/supplier.model');
const DataLoad = require('./../models/dataLoad.model').DataLoad;
const DataLoadDetail = require('./../models/dataLoadDetail.model').DataLoadDetail;
const qNotDeleted = require('./../models/schemas/deleted.schema').qNotDeleted();

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

const VALIDATION_STRATEGIES = {
    SKIP: 0,
    CHECK: 1
};

const REQUIRED_STRATEGIES = {
    SKIP: 0,
    CHECK: 1
};

/**
 * Threshold used to match ref-based fields with the Jaccard Index. The evaluated index is then checked with 
 * (index >= JACCARD_VALUE_REF_MATCH_THRESHOLD), and if the result is truthy then the ref is a valid ref.
 * @type {number} a value from 0 to 1
 */
const JACCARD_VALUE_REF_MATCH_THRESHOLD = 0.8;

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
    IS_EMPTY: 'C34',

    //Catch-all for unrecognized columns
    UNKOWN_COLUMN: 'UNKOWN_COLUMN'
};

//Column descriptions by ID
const C_IDS_DESCRIPTIONS = {
    [C_IDS.PROCEDURE_TYPE]: 'Tipo de procedimiento',
    [C_IDS.CATEGORY]: 'Materia',
    [C_IDS.ADMINISTRATION]: 'Administración',
    [C_IDS.FISCAL_YEAR]: 'Ejercicio',
    [C_IDS.PERIOD]: 'Periodo en que se reporta',
    [C_IDS.CONTRACT_ID]: 'ID',
    [C_IDS.PARTIDA]: 'Partida',
    [C_IDS.PROCEDURE_STATE]: 'Estado del procedimiento',
    [C_IDS.ACCOUNCEMENT_URL]: 'Hipervínculo a la convocatoria o invitaciones',
    [C_IDS.ACCOUNCEMENT_DATE]: 'Fecha de la convocatoria o invitación',
    [C_IDS.SERVICES_DESCRIPTION]: 'Descripción de las obras, bienes o servicios',
    [C_IDS.CLARIFICATION_MEETING_DATE]: 'Fecha en la que se celebró la junta de aclaraciones',
    [C_IDS.CLARIFICATION_MEETING_JUDGEMENT_URL]: 'Hipervínculo al fallo de la Junta de Aclaraciones',
    [C_IDS.PRESENTATION_PROPOSALS_DOC_URL]: 'Hipervínculo al documento de la Presentación de Propuestas',
    [C_IDS.SUPPLIER_NAME]: 'Nombre completo del o los contratista(s)',
    [C_IDS.SUPPLIER_RFC]: 'RFC',
    [C_IDS.ORGANIZER_ADMINISTRATIVE_UNIT]: 'Unidad administrativa convocante',
    [C_IDS.APPLICANT_ADMINISTRATIVE_UNIT]: 'Unidad administrativa solicitante',
    [C_IDS.ADMINISTRATIVE_UNIT_TYPE]: 'Centralizada/Descentralizada',
    [C_IDS.CONTRACT_NUMBER]: 'Número que identifique al contrato',
    [C_IDS.CONTRACT_DATE]: 'Fecha del contrato',
    [C_IDS.TOTAL_AMOUT]: 'Monto total del contrato con impuestos',
    [C_IDS.MIN_AMOUNT]: 'Monto mínimo, en su caso',
    [C_IDS.MAX_AMOUNT]: 'Monto máximo en su caso',
    [C_IDS.MAX_OR_TOTAL_AMOUNT]: 'Monto total o Monto máximo, en su caso',
    [C_IDS.CONTRACT_URL]: 'Hipervínculo al documento del contrato y anexos',
    [C_IDS.AREA_IN_CHARGE]: 'Área responsable de la información',
    [C_IDS.UPDATE_DATE]: 'Fecha de actualización',
    [C_IDS.NOTES]: 'Nota',
    [C_IDS.KAREWA_NOTES]: 'Notas Karewa',
    [C_IDS.INFORMATION_DATE]: 'Fecha de obtención de los datos',
    [C_IDS.LIMIT_EXCEEDED]: 'Adjudicaciones Directa s que exceden el límite',
    [C_IDS.AMOUNT_EXCEEDED]: 'Monto que excede el límite de la Adjudicación',
    [C_IDS.IS_EMPTY]: 'Indica si el contrato se hace con la intención de indicar que no se hicieron ',
};

const LETTERS_AND_SPACES_REGEX_STR = "[a-zA-ZñÑ]+[\S]*([a-zA-ZñÑ][\S]*)?";

const ARGB_ERRORS = "FFEAD3DC";

const ARGB_INFOS_FULL_OPACITY = "FF587FE3";
//587fe3 @0.18 alpha equals E1EBFD in RGB
const ARGB_INFOS = "FFE1EBFD";

let columnIdsKeys = Object.keys(C_IDS);
let columnIdsValues = [];

for (let key of columnIdsKeys) {
    columnIdsValues.push(C_IDS[key]);
}

class ContractExcelReader {
    constructor(organizationId, idDataLoad) {
        this.organizationId = organizationId;
        this.idDataLoad = idDataLoad;
        this.columns = [];
        this.elements = [];
        this._fieldInfoRefCache = {};
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

    _buildRefCheckQuery(currentOrganizationId, model, field, value, strategy) {
        let query = {organization: currentOrganizationId, ...qNotDeleted};
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

                
                if (keywords && keywords.length) {
                    //If the value is "ONE TWO THREE"
                    //This will generate a regex ".*(ONE|TWO|THREE)[ ]+(ONE|TWO|THREE)[ ]*(ONE|TWO|THREE)?.*"
                    let optionalSign;
                    let spaceCharSuffix;
                    for (let i = 0; i < keywords.length; i++) {
                        let keyword = keywords[i];
                        optionalSign = '';
                        //The first two words won't have a ? sign, ensuring a match has at least 2 words.
                        if (i > 1) {
                            optionalSign = '?';
                        }

                        //Note: The space at the end is intended
                        // spaceCharSuffix = '[ ]*';
                        // if (i === 0) {
                        //     spaceCharSuffix = '[ ]+';
                        // }
                        // if (i === (keywords.length - 1)) {
                        //     spaceCharSuffix = '';
                        // }

                        spaceCharSuffix = ' ';
                        regexStr += `(${keywords.join('|')})${optionalSign}${spaceCharSuffix}`;
                    }
                }

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

    _readField(obj, cell, fieldName, type, options = {}, mainCallback) {
        
        let value = cell.value;
        let _this = this;

        async.waterfall([
            //Initialize the fieldInfo
            (callback) => {
                logger.debug(null, null, '', `\tReading ${fieldName}`);
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
                    overrides: {
                        refStrategy: null,
                        validationStrategy: null,
                        requiredStrategy: null,
                        prefix: '',
                    },
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

                            //Try to obtain result if it's a formula
                            if (cell.formula) {
                                fieldInfo.value = cell.result || '';
                            }
                            
                            
                            if (typeof(fieldInfo.value) !== 'string') {
                                logger.warn(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to read as String.', fieldName);

                                // fieldInfo.errors.push({
                                //     //TODO: i18n
                                //     message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                // });
                                //
                                // return callback(null, fieldInfo);
                                fieldInfo.value = fieldInfo.value.toString();
                                logger.warn(null, null, 'dataLoader#_readField', 'Field [%s] forced to String.', fieldName);
                            }

                            //Remove leading or trailing spaces
                            fieldInfo.value = fieldInfo.value.trim();
                            // Remove duplicated spaces
                            fieldInfo.value = fieldInfo.value.replace(/ {1,}/g, " ");

                            //Check for reference check strategy override
                            //[!r#] at the start of a string overrides the ref check strategy, where # is a number from 0 to 2
                            if (fieldInfo.value && fieldInfo.value.length) {
                                let regexMatchRefStrategy = fieldInfo.value.match("^!r[0-2]");
                                if (regexMatchRefStrategy) {
                                    //Get the 3rd char (base 0) from the value; which is the override code we're looking for
                                    let overrideStr = fieldInfo.value.charAt(2);
                                    let refStrategyOverride = null;
                                    //TODO: dynamic check based on the REF_STRATEGIES map
                                    switch(overrideStr) {
                                        case '0':
                                            refStrategyOverride = REF_STRATEGIES.EXACT;
                                            break;
                                        case '1':
                                            refStrategyOverride = REF_STRATEGIES.CONTAINS;
                                            break;
                                        case '2':
                                            refStrategyOverride = REF_STRATEGIES.SUBSET;
                                            break;
                                        default:
                                    }
                                    fieldInfo.overrides.refStrategy = refStrategyOverride;
                                    //Remove the override value from the string
                                    fieldInfo.overrides.prefix = fieldInfo.value.substr(0, 3);
                                    fieldInfo.value = fieldInfo.value.substr(3, fieldInfo.value.length);
                                }
                            }

                            //Check for validation strategy override
                            //[!v#] at the start of a string overrides the validation strategy, where # is a number from 0 to 1
                            if (fieldInfo.value && fieldInfo.value.length) {
                                let regexMatchRefStrategy = fieldInfo.value.match("^!v[0-1]");
                                if (regexMatchRefStrategy) {
                                    //Get the 3rd char (base 0) from the value; which is the override code we're looking for
                                    let overrideStr = fieldInfo.value.charAt(2);
                                    let validationStrategyOverride = null;
                                    //TODO: dynamic check based on the REG_STRATEGY map
                                    switch(overrideStr) {
                                        case '0':
                                            validationStrategyOverride = VALIDATION_STRATEGIES.SKIP;
                                            break;
                                        case '1':
                                            validationStrategyOverride = VALIDATION_STRATEGIES.CHECK;
                                            break;
                                        default:
                                    }
                                    fieldInfo.overrides.validationStrategy = validationStrategyOverride;
                                    //Remove the override value from the string
                                    fieldInfo.overrides.prefix = fieldInfo.value.substr(0, 3);
                                    fieldInfo.value = fieldInfo.value.substr(3, fieldInfo.value.length);
                                }
                            }

                            //Check for required check strategy override
                            //[!req#] at the start of a string overrides the required strategy, where # is a number from 0 to 1
                            if (fieldInfo.value && fieldInfo.value.length) {
                                let regexMatchRefStrategy = fieldInfo.value.match("^!req[0-1]");
                                if (regexMatchRefStrategy) {
                                    //Get the 5th char (base 0) from the value; which is the override code we're looking for
                                    let overrideStr = fieldInfo.value.charAt(4);
                                    let requiredStrategyOverride = null;
                                    //TODO: dynamic check based on the REQUIRED_STRATEGIES map
                                    switch(overrideStr) {
                                        case '0':
                                            requiredStrategyOverride = REQUIRED_STRATEGIES.SKIP;
                                            break;
                                        case '1':
                                            requiredStrategyOverride = REQUIRED_STRATEGIES.CHECK;
                                            break;
                                        default:
                                    }
                                    fieldInfo.overrides.requiredStrategy = requiredStrategyOverride;
                                    //Remove the override value from the string
                                    fieldInfo.overrides.prefix = fieldInfo.value.substr(0, 5);
                                    fieldInfo.value = fieldInfo.value.substr(5, fieldInfo.value.length);
                                }
                            }


                            //Force uppercase
                            if (options.uppercase) {
                                if (fieldInfo.value.toUpperCase) {
                                    fieldInfo.value = fieldInfo.value.toUpperCase();
                                }
                            }

                            //Validate vs enum
                            if (fieldInfo.value && fieldInfo.value.length && options.enum) {
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

                            if (fieldInfo.value && fieldInfo.value.length && options.match && options.match.regexStr) {
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
                                // logger.warn(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to parse as String.', fieldName);
                                //
                                // fieldInfo.errors.push({
                                //     //TODO: i18n
                                //     message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                // });

                                return callback(null, fieldInfo);
                            } else if (utils.isDate(value)) {
                                fieldInfo.value = value;
                            } else {
                                //Issue fixed: Detección parcial de fechas (Formato enviado es dd/mm/yyyy, pero el sistema espera mm/dd/yyyy)
                                fieldInfo.value = utils.parseDate(value, false); //Note: false for dd/mm/yyyy
                            }
                            break;
                        case Number:
                            value = value || 0;

                            if (!utils.isNumber(value) && typeof(value) !== 'string') {
                                // logger.warn(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to parse as String.', fieldName);

                                // fieldInfo.errors.push({
                                //     //TODO: i18n
                                //     message: 'El valor indicado no cumple con el formato permitido para este campo.'
                                // });

                                return callback(null, fieldInfo);
                            }
                            

                            if (utils.isNumber(value)) {
                                fieldInfo.value = value;
                            } else {
                                value = value.replace("$", "").replace(",", "").replace(" ", "");
                                fieldInfo.value = utils.parseNumber(value);
                            }
                            break;
                        case Boolean:
                            value = value ? value : false;
                            let positiveBooleanStrings = ["true", "si", "sí", "verdadero"];

                            if(typeof value =="string"){
                                if(positiveBooleanStrings.includes(value.toLowerCase())){
                                    fieldInfo.valueToSaveOverride = true
                                    fieldInfo.value = true
                                } else {
                                    fieldInfo.valueToSaveOverride = false;
                                    fieldInfo.value = false;
                                }
                            } else if(typeof value == "boolean"){
                                fieldInfo.valueToSaveOverride = !!value;
                                fieldInfo.value = !!value;
                            } else {
                                fieldInfo.valueToSaveOverride = false
                                fieldInfo.value = false
                            }
                            break;
                    }
                } catch (err) {
                    logger.error(err, null, 'dataLoader#_readField', 'Error trying to parse value');
                }
                return callback(null, fieldInfo);
            },
            //Check ref in a collection
            (fieldInfo, callback) => {
                fieldInfo.value = (fieldInfo.value === null || fieldInfo.value === undefined) ? '' : fieldInfo.value;

                if (typeof(fieldInfo.value) !== 'string') {
                    // logger.warn(null, null, 'dataLoader#_readField', 'Field [%s] is not a valid string; unable to parse as String.', fieldName);

                    // fieldInfo.errors.push({
                    //     //TODO: i18n
                    //     message: 'El valor indicado no cumple con el formato permitido para este campo.'
                    // });

                    return callback(null, fieldInfo);
                }


                if (fieldInfo.value && fieldInfo.value.length && utils.isDefined(options.ref) && utils.isDefined(options.ref.model)) {

                    let fieldInfoRefCache = _this._fieldInfoRefCache[fieldInfo.value];
                    if (fieldInfoRefCache) {
                        //This value already has a result so we reuse the same result
                        fieldInfo.valueToSaveOverride = fieldInfoRefCache.valueToSaveOverride;
                        fieldInfo.errors = fieldInfoRefCache.errors;
                        fieldInfo.infos = fieldInfoRefCache.infos;
                        fieldInfo.duplicate = fieldInfoRefCache.duplicate;
                        fieldInfo.shouldCreateDoc = fieldInfoRefCache.shouldCreateDoc;
                        fieldInfo.skipRow = fieldInfoRefCache.skipRow;

                        return callback(null, fieldInfo);

                        // fieldInfo = {
                        //     ..._this._fieldInfoRefCache[fieldInfo.value],
                        //     ...{
                        //         //But we keep the current fieldName and options
                        //         fieldName: fieldInfo.fieldName,
                        //         options: fieldInfo.options
                        //     }
                        // }
                    }

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
                    
                    
                    //Apply manual override (see value parsing for more info)
                    //Note: 0 as a number is a valid option, so we have to check for a non-null and non-undefined value
                    if (utils.isDefined(fieldInfo.overrides.refStrategy)) {
                        strategy = fieldInfo.overrides.refStrategy;
                    }

                    let query = _this._buildRefCheckQuery(_this.organizationId, model, field, fieldInfo.value, strategy);
                    
                    query.exec((err, docs) => {

                        if (err) {
                            logger.warn(err, null, 'dataLoader#_readField', 'Error trying to query model [%s] with query: %j', fieldInfo.col, query);
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
                        let valueMatchesString = '';
                        let multipleMatchesErrorMessage = null;
                        if (docs.length > 1) {
                            valueMatchesString = docs.map(_doc => _doc[field] || "").join(", ");
                            let firstValue = docs[0][field] || "";
                            multipleMatchesErrorMessage = `El registro coincide con varios registros cargados previamente [${valueMatchesString}] y se utilizará la mejor coincidencia encontrada.`;

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

                                if (links && links.length) {
                                    links.forEach((link) => {
                                        if (link.target = "value") {
                                            if (link.value > highestJaccardValue) {
                                                highestJaccardValue = link.value;
                                                bestJaccardMatch = link;
                                            }
                                        }
                                    });
                                }

                                if (bestJaccardMatch) {
                                    //Check if it's a good enough match
                                    
                                    
                                    //Console.logs kept for future reviewing of JACCARD_VALUE_REF_MATCH_THRESHOLD
                                    
                                    // console.log('\n\n');
                                    // console.log('fieldInfo.fieldName', fieldInfo.fieldName);
                                    // console.log('logs', logs);
                                    // console.log('valueMatchesString', valueMatchesString);
                                    // console.log('fieldInfo.value', fieldInfo.value);
                                    // console.log('links', links);
                                    // console.log('bestJaccardMatch', bestJaccardMatch);
                                    // console.log('highestJaccardValue', highestJaccardValue);
                                    // console.log('\n\n');

                                    if (highestJaccardValue >= JACCARD_VALUE_REF_MATCH_THRESHOLD) {
                                        let index = Number(bestJaccardMatch.source);
                                        doc = docs[index];
                                        
                                        //When an exact match was found, other matches don't matter
                                        if (highestJaccardValue === 1) {
                                            multipleMatchesErrorMessage = null;
                                        }
                                    } else {
                                        //No good match was found

                                        //For some reason, sometimes the exact value yields a 0.71 match
                                        //Check for an exact match

                                        let exactMatchFound = false;

                                        for (let i = 0; i < docs.length; i++) {
                                            let _doc = docs[i];

                                            if (_doc[field] === fieldInfo.value) {
                                                //Set match (doc) as the first element and also the exact match (_doc)
                                                doc = _doc;
                                                //mark as found
                                                exactMatchFound = true;
                                                //end for loop
                                                break;
                                            }
                                        }

                                        if (!exactMatchFound) {
                                            multipleMatchesErrorMessage = null;
                                                doc = null;
                                        }

                                        // if (docs.length === 1) {
                                        //     let _doc = docs[0];
                                        //     console.log('\n\nfieldInfo.fieldName', fieldInfo.fieldName);
                                        //     console.log('_doc[field]', _doc[field]);
                                        //     console.log('fieldInfo.value', fieldInfo.value);
                                        //     if (_doc[field] === fieldInfo.value) {
                                        //         //Set match (doc) as the first element and also the exact match (_doc)
                                        //         doc = _doc;
                                        //     } else {
                                        //         multipleMatchesErrorMessage = null;
                                        //         doc = null;
                                        //     }
                                        // } else {
                                        //     multipleMatchesErrorMessage = null;
                                        //     doc = null;
                                        // }
                                    }
                                    
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

                                    if (multipleMatchesErrorMessage) {
                                        fieldInfo.errors.push({
                                            message: multipleMatchesErrorMessage
                                        });
                                    }

                                    //Check if doc.[field] matches fieldInfo.value will be (hopefully) done after this process
                                } else {
                                    fieldInfo.shouldCreateDoc = true;
                                }


                                //Cache the result
                                if (!_this._fieldInfoRefCache[fieldInfo.value]) {
                                    _this._fieldInfoRefCache[fieldInfo.value] = fieldInfo;
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

                                    if (multipleMatchesErrorMessage) {
                                        fieldInfo.errors.push({
                                            message: multipleMatchesErrorMessage
                                        });
                                    }
                                    
                                    //Check if doc.[field] matches fieldInfo.value will be (hopefully) done after this process
                                } else {
                                    fieldInfo.shouldCreateDoc = true;
                                }

                                //Cache the result
                                if (!_this._fieldInfoRefCache[fieldInfo.value]) {
                                    _this._fieldInfoRefCache[fieldInfo.value] = fieldInfo;
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
                if (fieldInfo.value && fieldInfo.value.length
                    && utils.isDefined(options.refLink)
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
                        // sourceFieldInfo = obj[linkToField];
                        // targetFieldInfo = fieldInfo;
                        sourceFieldInfo = fieldInfo;
                        targetFieldInfo = obj[linkToField];
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

                            //Check for validationStrategy
                            let validationStrategyOnSourceField;
                            if (sourceFieldInfo.overrides && utils.isDefined(sourceFieldInfo.overrides.validationStrategy)) {
                                validationStrategyOnSourceField = sourceFieldInfo.overrides.validationStrategy;
                            }

                            let ignore = (validationStrategyOnSourceField === VALIDATION_STRATEGIES.SKIP);

                            //Check match
                            if (!ignore && linkedDoc[refLinkInfo.shouldMatchField] !== sourceFieldInfo.value) {
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
                if (utils.isDefined(options.unique) && fieldInfo.value && fieldInfo.value.length) {

                    let query = {
                        [fieldName]: fieldInfo.value,
                        "deleted.isDeleted": {"$ne": true}
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
                                    message: 'Este registro se omitirá debido a que ya existe en la base de datos.'
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

            logger.debug(null, null, '', `\t${fieldInfo.fieldName} done: [${fieldInfo.value}]`);
            return mainCallback(null, fieldInfo);
        });
    }

    _checkAutosetFieldsForRowInfo(rowInfo) {
        rowInfo.contractType = {
            fieldName: 'contractType',
            value: null,
            errors: [],
            infos: [],
            model: null,
            duplicate: false,
            shouldCreateDoc: false,
            skipRow: false,
            refLinkedBy: [],
            refLink: null,
            overrides: {
                refStrategy: null,
                validationStrategy: null,
                requiredStrategy: null,
                prefix: '',
            },
            options: {required: true}
        };
        if (rowInfo.minAmount && rowInfo.minAmount.value && rowInfo.maxAmount && rowInfo.maxAmount.value) {
            rowInfo.contractType.value = 'OPEN';
            rowInfo.contractType.valueToSaveOverride = 'OPEN';
        } else {
            rowInfo.contractType.value = 'NORMAL';
            rowInfo.contractType.valueToSaveOverride = 'NORMAL';
        }
    }


    _checkValidationsForFieldInfo(rowInfo, fieldInfo, validationStrategy, requiredStrategy, organizationId, callback) {
        let options = fieldInfo.options || {};
        
        //Check for override
        if (fieldInfo.overrides && utils.isDefined(fieldInfo.overrides.validationStrategy)) {
            validationStrategy = fieldInfo.overrides.validationStrategy;
        }

        //If the validation strategy is skip, skip the validation
        if (validationStrategy === VALIDATION_STRATEGIES.SKIP) {
            return callback();
        }
        
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

    _checkRequiredForFieldInfo(rowInfo, fieldInfo, validationStrategy, requiredStrategy, organizationId, callback) {
        let options = fieldInfo.options || {};

        //Check for override
        if (fieldInfo.overrides && utils.isDefined(fieldInfo.overrides.requiredStrategy)) {
            requiredStrategy = fieldInfo.overrides.requiredStrategy;
        }

        if (requiredStrategy === REQUIRED_STRATEGIES.SKIP) {
            return callback();
        }

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
            return callback();
            // return callback(null, fieldInfo);
        }
    }

    _checkUniqueByOrganizationForFieldInfo(rowInfo, fieldInfo, validationStrategy, requiredStrategy, organizationId, callback) {
        let options = fieldInfo.options || [];
        
        if (options && utils.isDefined(options.uniqueByOrganization) && utils.isFunction(options.uniqueByOrganization)) {
            options.uniqueByOrganization(rowInfo, (err, shouldBeUnique, errorMessage, config) => {
                
                //Optional config for query
                config = config || {
                    model: Contract,
                    fieldName: fieldInfo.fieldName
                };
                
                if (shouldBeUnique) {
                    
                    let query = {};
                    
                    query[config.fieldName] = fieldInfo.value;
                    query.organization = organizationId;
                    query = {...query, ...deletedSchema.qNotDeleted()};
                    
                    config.model.find(query)
                        .count()
                        .exec((err, count) => {
                            if (err) {
                                logger.error(err, null, 'dataLoader#_checkUniqueByOrganizationForFieldInfo', 'Error trying to validate uniqueByOrganization on field [%s]', fieldInfo.fieldName);
                                return callback();
                            }
                            
                            //Check if a doc already exists for the current organization
                            if (count) {
                                fieldInfo.errors.push({
                                    //TODO: i18n
                                    message: errorMessage
                                });
                            }
                            return callback();
                        });
                } else {
                    return callback();
                }
            });
        } else {
            return callback();
        }
    }

    _readContractRow(sheet, row, rowIndex, readRowCallback) {
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

        logger.debug(null, null, '', `Reading row #${rowIndex}...`);
        let startDate = new Date();

        async.map(cellsInfoArr, (cellInfo, callback) => {
            let cell = cellInfo.cell;
            let colNumber = cellInfo.colNumber;

            //Arrays are base 0; columns in file are base 1
            let columnsArrayIndex = colNumber - 1;

            let column = this.columns[columnsArrayIndex];


            if (!column) {
                logger.debug(null, null, '', 'undefined column, skipping');
                return callback();
            }

            switch(column) {
                case C_IDS.PROCEDURE_TYPE:
                    return _this._readField(rowInfo, cell, 'procedureType', String, {
                        enum: procedureTypesEnumDict,
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.CATEGORY:
                    return _this._readField(rowInfo, cell, 'category', String, {
                        enum: categoryEnumDict,
                        required: function (rowInfo, callback) {
                            //TODO: Centralize this validation

                            if (rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride) {
                                return callback(null, false);
                            }

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

                            // if (rowInfo.category.value && rowInfo.category.valueToSaveOverride && rowInfo.servicesDescription.value) {

                            //     for (let category of categoryEnum) {

                            //         let regexOptions = categoryEnumDict[category];

                            //         if (regexOptions && regexOptions.length > 0) {

                            //             for (let regexOption of regexOptions) {
                            //                 let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                            //                 if (regex.test(rowInfo.servicesDescription.value)) {
                            //                     regexOptionMatch = regexOption;
                            //                     matchingCategory = category;
                            //                     break;
                            //                 }
                            //             }
                            //             if (regexOptionMatch) {
                            //                 break;
                            //             }

                            //         }
                            //     }

                            //     if (regexOptionMatch && matchingCategory && matchingCategory !== rowInfo.category.valueToSaveOverride) {
                            //         let errorMessage = "El valor de este campo no coincide con la categoría indicada en la descripción del contrato.";

                            //         return callback(null, errorMessage);
                            //     }

                            //     return callback();
                            // } else {
                                return callback();
                            // }

                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.ADMINISTRATION:
                    return _this._readField(rowInfo, cell, 'administration', String, {
                        required: true,
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.ADMINISTRATION
                        }
                    }, callback);
                    break;
                case C_IDS.FISCAL_YEAR:
                    return _this._readField(rowInfo, cell, 'fiscalYear', String, {
                        required: true,
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.FISCAL_YEAR 
                        },
                        //Issue fixed: Eliminar validación de fecha del ejercicio fiscal vs fecha del contrato
                        // validator: function(rowInfo, callback){
                        //     let yearContractDate = new Date(rowInfo.contractDate.value).getFullYear();
                        //     let fiscalYear = Number(rowInfo.fiscalYear.value);
                        //     let isValid = yearContractDate === fiscalYear;

                        //     let errorMessage = null;
                        //     if (!isValid) {
                        //         //TODO: i18n
                        //         errorMessage = 'La fecha del ejercicio fiscal no coincide con el fecha del contrato.';
                        //     }

                        //     return callback(null, errorMessage);
                        // }
                    }, callback);
                    break;
                case C_IDS.PERIOD:
                    return _this._readField(rowInfo, cell, 'period', String, {
                        required: true,
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.PERIOD
                        },
                        //Issue fixed: Eliminar validación de fecha del ejercicio fiscal vs fecha del periodo
                        // validator: function (rowInfo, callback) {
                        //     if (rowInfo.contractDate.value && rowInfo.period.value) {
                        //         let yearContractDate = new Date(rowInfo.contractDate.value).getFullYear();
                        //         let isValid = rowInfo.period.value.includes(String(yearContractDate));

                        //         let errorMessage = null;
                                
                        //         if (!isValid) {
                        //             errorMessage = "La fecha del periodo no coincide con la fecha del contrato.";
                        //         }
                                
                        //         return callback(null, errorMessage);
                        //     }

                        //     return callback();
                        // },
                    }, callback);
                    break;
                case C_IDS.CONTRACT_ID:
                    return _this._readField(rowInfo, cell, 'contractId', String, {
                        // required: false,
                        //Field confirmed as not 100% unique
                        // unique: true
                    }, callback);
                    break;
                case C_IDS.PARTIDA:
                    return _this._readField(rowInfo, cell, 'partida', String, {}, callback);
                    break;
                case C_IDS.PROCEDURE_STATE:
                    return _this._readField(rowInfo, cell, 'procedureState', String, {
                        enum: procedureStateEnumDict,
                        required: function (rowInfo, callback) {

                            if (rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride) {
                                return callback(null, false);
                            }
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

                            if (rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride) {
                                return callback(null, false);
                            } else if(!rowInfo.procedureState.valueToSaveOverride || rowInfo.procedureState.valueToSaveOverride == "NULL") {
                                let errorMessage = "El valor es requerido";
                                return callback(null, errorMessage);
                            }

                            // if (rowInfo.procedureState.value && rowInfo.procedureState.valueToSaveOverride && rowInfo.notes.value) {

                            //     for (let procedureState of procedureStateEnum) {

                            //         let regexOptions = procedureStateEnumDict[procedureState];
    
                            //         if (regexOptions && regexOptions.length > 0) {
    
                            //             for (let regexOption of regexOptions) {
                            //                 let regex = new RegExp(regexOption.regexStr, regexOption.flags);
                            //                 if (regex.test(rowInfo.notes.value)) {
                            //                     regexOptionMatch = regexOption;
                            //                     matchingProcedureState = procedureState;
                            //                     break;
                            //                 }
                            //             }
                            //             if (regexOptionMatch) {
                            //                 break;
                            //             }
    
                            //         }
                            //     }
    
                            //     if (regexOptionMatch && matchingProcedureState && matchingProcedureState !== rowInfo.procedureState.valueToSaveOverride) {
                            //         let errorMessage = "El valor de este campo no coincide con el estado de procedimiento indicado en las notas del contrato.";
    
                            //         return callback(null, errorMessage);
                            //     }
    
                            //     return callback();
                            // } else {
                                return callback();
                            // }

                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.ACCOUNCEMENT_URL:
                    return _this._readField(rowInfo, cell, 'announcementUrl', String, {
                        hyperlink: true,
                        //TODO: Centralize this Regex
                        // match: new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})", "gi"),
                        // match: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.URL,
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.ACCOUNCEMENT_DATE:
                    return _this._readField(rowInfo, cell, 'announcementDate', Date, {}, callback);
                    break;
                case C_IDS.SERVICES_DESCRIPTION:
                    return _this._readField(rowInfo, cell, 'servicesDescription', String, {
                        required: function (rowInfo, callback) {
                            if(rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride){
                                return callback(null, false);
                            }
                            return callback(null, true, "Este campo es requerido");
                        },
                    }, callback);
                    break;
                case C_IDS.CLARIFICATION_MEETING_DATE:
                    return _this._readField(rowInfo, cell, 'clarificationMeetingDate', Date, {}, callback);
                    break;
                case C_IDS.CLARIFICATION_MEETING_JUDGEMENT_URL:
                    return _this._readField(rowInfo, cell, 'clarificationMeetingJudgmentUrl', String, {
                        hyperlink: true,
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.URL,
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.PRESENTATION_PROPOSALS_DOC_URL:
                    return _this._readField(rowInfo, cell, 'presentationProposalsDocUrl', String, {
                        hyperlink: true,
                        // match: new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})", "gi"),
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.URL,
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.SUPPLIER_NAME:
                    return _this._readField(rowInfo, cell, 'supplierName', String, {
                        // required: true,
                        match: {
                            regexStr: LETTERS_AND_SPACES_REGEX_STR,
                            flags: "gi"
                        },
                        refLink: {
                            linkToField: 'supplierRfc',
                            shouldMatchField: 'name'
                        }
                    }, callback);
                    break;
                case C_IDS.SUPPLIER_RFC:
                    return _this._readField(rowInfo, cell, 'supplierRfc', String, {
                        // required: true,
                        match: {
                            // regexStr: SUPPLIER_VALIDATION_REGEX_DICT.RFC
                        },
                        // required: function (rowInfo, callback) {

                        //     let supplierNameDefined = rowInfo.supplierName.value && rowInfo.supplierName.value.length;
                        //     if (supplierNameDefined && rowInfo.supplierName.shouldCreateDoc) {
                        //         let isRequired = true;
                        //         let errorMessage = "Este campo es requerido debido a que se creará un nuevo Proveedor.";

                        //         return callback(null, isRequired, errorMessage);
                        //     }

                        //     return callback(null, false);
                        // },
                        ref: {
                            model: Supplier.modelName,
                            field: 'rfc',
                            strategy: REF_STRATEGIES.SUBSET
                        },
                        uniqueByOrganization: function (rowInfo, callback) {
                            //Only validate when creating a new Supplier
                            let shouldBeUnique = rowInfo.supplierRfc.value && rowInfo.supplierRfc.value.length && !!rowInfo.supplierName.shouldCreateDoc;
                            return callback(null, shouldBeUnique, 'Ya existe un Proveedor registrado con este RFC.', {
                                model: Supplier,
                                fieldName: 'rfc'
                            });
                        },
                    }, callback);
                    break;
                case C_IDS.ORGANIZER_ADMINISTRATIVE_UNIT:
                    return _this._readField(rowInfo, cell, 'organizerAdministrativeUnit', String, {
                        required: true,
                        match: {
                            regexStr: LETTERS_AND_SPACES_REGEX_STR,
                            flags: "gi"
                        },
                        ref: {
                            model: AdministrativeUnit.modelName,
                            field: 'name',
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
                    return _this._readField(rowInfo, cell, 'applicantAdministrativeUnit', String, {
                        required: true,
                        match: {
                            regexStr: LETTERS_AND_SPACES_REGEX_STR,
                            flags: "gi"
                        },
                        ref: {
                            model: AdministrativeUnit.modelName,
                            field: 'name',
                            strategy: REF_STRATEGIES.SUBSET
                        },
                    }, callback);
                    break;
                case C_IDS.ADMINISTRATIVE_UNIT_TYPE:
                    return _this._readField(rowInfo, cell, 'administrativeUnitType', String, {
                        enum: administrativeUnitTypeEnumDict,
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_NUMBER:
                    return _this._readField(rowInfo, cell, 'contractNumber', String, {
                        required: function (rowInfo, callback) {
                            // if(rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride){
                            //     return callback(null, false);
                            // }
                            if (
                                    rowInfo.procedureState && 
                                    rowInfo.procedureState.valueToSaveOverride && 
                                    rowInfo.procedureState.valueToSaveOverride === 'DESERTED') {
                                return callback(null, false);
                            }
                            return callback(null, true, "Este campo es requerido");
                        },
                        // unique: true
                        uniqueByOrganization: function (rowInfo, callback) {
                            return callback(null, true, 'Ya existe un Contrato registrado con este número.');
                        },
                    }, callback);
                    break;
                case C_IDS.CONTRACT_DATE:
                    return _this._readField(rowInfo, cell, 'contractDate', Date, {
                        required: false,
                        //TODO: Centralize this validation
                        // validator: function(rowInfo, callback){
                        //     let yearContractDate = new Date(rowInfo.contractDate.value).getFullYear();
                        //     let fiscalYear = Number(rowInfo.fiscalYear.value);
                        //     let isValid = yearContractDate === fiscalYear;
                        //
                        //     let errorMessage = null;
                        //     if (!isValid) {
                        //         //TODO: i18n
                        //         errorMessage = 'La fecha del contrato no coincide con el ejercicio fiscal.';
                        //     }
                        //
                        //     return callback(null, errorMessage);
                        // }
                    }, callback);
                    break;
                // case C_IDS.CONTRACT_TYPE:
                //     return _this._readField(obj, cell, 'contractType', String, {
                //         //TODO: Enum values for validation
                //         enum: [],
                //         required: true
                //     }, callback);
                //     break;
                case C_IDS.TOTAL_AMOUT:
                    return _this._readField(rowInfo, cell, 'totalAmount', Number, { 
                        required: function (rowInfo, callback) {
                            if (rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride) {
                                return callback(null, false);
                            }
                            let isRequired = 
                                    (rowInfo.contractType.valueToSaveOverride && rowInfo.contractType.valueToSaveOverride === 'NORMAL') &&
                                    !(rowInfo.procedureState && rowInfo.procedureState.valueToSaveOverride && rowInfo.procedureState.valueToSaveOverride === 'DESERTED');
                            let errorMessage = 'El campo Monto total es requerido al ser un contrato normal';

                            return callback(null, isRequired, errorMessage);
                        },
                    }, callback);
                    break;
                case C_IDS.MIN_AMOUNT:
                    return _this._readField(rowInfo, cell, 'minAmount', Number, {
                        required: function (rowInfo, callback) {
                            if (rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride) {
                                return callback(null, false);
                            }
                            let isRequired = 
                                    (rowInfo.contractType.valueToSaveOverride && rowInfo.contractType.valueToSaveOverride === 'OPEN') &&
                                    !(rowInfo.procedureState && rowInfo.procedureState.valueToSaveOverride && rowInfo.procedureState.valueToSaveOverride === 'DESERTED');
                            let errorMessage = 'El campo Monto mínimo es requerido al ser un contrato normal';

                            return callback(null, isRequired, errorMessage);
                        },
                    }, callback);
                    break;
                case C_IDS.MAX_AMOUNT:
                    return _this._readField(rowInfo, cell, 'maxAmount', Number, {
                        required: function (rowInfo, callback) {
                            if (rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride) {
                                return callback(null, false);
                            }
                            let isRequired = 
                                    (rowInfo.contractType.valueToSaveOverride && rowInfo.contractType.valueToSaveOverride === 'OPEN') && 
                                    !(rowInfo.procedureState && rowInfo.procedureState.valueToSaveOverride && rowInfo.procedureState.valueToSaveOverride === 'DESERTED');
                            let errorMessage = 'El campo Monto máximo es requerido al ser un contrato normal';

                            return callback(null, isRequired, errorMessage);
                        },
                    }, callback);
                    break;
                case C_IDS.MAX_OR_TOTAL_AMOUNT:
                    return _this._readField(rowInfo, cell, 'totalOrMaxAmount', Number, {
                        required: function (rowInfo, callback) {
                            if(rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride){
                                return callback(null, false);
                            }
                            if (
                                    rowInfo.procedureState && 
                                    rowInfo.procedureState.valueToSaveOverride && 
                                    rowInfo.procedureState.valueToSaveOverride === 'DESERTED') {
                                return callback(null, false);
                            }
                            return callback(null, true, "Este campo es requerido");
                        },
                        validator: function (rowInfo, callback) {
                            
                            if (rowInfo.totalOrMaxAmount.value) {
                                let isOpen = rowInfo.contractType.valueToSaveOverride && rowInfo.contractType.valueToSaveOverride === 'OPEN';
                                let isNormal = rowInfo.contractType.valueToSaveOverride && rowInfo.contractType.valueToSaveOverride === 'NORMAL';

                                let isValid = true;
                                let errorMessage = null;
                                if (isOpen) {
                                    isValid = rowInfo.totalOrMaxAmount.value === rowInfo.maxAmount.value;
                                    errorMessage = 'Este campo debe coincidir con el monto máximo debido al tipo de contrato.';
                                }
                                if (isNormal) {
                                    isValid = rowInfo.totalOrMaxAmount.value === rowInfo.totalAmount.value;
                                    errorMessage = 'Este campo debe coincidir con el monto total debido al tipo de contrato.';
                                }
                                
                                if (!isValid) {
                                    return callback(null, errorMessage)
                                }
                            }

                            return callback();
                        },
                    }, callback);
                    break;
                case C_IDS.CONTRACT_URL:
                    return _this._readField(rowInfo, cell, 'contractUrl', String, {
                        // required: true,
                        hyperlink: true,
                        match: {
                            regexStr: CONTRACT_VALIDATION_REGEX_DICT.URL,
                            flags: "gi"
                        }
                    }, callback);
                    break;
                case C_IDS.AREA_IN_CHARGE:
                    return _this._readField(rowInfo, cell, 'areaInCharge', String, {
                        required: true,
                        match: {
                            regexStr: LETTERS_AND_SPACES_REGEX_STR,
                            flags: "gi"
                        },
                        // ref: {
                        //     model: AdministrativeUnit.modelName,
                        //     field: 'name',
                        //     strategy: REF_STRATEGIES.SUBSET
                        // },
                    }, callback);
                    break;
                case C_IDS.UPDATE_DATE:
                    return _this._readField(rowInfo, cell, 'actualizationDate', Date, {
                        // required: true,
                    }, callback);
                    break;
                case C_IDS.NOTES:
                    return _this._readField(rowInfo, cell, 'notes', String, {}, callback);
                    break;
                case C_IDS.KAREWA_NOTES:
                    return _this._readField(rowInfo, cell, 'karewaNotes', String, {}, callback);
                    break;
                case C_IDS.INFORMATION_DATE:
                    return _this._readField(rowInfo, cell, 'informationDate', Date, {
                        // required: true,
                    }, callback);
                    break;
                case C_IDS.LIMIT_EXCEEDED:
                    return _this._readField(rowInfo, cell, 'limitExceeded', String, {
                        enum: limitExceededEnumDict,
                        required: function (rowInfo, callback) {
                            if(rowInfo.isEmpty && rowInfo.isEmpty.valueToSaveOverride){
                                return callback(null, false);
                            }
                            return callback(null, true, "Este campo es requerido");
                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.AMOUNT_EXCEEDED:
                    return _this._readField(rowInfo, cell, 'amountExceeded', Number, {}, callback);
                    break;
                case C_IDS.IS_EMPTY:
                    return _this._readField(rowInfo, cell, 'isEmpty', Boolean, {}, callback);
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
            rowInfo.summary = {
                hasErrors: false,
                hasInfos: false,
                skipRow: false,
                willCreateDoc: false,
            };
            
            let fieldNames = Object.keys(rowInfo);
            
            //Move to an array for easier parallel processing
            let fieldInfoArray = [];
            
            for (let fieldName of fieldNames) {
                let fieldInfo = rowInfo[fieldName];
                fieldInfoArray.push(fieldInfo);
            }
            
            //Autoset fields
            this._checkAutosetFieldsForRowInfo(rowInfo);

            //Check additional validations: 
            //validator fn, hasErrors, hasInfos, and skipRow
            async.each(fieldInfoArray, (fieldInfo, callback) => {
                if (fieldInfo) {
                    
                    // return callback();
                    
                    
                    // this._checkValidationsForFieldInfo(rowInfo, fieldInfo, callback);
                    // this._checkRequiredForFieldInfo(rowInfo, fieldInfo, callback);
                    
                    //Apply multiple fns with the same params, then call callback when all fns are done
                    async.applyEach([
                        this._checkValidationsForFieldInfo, 
                        this._checkRequiredForFieldInfo,
                        this._checkUniqueByOrganizationForFieldInfo,
                    ], rowInfo, fieldInfo, VALIDATION_STRATEGIES.CHECK, REQUIRED_STRATEGIES.CHECK, this.organizationId, () => {

                        if (fieldInfo.errors && fieldInfo.errors.length) {
                            rowInfo.summary.hasErrors = true;
                        }

                        if (fieldInfo.infos && fieldInfo.infos.length) {
                            rowInfo.summary.hasInfos = true;
                        }

                        if (fieldInfo.skipRow) {
                            rowInfo.summary.skipRow = true;
                        }

                        if (fieldInfo.shouldCreateDoc) {
                            rowInfo.summary.willCreateDoc = true;
                        }
                        
                        return callback();
                    });
                    
                } else {
                    logger.error(null, null, 'dataLoader#_readContractRow', '[null] or [undefined] fieldInfo found');
                    return callback(null, fieldInfo);
                }
            }, (err, results) => {
                if (err) {
                    logger.debug(err, null, 'dataLoader#_readContractRow', 'Error trying to process fieldInfo validations and summary');
                }
                //All additional validations done

                let finishDate = new Date();
                logger.debug(null, null, '', `Row #${rowIndex} done in [${finishDate.getTime() - startDate.getTime()}] millis`);
                
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
                    });
                    
                    let rowIndex = 1;
                    
                    async.mapSeries(rowsInfo, (rowInfo, callback) => {
                        let row = rowInfo.row;
                        let rowNumber = rowInfo.rowNumber;
                        if (rowNumber === IDENTIFIERS_ROW_INDEX) {
                            _this._readIdentifiersRow(sheet, row, callback);
                        } else if (rowNumber === HUMAN_IDENTIFIERS_ROW_INDEX) {
                            _this._readHumanIdentifiersRow(sheet, row, callback);
                        } else {
                            _this._readContractRow(sheet, row, rowIndex, callback);
                        }
                        rowIndex++;
                    }, (err, objs) => {
                        //Delete first two rows
                        objs.splice(0, 2);

                        let newDataLoad = new DataLoad({
                            // details: dataLoadDetailsIds
                            // details: savedDetails
                        });
                        
                        let dataLoadDetailsArray = objs.map((obj, index) => {
                            return {
                                dataLoad: _this.idDataLoad || newDataLoad._id,
                                data: obj,
                                rowIndex:index + 3
                            };
                        });
                        
                        let currentDataLoadId = newDataLoad._id;
                        if (_this.idDataLoad) {
                            currentDataLoadId = _this.idDataLoad;
                        }
                        
                        /*
                        if (_this.idDataLoad) {
                            DataLoad
                                .findOne({
                                    _id: _this.idDataLoad
                                })
                                .exec((err, dataLoad) => {
                                    if (err) {
                                        logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to query existing DataLoad');
                                    }
                                    DataLoadDetail
                                        .remove({id: {$in: dataLoad.details}})
                                        .exec((err) => {
                                            if (err) {
                                                logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to delete obsolete DataLoadDetail from db, unused details may me kept in the database.');
                                            }
                                            
                                            dataLoad.details = [];
                                            return resolve(dataLoad);
                                        });
                                });
                        }
                        
                        let dataLoad = new DataLoad({
                            data: objs
                         */


                        //currentDataLoadId

                        DataLoadDetail.find({
                            dataLoad: currentDataLoadId
                        }).exec((err, currentDetails) => {
                            if (err) {
                                logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to query existing DataLoadDetail(s)');
                            }
                            currentDetails = currentDetails || [];
                            
                            
                            DataLoadDetail.insertMany(dataLoadDetailsArray, (err, savedDetails) => {
                                
                                if (err) {
                                    logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to save DataLoadDetails in bulk');
                                }
                                
                                // dataLoadDetails
                                // let dataLoadDetailsIds = [];
                                // if (savedDetails && savedDetails.length) {
                                //     dataLoadDetailsIds = savedDetails.map((dataLoadDetail) => {
                                //         return dataLoadDetail._id;
                                //     });
                                // }
    
    
                                if (_this.idDataLoad) {
                                    DataLoad
                                        .findOne({
                                            _id: _this.idDataLoad
                                        })
                                        .exec((err, dataLoad) => {
                                            if (err) {
                                                logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to query existing DataLoad to update its details');
                                            }
                                            if (!dataLoad) {
                                                logger.error(err, null, 'dataLoader#readBuffer', 'idDataLoad was defined but no DataLoad was found!');
                                                let dataLoad = new DataLoad({
                                                    // details: dataLoadDetailsIds
                                                    // details: savedDetails
                                                });
                                                return resolve(dataLoad);
                                            }
                                            
                                            let dataLoadDetailsIds = currentDetails.map((detail) => {
                                                return mongoose.Types.ObjectId(detail._id);
                                            });
    
                                            DataLoadDetail
                                                .deleteMany({_id: {$in: dataLoadDetailsIds}})
                                                .exec((err, results) => {
                                                    if (err) {
                                                        logger.error(err, null, 'dataLoader#readBuffer', 'Error trying to delete obsolete DataLoadDetail from db, unused details may me kept in the database.');
                                                    }
    
                                                    logger.debug(null, null, '', 'results (from deletion): %j', results);
    
                                                    //Overwrite with new details
                                                    // dataLoad.details = savedDetails;
                                                    return resolve({dataLoad: dataLoad, details: savedDetails});
                                                });
                                            
                                        });
                                } else {
                                    // newDataLoad.details = savedDetails;
    
                                    return resolve({dataLoad: newDataLoad, details: savedDetails});
                                }
                            });
                            
                            
                        });
                        
                        
                        
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


class ContractExcelWriter {
    constructor(dataLoad) {
        this.dataLoad = dataLoad;
    }
    
    
    addRow(sheet, rowIndex, rowInfo) {
        sheet.getRow(rowIndex).height = 50.0;
        this.addCell(sheet, rowIndex, 1, rowInfo.procedureType, 'enum', {enumObjectFn: getProcedureTypesEnumObject});
        this.addCell(sheet, rowIndex, 2, rowInfo.category, 'enum', {enumObjectFn: getCategoryEnumObject});
        this.addCell(sheet, rowIndex, 3, rowInfo.administration, 'string');
        this.addCell(sheet, rowIndex, 4, rowInfo.fiscalYear, 'string');
        this.addCell(sheet, rowIndex, 5, rowInfo.period, 'string');
        this.addCell(sheet, rowIndex, 6, rowInfo.contractId, 'string');
        this.addCell(sheet, rowIndex, 7, rowInfo.partida, 'string');
        this.addCell(sheet, rowIndex, 8, rowInfo.procedureState, 'enum', {enumObjectFn: getProcedureStateEnumObject});
        this.addCell(sheet, rowIndex, 9, rowInfo.announcementUrl, 'url');
        this.addCell(sheet, rowIndex, 10, rowInfo.announcementDate, 'date');
        this.addCell(sheet, rowIndex, 11, rowInfo.servicesDescription, 'string');
        this.addCell(sheet, rowIndex, 12, rowInfo.clarificationMeetingDate, 'date');
        this.addCell(sheet, rowIndex, 13, rowInfo.clarificationMeetingJudgmentUrl, 'url');
        this.addCell(sheet, rowIndex, 14, rowInfo.presentationProposalsDocUrl, 'url');
        this.addCell(sheet, rowIndex, 15, rowInfo.supplierName, 'string');
        this.addCell(sheet, rowIndex, 16, rowInfo.supplierRfc, 'string');
        this.addCell(sheet, rowIndex, 17, rowInfo.organizerAdministrativeUnit, 'string');
        this.addCell(sheet, rowIndex, 18, rowInfo.applicantAdministrativeUnit, 'string');
        this.addCell(sheet, rowIndex, 19, rowInfo.administrativeUnitType, 'enum', {enumObjectFn: getAdministrativeUnitTypeEnumObject});
        this.addCell(sheet, rowIndex, 20, rowInfo.contractNumber, 'string');
        this.addCell(sheet, rowIndex, 21, rowInfo.contractDate, 'date');
        this.addCell(sheet, rowIndex, 22, rowInfo.totalAmount, 'currency');
        this.addCell(sheet, rowIndex, 23, rowInfo.minAmount, 'currency');
        this.addCell(sheet, rowIndex, 24, rowInfo.maxAmount, 'currency');
        this.addCell(sheet, rowIndex, 25, rowInfo.totalOrMaxAmount, 'currency');
        this.addCell(sheet, rowIndex, 26, rowInfo.contractUrl, 'url');
        this.addCell(sheet, rowIndex, 27, rowInfo.areaInCharge, 'string');
        this.addCell(sheet, rowIndex, 28, rowInfo.actualizationDate, 'date');
        this.addCell(sheet, rowIndex, 29, rowInfo.notes, 'string');
        this.addCell(sheet, rowIndex, 30, rowInfo.karewaNotes, 'string');
        this.addCell(sheet, rowIndex, 31, rowInfo.informationDate, 'date');
        this.addCell(sheet, rowIndex, 32, rowInfo.limitExceeded, 'string');
        this.addCell(sheet, rowIndex, 33, rowInfo.amountExceeded, 'currency');
        this.addCell(sheet, rowIndex, 34, rowInfo.isEmpty, 'boolean');
    }
    
    addCell(sheet, rowIndex, cellIndex, fieldInfo, format, options = {}) {

        if(!fieldInfo){
            return;
        }
        //procedureType
        let wrapText = false;

        let hasErrors = fieldInfo.errors && fieldInfo.errors.length;
        let hasInfos = fieldInfo.infos && fieldInfo.infos.length;
        
        switch(format) {
            case 'string':
                sheet.getRow(rowIndex).getCell(cellIndex).value = (fieldInfo.overrides && fieldInfo.overrides.prefix ? fieldInfo.overrides.prefix : '') + fieldInfo.value;
                wrapText = true;
                break;
            case 'boolean':
                sheet.getRow(rowIndex).getCell(cellIndex).value = (fieldInfo.overrides && fieldInfo.overrides.prefix ? fieldInfo.overrides.prefix : '') + fieldInfo.value;
                wrapText = true;
                break;
            case 'date':
                //If the value is a date, it's automatically detected as a date cell
                sheet.getRow(rowIndex).getCell(cellIndex).value = fieldInfo.value;
                break;
            case 'enum':
                if (fieldInfo.valueToSaveOverride && options.enumObjectFn) {
                    let enumInfoObj = options.enumObjectFn(fieldInfo.valueToSaveOverride);

                    if (enumInfoObj) {
                        //Valid enum value
                        sheet.getRow(rowIndex).getCell(cellIndex).value = (fieldInfo.overrides && fieldInfo.overrides.prefix ? fieldInfo.overrides.prefix : '') + enumInfoObj.description;
                    }
                    
                } else {
                    //Bad enum value, but show anyway
                    sheet.getRow(rowIndex).getCell(cellIndex).value = (fieldInfo.overrides && fieldInfo.overrides.prefix ? fieldInfo.overrides.prefix : '') + fieldInfo.value;
                }

                wrapText = true;
                break;
            case 'currency':
                sheet.getRow(rowIndex).getCell(cellIndex).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
                sheet.getRow(rowIndex).getCell(cellIndex).value = fieldInfo.value;
                break;
            case 'url':
                //Only insert hyperlink if a value is present
                if (fieldInfo.value && fieldInfo.value.length && !hasErrors) {
                    sheet.getRow(rowIndex).getCell(cellIndex).value = {
                        text: fieldInfo.value,
                        hyperlink: fieldInfo.value,
                        tooltip: fieldInfo.value
                    };
                } else {
                    sheet.getRow(rowIndex).getCell(cellIndex).value = fieldInfo.value;
                }
                break;
        }
        
        if (wrapText) {
            sheet.getRow(rowIndex).getCell(cellIndex).alignment = { wrapText: true };
        }
        
        if (hasErrors && hasInfos) {
            //If the field has infos and errors, show the text in blue with a red background
            
            sheet.getRow(rowIndex).getCell(cellIndex).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:ARGB_ERRORS},
            };

            sheet.getRow(rowIndex).getCell(cellIndex).font = {
                //Here we use the full color without alpha to ensure visibility (because the background is red)
                color: { argb: ARGB_INFOS_FULL_OPACITY },
            };
            
            
        } else if (hasInfos) {
            sheet.getRow(rowIndex).getCell(cellIndex).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:ARGB_INFOS},
            };
        } else if (hasErrors) {
            sheet.getRow(rowIndex).getCell(cellIndex).fill = {
                type: 'pattern',
                pattern:'solid',
                fgColor:{argb:ARGB_ERRORS},
            };
        }
    }
    
    
    sendFileAsDownload(req, res) {
        let workbook = new Excel.Workbook();
        let sheet = workbook.addWorksheet("Contratos");
        
        let cIdKeys = Object.keys(C_IDS);
        let cIdIndex = 1;


        //Ignore last key; "UNKOWNK_COLUMN"
        // cIdKeys = cIdKeys.splice(cIdKeys.length - 1, 1);
        cIdKeys.pop();
        
        for (let key of cIdKeys) {
            sheet.getColumn(cIdIndex).width = 10.00;
            
            //C1, C2, etc, used to map each column to a field in the database
            // sheet.getRow(1).height = 50.0;
            sheet.getRow(1).getCell(cIdIndex).value = C_IDS[key];
            sheet.getRow(1).getCell(cIdIndex).alignment = { wrapText: true };



            //Actual human-readable headers
            sheet.getRow(2).height = 50.0;
            sheet.getRow(2).getCell(cIdIndex).value = C_IDS_DESCRIPTIONS[C_IDS[key]];
            sheet.getRow(2).getCell(cIdIndex).alignment = { wrapText: true };
            sheet.getRow(2).getCell(cIdIndex).fill = {
                //C0C0C0
                type: 'gradient',
                gradient: 'angle',
                degree: 0,
                stops: [
                    {position:0, color:{argb:'FFC0C0C0'}},
                    {position:1, color:{argb:'FFC0C0C0'}}
                ]
            };
            cIdIndex++;
        }

        
        // worksheet.addRow({id: 2, name: 'Jane Doe', dob: new Date(1965,1,7)});
        
        let rowIndex = 3;
        
        for (let dataLoadDetail of this.dataLoad.details) {
            
            let rowInfo = dataLoadDetail.data;

            this.addRow(sheet, rowIndex, rowInfo);
            rowIndex++;
        }
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Corrección a contratos.xlsx");
        // workbook.xlsx.write(res);

        workbook.xlsx.write(res)
            .then(function(){
                res.end();
            });
        // res.end();
    }
}

module.exports = {
    ContractExcelReader,
    ContractExcelWriter
};

logger = require('./logger').instance;