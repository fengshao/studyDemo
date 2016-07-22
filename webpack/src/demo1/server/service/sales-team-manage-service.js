/**
 * Created by xiaojinfeng on 2016/04/08.
 */
"use strict";
var restLogger = require("../../../../lib/utils/logger").getLogger('rest');
var restUtil = require("../../../../lib/rest/rest-util")(restLogger);
var salesTeamRestApis = {
  addGroup: "/rest/oplate/v1/group"
};
exports.urls = salesTeamRestApis;

exports.getSalesTeamList = function (req, res) {
  return restUtil.authRest.get(
    {
      url: salesTeamRestApis.getSalesTeamList,
      req: req,
      res: res
    });
};
