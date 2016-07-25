/**
 * Created by xiaojinfeng on 2016/04/08.
 */
"use strict";

//var SalesTeamManageServic = require("../service/sales-team-manage-service");
var imageDatas = require("../data/imageDatas.json");

exports.getImageDatas = function (req, res) {
  console.log("imageDatas-->" + JSON.stringify(imageDatas));
  res.json({
    imageDatas: imageDatas
  });
};
