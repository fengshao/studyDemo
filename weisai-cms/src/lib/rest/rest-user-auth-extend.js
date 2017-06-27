/**
 * Created by liwenjun on 2015/12/27.
 */

/**
 * request  扩展
 */
var util = require("util");
var authRequest = util._extend({}, require("./rest-basic"));
var baseRequest = util._extend({}, require("./rest-basic"));
var logger = require("./../utils/logger").getLogger('rest');
// var tokenProvider = require("./token-provider");
var EventEmitter = require("events").EventEmitter;
var auth = require("./../utils/auth");
var Request = require('request').Request;

var RestlerExtend = {
    prepareRequest: function (req, res) {
        var requestInstance = this, accessToken;
        //从req session中获取user
        var userBaseInfo = auth.getUser(req);
        //从req session中获取token
        accessToken = userBaseInfo.auth.token;
        // 无效token，直接返回。
        if (!accessToken) {
            logger.debug("No UserAccessToken Found In Session, Try Next Time.");
            requestInstance.abort();
            process.nextTick(function () {
                var errorCodeDesc = {
                    "errorCode": "00116"
                }, custom_resp = {
                    statusCode: 500,
                    raw: "Rest-user-auth-extend主动抛出的自定义异常信息(UserTokenRequest): " + JSON.stringify(errorCodeDesc)
                };
                requestInstance.emit('error', errorCodeDesc, custom_resp);
                requestInstance.emit('complete', errorCodeDesc, custom_resp);
            });
            return requestInstance;
        }

        // 1. 将 accessToken 放入请求头中
        requestInstance.setHeader("token", accessToken);
        //将realm_id，user_id放入请求头
        requestInstance.setHeader("realm", userBaseInfo ? userBaseInfo.auth.realm_id : "");
        requestInstance.setHeader("userId", userBaseInfo ? userBaseInfo.user_id : "");
        // 代理 complete, fail 方法，以方便对授权出错的拦截
        process.nextTick((function () {
            var requestInstance = this, i, h_completes = requestInstance.listeners("complete"), h_fails = requestInstance.listeners("fail");
            var proxyHandler = function (handers) {
                var requestInstance = this, args = Array.prototype.slice.apply(arguments, [1]);
                if (!requestInstance["_process_token_validate"]) {
                    for (i = 0; i < handers.length; i++) {
                        handers[i].apply(requestInstance, args);
                    }
                }
            };
            requestInstance._events["fail"] = [requestInstance._events["oauth-proxy-fail"]];
            delete requestInstance._events["oauth-proxy-fail"];
            requestInstance._events["fail"].push(proxyHandler.bind(requestInstance, h_fails));
            requestInstance._events["complete"] = proxyHandler.bind(requestInstance, h_completes);
        }).bind(requestInstance));

        // 授权出错的拦截
        requestInstance.on("oauth-proxy-fail", function (errorObj, response) {

            var retEmitter, errorCode = (errorObj && typeof errorObj === "object") ? parseInt(errorObj["error_code"] || errorObj["errorCode"]) : false;
            if (response.statusCode.toString() == "400") {
                // retEmitter = tokenProvider.processUserTokenError(errorCode, accessToken, userBaseInfo.user_id, userBaseInfo.user_name);
                // if (retEmitter["inProcessType"]) {
                //     requestInstance["_process_token_validate"] = true;
                // }
                // retEmitter.on("after-token-refresh-successful", function (newToken) {
                //     delete requestInstance["_process_token_validate"];
                //     userBaseInfo.auth.token = newToken;
                //     auth.saveUserInfo(req, userBaseInfo);
                //     // 将新 token 抛出去
                //     authRequest.globalEmitter.emit("token-refreshed", req, res, newToken);
                //     // 根据新token重新发送请求
                //     reTryRequest(requestInstance, newToken);
                // }).on("refresh-token-expired", function () {
                //     delete requestInstance["_process_token_validate"];
                //     authRequest.globalEmitter.emit("refresh-token-expired", req, res);
                // }).on("refresh-token-error", function (err, response) {
                //     delete requestInstance["_process_token_validate"];
                //     requestInstance.emit("fail", err, response);
                // }).on("after-token-exist-check", function (type, data) {
                //     delete requestInstance["_process_token_validate"];
                //     authRequest.globalEmitter.emit("token-not-exist", req, res, type, data);
                // }).on("other-force-logout-error", function (errorCode) {
                //     delete requestInstance["_process_token_validate"];
                //     authRequest.globalEmitter.emit("other-force-logout-error", req, res, errorCode);
                // });
            }
        });
        return requestInstance;
    }
};
/**
 * 根据新token重新发送请求。
 * @param requestInstance
 * @param newToken
 */
function reTryRequest(requestInstance, newToken) {
    requestInstance.req.removeAllListeners().on('error', function () {
    });
    requestInstance.removeAllListeners('end').on('error', function () {
    });
    requestInstance.removeAllListeners('data').on('error', function () {
    });
    if (requestInstance.req.finished) {
        requestInstance.req.abort();
    }
    //console.log(new Date().toString() + " reTryRequest");
    requestInstance.restOptions.headers["token"] = newToken;
    requestInstance.restOptions.callback = function () {
    };
    //clearTimeout(requestInstance.timeoutTimer);
    //requestInstance.timeoutTimer = null;
    //requestInstance.destroy();
    requestInstance._callbackCalled = false;
    requestInstance._started = false;
    Request.call(requestInstance, requestInstance.restOptions);
    //console.log(new Date().toString() + " after start");
}
/**
 * 从 Request 内抽取出来的，并有所改动
 */
var baseRequestOverride = {
    get: function (options, req, res) {
        return RestlerExtend.prepareRequest.call(baseRequest.get(options, req, res), req, res);
    },
    post: function (options, req, res) {
        return RestlerExtend.prepareRequest.call(baseRequest.post(options, req, res), req, res);
    },
    put: function (options, req, res) {
        return RestlerExtend.prepareRequest.call(baseRequest.put(options, req, res), req, res);
    },
    del: function (options, req, res) {
        return RestlerExtend.prepareRequest.call(baseRequest.del(options, req, res), req, res);
    }
};

// 重载 get 方法
authRequest.get = baseRequestOverride.get;
// 重载 post 方法
authRequest.post = baseRequestOverride.post;
// 重载 put 方法
authRequest.put = baseRequestOverride.put;
// 重载 del 方法
authRequest.del = baseRequestOverride.del;
//全局emitter
authRequest.globalEmitter = new EventEmitter();


module.exports = authRequest;