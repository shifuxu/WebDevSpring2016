(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($scope, UserService, $location, $rootScope) {
        var vm = this;

        vm.message = null;
        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return ;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return ;
            }
            if (!user.password || !user.verify) {
                vm.message = "Please provide a password";
                return ;
            }
            if (user.password != user.verify) {
                vm.message = "Passwords must match";
                return ;
            }
            if (!user.email) {
                vm.message = "Please provide a email address";
                return ;
            }
            var userTemp = UserService.findUserByUsername(user.username);
            if (userTemp != null) {
                vm.message = "User already exists";
                return ;
            }

            var newUser = UserService.createUser(user);
            $rootScope.currentUser = newUser;
            $location.url("/profile");
        }
    }
})();