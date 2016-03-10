(function() {
    angular
        .module("MovieHubApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService, MovieService, UserService) {
        var vm = this;

        vm.imdbID = null;
        vm.currentUser = null;
        vm.favorite = favorite;

        function init() {
            vm.imdbID = $routeParams.imdbID;

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        vm.currentUser = currentUser;
                    }
                });

            OmdbService
                .findMovieByImdbID(vm.imdbID)
                .then(function(response) {
                    vm.movie = response.data;
                });

            MovieService
                .findUserLikes (vm.imdbID)
                .then(function(response){
                    vm.data = response.data;
                });
        }
        init();

        function favorite(movie) {
            MovieService
                .userLikesMovie(vm.currentUser._id, movie);
        }
    }
})();
