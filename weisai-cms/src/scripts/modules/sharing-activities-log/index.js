/**
 * Created by fengshao on 2017/1/22.
 */
module.exports = {
	path: 'sharing_activities_log',
	getComponent: function (location, cb) {
		require.ensure([], function (require) {
			cb(null, require('./public'))
		})
	}
};