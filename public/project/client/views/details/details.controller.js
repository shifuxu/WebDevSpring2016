(function() {
    angular
        .module("MovieHubApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService, MovieService, UserService) {
        var vm = this;

        vm.imdbID = null;
        vm.currentUser = null;
        vm.record = null;
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;

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
                .findMovieByImdbID(vm.imdbID)
                .then(function(response) {
                    vm.record = response.data;
                    if (vm.record) {
                        return MovieService.findUserLikes(vm.imdbID);
                    }
                })
                .then(function(response){
                    vm.users = response.data;
                });
        }
        init();


        // implement like feature
        function favorite(movie) {
            MovieService
                .userLikesMovie(vm.currentUser._id, movie)
                .then(function() {
                    return MovieService.findMovieByImdbID(vm.imdbID);
                })
                .then(function(response) {
                    vm.record = response.data;
                });
        }

        // implement unlike feature
        function unfavorite(movie) {
            MovieService
                .userUnlikesMovie(vm.currentUser._id, movie)
                .then(function() {
                    return MovieService.findMovieByImdbID(vm.imdbID);
                })
                .then(function(response) {
                    vm.record = response.data;
                });
        }
    }
})();
