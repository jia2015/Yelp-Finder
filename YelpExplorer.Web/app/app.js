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
        $routeProvider.when("/contactUs", {
            controller: "contactUsCtrl",
            templateUrl: "/app/views/contactUs.html"
        });
        $routeProvider.when("/topics", {
            controller: "topicsCtrl",
            templateUrl: "/app/views/topicsView.html"
        });
        $routeProvider.when("/newmessage", {
            controller: "newTopicCtrl",
            templateUrl: "/app/views/newTopicView.html"
        });
        $routeProvider.when("/message/:id", {
            controller: "singleTopicCtrl",
            templateUrl: "/app/views/singleTopicView.html"
        });
        $routeProvider.otherwise({ redirectTo: "/home" });
    }]);

})();