/**
 * Created by fengshao on 2016/11/22.
 * 活动列表页
 */
var TopNav = require("../../../component/top-nav");
var Table = require("../../../component/table-component");
var EditForm = require("../../../component/edit-form");
var DesignersRecStore = require("./store/designers-recommend-store");
var DesignersRecAction = require("./action/designers-recommend-action");
var ActivityModuleList = React.createClass({
	getInitialState: function () {
		var data = DesignersRecStore.getState();
		return data;
	},

	onChange: function () {
		var data = DesignersRecStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		DesignersRecStore.listen(this.onChange);
		DesignersRecAction.getDesignersRecList(this.props.location.query.type_id);
	},

	componentWillUnmount: function () {
		DesignersRecStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		deleteSpecialFnc: function (data) {
			DesignersRecAction.deleteSpecial(data);
		},
		showEditFrom: function (rowData) {
			DesignersRecAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			DesignersRecAction.showAddFrom();
		},
		addSpecial: function (newData) {
			DesignersRecAction.addSpecial(newData);
		},
		editSpecial: function (newData) {
			DesignersRecAction.editSpecial(newData);
		},
		hideEditFrom: function () {
			DesignersRecAction.hideEditFrom();
		}
	},

	render: function () {
		var typeNmae = this.props.location.query.type_name;
		var typeID = this.props.location.query.type_id;
		return (
			<div>
				<TopNav>
					<TopNav.MenuList/>
				</TopNav>
				<div className="right-content-bottom">
					{this.state.isShowEditFrom || this.state.isShowAddFrom ?
						(<EditForm
							hideEditFrom={this.events.hideEditFrom}
							addSpecial={this.events.addSpecial}
							editSpecial={this.events.editSpecial}
							allData={this.state.designersRecList}
							typeID={typeID}
							editRowData={this.state.editRowData}
						/>) : (
						<Table tableData={this.state.designersRecList} titleData={typeNmae}
							   deleteSpecialFnc={this.events.deleteSpecialFnc}
							   showEditFrom={this.events.showEditFrom}
							   showAddFrom={this.events.showAddFrom}
							   topNavHeight="60"
						/>)}
				</div>
			</div>
		);
	}
});

module.exports = ActivityModuleList;