(function () {
    "use strict";
    angular.module("common.services")
            .factory("placesDataService", ["$http", "toaster", placesDataService]);

    function placesDataService($http, toaster) {
        var apiUrl = '/api/places/';
        var placesDataFactory = {};
        var userInContext = null;

        var _getUserInCtx = function () {
            return userInContext;
        };
        var _setUserInCtx = function (user) {
            userInContext = user;
        };

        var _savePlace = function (place) {

            var placeDetail = {
                userName: userInContext,
                placeName: place.name,
                placeID: place.id,
                address: place.location.display_address[0],
                category: place.categories[0][0],
                rating: place.rating
            };

            return $http.post(apiUrl, placeDetail).then(
                function (results) {
                    toaster.pop('success', "Bookmarked Successfully", "Place saved to your bookmark!");
                },
                function (results) {
                    if (results.status === 304) {
                        toaster.pop('note', "Already Bookmarked", "Already bookmarked for user: " + placeDetail.userName);
                    }
                    else {
                        toaster.pop('error', "Failed to Bookmark", "Something went wrong while saving.");
                    }
                    return results;
                });
        };

        var _getUserPlaces = function (userName, pageIndex, pageSize) {

            return $http.get(apiUrl + userName, { params: { page: pageIndex, pageSize: pageSize } }).then(function (results) {
                return results;
            });
        };

        var _userExists = function (userName) {

            return $http.get("/api/users/" + userName).then(function (results) {
                return results.data;
            });
        };

        placesDataFactory.getUserInContext = _getUserInCtx;
        placesDataFactory.setUserInContext = _setUserInCtx;
        placesDataFactory.getUserPlaces = _getUserPlaces;
        placesDataFactory.userExists = _userExists;

        placesDataFactory.savePlace = _savePlace;

        return placesDataFactory;
    }
})();