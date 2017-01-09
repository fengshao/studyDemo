/**
 * Created by fengs on 2016/9/19.
 */
var maxPage = "", curPage = "";
$(function () {

	//typeId 1:品牌设置 2 主打活动 3 值得买 4 最鲜品 5 专题列表 6 搭配志
	var parms = {
		cliWH: "",
		cliHG: "",
		noImgUrl: "./app/image/",
		curPage: 1,
		maxPage: 2,
		pageSize: 6,
		scrollState: false
	};

	renderDom();

	function Refresh() {
		setTimeout(function () {
			window.location.reload();
		}, 1000);

	};

	function Load() {
		if (!parms.scrollState) {
			parms.scrollState = true;
			setTimeout(function () {
				reftest();
				wrapper.refresh();
				parms.scrollState = false;
			}, 1000);
		}
	};

	function scorllInit() {
		refresher.init({
			id: "wrapper",
			pullDownAction: Refresh,
			pullUpAction: Load,
			ifALL: parms.curPage == parms.maxPage
		});
	};

	function reftest() {
		var special_data = data.special_data,
			timestamp = data.timestamp;
		parms.curPage++;
		curPage = parms.curPage;
		var datas = {
			list: special_data.slice((parms.curPage - 1) * 6, parms.curPage * parms.pageSize - 1),
			className: "special-content-div",
			clickType: "special_",
			noImgUrl: parms.noImgUrl + "special.jpg?v=" + timestamp
		};

		var html = template('publicTemplate', datas);
		$('#special-content').append(html);
		$(".special-content-div").css("height", (parms.cliWH - 20) / 710 * 325)
	}

	function layoutInit() {
		parms.cliWH = document.documentElement.clientWidth;
		parms.cliHG = document.documentElement.clientHeight;
		var advContainer = document.getElementById('advInner');
		advContainer.style.width = document.documentElement.clientWidth + "px";
		advContainer.style.height = (parms.cliWH / 375 * 133) + "px";
		jQuery.Deferred().done(function () {
			getImgAjax();
		}, function () {
			scorllInit();
		}).resolve();
	};

	function renderDom() {
		maxPage = parms.maxPage = Math.ceil(data.special_data.length / 6);
		curPage = parms.curPage;

		var datas = {
			list: data.specilTypeList
		};
		var html = template('renderDom', datas);
		$("#content-div").html(html);
		layoutInit();
	};

	function getImgAjax() {
		var worth_buying_data = data.worth_buying_data,
			main_activity_data = data.main_activity_data,
			first_product_data = data.first_product_data,
			special_data = data.special_data,
			timestamp = data.timestamp;

		if (main_activity_data && main_activity_data.length > 0) {
			adObj(main_activity_data.slice(0, 6));
		} else {
			$(".main-activity").hide();
		}

		if (worth_buying_data && worth_buying_data.length > 0) {
			var datas = {
				leftData: worth_buying_data[0],
				rightDataTop: worth_buying_data[1],
				rightDataBottom: worth_buying_data[2],
				noLeftImgUrl: parms.noImgUrl + "worth-buying-left.jpg?v=" + timestamp,
				noRightImgUrl: parms.noImgUrl + "worth-buying-right.jpg?v=" + timestamp
			};
			var html = template('worthBuyingTemplate', datas);
			document.getElementById('worth-buying-content').innerHTML = html;
			parms.cliWH = document.documentElement.clientWidth;
			parms.cliHG = document.documentElement.clientHeight;
			var leftWidth = (parms.cliWH - 28) * 0.432;

			var imgSrc = $(".worth-buying-left-div img").attr("src");

			$(".worth-buying-left-div ").css("width", leftWidth).css("height", leftWidth / 300 * 340);
			$(".worth-buying-right-div ").css("width", parms.cliWH - 28 - leftWidth);
		} else {
			$(".worth-buying").hide();
			$(".worth-buying").next().hide();
		}

		if (first_product_data && first_product_data.length > 0) {
			var datas = {
				list: first_product_data.slice(0, 6),
				className: "first-product-content-div",
				clickType: "recommend_",
				noImgUrl: parms.noImgUrl + "first-product.jpg?v=" + timestamp
			};
			var html = template('publicTemplate', datas);
			document.getElementById('first-product-content').innerHTML = html;
			var divWidth = (parms.cliWH - 50) / 3;
			$(".first-product-content-div").css("width", divWidth).css("height", divWidth / 226 * 312);
		} else {
			$(".first-product").hide();
			$(".first-product").next().hide();
		}

		if (special_data && special_data.length > 0) {
			var datas = {
				list: special_data.slice(0, 6),
				className: "special-content-div",
				clickType: "depth_focusing_",
				noImgUrl: parms.noImgUrl + "special.jpg?v=" + timestamp
			};
			var html = template('publicTemplate', datas);
			document.getElementById('special-content').innerHTML = html;
			$(".special-content-div").css("height", (parms.cliWH - 20) / 710 * 326)
		} else {
			$(".special").hide();
		}

	};

});
