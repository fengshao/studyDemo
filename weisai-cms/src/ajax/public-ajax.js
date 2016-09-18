/**
 * Created by fengs on 2016/9/17.
 */
var locationHref = window.location.href.split("#")[0];
var parms = {
	editUrl: "http://han.wesai.com/api/editSpecial",//post
	getListUrl: "http://han.wesai.com/api/getSpecialList", //get
	addUrl: "http://han.wesai.com/api/addSpecial",//post
	delUrl: "http://han.wesai.com/api/delSpecial",//get
	isloginUrl: "http://han.wesai.com/api/isLogin",//get
	loginOut: "http://han.wesai.com/api/userLogout"
};
if (locationHref.indexOf("devel") != -1) {
	parms.editUrl = "http://han.devel.wesai.com/api/editSpecial";//post
	parms.getListUrl = "http://han.devel.wesai.com/api/getSpecialList"; //get
	parms.addUrl = "http://han.devel.wesai.com/api/addSpecial";//post
	parms.delUrl = "http://han.devel.wesai.com/api/delSpecial";//get
	parms.isloginUrl = "http://han.devel.wesai.com/api/isLogin";//get
	parms.loginOut = "http://han.devel.wesai.com/api/userLogout";//get
} else if (locationHref.indexOf("test") != -1) {
	parms.editUrl = "http://han.test.wesai.com/api/editSpecial";//post
	parms.getListUrl = "http://han.test.wesai.com/api/getSpecialList"; //get
	parms.addUrl = "http://han.test.wesai.com/api/addSpecial";//post
	parms.delUrl = "http://han.test.wesai.com/api/delSpecial";//get
	parms.isloginUrl = "http://han.test.wesai.com/api/isLogin";//get
	parms.loginOut = "http://han.test.wesai.com/api/userLogout";//get
}

exports.getBrandList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + '?typeId=1&cacheOpen=11&pageSize=1000',
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};

exports.getMainActivity = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + '?typeId=2&cacheOpen=11&pageSize=1000',
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};

exports.getWorthBuyingList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + '?typeId=3&cacheOpen=11&pageSize=1000',
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};

exports.getFirstProductList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + '?typeId=4&cacheOpen=11&pageSize=1000',
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};

exports.getSpecialList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getListUrl + '?typeId=5&cacheOpen=11&pageSize=1000',
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.deleteSpecial = function (id) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.delUrl + "?id=" + id,
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

exports.userLogout = function (newaddData) {
	var Deferred = $.Deferred();
	var user = window.sessionStorage.getItem("user");
	$.ajax({
		"type": "get",
		"url": parms.loginOut + '?user=' + user,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.userIsLogin = function (newaddData) {
	var Deferred = $.Deferred();
	var user = window.sessionStorage.getItem("user");
	if (user) {
		$.ajax({
			"type": "get",
			"url": parms.isloginUrl + '?user=' + user,
			"success": function (data) {
				Deferred.resolve(data ? data.error : 1);
			},
			"error": function (data) {
				Deferred.resolve(1);
			}
		});
	} else {
		Deferred.resolve(1);
	}
	return Deferred.promise();
};