/**
 * Created by xiaojinfeng on  2015/12/11 16:36 .
 */
var webpack = require('webpack');
let BowerWebpackPlugin = require('bower-webpack-plugin');
let path = require('path');
const dfltPort = 8181;
const srcPath = path.join(__dirname, '/src');
module.exports = {
//插件项
//    plugins: [commonsPlugin],
//页面入口文件配置
//    entry: {index: './index'},
//入口文件输出配置
//    output: {path: 'build/js', filename: '[name].js'},
//    module: {
//        //加载器配置
//        loaders: [
//            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
//            {test: /\.css$/, loader: 'style-loader!css-loader'},
//            {test: /\.js$/, loader: 'jsx-loader?harmony'},
//            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
//        ]
//    },
//    //其它解决方案配置
//    resolve: {
//        extensions: ['', '.js', '.json', '.scss']
//    },

    output: {
        path: path.join(__dirname, '/dist/assets'),
        filename: 'main.js',
        publicPath: '/assets/'
    },

    cache: true,
    debug: true,
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:' + dfltPort,
        'webpack/hot/only-dev-server',
        './script/demo1/index.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },

    port: dfltPort,
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
                include: path.join(__dirname, './src')
            }
        ]
    },

    devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: dfltPort,
        publicPath: '/assets/',
        noInfo: false
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            actions: `${srcPath}/actions/`,
            components: `${srcPath}/components/`,
            sources: `${srcPath}/sources/`,
            stores: `${srcPath}/stores/`,
            styles: `${srcPath}/styles/`
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        }),
        new webpack.HotModuleReplacementPlugin()
    ]


};
