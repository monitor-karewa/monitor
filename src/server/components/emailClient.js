const email = require('emailjs');
const config = require('./../config/config').get();
const logger = require('./../components/logger').instance;

//const status = require('./../components/status');
//status.setStatus(status.types.EMAIL, status.options.OPERATIONAL);

/**
 * Clase con utilidades para envío de emails.
 */
class EmailClient {

    /**
     * Constructor de la clase.
     * @param {string} to correo del receptor del correo. Si es nulo, se mandará a la administración
     * @param {string} subject sujeto del correo
     * @param {Request} req Request actual
     */
    constructor(to, subject, req) {
        if(to){
            this.to = to;
        } else {
            this.to = config.email.stmpUser;
        }
        this.subject = subject;
        this.req = req;

        this.server = email.server.connect({
            user: config.email.stmpUser,
            password: config.email.stmpPass,
            host: config.email.stmpHost,
            ssl: true
        });
        /*
        this.fromAccount = config.stmpAccountWithName;
        this.toAccount = to;
        this.subject = subject;
        this.req = req;*/
    }

    /**
     * Envía un correo para restablecer la contraseña del User indicado.
     * @param {User} user User al cual se enviará el correo
     */
    sendResetPasswordEmail(user, token, isNewUser) {
        let to = this.to;
        let subject = this.subject;
        let req = this.req;
        
        //Changed to use full timestamp
        // date = date.substring(0, date.length - 6);
        //let emailContent = `<a href='localhost:3000/api/users/establish/password/${token}'>RESET PASSWORD</a>`;
        // let emailContent = `localhost:8080/#/new-password/${token}`;
        let baseUrl = config.app.host;
        if (config.app.port.toString() !== '80' && config.app.port.toString() !== '443') {
            baseUrl += `:${config.app.port}`;
        }
        let urlRestorePassword = `${baseUrl}/new-password/${token}`;
        let mainParagraph;
        let title;
        let buttonAction;
        let preheader;
        if(isNewUser){
            title = "Gracias por crear tu cuenta";
            mainParagraph = "Por favor ingresa al siguiente enlace para crear tu contraseña e iniciar sesión";
            buttonAction = "¡Comenzar!";
            preheader = "Comienza a utlizar la plataforma";
        } else {
            title = "Recuperar Contraseña";
            mainParagraph = "Por favor ingresa al siguiente enlace para restablecer tu contraseña:";
            buttonAction = "Restablecer Contraseña";
            preheader = "Te ayudamos a recuperar tu contraseña";
        }
        let emailContent = `<!doctype html> <html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>Simple Transactional Email</title> <style>`
            + `/* ------------------------------------- GLOBAL RESETS ------------------------------------- */ /*All the styling goes here*/ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; }`
            + `/* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px; }`
            + `/* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #ffffff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .content-block { padding-bottom: 10px; padding-top: 10px; } .footer { clear: both; margin-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; }`
            + `/* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #3498db; } .btn-primary a { background-color: #3498db; border-color: #3498db; color: #ffffff; }`
            + `/* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0; }`
            + `/* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } }`
            + `/* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } .btn-primary table td:hover { background-color: #34495e !important; } .btn-primary a:hover { background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class=""> <span class="preheader">${preheader}.</span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body"> <tr> <td>&nbsp;</td> <td class="container"> <div class="content"> <!-- START CENTERED WHITE CONTAINER --> <table role="presentation" class="main">`
            + `<!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>${title}</p> <br> <p>${mainParagraph}</p> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td> <a href="${urlRestorePassword}" target="_blank">${buttonAction}</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </table>`
            + `<br>Si el botón no funciona correctamente, copia y pega el siguiente enlace en la barra de direcciones de tu navegador.<br>${urlRestorePassword}</td> </tr>`
            + `<!-- END MAIN CONTENT AREA --> </table> <!-- END CENTERED WHITE CONTAINER --> <!-- START FOOTER --> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <span class="apple-link">Karewa.org , Blvd. Ortiz Mena 2807 Local 18 Quintas del Sol C.P. 31214, Chihuahua, Chih</span> <br> Si crees que has recibido este mensaje por error favor de contactar a <a href="mailto:contacto@karewa.org">contacto@karewa.org</a> . </td> </tr> <tr> <td class="content-block powered-by"> </td> </tr> </table> </div>`;




        /*let logoImg = `${config.baseUrl}/img/pagando/pagando-logo.png`;
        let logoBl = `${config.baseUrl}/img/pagando/bl-logo.png`;
        let html = pug.renderFile('./views/restorePassword.pug', {
            url: emailContent,
            logo: logoImg,
            logo2: logoBl,
            fullName: user.name +" "+ user.lastName,
            __: this.req.__
        });*/

        // subject = "Monitor Karewa | Restablecer contraseña";

        let from = config.email.stmpAccount;
        this.server.send({
            from: from,
            to: to,
            subject: subject,
            attachment:[{data:emailContent, alternative:true}]
        }, (err, message) => {
            if (err) {
                logger.error(err, null, 'EmailUtilities#sendRestorePasswordEmail', 'Error trying to send restore password email to user: %j' +
                    '\nfrom: %j' +
                    '\nto: %j' +
                    '\nsubject: %j' +
                    '\nattachment: %j',
                    user, from, to, subject, {data:emailContent, alternative:true});
            }
        });
    }

