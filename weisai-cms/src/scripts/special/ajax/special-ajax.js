/**
 * Created by fengs on 2016/9/16.
 */
exports.getSpecialList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": 'http://han.wesai.com/api/getSpecialList?typeId=&cacheOpen=11&pageSize=1000',
		"success": function (data) {
			console.log(data);
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};