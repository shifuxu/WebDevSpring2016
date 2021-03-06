(function() {
    angular
        .module("MovieHubApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, OmdbService, MovieService, UserService, ReviewService) {
        var vm = this;

        vm.imdbID = null;
        vm.currentUser = null;
        vm.record = null;
        vm.reviews = [];
        vm.users = [];
        vm.favorite = favorite;
        vm.unfavorite = unfavorite;
        vm.comment = comment;

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
                .then(function(response) {
                    if (response) {
                        vm.users = response.data;
                    }
                });

            ReviewService
                .findReviewsByImdbID(vm.imdbID)
                .then(function(response) {
                    vm.reviews = response.data;
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
                    return MovieService.findUserLikes(vm.imdbID);
                })
                .then(function(response) {
                    if (response) {
                        vm.users = response.data;
                    }
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
                    return MovieService.findUserLikes(vm.imdbID);
                })
                .then(function(response) {
                    if (response) {
                        vm.users = response.data;
                    }
                });
        }

        // implement comment feature
        function comment(review) {
            review.title = vm.movie.Title;
            ReviewService
                .userReviewsMovie(vm.currentUser.username, vm.imdbID, review)
                .then(function() {
                    return ReviewService.findReviewsByImdbID(vm.imdbID);
                })
                .then(function(response) {
                    if (response) {
                        vm.reviews = response.data;
                    }
                });
        }
    }
})();
