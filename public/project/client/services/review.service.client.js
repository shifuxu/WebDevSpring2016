(function() {
    angular
        .module("MovieHubApp")
        .factory("ReviewService", reviewService);

    function reviewService($http) {
        var service = {
            findReviewsByImdbID: findReviewsByImdbID,
            findReviewsByUserId: findReviewsByUserId
        };

        return service;

        function findReviewsByImdbID(imdbID) {
            return $http.get("/api/project/review/movie/" + imdbID);
        }

        function findReviewsByUserId(userId) {
            return $http.get("/api/project/review/user/" + userId);
        }
    }
})();
