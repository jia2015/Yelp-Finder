(function () {
    "use strict";
    angular.module("YelpApp")
            .directive("ngUnique", ["placesDataService",
                                      ngUnique]);

    function ngUnique(placesDataService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function (e) {
                    if (!ngModel || !element.val()) return;

                    var currentValue = element.val();
                    placesDataService.userExists(currentValue)
                        .then(function (userExists) {
                            //if true,set error to false
                            var unique = !(userExists === true);
                            //Ensure value that being checked hasn't changed
                            //since the Ajax call was made
                            if (currentValue === element.val()) {
                                ngModel.$setValidity('unique', unique);
                            }
                        }, function () {

                            ngModel.$setValidity('unique', true);
                        });
                });
            }
        };
    }
})();