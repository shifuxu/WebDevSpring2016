(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($rootScope, UserService, $location) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.update = update;
        vm.currentUser = $rootScope.currentUser;

        function init() {

        }
        init();

        if (!vm.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            vm.currentUser = UserService.updateUser(vm.currentUser._id, user);

            if (user) {
                vm.message = "User update successfully";
                $rootScope.currentUser = vm.currentUser;
            } else {
                vm.error = "Unable to update the user";
            }
        }
    }
})();