(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, UserService, $location, $rootScope) {
        $scope.message = null;
        $scope.register = register;

        function register(user) {
            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return ;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return ;
            }
            if (!user.password || !user.verify) {
                $scope.message = "Please provide a password";
                return ;
            }
            if (user.password != user.verify) {
                $scope.message = "Passwords must match";
                return ;
            }
            if (!user.email) {
                $scope.message = "Please provide a email address";
                return ;
            }
            var userTemp = UserService.findUserByUsername(user.username);
            if (userTemp != null) {
                $scope.message = "User already exists";
                return ;
            }

            var newUser = UserService.createUser(user);
            $rootScope.currentUser = newUser;
            $location.url("/profile");
        }
    }
})();