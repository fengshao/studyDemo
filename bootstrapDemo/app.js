//初始化日志
var fs = require('fs')
	, path = require("path");
//express服务
var express = require('express'),
	sass_handler = require('./javascript/render');

var app = express();

app.set('port',9192);



app.use(express.compress());
//app.use(sass_handler());
app.use('/', express.static(__dirname));
app.use(express.urlencoded());
app.use(express.json());
app.use(app.router);

var server = app.listen(app.get('port'), function () {
	console.log('Antrol Saas Server Running At ' + app.get('port'));
});


