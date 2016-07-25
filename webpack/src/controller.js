/*!
 * Copyright (c) 2010-2015 EEFUNG Software Co.Ltd. All rights reserved.
 * 版权所有 (c) 2010-2015 湖南蚁坊软件有限公司。保留所有权利。
 */

"use strict";

/**
 * 所有请求路由资源控制器
 */

/**
 * 是否已初始化过
 */
var isInited = false;
var path = require('path');
var util = require("util");
var fs = require("fs");
var readDirRecursive = require("../lib/utils/readDirRecursive");
require('babel-core/register');

/**
 * 初始化 资源控制器
 * @param app express app
 */
var initController = function (app) {
    if (isInited) {
        return;
    }
    isInited = true;

    var modulesPath = path.join(__dirname, '');

    var files = readDirRecursive(modulesPath);
    files.forEach(function(fp) {
        if(!/\.http\.js$/.test(fp)) {
            return;
        }
        var routeConfig = require(fp);
        if (!routeConfig.module || !routeConfig.routes || !routeConfig.routes.length) {return;}
        routeConfig.routes.forEach(function (route) {
            try {
                route.passport = route.passport === undefined ? routeConfig.passport : route.passport;
                route.passport = (route.passport === undefined || route.passport === true) ? {
                    "needLogin": true
                } : route.passport;
                route.passport = (route.passport === false) ? {"needLogin": false} : route.passport;
                app[route.method](route.path, require(path.resolve(__dirname , "" , route.module || routeConfig.module))[route.handler]);
            } catch (error) {
                // 加载路由错误时，显示当前的错误信息，并抛出异常。
                console.error("加载路由错误: \n文件路径:%s \n错误信息:%s", JSON.stringify(route , null , 4) , error.message);
                throw error;
            }
        });
    });

};

/**
 * 将一些系统变量放入 app.locals 中，以方便在view（ejs）中使用；
 * 使用方法：<%= locals.version %>
 *
 * @param app express app
 */
var setAppConfig = function (app) {
    util._extend(app.locals, {
        isProduction : config.isProduction,
        webpackMode : config.webpackMode
    });
};

/**
 * @param app express app
 * @returns {Function}
 */
module.exports = function (app) {

    // 将 session, request 放到 locals 中，以方便在 ejs 模板中直接使用
    // <%=locals.session%> 或是 <%=session%>
    app.use(function (req, res, next) {
        res.locals.session = req.session;
        res.locals.request = req;
        next();
    });

    initController(app);

    return app;
};
