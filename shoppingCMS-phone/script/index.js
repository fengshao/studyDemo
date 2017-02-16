/**
 * Created by fengshao on 2017/2/13.
 */
$(function () {

	var activeData = {
		banner_from: "2",
		activity_url: "www.baidu.com",
		activity_pic_banner: "//devel-10016962.file.myqcloud.com/9/8bb/326ba/98bbf326babf1fc2e36f6710c3c59ff5.jpeg",
		is_had_hb: "1",
		bg_separate: "http://devel-10016962.file.myqcloud.com/6/1b8/a3698/61b83a36983497c2a7e330c9c416da51.jpg",
		bg_goods: "http://devel-10016962.file.myqcloud.com/6/11b/36211/611bc36211c3e1e15fb0c5b9635c0e22.jpg",
		bg_hb: "http://devel-10016962.file.myqcloud.com/0/d8f/c28b0/0d8fcc28b01591dbdea36a2ebaa8df49.jpg",
		hb_count: "3",
		hb_1_url: "",
		hb_1_img: "http://devel-10016962.file.myqcloud.com/1/db3/a6315/1db31a63158e1a6f3f5b8ed02cc74f94.jpg",
		hb_2_url: "",
		hb_2_img: "http://devel-10016962.file.myqcloud.com/d/701/48560/d7018485600afc678cc5a425a62106c9.jpg",
		hb_3_url: "",
		hb_3_img: "http://devel-10016962.file.myqcloud.com/8/4a0/d907e/84a0dd907e50021db01f12f866c20785.jpg"
	};

	var designersData = [{
		"id": 122,
		"type_id": 7,
		"title": "\u8c22\u8c22",
		"title_en": null,
		"description": null,
		"sort": "664",
		"status": 0,
		"create_time": "1482324078",
		"update_time": "2017-01-12 11:37:13",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "\/\/devel-10016962.file.myqcloud.com\/e\/c98\/3093c\/ec9803093c02eb3a91f20f53d34d4db3.png"
	}, {
		"id": 115,
		"type_id": 7,
		"title": "asdfa",
		"title_en": null,
		"description": null,
		"sort": "231",
		"status": 0,
		"create_time": "1482221778",
		"update_time": "2017-01-12 11:37:33",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "\/\/devel-10016962.file.myqcloud.com\/0\/d57\/280e1\/0d577280e1a04bf57746416297dc6f48.png"
	}, {
		"id": 113,
		"type_id": 7,
		"title": "asdfasdaaa",
		"title_en": null,
		"description": null,
		"sort": "223",
		"status": 0,
		"create_time": "1482221745",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/4\/c21\/123c1\/4c21e123c11f257a198c5d1afef19b2c.png"
	}, {
		"id": 121,
		"type_id": 7,
		"title": "as",
		"title_en": null,
		"description": null,
		"sort": "78",
		"status": 0,
		"create_time": "1482323499",
		"update_time": "2016-12-21 20:40:39",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "\/\/devel-10016962.file.myqcloud.com\/8\/ee8\/d1d3f\/8ee86d1d3ff119fa9d6eb2b9cc8440f5.jpg"
	}, {
		"id": 108,
		"type_id": 7,
		"title": "asdfasd",
		"title_en": null,
		"description": null,
		"sort": "66",
		"status": 0,
		"create_time": "1482221654",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/3\/3b7\/dbbde\/33b73dbbdee82c9350ab242f3bd1f5a2.png"
	}, {
		"id": 106,
		"type_id": 7,
		"title": "\u8863\u670d",
		"title_en": null,
		"description": null,
		"sort": "45",
		"status": 0,
		"create_time": "1482221345",
		"update_time": "2016-12-20 22:13:14",
		"channel_terminal": "1",
		"url": "http:\/\/store.wepiao.com\/index.php\/wap\/special-29.html",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/2\/932\/67fb7\/2932e67fb7a3e240c0a514f4534f4a04.png"
	}, {
		"id": 117,
		"type_id": 7,
		"title": "sad",
		"title_en": null,
		"description": null,
		"sort": "44",
		"status": 0,
		"create_time": "1482221809",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/8\/4ea\/227bb\/84ea2227bb9aa75b652268e4b3a1135c.png"
	}, {
		"id": 120,
		"type_id": 7,
		"title": "qwerqw",
		"title_en": null,
		"description": null,
		"sort": "33",
		"status": 0,
		"create_time": "1482242378",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "https:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/e\/208\/4341f\/e20824341f8f762dff3b463cd9b64eef.png"
	}, {
		"id": 112,
		"type_id": 7,
		"title": "asdf",
		"title_en": null,
		"description": null,
		"sort": "23",
		"status": 0,
		"create_time": "1482221731",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/f\/8ca\/b8897\/f8cadb8897e56be1796ff8286b88422f.png"
	}, {
		"id": 110,
		"type_id": 7,
		"title": "adfas",
		"title_en": null,
		"description": null,
		"sort": "22",
		"status": 0,
		"create_time": "1482221690",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/3\/da1\/6090a\/3da146090ac8604dc29f0aae8ec7416f.png"
	}, {
		"id": 116,
		"type_id": 7,
		"title": "adfa",
		"title_en": null,
		"description": null,
		"sort": "20",
		"status": 0,
		"create_time": "1482221795",
		"update_time": "2016-12-20 21:17:51",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/8\/b50\/a9bdf\/8b503a9bdfaea5c9eb58e3292134e07f.png"
	}, {
		"id": 103,
		"type_id": 7,
		"title": "\u978b",
		"title_en": null,
		"description": null,
		"sort": "7",
		"status": 0,
		"create_time": "1482221268",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/b\/5e5\/05b1a\/b5e5105b1acedbed07bc1299c99d42f8.png"
	}, {
		"id": 104,
		"type_id": 7,
		"title": "\u5e3d\u5b50",
		"title_en": null,
		"description": null,
		"sort": "6",
		"status": 0,
		"create_time": "1482221308",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/2\/3be\/454ad\/23bed454ad5e5713395b67b9912d833d.png"
	}, {
		"id": 105,
		"type_id": 7,
		"title": "\u889c\u5b50",
		"title_en": null,
		"description": null,
		"sort": "5",
		"status": 0,
		"create_time": "1482221328",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/a\/007\/82b59\/a007b82b59d37ef6ce39a96c2cb86721.png"
	}, {
		"id": 107,
		"type_id": 7,
		"title": "\u963f\u65af\u8482\u82ac",
		"title_en": null,
		"description": null,
		"sort": "3",
		"status": 0,
		"create_time": "1482221639",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/2\/fd7\/2740e\/2fd792740ebd9ab2c103d48e83d4e939.png"
	}, {
		"id": 111,
		"type_id": 7,
		"title": "asdfasda",
		"title_en": null,
		"description": null,
		"sort": "2",
		"status": 0,
		"create_time": "1482221706",
		"update_time": "0000-00-00 00:00:00",
		"channel_terminal": "1",
		"url": "http:\/\/www.baidu.com",
		"img": "http:\/\/devel-10016962.file.myqcloud.com\/5\/954\/6195e\/5954f6195e2ea557cb0856e9eaf04edf.png"
	}];

	var designersBg = {
		create_time: "1482221192",
		id: 1,
		img1: "http://devel-10016962.file.myqcloud.com/4/2ce/4d062/42cef4d06210460c208e044444c1c80c.gif",
		img2: "http://devel-10016962.file.myqcloud.com/8/42a/4b335/842ac4b33569b7088b0532567af66e64.jpg",
		img3: "http://devel-10016962.file.myqcloud.com/e/e9e/27173/ee9ec271732cba7c7a1f010b59ed3b95.gif",
		img4: "//devel-10016962.file.myqcloud.com/b/771/5fb0a/b771c5fb0a5d6ba82de6a18da4060a3f.gif",
		status: "0",
		update_time: "2017-01-12 11:38:12"
	};

	var commoditysData = [{
		"id": 213,
		"is_include_desc": "0",
		"title": "这特么是个啥这特",
		"title_color": "231",
		"description": "这是商品描述描述描述描述描述描述描述描述描述描述描述",
		"description_color": "",
		"original_price": "¥145.58",
		"original_price_color": "",
		"price": "¥888.18",
		"price_color": "",
		"price_desc": "现价：",
		"price_desc_color": "",
		"url": "http:\/\/www.baidu.com",
		"pic": "\/\/devel-10016962.file.myqcloud.com\/0\/d57\/280e1\/0d577280e1a04bf57746416297dc6f48.png",
		"desc_bg_pic": "http://devel-10016962.file.myqcloud.com/f/9fb/c5006/f9fb7c50064611a143061ef1b14172ff.jpg",
		"desc_pic": "http://devel-10016962.file.myqcloud.com/d/701/48560/d7018485600afc678cc5a425a62106c9.jpg"
	}, {
		"id": 115,
		"is_include_desc": "1",
		"title": "这特么又是个啥啊",
		"title_color": "231",
		"description": "楼上是假的我才是",
		"description_color": "",
		"original_price": "¥145.58",
		"original_price_color": "",
		"price": "¥111.88",
		"price_color": "",
		"price_desc": "现价：",
		"price_desc_color": "",
		"url": "http:\/\/www.baidu.com",
		"pic": "\/\/devel-10016962.file.myqcloud.com\/0\/d57\/280e1\/0d577280e1a04bf57746416297dc6f48.png",
		"desc_pic": "http://devel-10016962.file.myqcloud.com/d/65a/e6809/d65a7e6809fec4d69717e3222d5d8c49.jpg",
		"desc_bg_pic": "http://devel-10016962.file.myqcloud.com/8/4a0/d907e/84a0dd907e50021db01f12f866c20785.jpg"
	}];

	var parms = {
		cliWH: 0,
		cliHG: 0
	};

	layoutInit();

	function layoutInit() {
		parms.cliWH = document.documentElement.clientWidth;
		parms.cliHG = document.documentElement.clientHeight;
		$(".designers-recommend-content").css("height", parms.cliWH / 375 * 200);
		renderDom();
	};

	function renderDom() {


		var nowTime = new Date().getTime();
		var endTime = new Date("2018-01-08 17:20").getTime();
		var datas = {
			obj: {
				data: activeData,
				isEnd: endTime < nowTime
			}
		};
		var html = template('renderDom', datas);
		$(".active-content").html(html);

		if (activeData.banner_from == 2) {
			renderDesigners();
		}
		if (activeData.is_had_hb) {
			renderHb();
		}

		renderCommoditys();
	};

	function renderDesigners() {

		$(".designers-recommend-bg").css("background-image", 'url("' + designersBg.img1 + '")');
		$(".designers-recommend-content").css("background-image", 'url("' + designersBg.img2 + '")');
		$(".arrow-left").css("background-image", 'url("' + designersBg.img3 + '")');
		$(".arrow-right").css("background-image", 'url("' + designersBg.img4 + '")');

		layoutDesignersInit();
		designersObj(designersData.slice(0, 15));
		var listWH = parms.cliWH - 20 * 2;
		var listLiWH = (listWH - 10 * 2 - 15 * 2) / 3;
		if (designersData.length > 3) {
			$(".arrow-right").show();
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
		$(".hb-content-list").css("background-image", 'url("' + activeData.bg_hb + '")');
	};

	function renderCommoditys() {
		var datas = {
			list: commoditysData,
			clickType: "commodity_"
		};

		var marginTop = 50 / 667 * parms.cliHG;
		var marginBotttom = 30 / 667 * parms.cliHG;
		var marginLeft = 45 / 375 * parms.cliWH;


		var html = template('renderCommodityDom', datas);
		$(".commodity-content").html(html);
		$(".bg_goods").css("background-image", 'url("' + designersBg.img3 + '")');
		$(".commodity-content-list-a").css("width", parms.cliWH - marginLeft * 2).css("margin", [marginTop + "px", marginLeft + "px", marginBotttom + "px", marginLeft + "px"].join(" "));
		$(".commodity-img").css("width", (parms.cliWH - marginLeft * 2) * (120 / 285)).css("height", (parms.cliWH - marginLeft * 2) * (120 / 285));
		$(".commodity-information").css("width", (parms.cliWH - marginLeft * 2 ) - 9 - (parms.cliWH - marginLeft * 2 ) * (120 / 285));
		$(".commodity-desc-content").css("width", (parms.cliWH - marginLeft * 2 ));
		$(".commodity-content-list-div").css("height", (parms.cliWH - marginLeft * 2) * (120 / 285));
		$(".commodity-desc-img").css("width", parms.cliWH - marginLeft * 2 - 40);

	};

});