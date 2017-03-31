/**
 * Created by fengs on 2016/9/19.
 */
$(function () {

	var parms = {
		cliWH: "",
		cliHG: "",
		noImgUrl: "./app/image/",
		scrollState: false
	};

	renderDom();
	//$("img").lazyload();


	function layoutInit() {
		parms.cliWH = document.documentElement.clientWidth;
		parms.cliHG = document.documentElement.clientHeight;
		var advContainer = document.getElementById('advInner');
		if (advContainer) {
			advContainer.style.width = document.documentElement.clientWidth + "px";
			advContainer.style.height = (parms.cliWH / 375 * 133) + "px";
		}
		getImgAjax();
	};

	function renderDom() {

		if (data.specilTypeList && data.specilTypeList.length > 0
			&& data.worth_buying_data && data.worth_buying_data.length > 0
			&& data.first_product_data && data.first_product_data.length > 0
			&& data.special_data && data.special_data.length > 0) {
			$(".periphery-content").show();
			$(".no-data-content").hide();

			var datas = {
				list: data.specilTypeList
			};
			var html = template('renderDom', datas);
			$("#content-div").html(html);
			layoutInit();
		} else {
			$(".no-data-content").show();
			$(".periphery-content").hide();

			$(".no-data-btn").on("click", function () {
				window.location.reload(true);
			});

		}
	};

	function getImgAjax() {
		var worth_buying_data = data.worth_buying_data,
			first_product_data = data.first_product_data,
			special_data = data.special_data,
			timestamp = data.timestamp;

		if (worth_buying_data && worth_buying_data.length > 0) {
			parms.cliWH = document.documentElement.clientWidth;
			parms.cliHG = document.documentElement.clientHeight;
			var leftWidth = parms.cliWH * 0.4;
			var leftHeight = leftWidth / 300 * 340;
			var rightWidth = parms.cliWH - 36 - leftWidth;
			var rightHeight = 80 * rightWidth / 189;

			var datas = {
				leftData: worth_buying_data[0],
				rightDataTop: worth_buying_data[1],
				rightDataBottom: worth_buying_data[2],
				noLeftImgUrl: parms.noImgUrl + "worth-buying-left.jpg?isNeedDownload=true&level=1&v=" + timestamp,
				noRightImgUrl: parms.noImgUrl + "worth-buying-right.jpg??isNeedDownload=true&level=1&v=" + timestamp,
				leftWidth: leftWidth,
				leftHeight: leftHeight,
				rightWidth: rightWidth,
				rightHeight: rightHeight
			};
			var html = template('worthBuyingTemplate', datas);
			document.getElementById('worth-buying-content').innerHTML = html;

			$(".worth-buying-left-div ").css("width", leftWidth).css("height", leftHeight);
			$(".worth-buying-right-div ").css("width", rightWidth);
			$(".worth-buying-right-img-div1,.worth-buying-right-img-div2").css("width", rightWidth).css("height", rightHeight);
		} else {
			$(".worth-buying").hide();
			$(".worth-buying").next().hide();
		}

		if (first_product_data && first_product_data.length > 0) {
			var divWidth = (parms.cliWH - 46) / 3;
			var divHeight = divWidth / 219 * 402;

			var datas = {
				list: first_product_data.slice(0, 6),
				className: "first-product-content-div",
				clickType: "recommend_",
				noImgUrl: parms.noImgUrl + "first-product.jpg?isNeedDownload=true&level=3&v=" + timestamp,
				divHeight: divHeight,
				divWidth: divWidth,
				levelType: '3'

			};
			var html = template('publicTemplate', datas);
			document.getElementById('first-product-content').innerHTML = html;

			$(".first-product-content-div").css("width", divWidth).css("height", divHeight);
		} else {
			$(".first-product").hide();
			$(".first-product").next().hide();
		}

		if (special_data && special_data.length > 0) {
			var divHeight = (parms.cliWH - 26) / 349 * 326;
			var divWidth = parms.cliWH - 20;

			var datas = {
				//list: special_data.slice(0, 6),
				list: special_data,
				className: "special-content-div",
				clickType: "depth_focusing_",
				noImgUrl: parms.noImgUrl + "special.jpg?isNeedDownload=true&level=3&v=" + timestamp,
				divHeight: divHeight,
				divWidth: divWidth,
				levelType: '4'
			};
			var html = template('publicTemplate', datas);
			document.getElementById('special-content').innerHTML = html;
			$(".special-content-div").css("width", parms.cliWH - 26)
				.css("height", (parms.cliWH - 26) / 349 * 81);
		} else {
			$(".special").hide();
		}

	};

});
