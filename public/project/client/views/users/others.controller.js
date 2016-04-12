(function() {
    angular
        .module("MovieHubApp")
        .controller("OthersController", othersController);

    function othersController($routeParams, UserService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.user = null;
        vm.currentUser = null;
        vm.follow = follow;
        var username = null;

        function init() {
            username = $routeParams.username;
            UserService
                .findUserByUsername(username)
                .then(function(response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.getCurrentUser();
                    }
                })
                .then(function(response) {
                    var user = response.data;
                    if (user) {
                        vm.currentUser = user;
                    }
                });
        }
        init();

        function follow(user) {
            UserService
                .followUser(vm.currentUser._id, user.username)
                .then(function(response) {
                    var user = response.data;
                });
        }
    }
})();
