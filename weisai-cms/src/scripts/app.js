import {Link} from 'react-router';
import { Button} from 'antd';
var PublicAjax = require("../ajax/public-ajax");
var AppStore = require("./appStore");
var AppAction = require("./appAction");

var App = React.createClass({

	getInitialState: function () {
		var data = AppStore.getState();
		return data;
	},

	onChange: function () {
		var data = AppStore.getState();
		this.setState(data);
	},

	componentDidMount: function () {
		console.log("APPcomponentDidMount");
		AppStore.listen(this.onChange);
		AppAction.getUserIsLogin();
	},

	componentWillUnmount: function () {
		console.log("APPcomponentWillUnmount");
		AppStore.unlisten(this.onChange);
		alt.flush();
	},

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
				{this.state.userIsLogin == 0 ? (<div>
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
							<li><Link to="/brand_setting">品牌设置</Link></li>
							<li><Link to="/main_activity">主打活动</Link></li>
							<li><Link to="/worth_buying">值得买</Link></li>
							<li><Link to="/first_product">最鲜品</Link></li>
							<li><Link to="/special">专题列表</Link></li>
						</ul>
						<div className="ant-col-17 right-content">
							{this.props.children}
						</div>
					</div>
				</div>) : (
					<div className="need-login-div">
						<div className="need-login-centent">
							<div className="need-login-title">您还未登录，请 <a href="/index.html">登录</a></div>
						</div>
					</div>
				)}
			</div>
		);
	}
});
// <li><Link to="/">首页设置</Link></li>
module.exports = App;