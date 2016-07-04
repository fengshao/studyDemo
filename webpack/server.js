/**
 * Created by xiaojinfeng on  2016/2/2 10:08 .
 */
var express = require('express');
var app = express();
app.set('port', 8181);
app.use('/', express.static(__dirname));

var server = app.listen(app.get('port'), function () {
    console.log('server starte, http://localhost:' + app.get('port'));
});

