(function () {
    "use strict";
    angular.module("YelpApp")
           .controller("HeaderCtrl", ["$location",
                                       HeaderCtrl]);

    function HeaderCtrl($location) {
        var vm = this;
        vm.isActive = function (path) {
            return $location.path().substr(0, path.length) === path;
        };
    }
})();