/**
 * Created by fengs on 2016/9/17.
 */
var locationHref = window.location.href.split("#")[0];
var parms = {
	editUrl: "http://han.devel.wesai.com/api/editSpecial",//post
	getListUrl: "http://han.devel.wesai.com/api/getSpecialList", //get
	addUrl: "http://han.devel.wesai.com/api/addSpecial",//post
	delUrl: "http://han.devel.wesai.com/api/delSpecial",//get
	isloginUrl: "http://han.devel.wesai.com/api/isLogin"//get
};
if (locationHref.indexOf("devel") != -1) {
	parms.editUrl = "http://han.devel.wesai.com/api/editSpecial";//post
	parms.getListUrl = "http://han.devel.wesai.com/api/getSpecialList"; //get
	parms.addUrl = "http://han.devel.wesai.com/api/addSpecial";//post
	parms.delUrl = "http://han.devel.wesai.com/api/delSpecial";//get
	parms.isloginUrl = "http://han.devel.wesai.com/api/isLogin";//get
} else if (locationHref.indexOf("test") != -1) {
	parms.editUrl = "http://han.test.wesai.com/api/editSpecial";//post
	parms.getListUrl = "http://han.test.wesai.com/api/getSpecialList"; //get
	parms.addUrl = "http://han.test.wesai.com/api/addSpecial";//post
	parms.delUrl = "http://han.test.wesai.com/api/delSpecial";//get
	parms.isloginUrl = "http://han.test.wesai.com/api/isLogin";//get
}

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