/**
 * Created by fengs on 2016/9/17.
 */
var locationHref = window.location.href.split("#")[0];
var intraUrl = "//topics-cms.intra.wesai.com/api/";
var develUrl = "//topics-cms.devel.wesai.com/api/";
var testUrl = "//topics-cms.test.wesai.com/api/";
var localUrl = "//periphery.devel.wesai.com/api/";
var jinde = "//topics-cms.mjd.wesai.com/api/";
var noCacheUurlData = "?cacheOpen=11&pageSize=1000&channel=all";
var cacheUrlData = "?pageSize=1000&channel=all";

var parms = {
	editUrl: intraUrl + "editSpecial",//post
	getListUrl: intraUrl + "getSpecialList" + cacheUrlData, //get
	addUrl: intraUrl + "addSpecial",//post
	delUrl: intraUrl + "delSpecial",//get
	isloginUrl: intraUrl + "isLogin",//get
	loginOut: intraUrl + "logout",
	getSpecalTypeList: intraUrl + "getSpecialTypeList?channel=1", //get
	getOperateLogList: intraUrl + "getOperateLogList", //get
	editSpecialType: intraUrl + "editSpecialType",
	getShareList: intraUrl + "getShareList",
	addShare: intraUrl + "addShare",
	editShare: intraUrl + "editShare",
	getBackgroundList: intraUrl + "getBackgroundList",
	addBackground: intraUrl + "addBackground",
	editBackground: intraUrl + "editBackground",
	specialDeploy: intraUrl + "special_deploy",
	getGoodsTypeList: intraUrl + "getGoodsTypeList",
	addGoodsType: intraUrl + "addGoodsType",
	editGoodsType: intraUrl + "editGoodsType",
	delGoodsType: intraUrl + "delGoodsType",
	getGoodsList: intraUrl + "getGoodsList",
	addGoods: intraUrl + "addGoods",
	editGoods: intraUrl + "editGoods",
	delGoods: intraUrl + "delGoods",
	getActivityList: intraUrl + "getActivityList",
	addActivity: intraUrl + "addActivity",
	editActivity: intraUrl + "editActivity",
	delActivity: intraUrl + "delActivity",
	shelfActivity: intraUrl + "shelfActivity",
	offShelfActivity: intraUrl + "offShelfActivity",
	activityDeploy: intraUrl + "activityDeploy",
	user_role: window.sessionStorage.getItem("user_role")
};

var UserData = [{
	"id": 1,
	"parent_id": 0,
	"type_name": "品牌设置",
	"type_en": null,
	"status": 0,
	"create_time": 1478168773,
	"update_time": "2016-12-27 10:42:04",
	"sort": 101,
	"channel_terminal": 1,
	"route_path": "brand_setting",
	"type_id": 1
}, {
	"id": 2,
	"parent_id": 0,
	"type_name": "主打活动",
	"type_en": null,
	"status": 0,
	"create_time": 1478168773,
	"update_time": "2016-12-29 11:49:16",
	"sort": 1021,
	"channel_terminal": 1,
	"route_path": "main_activity",
	"type_id": 2
}, {
	"id": 3,
	"parent_id": 0,
	"type_name": "值得买",
	"type_en": null,
	"status": 0,
	"create_time": 1478168773,
	"update_time": "2016-12-29 11:49:16",
	"sort": 2,
	"channel_terminal": 1,
	"route_path": "worth_buying",
	"type_id": 3
}, {
	"id": 4,
	"parent_id": 0,
	"type_name": "最鲜品",
	"type_en": null,
	"status": 1,
	"create_time": 1478168773,
	"update_time": "2017-01-17 18:25:19",
	"sort": 34,
	"channel_terminal": 1,
	"route_path": "first_product",
	"type_id": 4
}, {
	"id": 5,
	"parent_id": 0,
	"type_name": "专题列表",
	"type_en": null,
	"status": 0,
	"create_time": 1478168773,
	"update_time": "2016-12-29 11:49:14",
	"sort": 2,
	"channel_terminal": 1,
	"route_path": "special",
	"type_id": 5
}, {
	"id": 6,
	"parent_id": 0,
	"type_name": "搭配志",
	"type_en": null,
	"status": 0,
	"create_time": 1478168773,
	"update_time": "2017-01-17 18:03:06",
	"sort": 1,
	"channel_terminal": 1,
	"route_path": "fashion",
	"type_id": 6
}, {
	"id": 7,
	"parent_id": 0,
	"type_name": "设计师推荐",
	"type_en": null,
	"status": 0,
	"create_time": 1478168779,
	"update_time": "2017-02-21 14:48:38",
	"sort": 11231,
	"channel_terminal": 1,
	"route_path": "designers_recommend",
	"type_id": 7
}];

