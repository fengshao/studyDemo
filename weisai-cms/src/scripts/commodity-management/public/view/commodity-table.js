/**
 * Created by fengshao on 2017/2/6.
 */
import {Table, Icon, Button, message, Popconfirm,Select} from 'antd';
const Option = Select.Option;
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

	componentWillUnmount: function () {
		$("body").css("overflow", "auto");
		$(window).off("resize", this.resizeWindow);
	},

	componentDidMount: function () {
		$("body").css("overflow", "hidden");
		$(window).on("resize", this.resizeWindow);
	},

	confirm: function (rowData) {
		this.props.delGoods(rowData);
	},

	resizeWindow: function () {
		var tableHeight = $(window).height() - 56 - 30 - 130 - 80 - 60 - 60
		this.setState({
			tableHeight: tableHeight
		});
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

	getGoodsType: function (typeID) {
		var commodityClassification = _.filter(this.props.commodityClassificationList, function (item) {
			if (item.id == typeID) {
				return true;
			}
		});

		return commodityClassification.length > 0 ? commodityClassification[0].title : "";

	},

	getTableColumns: function () {
		var _this = this;
		var columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				width: '8%',
				key: 'id_key',
				sorter: true
			},
			{
				title: '商品名称',
				dataIndex: 'title',
				width: '16%',
				key: 'title_key'
			},
			{
				title: '所属商品分类',
				dataIndex: 'type_id',
				width: '16%',
				key: 'type_id_key',
				render: function (rowData) {
					return _this.getGoodsType(rowData);
				}
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				width: '16%',
				sorter: true,
				key: 'create_time_key',
				render: function (rowData) {
					return _this.getMyDate(rowData);
				}
			},
			{
				title: '更新时间',
				dataIndex: 'update_time',
				width: '16%',
				sorter: true,
				key: 'update_time_key'
			},
			{
				title: '排序',
				dataIndex: 'sort',
				width: '8%',
				key: 'sort_key',
				sorter: true
			},
			{
				title: '操作',
				width: '12%',
				render: function (apps, rowData, idx) {
					const text = '确定要删除吗？';
					return <div className='operate-div'>
						{
							_this.props.commodityClassificationList.length > 0 ?
								<Button className="operate-btn" type="primary"
										onClick={_this.props.showEditFrom.bind(_this,rowData)}>修改</Button>
								: <Button className="operate-btn" type="primary" disabled>修改</Button>
						}

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
		this.props.getGoodsList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},

	handleTableChange(pagination, filters, sorter) {
		this.props.loadingFnc();
		const pager = this.props.pagination;
		const content = this.props.filtersData.content;
		const type_id = this.props.filtersData.type_id;
		pager.current = pagination.current;
		pager.pageSize = pagination.pageSize;

		const filtersData = {
			order: sorter.field,
			sort: sorter.order,
			current_page: pagination.current,
			per_page: pagination.pageSize,
			content: content,
			type_id: type_id
		};
		this.props.getGoodsList(filtersData);
	},

	handleChange(value) {
		this.props.loadingFnc();
		const pager = this.state.pagination;
		pager.current = 1;
		const filtersData = {
			current_page: 1,
			type_id: value
		};
		const newFiltersData = _.extend(this.props.filtersData, filtersData);
		this.props.getGoodsList(newFiltersData);
		this.setState({
			pagination: pager
		});
	},


	titleElement: function () {
		return <div>
			<span>
				{this.props.titleData}
			</span>
			{
				this.props.commodityClassificationList.length > 0 ?
					<Button type="primary" onClick={this.props.showAddFrom}>添加商品</Button>
					: <Button type="primary" disabled>添加商品</Button>

			}
			<Select showSearch
					style={{ width: 200 }}
					placeholder="请选择商品分类"
					optionFilterProp="children"
					notFoundContent="无法找到"
					onChange={this.handleChange}
					className="goods-type-search"
			>
				<Option value="">全部</Option>
				{
					this.props.commodityClassificationList.map(function (goodsType, key) {
						return (
							<Option value={goodsType.id} key={key}>{goodsType.title}</Option>
						);
					})
				}
			</Select>
			<SearchInput placeholder="根据商品名称查询"
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