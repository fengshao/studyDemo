/**
 * Created by fengshao on 2017/1/22.
 */
var TopNav = require("../../../component/top-nav");
var Table = require("./view/operate-log-table");
var SharingActivitiesLogAction = require("./action/sharing-activities-log-action");
var SharingActivitiesLogStore = require("./store/sharing-activities-log-store");
var SharingActivitiesLog = React.createClass({
	getInitialState: function () {
		var data = SharingActivitiesLogStore.getState();
		return data;
	},

	onChange: function () {
		var data = SharingActivitiesLogStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		SharingActivitiesLogStore.listen(this.onChange);
		SharingActivitiesLogAction.getSharingActivitiesLogList();
	},

	componentWillUnmount: function () {
		SharingActivitiesLogStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		getSharingActivitiesLogList: function (data) {
			SharingActivitiesLogAction.getSharingActivitiesLogList(data);
		},
		loadingFnc: function () {
			SharingActivitiesLogAction.loadingFnc();
		}
	},

	render: function () {
		return (
			<div>
				<TopNav>
					<TopNav.MenuList/>
				</TopNav>
				<div className="right-content-bottom">
					<Table tableData={this.state.sharingActivitiesLogList} titleData={"日志列表"}
						   pagination={this.state.pagination}
						   loading={this.state.loading}
						   filtersData={this.state.filtersData}
						   getSharingActivitiesLogList={this.events.getSharingActivitiesLogList}
						   loadingFnc={this.events.loadingFnc}
					/>
				</div>
			</div>
		);
	}
});

module.exports = SharingActivitiesLog;