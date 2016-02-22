(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService) {

        $scope.login = function (loginInfo) {
            var data = {
                username: loginInfo.username,
                password: loginInfo.password
            };

            console.log(data);

        }

    }
})();