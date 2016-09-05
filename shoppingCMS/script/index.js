/**
 * Created by fengshao on 2016/9/1.
 */
$(function () {

	var parms = {
		dataSet: [],
		dt: "",
		editData: "",
		formValidate: "",
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
		$(".del-bg-div").css("height", $(document).height()).css("width", $(document).width());
		parms.formValidate = $("#operate-form").validate();

		initDt();
		addEvent();
	}

	function initDt() {
		parms.dt = $('#example').DataTable({
			"ajax": {
				"url": parms.getListUrl + '?typeId=&cacheOpen=11&pageSize=2',
				"type": "get",
				"dataSrc": function (json) {
					for (var i = 0; i < json.data.length; i++) {
						json.data[i].img ? json.data[i].img : json.data[i].img = "../images/test.jpg";
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
				{"data": "sort", "class": "center sort-td", "sWidth": "5%"},
				{"data": "test", "class": "center", "sWidth": "20%"}
			],
			"aoColumnDefs": [//设置列的属性，此处设置第一列不排序
				// {"bSortable": false, "aTargets": [0]}, {"class": "tn", "targets": [0]},
				{
					"targets": -1,
					"class": "but_xq",
					"data": null,
					"bSortable": false,
					"defaultContent": "<div class='operate-div'><div class='edit-div-btn operate-btn button gray'>修改</div><div class='del-div-btn button white'>删除</div></div>"
				},
				{
					"render": function (data, type, row, meta) {
						//渲染 把数据源中的img渲染成img标签
						return '<img src="' + data + '"/>';
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
					"sPrevious": "上一页",
					"sNext": "下一页",
					"sLast": "尾页"
				},
				"sZeroRecords": "没有检索到数据",
				"sProcessing": "<img src='./loading.gif' />"
			}
		});
		$("div.toolbar").html('<div class="add-btn button gray">添加</div>');
	};

	function addEvent() {

		//双击编辑排序列
		$(".body-div").delegate("#example tbody tr td.sort-td", "click", function () {
			var inval = $(this).html();                            //获得td里的html内容
			//获得td的父节点id属性的值
			var data = $('#example').DataTable().row($(this).parents('tr')).data();
			parms.editData = data;

			var infd = data.id;                        //获得td的fd属性的值
			var inid = data.sort;

			if ($("#edit" + infd + inid).length > 0) {
				return;
			} else {
				//把td里的html内容变为input框，并赋值
				$(this).html("<input type='text' id='edit" + infd + inid + "' value='" + inval + "'>");
			}

			//input框获得焦点，以及失去焦点后的处理
			$("#edit" + infd + inid).focus().blur(function () {
				var editval = parseInt($(this).val());                      //获得input框中的值
				if (editval != parms.editData.sort && /^\d+$/.test(editval)) {
					$(this).parent().html(editval);                //把得到的值赋给input框父节点的html
					parms.editData.sort = editval;
					editSaveFnc();
				} else {
					$(this).parent().html(parms.editData.sort);
				}
			});
		});


		$(window).resize(function () {
			$(".login-welcome label.usernam-label").text(window.sessionStorage.getItem("username"));
			$(".loading-div").css("height", $(window).height()).css("width", $(window).width());
			$(".loading-bg-div").css("height", $(document).height()).css("width", $(document).width());
			$(".del-bg-div").css("height", $(document).height()).css("width", $(document).width());
		});

		/**
		 * 退出登录
		 */
		$(".body-div").delegate(".cancellation-btn", "click", function () {
			logingOut();
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
			$("#imgurl-div img").attr("src", data.img);
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

			$(".operate-from-input").val("");
			$("#imgurl-div img").attr("src", "");
			$("#imgurl-div div.error").css("visibility", "hidden");

		});

		/**
		 * 重置
		 */
		$(".body-div").delegate("#operate-btn-resert", "click", function () {
			parms.formValidate.resetForm();
			$(".operate-from-input").val("");
			$("#imgurl-div img").attr("src", "");
			$("#imgurl-div div.error").css("visibility", "hidden");
		});

		/**
		 * 取消删除
		 */
		$(".body-div").delegate(".del-no", "click", function () {
			$(this).parents(".operate-div").find(".delete-confirm-div").remove();
			if ($(".delete-confirm-div").length == 0) {
				$(".del-bg-div").hide();
			}
		});
		$(".body-div").delegate(".del-bg-div", "click", function () {
			$(".delete-confirm-div").remove();
			if ($(".delete-confirm-div").length == 0) {
				$(".del-bg-div").hide();
			}
		});
		/**
		 * 点击删除按钮弹出是否删除
		 */
		$(".body-div").delegate(".del-div-btn", "click", function () {
			var element = "<div class='delete-confirm-div'>" +
				"<div class='sanjiao'></div>" +
				"<div class='button gray del-ok'>是</div>" +
				"<div class='button gray del-no'>否</div>" +
				"</div>";
			$(this).parent().prepend(element);
			$(".del-bg-div").show();
		});

		/**
		 * 确认删除
		 */
		$(".body-div").delegate(".del-ok", "click", function () {
			$(".del-bg-div").hide();
			delOkFnc($(this));
		});


		/**
		 * 修改完成
		 */
		$(".body-div").delegate("#operate-btn-editok", "click", function () {
			if (parms.formValidate.form() && checkImgIsNull()) {
				$(".form-loading-div").show();
				parms.editData.title = $("#operate-from-title").val();
				parms.editData.url = $("#operate-from-url").val();
				parms.editData.sort = $("#operate-from-sort").val();
				parms.editData.img = $("#imgurl-div img").attr("src");
				editSaveFnc();
			}

		});
		/**
		 * 添加完成
		 * */
		$(".body-div").delegate("#operate-btn-addok", "click", function () {
			if (parms.formValidate.form() && checkImgIsNull()) {
				addSaveFnc();
			}
		});

		$(".body-div").delegate(".btn-primary", "click", function () {
			uploadImgFnc();
		});

		/**
		 * 返回按钮
		 */
		$(".body-div").delegate("#operate-btn-cancel", "click", function () {
			hideEditDiv(false);
		});
	}

	//退出登录
	function logingOut() {
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
	}

	//添加保存
	function addSaveFnc() {
		$(".form-loading-div").show();
		var addDta = {};
		addDta.title = $("#operate-from-title").val();
		addDta.url = $("#operate-from-url").val();
		addDta.sort = $("#operate-from-sort").val();
		addDta.img = $("#imgurl-div img").attr("src");
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
	}

	//修改保存
	function editSaveFnc() {
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
	}

	//确认删除
	function delOkFnc($this) {
		$(".loading-div").show();
		var data = $('#example').DataTable().row($this.parents('tr')).data();
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
	}

	//上传图片
	function uploadImgFnc() {
		var form = $("form[name=fileForm]");
		var options = {
			dataType: 'json',
			beforeSubmit: function (a, form, options) {
				if (!a[0].value) {
					checkImgIsNull();
					return false
				}
				var fileType = a[0].value.type.toLocaleLowerCase();
				var fileSize = a[0].value.size;
				if (fileSize > 2048 * 1024) {
					checkImgIsMax();
					return false
				}
				if (!(fileType.lastIndexOf("png") !== -1
					|| fileType.lastIndexOf("jpg") !== -1
					|| fileType.lastIndexOf("jpeg") !== -1)) {
					checkImgIsNull();
					return false
				}
			},
			success: function (data) {
				if (data && data.result) {
					var imgData = data.result;
					var srcUrl = imgData.savehost + imgData.savepath + "/" + imgData.savename;
					$("#imgurl-div img").attr("src", srcUrl);
				} else {
					toastFnc("上传失败", $(".operate-div-form"));
				}
				checkImgIsNull();
			},
			error: function (data) {
				checkImgIsNull();
				toastFnc("上传失败", $(".operate-div-form"));
			}
		};
		form.ajaxForm(options);
	}

	//返回按钮
	function hideEditDiv(falg) {
		parms.formValidate.resetForm();
		$("#dt-content-div").show();
		$("#operate-content-div").hide();
		$(".operate-from-input").val("");
		$("#imgurl-div img").attr("src", "");
		$("#imgurl-div div.error").css("visibility", "hidden");

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

	//图片大小超出限制提示
	function checkImgIsMax() {
		$("#imgurl-div div.error").css("visibility", "visible");
		return false;
	}

	//校验是否已经上传图片
	function checkImgIsNull() {
		if (!$("#imgurl-div img").attr("src")) {
			$("#imgurl-div div.error").css("visibility", "visible");
			return false;
		} else {
			$("#imgurl-div div.error").css("visibility", "hidden");
			return true;
		}
	}
});