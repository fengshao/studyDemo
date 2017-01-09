/*!
 * pull to refresh v2.0
 *author:wallace
 *2015-7-22
 */
var refresher = {
	info: {
		"pullDownLable": "下拉刷新...",
		"pullingDownLable": "释放刷新...",
		"pullUpLable": "上拉加载更多…",
		"pullingUpLable": "释放加载更多…",
		"loadingLable": "",
		"loadingEndLable": "已加载完全部内容",
		"sssssss": null
	},
	init: function (parameter) {
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
		var content = document.createTextNode(parameter.ifALL ? refresher.info.loadingEndLable : refresher.info.pullUpLable);
		pullUpLabel.appendChild(content);
		pullUp.appendChild(pullUpLabel);
		scroller.appendChild(pullUp);
		var pullDownEl = wrapper.querySelector(".pullDown");
		var pullDownOffset = pullDownEl.offsetHeight;
		var pullUpEl = wrapper.querySelector(".pullUp");
		var pullUpOffset = pullUpEl.offsetHeight;
		this.scrollIt(parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset);
	},
	isArd: function () {
		var boo, ua = navigator.userAgent;
		boo = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;

		return boo;
	},
	scrollIt: function (parameter, pullDownEl, pullDownOffset, pullUpEl, pullUpOffset) {
		//eval(parameter.id + "= new iScroll(parameter.id, {useTransition: true,vScrollbar: false,topOffset: pullDownOffset,onRefresh: function () {refresher.onRelease(pullDownEl,pullUpEl);},onScrollMove: function () {refresher.onScrolling(this,pullDownEl,pullUpEl,pullUpOffset);},onScrollEnd: function () {refresher.onPulling(pullDownEl,parameter.pullDownAction,pullUpEl,parameter.pullUpAction);},})");
		eval(parameter.id + "= new iScroll(parameter.id, {useTransition: true, vScrollbar: false, topOffset: pullDownOffset, scrollX: false, mouseWheel: true, click: this.isArd(), scrollbars: false, fadeScrollbars: true, interactiveScrollbars: false, keyBindings: false, deceleration: 0.0002, disableTouch: false, startY: 0, onRefresh: function () {refresher.onRelease(pullDownEl, pullUpEl);}, onScrollMove: function () {refresher.onScrolling(this, pullDownEl, pullUpEl, pullUpOffset);}, onScrollEnd: function () {refresher.onPulling(pullDownEl, parameter.pullDownAction, pullUpEl, parameter.pullUpAction);}});")
		pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullDownLable;
		document.addEventListener('touchmove', function (e) {
			e.preventDefault();
		}, false);
	},
	onScrolling: function (e, pullDownEl, pullUpEl, pullUpOffset) {
		if (e.y > -(pullUpOffset)) {
			pullDownEl.id = '';
			pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullDownLable;
			e.minScrollY = -pullUpOffset;
		}
		if (e.y > 0) {
			pullDownEl.classList.add("flip");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullingDownLable;
			e.minScrollY = 0;
			clearTimeout(refresher.info.sssssss);
			this.loadingImgFnc(pullDownEl, 2);
		}
		if (e.scrollerH < e.wrapperH && e.y < (e.minScrollY - pullUpOffset) || e.scrollerH > e.wrapperH && e.y < (e.maxScrollY - pullUpOffset)) {
			pullUpEl.style.display = "block";
			pullUpEl.classList.add("flip");
			clearTimeout(refresher.info.sssssss);
			if (maxPage == curPage) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingEndLable;
			} else {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.pullingUpLable;
				this.loadingImgFnc(pullUpEl, 2);
			}
		}
		if (e.scrollerH < e.wrapperH && e.y > (e.minScrollY - pullUpOffset) && pullUpEl.id.match('flip') || e.scrollerH > e.wrapperH && e.y > (e.maxScrollY - pullUpOffset) && pullUpEl.id.match('flip')) {
			pullDownEl.classList.remove("flip");
			pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.pullUpLable;
		}
	},
	onRelease: function (pullDownEl, pullUpEl) {
		if (pullDownEl.className.match('loading')) {
			pullDownEl.classList.toggle("loading");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.pullDownLable;
			pullDownEl.querySelector('.loader').style.display = "none";
			pullDownEl.style.display = "none";
			pullDownEl.style.lineHeight = pullDownEl.offsetHeight + "px";
		}
		if (pullUpEl.className.match('loading')) {
			clearTimeout(refresher.info.sssssss);
			pullUpEl.querySelector('.loader').style.display = "none";
			pullUpEl.classList.toggle("loading");
			if (maxPage == curPage) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingEndLable;

			} else {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.pullUpLable;
			}
			pullUpEl.style.lineHeight = pullUpEl.offsetHeight + "px";

		}
	},
	onPulling: function (pullDownEl, pullDownAction, pullUpEl, pullUpAction) {
		if (pullDownEl.className.match('flip') /*&&!pullUpEl.className.match('loading')*/) {
			pullDownEl.classList.add("loading");
			pullDownEl.classList.remove("flip");
			pullDownEl.querySelector('.pullDownLabel').innerHTML = refresher.info.loadingLable;
			pullDownEl.querySelector('.loader').style.display = "block";
			pullDownEl.style.lineHeight = "20px";
			if (pullDownAction) pullDownAction();
		}
		if (pullUpEl.className.match('flip') /*&&!pullDownEl.className.match('loading')*/) {
			if (maxPage == curPage) {
				pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingEndLable;

			} else {
				pullUpEl.classList.add("loading");
				pullUpEl.classList.remove("flip");
				pullUpEl.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingLable;
				pullUpEl.querySelector('.loader').style.display = "block";
				pullUpEl.style.lineHeight = "20px";
				if (pullUpAction) pullUpAction();
			}
		}
	},

	loadingImgFnc: function (pullEL, i) {
		var _this = this;
		refresher.info.sssssss = setTimeout(function () {
			pullEL.querySelector('.dialog_loading').classList.add("dialog_loading_" + i);
			pullEL.querySelector('.dialog_loading').classList.remove("dialog_loading_" + (i - 1 == 0 ? 8 : i - 1));
			i++;
			if (i > 8) {
				i = 1;
			}
			_this.loadingImgFnc(pullEL, i);
		}, 100);

	}

}