(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $rootScope, $location) {
        $scope.login = function (user) {
            var userTemp = UserService.findUserByCredentials(user.username, user.password);
            if (userTemp != null) {
                $rootScope.currentUser = user;
                $location.url("/profile");
            }
        }
    }
})();