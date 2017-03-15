/**
 * Created by fengs on 2016/9/17.
 */
var locationHref = window.location.href.split("#")[0];
var intraUrl = "//topics-cms.intra.wesai.com/api/";
var develUrl = "//topics-cms.devel.wesai.com/api/";
var testUrl = "//topics-cms.test.wesai.com/api/";
var localUrl = "//periphery.devel.wesai.com/api/";
var jinde = "//topics-cms.mjd.wesai.com/api/";
var noCacheUurlData = "?cacheOpen=11&pageSize=1000&channel=all";
var cacheUrlData = "?pageSize=1000&channel=all";

var parms = {
	editUrl: intraUrl + "editSpecial",//post
	getListUrl: intraUrl + "getSpecialList" + cacheUrlData, //get
	addUrl: intraUrl + "addSpecial",//post
	delUrl: intraUrl + "delSpecial",//get
	isloginUrl: intraUrl + "isLogin",//get
	loginOut: intraUrl + "logout",
	getSpecalTypeList: intraUrl + "getSpecialTypeList?channel=1", //get
	getOperateLogList: intraUrl + "getOperateLogList", //get
	editSpecialType: intraUrl + "editSpecialType",
	getShareList: intraUrl + "getShareList",
	addShare: intraUrl + "addShare",
	editShare: intraUrl + "editShare",
	getBackgroundList: intraUrl + "getBackgroundList",
	addBackground: intraUrl + "addBackground",
	editBackground: intraUrl + "editBackground",
	specialDeploy: intraUrl + "special_deploy",
	getGoodsTypeList: intraUrl + "getGoodsTypeList",
	addGoodsType: intraUrl + "addGoodsType",
	editGoodsType: intraUrl + "editGoodsType",
	delGoodsType: intraUrl + "delGoodsType",
	getGoodsList: intraUrl + "getGoodsList",
	addGoods: intraUrl + "addGoods",
	editGoods: intraUrl + "editGoods",
	delGoods: intraUrl + "delGoods",
	getActivityList: intraUrl + "getActivityList",
	addActivity: intraUrl + "addActivity",
	editActivity: intraUrl + "editActivity",
	delActivity: intraUrl + "delActivity",
	shelfActivity: intraUrl + "shelfActivity",
	offShelfActivity: intraUrl + "offShelfActivity",
	activityDeploy: intraUrl + "activityDeploy",
	user_role: window.sessionStorage.getItem("user_role")
};
if (locationHref.indexOf("devel") != -1) {
	parms.editUrl = develUrl + "editSpecial";//post
	parms.getListUrl = develUrl + "getSpecialList" + cacheUrlData; //get
	parms.addUrl = develUrl + "addSpecial";//post
	parms.delUrl = develUrl + "delSpecial";//get
	parms.isloginUrl = develUrl + "isLogin";//get
	parms.loginOut = develUrl + "logout";//get
	parms.getSpecalTypeList = develUrl + "getSpecialTypeList?channel=1";//get
	parms.getOperateLogList = develUrl + "getOperateLogList";//get
	parms.editSpecialType = develUrl + "editSpecialType";
	parms.getShareList = develUrl + "getShareList";
	parms.addShare = develUrl + "addShare";
	parms.editShare = develUrl + "editShare";
	parms.getBackgroundList = develUrl + "getBackgroundList";
	parms.addBackground = develUrl + "addBackground";
	parms.editBackground = develUrl + "editBackground";
	parms.specialDeploy = develUrl + "special_deploy";
	parms.getGoodsTypeList = develUrl + "getGoodsTypeList";
	parms.addGoodsType = develUrl + "addGoodsType";
	parms.editGoodsType = develUrl + "editGoodsType";
	parms.delGoodsType = develUrl + "delGoodsType";
	parms.getGoodsList = develUrl + "getGoodsList";
	parms.addGoods = develUrl + "addGoods";
	parms.editGoods = develUrl + "editGoods";
	parms.delGoods = develUrl + "delGoods";
	parms.getActivityList = develUrl + "getActivityList";
	parms.addActivity = develUrl + "addActivity";
	parms.editActivity = develUrl + "editActivity";
	parms.delActivity = develUrl + "delActivity";
	parms.shelfActivity = develUrl + "shelfActivity";
	parms.offShelfActivity = develUrl + "offShelfActivity";
	parms.activityDeploy = develUrl + "activityDeploy";
} else if (locationHref.indexOf("test") != -1) {
	parms.editUrl = testUrl + "editSpecial";//post
	parms.getListUrl = testUrl + "getSpecialList" + cacheUrlData; //get
	parms.addUrl = testUrl + "addSpecial";//post
	parms.delUrl = testUrl + "delSpecial";//get
	parms.isloginUrl = testUrl + "isLogin";//get
	parms.loginOut = testUrl + "logout";//get
	parms.getSpecalTypeList = testUrl + "getSpecialTypeList?channel=1";//get
	parms.getOperateLogList = testUrl + "getOperateLogList";//get
	parms.editSpecialType = testUrl + "editSpecialType";
	parms.getShareList = testUrl + "getShareList";
	parms.addShare = testUrl + "addShare";
	parms.editShare = testUrl + "editShare";
	parms.getBackgroundList = testUrl + "getBackgroundList";
	parms.addBackground = testUrl + "addBackground";
	parms.editBackground = testUrl + "editBackground";
	parms.specialDeploy = testUrl + "special_deploy";
	parms.getGoodsTypeList = testUrl + "getGoodsTypeList";
	parms.addGoodsType = testUrl + "addGoodsType";
	parms.editGoodsType = testUrl + "editGoodsType";
	parms.delGoodsType = testUrl + "delGoodsType";
	parms.getGoodsList = testUrl + "getGoodsList";
	parms.addGoods = testUrl + "addGoods";
	parms.editGoods = testUrl + "editGoods";
	parms.delGoods = testUrl + "delGoods";
	parms.getActivityList = testUrl + "getActivityList";
	parms.addActivity = testUrl + "addActivity";
	parms.editActivity = testUrl + "editActivity";
	parms.delActivity = testUrl + "delActivity";
	parms.shelfActivity = testUrl + "shelfActivity";
	parms.offShelfActivity = testUrl + "offShelfActivity";
	parms.activityDeploy = testUrl + "activityDeploy";
} else if (locationHref.indexOf("127.0.0.1") != -1) {
	parms.editUrl = localUrl + "editSpecial";//post
	parms.getListUrl = localUrl + "getSpecialList" + cacheUrlData; //get
	parms.addUrl = localUrl + "addSpecial";//post
	parms.delUrl = localUrl + "delSpecial";//get
	parms.isloginUrl = localUrl + "isLogin";//get
	parms.loginOut = localUrl + "logout";//get
	parms.getSpecalTypeList = localUrl + "getSpecialTypeList?channel=1";//get
	parms.getOperateLogList = localUrl + "getOperateLogList";//get
	parms.editSpecialType = localUrl + "editSpecialType";
	parms.getShareList = localUrl + "getShareList";
	parms.addShare = localUrl + "addShare";
	parms.editShare = localUrl + "editShare";
	parms.getBackgroundList = localUrl + "getBackgroundList";
	parms.addBackground = localUrl + "addBackground";
	parms.editBackground = localUrl + "editBackground";
	parms.specialDeploy = localUrl + "special_deploy";
	parms.getGoodsTypeList = localUrl + "getGoodsTypeList";
	parms.addGoodsType = localUrl + "addGoodsType";
	parms.editGoodsType = localUrl + "editGoodsType";
	parms.delGoodsType = localUrl + "delGoodsType";
	parms.getGoodsList = localUrl + "getGoodsList";
	parms.addGoods = localUrl + "addGoods";
	parms.editGoods = localUrl + "editGoods";
	parms.delGoods = localUrl + "delGoods";
	parms.getActivityList = localUrl + "getActivityList";
	parms.addActivity = localUrl + "addActivity";
	parms.editActivity = localUrl + "editActivity";
	parms.delActivity = localUrl + "delActivity";
	parms.shelfActivity = localUrl + "shelfActivity";
	parms.offShelfActivity = localUrl + "offShelfActivity";
	parms.activityDeploy = localUrl + "activityDeploy";
}

//typeId 1:品牌设置 2 主打活动 3 值得买 4 最鲜品 5 专题列表 6 搭配志 7 设计师推荐
exports.getSpecialList = function (typeID) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + '&typeId=' + typeID + '&channelTerminal=' + parms.user_role,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
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