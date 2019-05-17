const logger = require('./../components/logger').instance;

const Organization = require('./../models/organization.model').Organization;

exports.changeSettings = (req, res, next) => {
    let title = req.body.title;
    let description = req.body.description;
    let contactLocation = req.body.contactLocation;
    let contactEmail = req.body.contactEmail;

    let currentOrganizationId = Organization.currentOrganizationId(req);
    
    let update = {title, description, contactLocation, contactEmail};

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