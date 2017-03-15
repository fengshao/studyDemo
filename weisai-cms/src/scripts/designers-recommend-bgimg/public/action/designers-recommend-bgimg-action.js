/**
 * Created by fengshao on 2016/11/25.
 */
var PublicAjax = require("../../../../ajax/public-ajax");

function DesignersRecBgImgAction() {

	this.generateActions(
		'getBackgroundDetail',
		'addBackground',
		'editBackground',
		'showAddFrom',
		'showEditFrom',
		'hideEditFrom',
		'getGoodsTypeList',
		'hideCommodityClassificationAddModal',
		'showCommodityClassificationAddModal',
		'selectGoodsTypeFnc',
		'commodityClassificationOrderUp',
		'commodityClassificationOrderDown',
		'commodityClassificationRemove'
	);

	this.getBackgroundList = function () {
		var _this = this;
		var filtersData = {
			current_page: 1,
			order: "create_time",
			sort: "desc",
			pageSize: 99999,
			content: ""
		};
		$.when(PublicAjax.getGoodsTypeList(filtersData), PublicAjax.getBackgroundList()).then(function (goodsTypeList, backgroundList) {
			_this.dispatch({
				goodsTypeList: goodsTypeList,
				backgroundList: backgroundList && backgroundList.data ? backgroundList.data[0] : ""
			});
		});
	};

	this.addBackground = function (newData) {
		var _this = this;
		PublicAjax.addBackground(newData).then(function (list) {
			//_this.dispatch(list);
			_this.actions.getBackgroundList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editBackground = function (newData) {
		var _this = this;
		PublicAjax.editBackground(newData).then(function (list) {
			//_this.dispatch(list);
			_this.actions.getBackgroundList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(DesignersRecBgImgAction);