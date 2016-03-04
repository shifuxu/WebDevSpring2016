(function() {
    angular
        .module("MovieHubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $routeParams, $location, OmdbService) {
        $scope.title = $routeParams.title;
        $scope.search = search;
        $scope.message = null;

        if ($scope.title) {

        }

        function search(moive) {
            OmdbService.searchMovieByTitle(
                movie.title,
                function(response) {
                    $scope.data = response;
                });
        }
    }
})();