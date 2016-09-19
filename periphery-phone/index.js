/**
 * Created by fengs on 2016/9/19.
 */
$(function () {
	init();
	function init() {
		var cliWH = document.documentElement.clientWidth;
		var cliHG = document.documentElement.clientHeight;
		$(".brand-content-div").css("width", (cliWH - 70) / 4);
		$(".worth-buying-content-div").css("width", (cliWH - 45) / 2);
		console.log($(".worth-buying-left-div").height())
	}


});