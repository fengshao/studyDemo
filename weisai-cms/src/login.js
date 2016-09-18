//直接引入scss,顶层目录是src,可以不用../
require("styles/login.scss");
//引入ant.design
require("antd/dist/antd.css");
//全局变量
//console.log(jQuery,$);
//console.log(React);
//console.log(ReactDOM);
//console.log(_);
//使用react渲染页面
var Login = require("scripts/login");


ReactDOM.render(<Login /> , $('#main')[0]);