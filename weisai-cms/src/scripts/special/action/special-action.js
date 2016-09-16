/**
 * Created by fengs on 2016/9/16.
 */

var SpecialAjax = require("../ajax/special-ajax.js");

function SpecialAction() {

	this.generateActions(
		'getBrandList'
	);

	this.getSpecialList = function () {
		var _this = this;
		BrandSettingAjax.getSpecialList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(SpecialAction);