/**
 * Created by xiaojinfeng on 2016/09/16.
 * 主打活动
 */
var EditForm = require("../../component/edit-form");
var MainActivityStore = require("./store/main-activity-store");
var MainActivityAction = require("./action/main-activity-action");
var MainActivity = React.createClass({
	getInitialState: function () {
		var data = MainActivityStore.getState();
		return data;
	},

	onChange: function () {
		var data = MainActivityStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		MainActivityStore.listen(this.onChange);
		MainActivityAction.getMainActivity();
	},

	componentWillUnmount: function () {
		MainActivityStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		addSpecial: function (newData) {
			MainActivityAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			MainActivityAction.editSpecial(newData);
		}
	},

	render: function () {
		return (
			<div>
				<EditForm
					addSpecial={this.events.addSpecial}
					editSpecial={this.events.editSpecial}
					editRowData={this.state.mainActivity}
					isNotShowCancelBtn={true}
				/>
			</div>
		);
	}
});

module.exports = MainActivity;