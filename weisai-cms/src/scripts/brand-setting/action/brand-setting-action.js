/**
 * Created by fengs on 2016/9/16.
 */

var BrandSettingAjax = require("../ajax/brand-setting-ajax");

function BrandSettingAction() {

	this.generateActions(
		'getBrandList'
	);

	this.getBrandList = function () {
		var _this = this;
		BrandSettingAjax.getBrandList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(BrandSettingAction);