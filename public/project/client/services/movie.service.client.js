(function() {
    angular
        .module("MovieHubApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var service = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes
        };

        return service;

        function findUserLikes (imdbID) {
            return $http.get("/api/project/movie/" + imdbID + "/user");
        }

        function userLikesMovie(userId, movie) {
            return $http.post("/api/project/user/" + userId + "/movie/" + movie.imdbID, movie);
        }
    }
})();
