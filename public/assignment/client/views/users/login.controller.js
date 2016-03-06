(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $rootScope, $location) {
        var vm = this;

        vm.login = login;
        vm.message = null;

        function init() {

        }
        init();

        function login(user) {
            var userTemp = UserService.findUserByCredentials(user.username, user.password);
            if (userTemp != null) {
                $rootScope.currentUser = userTemp;
                if (userTemp.roles != null && userTemp.roles.indexOf("admin") >= 0) {
                    $location.url("/admin");
                } else {
                    $location.url("/profile");
                }
            } else {
                vm.message = "Can not find such user, please enter again!";
                return ;
            }
        }
    }
})();