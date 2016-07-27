(function () {
    "use strict";
    angular.module("YelpApp")
            .filter("placeNameCategoryFilter",
                    [placeNameCategoryFilter]);

    function placeNameCategoryFilter() {
        return function (places, filterValue) {
            if (!filterValue) return places;
            
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < places.length; i++) {
                var place = places[i];

                if (place.name.toLowerCase().indexOf(filterValue) > -1 ||
                    place.categories[0][0].toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(place);
                }
            }
            return matches;
        };
    }
})();