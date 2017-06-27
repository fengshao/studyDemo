/**
 * 辅助 Rest 请求的方法类
 * Created by liwenjun on 2015/12/24.
 */
var path = require('path');
var EventEmitter = require("events").EventEmitter;
var util = require("util");
var restManage = require("./rest-manage");
// var ErrorCode = require("./../utils/errorCode");
var config = require("../../conf/config");

/**
 * 通用rest请求辅助方法
 * @param opt {object}          辅助选项数据, 其中 {req, logger} 为必包含对象
 * @param data {object}         传递的数据
 * @param callbacks {object}    回调函数, 具体格式如下: {
 *                                  error:   function(eventEmitter, errorCodeDesc, restResp){},
 *                                  success: function(eventEmitter, data){},
 *                              }
 * @returns {EventEmitter|*}
 */
var _RequestHandler = function (opt, data, callbacks) {
    if (!opt || !opt.url) {
        throw new Error("RestUtil: 第一个参数中缺少变量url ");
    }
    if (!opt || !opt.req || !opt.res) {
        throw new Error("RestUtil: 第一个参数中缺少变量 {req: 'browser request object', res: 'browser response object'} ");
    }

    var eventEmitter = new EventEmitter(), options, browserReq = opt.req, browserResp = opt.res;
    var logger = this[0], restType = this[1], method = this[2];
    //删除不用的data
    delete opt.req;
    delete opt.res;
    var options = util._extend({}, opt);
    //设置追踪
    options.headers = config.oplateTrace.toRequestHeader(browserReq, options.headers);

    var restErrorType = {"timeout": "超时了", "fail": "失败了", "error": "出错了"};
    var restResult = "error";

    if (data) {
        if (typeof(data) === "object") {
            if (method === "get") {
                options.qs = data;
            } else if (method === "post" || method === "put" | method === "del") {
                options.body = data;
            }
        } else {
            throw new Error("第三个参数 (data) 的格式不正确 (必须为 object或null )", data);
        }
    }
    restManage[restType][method](options, browserReq, browserResp)
        .on("error", function (errorObj, restResp) {
            if (errorObj && (errorObj.code === "ESOCKETTIMEDOUT" || errorObj.code === "ETIMEDOUT")) {
                restResult = "timeout";
            } else {
                restResult = "error";
            }
            logger.info('在访问URL："%s" 时，%s', options.url, restErrorType[restResult]);
            // var errorCode = ErrorCode.getErrorCodeDesc(restResult == "error" ? errorObj : "request-timeout");
            // if (restResult == "error") {
            //     if (callbacks && typeof callbacks.error === 'function') {
            //         callbacks.error.call(this, eventEmitter, errorCode, restResp);
            //     } else {
            //         eventEmitter.emit("error", errorCode);
            //     }
            // } else {
            //     if (callbacks && typeof callbacks.timeout === 'function') {
            //         callbacks.timeout.call(this, eventEmitter, errorCode);
            //     } else {
            //         if (restManage.userAuthRest.globalEmitter) {
            //             restManage.userAuthRest.globalEmitter.emit("timeout", browserReq, browserResp, errorCode);
            //         } else {
            //             eventEmitter.emit("timeout", errorCode);
            //         }
            //     }
            // }
        })
        .on("fail", function (errorObj, restResp) {
            restResult = "fail";
            logger.info('在访问URL："%s" 时，%s', options.url, restErrorType[restResult]);
            // if (callbacks && (typeof callbacks.fail === 'function' || typeof callbacks.error === 'function')) {
            //     (typeof callbacks.fail === 'function' ? callbacks.fail : callbacks.error).call(this, eventEmitter, ErrorCode.getErrorCodeDesc(errorObj), restResp);
            // } else {
            //     eventEmitter.emit("error", ErrorCode.getErrorCodeDesc(errorObj || 10500));
            // }
        })
        .on("success", function (data, restResp) {
            var jsonStr = "";
            try {
                jsonStr = JSON.stringify(data);
            } catch (e) {
                jsonStr = data;
            }
            logger.info('在访问URL："%s" 时，返回状态%s,数据 %s', options.url, restResp.statusCode, jsonStr);
            if (callbacks && typeof callbacks.success === 'function') {
                callbacks.success.call(this, eventEmitter, data, restResp);
            } else {
                eventEmitter.emit("success", data, restResp);
            }
        });
    return eventEmitter;
};


var Request = function (logger, restType) {
    //不同的业务的rest请求日志，放到不同的业务日志文件中
    this.logger = logger;
    this.restType = restType;
};
Request.prototype = {
    get: function () {
        return _RequestHandler.apply([this.logger, this.restType, "get"], arguments);
    },
    post: function () {
        return _RequestHandler.apply([this.logger, this.restType, "post"], arguments);
    },
    put: function () {
        return _RequestHandler.apply([this.logger, this.restType, "put"], arguments);
    },
    del: function () {
        return _RequestHandler.apply([this.logger, this.restType, "del"], arguments);
    }
};

function RestUtil(logger) {
    if (!(this instanceof RestUtil)) {
        return new RestUtil(logger);
    }
    if (!logger) {
        throw new Error("logger is required in RestUtil");
    }
    this.baseRest = new Request(logger, "baseRest");
    this.authRest = new Request(logger, "userAuthRest");
};


/**
 * 通用Rest请求工具, 使用方法如下:
 *
 * var RestUtil = require("path to RestUtil")(logger);
 * var newEventEmitter = RestUtil.rest.get(url, opt, data, callbacks);
 * var newEventEmitter = RestUtil.rest.post(url, opt, data, callbacks);
 * 其中，callbacks 格式如下：{ error:   function(eventEmitter, errorCodeDesc, restResp){},
 *                             success: function(eventEmitter, data){}}
 * @type {Function}
 */
module.exports = RestUtil;