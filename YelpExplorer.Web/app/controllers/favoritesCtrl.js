(function () {
    "use strict";
    angular.module("YelpApp")
           .controller("FavoritesCtrl", ["placesDataService",
                                         FavoritesCtrl]);

    function FavoritesCtrl(placesDataService) {
        var vm = this;
        vm.myPlaces = [];

        vm.totalRecordsCount = 0;
        vm.pageSize = 4;
        vm.currentPage = 1;

        init();

        function init() {
            getUserPlaces();
        }

        function getUserPlaces() {

            var user = placesDataService.getUserInContext();
            if (user) {
                placesDataService.getUserPlaces(user, vm.currentPage - 1, vm.pageSize)
                    .then(function (results) {

                        vm.myPlaces = results.data;
                        var paginationHeader = angular.fromJson(results.headers("x-pagination"));
                        vm.totalRecordsCount = paginationHeader.TotalCount;

                    }, function (error) {
                        alert(error.message);
                    });
            }
        }

        vm.pageChanged = function (page) {
            vm.currentPage = page;
            getUserPlaces();
        };

    }
})();