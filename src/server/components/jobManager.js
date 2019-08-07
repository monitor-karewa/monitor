const Agenda = require('agenda');
const moment = require('moment');
const async = require('async');


const config = require('./../config/config').get();
const logger = require('./../components/logger').instance;

const Contract = require('./../models/contract.model').Contract;
const File = require('./../models/file.model').File;


// const http = require('http');
const request = require('request');
// const fs = require('fs');

const TASKS = {
    BACKUP_CONTRACT_URLS: 'BACKUP_CONTRACT_URLS'
};

const CONCURRENCY_LIMIT = 5;


let runTask = function () {
    //Placeholder
};

if (!config.behavior.skipJobManager) {
    const agenda = new Agenda({db: {address: config.mongo.url}});
    function _backupUrl(url, callback) {
        // var file = fs.createWriteStream(fileName);
    
        
        /*
        
        headers:
       { 'cache-control': 'no-cache',
         'content-type': 'image/jpeg',
         'last-modified': 'Thu, 15 Jun 2017 17:26:45 GMT',
         'accept-ranges': 'bytes',
         etag: '"d635c08ffce5d21:0"',
         server: 'Microsoft-IIS/8.5',
         'x-powered-by': 'ASP.NET',
         'access-control-allow-origin': '*',
         date: 'Tue, 14 May 2019 04:40:20 GMT',
         connection: 'close',
         'content-length': '2819952' },
        
         */
        
        
        if (!url || !url.length) {
            logger.info(null, null, 'jobManager#_backupUrl', 'Skipping undefined or empty url [%s]', url);
            return callback();
        }
        
        logger.info(null, null, 'jobManager#_backupUrl', 'Initiating backup for url [%s]', url);
    
        request({
            uri: url,
            encoding: null,
            
            //request uses NodeJS's http client under the hood.
            //Sometimes, http throws an error upon making a valid request
            //We set the family to 4 to avoid this error
            //For more information:
            
            //https://github.com/request/request-promise-native/issues/6#issuecomment-282537910
            
            //Or google "npm request Error: getaddrinfo ENOTFOUND"
            family: 4
        }, (err, response, body) => {
            if (err) {
                logger.error(null, null, 'jobManager#_backupUrl', 'Request failed for url [%s]', url);
                return callback(err);
            }
            
            let size = body.length;
    
            if (response.headers['content-length'] && Number(response.headers['content-length'])) {
                size = Number(response.headers['content-length']);
            }
    
            let file = new File({
                mimetype: response.headers['content-type'],
                size: size,
                data: body
                // data: Buffer.from(body, 'utf8')
            });
    
            file.save((err) => {
                if (err) {
                    logger.error(err, null, 'jobManager#_backupUrl', 'Error trying to save File');
                    return callback(err);
                }
                return callback(null, file);
            });
            
        });
    
    
        // http.get(url, function(response) {
        //     response.pipe(file);
        //     file.on('finish', function() {
        //         file.close(callback);  // close() is async, call callback after close completes.
        //         //TODO: create a field in the model
        //     });
        // }).on('error', function(err) { // Handle errors
        //     fs.unlink(dest); // Delete the file async. (But we don't check the result)
        //     if (callback) callback(err.message);
        // });
        
        
        
        
    }
    
    agenda.define(TASKS.BACKUP_CONTRACT_URLS, (job) => {
        // User.remove({lastLogIn: {$lt: twoDaysAgo}}, done);
    
        //Read params
        let {contracts} = job.attrs.data || [];
    
        // Contract.find({backedUp: false})
        //     .exec((err, contracts) => {
        // })
        
        let queue = async.queue(function(contract, callback) {
            
            // contract.announcementUrl
            // contract.clarificationMeetingJudgmentUrl
            // contract.presentationProposalsDocUrl
            // contract.contractUrl
            async.parallel({
                announcementUrlBackup: (callback) => {
                    let url = contract.announcementUrl;
                    _backupUrl(url, (err, file) => {
                        if (err) {
                            logger.error(err, null, `jobManager#${TASKS.BACKUP_CONTRACT_URLS}`, 'Error trying to backup url %s', url);
                            return callback();
                        }
                        
                        return callback(null, file);
                    });
                },
                clarificationMeetingJudgmentUrlBackup: (callback) => {
                    let url = contract.clarificationMeetingJudgmentUrl;
                    _backupUrl(url, (err, file) => {
                        if (err) {
                            logger.error(err, null, `jobManager#${TASKS.BACKUP_CONTRACT_URLS}`, 'Error trying to backup url %s', url);
                            return callback();
                        }
    
                        return callback(null, file);
                    });
                },
                presentationProposalsDocUrlBackup: (callback) => {
                    let url = contract.presentationProposalsDocUrl;
                    _backupUrl(url, (err, file) => {
                        if (err) {
                            logger.error(err, null, `jobManager#${TASKS.BACKUP_CONTRACT_URLS}`, 'Error trying to backup url %s', url);
                            return callback();
                        }
    
                        return callback(null, file);
                    });
                },
                contractUrlBackup: (callback) => {
                    let url = contract.contractUrl;
                    _backupUrl(url, (err, file) => {
                        if (err) {
                            logger.error(err, null, `jobManager#${TASKS.BACKUP_CONTRACT_URLS}`, 'Error trying to backup url %s', url);
                            return callback();
                        }
    
                        return callback(null, file);
                    });
                },
            }, (err, backups) => {
                //All urls processed
                // backups.announcementUrlBackup
                // backups.clarificationMeetingJudgmentUrlBackup
                // backups.presentationProposalsDocUrlBackup
                // backups.contractUrlBackup
                if (err) {
                    console.log('err trying to backup contract', err);
                }
                
                let update = null;
                
                if (backups && (
                        backups.announcementUrlBackup
                        || backups.clarificationMeetingJudgmentUrlBackup
                        || backups.presentationProposalsDocUrlBackup
                        || backups.contractUrlBackup
                    )) {
    
                    update = {};
                    
                    if (backups.announcementUrlBackup && backups.announcementUrlBackup._id) {
                        update.announcementUrlBackup = backups.announcementUrlBackup._id;
                    }
                    if (backups.clarificationMeetingJudgmentUrlBackup && backups.clarificationMeetingJudgmentUrlBackup._id) {
                        update.clarificationMeetingJudgmentUrlBackup = backups.clarificationMeetingJudgmentUrlBackup._id;
                    }
                    if (backups.presentationProposalsDocUrlBackup && backups.presentationProposalsDocUrlBackup._id) {
                        update.presentationProposalsDocUrlBackup = backups.presentationProposalsDocUrlBackup._id;
                    }
                    if (backups.contractUrlBackup && backups.contractUrlBackup._id) {
                        update.contractUrlBackup = backups.contractUrlBackup._id;
                    }
    
                } else {
                    //Backup unsuccessful
                    logger.error(err, null, 'jobManager#(after parallel)', 'Backup unsuccessful for contract [%s]', contract._id.toString());
                }
    
                //Skip if nothing to update
                if (!update) {
                    return callback();
                }
                
                //Else update the Contract and mark as backed up
                update.backedUp = true;
                Contract.updateOne({_id: contract._id}, {$set: update}, {}, (err) => {
                    if (err) {
                        logger.error(err, null, 'jobManager#(after parallel)', 'Error trying to update contract [%s]', contract._id.toString());
                    }
    
                    return callback();
                });
                
            });
            
        }, CONCURRENCY_LIMIT);
    
        queue.drain = function() {
            console.log('all items have been processed (@drain)');
        };
    
    
    
        queue.push(contracts, (err) => {
            if (err) {
                logger.error(err, null, 'jobManager#(after contracts)', 'Error processing queue');
            } else {
                logger.info(null, null, 'jobManager#(after contracts)', 'Successfully processed queue');
            }
        });
    
    });
    
    runTask = function(taskName, params = null) {
        if (!TASKS[taskName]) {
            logger.error(null, null, 'jobManager#runTask', 'Unknown task name [%s]', taskName);
            return;
        }
    
        //To ensure data has been persisted to the database, all tasks wait 5 seconds before starting
        let runIn5Seconds = moment(new Date()).add(5, 's').toDate();
    
        let jobPromise = agenda.now(taskName, params/*, callback*/);
        
        agenda.start()
            .then((agendaStartResult) => {
                console.log('agendaStartResult', agendaStartResult);
            })
            .catch((agendaStartErr) => {
                console.log('agendaStartErr', agendaStartErr);
            });
        
        return jobPromise;
        // return agenda.schedule(runIn5Seconds, taskName, params);
    }
}


module.exports = {
    TASKS: TASKS,
    runTask: runTask
};