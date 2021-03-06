/**
 * Created by fengs on 2016/9/16.
 * 表格列表
 */
import {Table, Icon, Button, message, Popconfirm} from 'antd';
var TableComponent = React.createClass({
	getInitialState: function () {
		return {
			tableHeight: $(window).height() - 56 - 30 - 130 - 80 - ( this.props.topNavHeight ? this.props.topNavHeight : 0)
		}
	},

	resizeWindow: function () {
		var tableHeight = $(window).height() - 56 - 30 - 130 - 80 - 60 - ( this.props.topNavHeight ? this.props.topNavHeight : 0)
		this.setState({
			tableHeight: tableHeight
		});
	},

	componentWillUnmount: function () {
		$("body").css("overflow", "auto");
		$(window).off("resize", this.resizeWindow);
	},

	confirm: function (rowData) {
		this.props.deleteSpecialFnc(rowData);
	},

	getTableColumns: function () {
		var _this = this;
		var user_role = window.sessionStorage.getItem("user_role");
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
				title: user_role == 1 ? '微信链接' : 'APP链接',
				dataIndex: user_role == 1 ? 'url_wechat' : 'url_app',
				width: '22%',
				key: 'url_key'
			},
			{
				title: '专题封面',
				dataIndex: 'img_wechat',
				width: '18%',
				key: 'img_key',
				render: function (rowData) {
					return <img className="td-img" src={rowData}/>;
				}
			},
			{
				title: '排序',
				dataIndex: 'sort',
				width: '8%',
				key: 'sort_key',
				sorter: function (a, b) {
					return a.sort - b.sort;
				}
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

	getPagination: function () {
		return {
			total: this.props.tableData ? this.props.tableData.length : 0,
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
			<Button type="primary" onClick={this.props.showAddFrom}>添加</Button>
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