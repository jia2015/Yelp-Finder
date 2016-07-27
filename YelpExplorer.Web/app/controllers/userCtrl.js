(function () {
    "use strict";
    angular.module("YelpApp")
            .controller("UserCtrl", ["$uibModalInstance",
                                     "placesDataService",
                                     "markedPlace",
                                     UserCtrl]);

    function UserCtrl($uibModalInstance, placesDataService, markedPlace) {
        var vm = this;
        //vm.place = markedPlace;
        vm.user = { userName: "" };

        vm.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.saveUser = function () {

            placesDataService.setUserInContext(vm.user.userName);

            placesDataService.savePlace(markedPlace).then(
                function () {
                    vm.close();
                },
                function () {
                    alert("Error occured!");
                });
        };

    }
})();