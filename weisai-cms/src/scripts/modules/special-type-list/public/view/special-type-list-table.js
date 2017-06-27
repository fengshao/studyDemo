/**
 * Created by fengshao on 2016/11/7.
 */
import {Table, Icon, Button, message, Popconfirm} from 'antd';
var TableComponent = React.createClass({
	getInitialState: function () {
		return {
			tableHeight: $(window).height() - 56 - 30 - 130 - 80
		}
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

	getTableColumns: function () {
		var _this = this;
		var columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				width: '10%',
				key: 'id_key',
				sorter: function (a, b) {
					return a.id - b.id;
				}
			},
			{
				title: '专题模块名称',
				dataIndex: 'type_name',
				width: '30%',
				key: 'title_key'
			},
			{
				title: '是否展示',
				dataIndex: 'status',
				width: '25%',
				key: 'status_key',
				render: function (rowData) {
					return rowData == 0 ? "展示" : "隐藏";
				}
			},
			{
				title: '排序',
				dataIndex: 'sort',
				width: '15%',
				key: 'sort_key',
				sorter: function (a, b) {
					return a.sort - b.sort;
				}
			},
			{
				title: '操作',
				width: '20%',
				render: function (apps, rowData, idx) {
					return <div className='operate-div'>
						<Button className="operate-btn" type="primary"
								onClick={_this.props.showEditFrom.bind(_this,rowData)}>修改</Button>
					</div>;
				}
			}
		];
		return columns;
	},

	getPagination: function () {
		return {
			total: this.props.tableData.length,
			showTotal: total => `共 ${total} 条`,
			defaultCurrent: 1,
			pageSize: 10,
			showQuickJumper: true,
			showSizeChanger: true
		}

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
		</div>
	},

	render: function () {
		var columns = this.getTableColumns();
		var pagination = this.getPagination();
		var data = this.props.tableData;
		var tableHeight = this.state.tableHeight;
		var title = this.titleElement();

		return (
			<Table title={() => title} bordered columns={columns} dataSource={data} pagination={pagination}
				   scroll={{ y: tableHeight }}/>
		);
	}
});

module.exports = TableComponent;