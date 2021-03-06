import {Link} from 'react-router';
import { Button} from 'antd';
var PublicAjax = require("../ajax/public-ajax");

var App = React.createClass({

	userLogout: function () {
		PublicAjax.userLogout().then(function () {
			window.sessionStorage.clear();
			window.location.href = "/index.html";
		}, function (errorMsg) {
			window.sessionStorage.clear();
			window.location.href = "/index.html";
		});
	},
	render: function () {
		return (
			<div>
				<div>
					<div className="ant-col-24 top-menu-div">
						<div className="ant-col-1"></div>
						<div className="ant-col-22 login-welcome">
							欢迎用户<label
							className="usernam-label">{window.sessionStorage.getItem("username")}</label>登录到商城CMS系统
							<Button type="primary" className="loginout-btn" onClick={this.userLogout}>退出</Button>
						</div>
					</div>
					<div className="ant-col-24">
						<div className="ant-col-1"></div>
						<ul className="ant-col-4 left-menu">
							<li><Link to="/brand_setting" activeClassName="active-route">品牌设置</Link></li>
							<li><Link to="/main_activity" activeClassName="active-route">主打活动</Link></li>
							<li><Link to="/worth_buying" activeClassName="active-route">值得买</Link></li>
							<li><Link to="/first_product" activeClassName="active-route">最鲜品</Link></li>
							<li><Link to="/special" activeClassName="active-route">专题列表</Link></li>
						</ul>
						<div className="ant-col-17 right-content">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
});
// <li><Link to="/">首页设置</Link></li>
module.exports = App;