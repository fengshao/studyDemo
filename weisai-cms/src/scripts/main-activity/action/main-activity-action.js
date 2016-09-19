/**
 * Created by fengs on 2016/9/16.
 */
var PublicAjax = require("../../../ajax/public-ajax");

function MainActivityAction() {

	this.generateActions(
		'getMainActivityList',
		'addSpecial',
		'editSpecial'
	);

	this.getMainActivity = function () {
		var _this = this;
		PublicAjax.getMainActivity().then(function (list) {
			_this.dispatch(list.data[0]);
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.addSpecial = function (newData) {
		var _this = this;
		newData.type_id = "2";
		PublicAjax.addSpecial(newData).then(function (list) {
			_this.actions.getMainActivity();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecial = function (newData) {
		var _this = this;
		PublicAjax.editSpecial(newData).then(function (list) {
			_this.actions.getMainActivity();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(MainActivityAction);