/**
 * Created by xiaojinfeng on 2016/09/16.
 * 主打活动
 */
var MainActivityStore = require("./store/main-activity-store");
var MainActivityAction = require("./action/main-activity-action");
var MainActivity = React.createClass({
	render: function () {
		return (
			<div>我是主打活动页面</div>
		);
	}
});

module.exports = MainActivity;