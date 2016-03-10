(function() {
    angular
        .module("MovieHubApp")
        .controller("SearchController", searchController);

    function searchController($routeParams, OmdbService, $location) {
        var vm = this;

        vm.title = null;
        vm.search = search;
        vm.message = null;

        function init() {
            vm.title = $routeParams.title;
        }
        init();

        if (vm.title) {
            OmdbService
                .searchMovieByTitle(vm.title)
                .then(function(response) {
                    vm.data = response.data;
                });
        }

        function search(movie) {
            if (typeof movie !== "undefined" && movie.title != "") {
                $location.url("/search/" + movie.title);
            } else {
                vm.message = "Please enter the correct title for searching!";
            }
        }
    }
})();