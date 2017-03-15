/**
 * Created by fengshao on 2017/1/22.
 */
var PublicAjax = require("../../../../ajax/public-ajax");

function CommodityManagementAction() {

	this.generateActions(
		'getGoodsList',
		'addGoods',
		'editGoods',
		'delGoods',
		'showEditFrom',
		'showAddFrom',
		'hideEditFrom',
		'loadingFnc'
	);

	this.getGoodsList = function (data) {
		var _this = this;
		var filtersData = {
			current_page: data && data.current_page ? data.current_page : 1,
			order: data && data.order ? data.order : "create_time",
			sort: data && data.sort ? data.sort.replace(/\Bend\b/g, "") : "desc",
			pageSize: data && data.per_page ? data.per_page : 10,
			content: data && data.content ? data.content : "",
			type_id: data && data.type_id ? data.type_id : ""
		};

		var goodsTypeFiltersData = {
			current_page: 1,
			order: "create_time",
			sort: "desc",
			pageSize: 99999,
			content: ""
		};

		$.when(PublicAjax.getGoodsList(filtersData), PublicAjax.getGoodsTypeList(goodsTypeFiltersData)).then(function (goodsList, goodsTypeList) {
			_this.dispatch({
				goodsList: goodsList,
				goodsTypeList: goodsTypeList,
				filtersData: filtersData
			});
		});

	};

	this.addGoods = function (newData) {

		var _this = this;
		PublicAjax.addGoods(newData).then(function (list) {
			_this.actions.getGoodsList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editGoods = function (newData) {
		var _this = this;
		PublicAjax.editGoods(newData).then(function (list) {
			_this.actions.getGoodsList();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.delGoods = function (data) {
		var _this = this;
		var newData = {
			id: data.id
		}
		PublicAjax.delGoods(newData).then(function (data) {
			_this.dispatch({
				id: newData.id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(CommodityManagementAction);