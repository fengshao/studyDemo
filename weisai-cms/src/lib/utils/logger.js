var log4js = require('log4js')
    , loggerConfig = require("../../conf/logger").log4js
    , _ = require("underscore")
    , fs = require("fs");

if(fs.existsSync("../../../../oplate.logger")) {
    loggerConfig = require("../../../../oplate.logger").log4js;
}

log4js.configure(loggerConfig);

//获取logger的方法
function getLogger(logId) {
    var logger = log4js.getLogger(logId);
    if(logger != null) {
        var logConfig = _.find(loggerConfig.appenders , function(item) {
            return item.category === logId;
        });
        if(logConfig != null) {
            logger.setLevel(logConfig.logLevel);
        } else {
            throw 'no logger with logId : ' + logId + ' found';
        }
        return logger;
    } else {
        throw 'no logger with logId : ' + logId + ' found';
    }
}
exports.getLogger = getLogger;
