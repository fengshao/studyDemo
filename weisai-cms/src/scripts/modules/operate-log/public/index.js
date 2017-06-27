/**
 * Created by fengshao on 2016/11/7.
 */
var Table = require("./view/operate-log-table");
var OperateLogStore = require("./store/operate-log-store");
var OperateLogAction = require("./action/operate-log-action");
var OperateLog = React.createClass({

	getInitialState: function () {
		var data = OperateLogStore.getState();
		return data;
	},

	onChange: function () {
		var data = OperateLogStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		OperateLogStore.listen(this.onChange);
		OperateLogAction.getOperateLogList();
	},

	componentWillUnmount: function () {
		OperateLogStore.unlisten(this.onChange);
		alt.flush();
	},
	events: {
		getOperateLogList: function (data) {
			OperateLogAction.getOperateLogList(data);
		},
		loadingFnc: function () {
			OperateLogAction.loadingFnc();
		}
	},
	render: function () {
		return (
			<div className="operate-log-div">
				<Table tableData={this.state.operateLogList} titleData={"日志列表"} pagination={this.state.pagination}
					   loading={this.state.loading}
					   filtersData={this.state.filtersData}
					   getOperateLogList={this.events.getOperateLogList}
					   loadingFnc={this.events.loadingFnc}
				/>
			</div>
		);
	}
});

module.exports = OperateLog;