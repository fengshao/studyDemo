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
		newData.img = "http://devel-10016962.file.myqcloud.com/9/c81/3af2e/9c81e3af2e0b0ae7d1fd6a3d7891ad09.jpg";
		PublicAjax.addSpecial(newData).then(function (list) {
			_this.actions.getMainActivity();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

	this.editSpecial = function (newData) {
		var _this = this;
		newData.img = newData.img ? newData.img : "http://devel-10016962.file.myqcloud.com/9/c81/3af2e/9c81e3af2e0b0ae7d1fd6a3d7891ad09.jpg";
		PublicAjax.editSpecial(newData).then(function (list) {
			_this.actions.getMainActivity();
		}, function (errorMsg) {
			_this.dispatch(errorMsg);
		});
	};

}
module.exports = alt.createActions(MainActivityAction);