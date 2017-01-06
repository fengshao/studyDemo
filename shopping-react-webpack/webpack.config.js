var path = require('path');
var webpack = require('webpack');
const srcPath = path.join(__dirname, '/app');

module.exports = {
	entry: [path.resolve(__dirname, './app/main.js')],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js'
	},
	module: {
		preLoaders: [{
			test: /\.(js|jsx)$/,
			include: srcPath,
			loader: 'eslint-loader'
		}],
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url?limit=25000'
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			loader: 'react-hot!babel-loader',
			include: [path.join(__dirname, './app')]
		}]
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom',
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'_': 'underscore'
		})
	]
};