/**
 * Created by xiaojinfeng on  2016/2/2 10:08 .
 */
//var express = require('express');
const config = require('./webpack.config1');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//var app = express();
//app.set('port', 8181);
//app.use('/', express.static(__dirname));
//
//var server = app.listen(app.get('port'), function () {
//    console.log('server starte, http://localhost:' + app.get('port'));
//});
console.log("config->" + JSON.stringify(config));

new WebpackDevServer(webpack(config), config.devServer)
    .listen(config.port, 'localhost', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + config.port);
        console.log('Opening your system browser...');
        //open('http://localhost:' + config.port + '/webpack-dev-server/');
    });


