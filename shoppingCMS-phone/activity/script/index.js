/**
 * Created by fengshao on 2017/2/13.
 */

var goodstype_data = data && data.goodstype_data ? data.goodstype_data : [],
	activity_data = data && data.activity_data ? data.activity_data : [],
	goods_data = data && data.goods_data ? data.goods_data : [],
	designersBg = data && data.designersBg_data[0] ? data.designersBg_data[0] : {};

var nowTypeID = getQueryString("data-id");
var index = getNowTypeIDIndex();


var wxFriendsTitle = activity_data && activity_data.share_friends_title ? activity_data.share_friends_title : "更多优惠活动尽在娱票商城",
	wxTitle = activity_data && activity_data.share_group_title ? activity_data.share_group_title : "娱票商城",
	wxDesc = activity_data && activity_data.share_group_detail ? activity_data.share_group_detail : "更多优惠活动尽在娱票商城",
	wxImgUrl = activity_data && activity_data.share_friends_pic ? activity_data.share_friends_pic.indexOf("http://") == 0 ? activity_data.share_friends_pic : location.protocol + activity_data.share_friends_pic : "";

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)return unescape(r[2]);
	return null;
}

function getNowTypeIDIndex() {
	var index = 0;
	goodstype_data.map(function (goodsType, key) {
		if (goodsType.id == nowTypeID) {
			index = key;
		}
	})

	return Math.floor(index / 3);
}

