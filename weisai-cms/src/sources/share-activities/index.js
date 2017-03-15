/**
 * Created by fengshao on 2017/1/22.
 */
import commodity_classification from 'scripts/commodity-classification';
import commodity_management from 'scripts/commodity-management';
import sharing_activities_management from 'scripts/sharing-activities-management';
import sharing_activities_log from 'scripts/sharing-activities-log';
import RightContent from '../../component/right-content';
function getChildRoutes() {
	var childRoutes = [
		commodity_classification,
		commodity_management,
		sharing_activities_management,
		sharing_activities_log
	];
	return childRoutes;
}

module.exports = {
	path: 'sharing_activities',
	//在RightContent中用来做跳转,重要
	routesExports: getChildRoutes(),
	getChildRoutes: function (partialNextState, cb) {
		var childRoutes = getChildRoutes();
		cb(null, childRoutes);
	},
	getIndexRoute: function (partialNextState, callback) {
		callback(null, commodity_classification)
	},
	getComponents: function (nextState, callback) {
		callback(null, RightContent)
	}
};