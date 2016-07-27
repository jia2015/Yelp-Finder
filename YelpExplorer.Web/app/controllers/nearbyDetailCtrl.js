(function () {
    "use strict";
    angular.module("YelpApp")
            .controller("NearbyDetailCtrl", ["$uibModalInstance",
                                             "placeDetail",
                                             NearbyDetailCtrl]);

    function NearbyDetailCtrl($uibModalInstance, placeDetail) {
        var vm = this;
        vm.name = placeDetail.name;
        vm.phone = placeDetail.phone;
        vm.url = placeDetail.url;

        vm.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();