angular.module('ngAjaxSpinner',[])
    .directive('ajaxSpinner',   ['$http', '$rootScope' ,function ($http, $rootScope){
        return {
            template :  '<div class="spinner">' +
                        '<div class="spinner-container container1">' +
                        '<div class="circle1"></div>' +
                        '<div class="circle2"></div>' +
                        '<div class="circle3"></div>' +
                        '<div class="circle4"></div>' +
                        '</div>' +
                        '<div class="spinner-container container2">' +
                        '<div class="circle1"></div>' +
                        '<div class="circle2"></div>' +
                        '<div class="circle3"></div>' +
                        '<div class="circle4"></div>' +
                        '</div>' +
                        '<div class="spinner-container container3">' +
                        '<div class="circle1"></div>' +
                        '<div class="circle2"></div>' +
                        '<div class="circle3"></div>' +
                        '<div class="circle4"></div>' +
                        '</div>' +
                        '</div>',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };
                scope.$watch(scope.isLoading, function (loading)
                {
                    if(loading){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);