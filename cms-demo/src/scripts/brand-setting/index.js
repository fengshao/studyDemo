/**
 * Created by fengshao on 2016/12/26.
 */
module.exports = {
	path: 'brand_setting',
	getComponent: function (location, cb) {
		require.ensure([], function (require) {
			cb(null, require('./public'))
		})
	}
};