(function () {
    "use strict";
    
    angular.module("YelpApp")
            .controller("topicsCtrl", ["$scope", "$window", "$http", "topicsRepliesService", topicsCtrl]);
    
    function topicsCtrl($scope,$window, $http, topicsRepliesService) {

        $scope.data = topicsRepliesService;
        $scope.isBusy = false;

        if (topicsRepliesService.isReady() == false) {
            $scope.isBusy = true;

            topicsRepliesService.getTopics()
              .then(function () {
                  // success
              },
              function () {
                  // error
                  alert("could not load topics");
              })
              .then(function () {
                  $scope.isBusy = false;
              });
        }

        $scope.reply = function (id) {
            $window.location = "#/message/" + id;
        };

    }


    angular.module("YelpApp")
            .controller("newTopicCtrl", ["$scope", "$http", "$window", "topicsRepliesService",
        function ($scope, $http, $window, topicsRepliesService) {
        
        $scope.newTopic = {};

        $scope.save = function () {

            topicsRepliesService.addTopic($scope.newTopic)
              .then(function () {
                  // success
                  $window.location = "#/topics";
              },
              function () {
                  // error
                  toaster.pop('error', "Faield to add topic", "Could not save the new topic.");
              });

        };
    }]);

    //-----------------------------single topic
    angular.module("YelpApp")
            .controller("singleTopicCtrl", ["$scope", "topicsRepliesService", "$window", "$routeParams",
        function ($scope, topicsRepliesService, $window, $routeParams) {
        
        $scope.topic = null;
        $scope.newReply = {};

        topicsRepliesService.getTopicById($routeParams.id)
          .then(function (topic) {
              // success
              $scope.topic = topic;
          },
          function () {
              // error
              $window.location = "#/";
          });

        $scope.addReply = function () {
            topicsRepliesService.saveReply($scope.topic, $scope.newReply)
              .then(function () {
                  // success
                  $scope.newReply.body = "";
              },
              function () {
                  // error
                  alert("Could not save the new reply");
              });
        };
    }]);

})();