/**
 * Created by fengs on 2016/9/16.
 */
var MainActivityAction = require("../action/main-activity-action");

function MainActivityStore() {
	this.mainActivity = {
		title: "",
		sort: "",
		id: "",
		url: "",
		img: ""
	};
	this.bindActions(MainActivityAction);
}

MainActivityStore.prototype.getMainActivity = function (mainActivity) {
	this.mainActivity = mainActivity ? mainActivity : this.mainActivity;
};

MainActivityStore.prototype.addSpecial = function () {
};

MainActivityStore.prototype.editSpecial = function () {
};

module.exports = alt.createStore(MainActivityStore, 'MainActivityStore');