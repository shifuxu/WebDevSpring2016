(function() {
    angular
        .module("MovieHubApp")
        .controller("OthersController", othersController);

    function othersController($routeParams, UserService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.user = null;
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
                    }
                });
        }
        init();

        function follow(user) {
            console.log(user);
        }
    }
})();
