const log = require('npmlog');
const util = require('util');
const stream = require('stream');

let config = require('./../config/config').get();

//Set log level to display
log.level = config.behavior.logLevel;

/**
 * Realiza el logging de un mensaje.
 *
 * @param err {Error} instancia opcional del error ocurrido. Si se define, será loggeado junto con el mensaje principal y, en caso de que shouldSendToSentry sea truthy, se enviará al Sentry.
 * @param req {Request} instancia del request actual. Si se define y si shouldSendToSentry es truthy, se utilizará para generar información adicional al enviar el mensaje a Sentry
 * @param logFn {Function} función para logging, desde npmlog
 * @param source {string} prefijo del log, actualmente utilizado como origen del error
 * @param message {string} mensaje principal; sigue el formato de strings de node
 * @param args argumentos para dar formato al mensaje principal
 * @private
 */
const _logMessage = (err, req, logFn, source, message, args) => {
    if (!source) {
        source = '[unspecified source]';
        //Logging without source. This may reduce the effectiveness of the logs
        // console.log('Logging without source. This may reduce the effectiveness of the logs');
        // logger.warn(null, req, source, 'Logging without source. This may reduce the effectiveness of the logs');
    }
    args = args || [];
    logFn(source, message, ...args);
    //HACK: Couldn't "append" the error automatically. So we log it manually after the main log 
    if (err) {
        logFn(source, 'Err:', err);
    }
};

/**
 * Clase encargada de realizar el logging de la aplicación de manera personalizada.
 */
class Logger {
    /**
     * Constructor de la clase.
     */
    constructor () {
    }

    /**
     * Obtiene un
     * @returns {HttpLogStream}
     */
    getHttpStream() {
        return this._httpStream;
    }

    /**
     * Realiza logging de un error y notifica a Sentry. El mensaje indicado sigue el estándar de node, y se le da
     * formato de acuerdo a los args especificados.
     *
     * @param [err=null] {Error} instancia del error, si es que existe
     * @param [req=null] {Request} instancia del request actual. Si no se especifica, el reporte a Sentry no tendrá
     * información adicional sobre el usuario y el request actual.
     * @param source {string} origen del error. Se prefiere la siguiente sintaxis: FILENAME#FUNCTION_NAME
     * @param message {string} mensaje del error. Sigue el estándar de node para formatting de strings.
     * @param args argumentos adicionales para dar formato al mensaje de error
     */
    error(err = null, req = null, source, message, ...args) {
        _logMessage(err, req, log.error, source, message, args);
    }

    /**
     * Realiza logging de una advertencia. El mensaje indicado sigue el estándar de node, y se le da
     * formato de acuerdo a los args especificados.
     *
     * @param [err=null] {Error} instancia del error, si es que existe
     * @param [req=null] {Request} instancia del request actual. Si no se especifica, el reporte a Sentry no tendrá
     * información adicional sobre el usuario y el request actual.
     * @param source {string} origen del error. Se prefiere la siguiente sintaxis: FILENAME#FUNCTION_NAME
     * @param message {string} mensaje del error. Sigue el estándar de node para formatting de strings.
     * @param args argumentos adicionales para dar formato al mensaje de error
     */
    warn(err, req, source, message, ...args) {
        _logMessage(err, req, log.warn, source, message, args);
    }

    /**
     * Realiza logging de un mensaje informativo. El mensaje indicado sigue el estándar de node, y se le da
     * formato de acuerdo a los args especificados.
     *
     * @param [err=null] {Error} instancia del error, si es que existe
     * @param [req=null] {Request} instancia del request actual. Si no se especifica, el reporte a Sentry no tendrá
     * información adicional sobre el usuario y el request actual.
     * @param source {string} origen del error. Se prefiere la siguiente sintaxis: FILENAME#FUNCTION_NAME
     * @param message {string} mensaje del error. Sigue el estándar de node para formatting de strings.
     * @param args argumentos adicionales para dar formato al mensaje de error
     */
    info(err, req, source, message, ...args) {
        _logMessage(err, req, log.info, source, message, args);
    }

    /**
     * Realiza logging de información muy descriptiva con motivo de debugging. El mensaje indicado sigue el estándar de node, y se le da
     * formato de acuerdo a los args especificados.
     *
     * @param [err=null] {Error} instancia del error, si es que existe
     * @param [req=null] {Request} instancia del request actual. Si no se especifica, el reporte a Sentry no tendrá
     * información adicional sobre el usuario y el request actual.
     * @param source {string} origen del error. Se prefiere la siguiente sintaxis: FILENAME#FUNCTION_NAME
     * @param message {string} mensaje del error. Sigue el estándar de node para formatting de strings.
     * @param args argumentos adicionales para dar formato al mensaje de error
     */
    debug(err, req, source, message, ...args) {
        _logMessage(err, req, log.verbose, source, message, args);
    }
}

/**
 * Instancia de {@link Logger} para la aplicación.
 * @type {Logger}
 */

let loggerInstance = new Logger();

module.exports.instance = loggerInstance;