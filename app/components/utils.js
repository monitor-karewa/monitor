/*==================================================
------------        UTILS FILE           -----------
Place all your universal useful code here to help others (;
==================================================*/



const _A_ACCENT = "[AÀÁÂÃÄÅÆaàáâãäå]";
const _E_ACCENT = "[EÈÉÊËẼeèéêëẽ]";
const _I_ACCENT = "[IÌÍÎÏĨiìíîïĩ]";
const _O_ACCENT = "[OÒÓÔÕÖØðoòóôõöø]";
const _U_ACCENT = "[UÙÚÛÜuùúûü]";
const _S_ACCENT = "[SŠšßs]";
const _Z_ACCENT = "[ZzŽž]";
const _D_ACCENT = "[DdÐ]";
const _C_ACCENT = "[cCÇç]";



const utils =  {


    /**
     * Transforma un string en una expresión regular que hace match para cualquier acento.
     *
     * @param str {string} a transformar
     * @param flags {String|null} flags opcionales a agregar al regex generado
     * @param returnAsStr {boolean} si es truthy, se devolverá el regex generado como string
     * @returns {*} RegExp creada
     */
    toAccentsRegex : function (str, flags, returnAsStr) {
        if (utils.isNotDefined(str)) {
            str = '';
        }
        let regexStr = str;
        regexStr = regexStr.replace(new RegExp(_A_ACCENT, 'g'), _A_ACCENT);
        regexStr = regexStr.replace(new RegExp(_E_ACCENT, 'g'), _E_ACCENT);
        regexStr = regexStr.replace(new RegExp(_I_ACCENT, 'g'), _I_ACCENT);
        regexStr = regexStr.replace(new RegExp(_O_ACCENT, 'g'), _O_ACCENT);
        regexStr = regexStr.replace(new RegExp(_U_ACCENT, 'g'), _U_ACCENT);
        regexStr = regexStr.replace(new RegExp(_S_ACCENT, 'g'), _S_ACCENT);
        regexStr = regexStr.replace(new RegExp(_Z_ACCENT, 'g'), _Z_ACCENT);
        regexStr = regexStr.replace(new RegExp(_D_ACCENT, 'g'), _D_ACCENT);
        regexStr = regexStr.replace(new RegExp(_C_ACCENT, 'g'), _C_ACCENT);
        
        if (returnAsStr) {
            return regexStr;
        }
        
        return new RegExp(regexStr, flags);
    },



    /**
     * Revisa si un objeto está definido (que no sea undefined ni null).
     * @param obj {object} objeto a revisar
     * @returns {boolean} indicando si el objeto se encuentra definido
     */
    isDefined(obj) {
        return obj !== undefined && obj !== null;
    },


    /**
     * Revisa si un objeto no está definido (que sea undefined o null).
     * @param obj {object} objeto a revisar
     * @returns {boolean} indicando si el objeto se encuentra indefinido
     */
    isNotDefined(obj) {
        return !utils.isDefined(obj);
    },

    /**
     * Indica si el objeto recibido corresponde a una function de Javascript.
     * @param {*} fn objeto a revisar
     * @returns {boolean} true si corresponde a una función o false en caso contrario
     */
    isFunction(fn) {
        return utils.isDefined(fn) && {}.toString.call(fn) === '[object Function]'
    },

    /**
     * Revisa si un objeto corresponde a un Boolean.
     * @param obj {object} objeto a revisar
     * @returns {boolean} indicando si corresponde o no a un Boolean
     */
    isBoolean(obj) {
        return obj !== undefined && obj !== null && typeof(obj) === 'boolean';
    },

    /**
     * Revisa si un objeto corresponde a una Date.
     * @param obj {object} objeto a revisar
     * @returns {boolean} indicando si corresponde o no a una Date
     */
    isDate(obj) {
        return obj !== undefined && obj !== null && Object.prototype.toString.call(obj) === '[object Date]';
    },

    /**
     * Revisa si un objeto corresponde a un Number.
     * @param obj {object} objeto a revisar
     * @returns {boolean} indicando si corresponde o no a un Number
     */
    isNumber(obj) {
        return obj !== undefined && obj !== null && typeof(obj) === 'number';
    },

    /**
     * Intenta realizar un parsing de un string como fecha. Si no se reconoce la estructura de la fecha, se devolverá
     * null. Esta función intenta parsear las siguientes estructuras de fecha:
     * DD/MM/YY
     * DD/MM/YYYY
     * DD-MM-YY
     * DD-MM-YYYY
     * @param {string} str string a intentar parsear
     * @param {boolean} enFormat si es truthy, se intentará parsear esperando valores con formato MM/DD en vez de DD/MM
     * @returns {Date|null} fecha parseada o null si no se reconoce el formato
     */
    parseDate(str, enFormat) {
        let momentDate = null;
        if (utils.isDate(str)) {
            //No need to parse
            return str;
        }
        if (utils.isDefined(str)) {
            
            if (enFormat) {
                if (str.match(/^[01]?[0-9]\/[0123]?[0-9]\/[0-9]{2}$/)) {
                    //Try MM/DD/YY
                    momentDate = moment(str, "MM/DD/YY");
                } else if (str.match(/^[01]?[0-9]\/[0123]?[0-9]\/[0-9]{4}$/)) {
                    //Try MM/DD/YYYY
                    momentDate = moment(str, "MM/DD/YYYY");
                } else if (str.match(/^[01]?[0-9]-[0123]?[0-9]-[0-9]{2}$/)) {
                    //Try MM-DD-YY
                    momentDate = moment(str, "MM-DD-YY");
                } else if (str.match(/^[01]?[0-9]-[0123]?[0-9]-[0-9]{4}$/)) {
                    //Try MM-DD-YYYY
                    momentDate = moment(str, "MM-DD-YYYY");
                }
            } else {
                if (str.match(/^[0123]?[0-9]\/[01]?[0-9]\/[0-9]{2}$/)) {
                    //Try DD/MM/YY
                    momentDate = moment(str, "DD/MM/YY");
                } else if (str.match(/^[0123]?[0-9]\/[01]?[0-9]\/[0-9]{4}$/)) {
                    //Try DD/MM/YYYY
                    momentDate = moment(str, "DD/MM/YYYY");
                } else if (str.match(/^[0123]?[0-9]-[01]?[0-9]-[0-9]{2}$/)) {
                    //Try DD-MM-YY
                    momentDate = moment(str, "DD-MM-YY");
                } else if (str.match(/^[0123]?[0-9]-[01]?[0-9]-[0-9]{4}$/)) {
                    //Try DD-MM-YYYY
                    momentDate = moment(str, "DD-MM-YYYY");
                }
            }
            
        }
        if (utils.isDefined(momentDate) && momentDate.isValid()) {
            return momentDate.toDate();
        } else {
            return null;
        }
    },


    /**
     * Revisa si un objeto corresponde a un Number.
     * @param obj {object} objeto a revisar
     * @param defaultValue {object} valor por defecto en caso de que el valor a parsear no sea un número válido
     * @returns number - el objeto como número o en caso de error, un valor de 0
     */
    parseNumber(obj, defaultValue = 0) {
        let parsedNumber = null;
        if (obj !== undefined && obj !== null) {
            if (typeof(obj) === 'number') {
                parsedNumber = obj;
                // return obj;
            } else if (typeof(obj) === 'string') {
                try {
                    parsedNumber = Number(obj);
                    // return Number(obj);
                } catch (err) {
                    logger.error(null, null, "Attempting to parse a number \n" + err.toString());
                }
            }
        }
        if (!parsedNumber) {
            parsedNumber = defaultValue;
        }
        return parsedNumber;
    },

    /**
     * Search by enum requires transforming the user input to a matching enum value
     * To do this, we use a dict:
     * key -> actual enum value
     * value -> matching regexes (array) for user input
     * 
     * @param search string to search
     * @param valuesEnum array with allowed values
     * @param valuesEnumDict object that maps each allowed value to an array of regex info objects of possibilities
     * @returns {*}
     */
    enumSearchRegexString(search, valuesEnum, valuesEnumDict) {
        let enumQueryNomineesArray = [];

        for (let enumValue of valuesEnum) {
            let userInputRegexObjArray = valuesEnumDict[enumValue];

            for (let userInputRegexObj of userInputRegexObjArray) {

                let userInputRegex = new RegExp(userInputRegexObj.regexStr, userInputRegexObj.flags);

                if (userInputRegex.test(search) && !enumQueryNomineesArray.includes(enumValue)) {
                    enumQueryNomineesArray.push(enumValue);
                }
            }
        }

        let enumQueryAsRegex = null;

        if (enumQueryNomineesArray.length) {
            //Join matching enum values with an "OR"
            enumQueryAsRegex = enumQueryNomineesArray.join('|');
        }
        
        return enumQueryAsRegex;
    },
    
    
    addLookupRefToAggregatePipeline(aggregate, model, localField, options = {}) {
        let asField = localField;
        if (options.asField) {
            asField = options.asField;
        }
        let _idFieldName = `${asField}Id`;
        let _idFieldNamePipelineRef = `$$${_idFieldName}`;
        let pipeline = [
            {
                "$match": {
                    "$expr": {
                        "$eq": [ "$_id", _idFieldNamePipelineRef ] }
                }
            },
            // {
            //     "$project": {
            //         "name": 1
            //     }
            // }
        ];
        
        if (options.project) {
            pipeline.push({
                "$project": options.project
            })
        }
        
        
        aggregate.append(
            {
                $lookup: {
                    from: model.collection.name,
                    let: { [_idFieldName]: `$${localField}` },
                    pipeline: pipeline,
                    as: asField
                }
            }
        );

        aggregate.append(
            {
                $unwind: {
                    path: `$${asField}`,
                    preserveNullAndEmptyArrays: true
                },
            },
        );
    }

};


module.exports = utils;
