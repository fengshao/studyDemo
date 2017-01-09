/**
 * Created by fengs on 2016/9/19.
 */
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

	var info = {
		"pullDownLable": "下拉刷新...",
		"pullingDownLable": "释放刷新...",
		"pullUpLable": "上拉加载更多…",
		"pullingUpLable": "释放加载更多…",
		"loadingLable": "",
		"loadingEndLable": "已加载完全部内容",
		"sssssss": null
	};

	function init(parameter) {
		var wrapper = document.getElementById(parameter.id);
		var div = document.createElement("div");
		div.className = "scroller";
		wrapper.appendChild(div);
		var scroller = wrapper.querySelector(".scroller");
		var list = wrapper.querySelector("#" + parameter.id + " #content-div");
		scroller.insertBefore(list, scroller.childNodes[0]);
		var pullDown = document.createElement("div");
		pullDown.className = "pullDown";
		var loader = document.createElement("div");
		loader.className = "loader";

		var pullDownLoadingSpan = document.createElement("div");
		pullDownLoadingSpan.setAttribute("class", "dialog_loading dialog_loading_1");
		loader.appendChild(pullDownLoadingSpan);

		pullDown.appendChild(loader);
		var pullDownLabel = document.createElement("div");
		pullDownLabel.className = "pullDownLabel";
		pullDown.appendChild(pullDownLabel);
		scroller.insertBefore(pullDown, scroller.childNodes[0]);
		var pullUp = document.createElement("div");
		pullUp.className = "pullUp";
		var loader = document.createElement("div");
		loader.className = "loader";
		var pullUpLoadingSpan = document.createElement("div");
		pullUpLoadingSpan.setAttribute("class", "dialog_loading dialog_loading_1");
		loader.appendChild(pullUpLoadingSpan);
		pullUp.appendChild(loader);
		var pullUpLabel = document.createElement("div");
		pullUpLabel.className = "pullUpLabel";
		var content = document.createTextNode(parameter.ifALL ? info.loadingEndLable : info.pullUpLable);
		pullUpLabel.appendChild(content);
		pullUp.appendChild(pullUpLabel);
		scroller.appendChild(pullUp);
		var pullDownEl = wrapper.querySelector(".pullDown");
		var pullDownOffset = pullDownEl.offsetHeight;
		var pullUpEl = wrapper.querySelector(".pullUp");
		var pullUpOffset = pullUpEl.offsetHeight;
		scrollIt(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset);
	};

	function isArd() {
		var boo, ua = navigator.userAgent;
		boo = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;

		return boo;
	};

	function scrollIt(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset) {
		//eval(parameter.id + "= new iScroll(parameter.id, {useTransition: true,vScrollbar: false,topOffset: pullDownOffset,onRefresh: function () {onRelease(pullDownEl,pullUpEl);},onScrollMove: function () {onScrolling(this,pullDownEl,pullUpEl,pullUpOffset);},onScrollEnd: function () {onPulling(pullDownEl,parameter.pullDownAction,pullUpEl,parameter.pullUpAction);},})");
		eval(parameter.id + "= new iScroll(parameter.id, {useTransition: true, vScrollbar: false, topOffset: pullDownOffset, scrollX: false, mouseWheel: true, click: isArd(), scrollbars: false, fadeScrollbars: true, interactiveScrollbars: false, keyBindings: false, deceleration: 0.0002, disableTouch: false, startY: 0, onRefresh: function () {onRelease(pullDownEl, pullUpEl);}, onScrollMove: function () {onScrolling(this, pullDownEl, pullUpEl, pullUpOffset);}, onScrollEnd: function () {onPulling(pullDownEl, parameter.pullDownAction, pullUpEl, parameter.pullUpAction);}});")
		pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullDownLable;
		document.addEventListener('touchmove', function (e) {
			e.preventDefault();
		}, false);
	};

	function onScrolling(e, pullDownEl, pullUpEl, pullUpOffset) {
		if (e.y > -(pullUpOffset)) {
			pullDownEl.id = '';
			pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullDownLable;
			e.minScrollY = -pullUpOffset;
		}
		if (e.y > 0) {
			pullDownEl.classList.add("flip");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullingDownLable;
			e.minScrollY = 0;
			clearTimeout(info.sssssss);
			loadingImgFnc(pullDownEl, 2);
		}
		if (e.scrollerH < e.wrapperH && e.y < (e.minScrollY - pullUpOffset) || e.scrollerH > e.wrapperH && e.y < (e.maxScrollY - pullUpOffset)) {
			pullUpEl.style.display = "block";
			pullUpEl.classList.add("flip");
			clearTimeout(info.sssssss);
			if (parms.maxPage == parms.curPage) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = info.loadingEndLable;
			} else {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = info.pullingUpLable;
				loadingImgFnc(pullUpEl, 2);
			}
		}
		if (e.scrollerH < e.wrapperH && e.y > (e.minScrollY - pullUpOffset) && pullUpEl.id.match('flip') || e.scrollerH > e.wrapperH && e.y > (e.maxScrollY - pullUpOffset) && pullUpEl.id.match('flip')) {
			pullDownEl.classList.remove("flip");
			pullUpEl.querySelector('.pullUpLabel').innerHTML = info.pullUpLable;
		}
	};
	function onRelease(pullDownEl, pullUpEl) {
		if (pullDownEl.className.match('loading')) {
			pullDownEl.classList.toggle("loading");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = info.pullDownLable;
			pullDownEl.querySelector('.loader').style.display = "none";
			pullDownEl.style.display = "none";
			pullDownEl.style.lineHeight = pullDownEl.offsetHeight + "px";
		}
		if (pullUpEl.className.match('loading')) {
			clearTimeout(info.sssssss);
			pullUpEl.querySelector('.loader').style.display = "none";
			pullUpEl.classList.toggle("loading");
			if (parms.maxPage == parms.curPage) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = info.loadingEndLable;

			} else {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = info.pullUpLable;
			}
			pullUpEl.style.lineHeight = pullUpEl.offsetHeight + "px";

		}
	};

	function onPulling(pullDownEl, pullDownAction, pullUpEl, pullUpAction) {
		if (pullDownEl.className.match('flip') /*&&!pullUpEl.className.match('loading')*/) {
			pullDownEl.classList.add("loading");
			pullDownEl.classList.remove("flip");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = info.loadingLable;
			pullDownEl.querySelector('.loader').style.display = "block";
			pullDownEl.style.lineHeight = "20px";
			if (pullDownAction) pullDownAction();
		}
		if (pullUpEl.className.match('flip') /*&&!pullDownEl.className.match('loading')*/) {
			if (parms.maxPage == parms.curPage) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = info.loadingEndLable;

			} else {
				pullUpEl.classList.add("loading");
				pullUpEl.classList.remove("flip");
				pullUpEl.querySelector('.pullUpLabel').innerHTML = info.loadingLable;
				pullUpEl.querySelector('.loader').style.display = "block";
				pullUpEl.style.lineHeight = "20px";
				if (pullUpAction) pullUpAction();
			}
		}
	};

	function loadingImgFnc(pullEL, i) {
		info.sssssss = setTimeout(function () {
			pullEL.querySelector('.dialog_loading').classList.add("dialog_loading_" + i);
			pullEL.querySelector('.dialog_loading').classList.remove("dialog_loading_" + (i - 1 == 0 ? 8 : i - 1));
			i++;
			if (i > 8) {
				i = 1;
			}
			loadingImgFnc(pullEL, i);
		}, 100);

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
		init({
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
		parms.maxPage = Math.ceil(data.special_data.length / 6);
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
