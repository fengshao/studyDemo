/**
 *
 */
//是否是线上环境  isProduction=true表示是线上环境
var webpackMode = "dev", isProduction = false;

if (process.argv.indexOf("p") >= 0
	||
	process.argv.indexOf("-p") >= 0
	||
	process.argv.indexOf("--p") >= 0
	||
	process.argv.indexOf("production") >= 0
	||
	process.argv.indexOf("-production") >= 0
	||
	process.argv.indexOf("--production") >= 0) {
	webpackMode = "production";
	isProduction = true;
}
//分布式跟踪
var trace = require("distributed-trace-for-nodejs");
trace.init({
	zipkinUrl: "http://172.19.100.22:9001",   //将跟踪记录到服务器的url
	serviceName: "oplate_rest"
});
//获取服务的IP地址
function getServerIp() {
	var os = require('os');
	var ifaces = os.networkInterfaces();
	var addresses = [];
	Object.keys(ifaces).forEach(function (ifname) {
		ifaces[ifname].forEach(function (iface) {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return;
			}
			addresses.push(iface.address);
		});
	});
	return addresses;
}
//获取是否需要nock数据
function getProvideNockData() {
	var needNockData = false;
	if (process.argv.indexOf("nock") >= 0
		||
		process.argv.indexOf("-nock") >= 0
		||
		process.argv.indexOf("--nock") >= 0) {
		needNockData = true;
	}
	return needNockData;
}

var config = {
	//web服务端口
	port: 3001,
	//是否是线上环境
	isProduction: isProduction,
	//是否提供nock数据
	provideNockData: getProvideNockData(),
	//webpack打包模式
	webpackMode: webpackMode,
	session: {
		hazelcastPrivateKey: "oplate_session",//hazelcast的前缀
		maxAge: 24 * 60 * 60 * 1000, //session默认24小时
		secret: "CV193WIC"   //加密session id使用的秘钥
	},
	proxy: {
		"protocal": "http://",
		"host": "172.19.104.108",
		"port": "8182"
	},
	//rest返回数据格式为json
	restJson: true,
	//默认rest请求超时时长
	restTimeout: 1000 * 30,
	//跟踪实例
	oplateTrace: trace,
	pushServer: "http://172.19.104.108:9093",
	coordinatorConfig: {
		// coordinator 服务地址
		coordinator: {
			// host / port
			host: "172.19.103.51",
			port: 80
		},
		registerSelf: false,//是否注册本服务(nodejs)到服务注册中心
		token: "123"
	},
	appId: "COM.ANTFACT.OPLATE"
};

config.nockUrl = config.proxy.protocal + config.proxy.host + ":" + config.proxy.port;

module.exports = config;
