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

exports.getSpecialList = function () {
	var Deferred = $.Deferred();
	// $.ajax({
	// 	"type": "get",
	// 	"url": 'http://han.wesai.com/api/getSpecialList?typeId=&cacheOpen=11&pageSize=1000',
	// 	"success": function (data) {
	Deferred.resolve(tsetData);
	// },
	// "error": function (data) {
	// 	Deferred.resolve(data);
	// }
	// });
	return Deferred.promise();
};