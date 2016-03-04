(function() {
    angular
        .module("MovieHubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $routeParams, $location, OmdbService) {
        $scope.title = $routeParams.title;
        $scope.search = search;
        $scope.message = null;

        if ($scope.title) {
            OmdbService.searchMovieByTitle(
                $scope.title,
                function(response) {
                    $scope.data = response;
                });
        }

        function search(title) {
            if (title != "") {
                $location.url("/search/" + title);
            } else {
                $scope.message = "Please enter the correct title for searching!";
            }
        }
    }
})();