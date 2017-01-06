var closeShare = (function (wx) {

	function getPower(res) {
		var wxTitle = "周边商城分享标题", wxImgUrl = "";
		if (res.ret == 0) {

			var data = res.data;
			wx.config({
				debug: false, //如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填
				jsApiList: ['showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填
			});

			wx.ready(function (res) {
				wx.showMenuItems({
					menuList: [
						'menuItem:share:appMessage',
						'menuItem:share:timeline',
						'menuItem:share:qq',
						'menuItem:share:weiboApp'
					]
				});
				//分享定义内容
				wx.onMenuShareTimeline({
					title: wxTitle,
					link: decodeURIComponent(href),
					imgUrl: wxImgUrl // 分享图标
				});
				wx.onMenuShareAppMessage({
					title: wxTitle, // 分享标题
					desc: '', // 分享描述
					link: decodeURIComponent(href), // 分享链接
					imgUrl: wxImgUrl // 分享图标
				});
				wx.onMenuShareQQ({
					title: wxTitle, // 分享标题
					desc: '', // 分享描述
					link: decodeURIComponent(href), // 分享链接
					imgUrl: wxImgUrl // 分享图标
				});
				wx.onMenuShareWeibo({
					title: wxTitle, // 分享标题
					desc: '', // 分享描述
					link: decodeURIComponent(href), // 分享链接
					imgUrl: wxImgUrl // 分享图标
				});

			});

			wx.error(function (res) {
				//签名过期导致验证失败
				if (res.errMsg != 'config:ok') { //如果签名失效，不读缓存，强制获取新的签名
					console.log("签名失效");
					var script = document.createElement("script");
					script.src = 'http://' + curSiteUrl + "/token/CreateJsApiTicket?url=" + href + "&callback=closeShare.getPower";
					document.body.insertBefore(script, document.body.firstChild);
				}
			});
		}
	};

	var href = encodeURIComponent(location.href.split('#')[0]);
	var script = document.createElement("script");
	//script.src = "http://wxtoken.wepiao.com/CreateJsApiTicket.php?url=" + href + "&callback=closeShare.getPower";
	script.src = 'http://' + curSiteUrl + "/token/CreateJsApiTicket?url=" + href + "&callback=closeShare.getPower";
	document.body.insertBefore(script, document.body.firstChild);

	return {
		getPower: getPower
	}

}(jWeixin));
