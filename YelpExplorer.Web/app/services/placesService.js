(function () {
    "use strict";
    angular.module("common.services")
            .factory("placesService", ["$resource", placesService]);

    function placesService($resource) {

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
            return result;
        }
        // GENERATE increment and use it in the params
        var callbackId = angular.callbacks.counter.toString(36);

        var consumerSecret = "ChXXJw3G0qzM99skjfiFD5AV12U"; //Consumer Secret
        var tokenSecret = "XkfLkCYB-BiqRXTmka0iX9G9N3E"; //Token Secret        
        var params = {
            //offset: 0,
            limit: 10,
            radius_filter: 3000,   
            callback: 'angular.callbacks._0',
            location: "New York, NY",
            oauth_consumer_key: "ciK7B-TFsHCGXU7Ln1MKew", //Consumer Key
            oauth_token: "9qtEBVPJk0_akeMBtEcRkIpT-Nbj3ZIp", //Token
            oauth_signature_method: "HMAC-SHA1",
            oauth_timestamp: new Date().getTime(),
            oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
            term: "restaurants"
        };
        var method = 'GET';
        var url = "https://api.yelp.com/v2/search?callback=JSON_CALLBACK";
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false });
        params.oauth_signature = signature;

        return $resource(url, 
                    {
                        //offset: 0,
                        limit: params.limit,
                        radius_filter: params.radius_filter,
                        callback: params.callback,
                        location: params.location,
                        oauth_consumer_key: params.oauth_consumer_key, //Consumer Key
                        oauth_token: params.oauth_token, //Token
                        oauth_signature_method: params.oauth_signature_method,
                        oauth_signature: params.oauth_signature,
                        oauth_timestamp: params.oauth_timestamp,
                        oauth_nonce: params.oauth_nonce,
                        term: params.term
                    },
                    { get: { method: "JSONP"} }
               );
              
    }
})();