var getSpecialList = {
	"total": 4,
	"per_page": "1000",
	"current_page": 1,
	"last_page": 1,
	"next_page_url": null,
	"prev_page_url": null,
	"from": 1,
	"to": 4,
	"data": [{
		"id": 52,
		"type_id": 1,
		"title": "\u7528\u7528\u7528@@@",
		"title_en": null,
		"description": null,
		"url_wechat": "http:\/\/store.wepiao.com\/index.php\/wap\/gallery.html?catId=76",
		"img_wechat": "http:\/\/devel-10016962.file.myqcloud.com\/a\/42d\/5f9f4\/a42de5f9f41d21dafda147dca0d14999.jpg",
		"sort": 21,
		"status": 0,
		"create_time": 1474428041,
		"update_time": "2016-11-23 16:22:08",
		"url_qq": "http:\/\/store.wepiao.com\/index.php\/wap\/gallery.html?catId=76",
		"url_app": null,
		"img_qq": "http:\/\/devel-10016962.file.myqcloud.com\/a\/42d\/5f9f4\/a42de5f9f41d21dafda147dca0d14999.jpg",
		"img_app": "http:\/\/devel-10016962.file.myqcloud.com\/a\/42d\/5f9f4\/a42de5f9f41d21dafda147dca0d14999.jpg",
		"channel_terminal": 1
	}, {
		"id": 51,
		"type_id": 1,
		"title": "123@321",
		"title_en": null,
		"description": null,
		"url_wechat": "http:\/\/store.wepiao.com\/index.php\/wap\/gallery.html?catId=76",
		"img_wechat": "http:\/\/devel-10016962.file.myqcloud.com\/d\/447\/416aa\/d4476416aa27dd7eb41d6e3dafe0724f.jpg",
		"sort": 13,
		"status": 0,
		"create_time": 1473325622,
		"update_time": "2016-11-23 16:41:14",
		"url_qq": "http:\/\/store.wepiao.com\/index.php\/wap\/gallery.html?catId=76",
		"url_app": null,
		"img_qq": "http:\/\/devel-10016962.file.myqcloud.com\/d\/447\/416aa\/d4476416aa27dd7eb41d6e3dafe0724f.jpg",
		"img_app": "http:\/\/devel-10016962.file.myqcloud.com\/d\/447\/416aa\/d4476416aa27dd7eb41d6e3dafe0724f.jpg",
		"channel_terminal": 1
	}, {
		"id": 50,
		"type_id": 1,
		"title": "\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5\u6d4b\u8bd5",
		"title_en": null,
		"description": null,
		"url_wechat": "http:\/\/store.wepiao.com\/index.php\/wap\/gallery.html?catId=76",
		"img_wechat": "http:\/\/devel-10016962.file.myqcloud.com\/0\/f75\/64296\/0f751642962bbff12be90ee0085d6b4b.jpg",
		"sort": 11,
		"status": 0,
		"create_time": 1473323779,
		"update_time": "2016-09-22 13:58:09",
		"url_qq": null,
		"url_app": null,
		"img_qq": null,
		"img_app": null,
		"channel_terminal": 1
	}, {
		"id": 48,
		"type_id": 1,
		"title": "\u6d4b\u8bd5",
		"title_en": null,
		"description": null,
		"url_wechat": "http:\/\/store.wepiao.com\/index.php\/wap\/gallery.html?catId=76",
		"img_wechat": "http:\/\/devel-10016962.file.myqcloud.com\/7\/b7d\/da9d2\/7b7d1da9d2c22efc753e7e9f4fe838f6.jpg",
		"sort": 7,
		"status": 0,
		"create_time": 1473322126,
		"update_time": "2016-09-22 13:58:21",
		"url_qq": null,
		"url_app": null,
		"img_qq": null,
		"img_app": null,
		"channel_terminal": 1
	}]
};
var getGoodsTypeList = {
	"total": 16,
	"per_page": "10",
	"current_page": 2,
	"last_page": 2,
	"next_page_url": null,
	"prev_page_url": "http:\/\/topics-cms.devel.wesai.com\/api\/getGoodsTypeList?page=1",
	"from": 11,
	"to": 16,
	"data": [{
		"id": 3,
		"parent_id": 0,
		"title": "\u5546\u54c1\u5206\u7c7b\u6d4b\u8bd512",
		"title_en": "",
		"pic_select": null,
		"pic": "\/\/devel-10016962.file.myqcloud.com\/f\/303\/9be9a\/f303f9be9ad56dd7b96fda7e1ab7b77a.jpg",
		"sort": 0,
		"description": "",
		"spm": "2147483647",
		"is_sale": 1,
		"wechat_url": "http:\/\/www.baidu111.com",
		"qq_url": "http:\/\/www.baidu.com",
		"create_time": 1487060865,
		"update_time": "2017-02-23 15:52:45",
		"status": 0
	}, {
		"id": 5,
		"parent_id": 0,
		"title": "\u971c\u5929\u6751",
		"title_en": "",
		"pic_select": null,
		"pic": "\/\/devel-10016962.file.myqcloud.com\/f\/303\/9be9a\/f303f9be9ad56dd7b96fda7e1ab7b77a.jpg",
		"sort": 0,
		"description": "",
		"spm": "2147483647",
		"is_sale": 1,
		"wechat_url": "http:\/\/www.baidu111.com",
		"qq_url": "http:\/\/www.baidu.com",
		"create_time": 1487060865,
		"update_time": "2017-02-23 15:52:48",
		"status": 0
	}, {
		"id": 7,
		"parent_id": 0,
		"title": "\u5929\u573012",
		"title_en": "",
		"pic_select": null,
		"pic": "\/\/devel-10016962.file.myqcloud.com\/f\/303\/9be9a\/f303f9be9ad56dd7b96fda7e1ab7b77a.jpg",
		"sort": 0,
		"description": "",
		"spm": "2147483647",
		"is_sale": 1,
		"wechat_url": "http:\/\/www.baidu111.com",
		"qq_url": "http:\/\/www.baidu.com",
		"create_time": 1487060865,
		"update_time": "2017-02-23 15:52:50",
		"status": 0
	}, {
		"id": 9,
		"parent_id": 0,
		"title": "@@12",
		"title_en": "",
		"pic_select": null,
		"pic": "\/\/devel-10016962.file.myqcloud.com\/f\/303\/9be9a\/f303f9be9ad56dd7b96fda7e1ab7b77a.jpg",
		"sort": 0,
		"description": "",
		"spm": "2147483647",
		"is_sale": 1,
		"wechat_url": "http:\/\/www.baidu111.com",
		"qq_url": "http:\/\/www.baidu.com",
		"create_time": 1487060865,
		"update_time": "2017-02-23 15:52:51",
		"status": 0
	}, {
		"id": 11,
		"parent_id": 0,
		"title": "\u4e0d\u56fd2",
		"title_en": "",
		"pic_select": null,
		"pic": "\/\/devel-10016962.file.myqcloud.com\/f\/303\/9be9a\/f303f9be9ad56dd7b96fda7e1ab7b77a.jpg",
		"sort": 0,
		"description": "",
		"spm": "2147483647",
		"is_sale": 1,
		"wechat_url": "http:\/\/www.baidu111.com",
		"qq_url": "http:\/\/www.baidu.com",
		"create_time": 1487060865,
		"update_time": "2017-02-23 15:52:52",
		"status": 0
	}, {
		"id": 13,
		"parent_id": 0,
		"title": "\u4e2d\u56fd",
		"title_en": "",
		"pic_select": null,
		"pic": "\/\/devel-10016962.file.myqcloud.com\/f\/303\/9be9a\/f303f9be9ad56dd7b96fda7e1ab7b77a.jpg",
		"sort": 0,
		"description": "",
		"spm": "2147483647",
		"is_sale": 1,
		"wechat_url": "http:\/\/www.baidu111.com",
		"qq_url": "http:\/\/www.baidu.com",
		"create_time": 1487060865,
		"update_time": "2017-02-23 15:52:54",
		"status": 0
	}]
};
var getGoodsList = {
	"total": 3,
	"per_page": "10",
	"current_page": 1,
	"last_page": 1,
	"next_page_url": null,
	"prev_page_url": null,
	"from": 1,
	"to": 3,
	"data": [{
		"id": 3,
		"type_id": "16",
		"title": "\u5546\u54c1\u540d\u79f0111",
		"title_color": "#111",
		"title_en": "",
		"description": "\u5546\u54c1\u63cf\u8ff0",
		"description_color": "#222",
		"price": "\u00a5138",
		"price_color": "#444",
		"price_desc": "\u57231\uff1a",
		"price_desc_color": "#333",
		"original_price": "\u539f\u4ef7\uff1a\u00a5238",
		"original_price_color": "#555",
		"pic": "http:\/\/storage-devel.wesai.com\/f\/70f\/35127\/f70f2351271bfd3103fe7e0294ed2088.jpg",
		"wechat_url": "http:\/\/www.baidu.com",
		"qq_url": "http:\/\/www.baidu.com",
		"spm": "12312",
		"is_sale": 1,
		"sort": 11,
		"desc_pic": "",
		"desc_bg_pic": "",
		"is_include_desc": 2,
		"create_time": 1487142330,
		"update_time": "2017-02-22 18:50:48",
		"status": 0
	}, {
		"id": 2,
		"type_id": "16",
		"title": "13131231",
		"title_color": "#fff",
		"title_en": "",
		"description": "123213123123",
		"description_color": "#111",
		"price": "\u00a5138",
		"price_color": "#444",
		"price_desc": "\u5723\u8bde\uff1a",
		"price_desc_color": "#555",
		"original_price": "\u539f\u4ef7\uff1a\u00a5238",
		"original_price_color": "#111",
		"pic": "http:\/\/storage-devel.wesai.com\/e\/1ed\/3378d\/e1edd3378d5697686507b470d46a75cb.jpg",
		"wechat_url": "http:\/\/www.baidu.com",
		"qq_url": "http:\/\/www.baidu.com",
		"spm": "123",
		"is_sale": 1,
		"sort": 1,
		"desc_pic": "\/\/devel-10016962.file.myqcloud.com\/8\/441\/24346\/8441524346cba9b82dffd1881c221c40.png",
		"desc_bg_pic": "\/\/devel-10016962.file.myqcloud.com\/8\/6af\/b4281\/86afcb4281edbc2529ca01d6d8f5cdb8.png",
		"is_include_desc": 1,
		"create_time": 1487130705,
		"update_time": "2017-02-27 11:31:43",
		"status": 0
	}, {
		"id": 1,
		"type_id": "8",
		"title": "\u5546\u54c1\u540d\u79f0",
		"title_color": "\u5546\u54c1\u540d\u79f0\u6587\u5b57\u989c\u8272",
		"title_en": "",
		"description": "\u5546\u54c1\u63cf\u8ff0",
		"description_color": "\u5546\u54c1\u63cf\u8ff0\u6587\u5b57\u989c\u8272",
		"price": "\u5546\u54c1\u552e\u4ef7",
		"price_color": "\u5546\u54c1\u552e\u4ef7\u6587\u5b57\u989c\u8272",
		"price_desc": "\u5546\u54c1\u552e\u4ef7\u6807\u9898",
		"price_desc_color": "\u5546\u54c1\u552e\u4ef7\u6807\u9898\u6587\u5b57\u989c\u8272",
		"original_price": "\u5546\u54c1\u539f\u4ef7",
		"original_price_color": "\u5546\u54c1\u539f\u4ef7\u6587\u5b57\u989c\u8272",
		"pic": "http:\/\/storage-devel.wesai.com\/a\/f7e\/c3d4d\/af7e3c3d4d4ead83e4230a56ae3be826.jpg",
		"wechat_url": "http:\/\/www.weixin.com",
		"qq_url": "http:\/\/www.shouQ.com",
		"spm": "0aqsdfgh",
		"is_sale": 1,
		"sort": 2,
		"desc_pic": "http:\/\/storage-devel.wesai.com\/4\/728\/e6d53\/4728de6d53fd91aa7ea4bdc2421b14ca.jpg",
		"desc_bg_pic": "http:\/\/storage-devel.wesai.com\/3\/2f1\/aaf7b\/32f18aaf7bb1060faea0f8b8261698fe.jpg",
		"is_include_desc": 1,
		"create_time": 1487078564,
		"update_time": "2017-02-20 21:49:07",
		"status": 0
	}]
};
var getActivityList = {
	"total": 3,
	"per_page": "10",
	"current_page": 1,
	"last_page": 1,
	"next_page_url": null,
	"prev_page_url": null,
	"from": 1,
	"to": 3,
	"data": [{
		"id": 4,
		"title": "1312312",
		"start_time": "2017-02-21 14:26:35",
		"end_time": "2017-02-23 14:26:36",
		"bg_body": "http:\/\/storage-devel.wesai.com\/d\/3e8\/057c4\/d3e8c057c4a118a0a316b9220260987a.png",
		"bg_banner": "",
		"bg_hb": "",
		"bg_goods": "http:\/\/storage-devel.wesai.com\/e\/0dc\/4cc65\/e0dc54cc65d0f1d08fdb89a60ac72c8a.png",
		"bg_separate": "",
		"spm": "123123123123\u8303\u56f4\u4e3a\u6240\u8c13",
		"back_home_url_wechat": "\/\/www.baidu.com",
		"back_home_url_qq": "\/\/www.bad.com",
		"back_home_bg": "http:\/\/storage-devel.wesai.com\/3\/db4\/d9f94\/3db43d9f94da1f6cd31eed2fd0e6a333.png",
		"share_friends_title": "43214324312",
		"share_friends_pic": "http:\/\/storage-devel.wesai.com\/c\/8f9\/3a095\/c8f9a3a09540c30f4ac698a9c81e90ec.png",
		"share_group_title": "131231122",
		"share_group_detail": "1312312312312",
		"share_group_pic": "http:\/\/storage-devel.wesai.com\/c\/8f9\/3a095\/c8f9a3a09540c30f4ac698a9c81e90ec.png",
		"banner_from": 2,
		"activity_pic_banner": "",
		"activity_wechat_url": "",
		"activity_qq_url": "",
		"banner": "9,11",
		"hb_count": 1,
		"is_had_hb": 2,
		"hb_1_url_wechat": "",
		"hb_1_url_qq": "",
		"hb_1_img": "",
		"hb_2_url_wechat": "",
		"hb_2_url_qq": "",
		"hb_2_img": "",
		"hb_3_url_wechat": "",
		"hb_3_url_qq": "",
		"hb_3_img": "",
		"bg_music": "http:\/\/storage-devel.wesai.com\/6\/9c3\/dff85\/69c3bdff85bf613250c54b2cc083fae1.mp3",
		"create_time": 1487917655,
		"update_time": "2017-02-28 15:59:14",
		"wechat_url": "",
		"qq_url": "",
		"is_sale": 1,
		"status": 0
	}, {
		"id": 3,
		"title": "\u90e8\u7f72\u6d4b\u8bd51111",
		"start_time": "2017-02-01 20:30:55",
		"end_time": "2017-02-01 20:30:59",
		"bg_body": "http:\/\/storage-devel.wesai.com\/1\/b77\/0e09d\/1b7720e09d019115fce73c5e7326bcd3.png",
		"bg_banner": "",
		"bg_hb": "http:\/\/storage-devel.wesai.com\/a\/c47\/a68c5\/ac47fa68c586d2142974b33ae27f63ee.jpg",
		"bg_goods": "http:\/\/storage-devel.wesai.com\/0\/ea1\/5a2c6\/0ea125a2c6ceeb34e10dc17b7f28ba8d.jpg",
		"bg_separate": "http:\/\/storage-devel.wesai.com\/5\/7c9\/f0660\/57c9ef06606e14d514c0a4d0ce1dd8ac.jpg",
		"spm": "1111SPM11",
		"back_home_url_wechat": "http:\/\/www.sina.com.cn\/",
		"back_home_url_qq": "http:\/\/www.baidu.com",
		"back_home_bg": "http:\/\/storage-devel.wesai.com\/a\/01b\/fb02f\/a01b7fb02f04f9aa8d6134b4e0e4c4e3.jpg",
		"share_friends_title": "\u5206\u4eab\u670b\u53cb\u5708\u6807\u9898\u6d4b\u8bd5",
		"share_friends_pic": "http:\/\/storage-devel.wesai.com\/d\/9d1\/13f0c\/d9d1913f0c907b6d78cbc0d5d2faebe6.jpg",
		"share_group_title": "\u5206\u4eab\u6807\u9898\u6d4b\u8bd5",
		"share_group_detail": "\u5206\u4eab\u63cf\u8ff0\u6d4b\u8bd5",
		"share_group_pic": "http:\/\/storage-devel.wesai.com\/d\/9d1\/13f0c\/d9d1913f0c907b6d78cbc0d5d2faebe6.jpg",
		"banner_from": 1,
		"activity_pic_banner": "http:\/\/storage-devel.wesai.com\/f\/75e\/93e1a\/f75e093e1a71fd6e896e15937ab272e4.jpg",
		"activity_wechat_url": "http:\/\/www.sina.com.cn\/",
		"activity_qq_url": "http:\/\/www.baidu.com",
		"banner": "1,8,10",
		"hb_count": 1,
		"is_had_hb": 2,
		"hb_1_url_wechat": "http:\/\/www.sina.com.cn\/",
		"hb_1_url_qq": "http:\/\/www.baidu.com",
		"hb_1_img": "http:\/\/storage-devel.wesai.com\/6\/a65\/094d1\/6a656094d19505a59248a7c8d99aaf1f.jpg",
		"hb_2_url_wechat": "",
		"hb_2_url_qq": "",
		"hb_2_img": "",
		"hb_3_url_wechat": "",
		"hb_3_url_qq": "",
		"hb_3_img": "",
		"bg_music": "http:\/\/storage-devel.wesai.com\/8\/746\/f2449\/87466f2449ae14c9feee5e5895f9c5c3.mp3",
		"create_time": 1487593978,
		"update_time": "2017-02-28 15:49:08",
		"wechat_url": "\/\/h5.wesai.com\/activity\/devel\/1487593978\/wechat\/index.html",
		"qq_url": "\/\/h5.wesai.com\/activity\/devel\/1487593978\/qq\/index.html",
		"is_sale": 1,
		"status": 0
	}, {
		"id": 2,
		"title": "\u5206\u4eab\u6d3b\u52a8\u540d\u79f0\u6d4b\u8bd51",
		"start_time": "2017-01-31 15:00:43",
		"end_time": "2017-02-25 15:00:46",
		"bg_body": "http:\/\/storage-devel.wesai.com\/7\/996\/97e88\/7996c97e880d9cc4b6936163574aa3d2.jpg",
		"bg_banner": "",
		"bg_hb": "http:\/\/storage-devel.wesai.com\/5\/b94\/99bbf\/5b94899bbf6faee8496e656d42831b0b.jpg",
		"bg_goods": "http:\/\/storage-devel.wesai.com\/7\/839\/da228\/7839fda228ae673a12a8f015c7076e70.jpg",
		"bg_separate": "http:\/\/storage-devel.wesai.com\/3\/378\/93031\/3378c930319bba5d1ec34e71e2db32d4.jpg",
		"spm": "21312312",
		"back_home_url_wechat": "http:\/\/www.xinlang.com",
		"back_home_url_qq": "http:\/\/wwwbaidu.com",
		"back_home_bg": "http:\/\/storage-devel.wesai.com\/1\/1ac\/2e20b\/11ac92e20b533ec2f2d0736f95ead391.jpg",
		"share_friends_title": "\u5206\u4eab\u670b\u53cb\u5708\u6807\u9898\u6d4b\u8bd51",
		"share_friends_pic": "http:\/\/storage-devel.wesai.com\/5\/288\/183b3\/52885183b38d36975c870b9c35e84052.jpg",
		"share_group_title": "\u5206\u4eab\u6807\u9898\u6d4b\u8bd51",
		"share_group_detail": "\u5206\u4eab\u63cf\u8ff0\u6d4b\u8bd51",
		"share_group_pic": "http:\/\/storage-devel.wesai.com\/5\/288\/183b3\/52885183b38d36975c870b9c35e84052.jpg",
		"banner_from": 2,
		"activity_pic_banner": "http:\/\/storage-devel.wesai.com\/3\/8b4\/01d66\/38b4d01d66498c4e0f1ac092df6eaa4b.jpg",
		"activity_wechat_url": "\/\/www.baidu.com",
		"activity_qq_url": "\/\/www.baidu.com",
		"banner": "1,8,10",
		"hb_count": 1,
		"is_had_hb": 2,
		"hb_1_url_wechat": "http:\/\/www.baidu.com",
		"hb_1_url_qq": "http:\/\/www.baidu.com",
		"hb_1_img": "http:\/\/storage-devel.wesai.com\/a\/f15\/fdbfd\/af158fdbfd283f59e114d879787afd3c.jpg",
		"hb_2_url_wechat": "",
		"hb_2_url_qq": "",
		"hb_2_img": "",
		"hb_3_url_wechat": "",
		"hb_3_url_qq": "",
		"hb_3_img": "",
		"bg_music": "http:\/\/storage-devel.wesai.com\/7\/e64\/bb148\/7e647bb1488fb519a905931866abbeee.mp3",
		"create_time": 1487315040,
		"update_time": "2017-02-21 15:21:59",
		"wechat_url": "\/\/mini.wesai.com\/activity\/devel\/1487315040\/wechat\/index.html",
		"qq_url": "\/\/mini.wesai.com\/activity\/devel\/1487315040\/qq\/index.html",
		"is_sale": 0,
		"status": 0
	}]
}
//typeId 1:品牌设置 2 主打活动 3 值得买 4 最鲜品 5 专题列表 6 搭配志 7 设计师推荐
exports.getSpecialList = function (typeID) {
	var Deferred = $.Deferred();
	switch (typeID) {
		case "1":
			Deferred.resolve(getSpecialList);
			break;
	}

	return Deferred.promise();
};

