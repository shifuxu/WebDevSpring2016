(function() {
    angular
        .module("MovieHubApp")
        .factory("ReviewService", reviewService);

    function reviewService($http) {
        var service = {
            findReviewsByImdbID: findReviewsByImdbID,
            findReviewsByUserId: findReviewsByUsername,
            userReviewsMovie: userReviewsMovie
        };

        return service;

        function findReviewsByImdbID(imdbID) {
            return $http.get("/api/project/review/movie/" + imdbID);
        }

        function findReviewsByUsername(username) {
            return $http.get("/api/project/review/user/" + username);
        }

        function userReviewsMovie(username, imdbID, review) {
            return $http.post("/api/project/review/user/" + username + "/movie/" + imdbID, review);
        }
    }
})();
