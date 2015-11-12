angular.module('webApp')
    .directive('tablesort', [function () {
        var thSelector = "td[sort]";
        var clsAll = "sort-asc sort-desc";
        return {
            restrict: 'A',
            scope : {
                orderby : "&"
            },
            link: function(scope, el, attrs) {
                // 格式
                /*
                 * {
                 * 	 node : dom,
                 *   order : "asc"或者"desc",   //默认排序
                 *   ordered : true/false       //是否排序过
                 * }
                 */
                var arrows = {};

                function initArrows(def_name,def_order) {
                    $(el).find(thSelector).each(function() {
                        var name = $(this).attr("sort");
                        arrows[name] = {
                            order : name === def_name ? def_order : "asc",
                            node : $(this)
                        };
                    });
                }
                function sortOnTh(e) {
                    var index = $(this).attr("sort");
                    sortOnIndex(index);
                }
                function switchSortArrow(index_name) {
                    //调整箭头方向
                    var conf = arrows[index_name]
                        , order
                        , node = conf.node;
                    if(conf.ordered) {
                        order = $.trim("asc desc".replace(conf.order , ""));
                    } else {
                        order = conf.order;
                        conf.ordered = true;
                    }
                    node.removeClass(clsAll);
                    conf.order = order;
                    node.addClass('sort-' + order);
                    angular.forEach(arrows , function(arrow,key) {
                        if(key !== index_name) {
                            arrow.node.removeClass(clsAll);
                        }
                    });
                    return {
                        order : order
                    };
                }
                function sortOnIndex(index_name) {
                    var order = switchSortArrow(index_name).order;
                    //调用ajax函数
                    var query = [index_name,order].join(' ');
                    scope.$evalAsync(function() {
                        scope.orderby({
                            order : query
                        });
                    });
                }
                var defaultIndex = attrs.tablesort.split(/\s+/)[0];
                var defaultOrder = attrs.tablesort.split(/\s+/)[1] || "asc";
                initArrows(defaultIndex,defaultOrder);
                sortOnIndex(defaultIndex);
                $(el).on('click',thSelector,sortOnTh);
            }
        };
    }]);