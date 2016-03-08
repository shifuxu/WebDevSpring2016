(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.login = login;
        vm.message = null;

        function init() {

        }
        init();

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        UserService.setCurrentUser(userTemp);
                        if (userTemp.roles != null && userTemp.roles.indexOf("admin") >= 0) {
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