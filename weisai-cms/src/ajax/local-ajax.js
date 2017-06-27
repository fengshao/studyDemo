/**
 * Created by fengshao on 17-6-27.
 */
/**
 * Created by fengs on 2016/9/17.
 */
var locationHref = window.location.href.split("#")[0];
var intraUrl = "//topics-cms.intra.wesai.com/api/";
var develUrl = "//topics-cms.devel.wesai.com/api/";
var testUrl = "//topics-cms.test.wesai.com/api/";
// var localUrl = "//periphery.devel.wesai.com/api/";
var localUrl = "/api/";
var jinde = "//topics-cms.mjd.wesai.com/api/";
var noCacheUurlData = "?cacheOpen=11&pageSize=1000&channel=all";
var cacheUrlData = "?pageSize=1000&channel=all";

var parms = {
	editUrl: localUrl + "editSpecial",//post
	getListUrl: localUrl + "getSpecialList/",
	// + cacheUrlData, //get
	addUrl: localUrl + "addSpecial",//post
	delUrl: localUrl + "delSpecial",//get
	isloginUrl: localUrl + "isLogin",//get
	loginOut: localUrl + "logout",
	getSpecalTypeList: localUrl + "getSpecialTypeList?channel=1", //get
	getOperateLogList: localUrl + "getOperateLogList", //get
	editSpecialType: localUrl + "editSpecialType",
	getShareList: localUrl + "getShareList",
	addShare: localUrl + "addShare",
	editShare: localUrl + "editShare",
	getBackgroundList: localUrl + "getBackgroundList",
	addBackground: localUrl + "addBackground",
	editBackground: localUrl + "editBackground",
	specialDeploy: localUrl + "special_deploy",
	getGoodsTypeList: localUrl + "getGoodsTypeList",
	addGoodsType: localUrl + "addGoodsType",
	editGoodsType: localUrl + "editGoodsType",
	delGoodsType: localUrl + "delGoodsType",
	getGoodsList: localUrl + "getGoodsList",
	addGoods: localUrl + "addGoods",
	editGoods: localUrl + "editGoods",
	delGoods: localUrl + "delGoods",
	getActivityList: localUrl + "getActivityList",
	addActivity: localUrl + "addActivity",
	editActivity: localUrl + "editActivity",
	delActivity: localUrl + "delActivity",
	shelfActivity: localUrl + "shelfActivity",
	offShelfActivity: localUrl + "offShelfActivity",
	activityDeploy: localUrl + "activityDeploy",
	user_role: window.sessionStorage.getItem("user_role")
};

//typeId 1:品牌设置 2 主打活动 3 值得买 4 最鲜品 5 专题列表 6 搭配志 7 设计师推荐
exports.getSpecialList = function (typeID) {
	var Deferred = $.Deferred();
	// + '/' + parms.user_role
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + typeID,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.deleteSpecial = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.delUrl + "?id=" + data.id + "&type_id=" + data.type_id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.addSpecial = function (newaddData) {
	newaddData.channel_terminal = parms.user_role;
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addUrl,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editSpecial = function (newaddData) {
	newaddData.channel_terminal = parms.user_role;
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editUrl,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.userLogout = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.loginOut,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.userIsLogin = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.isloginUrl,
		"success": function (data) {
			Deferred.resolve(data && data.data ? data.data : "");
		},
		"error": function (data) {
			Deferred.resolve("");
		}
	});
	return Deferred.promise();
};

exports.getSpecalTypeList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getSpecalTypeList + "&channelTerminal=" + parms.user_role,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};
exports.getOperateLogList = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getOperateLogList + "?pageSize=" + data.per_page + "&page=" + data.current_page + "&order=" + data.field + "&sort=" + data.order + "&operateDateStart=" + data.operateDateStart + "&operateDateEnd=" + data.operateDateEnd + "&content=" + data.content + "&type=" + ( data.type ? data.type : ""),
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editSpecialType = function (newaddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editSpecialType,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getShareList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getShareList,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.addShare = function (newData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addShare,
		"data": newData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editShare = function (newData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editShare,
		"data": newData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getBackgroundList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getBackgroundList,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};

exports.addBackground = function (newaddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addBackground,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editBackground = function (newaddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editBackground,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.uploadAppHtml = function () {
	var data = {
		channelTerminal: parms.user_role,
		channel: 3
	}
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.specialDeploy,
		"data": data,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.uploadActiveHtml = function (data) {
	var data = {
		id: data.id
	}
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.activityDeploy,
		"data": data,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getGoodsTypeList = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getGoodsTypeList + "?pageSize=" + data.pageSize + "&page=" + data.current_page + "&order=" + data.order + "&sort=" + data.sort + "&title=" + data.content,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.addGoodsType = function (newAddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addGoodsType,
		"data": newAddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.editGoodsType = function (newEditData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editGoodsType,
		"data": newEditData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.delGoodsType = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.delGoodsType + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getGoodsList = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getGoodsList + "?pageSize=" + data.pageSize + "&page=" + data.current_page + "&order=" + data.order + "&sort=" + data.sort + "&title=" + data.content + "&type_id=" + data.type_id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.addGoods = function (newAddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addGoods,
		"data": newAddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.editGoods = function (newEditData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editGoods,
		"data": newEditData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.delGoods = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.delGoods + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.getActivityList = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getActivityList + "?pageSize=" + data.pageSize + "&page=" + data.current_page + "&order=" + data.order + "&sort=" + data.sort + "&title=" + data.content + "&start_time_start=" + data.start_time_start + "&start_time_end=" + data.start_time_end + "&end_time_start=" + data.end_time_start + "&end_time_end=" + data.end_time_end,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.addActivity = function (newAddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addActivity,
		"data": newAddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.editActivity = function (newEditData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editActivity,
		"data": newEditData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.delActivity = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.delActivity + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.shelfActivity = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.shelfActivity + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.offShelfActivity = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.offShelfActivity + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


var UserData = "";
//通过ajax获取
exports.getUserDataByAjax = function () {
	var deferred = $.Deferred();

	$.ajax({
		"type": "get",
		"url": parms.getSpecalTypeList + "&order=type_id&sort=asc&channelTerminal=" + parms.user_role,
		"success": function (data) {
			UserData = data;
			deferred.resolve(data);
		},
		"error": function (data) {
			deferred.resolve(data);
		}
	});

	return deferred.promise();
};

exports.getUserData = function () {
	var deferred = $.Deferred();
	deferred.resolve(UserData);
	return deferred.promise();
};

exports.getRouteData = function () {
	return UserData;
};

var publicParms = {
	url: '//storage.api.wesai.com/uploading',
	httpStr: '//storage.wesai.com/'
};

if (locationHref.indexOf("devel") != -1) {
	publicParms.httpStr = "http://storage-devel.wesai.com/";
	publicParms.url = '//10.2.2.25:8099/uploading';
} else if (locationHref.indexOf("test") != -1) {
	publicParms.httpStr = "http://storage-test.wesai.com/";
	publicParms.url = '//10.2.2.202:8099/uploading';
} else if (locationHref.indexOf("127.0.0.1") != -1) {
	publicParms.httpStr = "http://storage-devel.wesai.com/";
	publicParms.url = '//10.2.2.25:8099/uploading';
}
exports.publicParms = publicParms;