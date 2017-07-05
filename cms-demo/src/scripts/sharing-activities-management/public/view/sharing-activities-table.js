/**
 * Created by fengshao on 2017/2/7.
 */
import {Table, Icon, Button, message, Popconfirm,DatePicker} from 'antd';
const RangePicker = DatePicker.RangePicker;
var SearchInput = require("../../../../component/search-input");
var ModalMessage = require("./modal-message");

var locationHref = window.location.href.split("#")[0];
var url = '//storage.api.wesai.com/uploading';
if (locationHref.indexOf("devel") != -1) {
	url = '//10.2.2.9:20202/uploading';
} else if (locationHref.indexOf("test") != -1) {
	url = '//10.2.2.9:20202/uploading';
} else if (locationHref.indexOf("127.0.0.1") != -1) {
	url = '//10.2.2.9:20202/uploading';
}
var TableComponent = React.createClass({
	getInitialState: function () {
		return {
			tableHeight: $(window).height() - 56 - 30 - 130 - 80 - 60,
			pagination: this.props.pagination
		}
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState(this.getInitialState());
		this.setState({
			pagination: nextProps.pagination
		});
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "auto");
		$(window).off("resize", this.resizeWindow);
	},

	componentDidMount: function () {
		$("body").css("overflow", "hidden");
		$(window).on("resize", this.resizeWindow);
	},

	resizeWindow: function () {
		var tableHeight = $(window).height() - 56 - 30 - 130 - 80 - 60 - 60
		this.setState({
			tableHeight: tableHeight
		});
	},

	confirm: function (rowData) {
		this.props.delActivity(rowData);
	},

	getTableColumns: function () {
		var _this = this;
		var columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				width: '8%',
				key: 'id_key',
				sorter: function (a, b) {
					return a.id - b.id;
				}
			},
			{
				title: '分享活动名称',
				dataIndex: 'title',
				width: '16%',
				key: 'title_key'
			},
			{
				title: '活动开始时间',
				dataIndex: 'start_time',
				width: '15%',
				sorter: true,
				key: 'start_time_time_key'
			},
			{
				title: '活动结束时间',
				dataIndex: 'end_time',
				width: '15%',
				sorter: true,
				key: 'end_time_key'
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				width: '15%',
				sorter: true,
				key: 'create_time_key',
				render: function (rowData) {
					return _this.getMyDate(rowData);
				}
			},
			{
				title: '更新时间',
				dataIndex: 'update_time',
				width: '15%',
				sorter: true,
				key: 'update_time_key'
			},
			{
				title: '操作',
				width: '16%',
				render: function (apps, rowData, idx) {
					const text = '确定要删除吗？';
					return <div className='operate-div'>
						{rowData.is_sale == 0 ?
							<span>
								<Button className="active-operate-btn" type="primary"
										onClick={_this.props.showEditFrom.bind(_this,rowData)} disabled>修改</Button>
								<Popconfirm placement="topRight" title={text}
											onConfirm={_this.confirm.bind(_this, rowData)}>
									<Button className="active-operate-btn" disabled>删除</Button>
								</Popconfirm>
							</span> :
							<span>
								<Button className="active-operate-btn" type="primary"
										onClick={_this.props.showEditFrom.bind(_this,rowData)}>修改</Button>
								<Popconfirm placement="topRight" title={text}
											onConfirm={_this.confirm.bind(_this, rowData)}>
									<Button className="active-operate-btn">删除</Button>
								</Popconfirm>
							</span>
						}

						<Button type="primary" className="active-operate-btn"
								onClick={_this.props.previewACtiveHtml.bind(_this,rowData)}>预览</Button>

						{rowData.is_sale == 1 ?
							<span>
								<Button className="active-operate-btn"
										onClick={_this.props.uploadHtml.bind(_this,rowData)} disabled>部署</Button>
								<Button className="active-operate-btn"
										onClick={_this.props.showCopeModel.bind(_this,rowData)} disabled>复制链接</Button>
							</span> :
							<span>
								<Button className="active-operate-btn"
										onClick={_this.props.uploadHtml.bind(_this,rowData)}>部署</Button>
								{rowData.wechat_url && rowData.qq_url ?

									<Button className="active-operate-btn"
											onClick={_this.props.showCopeModel.bind(_this,rowData)}>复制链接</Button>
									:
									<Button className="active-operate-btn"
											onClick={_this.props.showCopeModel.bind(_this,rowData)}
											disabled>复制链接</Button>
								}
							</span>
						}

						{
							rowData.is_sale == 1 ?
								<Button className="active-operate-btn"
										onClick={_this.props.shelfActivity.bind(_this,rowData)}>启用</Button>
								:
								<Button className="active-operate-btn"
										onClick={_this.props.offShelfActivity.bind(_this,rowData)}>禁用</Button>    }
					</div>;
				}
			}
		];
		return columns;
	},

	getMyDate: function (str) {
		var oDate = new Date(str * 1000),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSen = oDate.getSeconds(),
			oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen);//最后拼接时间
		return oTime;
	},

	//补0操作
	getzf: function (num) {
		if (parseInt(num) < 10) {
			num = '0' + num;
		}
		return num;
	},

	onStartChange(value, dateString) {
		this.props.loadingFnc();
		const pager = this.state.pagination;
		pager.current = 1;
		const dataArr = dateString.toString().split(",");
		const operateDateStart = dataArr[0];
		const operateDateEnd = dataArr[1];
		const filtersData = {
			start_time_start: operateDateStart,
			start_time_end: operateDateEnd,
			current_page: 1
		};
		const newFiltersData = _.extend(this.props.filtersData, filtersData);
		this.props.getActivityList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},

	onEndChange(value, dateString) {
		this.props.loadingFnc();
		const pager = this.state.pagination;
		pager.current = 1;
		const dataArr = dateString.toString().split(",");
		const operateDateStart = dataArr[0];
		const operateDateEnd = dataArr[1];
		const filtersData = {
			end_time_start: operateDateStart,
			end_time_end: operateDateEnd,
			current_page: 1
		};
		const newFiltersData = _.extend(this.props.filtersData, filtersData);
		this.props.getActivityList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},

	handleTableChange(pagination, filters, sorter) {
		this.props.loadingFnc();
		const pager = this.props.pagination;
		const content = this.props.filtersData.content;
		pager.current = pagination.current;
		pager.pageSize = pagination.pageSize;
		const start_time_start = this.props.filtersData.start_time_start;
		const start_time_end = this.props.filtersData.start_time_end;
		const end_time_start = this.props.filtersData.end_time_start;
		const end_time_end = this.props.filtersData.end_time_end;

		const filtersData = {
			order: sorter.field,
			sort: sorter.order,
			current_page: pagination.current,
			per_page: pagination.pageSize,
			content: content,
			start_time_start: start_time_start,
			start_time_end: start_time_end,
			end_time_start: end_time_start,
			end_time_end: end_time_end
		};
		this.props.getActivityList(filtersData);
	},

	onSearch(value){
		this.props.loadingFnc();
		const pager = this.state.pagination;
		pager.current = 1;
		const filtersData = {
			current_page: 1,
			content: value
		};
		const newFiltersData = _.extend(this.props.filtersData, filtersData);
		this.props.getActivityList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},

	disabledDate: function (current) {
		return current && current.getTime() > Date.now();
	},

	titleElement: function () {
		return <div>
			<span>
				{this.props.titleData}
			</span>
			<Button type="primary" onClick={this.props.showAddFrom}>添加分享活动</Button>
			<span className="range-picker-span">
				开始：
				<RangePicker style={{ width: 200 }} format="yyyy-MM-dd" onChange={this.onStartChange}
				/>
			</span>
			<span className="range-picker-span">
				结束：
				<RangePicker style={{ width: 200 }} format="yyyy-MM-dd" onChange={this.onEndChange}
				/>
			</span>
			<SearchInput placeholder="根据活动名称查询"
						 onSearch={this.onSearch} style={{ width: 300 }}
			/>
		</div>
	},

	render: function () {
		var columns = this.getTableColumns();
		var pagination = this.state.pagination;
		var data = this.props.tableData;
		var tableHeight = this.state.tableHeight;
		var title = this.titleElement();
		return (
			<div>
				<ModalMessage
					messageTitle={this.props.messageTitle}
					showMessageFlag={this.props.showMessageFlag}
					message={this.props.message}
					wechat_url={this.props.wechat_url}
					qq_url={this.props.qq_url}
					onOk={this.props.hideMessage}
					onCancel={this.props.hideMessage}
				/>
				<Table title={() => title} bordered columns={columns} dataSource={data} pagination={pagination}
					   scroll={{ y: tableHeight }}
					   onChange={this.handleTableChange}
					   loading={this.props.loading}
				/>
			</div>
		);
	}
});

module.exports = TableComponent;