const Excel = require('exceljs');
const async = require('async');

const logger = require('./logger').instance;
const utils = require('./utils');

const Contract = require('./../models/contract.model').Contract;
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

        for (let i = 1; i < columnCount; i++) {
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
                //This will generate a regex ".*(ONE|TWO|THREE) (ONE|TWO|THREE) (ONE|TWO|THREE).*"
                keywords.forEach((keyword) => {
                    //Note: The space at the end is intended
                    regexStr += `(${keywords.join('|')}) `;
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

        return model.findOne(query)
            .select(select);
    }

    _readField(obj, value, fieldName, type, options = {}, mainCallback) {
        let _this = this;

        async.waterfall([
            //Initialize the fieldInfo
            (callback) => {
                let fieldInfo = {
                    value: null,
                    valueToSaveOverride: null,
                    errors: [],
                    infos: [],

                    col: null,
                    duplicate: false,
                    skipRow: false
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

                            //Force uppercase
                            if (options.uppercase) {
                                fieldInfo.value = fieldInfo.value.toUpperCase();
                            }

                            //Validate vs enum
                            if (options.enum && options.enum.length) {
                                if (!options.enum.includes(fieldInfo.value)) {
                                    //Invalid value for enum!
                                    // fieldInfo.value = '';
                                    fieldInfo.errors.push({
                                        //TODO: i18n
                                        message: 'El valor indicado no está permitido para este campo.'
                                    });
                                }
                            }

                            if (options.match) {
                                if (!options.match.test(fieldInfo.value)) {
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
                            console.log('value', value);
                            fieldInfo.value = utils.parseDate(value);
                            break;
                        case Number:
                            value = value || '';

                            console.log(fieldName + ' => ', value);

                            if (utils.isNumber(value)) {
                                fieldInfo.value = value;
                            } else {
                                value = value.replace("$", "").replace(",", "").replace(" ", "");
                                fieldInfo.value = utils.parseNumber(value);
                            }
                            break;
                    }
                } catch (err) {
                    console.log('err', err);
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
                if (utils.isDefined(options.ref) && utils.isDefined(options.ref.model)) {

                    let model = options.ref.model;

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

                    query.exec((err, doc) => {
                        if (err) {
                            logger.error(err, null, 'dataLoader#_readField', 'Error trying to query model [%s] with query: %j', fieldInfo.col, query);
                        }

                        // console.log('query', query);
                        console.log('doc', doc);
                        
                        //Match found
                        if (doc) {
                            //Set doc._id as valueToSaveOverride
                            fieldInfo.valueToSaveOverride = doc._id;
                            fieldInfo.duplicate = true;
                            //Check if doc.[field] matches fieldInfo.value will be (hopefully) done after this process
                        }

                        return callback(null, fieldInfo);
                    });

                } else {
                    return callback(null, fieldInfo);
                }
            },
            //Call a validation function if needed
            (fieldInfo, callback) => {
                if (utils.isDefined(options.validator) && utils.isFunction(options.validator)) {
                    logger.info(null, null, 'dataLoader#_readField', 'TODO: options.validator')
                } else {
                    return callback(null, fieldInfo);
                }
            },
            //Check if the field value is required
            (fieldInfo, callback) => {
                if (utils.isDefined(options.required) && utils.isNotDefined(fieldInfo.value)) {
                    if (utils.isFunction(options.required)) {
                        logger.info(null, null, 'dataLoader#_readField', 'TODO: options.required as a Function');
                    } else if (utils.isBoolean(options.required) && options.required) {
                        fieldInfo.errors.push({
                            message: 'Este campo es requerido.'
                        });
                    } else if (options.required) {
                        fieldInfo.errors.push({
                            message: 'Este campo es requerido.'
                        });
                    }
                    //TODO: check required
                    return callback(null, fieldInfo);
                } else {
                    return callback(null, fieldInfo);
                }
            },
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
            console.log('cascade end');
            if (err) {
                console.log('err', err);
            }
            obj[fieldName] = fieldInfo;

            // console.log('obj', obj);

            return mainCallback(null, obj);
        });
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
        let obj = {};

        async.map(cellsInfoArr, (cellInfo, callback) => {
            let cell = cellInfo.cell;
            let colNumber = cellInfo.colNumber;

            //Arrays are base 0; columns in file are base 1
            let columnsArrayIndex = colNumber - 1;

            let column = this.columns[columnsArrayIndex];


            console.log('column', column);
            switch(column) {
                case C_IDS.PROCEDURE_TYPE:
                    _this._readField(obj, cell.value, 'procedureType', String, {
                        //TODO: Enum values for validation
                        enum: [],
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.CATEGORY:
                    _this._readField(obj, cell.value, 'category', String, {
                        //TODO: Enum values for validation
                        enum: [],
                        required: function () {
                            //TODO: Centralize this validation
                            // let descriptionRegExp = utils.toAccentsRegex(this.servicesDescription.toUpperCase(),'i');
                            // return descriptionRegExp.test(this.category);
                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.ADMINISTRATION:
                    _this._readField(obj, cell.value, 'administration', String, {
                        required: true,
                        //TODO: Centralize this Regex
                        match: new RegExp("^[12][0-9]{3}-[12][0-9]{3}$")
                    }, callback);
                    break;
                case C_IDS.FISCAL_YEAR:
                    _this._readField(obj, cell.value, 'fiscalYear', String, {
                        required: true,
                        //TODO: Centralize this Regex
                        match: new RegExp("^[12][0-9]{3}")
                    }, callback);
                    break;
                case C_IDS.PERIOD:
                    _this._readField(obj, cell.value, 'fiscalYear', String, {
                        required: true,
                        //TODO: Centralize this Regex
                        match: new RegExp("^[1234]o\\s2[0-9]{3}$")
                    }, callback);
                    break;
                case C_IDS.CONTRACT_ID:
                    _this._readField(obj, cell.value, 'contractId', String, {
                        required: true
                        //TODO: Validations
                    }, callback);
                    break;
                case C_IDS.PARTIDA:
                    _this._readField(obj, cell.value, 'partida', String, {}, callback);
                    break;
                case C_IDS.PROCEDURE_STATE:
                    _this._readField(obj, cell.value, 'procedureState', String, {
                        //TODO: Enum values for validation
                        enum: [],
                        required: function () {
                            //TODO: Centralize this validation
                            // let descriptionRegExp = utils.toAccentsRegex(this.notes.toUpperCase(),'i');
                            // return descriptionRegExp.test(this.procedureType);
                        },
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.ACCOUNCEMENT_URL:
                    _this._readField(obj, cell.value, 'announcementUrl', String, {
                        hyperlink: true
                    }, callback);
                    break;
                case C_IDS.ACCOUNCEMENT_DATE:
                    _this._readField(obj, cell.value, 'announcementDate', Date, {}, callback);
                    break;
                case C_IDS.SERVICES_DESCRIPTION:
                    _this._readField(obj, cell.value, 'servicesDescription', String, {
                        required: true
                    }, callback);
                    break;
                case C_IDS.CLARIFICATION_MEETING_DATE:
                    _this._readField(obj, cell.value, 'clarificationMeetingDate', Date, {}, callback);
                    break;
                case C_IDS.CLARIFICATION_MEETING_JUDGEMENT_URL:
                    _this._readField(obj, cell.value, 'clarificationMeetingJudgmentUrl', String, {
                        hyperlink: true
                    }, callback);
                    break;
                case C_IDS.PRESENTATION_PROPOSALS_DOC_URL:
                    _this._readField(obj, cell.value, 'presentationProposalsDocUrl', String, {
                        hyperlink: true
                    }, callback);
                    break;
                case C_IDS.SUPPLIER_NAME:
                    _this._readField(obj, cell.value, 'supplierName', String, {
                        required: true,
                        ref: {
                            model: Supplier,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.EXACT
                        }
                    }, callback);
                    break;
                case C_IDS.SUPPLIER_RFC:
                    _this._readField(obj, cell.value, 'supplierRfc', String, {
                        // required: true,
                        //TODO: Centralize this Regex
                        match: new RegExp("^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$"),
                        
                        // ref: {
                        //     model: Supplier,
                        //     field: 'rfc',
                        //     //TODO: Change to FUZZY
                        //     strategy: REF_STRATEGIES.EXACT
                        // }
                    }, callback);
                    break;
                case C_IDS.ORGANIZER_ADMINISTRATIVE_UNIT:
                    _this._readField(obj, cell.value, 'organizerAdministrativeUnit', String, {
                        required: true,
                        ref: {
                            model: AdministrativeUnit,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.EXACT
                        },
                        //TODO: Centralize this validation
                        validator: function(){
                            return this.administrativeUnitType === 'DESCENTRALIZADA' ? this.organizerAdministrativeUnit == this.applicantAdministrativeUnit : true
                        }
                    }, callback);
                    break;
                case C_IDS.APPLICANT_ADMINISTRATIVE_UNIT:
                    _this._readField(obj, cell.value, 'applicantAdministrativeUnit', String, {
                        required: true,
                        ref: {
                            col: AdministrativeUnit,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.EXACT
                        },
                    }, callback);
                    break;
                case C_IDS.ADMINISTRATIVE_UNIT_TYPE:
                    _this._readField(obj, cell.value, 'administrativeUnitType', String, {
                        //TODO: Enum values for validation
                        enum: [],
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_NUMBER:
                    _this._readField(obj, cell.value, 'contractNumber', String, {
                        //TODO: Enum values for validation
                        enum: [],
                        //TODO: required?
                        // required: true,
                        unique: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_DATE:
                    _this._readField(obj, cell.value, 'contractDate', Date, {
                        required: true,
                        //TODO: Centralize this validation
                        validator: () => {
                            let yearContractDate = new Date(this.contractDate).getFullYear();
                            let fiscalYear = Number(this.fiscalYear);
                            return yearContractDate === fiscalYear;
                        }
                    }, callback);
                    break;
                // case C_IDS.CONTRACT_TYPE:
                //     _this._readField(obj, cell.value, 'contractType', String, {
                //         //TODO: Enum values for validation
                //         enum: [],
                //         required: true
                //     }, callback);
                //     break;
                case C_IDS.TOTAL_AMOUT:
                    _this._readField(obj, cell.value, 'totalAmount', Number, {}, callback);
                    break;
                case C_IDS.MIN_AMOUNT:
                    _this._readField(obj, cell.value, 'minAmount', Number, {}, callback);
                    break;
                case C_IDS.MAX_AMOUNT:
                    _this._readField(obj, cell.value, 'maxAmount', Number, {}, callback);
                    break;
                case C_IDS.MAX_OR_TOTAL_AMOUNT:
                    _this._readField(obj, cell.value, 'totalOrMaxAmount', Number, {
                        required: true
                    }, callback);
                    break;
                case C_IDS.CONTRACT_URL:
                    _this._readField(obj, cell.value, 'contractUrl', String, {
                        required: true,
                        hyperlink: true
                        //TODO: match uri?
                        // match: ''
                    }, callback);
                    break;
                case C_IDS.AREA_IN_CHARGE:
                    _this._readField(obj, cell.value, 'areaInCharge', String, {
                        required: true,
                        ref: {
                            col: AdministrativeUnit,
                            field: 'name',
                            //TODO: Change to FUZZY
                            strategy: REF_STRATEGIES.EXACT
                        },
                    }, callback);
                    break;
                case C_IDS.UPDATE_DATE:
                    _this._readField(obj, cell.value, 'actualizationDate', Date, {
                        required: true,
                    }, callback);
                    break;
                case C_IDS.NOTES:
                    _this._readField(obj, cell.value, 'notes', String, {}, callback);
                    break;
                case C_IDS.KAREWA_NOTES:
                    _this._readField(obj, cell.value, 'karewaNotes', String, {}, callback);
                    break;
                case C_IDS.INFORMATION_DATE:
                    _this._readField(obj, cell.value, 'informationDate', Date, {
                        required: true,
                    }, callback);
                    break;
                case C_IDS.LIMIT_EXCEEDED:
                    _this._readField(obj, cell.value, 'limitExceeded', String, {
                        //TODO: Enum values for validation
                        enum: [],
                        required: true,
                        uppercase: true
                    }, callback);
                    break;
                case C_IDS.AMOUNT_EXCEEDED:
                    _this._readField(obj, cell.value, 'amountExceeded', Number, {}, callback);
                    break;
                case C_IDS.UNKOWN_COLUMN:
                default:
                    return callback();
                    // return callback
                //Unrecognized column identifier value
            }

        }, (err, results) => {
            //All done
            console.log('all rows read');
            rowInfo.fields = [];
            results.forEach((fieldInfo) => {
                
                if (fieldInfo) {
                    rowInfo.fields.push(fieldInfo);
    
                    if (fieldInfo.errors.length) {
                        rowInfo.hasErrors = true;
                    }
    
                    if (fieldInfo.infos.length) {
                        rowInfo.hasInfo = true;
                    }
    
                    if (fieldInfo.skipRow) {
                        rowInfo.skipRow = true;
                    }
                }
            });
            // logger.info(null, null, '', 'rowInfo: %j', rowInfo);

            // return obj;
            return readRowCallback(null, obj);
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
                        console.log('objs.length', objs.length);
                        objs.splice(0, 2);
                        console.log('objs.length', objs.length);


                        let dataLoad = new DataLoad({
                            data: objs
                        });

                        console.log('dataLoad', dataLoad);

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