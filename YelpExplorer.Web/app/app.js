(function () {
    "use strict";    
    var app = angular.module("YelpApp", ["ngRoute", 
                                        "common.services",
                                        "ui.bootstrap", 
                                        "toaster",
                                        "angular-loading-bar"]);

    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/home", {
            controller: "NearbyCtrl as vm",
            templateUrl: "/app/views/nearby.html"
        });
        $routeProvider.when("/favorites", {
            controller: "FavoritesCtrl as vm",
            templateUrl: "/app/views/favorites.html"
        });
        $routeProvider.when("/about", {
            controller: "AboutCtrl as vm",
            templateUrl: "/app/views/about.html"
        });
        $routeProvider.otherwise({ redirectTo: "/home" });
    }]);

})();