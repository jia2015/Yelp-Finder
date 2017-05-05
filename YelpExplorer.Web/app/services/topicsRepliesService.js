(function () {
    "use strict";

    angular.module("common.services")
            .factory("topicsRepliesService", ["$http", "$q", topicsRepliesService]);
    
    function topicsRepliesService($http, $q) {

        var _topics = [];
        var _isInit = false;

        var _isReady = function () {
            return _isInit;
        };

        //----------------get topics with replies----------
        var _getTopics = function () {

            var deferred = $q.defer();

            $http.get("/api/topics?includeReplies=true")
                .then(function (result) {
                    //success
                    angular.copy(result.data, _topics);
                    _isInit = true;
                    deferred.resolve();
                },
                function () {
                    //error
                    deferred.reject();
                });

            return deferred.promise;
        };

        //-----------------add new topic---------------
        var _addTopic = function (newTopic) {

            var deferred = $q.defer();

            $http.post("/api/topics", newTopic)
                .then(function (result) {
                    //success
                    var newCreatedTopic = result.data;
                    _topics.splice(0, 0, newCreatedTopic);
                    deferred.resolve(newCreatedTopic);
                },
                function () {
                    //error
                    deferred.reject();
                });

            return deferred.promise;
        };

        function _findTopic(id) {
            var found = null;

            $.each(_topics, function (i, item) {
                if (item.id == id) {
                    found = item;
                    return false;
                }
            });

            return found;
        }

        var _getTopicById = function (id) {
            var deferred = $q.defer();

            if (_isReady()) {
                var topic = _findTopic(id);
                if (topic) {
                    deferred.resolve(topic);
                } else {
                    deferred.reject();
                }
            } else {
                _getTopics()
                  .then(function () {
                      // success
                      var topic = _findTopic(id);
                      if (topic) {
                          deferred.resolve(topic);
                      } else {
                          deferred.reject();
                      }
                  },
                  function () {
                      // error
                      deferred.reject();
                  });
            }

            return deferred.promise;
        };

        var _saveReply = function (topic, newReply) {
            var deferred = $q.defer();

            $http.post("/api/topics/" + topic.id + "/replies", newReply)
              .then(function (result) {
                  // success
                  if (topic.replies == null) topic.replies = [];
                  topic.replies.push(result.data);
                  deferred.resolve(result.data);
              },
              function () {
                  // error
                  deferred.reject();
              });

            return deferred.promise;
        };

        return {
            topics: _topics,
            getTopics: _getTopics,
            addTopic: _addTopic,
            isReady: _isReady,
            getTopicById: _getTopicById,
            saveReply: _saveReply
        };
    }

})();