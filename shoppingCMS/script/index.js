/**
 * Created by fengshao on 2016/9/1.
 */
$(function () {

	var tsetData = [
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 2,
			"type_id": 1,
			"title": "测试专题-2",
			"title_en": "test special 2",
			"description": "测试专题用例2",
			"url": "www.baidu.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472438650,
			"update_time": "2016-08-31 16:05:26",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 3,
			"type_id": 2,
			"title": "测试专题-3",
			"title_en": "test special 3",
			"description": "2分类的测试专题",
			"url": "www.sina.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472525176,
			"update_time": "0000-00-00 00:00:00",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 4,
			"type_id": 1,
			"title": "aaaaaaaaa",
			"title_en": null,
			"description": null,
			"url": "www.jd.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472543533,
			"update_time": "0000-00-00 00:00:00",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 5,//ID
			"title": "afasfdsaf", //专题名称
			"url": "afdsasfas",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"type_id": 1,
			"title_en": null,
			"description": null,
			"status": 0,
			"create_time": 1472544986,
			"update_time": "2016-08-31 16:05:24",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		},
		{
			"id": 1,
			"type_id": 1,
			"title": "测试专题-1",
			"title_en": "test special 1",
			"description": "测试用的测试用的",
			"url": "www.wesai.com",
			"img": "<img src='../images/test.jpg'/>",
			"sort": 0,
			"status": 0,
			"create_time": 1472437386,
			"update_time": "2016-08-30 14:54:08",
			"testImg": "<img src='../images/test.jpg'/>"
		}
	];

	var parms = {
		dataSet: [],
		dt: "",
		editData: "",
		editUrl: "http://han.devel.wesai.com/api/editSpecial",//post
		getListUrl: "http://han.devel.wesai.com/api/getSpecialList", //get
		addUrl: "http://han.devel.wesai.com/api/addSpecial",//post
		delUrl: "http://han.devel.wesai.com/api/delSpecial"//get
	};

	// isLoginFnc();
	function isLoginFnc() {
		$.ajax({
			"type": "get",
			"url": 'http://han.devel.wesai.com/api/isLogin',
			"success": function (data) {
				if (data.error == 0) {
					init();
				} else {
					needLogiunInit();
				}
			},
			"error": function (data) {
				alert(JSON.stringify(data) + "wocou");
			}
		});
	}

	init();
	function needLogiunInit() {
		$(".content").hide();
		$(".need-login-div").css("height", $(window).height()).css("width", $(window).width()).show();
	}

	function init() {
		$(".need-login-div").hide();
		$(".content").show();
		$(".login-welcome label.usernam-label").text(window.sessionStorage.getItem("username"));

		$(".loading-div").css("height", $(window).height()).css("width", $(window).width());
		$(".loading-bg-div").css("height", $(document).height()).css("width", $(document).width());

		initDt();
		addEvent();
	}

	// getData();
	function getData() {
		$.ajax({
			"type": "get",
			"url": parms.getListUrl + '?typeId=&cacheOpen=11&pageSize=2',
			"success": function (data) {

				for (var i = 0; i < data.data.length; i++) {
					//data.data[i].img = "http://img.wesai.com/0102000057b2c9220000142aee8da1ae.jpg";
					data.data[i].img = "../images/test.jpg";
				}
				parms.dataSet = data.data;
				initDt(parms.dataSet);
			},
			"error": function (data) {
			}
		});
	};

	function initDt() {
		parms.dt = $('#example').DataTable({
			// "data": dataSet,
			"ajax": {
				"url": parms.getListUrl + '?typeId=&cacheOpen=11&pageSize=2',
				"type": "get",
				"dataSrc": function (json) {
					for (var i = 0; i < json.data.length; i++) {
						json.data[i].img = "../images/test.jpg";
						// json.data[i].url = "http://img.wesai.com/0102000057b2c9220000142aee8da1ae.jpg";
					}
					parms.dataSet = json.data;
					return parms.dataSet;
				}
			},
			"dom": 'l<"toolbar">frtip',
			"pagingType": "full_numbers",
			"columns": [
				{"data": "id", "class": "center", "sWidth": "5%"},
				{"data": "title", "class": "center", "sWidth": "25%"},
				{"data": "url", "class": "center", "sWidth": "20%"},
				{"data": "img", "class": "center", "sWidth": "20%"},
				{"data": "sort", "class": "center", "sWidth": "5%"},
				{"data": "test", "class": "center", "sWidth": "20%"}
			],
			"autoWidth": true,
			"aoColumnDefs": [//设置列的属性，此处设置第一列不排序
				// {"bSortable": false, "aTargets": [0]}, {"class": "tn", "targets": [0]},
				{
					"targets": -1,
					"class": "but_xq",
					"data": null,
					"bSortable": false,
					"defaultContent": "<div class='operate-div'><div class='edit-div-btn operate-btn button gray'>修改</div><div class='del-div-btn operate-div button white'>删除</div></div>"
				},
				{
					"render": function (data, type, row, meta) {
						//渲染 把数据源中的标题和url组成超链接
						return '<img src=' + data + '/>';
					},
					//指定是第三列
					"targets": 3
				}
			],
			"aLengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
			"language": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "抱歉， 没有找到",
				"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sInfoEmpty": "没有数据",
				"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "尾页"
				},
				"sZeroRecords": "没有检索到数据",
				"sProcessing": "<img src='./loading.gif' />"
			}
		});
		$("div.toolbar").html('<div class="add-btn button gray">添加</div>');
	};

	function addEvent() {

		$('#file_upload_return').load(function () {
			var res = $(this).contents().find('body').text();
			console.log(res);
		});

		$(window).resize(function () {
			$(".login-welcome label.usernam-label").text(window.sessionStorage.getItem("username"));
			$(".loading-div").css("height", $(window).height()).css("width", $(window).width());
			$(".loading-bg-div").css("height", $(document).height()).css("width", $(document).width());
		});

		/**
		 * 退出登录
		 */
		$(".body-div").delegate(".cancellation-btn", "click", function () {
			$.ajax({
				"type": "get",
				"url": 'http://han.devel.wesai.com/api/userLogout',
				"success": function (data) {
					window.sessionStorage.clear();
					window.location.href = "../login.html";
				},
				"error": function (data) {
					window.sessionStorage.clear();
					window.location.href = "../login.html";
				}
			});
		});
		$(".body-div").delegate(".btn-primary", "click", function () {
			var form = $("form[name=fileForm]");
			var options = {
				url: 'http://10.2.2.202:20202/uploading',
				resetForm: true,
				dataType: 'json',
				success: function (data) {
					alert("success");
				},
				error: function (data) {
					alert("error")
				}
			};
			// form.ajaxSubmit(options);
			form.submit(function () { //注意这里的index_form
				$(this).ajaxSubmit(options);
				return false;//防止dialog 自动关闭
			});
		});

		/**
		 * 查看修改
		 */
		$(".body-div").delegate(".edit-div-btn", "click", function () {
			var data = $('#example').DataTable().row($(this).parents('tr')).data();
			parms.editData = data;
			$("#operate-title-add").hide();
			$("#operate-title-edit").show();
			$("#dt-content-div").hide();
			$("#operate-content-div").show();
			$("#operate-btn-addok").hide();
			$("#operate-btn-editok").show();

			$("#operate-from-title").val(data.title);
			$("#operate-from-url").val(data.url);
			$("#operate-from-sort").val(data.sort);

		});

		/**
		 * 添加
		 */
		$(".body-div").delegate(".add-btn", "click", function () {
			$("#operate-title-add").show();
			$("#operate-title-edit").hide();
			$("#dt-content-div").hide();
			$("#operate-content-div").show();
			$("#operate-btn-addok").show();
			$("#operate-btn-editok").hide();

			$("#operate-from-title").val("");
			$("#operate-from-url").val("");
			$("#operate-from-sort").val("");

		});

		/**
		 * 重置
		 */
		$(".body-div").delegate("#operate-btn-resert", "click", function () {
			$(".operate-from-input").val("");
		});

		/**
		 * 取消删除
		 */
		$(".body-div").delegate(".del-no", "click", function () {
			$(this).parents(".operate-div").find(".delete-confirm-div").remove();
		});

		/**
		 * 点击删除按钮弹出是否删除
		 */
		$(".body-div").delegate(".del-div-btn", "click", function () {
			$(this).parent().prepend("<div class='delete-confirm-div'><div class='sanjiao'></div><div class='button gray del-ok'>是</div><div class='button gray del-no'>否</div></div>");
		});

		/**
		 * 确认删除
		 */
		$(".body-div").delegate(".del-ok", "click", function () {
			$(".loading-div").show();
			var $this = $(this);
			var data = $('#example').DataTable().row($(this).parents('tr')).data();
			$.ajax({
				"type": "get",
				"url": parms.delUrl + "?id=" + data.id,
				"success": function (data) {
					if (data.error == 0) {
						toastFnc("删除成功", $("body"));
					} else {
						toastFnc("删除失败", $("body"));
					}
					$this.parents(".operate-div").find(".delete-confirm-div").remove();
					parms.dt.ajax.reload(null, false);
					$(".loading-div").hide();
				},
				"error": function (data) {
					if (data.error == 0) {
						toastFnc("删除成功", $("body"));
					} else {
						toastFnc("删除失败", $("body"));
					}
					$this.parents(".operate-div").find(".delete-confirm-div").remove();
					parms.dt.ajax.reload(null, false);
					$(".loading-div").hide();
				}
			});
		});


		/**
		 * 修改完成
		 */
		$(".body-div").delegate("#operate-btn-editok", "click", function () {
			$(".form-loading-div").show();

			parms.editData.title = $("#operate-from-title").val();
			parms.editData.url = $("#operate-from-url").val();
			parms.editData.sort = $("#operate-from-sort").val();

			$.ajax({
				"type": "post",
				"url": parms.editUrl,
				"data": parms.editData,
				"success": function (data) {
					$(".form-loading-div").hide();
					if (data.error == 0) {
						toastFnc("修改成功", $(".operate-div-form"));
					} else {
						toastFnc("修改失败", $(".operate-div-form"));
					}
				},
				"error": function (data) {
					$(".form-loading-div").hide();
					if (data.error == 0) {
						toastFnc("修改成功", $(".operate-div-form"));
					} else {
						toastFnc("修改失败", $(".operate-div-form"));
					}
				}
			});
		});
		/**
		 * 添加完成
		 * */
		$(".body-div").delegate("#operate-btn-addok", "click", function () {
			$(".form-loading-div").show();
			var addDta = {};

			addDta.title = $("#operate-from-title").val();
			addDta.url = $("#operate-from-url").val();
			addDta.sort = $("#operate-from-sort").val();
			addDta.img = "../images/test.jpg";
			$.ajax({
				"type": "post",
				"url": parms.addUrl,
				"data": addDta,
				"success": function (data) {
					$(".form-loading-div").hide();
					if (data.error == 0) {
						$(".operate-from-input").val("");
						toastFnc("添加成功", $(".operate-div-form"));
					} else {
						toastFnc("添加失败", $(".operate-div-form"));
					}
				},
				"error": function (data) {
					$(".form-loading-div").hide();
					if (data.error == 0) {
						$(".operate-from-input").val("");
						toastFnc("添加成功", $(".operate-div-form"));
					} else {
						toastFnc("添加失败", $(".operate-div-form"));
					}
				}
			});
		});

		/**
		 * 取消
		 */
		$(".body-div").delegate("#operate-btn-cancel", "click", function () {
			hideEditDiv(false);
		});
	}

	function hideEditDiv(falg) {
		$("#dt-content-div").show();
		$("#operate-content-div").hide();
		$(".operate-from-input").val("");
		parms.editData = "";
		if (!falg) {
			parms.dt.ajax.reload(null, false);
		}
	}

//错误信息提示
	function toastFnc(msg, element) {
		if (element.find(".toast").length > 0) {
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
		}, 1500);
		element.prepend(toast);
	}
});