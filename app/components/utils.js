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
     * @returns {*} RegExp creada
     */
    toAccentsRegex : function (str, flags) {
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
    }





}


module.exports = utils;
