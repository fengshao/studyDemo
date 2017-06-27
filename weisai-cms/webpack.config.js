var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin'); //清理文件夹
var readDirRecursive = require("./src/lib/utils/readDirRecursive");
var fs = require("fs");

var config = global.config = require('./src/conf/config');

//定义全局的portal路径
global.portal_root_path = path.resolve(__dirname, "./src");
//定义全局的modules路径
global.module_root_path = path.resolve(__dirname, "./src/scripts/modules");
global.config = config;



var modulesPath = path.join(__dirname, './src/scripts/modules');
var files = readDirRecursive(modulesPath);
files.forEach(function (fp) {
	if (!/\.http\.js$/.test(fp)) {
		return;
	}
	var routeConfig = require(fp);
	if (!routeConfig.module || !routeConfig.routes || !routeConfig.routes.length) {
		return;
	}
	// routeConfig.routes.forEach(function (route) {
	// 	try {
	// 		route.passport = route.passport === undefined ? routeConfig.passport : route.passport;
	// 		route.passport = (route.passport === undefined || route.passport === true) ? {
	// 			"needLogin": true
	// 		} : route.passport;
	// 		route.passport = (route.passport === false) ? {"needLogin": false} : route.passport;
	// 		app[route.method](route.path, passportChecker(route.passport), privilegesChecker(route.passport, route.privileges), require(path.resolve(__dirname, "./modules", route.module || routeConfig.module))[route.handler]);
	// 	} catch (error) {
	// 		// 加载路由错误时，显示当前的错误信息，并抛出异常。
	// 		console.error("加载路由错误: \n文件路径:%s \n错误信息:%s", JSON.stringify(route, null, 4), error.message);
	// 		throw error;
	// 	}
	// });
	//加载nock数据
	if (config.provideNockData) {
		var moduleDir = path.dirname(fp);
		var nock = path.resolve(moduleDir, "../nock/index.js");
		if (fs.existsSync(nock)) {
			try {
				require(nock).init();
			} catch (error) {
				// 加载nock错误时，显示当前的错误信息，并抛出异常。
				console.error("加载nock错误: \n文件路径:%s \n错误信息:%s", nock, error.message);
			}
		}
	}
});

//打包模式
var webpackMode = 'dev';
if (process.argv.indexOf('p') >= 0
	||
	process.argv.indexOf('-p') >= 0
	||
	process.argv.indexOf('--p') >= 0
	||
	process.argv.indexOf('production') >= 0
	||
	process.argv.indexOf('-production') >= 0
	||
	process.argv.indexOf('--production') >= 0) {
	webpackMode = 'production';
}

if (process.argv.indexOf('-tomcat') >= 0 ||
	process.argv.indexOf('tomcat') >= 0) {
	webpackMode = "tomcat";
}

var devEntry = [
	'./publicFile/index'
];

if (webpackMode !== 'production' && webpackMode !== 'tomcat') {
	devEntry.push(
		'webpack-dev-server/client?http://localhost:3001',
		'webpack/hot/only-dev-server'
	);
}

//插件
var pluginLists = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.NoErrorsPlugin(),
	new webpack.ProvidePlugin({
		React: 'react',
		ReactDOM: 'react-dom',
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		'_': 'underscore'
	}),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		filename: 'vendor.js'
	})
];
//热替换插件
if (webpackMode !== 'production' && webpackMode !== 'tomcat') {
	pluginLists.push(new webpack.HotModuleReplacementPlugin());
}
//压缩混淆插件
if (webpackMode === 'production' || webpackMode === 'tomcat') {
	pluginLists.push(new webpack.optimize.UglifyJsPlugin({
		test: /(\.jsx|\.js)$/,
		compress: {
			warnings: false
		}
	}));

	pluginLists.push(new CleanPlugin(['dist'], {
		"root": path.resolve(__dirname, ''),
		verbose: true,
		dry: false
	}));
}

var webpackOutPublicPath = webpackMode == "production" ? '/shoppingCMS/dist/' : webpackMode == "tomcat" ? "./dist/" : "/dist/";
module.exports = {
	devtool: '#cheap-module-source-map',
	devServer: {
		host: '0.0.0.0'
	},
	entry: {
		login: devEntry.concat('./src/login'),
		home: devEntry.concat('./src/home'),
		vendor: ['react']
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].[name].[hash].[chunkhash].js',
		publicPath: webpackOutPublicPath
	},
	plugins: pluginLists,
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [
			path.join(__dirname, 'src')
		]
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.css?$/,
				loaders: ['style', 'css'],
				include: [
					path.join(__dirname, 'src'),
					path.join(__dirname, 'node_modules/antd'),
				]
			},
			{
				test: /\.scss?$/,
				loaders: ['style', 'css', 'autoprefixer', 'sass'],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url?limit=8192',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/font-woff',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file',
				include: [
					path.resolve(__dirname, "src")
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=image/svg+xml',
				include: [
					path.resolve(__dirname, "src")
				]
			}
		]
	}
};
