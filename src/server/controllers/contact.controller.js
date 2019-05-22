const logger = require('./../components/logger').instance;
const Calculo = require('./../models/calculo.model').Calculo;
const { validationResult } = require('express-validator/check');

/**
 * Guarda un Calculo.
 * @param req
 * @param res
 * @param next
 */
exports.contact = (req, res, next) => {

    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let message = req.body.message;

    if (name && phone && message) {

        return res.json({
            message: "mail sent",
            error: false
        })
    } else {
        return res.json({
            error: true,

        })
    }


};
