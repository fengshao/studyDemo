/**
 * Created by fengshao on 2016/11/7.
 */
var PublicAjax = require("../../../../ajax/public-ajax");

function OperateLogAction() {

	this.generateActions(
		'getOperateLogList',
		'loadingFnc'
	);

	this.getOperateLogList = function (data) {
		var _this = this;
		var filtersData = {
			current_page: data && data.current_page ? data.current_page : 1,
			field: data && data.field ? data.field : "operate_time",
			order: data && data.order ? data.order.replace(/\Bend\b/g, "") : "desc",
			per_page: data && data.per_page ? data.per_page : 10,
			operateDateStart: data && data.operateDateStart ? data.operateDateStart : "",
			operateDateEnd: data && data.operateDateEnd ? data.operateDateEnd : "",
			content: data && data.content ? data.content : ""
		};
		PublicAjax.getOperateLogList(filtersData).then(function (list) {
			_this.dispatch({
				data: list,
				filtersData: filtersData
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(OperateLogAction);