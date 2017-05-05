(function () {
    "use strict";
    
    angular.module("YelpApp")
           .controller("contactUsCtrl", ["$scope", "$http",
                                         contactUsCtrl]);

    function contactUsCtrl($scope, $http) {
        $scope.isSent = false;
        var msg = {Name:"yoman", Email: "email", Website: "web", Comment: "hello,there!" };

        $scope.send = function () {

            $http.post("/api/contact", msg).then(
                function (results) {
                    $scope.isSent = results.data;
                }
            );

        };
        
    }

})();