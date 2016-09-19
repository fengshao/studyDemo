var path = require('path');
var webpack = require('webpack');

var devEntry = [
	'webpack-dev-server/client?http://localhost:3001',
	'webpack/hot/only-dev-server',
	'./publicFile/index'
];

module.exports = {
	devtool: '#cheap-module-source-map',
	entry: {
		login: devEntry.concat('./src/login'),
		home: devEntry.concat('./src/home')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: '/dist/'
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'_': 'underscore'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
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
			},
		]
	}
};
