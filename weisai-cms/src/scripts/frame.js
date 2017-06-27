var Router = require("react-router").Router;
var hashHistory = require("react-router").hashHistory;
//import React, { Component } from 'react';
//import {Router, hashHistory} from 'react-router';
//import App from 'scripts/left-menu';
import PublicAjax from '../ajax/public-ajax';
function init() {

	var childRoutes = [];
	var objData = PublicAjax.getRouteData();
	var data = objData ? objData.data : "";

	// _.each(data, function (module) {
	// 	switch (module.route_path) {
	// 		//品牌列表
	// 		case 'brand_setting':
	// 			childRoutes.push(require("./modules/brand-setting"));
	// 			break;
	// 		//主打活动
	// 		case 'main_activity':
	// 			childRoutes.push(require("./modules/main-activity"));
	// 			break;
	// 		//值得买
	// 		case 'worth_buying':
	// 			childRoutes.push(require("./modules/worth-buying"));
	// 			break;
	// 		//最鲜品
	// 		case 'first_product':
	// 			childRoutes.push(require("./modules/first-product"));
	// 			break;
	// 		//专题列表
	// 		case 'special':
	// 			childRoutes.push(require("./modules/special"));
	// 			break;
	// 		//搭配志
	// 		case 'fashion':
	// 			childRoutes.push(require("./modules/fashion"));
	// 			break;
	// 		//设计师推荐
	// 		case 'designers_recommend':
	// 			childRoutes.push(require("./modules/designers-recommend-bgimg"));
	// 			break;
	// 	}
	// });
	//
	// childRoutes.push(require("./modules/special-type-list"));
	// if (window.sessionStorage.getItem("user_role") == 1) {
	// 	childRoutes.push(require("./modules/share-edit"));
	// 	childRoutes.push(require("../sources/share-activities"));
	// }
	// childRoutes.push(require("./operate-log"));
	childRoutes.push(require("./modules/brand-setting"));


	childRoutes.push({
		path: '*',
		components: require("./nomatch")
	});

	var rootRoute = {
		component: 'div',
		childRoutes: [{
			path: '/',
			component: require("./left-menu"),
			childRoutes: childRoutes
		}]
	};


	ReactDOM.render(
		<Router history={hashHistory} routes={rootRoute}/>,
		$('#main')[0]
	);

}
exports.init = init;