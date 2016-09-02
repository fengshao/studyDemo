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

    function init() {

    }

    getData();
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

    //initDt(tsetData);
    function initDt(dataSet) {
        parms.dt = $('#example').dataTable({
            "data": dataSet,
            "pagingType": "full_numbers",
            "columns": [
                {"data": "id", "class": "center", "width": "10%"},
                {"data": "title", "class": "center", "width": "20%"},
                {"data": "url", "class": "center", "width": "10%"},
                {"data": "img", "class": "center", "width": "15%"},
                {"data": "sort", "class": "center", "width": "15%"},
                {"data": "test", "class": "center", "width": "13%"}
            ],
            "aoColumnDefs": [//设置列的属性，此处设置第一列不排序
                {"bSortable": false, "aTargets": [0]}, {"class": "tn", "targets": [0]},
                {
                    "targets": -1,
                    "class": "but_xq",
                    "data": null,
                    "bSortable": false,
                    "defaultContent": "<div class='edit-div-btn operate-div'>修改</div><div class='del-div-btn operate-div'>删除</div>"
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
    };

    addEvent();

    function addEvent() {
        /**
         * 查看修改
         */
        $("#content").delegate(".edit-div-btn", "click", function () {
            var data = $('#example').DataTable().row($(this).parents('tr')).data();
            parms.editData = data;
            $("#operate-title-add").hide();
            $("#operate-title-edit").show();
            $("#dt-content-div").hide();
            $("#operate-content-div").show();
            $("#operate-btn-addok").hide();
            $("#operate-btn-ok").show();
            $("#operate-btn-addok").show();
            //$("#operate-btn-ok").hide();

            $("#operate-from-title").val(data.title);
            $("#operate-from-url").val(data.url);
            $("#operate-from-sort").val(data.sort);

        });

        $("#content").delegate("#example tbody tr", "click", function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                parms.dt.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });


        /**
         * 删除
         */
        $("#content").delegate(".del-div-btn", "click", function () {
            var data = $('#example').DataTable().row($(this).parents('tr')).data();
            $.ajax({
                "type": "get",
                "url": parms.delUrl + "?id=" + data.id,
                "success": function (data) {
                },
                "error": function (data) {
                }
            });
        });

        /**
         * 修改完成
         */
        $("#content").delegate("#operate-btn-ok", "click", function () {

            parms.editData.title = $("#operate-from-title").val();
            parms.editData.url = $("#operate-from-url").val();
            parms.editData.sort = $("#operate-from-sort").val();

            var test = {};
            test.title = $("#operate-from-title").val();
            test.url = $("#operate-from-url").val();
            test.sort = $("#operate-from-sort").val();
            test.img = "../images/test.jpg";

            $.ajax({
                "type": "post",
                "url": parms.editUrl,
                "data": parms.editData,
                "success": function (data) {
                },
                "error": function (data) {
                }
            });
        });
        /**
         * 添加完成
         * */
        $("#content").delegate("#operate-btn-addok", "click", function () {

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
                },
                "error": function (data) {
                }
            });
        });

        /**
         * 取消
         */
        $("#content").delegate("#operate-btn-cancel", "click", function () {
            $("#dt-content-div").show();
            $("#operate-content-div").hide();
            $(".operate-from-input").val("");
            parms.editData = "";
        });
    }

})