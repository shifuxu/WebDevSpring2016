(function() {
    angular
        .module("MovieHubApp")
        .controller("DetailsController", detailsController);

    function detailsController($scope, $routeParams, OmdbService) {
        $scope.imdbID = $routeParams.imdbID;

        OmdbService.findMovieByImdbID($scope.imdbID, function(response) {
            $scope.movie = response;
        });
    }
})();
