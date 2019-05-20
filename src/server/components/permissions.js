const USER = "USER";
exports.USER = USER;

exports.list = [
    USER
];

let defaultPermissionsFromModelNameCache = {
};

/**
 * Obtiene un nombre de permiso por defecto a partir de un nombre de modelo.
 * 
 * El nombre generado agrega una "_" antes de cualquier mayúscula, excepto cuando la mayúscula se encuentra al inicio 
 * del String.
 * 
 * Por ejemplo,
 * "User" -> "USER"
 * "UserAccount" -> "USER_ACCOUNT"
 * "RandomPascalCaseTextWithAMess" "RANDOM_PASCAL_CASE_TEXT_WITH_A_MESS"
 * 
 * @param modelName {string} nombre del modelo
 * @returns {string} nombre de permiso generado
 */
exports.getDefault = (modelName) => {
    //Add a "_" before every capital, except when it's a capital at the start of the string
    //Then convert to upper case
    //E.g. "User" becomes ""

    //"Cache" to avoid unnecesary re-processing of the same modelName
    let permissionFromModelName = defaultPermissionsFromModelNameCache[modelName];
    if (!permissionFromModelName) {
        permissionFromModelName = modelName.replace("/(?<!^)[A-Z]/g", function (str) {
            return `_${str}`;
        }).toUpperCase();
        defaultPermissionsFromModelNameCache[modelName] = permissionFromModelName;
    }
    
    return permissionFromModelName;
};