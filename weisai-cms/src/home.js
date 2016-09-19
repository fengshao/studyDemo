//直接引入scss,顶层目录是src,可以不用../
require("styles/home.scss");
//引入ant.design
require("antd/dist/antd.css");
//全局变量
// console.log(jQuery,$);
// console.log(React);
// console.log(ReactDOM);
// console.log(_);
//使用react渲染页面
var Frame = require("scripts/frame");
var NeedLogin = require("component/needLogin");
var PublicAjax = require("./ajax/public-ajax");

PublicAjax.userIsLogin().then(function (data) {
	if (data === 0) {
		ReactDOM.render(<Frame />, $('#main')[0]);
	} else {
		ReactDOM.render(<NeedLogin />, $('#main')[0]);
	}
}, function (errorMsg) {
	ReactDOM.render(<NeedLogin />, $('#main')[0]);
});
