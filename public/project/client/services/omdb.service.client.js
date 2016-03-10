(function() {
    angular
        .module("MovieHubApp")
        .factory("OmdbService", omdbService);

    function omdbService($http) {
        var service = {
            searchMovieByTitle: searchMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return service;

        function findMovieByImdbID(imdbID) {
            return $http.get("http://www.omdbapi.com/?i=" + imdbID + "&plot=full");
        }

        function searchMovieByTitle(title) {
            return $http.get("http://www.omdbapi.com/?s=" + title);
        }
    }
})();
