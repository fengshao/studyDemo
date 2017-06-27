/**
 * Created by fengshao on 2017/2/15.
 */
import {Table, Icon, Button, message, Popconfirm,DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
var SearchInput = require("../../../../component/search-input");
var TableComponent = React.createClass({
	getInitialState: function () {
		return {
			tableHeight: $(window).height() - 56 - 30 - 130 - 80,
			pagination: this.props.pagination
		}
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState(this.getInitialState());
		this.setState({
			pagination: nextProps.pagination
		});
	},

	resizeWindow: function () {
		var tableHeight = $(window).height() - 56 - 30 - 130 - 80;
		this.setState({
			tableHeight: tableHeight
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

	getTableColumns: function () {
		var _this = this;
		var columns = [
			{
				title: 'ID',
				dataIndex: 'operate_id',
				width: '10%',
				key: 'id_key',
				sorter: true
			},
			{
				title: '操作时间',
				dataIndex: 'operate_time',
				width: '10%',
				key: 'operate_time_key',
				sorter: true,
				render: function (rowData) {
					return _this.getMyDate(rowData);
				}
			},
			{
				title: '用户',
				dataIndex: 'operate_username',
				width: '10%',
				key: 'operate_username_key'
			},
			{
				title: '操作',
				className: "operate-td",
				dataIndex: 'content',
				width: '70%',
				key: 'content_key'
			}
		];
		return columns;
	},

	onChange(value, dateString) {
		this.props.loadingFnc();
		const pager = this.state.pagination;
		pager.current = 1;
		const dataArr = dateString.toString().split(",");
		const operateDateStart = dataArr[0];
		const operateDateEnd = dataArr[1];
		const filtersData = {
			operateDateStart: operateDateStart,
			operateDateEnd: operateDateEnd,
			current_page: 1
		};
		const newFiltersData = _.extend(this.props.filtersData, filtersData);
		this.props.getSharingActivitiesLogList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},

	onSearch(value){
		this.props.loadingFnc();
		const pager = this.state.pagination;
		const operateDateStart = this.props.filtersData.operateDateStart;
		const operateDateEnd = this.props.filtersData.operateDateEnd;
		pager.current = 1;
		const filtersData = {
			operateDateStart: operateDateStart,
			operateDateEnd: operateDateEnd,
			current_page: 1,
			content: value
		};
		const newFiltersData = _.extend(this.props.filtersData, filtersData);
		this.props.getSharingActivitiesLogList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},

	handleTableChange(pagination, filters, sorter) {
		this.props.loadingFnc();
		const pager = this.props.pagination;
		const operateDateStart = this.props.filtersData.operateDateStart;
		const operateDateEnd = this.props.filtersData.operateDateEnd;
		const content = this.props.filtersData.content;
		pager.current = pagination.current;
		pager.pageSize = pagination.pageSize;
		const filtersData = {
			order: sorter.order,
			field: sorter.field,
			current_page: pagination.current,
			per_page: pagination.pageSize,
			content: content,
			operateDateEnd: operateDateEnd,
			operateDateStart: operateDateStart
		};
		this.props.getSharingActivitiesLogList(filtersData);
	},

	disabledDate: function (current) {
		return current && current.getTime() > Date.now();
	},

	titleElement: function () {
		return <div>
			<span>
				{this.props.titleData}
				<span className="range-picker-span">
					<RangePicker style={{ width: 200 }} format="yyyy-MM-dd" onChange={this.onChange}
								 disabledDate={this.disabledDate}/>
				</span>
				<SearchInput placeholder="根据操作记录查询"
							 onSearch={this.onSearch} style={{ width: 300 }}
				/>
			</span>
		</div>
	},

	render: function () {
		var columns = this.getTableColumns();
		var pagination = this.state.pagination;
		var data = this.props.tableData;
		var tableHeight = this.state.tableHeight;
		var title = this.titleElement();
		return (
			<Table title={() => title} bordered columns={columns} dataSource={data} pagination={pagination}
				   scroll={{y: tableHeight}} onChange={this.handleTableChange}
				   loading={this.props.loading}/>
		);
	}
});

module.exports = TableComponent;