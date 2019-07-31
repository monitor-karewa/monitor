const logger = require('./../components/logger').instance;
const Calculo = require('./../models/calculo.model').Calculo;
const { validationResult } = require('express-validator/check');
const EmailClient = require('./../components/emailClient');
const Organization = require('./../models/organization.model').Organization;

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

    Organization.findOne(
        {_id: req.currentOrganizationId},
        function (err, result) {
            if(err){
                return res.json({
                    error : true,
                    err : err,
                    message : "there was a problem retrieveing the organization"
                })
            } else if (!result){
                return res.json({
                    error : true,
                    message : "Organization not found"
                })
            } else if(!result.contactEmail){
                return res.json({
                    error : true,
                    err : err,
                    message : "La organización no ha configurado su correo elecntrónico de contacto"
                })
            }

            if (name && phone && message) {
                var emailClient = new EmailClient(result.contactEmail,"Monitor Karewa | Contacto", req);
                emailClient.sentContactEmail(req.body);
                return res.json({
                    message: "El correo se ha enviado correctamente",
                    error: false
                })
            } else {
                return res.json({
                    error: true,
                    message : "Por favor ingresa los campos requeridos"

                })
            }
        }
    );

};

exports.loadInfo = (req,res, next) => {
    Organization.findOne({_id: req.currentOrganizationId})
        .select('address schedule additionalInformation')
        .lean()
        .exec((err, organization) => {
            if (err) {
                logger.error(err, null, 'settings.controller#changeSettings', 'Error trying to load settings for Organization [%s]', currentOrganizationId);
            }
            return res.json({
                error: !!err,
                data: organization
            });
        }, 5000)
};
