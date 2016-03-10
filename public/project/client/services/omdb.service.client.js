(function() {
    angular
        .module("MovieHubApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {
        var api = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function findMovieByImdbID(imdbID, callback) {
            return $http.get("http://www.omdbapi.com/?i="+imdbID+"&plot=full")
                .success(callback);
        }

        function searchMovieByTitle(title, callback) {
            return $http.get("http://www.omdbapi.com/?s="+title)
                .success(callback);
        }
    }
})();
