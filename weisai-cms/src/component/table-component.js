/**
 * Created by fengs on 2016/9/16.
 * 表格列表
 */

import {Table, Icon} from 'antd';

var TableComponent = React.createClass({

	

	render: function () {
		return (
			<Table columns={columns} dataSource={data}/>
		);
	}
});

module.exports = TableComponent;