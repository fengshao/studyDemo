
"use strict";

var Authority = require("../dto/brand-setting");
var uuid = require(require("path").join(portal_root_path, "lib/utils/uuid"));
var authorityManageServic = require("../service/brand-setting-service");
/*
 * list authority handler.
 */
exports.getSpecialList = function (req, res) {
    var typeID = req.params.typeID;
    authorityManageServic.getSpecialList(req, res, typeID)
        .on("success", function (data) {
            res.status(200).json(data);
        }).on("error", function (codeMessage) {
        res.status(500).json(codeMessage && codeMessage.message);
    });
};

exports.getAuthorityGroupList = function (req, res) {
    var clientID = req.params.clientID;
    authorityManageServic.getAuthorityGroupList(req, res, clientID)
        .on("success", function (data) {
            res.status(200).json(data);
        }).on("error", function (codeMessage) {
        res.status(500).json(codeMessage && codeMessage.message);
    });
};

//修改权限分组名称
exports.editAuthorityGroupName = function (req, res) {

    var authorityGroup = {
        classifyName: req.body.classifyName,
        authorityIDs: req.body.authorityIDs ? req.body.authorityIDs.split(",") : []
    };
    authorityManageServic.editAuthorityGroupName(req, res, authorityGroup)
        .on("success", function (data) {
            res.json(data);
        }).on("error", function (codeMessage) {
            res.status(500).json(codeMessage && codeMessage.message);
        }
    );
};

/**
 * add authority handler
 */
exports.addAuthority = function (req, res) {
    //var permissionName = req.body.permissionName;
    //var permissionDefine = req.body.permissionDefine;
    //var authorityRemarks = req.body.authorityRemarks;
    //var permissionId = new Date().getTime();
    //var newAuthority = new Authority({
    //    id: uuid(),
    //    permissionName: permissionName,
    //    permissionId: permissionId,
    //    permissionDefine: permissionDefine,
    //    authorityRemarks: authorityRemarks
    //});
    //authorityList.push(newAuthority);
    //res.json(newAuthority);

    authorityManageServic.addAuthority(req, res, req.body)
        .on("success", function (data) {
            res.json(data);
        }).on("error", function (codeMessage) {
            res.status(500).json(codeMessage && codeMessage.message);
        }
    );

};
/**
 * edit authority handler
 */
exports.editAuthority = function (req, res) {
    //var id = req.body.id;
    //var permissionName = req.body.permissionName;
    //var permissionDefine = req.body.permissionDefine;
    //var permissionId = req.body.permissionId;
    //var authorityRemarks = req.body.authorityRemarks;
    //
    //var target = authorityList.find(function (item) {
    //    return item.id === id;
    //});
    //
    //if (target) {
    //    target.permissionName = permissionName;
    //    target.permissionDefine = permissionDefine;
    //    target.authorityRemarks = authorityRemarks;
    //    target.permissionId = permissionId;
    //}
    //res.json(target);

    var permissionApisKey = req.body.permissionApisKey;
    var permissionApisVal = req.body.permissionApisVal;
    var permissionApis = {};
    permissionApis[permissionApisKey] = permissionApisVal;
    var authority = {
        permissionId: req.body.permissionId,
        permissionName: req.body.permissionName,
        permissionDefine: req.body.permissionDefine,
        permissionApis: permissionApis,
        classifyName: req.body.classifyName
    };

    authorityManageServic.editAuthority(req, res, authority)
        .on("success", function (data) {
            res.json(data);
        }).on("error", function (codeMessage) {
            res.json(codeMessage && codeMessage.message);
        }
    );

};

/**
 * delete authority handler
 */

exports.deleteAuthority = function (req, res) {
    var id = req.params.id, idx = -1;
    authorityList.find(function (item, i) {
        if (item.id === id) {
            idx = i;
            return true;
        }
    });
    if (idx >= 0) {
        authorityList.splice(idx, 1);
    }
    res.send("ok");
};

