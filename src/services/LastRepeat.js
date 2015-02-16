(function(app) {
    var onLastRepeat = function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onLastRepeat + '');
                    });
                }
            }
        }
    };

    app.directive('onLastRepeat', onLastRepeat);

})(angular.module('wsapp'));