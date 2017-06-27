
"use strict";

/**
 * 请求路径 - login
 */

module.exports = {
    module: "brand-setting/server/action/brand-setting-controller",
    routes: [{
        "method": "get",
        "path": "/api/getSpecialList/:typeID",
        "handler": "getSpecialList",
        "passport": {
            "needLogin": true
        }
    }, {
        "method": "get",
        "path": "/rest/getAuthorityGroupList/:clientID",
        "handler": "getAuthorityGroupList",
        "passport": {
            "needLogin": true
        }
    }, {
        "method": "put",
        "path": "/rest/editAuthorityGroupName",
        "handler": "editAuthorityGroupName",
        "passport": {
            "needLogin": true
        }
    }, {
        "method": "post",
        "path": "/rest/addAuthority",
        "handler": "addAuthority",
        "passport": {
            "needLogin": true
        }
    }, {
        "method": "put",
        "path": "/rest/editAuthority",
        "handler": "editAuthority",
        "passport": {
            "needLogin": true
        }
    }, {
        "method": "delete",
        "path": "/rest/authority/:id",
        "handler": "deleteAuthority",
        "passport": {
            "needLogin": true
        }
    }]
};