/**
 * Created by fengshao on 2017/1/22.
 */
var leftMenus = JSON.parse(window.sessionStorage.getItem("leftMenus"));
var typeID = 0, typeName = "";
for (var i = 0; i < leftMenus.length; i++) {
	if (leftMenus[i].route_path == "designers_recommend") {
		typeID = leftMenus[i].type_id;
		typeName = leftMenus[i].type_name;
	}
}

var topMenuList = {
	designers_recommend: [{
		routePath: "designers_recommend/designers_recommend_list",
		displayName: "IP列表",
		typeID: typeID,
		typeName: typeName
	}, {
		routePath: "designers_recommend/designers_recommend_bgimg",
		displayName: "背景图片管理",
		typeID: typeID,
		typeName: typeName
	}],
	sharing_activities: [{
		routePath: "sharing_activities/commodity_classification",
		displayName: "商品分类管理",
		typeID: "",
		typeName: ""
	}, {
		routePath: "sharing_activities/commodity_management",
		displayName: "商品管理",
		typeID: "",
		typeName: ""
	}, {
		routePath: "sharing_activities/sharing_activities_management",
		displayName: "分享活动管理",
		typeID: "",
		typeName: ""
	}, {
		routePath: "sharing_activities/sharing_activities_log",
		displayName: "日志列表",
		typeID: "",
		typeName: ""
	}]
};

module.exports = topMenuList;
