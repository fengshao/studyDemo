/**
 * Created by fengshao on 2016/7/22.
 */
exports.getImageDatas = function () {
  var Deferred = $.Deferred();
  $.ajax({
    url: '/rest/getImageDatas',
    dataType: 'json',
    type: 'get',
    success: function (list) {
      Deferred.resolve(list);
    }
  });
  return Deferred.promise();
};
