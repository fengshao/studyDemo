/**
 * Created by xiaojinfeng on  2015/12/11 16:36 .
 */
var webpack = require('webpack');
let BowerWebpackPlugin = require('bower-webpack-plugin');
let path = require('path');
const dfltPort = 8088;
const srcPath = path.join(__dirname, '/script/demo1');
module.exports = {
    port: dfltPort,
    debug: true,
    devtool: 'eval-source-map',
    output: {
        path: path.join(__dirname, '/dist/assets'),
        filename: 'main.js',
        publicPath: '/assets/'
    },
    devServer: {
        contentBase: './script/demo1/',
        historyApiFallback: true,
        hot: true,
        port: dfltPort,
        publicPath: '/assets/',
        noInfo: false
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            //actions: `${srcPath}/actions/`,
            //components: `${srcPath}/components/`,
            //sources: `${srcPath}/sources/`,
            //stores: `${srcPath}/stores/`,
            //styles: `${srcPath}/styles/`
        }
    },

    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            include: srcPath,
            loader: 'eslint-loader'
        }],
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.sass/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.styl/,
                loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'react-hot!babel-loader',
                include: [path.join(__dirname, './script/demo1')]
            }
        ]
    },

    entry: [
        'webpack-dev-server/client?http://127.0.0.1:' + dfltPort,
        'webpack/hot/only-dev-server',
        './script/demo1/index'
    ],
    cache: true,

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ]


};
