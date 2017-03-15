//class名
var classNames = require("classnames");
//顶部导航菜单的超链接
var Link = require("react-router").Link;
var TopMenuList = require("../../conf/menu");

//顶部导航外层div
import { Menu, Icon } from 'antd';
var TopNav = React.createClass({
	render: function () {
		return (
			<div className="topNav">
				{this.props.children}
			</div>
		);
	}
});


//获取路径，去掉开头的/
function getPathname() {
	return window.location.hash.split("?")[0].replace(/^\#\//, '');
}

//获取第一层路由
function getCategory() {
	var pathname = getPathname();
	var reg = /^([\w-]+)/i;
	var ret = pathname.match(reg);
	return (ret && ret[1]) || '';
}

//顶部导航的导航菜单
TopNav.MenuList = React.createClass({
	render: function () {

		//获取pathname
		var locationPath = getPathname();
		//获取第一层路由
		var category = getCategory();
		//获取当前界面的子模块
		var subModules = TopMenuList[category] || [];

		if (locationPath.indexOf("/") == 0) {
			locationPath = subModule[0].routePath;
		}

		return (
			<ul className="topnav-links">
				{
					subModules.map(function (menu, i) {
						var icoClassName = "";
						var cls = classNames(icoClassName, {
							'topNav-menu-item-selected': locationPath === menu.routePath
						});

						return (
							<li className={cls} key={i}>
								{menu.typeID ?
									<Link to={`/${menu.routePath}`}
										  query={{"type_id": menu.typeID, "type_name": menu.typeName}}
										  activeClassName="active" ref="navLinks">{menu.displayName}</Link>
									:
									<Link to={`/${menu.routePath}`}
										  activeClassName="active" ref="navLinks">{menu.displayName}</Link>
								}
							</li>
						);
					})
				}
			</ul>
		);
	}
});

module.exports = TopNav;