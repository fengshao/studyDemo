/**
 * Created by fengshao on 2016/9/18.
 */
var AppAction = require("./appAction");
function AppStore() {
	this.userIsLoginFlag = "1";
	this.bindActions(AppAction);
}

AppStore.prototype.getUserIsLogin = function (userIsLogin) {
	this.userIsLoginFlag = userIsLogin;
};

module.exports = alt.createStore(AppStore, 'AppStore');