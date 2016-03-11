(function () {
    angular
        .module("MovieHubApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.message = null;
        vm.login = login;

        function init() {

        }
        init();

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
                        console.log(userTemp.role);
                        if (userTemp.role == "admin") {
                            $location.url("/admin");
                        } else {
                            $location.url("/profile");
                        }
                    } else {
                        vm.message = "Can not find such user, please enter again!";
                    }
                });
        }
    }
})();