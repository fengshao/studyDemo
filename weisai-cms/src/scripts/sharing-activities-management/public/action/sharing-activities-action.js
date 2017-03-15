/**
 * Created by fengshao on 2017/1/22.
 */
var PublicAjax = require("../../../../ajax/public-ajax");

function SharingActivitiesAction() {

	this.generateActions(
		'getActivityList',
		'addActivity',
		'editActivity',
		'delActivity',
		'offShelfActivity',
		'shelfActivity',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom',
		'hideCommodityClassificationAddModal',
		'showCommodityClassificationAddModal',
		'nextCurrent',
		'previousCurrent',
		'loadingFnc',
		'selectGoodsTypeFnc',
		'commodityClassificationOrderUp',
		'commodityClassificationOrderDown',
		'commodityClassificationRemove',
		'uploadHtml',
		'hideMessage',
		'showCopeModel'
	);

	this.uploadHtml = function (data) {
		var _this = this;
		PublicAjax.uploadActiveHtml(data).then(function (uplodeData) {
			_this.dispatch({
				data: uplodeData,
				id: data.id
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.getActivityList = function (data) {
		var _this = this;
		var filtersData = {
			current_page: data && data.current_page ? data.current_page : 1,
			order: data && data.order ? data.order : "update_time",
			sort: data && data.sort ? data.sort.replace(/\Bend\b/g, "") : "desc",
			pageSize: data && data.per_page ? data.per_page : 10,
			content: data && data.content ? data.content : "",
			start_time_start: data && data.start_time_start ? data.start_time_start : "",
			start_time_end: data && data.start_time_end ? data.start_time_end : "",
			end_time_start: data && data.end_time_start ? data.end_time_start : "",
			end_time_end: data && data.end_time_end ? data.end_time_end : ""
		};

		var goodsTypeFiltersData = {
			current_page: 1,
			order: "create_time",
			sort: "desc",
			pageSize: 99999,
			content: ""
		};

		$.when(PublicAjax.getActivityList(filtersData), PublicAjax.getGoodsTypeList(goodsTypeFiltersData)).then(function (activityList, goodsTypeList) {
			_this.dispatch({
				goodsTypeList: goodsTypeList,
				activityList: activityList,
				filtersData: filtersData
			});
		});

	};

	this.addActivity = function (newData) {
		var _this = this;
		PublicAjax.addActivity(newData).then(function (list) {
			_this.actions.getActivityList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editActivity = function (newData) {
		var _this = this;
		PublicAjax.editActivity(newData).then(function (list) {
			_this.actions.getActivityList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.delActivity = function (data) {
		var _this = this;
		var newData = {
			id: data.id
		}
		PublicAjax.delActivity(newData).then(function (data) {
			_this.dispatch({
				id: newData.id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.offShelfActivity = function (data) {
		var _this = this;
		var newData = {
			id: data.id
		}
		PublicAjax.offShelfActivity(newData).then(function (data) {
			_this.dispatch({
				id: newData.id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.shelfActivity = function (data) {
		var _this = this;
		var newData = {
			id: data.id
		}
		PublicAjax.shelfActivity(newData).then(function (data) {
			_this.dispatch({
				id: newData.id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(SharingActivitiesAction);