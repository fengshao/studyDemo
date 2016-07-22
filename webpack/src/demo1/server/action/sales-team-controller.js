/**
 * Created by xiaojinfeng on 2016/04/08.
 */
"use strict";

var SalesTeamManageServic = require("../service/sales-team-manage-service");

exports.getImageDatas = function (req, res) {
  SalesTeamManageServic.getImageDatas(req, res)
    .on("success", function (data) {
      res.status(200).json(data);
    }).on("error", function (codeMessage) {
    res.status(500).json(codeMessage && codeMessage.message);
  });
};

