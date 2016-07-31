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
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
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
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader',
        include: [path.join(__dirname, './src')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + dfltPort,
    'webpack/hot/only-dev-server',
    './src/demo1/public/index',
    './public/index'
  ],
  cache: true,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
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
