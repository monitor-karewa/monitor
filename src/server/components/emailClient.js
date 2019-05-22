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
     * @param {string} to correo del receptor del correo
     * @param {string} subject sujeto del correo
     * @param {Request} req Request actual
     */
    constructor(to, subject, req) {
        this.to = to;
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
    sendResetPasswordEmail(user, token) {
        let to = this.to;
        let subject = this.subject;
        let req = this.req;
        
        //Changed to use full timestamp
        // date = date.substring(0, date.length - 6);
        //let urlpsw = `<a href='localhost:3000/api/users/establish/password/${token}'>RESET PASSWORD</a>`;
        // let urlpsw = `localhost:8080/#/new-password/${token}`;
        let baseUrl = config.app.host;
        if (config.app.port.toString() !== '80' && config.app.port.toString() !== '443') {
            baseUrl += `:${config.app.port}`;
        }
        let urlpsw = `${baseUrl}/new-password/${token}`;
        /*let logoImg = `${config.baseUrl}/img/pagando/pagando-logo.png`;
        let logoBl = `${config.baseUrl}/img/pagando/bl-logo.png`;
        let html = pug.renderFile('./views/restorePassword.pug', {
            url: urlpsw,
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
            attachment:[{data:urlpsw, alternative:true}]
        }, (err, message) => {
            if (err) {
                logger.error(err, null, 'EmailUtilities#sendRestorePasswordEmail', 'Error trying to send restore password email to user: %j' +
                    '\nfrom: %j' +
                    '\nto: %j' +
                    '\nsubject: %j' +
                    '\nattachment: %j',
                    user, from, to, subject, {data:urlpsw, alternative:true});
            }
        });
    }

}

module.exports = EmailClient;
