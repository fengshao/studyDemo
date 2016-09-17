/**
 * Created by fengs on 2016/9/16.
 */

var SpecialAjax = require("../ajax/special-ajax");
var PublicAjax = require("../../../ajax/public-ajax.js");

function SpecialAction() {

	this.generateActions(
		'getSpecialList',
		'deleteSpecial',
		'showEditFrom',
		'hideEditFrom'
	);

	this.getSpecialList = function () {
		var _this = this;
		SpecialAjax.getSpecialList().then(function (list) {
			_this.dispatch(list);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
	this.deleteSpecial = function (id) {
		var _this = this;
		PublicAjax.deleteSpecial(id).then(function (data) {
			_this.dispatch({
				id: id,
				data: data
			});
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};
}
module.exports = alt.createActions(SpecialAction);