exports.deleteSpecial = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.delUrl + "?id=" + data.id + "&type_id=" + data.type_id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.addSpecial = function (newaddData) {
	newaddData.channel_terminal = parms.user_role;
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addUrl,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editSpecial = function (newaddData) {
	newaddData.channel_terminal = parms.user_role;
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editUrl,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.userLogout = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.loginOut,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.userIsLogin = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.isloginUrl,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"success": function (data) {
			Deferred.resolve(data && data.data ? data.data : "");
		},
		"error": function (data) {
			Deferred.resolve("");
		}
	});
	return Deferred.promise();
};

exports.getSpecalTypeList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getSpecalTypeList + "&channelTerminal=" + parms.user_role,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};
exports.getOperateLogList = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.getOperateLogList + "?pageSize=" + data.per_page + "&page=" + data.current_page + "&order=" + data.field + "&sort=" + data.order + "&operateDateStart=" + data.operateDateStart + "&operateDateEnd=" + data.operateDateEnd + "&content=" + data.content + "&type=" + ( data.type ? data.type : ""),
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editSpecialType = function (newaddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editSpecialType,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getShareList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getShareList,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.addShare = function (newData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addShare,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editShare = function (newData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editShare,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getBackgroundList = function () {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		"url": parms.getBackgroundList,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});

	return Deferred.promise();
};

exports.addBackground = function (newaddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addBackground,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.editBackground = function (newaddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editBackground,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newaddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.uploadAppHtml = function () {
	var data = {
		channelTerminal: parms.user_role,
		channel: 3
	}
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.specialDeploy,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": data,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.uploadActiveHtml = function (data) {
	var data = {
		id: data.id
	}
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.activityDeploy,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": data,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getGoodsTypeList = function (data) {
	var Deferred = $.Deferred();
	Deferred.resolve(getGoodsTypeList);
	return Deferred.promise();
};


exports.addGoodsType = function (newAddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addGoodsType,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newAddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.editGoodsType = function (newEditData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editGoodsType,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newEditData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.delGoodsType = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.delGoodsType + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.getGoodsList = function (data) {
	var Deferred = $.Deferred();
	Deferred.resolve(getGoodsList);
	return Deferred.promise();
};

exports.addGoods = function (newAddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addGoods,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newAddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.editGoods = function (newEditData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editGoods,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newEditData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.delGoods = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.delGoods + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.getActivityList = function (data) {
	var Deferred = $.Deferred();
	Deferred.resolve(getActivityList);
	return Deferred.promise();
};

exports.addActivity = function (newAddData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.addActivity,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newAddData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


exports.editActivity = function (newEditData) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "post",
		"url": parms.editActivity,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"data": newEditData,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.delActivity = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.delActivity + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.shelfActivity = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.shelfActivity + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};

exports.offShelfActivity = function (data) {
	var Deferred = $.Deferred();
	$.ajax({
		"type": "get",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		"url": parms.offShelfActivity + "?id=" + data.id,
		"success": function (data) {
			Deferred.resolve(data);
		},
		"error": function (data) {
			Deferred.resolve(data);
		}
	});
	return Deferred.promise();
};


// var UserData = "";
//通过ajax获取
exports.getUserDataByAjax = function () {
	var deferred = $.Deferred();

	deferred.resolve(UserData);

	return deferred.promise();
};

exports.getUserData = function () {
	var deferred = $.Deferred();
	deferred.resolve(UserData);
	return deferred.promise();
};

exports.getRouteData = function () {
	return UserData;
};

var publicParms = {
	url: '//storage.api.wesai.com/uploading',
	httpStr: '//storage.wesai.com/'
};

if (locationHref.indexOf("devel") != -1) {
	publicParms.httpStr = "http://storage-devel.wesai.com/";
	publicParms.url = '//10.2.2.25:8099/uploading';
} else if (locationHref.indexOf("test") != -1) {
	publicParms.httpStr = "http://storage-test.wesai.com/";
	publicParms.url = '//10.2.2.202:8099/uploading';
} else if (locationHref.indexOf("127.0.0.1") != -1) {
	publicParms.httpStr = "http://storage-devel.wesai.com/";
	publicParms.url = '//10.2.2.25:8099/uploading';
}
exports.publicParms = publicParms;