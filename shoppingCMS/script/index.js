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
            "img": "www.wesai.com",
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
            "img": "www.baidu.com",
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
            "img": "www.sina.com",
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
            "img": "www.jd.com",
            "sort": 0,
            "status": 0,
            "create_time": 1472543533,
            "update_time": "0000-00-00 00:00:00",
            "testImg": "<img src='../images/test.jpg'/>"
        },
        {
            "id": 5,
            "type_id": 1,
            "title": "afasfdsaf",
            "title_en": null,
            "description": null,
            "url": "afdsasfas",
            "img": "",
            "sort": 0,
            "status": 0,
            "create_time": 1472544986,
            "update_time": "2016-08-31 16:05:24",
            "testImg": "<img src='../images/test.jpg'/>"
        }
    ];

    var parms = {
        dataSet: [],
        dt: ""
    };

    function init() {

    }

    getData();
    function getData() {
        $.ajax({
            "type": "get",
            "url": 'http://han.devel.wesai.com/api/getSpecialList?typeId=&cacheOpen=11',
            "success": function (data) {

                for (var i = 0; i < data.data.length; i++) {
                    //data.data[i].testImg = "<img src='http://img.wesai.com/0102000057b2c9220000142aee8da1ae.jpg'/>";
                    data.data[i].testImg = "<img src='../images/test.jpg'/>";
                    console.log(JSON.stringify(data.data[i]));
                }
                parms.dataSet = data.data;
                initDt(parms.dataSet);
            },
            "error": function (data) {
            }
        });
    };

    function initDt(dataSet) {
        parms.dt = $('#example').dataTable({
            "data": dataSet,
            "pagingType": "full_numbers",
            "columns": [
                {"data": "create_time", "width": "10%"},
                {"data": "description", "width": "20%"},
                {"data": "img", "width": "10%"},
                {"data": "url", "width": "15%"},
                {"data": "sort", "class": "center", "width": "15%"},
                {"data": "testImg", "class": "center", "width": "13%"},
                //{"data": "title", "class": "center", "width": "13%"},
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
                }
            ],
            "language": {
                "lengthMenu": "每页 _MENU_ 条记录",
                "zeroRecords": "没有找到记录",
                "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
                "infoEmpty": "无记录",
                "infoFiltered": "(从 _MAX_ 条记录过滤)"
            }
        });
    };

    addEvent();

    function addEvent() {
        /**
         * 查看修改
         */
        $("#dt-content-div").delegate(".edit-div-btn", "click", function () {
            var data = $('#example').DataTable().row($(this).parents('tr')).data();
        });


        /**
         * 删除
         */
        $("#dt-content-div").delegate(".del-div-btn", "click", function () {

        });
    }

})