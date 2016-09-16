import {Link} from 'react-router';
var App = React.createClass({
	render: function () {
		return (
			<div>
				<ul className="ant-col-4">
					<li><Link to="/brand_setting">品牌设置</Link></li>
					<li><Link to="/main_activity">主打活动</Link></li>
					<li><Link to="/worth_buying">值得买</Link></li>
					<li><Link to="/first_product">最鲜品</Link></li>
					<li><Link to="/special">专题列表</Link></li>
				</ul>
				<div className="ant-col-16">
					{this.props.children}
				</div>
			</div>
		);
	}
});
// <li><Link to="/">首页设置</Link></li>
module.exports = App;