    /**
     * Envía un correo electrónico informando que el usuario ha solicitado contactarse con la administración
     * @param {data} Información de contacto
     */
    sentContactEmail(data) {
        let to = this.to;
        let subject = this.subject;
        let req = this.req;

        //Changed to use full timestamp
        // date = date.substring(0, date.length - 6);
        let baseUrl = config.app.host;
        if (config.app.port.toString() !== '80' && config.app.port.toString() !== '443') {
            baseUrl += `:${config.app.port}`;
        }

        //TODO Put this on a file
        let emailContent = `<!doctype html><html> <head> <meta name="viewport" content="width=device-width" /> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <title>Simple Transactional Email</title> <style> /* ------------------------------------- GLOBAL RESETS ------------------------------------- */ /*All the styling goes here*/ img { border: none; -ms-interpolation-mode: bicubic; max-width: 100%; } body { background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; } table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; } table td { font-family: sans-serif; font-size: 14px; vertical-align: top; } /* ------------------------------------- BODY & CONTAINER ------------------------------------- */ .body { background-color: #f6f6f6; width: 100%; } /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */ .container { display: block; margin: 0 auto !important; /* makes it centered */ max-width: 580px; padding: 10px; width: 580px; } /* This should also be a block element, so that it will fill 100% of the .container */ .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px; }`
            + `/* ------------------------------------- HEADER, FOOTER, MAIN ------------------------------------- */ .main { background: #ffffff; border-radius: 3px; width: 100%; } .wrapper { box-sizing: border-box; padding: 20px; } .content-block { padding-bottom: 10px; padding-top: 10px; } .footer { clear: both; margin-top: 10px; text-align: center; width: 100%; } .footer td, .footer p, .footer span, .footer a { color: #999999; font-size: 12px; text-align: center; } /* ------------------------------------- TYPOGRAPHY ------------------------------------- */ h1, h2, h3, h4 { color: #000000; font-family: sans-serif; font-weight: 400; line-height: 1.4; margin: 0; margin-bottom: 30px; } h1 { font-size: 35px; font-weight: 300; text-align: center; text-transform: capitalize; } p, ul, ol { font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px; } p li, ul li, ol li { list-style-position: inside; margin-left: 5px; } a { color: #3498db; text-decoration: underline; } /* ------------------------------------- BUTTONS ------------------------------------- */ .btn { box-sizing: border-box; width: 100%; } .btn > tbody > tr > td { padding-bottom: 15px; } .btn table { width: auto; } .btn table td { background-color: #ffffff; border-radius: 5px; text-align: center; } .btn a { background-color: #ffffff; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box;`
            + `color: #3498db; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; } .btn-primary table td { background-color: #3498db; } .btn-primary a { background-color: #3498db; border-color: #3498db; color: #ffffff; } /* ------------------------------------- OTHER STYLES THAT MIGHT BE USEFUL ------------------------------------- */ .last { margin-bottom: 0; } .first { margin-top: 0; } .align-center { text-align: center; } .align-right { text-align: right; } .align-left { text-align: left; } .clear { clear: both; } .mt0 { margin-top: 0; } .mb0 { margin-bottom: 0; } .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; } .powered-by a { text-decoration: none; } hr { border: 0; border-bottom: 1px solid #f6f6f6; margin: 20px 0; } /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body]`
            + `.article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } .btn-primary table td:hover { background-color: #34495e !important; } .btn-primary a:hover { background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class=""> <span class="preheader"></span> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">`
            + `<tr> <td>&nbsp;</td> <td class="container"> <div class="content">`
            + `<!-- START CENTERED WHITE CONTAINER --> <table role="presentation" class="main"> <!-- START MAIN CONTENT AREA --> <tr> <td class="wrapper"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td> <p>¡Alguien está intentando contactarte!</p> <br> <p>El siguiente usuario te ha enviado un mensaje a través de nuestro formulario de contacto</p> <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary"> <tbody> <tr> <td align="left"> </td> </tr> </tbody> </table> <span><strong>Nombre :</strong> ${data.name}</span><br> <span><strong>Teléfono :</strong> ${data.phone}</span><br> <span><strong>Correo electrónico :</strong> ${data.email}</span><br> <br> <p> ${data.message}</p> </td> </tr> </table> </td> </tr> <!-- END MAIN CONTENT AREA --> </table> <!-- END CENTERED WHITE CONTAINER --> <!-- START FOOTER --> <div class="footer"> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td class="content-block"> <span class="apple-link">Karewa.org , Blvd. Ortiz Mena 2807 Local 18 Quintas del Sol C.P. 31214, Chihuahua, Chih</span> <br> Si crees que has recibido este mensaje por error favor de contactar a <a href="mailto:contacto@karewa.org">contacto@karewa.org</a>. </td> </tr> <tr> <td class="content-block powered-by"> </td> </tr> </table> </div> <!-- END FOOTER --> </div> </td> <td>&nbsp;</td> </tr> </table> </body></html>`;

        let from = config.email.stmpAccount;
        this.server.send({
            from: from,
            to: to,
            subject: subject,
            attachment:[{data:emailContent, alternative:true}]
        }, (err, message) => {
            if (err) {
                logger.error(err, null, 'EmailUtilities#sendRestorePasswordEmail', 'Error trying to send restore password email to user: %j' +
                    '\nfrom: %j' +
                    '\nto: %j' +
                    '\nsubject: %j' +
                    '\nattachment: %j',
                    data, from, to, subject, {data:emailContent, alternative:true});
            }
        });
    }

}

module.exports = EmailClient;
