(function() {
    angular
        .module("MovieHubApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService) {
        var vm = this;

        vm.imdbID = null;

        function init() {
            vm.imdbID = $routeParams.imdbID;
        }
        init();

        OmdbService
            .findMovieByImdbID(vm.imdbID)
            .then(function(response) {
                vm.movie = response.data;
            });
    }
})();
