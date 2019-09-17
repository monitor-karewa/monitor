const logger = require('./../components/logger').instance;

const Organization = require('./../models/organization.model').Organization;
const File = require('./../models/file.model').File;

var multer  = require('multer');
var upload = multer();

exports.beforeChangeCover = upload.single('cover');

exports.changeCover = (req, res, next) => {
    //req.file.buffer
    //req.file.filename
    let currentOrganizationId = Organization.currentOrganizationId(req);

    
    let coverFileInfo = req.file;

    if (!coverFileInfo) {
        return res.json({
            error: true
        });
    }

    let cover = new File({
        mimetype: coverFileInfo.mimetype,
        size: coverFileInfo.size,
        filename: coverFileInfo.originalname,
        data: coverFileInfo.buffer
    });
    
    cover.save((err) => {
        if (err) {
            logger.error(err, null, 'settings.controller#changeCover', 'Error trying to save cover File for Organization [%s]', currentOrganizationId);
        }

        let update = {
            cover: cover._id
        };

        let query = {_id: currentOrganizationId};
        Organization.updateOne(query, {$set: update}, {}, (err) => {
            if (err) {
                logger.error(err, null, 'settings.controller#changeCover', 'Error trying to change cover for Organization [%s]', currentOrganizationId);
            }
    
            return res.json({
                error: !!err,
                data: update
            });
        });
    });
    
    
};

exports.changeSettings = (req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    let contactLocation = req.body.contactLocation;
    let contactEmail = req.body.contactEmail;
    let address = req.body.address;
    let schedule = req.body.schedule;
    let additionalInformation = req.body.additionalInformation;
    let welcomeTitle = req.body.welcomeTitle;
    let showBackgroundText = req.body.showBackgroundText;
    let round = req.body.round;
    let defaultAdministrationPeriod = req.body.defaultAdministrationPeriod;

    let currentOrganizationId = Organization.currentOrganizationId(req);
    
    let update = {title, description, contactLocation, contactEmail, address, schedule, additionalInformation, welcomeTitle, showBackgroundText, round, defaultAdministrationPeriod};

    Organization.updateOne({_id: currentOrganizationId}, {$set: update}, {}, (err) => {
        if (err) {
            logger.error(err, null, 'settings.controller#changeSettings', 'Error trying to change settings for Organization [%s]', currentOrganizationId);
        }

        return res.json({
            error: !!err,
            data: update
        });
    });
};

exports.changeTheme = (req, res, next) => {
    let theme = req.body.theme;
    let currentOrganizationId = Organization.currentOrganizationId(req);

    if (!theme || !currentOrganizationId) {
        return res.json({
            error: true
        });
    }
    
    let color = '#19babd';
    
    switch(theme) {
        case 'default':
            color = '#19babd';
            break;
        case 'dark':
            color = '#2e3854';
            break;
        case 'purple':
            color = '#981beb';
            break;
        case 'orange':
            color = '#ff691e';
            break;
        case 'yellow':
            color = '#fab81e';
            break;
        case 'greenBlue':
            color = '#80dbb6';
            break;
        case 'green':
            color = '#17cf86';
            break;
        case 'sky':
            color = '#91d2fa';
            break;
        case 'blue':
            color = '#1b95e0';
            break;
        case 'red':
            color = '#e71c4f';
            break;
        case 'pink':
            color = '#f58ea8';
            break;
        case 'gray':
            color = '#abb8c2';
            break;
        case 'lilac':
            color = '#9f97e4';
            break;
        case 'blueDark':
            color = '#4468c4';
            break;
    }

    let update = {
        color: color,
        theme: theme
    };
    
    Organization.updateOne({_id: currentOrganizationId}, {$set: update}, {}, (err) => {
        if (err) {
            logger.error(err, null, 'settings.controller#changeColor', 'Error trying to change color for Organization [%s]', currentOrganizationId);
        }

        return res.json({
            error: !!err,
            data: update
        });
    });
};