function Advertising() {
	var $ = this;
	$.css = function (l, t) {
		for (var r in t)
			l.style[r + ""] = t[r]
	}
		,
		$.paintBannerImg = function (l, t) {
			var r = this
				, i = l;
			if (i) {
				r.advertiseNumber = i.length;
				var e = document.createElement("div")
					, s = document.createElement("div");
				s.setAttribute("class", l.advertisingId + "view"),
					r.css(e, {
						display: "none"
					});
				for (var _ = [], D = 0; D < i.length; D++) {
					var o = i[D]
						, n = document.createElement("div")
						, aElement = document.createElement("a")
						, u = document.createElement("img");
					u.src = o.img;
					n.setAttribute("class", "scorll_li");
					aElement.href = o.url;
					(function (D) {
						aElement.onclick = function () {
							var clickStr = "main_activity_" + (D + 1);
							aClickFnc(clickStr);
						};
					})(D);
					r.css(u, {
						border: "0"
					});
					var S = document.createElement("img");
					r.css(S, {
						display: "none"
					}),
						_.push(u),
						aElement.appendChild(u),
						n.appendChild(aElement),
						e.appendChild(n),
						s.appendChild(S)
				}
				r.css(r.node, {
					overflow: "hidden"
				}),
					r.node.appendChild(e),
					r.node.appendChild(s);
				for (var G = 0, D = 0; D < _.length; D++) {
					var V = _[D];
					V.onload = function () {
						if (G++,
							G == _.length) {
							var t = r.node.style.width ? r.node.style.width : "100%"
								, i = r.node.style.height;
							r.css(e, {
								display: "block",
								position: "relative"
							}),
								r.css(r.node, {
									width: t,
									height: i
								}),
								r.autoPlay(l.advertisingId)
						}
					}
				}
			}
		}
		,
		$.paintDesignersImg = function (l, t, type) {
			var r = this
				, i = l;
			if (i) {
				r.advertiseNumber = Math.ceil(i.length / 3);
				var e = document.createElement("div")
					, s = document.createElement("div");
				s.setAttribute("class", l.advertisingId + "view"),
					r.css(e, {
						display: "none"
					});

				var shelfGroupElement = document.createElement("div");
				shelfGroupElement.setAttribute("class", "scorll_li");
				e.setAttribute("class", "scorll_list");
				var iLength = i.length;
				for (var _ = [], D = 0; D < i.length; D++) {
					var o = i[D]
						, n = document.createElement("div")
						, selectPic = document.createElement("img")
						, u = document.createElement("img");
					n.setAttribute("class", "designers-recommend-content-div");
					selectPic.setAttribute("class", "select-img-cls");
					u.setAttribute("class", "img-cls");

					if (i[D].id == nowTypeID) {
						n.setAttribute("class", "designers-recommend-content-div select");
					}

					n.setAttribute("data-id", i[D].id);
					n.setAttribute("data-index", D + 1);
					u.src = o.pic;
					selectPic.src = o.pic_select;
					(function (D) {
						u.onclick = function () {
							var clickStr = "designers_recommend_" + (D + 1);
							aClickFnc(clickStr);
						};
					})(D);
					r.css(u, {
						border: "0"
					});

					_.push(u);
					n.appendChild(u);
					n.appendChild(selectPic);

					shelfGroupElement.appendChild(n);
					if ((D + 1) % 3 === 0 || (iLength - D === 1 )) {
						var S = document.createElement("img");
						r.css(S, {
							display: "none"
						});

						e.appendChild(shelfGroupElement);
						s.appendChild(S);
						shelfGroupElement = document.createElement("div");
						shelfGroupElement.setAttribute("class", "scorll_li");
					}
				}
				r.css(r.node, {
					overflow: "hidden"
				}),
					r.node.appendChild(e),
					r.node.appendChild(s);
				for (var G = 0, D = 0; D < _.length; D++) {
					var V = _[D];
					V.onload = function () {
						if (G++,
							G == _.length) {
							var t = r.node.style.width ? r.node.style.width : "100%"
								, i = r.node.style.height;
							r.css(e, {
								display: "block",
								position: "relative"
							}),
								r.css(r.node, {
									width: t,
									height: i
								}),
								r.autoPlay(l.advertisingId, type)
						}
					}
				}
			}
		}
		,
		$.pre = function (type) {
			var l = this;
			this.changeEvent(function () {
				l.changePic(l.n - 1, type, "pre")
			}, type)
		}
		,
		$.next = function (type) {
			var l = this;
			this.changeEvent(function () {
				l.changePic(l.n + 1, type, "next")
			}, type)
		}
		,
		$.paint = function (responseText) {
			var o = this;
			var errFun = function () {
				o.node.parentNode.parentNode.style.display = 'none';
			}

			try {
				var advertisting = responseText;

				if (advertisting && advertisting.length > 0) {
					o.css(o.node, {
						display: "block",
						position: "relative"
					}),
						o.node.style.width = o.node.style.width ? o.node.style.width : "100%",
						o.paintBannerImg(advertisting)
				} else {
					o.css(o.node, {
						display: "none"
					});
					errFun();
				}

			}
			catch
				(e) {
				errFun();
			}

		}
		,
		$.show = function (l, data, type) {
			var t = this;
			l.innerHTML = "";
			t.node = l;
			if (type == "designers") {
				t.paintDesignersImg(data, "", type);
			} else {
				t.paint(data);
			}
		}
		,
		!function (l) {
			function t(l, t) {
				var r = (65535 & l) + (65535 & t)
					, i = (l >> 16) + (t >> 16) + (r >> 16);
				return i << 16 | 65535 & r
			}

			function r(l, t) {
				return l << t | l >>> 32 - t
			}

			function i(l, i, e, s, _, D) {
				return t(r(t(t(i, l), t(s, D)), _), e)
			}

			function e(l, t, r, e, s, _, D) {
				return i(t & r | ~t & e, l, t, s, _, D)
			}

			function s(l, t, r, e, s, _, D) {
				return i(t & e | r & ~e, l, t, s, _, D)
			}

			function _(l, t, r, e, s, _, D) {
				return i(t ^ r ^ e, l, t, s, _, D)
			}

			function D(l, t, r, e, s, _, D) {
				return i(r ^ (t | ~e), l, t, s, _, D)
			}

			function o(l, r) {
				l[r >> 5] |= 128 << r % 32,
					l[(r + 64 >>> 9 << 4) + 14] = r;
				var i, o, n, u, f, I = 1732584193, S = -271733879, G = -1732584194, V = 271733878;
				for (i = 0; i < l.length; i += 16)
					o = I,
						n = S,
						u = G,
						f = V,
						I = e(I, S, G, V, l[i], 7, -680876936),
						V = e(V, I, S, G, l[i + 1], 12, -389564586),
						G = e(G, V, I, S, l[i + 2], 17, 606105819),
						S = e(S, G, V, I, l[i + 3], 22, -1044525330),
						I = e(I, S, G, V, l[i + 4], 7, -176418897),
						V = e(V, I, S, G, l[i + 5], 12, 1200080426),
						G = e(G, V, I, S, l[i + 6], 17, -1473231341),
						S = e(S, G, V, I, l[i + 7], 22, -45705983),
						I = e(I, S, G, V, l[i + 8], 7, 1770035416),
						V = e(V, I, S, G, l[i + 9], 12, -1958414417),
						G = e(G, V, I, S, l[i + 10], 17, -42063),
						S = e(S, G, V, I, l[i + 11], 22, -1990404162),
						I = e(I, S, G, V, l[i + 12], 7, 1804603682),
						V = e(V, I, S, G, l[i + 13], 12, -40341101),
						G = e(G, V, I, S, l[i + 14], 17, -1502002290),
						S = e(S, G, V, I, l[i + 15], 22, 1236535329),
						I = s(I, S, G, V, l[i + 1], 5, -165796510),
						V = s(V, I, S, G, l[i + 6], 9, -1069501632),
						G = s(G, V, I, S, l[i + 11], 14, 643717713),
						S = s(S, G, V, I, l[i], 20, -373897302),
						I = s(I, S, G, V, l[i + 5], 5, -701558691),
						V = s(V, I, S, G, l[i + 10], 9, 38016083),
						G = s(G, V, I, S, l[i + 15], 14, -660478335),
						S = s(S, G, V, I, l[i + 4], 20, -405537848),
						I = s(I, S, G, V, l[i + 9], 5, 568446438),
						V = s(V, I, S, G, l[i + 14], 9, -1019803690),
						G = s(G, V, I, S, l[i + 3], 14, -187363961),
						S = s(S, G, V, I, l[i + 8], 20, 1163531501),
						I = s(I, S, G, V, l[i + 13], 5, -1444681467),
						V = s(V, I, S, G, l[i + 2], 9, -51403784),
						G = s(G, V, I, S, l[i + 7], 14, 1735328473),
						S = s(S, G, V, I, l[i + 12], 20, -1926607734),
						I = _(I, S, G, V, l[i + 5], 4, -378558),
						V = _(V, I, S, G, l[i + 8], 11, -2022574463),
						G = _(G, V, I, S, l[i + 11], 16, 1839030562),
						S = _(S, G, V, I, l[i + 14], 23, -35309556),
						I = _(I, S, G, V, l[i + 1], 4, -1530992060),
						V = _(V, I, S, G, l[i + 4], 11, 1272893353),
						G = _(G, V, I, S, l[i + 7], 16, -155497632),
						S = _(S, G, V, I, l[i + 10], 23, -1094730640),
						I = _(I, S, G, V, l[i + 13], 4, 681279174),
						V = _(V, I, S, G, l[i], 11, -358537222),
						G = _(G, V, I, S, l[i + 3], 16, -722521979),
						S = _(S, G, V, I, l[i + 6], 23, 76029189),
						I = _(I, S, G, V, l[i + 9], 4, -640364487),
						V = _(V, I, S, G, l[i + 12], 11, -421815835),
						G = _(G, V, I, S, l[i + 15], 16, 530742520),
						S = _(S, G, V, I, l[i + 2], 23, -995338651),
						I = D(I, S, G, V, l[i], 6, -198630844),
						V = D(V, I, S, G, l[i + 7], 10, 1126891415),
						G = D(G, V, I, S, l[i + 14], 15, -1416354905),
						S = D(S, G, V, I, l[i + 5], 21, -57434055),
						I = D(I, S, G, V, l[i + 12], 6, 1700485571),
						V = D(V, I, S, G, l[i + 3], 10, -1894986606),
						G = D(G, V, I, S, l[i + 10], 15, -1051523),
						S = D(S, G, V, I, l[i + 1], 21, -2054922799),
						I = D(I, S, G, V, l[i + 8], 6, 1873313359),
						V = D(V, I, S, G, l[i + 15], 10, -30611744),
						G = D(G, V, I, S, l[i + 6], 15, -1560198380),
						S = D(S, G, V, I, l[i + 13], 21, 1309151649),
						I = D(I, S, G, V, l[i + 4], 6, -145523070),
						V = D(V, I, S, G, l[i + 11], 10, -1120210379),
						G = D(G, V, I, S, l[i + 2], 15, 718787259),
						S = D(S, G, V, I, l[i + 9], 21, -343485551),
						I = t(I, o),
						S = t(S, n),
						G = t(G, u),
						V = t(V, f);
				return [I, S, G, V]
			}

			function n(l) {
				var t, r = "";
				for (t = 0; t < 32 * l.length; t += 8)
					r += String.fromCharCode(l[t >> 5] >>> t % 32 & 255);
				return r
			}

			function u(l) {
				var t, r = [];
				for (r[(l.length >> 2) - 1] = void 0,
						 t = 0; t < r.length; t += 1)
					r[t] = 0;
				for (t = 0; t < 8 * l.length; t += 8)
					r[t >> 5] |= (255 & l.charCodeAt(t / 8)) << t % 32;
				return r
			}

			function f(l) {
				return n(o(u(l), 8 * l.length))
			}

			function I(l, t) {
				var r, i, e = u(l), s = [], _ = [];
				for (s[15] = _[15] = void 0,
					 e.length > 16 && (e = o(e, 8 * l.length)),
						 r = 0; r < 16; r += 1)
					s[r] = 909522486 ^ e[r],
						_[r] = 1549556828 ^ e[r];
				return i = o(s.concat(u(t)), 512 + 8 * t.length),
					n(o(_.concat(i), 640))
			}

			function S(l) {
				var t, r, i = "0123456789abcdef", e = "";
				for (r = 0; r < l.length; r += 1)
					t = l.charCodeAt(r),
						e += i.charAt(t >>> 4 & 15) + i.charAt(15 & t);
				return e
			}

			function G(l) {
				return unescape(encodeURIComponent(l))
			}

			function V(l) {
				return f(G(l))
			}

			function B(l) {
				return S(V(l))
			}

			function a(l, t) {
				return I(G(l), G(t))
			}

			function c(l, t) {
				return S(a(l, t))
			}

			function d(l, t, r) {
				return t ? r ? a(t, l) : c(t, l) : r ? V(l) : B(l)
			}

			l.md5 = l.md5 || d
		}($)
}
function MobileAdvertising() {
	Advertising.apply(this, arguments);
	var l = this;
	l.autoPlay = function (l, type) {
		this.launch(l, type)
	}
		,
		l.launch = function (l, type) {
			var t = this;
			t.n = index,
				t.p = 0,
				t.o = 0,
				t.s = 0,
				t.t = 5e3,
				t.setT = null ,
				t.setP = null ,
				t.creatBtn(t.node),
				t.li = t.ul.getElementsByTagName("li"),
				t.carousel = t.node.getElementsByTagName("div")[0],
				t.div = t.carousel.getElementsByClassName("scorll_li"),
				t.initEnvironment(t.carousel),
				t.imgs = t.node.getElementsByClassName(l + "view")[0].getElementsByTagName("img"),
				t.liAddEvent(type),
				t.divAddEvent(type),
				t.oriented = function () {
				}
				,
				t.changeEvent(t.oriented, type)
		}
		,
		l.initEnvironment = function (l) {
			var t = this;

			var left = "-" + (index * 100) + "%";

			t.css(l, {
				left: left,
				width: 100 * t.advertiseNumber + "%",
				height: "100%",
				position: "absolute"
			});
			for (var r = 0; r < t.div.length; r++) {
				t.div[r].setAttribute("style", "width:" + 1 / t.div.length * 100 + "%;float: left; overflow: hidden;height: 100%");
				var i = t.div[r].getElementsByTagName("img")[0];
				t.css(i, {
					position: "relative",
					left: "50%",
					width: "100%",
					height: "100%",
					cursor: "pointer",
					webkitTransform: "translate(-50%, 0)",
					transform: "translate(-50%, 0px)"
				})
			}
		}
		,
		l.changePic = function (l, scrollType, type) {
			var t = this;
			if (scrollType == "designers") {
				var arrowLeft = document.getElementById("arrow-left");
				var arrowRight = document.getElementById("arrow-right");
				if (l == 0) {
					arrowLeft.style.display = 'none';
					arrowRight.style.display = 'block';
				}
				if (l == (t.advertiseNumber - 1)) {
					arrowLeft.style.display = 'block';
					arrowRight.style.display = 'none';
				}
				if (l > 0 && l <= (t.advertiseNumber - 2)) {
					arrowLeft.style.display = 'block';
					arrowRight.style.display = 'block';
				}
			}
			if (scrollType == "designers" && ((type == "pre" && l == -1) || (type == "next" && l == t.advertiseNumber))) {
				return
			}
			clearInterval(t.setT),
			l < 0 && (l = t.div.length - 1),
			l >= t.div.length && (l = 0);
			var r = (t.advertiseNumber,
				0)
				, i = 0
				, e = t.carousel.style.left.match(/-(\d+)\S+/m);
			null != e && (i = Number(e[1])),
				t.s = 0,
				t.o = t.n = l;
			for (var s = 0; s < t.div.length; s++)
				s == l ? t.css(t.li[s], {
					background: "#F90"
				}) : t.css(t.li[s], {
					background: "#FFFFFF"
				});
			t.setT = setInterval(function () {
				t.s++,
					t.s > 20 ? clearInterval(t.setT) : (r = 0 == l ? i - 5 * t.s * i / 100 : i < 100 * l ? i + (l - i / 100) * t.s * 5 : i - (i / 100 - l) * t.s * 5,
						t.css(t.carousel, {
							left: "-" + r + "%"
						}))
			}, 1)
		}
		,
		l.liAddEvent = function (type) {
			for (var l = this, t = 0; t < l.li.length; t++)
				l.li[t].i = t,
					l.li[t].onmouseover = function () {
						var t = this.i;
						l.changeEvent(function () {
							l.changePic(t, type)
						}, type)
					}
		}
		,
		l.divAddEvent = function (scrollType) {
			var l = this
				, t = {
				node: l.node,
				handleEvent: function (l) {
					var t = this;
					"touchstart" == l.type ? t.start(l) : "touchmove" == l.type ? t.move(l) : "touchend" == l.type && t.end(l)
				},
				start: function (t) {
					var r = t.targetTouches[0];
					l.startPos = {
						x: r.pageX,
						y: r.pageY,
						time: +new Date
					},
						l.isScrolling = 0,
						window.addEventListener ? (this.node.addEventListener("touchmove", this, !1),
							this.node.addEventListener("touchend", this, !1)) : window.attachEvent && (this.node.attachEvent("touchmove", this, !1),
							this.node.attachEvent("touchend", this, !1))
				},
				move: function (t) {
					if (!(t.targetTouches.length > 1 || t.scale && 1 !== t.scale)) {
						var r = t.targetTouches[0];
						l.endPos = {
							x: r.pageX - l.startPos.x,
							y: r.pageY - l.startPos.y
						},
							l.isScrolling = Math.abs(l.endPos.x) < Math.abs(l.endPos.y) ? 1 : 0,
						0 === l.isScrolling && t.preventDefault()
					}
				},
				end: function (t) {
					var r = +new Date - l.startPos.time;
					if (l.endPos) {
						0 === l.isScrolling && Number(r) > 10 && (Number(l.endPos.x) > 50 ? (l.endPos.x = 0,
							l.pre(scrollType)) : Number(l.endPos.x) < -50 && (l.endPos.x = 0,
							l.next(scrollType)))
					}

				}
			};
			window.addEventListener ? l.node.addEventListener("touchstart", t, !1) : window.attachEvent && l.node.attachEvent("touchstart", t)
		}
		,
		l.changeEvent = function (l, type) {
			var t = this;

			if (type == "designers") {
				t.div.length <= 1 ||
				(clearInterval(t.setP),
						t.p = t.n,
						l()
				)
			} else {
				t.div.length <= 1 ||
				(clearInterval(t.setP),
						t.p = t.n,
						l(),
						t.setP = setInterval(function () {
							t.p = t.n,
								t.n++,
								t.changePic(t.n)
						}, t.t)
				)
			}
		}
		,
		l.creatBtn = function (l) {
			var t = this
				, r = document.createElement("ul");
			t.css(r, {
				position: "absolute",
				bottom: "4px",
				right: "10px",
				margin: "0px",
				padding: "0px",
				zIndex: 3
			});
			for (var i = (l.height ? l.height : "100%",
				"100%" == l.style.width ? t.getStyle(l, "width") : l.style.width,
				0); i < t.advertiseNumber; i++) {
				var e = document.createElement("li")
					, s = 0 == i ? "#F90" : "#FFFFFF";
				t.css(e, {
					"float": "left",
					width: "4px",
					height: "4px",
					cursor: "pointer",
					background: s,
					overflow: "hidden",
					opaicty: .7,
					borderRadius: "4px",
					marginLeft: "6px"
				}),
					r.appendChild(e)
			}
			t.ul = r,
				t.node.appendChild(r)
		}
}

function adObj(data) {
	var sss = document.getElementById("advInner");
	(new MobileAdvertising).show(sss, data, "advInner");
}
function designersObj(data) {
	var sss = document.getElementById("designers-recommend-list");
	(new MobileAdvertising).show(sss, data, "designers");
}
