/**
 * Created by xiaojinfeng on  2016/2/2 10:08 .
 */
//var express = require('express');
const open = require('open');
const config = require('./webpack.config');
const webpack = require('webpack');
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
const WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var path = require('path');
var reload = require('reload');
var http = require('http');


var app = express();
app.use('/', express.static(path.join(__dirname, '/src')));


//初始化controller
require("./src/controller")(app);
var compiler = webpack(config);

var devMiddleWare = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
});
app.set('port', config.port || 8088);
app.use(devMiddleWare);
//dev模式的时候才加载hotMiddleWare
var hotMiddleWare = webpackHotMiddleware(compiler);
app.use(hotMiddleWare);

//var server = app.listen(app.get('port'), function () {
//  console.log('Oplate Server Running At http://localhost:' + app.get('port'));
//});


var server = http.createServer(app);
reload(server, app);
server.listen(app.get('port'), function () {
  console.log('Oplate Server Running At http://localhost:' + app.get('port'));
});

//new WebpackDevServer(webpack(config), config.devServer)
//  .listen(config.port, 'localhost', (err) => {
//    if (err) {
//      console.log(err);
//    }
//    console.log('Listening at localhost:' + config.port);
//    console.log('Opening your system browser...');
//    //open('http://localhost:' + config.port + '/webpack-dev-server/');
//  });


