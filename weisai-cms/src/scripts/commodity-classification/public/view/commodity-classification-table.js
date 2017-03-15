/**
 * Created by fengshao on 2017/1/23.
 */
import {Table, Icon, Button, message, Popconfirm} from 'antd';
var SearchInput = require("../../../../component/search-input");

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

	resizeWindow: function () {
		var tableHeight = $(window).height() - 56 - 30 - 130 - 80 - 60 - 60
		this.setState({
			tableHeight: tableHeight
		});
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "auto");
		$(window).off("resize", this.resizeWindow);
	},

	confirm: function (rowData) {
		this.props.delGoodsType(rowData);
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
				dataIndex: 'id',
				width: '8%',
				key: 'id_key',
				sorter: function (a, b) {
					return a.id - b.id;
				}
			},
			{
				title: '专题名称',
				dataIndex: 'title',
				width: '20%',
				key: 'title_key'
			},
			{
				title: '专题封面',
				dataIndex: 'pic',
				width: '22%',
				key: 'pic_key',
				render: function (rowData) {
					return <img className="td-img" src={rowData}/>;
				}
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				width: '19%',
				key: 'create_time_key',
				sorter: true,
				render: function (rowData) {
					return _this.getMyDate(rowData);
				}
			},
			{
				title: '更新时间',
				dataIndex: 'update_time',
				width: '19%',
				key: 'update_time_key',
				sorter: true
			},
			{
				title: '操作',
				width: '12%',
				render: function (apps, rowData, idx) {
					const text = '确定要删除吗？';
					return <div className='operate-div'>
						<Button className="operate-btn" type="primary"
								onClick={_this.props.showEditFrom.bind(_this,rowData)}>修改</Button>
						<Popconfirm placement="topRight" title={text} onConfirm={_this.confirm.bind(_this, rowData)}>
							<Button>删除</Button>
						</Popconfirm>

					</div>;
				}
			}
		];
		return columns;
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
		this.props.getGoodsTypeList(newFiltersData);
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

		const filtersData = {
			order: sorter.field,
			sort: sorter.order,
			current_page: pagination.current,
			per_page: pagination.pageSize,
			content: content
		};
		this.props.getGoodsTypeList(filtersData);
	},

	componentDidMount: function () {
		$("body").css("overflow", "hidden");
		$(window).on("resize", this.resizeWindow);
	},
	titleElement: function () {
		return <div>
			<span>
				{this.props.titleData}
			</span>
			<Button type="primary" onClick={this.props.showAddFrom}>添加商品分类</Button>
			<SearchInput placeholder="根据商品分类名称查询"
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
			<Table title={() => title} bordered columns={columns} dataSource={data} pagination={pagination}
				   scroll={{ y: tableHeight }}
				   onChange={this.handleTableChange}
				   loading={this.props.loading}
			/>
		);
	}
});

module.exports = TableComponent;