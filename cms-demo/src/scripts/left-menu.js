import {Link} from 'react-router';
import { Button,message, Modal} from 'antd';
var PublicAjax = require("../ajax/public-ajax");
var APPTopBtn = require("../component/APP-top-btn");
var APPStore = require("./left-menu-store");
var APPAction = require("./left-menu-action");
var ModalMessage = require("../component/modal-message");

//获取菜单
function getMenus() {
	var objData = PublicAjax.getUserData();
	var data = objData ? objData.data : "";
	return data;
}

const success = function (title) {
	message.success(title);
};

const error = function (title) {
	message.error(title);
};


var App = React.createClass({
	getInitialState: function () {
		var data = APPStore.getState();
		return data;
	},

	onChange: function () {
		var data = APPStore.getState();
		this.setState(data);
	},

	resizeFunction: function () {
		this.setState({});
	},
	componentDidMount: function () {
		APPStore.listen(this.onChange);
		APPAction.getUserData();
		$(window).on('resize', this.resizeFunction);
	},
	componentWillUnmount: function () {
		APPStore.unlisten(this.onChange);

		$(window).off('resize', this.resizeFunction);
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

	events: {
		previewAppHtml: function () {
			var locationHref = window.location.href.split("#")[0];
			if (locationHref.indexOf("devel") != -1) {
				window.open("http://topics-cms.devel.wesai.com/api/special_preview?channelTerminal=3&channel=3");
			} else if (locationHref.indexOf("test") != -1) {
				window.open("http://topics-cms.test.wesai.com/api/special_preview?channelTerminal=3&channel=3");
			} else if (locationHref.indexOf("127.0.0.1") != -1) {
				window.open("http://topics-cms.mjd.wesai.com/api/special_preview?channelTerminal=3&channel=3");
			} else {
				window.open("http://topics-cms.intra.wesai.com/api/special_preview?channelTerminal=3&channel=3");
			}

		},
		uploadAppHtml: function () {
			APPAction.uploadLoadingType();
			APPAction.uploadAppHtml();
		},
		hideMessage: function () {
			APPAction.hideMessage();
		}
	},

	render: function () {
		var user_role = window.sessionStorage.getItem("user_role");
		return (
			<div>
				<div>
					<ModalMessage
						messageTitle={this.state.messageTitle}
						showMessageFlag={this.state.showMessageFlag}
						message={this.state.message}
						messageUrl={this.state.messageUrl}
						onOk={this.events.hideMessage}
						onCancel={this.events.hideMessage}
					/>

					<div className="ant-col-24 top-menu-div">
						<div className="ant-col-1"></div>
						<div className="ant-col-22 login-welcome">
							<div className="top-left-cls">
								欢迎用户
								<label className="usernam-label">{window.sessionStorage.getItem("username")}</label>登录到商城CMS系统
								<Button type="primary" className="loginout-btn" onClick={this.userLogout}>退出</Button>
							</div>
							{user_role == 3 ? <APPTopBtn
								previewAppHtml={this.events.previewAppHtml}
								uploadAppHtml={this.events.uploadAppHtml}
								loading={this.state.loading}
							/> : ""}

						</div>
					</div>
					<div className="ant-col-24">
						<div className="ant-col-1"></div>
						<ul className="ant-col-4 left-menu">
							{
								this.state.menus ? this.state.menus.map(function (menu, i) {
									return (
										<li key={i}>
											<Link to={`/${menu.route_path}`}
												  query={{"type_id":menu.type_id,"type_name":menu.type_name}}
												  activeClassName="active-route">
												{menu.type_name }
											</Link>
										</li>
									);
								}) : ""
							}
							<li><Link to="/special_type" activeClassName="active-route">专题模块</Link></li>
							{user_role == 1 ?
								<li><Link to="/share_edit" activeClassName="active-route">分享设置</Link></li>
								: "" }
							<li><Link to="/operate_log" activeClassName="active-route">日志列表</Link></li>
							{user_role == 1 ?
								<li><Link to="/sharing_activities" activeClassName="active-route">H5分享活动</Link></li>
								: "" }

						</ul>
						<div className="ant-col-18 right-content">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
});
//
<li><Link to="/">首页设置</Link></li>
module.exports = App;