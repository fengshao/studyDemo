/**
 * Created by fengshao on 2017/1/22.
 */
var PublicAjax = require("../../../../../ajax/public-ajax");

function CommodityClassificationAction() {

	this.generateActions(
		'getGoodsTypeList',
		'addGoodsType',
		'editGoodsType',
		'delGoodsType',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom',
		'loadingFnc'
	);

	this.getGoodsTypeList = function (data) {
		var _this = this;
		var filtersData = {
			current_page: data && data.current_page ? data.current_page : 1,
			order: data && data.order ? data.order : "create_time",
			sort: data && data.sort ? data.sort.replace(/\Bend\b/g, "") : "desc",
			pageSize: data && data.per_page ? data.per_page : 10,
			content: data && data.content ? data.content : ""
		};
		PublicAjax.getGoodsTypeList(filtersData).then(function (list) {
			_this.dispatch({
				data: list,
				filtersData: filtersData
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.addGoodsType = function (newData) {
		var _this = this;
		PublicAjax.addGoodsType(newData).then(function (list) {
			_this.actions.getGoodsTypeList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editGoodsType = function (newData) {
		var _this = this;
		PublicAjax.editGoodsType(newData).then(function (list) {
			_this.actions.getGoodsTypeList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.delGoodsType = function (data) {
		var _this = this;
		var newData = {
			id: data.id
		};
		PublicAjax.delGoodsType(newData).then(function (data) {
			_this.dispatch({
				id: newData.id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(CommodityClassificationAction);