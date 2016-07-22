/**
 * Created by xiaojinfeng on 2016/04/08.
 */
"use strict";

/**
 * 请求路径 - login
 */

module.exports = {
  module: "demo1/server/action/sales-team-controller1",
  routes: [{
    "method": "get",
    "path": "/rest/getImageDatas",
    "handler": "getImageDatas",
    "passport": {
      "needLogin": true
    }
  }]
};