$(function () {
	var parms = {
		cliWH: 0,
		cliHG: 0
	};

	layoutInit();

	function layoutInit() {
		parms.cliWH = document.documentElement.clientWidth;
		parms.cliHG = document.documentElement.clientHeight;
		$(".active-end-content").css("height", parms.cliHG).css("width", parms.cliWH);

		renderDom();
	};

	function renderDom() {
		var nowTime = new Date().getTime();
		var endTime = new Date(activity_data.end_time).getTime();
		var isEnd = endTime < nowTime;
		var datas = {
			data: activity_data
		};
		var html = template('renderDom', datas);
		$(".active-content").html(html);

		var returnHome = {
			data: activity_data
		};
		var returnHomeHtml = template('returnHomeDom', returnHome);
		$(".content").append(returnHomeHtml);


		$(".designers-recommend-content").css("height", parms.cliWH / 375 * 200);
		$("body").css("background-image", 'url("' + activity_data.bg_body + '")');

		var bgMusicData = {
			data: activity_data.bg_music
		};
		var bgMusicHtml = template('renderBgMusicDom', bgMusicData);
		$(".content").append(bgMusicHtml);

		var myAudio = document.getElementById("bgMusic");
		if (myAudio) {
			myAudio.play();
			document.addEventListener("WeixinJSBridgeReady", function () {
				myAudio.play();
			}, false);

			document.addEventListener('YixinJSBridgeReady', function () {
				myAudio.play();
			}, false);
		}

		if (activity_data.banner_from == 2) {
			renderDesigners();
		}
		if (activity_data.is_had_hb) {
			renderHb();
		}

		renderCommoditys();

		if (isEnd) {
			$("body").scrollTop("0")
			$("body").css("overflow", "hidden");
			$(".active-end-content").show();
		} else {
			$(".active-end-content").hide();
			$("body").css("overflow", "auto");
		}

		$(".music-btn").on("click", function () {
			var music = document.getElementById("bgMusic");
			if ($(this).hasClass("close-music-music")) {
				$(this).removeClass("close-music-music");
				music.play();
			} else {
				closeBgMusic($(this));
			}
		});

	};


	//关闭背景音乐
	function closeBgMusic($element) {
		var music = document.getElementById("bgMusic");
		$element.addClass("close-music-music");
		music.pause();
	}

	function renderDesigners() {

		var img1Url = designersBg.img1 && designersBg.img1 ? designersBg.img1 : "";
		var img2Url = designersBg.img2 && designersBg.img2 ? designersBg.img2 : "";
		var img3Url = designersBg.img3 && designersBg.img3 ? designersBg.img3 : "";
		var img4Url = designersBg.img4 && designersBg.img4 ? designersBg.img4 : "";
		$(".designers-recommend-bg").css("background-image", 'url("' + img1Url + '")');
		$(".designers-recommend-content").css("background-image", 'url("' + img2Url + '")');
		$(".arrow-left").css("background-image", 'url("' + img3Url + '")');
		$(".arrow-right").css("background-image", 'url("' + img4Url + '")');

		layoutDesignersInit();
		designersObj(goodstype_data.slice(0, 15));
		var listWH = parms.cliWH - 20 * 2;
		var listLiWH = (listWH - 10 * 2 - 15 * 2) / 3;
		if (goodstype_data.length > 3) {
			var allIndex = Math.ceil(goodstype_data.slice(0, 15).length / 3);
			if (index == 0) {
				$(".arrow-right").show();
				$(".arrow-left").hide();
			}
			if (index == (allIndex - 1)) {
				$(".arrow-right").hide();
				$(".arrow-left").show();
			}
			if (index > 0 && index <= (allIndex - 2)) {
				$(".arrow-right").show();
				$(".arrow-left").show();
			}
		}
		$(".designers-recommend-content-div").css("width", listLiWH).css("height", listLiWH);
	};

	function layoutDesignersInit() {
		var listWH = parms.cliWH - 20 * 2;
		var listLiWH = (listWH - 10 * 2 - 15 * 2) / 3;
		$(".designers-recommend-list, .designers-recommend-list-content").css("width", listWH).css("height", listLiWH + 19 * 2);
		$(".designers-recommend-content-div").css("width", listLiWH).css("height", listLiWH);
	};

	function renderHb() {
		$(".hb-content-list-one-cls").css("width", parms.cliWH - 176);
		$(".hb-content-list-two-cls").css("width", (parms.cliWH - 104 - 2) / 2);
		$(".hb-content-list-three-cls").css("width", (parms.cliWH - 44 - 4) / 3);
		$(".hb-content-list").css("background-image", 'url("' + activity_data.bg_hb + '")');
	};

	function renderCommoditys() {
		addEvent();
		var typeID = getQueryString("data-id") ? getQueryString("data-id") : goodstype_data[0].id;
		var element = null;
		$(".designers-recommend-list-content .designers-recommend-content-div").each(function () {
			if ($(this).attr("data-id") == typeID) {
				element = $(this);
			}
		});

		if (element) {
			element.trigger("click");
		} else {
			$(".designers-recommend-list-content .designers-recommend-content-div")[0].trigger("click");
		}

		//var sss = [];
		//if (activity_data.banner_from == 2) {
		//	var typeID = getQueryString("data-id") ? getQueryString("data-id") : goodstype_data[0].id;
		//	goods_data.map(function (commodity, key) {
		//		if (typeID == commodity.type_id) {
		//			sss.push(commodity);
		//		}
		//	})
		//} else {
		//	sss = goods_data;
		//}
		//
		//var datas = {
		//	list: sss,
		//	clickType: "commodity_",
		//	goodsBgImg: activity_data.bg_goods
		//};
		//
		//var html = template('renderCommodityDom', datas);
		//$(".commodity-content").html(html);
		//layoutCommodity();
	};

	function layoutCommodity() {
		var marginTop = 50 / 667 * parms.cliHG;
		var marginBotttom = 30 / 667 * parms.cliHG;
		var marginLeft = 45 / 375 * parms.cliWH;
		$(".commodity-content-list-a").css("width", parms.cliWH - marginLeft * 2).css("margin", [marginTop + "px", marginLeft + "px", marginBotttom + "px", marginLeft + "px"].join(" "));
		$(".commodity-img").css("width", (parms.cliWH - marginLeft * 2) * (120 / 285)).css("height", (parms.cliWH - marginLeft * 2) * (120 / 285));
		$(".commodity-information").css("width", (parms.cliWH - marginLeft * 2 ) - 9 - (parms.cliWH - marginLeft * 2 ) * (120 / 285));
		$(".commodity-desc-content").css("width", (parms.cliWH - marginLeft * 2 ));
		$(".commodity-content-list-div").css("height", (parms.cliWH - marginLeft * 2) * (120 / 285));
		$(".commodity-desc-img").css("width", parms.cliWH - marginLeft * 2 - 40);
	}

	function addEvent() {
		$(".designers-recommend-content-div").on("click", function () {

			var typeID = $(this).attr("data-id");
			var index = $(this).attr("data-index");
			$(".designers-recommend-content-div").removeClass("select");
			$(this).addClass("select");
			var sss = [];
			goods_data.map(function (commodity, key) {
				if (typeID == commodity.type_id) {
					sss.push(commodity);
				}
			})

			var datas = {
				list: sss,
				clickType: "commodity_" + index + "_",
				goodsBgImg: activity_data.bg_goods
			};

			var html = template('renderCommodityDom', datas);
			$(".commodity-content").html(html);
			layoutCommodity();
		});
	};

});

//微信分享
var sharewx = {
	title: wxTitle ? wxTitle : "娱票商城",
	desc: wxDesc ? wxDesc : "更多优惠活动尽在娱票商城",
	friend: wxFriendsTitle ? wxFriendsTitle : "更多优惠活动尽在娱票商城",
	link: window.location.href,
	imgUrl: wxImgUrl,
	trigger: function (res) {
		// alert('点击分享');
	},
	complete: function (res) {
		// alert(JSON.stringify(res));
	},
	success: function (res) {
		// alert('已分享');

	},
	cancel: function (res) {
		// alert('已取消');
	},
	fail: function (res) {
		// alert(JSON.stringify(res));
	}
};
WeixinApi.init({
	debug: false,
	url: null
});
WeixinApi.share(sharewx);