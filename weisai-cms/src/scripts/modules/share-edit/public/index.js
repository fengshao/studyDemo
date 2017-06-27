/**
 * Created by fengshao on 2016/11/8.
 */
/**
 * Created by fengs on 2016/9/16.
 */
var EditForm = require("./view/edit-form");
var ShareInfo = require("./view/share-info");
var ShareEditStore = require("./store/share-edit-store");
var ShareEditAction = require("./action/share-edit-action");
var Special = React.createClass({

	getInitialState: function () {
		var data = ShareEditStore.getState();
		return data;
	},

	onChange: function () {
		var data = ShareEditStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		ShareEditStore.listen(this.onChange);
		ShareEditAction.getShareList();
	},

	componentWillUnmount: function () {
		ShareEditStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		addShare: function (newData) {
			ShareEditAction.addShare(newData);
		},
		editShare: function (newData) {
			ShareEditAction.editShare(newData);
		},

		showEditFrom: function (rowData) {
			ShareEditAction.showEditFrom(rowData);
		},
		showAddFrom: function () {
			ShareEditAction.showAddFrom();
		},
		hideEditFrom: function () {
			ShareEditAction.hideEditFrom();
		}
	},

	render: function () {
		return (
			<div>
				{this.state.isShowEditFrom || this.state.isShowAddFrom ?
					(<EditForm
						hideEditFrom={this.events.hideEditFrom}
						addSpecial={this.events.addShare}
						editSpecial={this.events.editShare}
						allData={this.state.specialList}
						editRowData={this.state.editRowData}
					/>) : (
					<ShareInfo
						showEditFrom={this.events.showEditFrom}
						showAddFrom={this.events.showAddFrom}
						editRowData={this.state.shareData}
					/>)}

			</div>
		);
	}
});

module.exports = Special;