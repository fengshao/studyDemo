/**
 * Created by fengshao on 2016/12/26.
 */
module.exports = {
	path: 'special_type',
	getComponent: function (location, cb) {
		require.ensure([], function (require) {
			cb(null, require('./public'))
		})
	}
};