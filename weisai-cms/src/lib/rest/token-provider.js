var path = require("path");
var util = require("util");
var request = util._extend({}, require("./rest-basic"));
// var logger = require("../utils/logger").getLogger('auth');
var config = require("../../conf/config");
var EventEmitter = require("events").EventEmitter;

var oauthTokenUrl = config.proxy.protocal + config.proxy.host + ":" + config.proxy.port + "/token/access_token";
var checkUserTokenExistUrl = config.proxy.protocal + config.proxy.host + ":" + config.proxy.port + +"/token/ensure_token";
var appKey = "##################";
var appSecret = "###############";

// 授权方式
var GRANT_TYPE = {
    PASSWORD: "password",                         // 密码方式
    CLIENT_CREDENTIALS: "client_credentials",     // 应用ID方法
    REFRESH_TOKEN: "refresh_token"                // 刷新token
};
/**
 * 与Token有关的相关方法与属性
 * @constructor
 */
var TokenProvider = function () {
};
/**
 *   刷新 Access Token
 * 返回的实例中可接收以下几种事件：
 * 1. error:function(errorMsg){} // 刷新Token失败后的事件
 * 2. success:function(token){}  // 刷新Token成功后的事件
 *
 * @param refreshToken
 * @return EventEmitter 的一个新实例
 */
TokenProvider.prototype.refreshAccessToken = function (refreshToken) {
    // logger.debug("start refresh Token (" + refreshToken + ") .");
    var tokenProvider = new EventEmitter();
    request.post({
        "url": oauthTokenUrl,
        "body": {
            "client_id": appKey,
            "client_secret": appSecret,
            "grant_type": GRANT_TYPE.REFRESH_TOKEN,
            "refresh_token": refreshToken
        }
    }).on('error', function (err, response) {
        // logger.error("refresh Token (" + refreshToken + ") has error: ", err);
        tokenProvider.emit("error", err, response);
    }).on('fail', function (result, response) {
        // logger.debug("refresh Token (" + refreshToken + ") is failed: ", result);
        tokenProvider.emit("error", result, response);
    }).on('success', function (result) {
        // logger.debug("success refresh Token(refresh token): " + refreshToken + " , Token(new access_token): " + result);
        tokenProvider.emit("success", result.token);
    });

    return tokenProvider;
};

/**
 *  检测用户是否已存在 token 值
 * 返回的实例中可接收以下几种事件：
 * 1. error:function(errorMsg){}
 * 2. success:function(isExist){}
 *
 * @param userid {string}
 * @return EventEmitter 的一个新实例
 */
TokenProvider.prototype.checkUserTokenIsExist = function (userid) {
    // logger.debug("start check user (%s) Token is exist", userid);
    var eventEmitter = new EventEmitter();
    request.post({
        "url": checkUserTokenExistUrl,
        "body": {
            "client_id": appKey,
            "client_secret": appSecret,
            "user_id": userid
        }
    }).on('error', function (err, response) {
        // logger.error("check user (" + userid + ") token is exist has error: ", err);
        eventEmitter.emit("error", err, response);
    }).on('fail', function (result, response) {
        // logger.error("check user (" + userid + ") token is exist faild: ", result);
        eventEmitter.emit("error", result, response);
    }).on('success', function (isExist) {
        // logger.debug("user (%s) token is exist in db", userid);
        eventEmitter.emit("success", typeof isExist === "object" ? isExist.result : isExist);
    });

    return eventEmitter;
};

/**
 * 处理 user token 的一些过期等问题
 * 抛出事件：
 * 1. after-token-refresh-successful     // function(newToken) {}
 * 2. refresh-token-expired              // function() {}
 * 3. refresh-token-error                // function(err, response) {}
 * 4. after-token-exist-check            // function(type, data) {}
 * 5. other-force-logout-error           // function(errorCodeNumber) {}
 * 6. other-error                        // function() {}
 *
 * @param errorCode {object}
 * @param token {AccessToken}
 * @param userid {string}
 * @param username {string}
 *
 * @return EventEmitter 的一个新实例
 */
TokenProvider.prototype.processUserTokenError = function (errorCode, token, userid, username) {
    var self = this, eventEmitter = new EventEmitter();

    if (errorCode === 11012 && token) {
        // 1. 拦截 token 过期异常
        eventEmitter["inProcessType"] = "refresh-token";
        // logger.info("user (%s) token was expired or invalid, try to refresh token now.", username);
        self.refreshAccessToken(token).on("success", function (newToken) {
            // logger.info("user (%s) token refresh success.", username);
            eventEmitter.emit("after-token-refresh-successful", newToken);
        }).on("error", function (result, response) {
            if (response&&response.statusCode&&response.statusCode.toString() == "400" && result && typeof result === "object" && parseInt(result["error_code"] || result["errorCode"]) === 11013) {
                // 1.1 拦截 refresh-token 过期异常
                // logger.warn("user (" + username + ") refresh token was expired.");
                eventEmitter.emit("refresh-token-expired");
            } else {
                // logger.warn("user (" + username + ") refresh token was has error: ", result);
                eventEmitter.emit("refresh-token-error", result, response);
            }
        });
    } else if (errorCode == 11011) {
        // 2. 拦截 token 不存在异常
        eventEmitter["inProcessType"] = "token-exist-check";
        self.checkUserTokenIsExist(userid).on("success", function (isExist) {
            // logger.warn("user (" + username + ") token was refreshed or removed, check exist (type: success, isExist: %s)", isExist);
            eventEmitter.emit("after-token-exist-check", "success", isExist);
        }).on("error", function (result) {
            // logger.warn("user (" + username + ") token was refreshed or removed, check exist (type: error), error-detail: ", result);
            eventEmitter.emit("after-token-exist-check", "error", result);
        });
    } else if (errorCode == 11023) {
        // 3. 其它的一些必须强制用户退出系统的异常错误
        eventEmitter["inProcessType"] = "other-force-logout-error";
        process.nextTick(function () {
            eventEmitter.emit("other-force-logout-error", errorCode);
            // logger.warn("user (%s) token occured authorization error(code: %s) which must be logout.", username, errorCode);
        });
    } else {
        // 4. 其它信息
        process.nextTick(function () {
            eventEmitter.emit("other-error");
        });
    }
    return eventEmitter;
};

var tokenProviderInstance = new TokenProvider();
module.exports = tokenProviderInstance;