/**
 * Created by fengs on 2016/9/16.
 */
var FirstProductAjax = require("../ajax/first-product-ajax");

function FirstProductAction() {

	this.generateActions(
		'getFirstProductList'
	);

	this.getFirstProductList = function () {
		var _this = this;
		FirstProductAjax.getFirstProductList().then(function (list) {
			_this.dispatch(list.data);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(FirstProductAction);