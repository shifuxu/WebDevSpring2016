(function() {
    angular
        .module("MovieHubApp")
        .controller("SearchController", searchController);

    function searchController($scope, OmdbService) {
        $scope.search = search;

        function search(movie) {

            OmdbService.searchMovieByTitle(
                movie.title,
                function(response) {
                    $scope.data = response;
                });
        }
    }
})();