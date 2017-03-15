/**
 * Created by fengshao on 2016/12/27.
 */
import designers_recommend_bgimg from 'scripts/designers-recommend-bgimg';
import designers_recommend_list from 'scripts/designers-recommend-list';
import RightContent from '../../component/right-content';
function getChildRoutes() {
	var childRoutes = [
		designers_recommend_bgimg,
		designers_recommend_list
	];
	return childRoutes;
}

module.exports = {
	path: 'designers_recommend',
	//在RightContent中用来做跳转,重要
	routesExports: getChildRoutes(),
	getChildRoutes: function (partialNextState, cb) {
		var childRoutes = getChildRoutes();
		cb(null, childRoutes);
	},
	getIndexRoute: function (partialNextState, callback) {
		callback(null, designers_recommend_list)
	},
	getComponents: function (nextState, callback) {
		callback(null, RightContent)
	}
};