(function () {
    angular
        .module("MovieHubApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $rootScope, $location) {
        $scope.message = null;
        $scope.login = login;

        function login(user) {
            var userTemp = UserService.findUserByCredentials(user.username, user.password);
            if (userTemp != null) {
                $rootScope.currentUser = userTemp;
                $location.url("/profile");
            } else {
                $scope.message = "Can not find such user, please enter again!";
                return ;
            }
        }
    }
})();