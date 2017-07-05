/**
 * Created by xiaojinfeng on 2016/09/16.
 * 主打活动
 */
import {message} from 'antd';

var Table = require("../../../component/table-component");
var EditForm = require("../../../component/edit-form");
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
		MainActivityAction.getMainActivity(this.props.location.query.type_id);
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
		},
		deleteSpecialFnc: function (data) {
			MainActivityAction.deleteSpecial(data);
		},
		showEditFrom: function (rowData) {
			MainActivityAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			MainActivityAction.showAddFrom();
		},
		hideEditFrom: function () {
			MainActivityAction.hideEditFrom();
		}

	},

	render: function () {
		var typeNmae = this.props.location.query.type_name;
		var typeID = this.props.location.query.type_id;
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						addSpecial={this.events.addSpecial}
						editSpecial={this.events.editSpecial}
						allData={this.state.mainActivityList}
						typeID={typeID}
						editRowData={this.state.editRowData}
					/>) : (
					<Table tableData={this.state.mainActivityList} titleData={typeNmae+"（手机端只显示前六个）"}
						   deleteSpecialFnc={this.events.deleteSpecialFnc}
						   showEditFrom={this.events.showEditFrom}
						   showAddFrom={this.events.showAddFrom}
					/>)}
			</div>
		);
	}
});

module.exports = MainActivity;