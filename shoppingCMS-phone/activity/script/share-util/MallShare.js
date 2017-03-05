(function () {
	var mqq = window.mqq;
	var activity_data = data && data.activity_data ? data.activity_data : [];
	var wxFriendsTitle1 = activity_data && activity_data.share_friends_title ? activity_data.share_friends_title : "更多优惠活动尽在娱票商城",
		wxTitle1 = activity_data && activity_data.share_group_title ? activity_data.share_group_title : "娱票商城",
		wxDesc1 = activity_data && activity_data.share_group_detail ? activity_data.share_group_detail : "更多优惠活动尽在娱票商城",
		wxImgUrl1 = activity_data && activity_data.share_friends_pic ? activity_data.share_friends_pic.indexOf("http://") == 0 ? activity_data.share_friends_pic : location.protocol + activity_data.share_friends_pic : "";

	function getPower(res) {

		// alert(JSON.stringify(mqq));
		if (res.ret == 0) {

			var data = res.data;
			/* alert(
			 [data.appId,
			 data.timestamp,
			 data.nonceStr,
			 data.signature].join(',')
			 )*/
			mqq.config({
				debug: false, //如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareQzone',
					'onMenuShareWeibo',
					'hideMenuItems',
					'showMenuItems',
					'hideAllNonBaseMenuItem',
					'showAllNonBaseMenuItem',
					// 'translateVoice',
					// 'startRecord',
					// 'stopRecord',
					// 'onRecordEnd',
					// 'playVoice',
					// 'pauseVoice',
					// 'stopVoice',
					// 'uploadVoice',
					// 'downloadVoice',
					// 'chooseImage',
					// 'previewImage',
					// 'uploadImage',
					// 'downloadImage',
					'getNetworkType',
					// 'openLocation',
					// 'getLocation',
					'hideOptionMenu',
					'showOptionMenu',
					'closeWindow',
					// 'scanQRCode',
					// 'chooseQQPay',
					// 'openProductSpecificView',
					// 'addCard',
					// 'chooseCard',
					// 'openCard'
				]
				// 必填
			});

			// var SiteUrl = "http://" + curSiteUrl + "/";
			// if (SiteUrl == location.href || location.href.indexOf("/detail/onlineId") != -1 ) {

			mqq.ready(function (res) {


				mqq.showAllNonBaseMenuItem();
				mqq.showOptionMenu();
				mqq.showMenuItems({
					menuList: [
						'menuItem:share:appMessage',
						'menuItem:share:qq',
						'menuItem:share:QZone',
						'menuItem:share:copyUrl',
						'menuItem:share:timeline'
					]
				});
				var title = wxTitle1;
				var desc = wxDesc1;
				var imgUrl = wxImgUrl1;
				var _href = location.href.split('#')[0];
				if (_href.indexOf("_wv") < 0) {
					if (_href.indexOf("?") >= 0) {
						_href += "&_wv=4097"
					} else {
						_href += "?_wv=4097"
					}
				}

				mqq.onMenuShareTimeline({
					title: wxFriendsTitle1, // 分享标题
					// desc: data.itemTitle, // 分享描述
					// desc : desc,
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
				mqq.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
				mqq.onMenuShareQzone({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
				mqq.onMenuShareQQ({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

			});

			/*} else {
			 wx.ready(function(res) {
			 wx.hideMenuItems({
			 menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
			 });
			 });
			 }*/

			mqq.error(function (res) {
				//签名过期导致验证失败
				if (res.errMsg != 'config:ok' && reqCount < 2) { //如果签名失效，不读缓存，强制获取新的签名
					var script = document.createElement("script");
					//script.src = '//'+curSiteUrl+"/token/CreateJsApiTicket?url=" + href + "&callback=closeShare.getPower&force=1";
					script.src = '//mqq.wesai.com/token/CreateJsApiTicket?url=' + href + "&callback=closeShare.getPower&force=1";
					document.body.insertBefore(script, document.body.firstChild);
					reqCount++;
				}
			});
		}
	};

	// alert(location.href);
	var reqCount = 0;
	var href = encodeURIComponent(location.href.split('#')[0]);
	var script = document.createElement("script");
	//script.src = '//'+curSiteUrl+"/token/CreateJsApiTicket?url=" + href + "&callback=closeShare.getPower";
	script.src = '//mqq.wesai.com/token/CreateJsApiTicket?url=' + href + "&callback=closeShare.getPower&force=1";
	document.body.insertBefore(script, document.body.firstChild);

	var closeShare = {
		getPower: getPower,
		ready: function () {
			mqq.ready(function (res) {
				mqq.showAllNonBaseMenuItem();
				mqq.showOptionMenu();
				mqq.showMenuItems({
					menuList: [
						'menuItem:share:appMessage',
						'menuItem:share:qq',
						'menuItem:share:QZone',
						'menuItem:share:copyUrl',
						'menuItem:share:timeline'
					]
				});
				var title = wxTitle1;
				var desc = wxDesc1;
				var imgUrl = wxImgUrl1;
				var _href = location.href.split('#')[0];
				if (_href.indexOf("_wv") < 0) {
					if (_href.indexOf("?") >= 0) {
						_href += "&_wv=4097"
					} else {
						_href += "?_wv=4097"
					}
				}

				mqq.onMenuShareTimeline({
					title: wxFriendsTitle1, // 分享标题
					// desc: data.itemTitle, // 分享描述
					// desc : desc,
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
				mqq.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
				mqq.onMenuShareQzone({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});
				mqq.onMenuShareQQ({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: _href, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function () {
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				});

			});
		}
	};
	// var shareTitle = '手机QQ赛事票'
	//  document.title = shareTitle;
	var shareTitle = wxTitle1 ? wxTitle1 : "CBA秒杀来袭 限时五折抢购";
	var shareDesc = wxDesc1 ? wxDesc1 : "下载微赛App，即刻参与CBA秒杀抢购，数量有限，速来抢购吧~！";
	var shareLogo = wxImgUrl1 ? wxImgUrl1 : "https://mini.wesai.com/zjms/img/share-icon.jpg?v=";

	$('#meta-title').attr("content", shareTitle);
	$('#meta-description').attr("content", shareDesc);
	$('meta[itemprop="image"]').attr("content", shareLogo);

	window.closeShare = closeShare;
	return closeShare;

})();