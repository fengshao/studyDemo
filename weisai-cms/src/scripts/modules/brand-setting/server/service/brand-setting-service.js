"use strict";
var restLogger = require("../../../../../lib/utils/logger").getLogger('rest');
var restUtil = require("../../../../../lib/rest/rest-util")(restLogger);
var authorityRestApis = {
    getAuthorityList: "/rest/oplate/v1/application/permission",
    getAuthorityGroupList: "/rest/oplate/v1/application/permissiongroup",
    editAuthorityGroupName: "/rest/oplate/v1/permission",
    editAuthority: "/rest/oplate/v1/permission",
    addAuthority: "/rest/oplate/v1/permission"
};
exports.urls = authorityRestApis;

exports.getSpecialList = function (req, res, clientID) {
    return restUtil.authRest.get(
        {
            url: authorityRestApis.getSpecialList + "/" + clientID,
            req: req,
            res: res
        });
};

exports.getAuthorityGroupList = function (req, res, clientID) {
    return restUtil.authRest.get(
        {
            url: authorityRestApis.getAuthorityGroupList + "/" + clientID,
            req: req,
            res: res
        });
};

exports.editAuthorityGroupName = function (req, res, authorityGroup) {
    return restUtil.authRest.put(
        {
            url: authorityRestApis.editAuthorityGroupName + "/" + authorityGroup.classifyName,
            req: req,
            res: res
        },
        authorityGroup.authorityIDs,
        {
            success: function (eventEmitter, data) {
                //处理数据
                eventEmitter.emit("success", data);
            }
        });
};
exports.editAuthority = function (req, res, authority) {
    return restUtil.authRest.put(
        {
            url: authorityRestApis.editAuthority,
            req: req,
            res: res
        },
        authority,
        {
            success: function (eventEmitter, data) {
                //处理数据
                eventEmitter.emit("success", data);
            }
        });
};

exports.addAuthority = function (req, res, authoritys) {
    return restUtil.authRest.post(
        {
            url: authorityRestApis.addAuthority,
            req: req,
            res: res
        },
        authoritys,
        {
            success: function (eventEmitter, data) {
                //处理数据
                eventEmitter.emit("success", data);
            }
        });
};

