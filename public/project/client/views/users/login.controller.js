(function () {
    angular
        .module("MovieHubApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.message = null;
        vm.login = login;

        function login(user) {
            var credentials = {
                username: user.username,
                password: user.password
            };
            UserService
                .findUserByCredentials(credentials)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        UserService.setCurrentUser(userTemp);
                        $location.url("/profile");
                    } else {
                        vm.message = "Can not find such user, please enter again!";
                    }
                });
        }
    }
})();