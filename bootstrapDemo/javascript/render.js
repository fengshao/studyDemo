/**
 * Created by jinfeng on 2015/10/14.
 */
var sass = require('node-sass');
var path = require("path");
var baseDir = path.resolve(__dirname, "../style");
var lessFileReg = /\/bootstrap\/style(\/[\w\-\.\/]+)\.css(?:\?.*)?/;
function devLessHandler(req, res, next) {
	console.log("test:" + req.url);
	//var ret = req.url.match(lessFileReg);

	if (req.url.lastIndexOf("test.css") == -1) {
		next();
		return;
	}
	var lessFilePath = req.url.replace(".css", ".scss");
	console.log("lessFilePath:" + lessFilePath.replace(".css", ".scss"));
	console.log("baseDir:" + baseDir);
	sass.render({
		file: baseDir + lessFilePath.substring(lessFilePath.lastIndexOf("/")),
		includePaths: ['lib/', 'mod/', 'style/']
		//outputStyle: 'compressed'
	}, function (error, result) { // node-style callback from v3.0.0 onwards
		if (error) {
			console.log("error:" + error.status); // used to be "code" in v2x and below
			console.log(error.column);
			console.log(error.message);
			console.log(error.line);
		} else {
			res.type('text/css');
			res.send(result.css.toString());
		}
	});
}
//返回一个app.use的方法
module.exports = function () {
	return devLessHandler;
};
