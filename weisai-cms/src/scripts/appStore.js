/**
 * Created by fengshao on 2016/9/18.
 */
var AppAction = require("./appAction");
function AppStore() {
	this.userIsLogin = 0;
	this.bindActions(AppAction);
}

AppStore.prototype.getUserIsLogin = function (userIsLogin) {
	this.userIsLogin = userIsLogin;
};

module.exports = alt.createStore(AppStore, 'AppStore');