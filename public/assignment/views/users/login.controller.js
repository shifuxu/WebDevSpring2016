(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService) {

        $scope.login = function () {
            var data = {
                username: $scope.username,
                password: $scope.password
            }


        }

    }
})();