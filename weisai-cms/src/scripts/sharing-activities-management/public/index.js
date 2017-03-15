/**
 * Created by fengshao on 2017/1/22.
 */
var TopNav = require("../../../component/top-nav");
var SharingActivitiesAction = require("./action/sharing-activities-action");
var SharingActivitiesStore = require("./store/sharing-activities-store");
var EditForm = require("./view/edit-form");
var Table = require("./view/sharing-activities-table");
var SharingActivitiesList = React.createClass({
	getInitialState: function () {
		var data = SharingActivitiesStore.getState();
		return data;
	},

	onChange: function () {
		var data = SharingActivitiesStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		SharingActivitiesStore.listen(this.onChange);
		SharingActivitiesAction.getActivityList();
	},

	componentWillUnmount: function () {
		SharingActivitiesStore.unlisten(this.onChange);
		alt.flush();
	},

	events: {
		delActivity: function (data) {
			SharingActivitiesAction.delActivity(data);
		},

		showEditFrom: function (rowData) {
			SharingActivitiesAction.showEditFrom(rowData);
		},

		showAddFrom: function () {
			SharingActivitiesAction.showAddFrom();
		},

		addActivity: function (newData) {
			SharingActivitiesAction.addActivity(newData);
		},

		editActivity: function (newData) {
			SharingActivitiesAction.editActivity(newData);
		},

		hideEditFrom: function () {
			SharingActivitiesAction.hideEditFrom();
		},

		hideCommodityClassificationAddModal: function () {
			SharingActivitiesAction.hideCommodityClassificationAddModal();
		},

		showCommodityClassificationAddModal: function () {
			SharingActivitiesAction.showCommodityClassificationAddModal();
		},

		nextCurrent: function (data) {
			SharingActivitiesAction.nextCurrent(data);
		},

		previousCurrent: function (data) {
			SharingActivitiesAction.previousCurrent(data);
		},

		getActivityList: function (data) {
			SharingActivitiesAction.getActivityList(data);
		},

		offShelfActivity: function (data) {
			SharingActivitiesAction.offShelfActivity(data);
		},

		shelfActivity: function (data) {
			SharingActivitiesAction.shelfActivity(data);
		},

		loadingFnc: function (data) {
			SharingActivitiesAction.loadingFnc(data);
		},

		selectGoodsTypeFnc: function (data) {
			SharingActivitiesAction.selectGoodsTypeFnc(data);
		},

		commodityClassificationOrderUp: function (data) {
			SharingActivitiesAction.commodityClassificationOrderUp(data);
		},

		commodityClassificationOrderDown: function (data) {
			SharingActivitiesAction.commodityClassificationOrderDown(data);
		},

		commodityClassificationRemove: function (data) {
			SharingActivitiesAction.commodityClassificationRemove(data);
		},

		uploadHtml: function (data) {
			SharingActivitiesAction.uploadHtml(data);
		},

		hideMessage: function (data) {
			SharingActivitiesAction.hideMessage(data);
		},

		showCopeModel: function (data) {
			SharingActivitiesAction.showCopeModel(data);
		},

		previewACtiveHtml: function (data) {
			var locationHref = window.location.href.split("#")[0];
			if (locationHref.indexOf("devel") != -1) {
				window.open("http://topics-cms.devel.wesai.com/api/activityPreview?id=" + data.id);
			} else if (locationHref.indexOf("test") != -1) {
				window.open("http://topics-cms.test.wesai.com/api/activityPreview?id=" + data.id);
			} else if (locationHref.indexOf("127.0.0.1") != -1) {
				window.open("http://periphery.devel.wesai.com/api/activityPreview?id=" + data.id);
			} else {
				window.open("http://topics-cms.intra.wesai.com/api/activityPreview?id=" + data.id);
			}

		}

	},

	render: function () {
		return (
			<div>
				<TopNav>
					<TopNav.MenuList/>
				</TopNav>
				<div className="right-content-bottom">
					{this.state.isShowEditFrom || this.state.isShowAddFrom ?
						(<EditForm
							hideEditFrom={this.events.hideEditFrom}
							addActivity={this.events.addActivity}
							editActivity={this.events.editActivity}
							nextCurrent={this.events.nextCurrent}
							previousCurrent={this.events.previousCurrent}
							showCommodityClassificationAddModal={this.events.showCommodityClassificationAddModal}
							hideCommodityClassificationAddModal={this.events.hideCommodityClassificationAddModal}
							allData={this.state.sharingActivitiesList}
							current={this.state.current}
							editRowData={this.state.editRowData}
							editAllData={this.state.editAllData}
							isShowCommodityClassificationAddModal={this.state.isShowCommodityClassificationAddModal}
							selectGoodsTypeFnc={this.events.selectGoodsTypeFnc}
							commodityClassificationOrderUp={this.events.commodityClassificationOrderUp}
							commodityClassificationOrderDown={this.events.commodityClassificationOrderDown}
							commodityClassificationRemove={this.events.commodityClassificationRemove}
							selectGoodsTypeList={this.state.selectGoodsTypeList}
							goodsTypeList={this.state.goodsTypeList}
						/>) : (
						<Table tableData={this.state.sharingActivitiesList} titleData=""
							   delActivity={this.events.delActivity}
							   showEditFrom={this.events.showEditFrom}
							   showAddFrom={this.events.showAddFrom}
							   loadingFnc={this.events.loadingFnc}
							   getActivityList={this.events.getActivityList}
							   filtersData={this.state.filtersData}
							   pagination={this.state.pagination}
							   offShelfActivity={this.events.offShelfActivity}
							   shelfActivity={this.events.shelfActivity}
							   uploadHtml={this.events.uploadHtml}
							   hideMessage={this.events.hideMessage}
							   showCopeModel={this.events.showCopeModel}
							   previewACtiveHtml={this.events.previewACtiveHtml}

							   messageTitle={this.state.messageTitle}
							   showMessageFlag={this.state.showMessageFlag}
							   message={this.state.message}
							   wechat_url={this.state.wechat_url}
							   qq_url={this.state.qq_url}
						/>)}
				</div>
			</div>
		);
	}
});

module.exports = SharingActivitiesList;