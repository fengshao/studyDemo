/**
 * Created by jinfeng on 2015/10/14.
 */
var sass = require('node-sass');
var path = require("path");
var fs = require("fs");
var baseDir = path.resolve(__dirname, "../style");
var scssFileReg = /\/style(\/[\w\-\.\/]+)\.css(?:\?.*)?/;

//生成sourcemap的配置
function getSourceMapOptions(ret) {
	var matches = ret.slice();
	matches[1] = matches[1].replace(/^\//, '');
	var scssFileRelativePath = matches[1] + '.scss';
	//G:\\portal\\public\\styles\\page\\home\\search.scss
	var sourceMapInputFilename = path.resolve(baseDir, scssFileRelativePath);
	//search.css
	var sourceMapOutputFilename = path.basename(sourceMapInputFilename).replace(/\.scss$/, '.css');
	//G:\\portal\\public\\styles\\page\\home\\search.css.map
	var sourceMapFullFilename = sourceMapInputFilename.replace(/\.scss$/, '.css.map');
	//search.css.map
	var sourceMapFilename = path.basename(sourceMapFullFilename);
	//G:\\portal\\public\\styles   css根目录
	var sourceMapBasepath = baseDir;
	// ../../styles    当前目录到css根目录的对应关系
	var sourceMapRootpath = path.relative(path.dirname(sourceMapInputFilename), baseDir);
	var sourceMapFileInline = true;
	var sourceMapOptions = {
		sourceMapInputFilename: sourceMapInputFilename,
		sourceMapOutputFilename: sourceMapOutputFilename,
		sourceMapFullFilename: sourceMapFullFilename,
		sourceMapFilename: sourceMapFilename,
		sourceMapBasepath: sourceMapBasepath,
		sourceMapRootpath: sourceMapRootpath,
		sourceMapFileInline: sourceMapFileInline
	};
	return sourceMapOptions;
}

function devScssHandler(req, res, next) {
	var ret = req.url.match(scssFileReg);
	if (!ret) {
		next();
		return;
	}
	var scssFilePath = path.join(baseDir, ret[1] + '.scss');
	if (!fs.existsSync(scssFilePath)) {
		next();
		return;
	}
	var sourceMapOptions = getSourceMapOptions(ret);
	console.log("scssFilePath:" + scssFilePath);
	sass.render({
		file: scssFilePath,
		includePaths: ['style/', ''],
		outputStyle: 'expanded',
		sourceComments: sourceMapOptions
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
	return devScssHandler;
};
