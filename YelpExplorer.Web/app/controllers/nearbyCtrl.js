(function () {
    "use strict";
    angular.module("YelpApp")
            .controller("NearbyCtrl", ["placesService",
                                       "placesDataService",
                                       "$filter",
                                       "$scope",
                                       "$uibModal",
                                        NearbyCtrl]);

    function NearbyCtrl(placesService, placesDataService, $filter, $scope, $uibModal) {
        var vm = this;
        vm.location = "New York, NY";
        vm.term = "restaurants";
        vm.filterValue = "";

        vm.places = [];
        vm.filteredPlaces = [];
        vm.filteredPlacesCount = 0;

        //paging
        vm.totalRecordsCount = 0;
        vm.pageSize = 10;
        vm.currentPage = 1;

        init();

        function init() {
            createWatcher();
            getPlaces();
        }

        function getPlaces() {
            var offset1 = (vm.pageSize) * (vm.currentPage - 1);

            placesService.get({
                //term: vm.term,
                //limit: vm.pageSize,
                //offset: offset1              
            }, function (placesResult) {
                if (placesResult.businesses) {
                    vm.places = placesResult.businesses;
                    console.log(vm.places);
                    vm.totalRecordsCount = placesResult.total;
                    filterPlaces('');               
                }
                else {
                    vm.places = [];
                    vm.totalRecordsCount = 0;
                }
            });
        }

        function filterPlaces(filterInput) {
            vm.filteredPlaces = $filter("placeNameCategoryFilter")(vm.places, filterInput);
            vm.filteredPlacesCount = vm.filteredPlaces.length;
        }

        function createWatcher() {
            $scope.$watch("vm.filterValue", function (filterInput) {
                filterPlaces(filterInput);
            });
        }

        vm.doSearch = function () {
            vm.currentPage = 1;
            getPlaces();
        };

        vm.pageChanged = function (page) {
            vm.currentPage = page;
            console.log(vm.currentPage);
            getPlaces();
        };

        vm.showDetails = function (name, phone, url) {
            var details = {
                name: name,
                phone: phone,
                url: url
            };
            var modalInstance = $uibModal.open({
                templateUrl: 'app/views/nearbyDetail.html',
                controller: 'NearbyDetailCtrl as vm',
                resolve: {
                    placeDetail: function () {
                        return details;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                //$scope.selected = selectedItem;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        vm.bookmarkPlace = function (place) {

            if (!placesDataService.getUserInContext()) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/views/userprofile.html',
                    controller: 'UserCtrl as vm',
                    resolve: {
                        markedPlace: function () {
                            return place;
                        }
                    }
                });
            }
            else {
                placesDataService.savePlace(place).then(
                function (results) {
                    // Do nothing as toaster showing from service
                },
                function (results) {
                    // Do nothing as toaster showing from service
                });
            }
        };

    }
})();