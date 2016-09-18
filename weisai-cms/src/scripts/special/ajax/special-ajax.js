/**
 * Created by fengs on 2016/9/16.
 */

var tsetData = [
	{
		"id": 1,
		"type_id": 1,
		"title": "测试专题-1",
		"title_en": "test special 1",
		"description": "测试用的测试用的",
		"url": "www.wesai.com",
		"img": "http://img.wesai.com/0102000057d8b2960000142aeec6a65e.jpg",
		"sort": 0,
		"status": 0,
		"create_time": 1472437386,
		"update_time": "2016-08-30 14:54:08"
	},
	{
		"id": 2,
		"type_id": 1,
		"title": "测试专题-2",
		"title_en": "test special 2",
		"description": "测试专题用例2",
		"url": "www.baidu.com",
		"img": "http://img.wesai.com/0102000057d8b2960000142aeec6a65e.jpg",
		"sort": 0,
		"status": 0,
		"create_time": 1472438650,
		"update_time": "2016-08-31 16:05:26"
	},
	{
		"id": 3,
		"type_id": 2,
		"title": "测试专题-3",
		"title_en": "test special 3",
		"description": "2分类的测试专题",
		"url": "www.sina.com",
		"img": "http://img.wesai.com/0102000057d8b2960000142aeec6a65e.jpg",
		"sort": 0,
		"status": 0,
		"create_time": 1472525176,
		"update_time": "0000-00-00 00:00:00"
	},
	{
		"id": 4,
		"type_id": 1,
		"title": "aaaaaaaaa",
		"title_en": null,
		"description": null,
		"url": "www.jd.com",
		"img": "http://img.wesai.com/0102000057d8b2960000142aeec6a65e.jpg",
		"sort": 0,
		"status": 0,
		"create_time": 1472543533,
		"update_time": "0000-00-00 00:00:00"
	},
	{
		"id": 5,
		"type_id": 1,
		"title": "afasfdsaf",
		"title_en": null,
		"description": null,
		"url": "afdsasfas",
		"img": "http://img.wesai.com/0102000057d8b29500001408fbe8eca5.jpg",
		"sort": 0,
		"status": 0,
		"create_time": 1472544986,
		"update_time": "2016-08-31 16:05:24"
	}
];

var locationHref = window.location.href.split("#")[0];
var parms = {
	editUrl: "http://han.wesai.com/api/editSpecial",//post
	getListUrl: "http://han.devel.wesai.com/api/getSpecialList", //get
	addUrl: "http://han.wesai.com/api/addSpecial",//post
	delUrl: "http://han.wesai.com/api/delSpecial",//get
	isloginUrl: "http://han.wesai.com/api/isLogin"//get
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