var DEFAULT_MAX_LOG_SIZE = 2048000,
    DEFAULT_LOG_BACKUP = 100,
    DEFAULT_LOG_LEVEL = "ALL";

var path = require("path"),
    fs = require("fs");

var isProduction = true, logDir;

logDir = isProduction ?
    path.resolve(__dirname, "../../data/") :
    path.resolve(__dirname, "../data/");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
function getLogFilePath(fileName) {
    return path.resolve(logDir, fileName);
}

//包括Log4js的配置还有morgan的配置
module.exports = {
    //log4js的配置文件
    "log4js": {
        //其中，logLevel是为logger配置的level，省去了手动调用log.setLevel(level)的麻烦;
        //see https://github.com/nomiddlename/log4js-node/wiki/Appenders
        "appenders": [
            {type : "console"},
            //access.log是morgan做express访问日志用的
            {
                type: "file",
                filename: getLogFilePath("access.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "access",
                logLevel: DEFAULT_LOG_LEVEL
            },
            //错误日志
            {
                type: "file",
                filename: getLogFilePath("error.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "error",
                logLevel: DEFAULT_LOG_LEVEL
            },
            //rest请求代理日志
            {
                type: "file",
                filename: getLogFilePath("rest_time.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "rest",
                logLevel: DEFAULT_LOG_LEVEL
            },
            //用户请求日志
            {
                type: "file",
                filename: getLogFilePath("user.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "user",
                logLevel: DEFAULT_LOG_LEVEL
            },
            //安全域请求日志
            {
                type: "file",
                filename: getLogFilePath("realm.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "realm",
                logLevel: DEFAULT_LOG_LEVEL
            },
            //认证请求日志
            {
                type: "file",
                filename: getLogFilePath("auth.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "auth",
                logLevel: DEFAULT_LOG_LEVEL
            },
            //测试 请求代理日志
            {
                type: "file",
                filename: getLogFilePath("rest_test.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "test",
                logLevel: DEFAULT_LOG_LEVEL
            },
            {
                type: "file",
                filename: getLogFilePath("push.log"),
                maxLogSize: DEFAULT_MAX_LOG_SIZE,
                backups: DEFAULT_LOG_BACKUP,
                category: "push",
                logLevel: DEFAULT_LOG_LEVEL
            }
        ]
    },
    morgan: {
        //这个是morgan的配置记录哪些http访问日志内容
        tokenParams: 'IP::remote-addr method::method url::url status::status responseTime::response-time contentLength::res[content-length] referrer::referrer userAgent::user-agent'
    }
};
