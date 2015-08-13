angular.module('multiByteInputHelper', [])
    .directive('multiByte', ['$interval', function ($interval) {
        var element = null,
            value = null,
            timer = null;

        return {
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            restrict: 'A',
            link: function (scope, elem) {

                //set
                element = elem;
                value = elem.val();

                //attach events
                element.focus(function () {
                    timer = $interval(function () {
                        if (value != element.val()) {
                            value = element.val();
                            scope.ngModel = value;
                        }
                    }, 50);
                });

                element.blur(function () {
                    if (timer) $interval.cancel(timer);
                    timer = null;
                });

            }
        }
    }]);