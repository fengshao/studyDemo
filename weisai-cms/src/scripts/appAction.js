/**
 * Created by fengshao on 2016/9/18.
 */
var PublicAjax = require("../ajax/public-ajax");

function AppAction() {

	this.generateActions(
		'userIsLogin'
	);

	this.getUserIsLogin = function () {
		var _this = this;
		PublicAjax.userIsLogin().then(function (data) {
			_this.dispatch(data.error ? data.error : 1);
		}, function (errorMsg) {
			_this.dispatch(1);
		});
	};

}
module.exports = alt.createActions(AppAction);