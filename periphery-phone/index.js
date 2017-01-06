/**
 * Created by fengs on 2016/9/19.
 */
$(function () {

	//typeId 1:品牌设置 2 主打活动 3 值得买 4 最鲜品 5 专题列表

	var parms = {
		getListUrl: "http://han.devel.wesai.com/api/getSpecialList", //get
		cliWH: "",
		cliHG: "",
		categoryScroll: ""
	};

	init();
	function init() {
		//if (curSiteUrl.indexOf("devel") != -1) {
		//	parms.getListUrl = "http://han.devel.wesai.com/api/getSpecialList"
		//} else if (curSiteUrl.indexOf("test") != -1) {
		//	parms.getListUrl = "http://han.test.wesai.com/api/getSpecialList"
		//}
		parms.cliWH = document.documentElement.clientWidth;
		parms.cliHG = document.documentElement.clientHeight;
		var leftWidth = (parms.cliWH - 28) * 0.432;
		$(".worth-buying-left-div").css("width", leftWidth);
		$(".worth-buying-right-div").css("width", parms.cliWH - 28 - leftWidth);
		getImgAjax();
	};

	function getImgAjax() {

		//获取品牌列表
		$.ajax({
			"type": "get",
			"url": parms.getListUrl + '?typeId=1&cacheOpen=11&pageSize=1000',
			"success": function (json) {
				if (json && json.data) {
					var brandArr = [];
					var data = json.data;
					var brand_content_divWh = (parms.cliWH - (31.5 + 28.5 * 4)) / 4.2;
					$(".brand .brand-content").css("width", (brand_content_divWh + 30) * data.length + 32);
					for (var i = 0; i < data.length; i++) {
						var clickStr = "'brand_" + (i + 1) + "'";
						var element = '<div class="brand-content-div"><a href="' + data[i].url + '" onClick="aClickFnc(' + clickStr + ')"><img src="' + data[i].img + '"></a></div>';
						brandArr.push(element);
					}
					$(".brand .brand-content").html(brandArr.join(""));
					$(".brand-content-div").css("width", brand_content_divWh);
					parms.categoryScroll = new IScroll('.brand', {
						scrollX: true,
						scrollY: false,
						tap: true,
						click: true
					});
				} else {
					toastFnc("获取品牌列表失败");
				}
			},
			"error": function (data) {
				toastFnc("获取品牌列表失败");
			}
		});

		//获取主打活动列表
		$.ajax({
			"type": "get",
			"url": parms.getListUrl + '?typeId=2&cacheOpen=11&pageSize=1000',
			"success": function (data) {
				if (data && data.data) {
					$(".main-activity a").attr("href", data.data[0].url);
					$(".main-activity a img").attr("src", data.data[0].img);
				} else {
					toastFnc("获取主打活动失败");
				}
			},
			"error": function (data) {
				toastFnc("获取主打活动失败");
			}
		});

		/*获取值得买列表*/
		$.ajax({
			"type": "get",
			"url": parms.getListUrl + '?typeId=3&cacheOpen=11&pageSize=1000',
			"success": function (json) {
				if (json && json.data) {
					var data = json.data;
					var $leftElement = $(".worth-buying .worth-buying-left-div a");

					var $rightEmement = $(".worth-buying .worth-buying-right-div");
					if (data[0]) {
						$leftElement.attr("href", data[0].url);
						$leftElement.find("img").attr("src", data[0].img);
					} else {
						$(".worth-buying-content-div").css("visibility", "hidden");
					}

					if (data[1] && data[1].img) {
						$rightEmement.find(".worth-buying-right-img-div1 a").attr("href", data[1] ? data[1].url : "");
						$rightEmement.find(".worth-buying-right-img-div1 a img").attr("src", data[1] ? data[1].img : "");
						$rightEmement.find("img.hidden-img1").attr("src", data[1] ? data[1].img : "");
					} else {
						$rightEmement.css("visibility", "hidden");
					}
					if (data[2]) {
						$rightEmement.find(".worth-buying-right-img-div2 a").attr("href", data[2] ? data[2].url : "");
						$rightEmement.find(".worth-buying-right-img-div2 a img").attr("src", data[2] ? data[2].img : "");
						$rightEmement.find("img.hidden-img2").attr("src", data[2] ? data[2].img : "");
					} else {
						$rightEmement.find(".worth-buying-right-img-div:nth-child(2)").css("visibility", "hidden");
					}
				} else {
					toastFnc("获取值得买列表失败");
				}
			},
			"error": function (data) {
				toastFnc("获取值得买列表失败");
			}
		});

		//获取最鲜品列表
		$.ajax({
			"type": "get",
			"url": parms.getListUrl + '?typeId=4&cacheOpen=11&pageSize=1000',
			"success": function (json) {
				if (json && json.data) {
					var firstProductArr = [];
					var data = json.data;
					for (var i = 0; i < data.length, i < 6; i++) {
						var clickStr = "'first_product_" + (i + 1) + "'";
						var element = '<div class="first-product-content-div"><a href="' + data[i].url + '" onClick="aClickFnc(' + clickStr + ')"><img src="' + data[i].img + '"></a></div>';
						firstProductArr.push(element);
					}
					$(".first-product .first-product-content").html(firstProductArr.join(""));

					$(".first-product-content-div").css("width", (parms.cliWH - 50) / 3);
				} else {
					toastFnc("获取最鲜品列表失败");
				}

			},
			"error": function (data) {
				toastFnc("获取最鲜品列表失败");
			}
		});

		//获取专题列表
		$.ajax({
			"type": "get",
			"url": parms.getListUrl + '?typeId=5&cacheOpen=11&pageSize=1000',
			"success": function (json) {
				if (json && json.data) {
					var specialArr = [];
					var data = json.data;
					for (var i = 0; i < data.length; i++) {
						var clickStr = "'special_" + (i + 1) + "'";
						var element = '<div class="special-content-div"><a href="' + data[i].url + '" onClick="aClickFnc(' + clickStr + ')"><img src="' + data[i].img + '"></a></div>';
						specialArr.push(element);
					}
					$(".special").html(specialArr.join(""));
				} else {
					toastFnc("获取专题列表失败");
				}
			},
			"error": function (data) {
				toastFnc("获取专题列表失败");
			}
		});
	};

	//错误信息提示
	function toastFnc(msg) {
		if ($(".periphery-content .toast").length > 0) {
			return;
		}
		var toast = document.createElement('div');
		toast.className = 'toast fadeIn';
		var toastText = document.createElement('div');
		toastText.className = 'toast-text';
		toast.appendChild(toastText);
		toastText.innerHTML = msg || '';
		setTimeout(function () {
			toast.className = 'toast fadeOut';
			setTimeout(function () {
				$(toast).remove();
			}, 500);
		}, 3000);
		$(".periphery-content").prepend(toast);
	};


});