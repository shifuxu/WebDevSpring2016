(function() {
    angular
        .module("MovieHubApp")
        .controller("ProfileController", profileController);

    function profileController(UserService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.currentUser = null;
        vm.profile = null;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        vm.currentUser = currentUser;
                    }
                    UserService
                        .getProfile()
                        .then(function(response) {
                            vm.profile = response.data;
                        });
                });
        }
        init();

        function update(user) {
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        vm.message = "User update successfully";
                        UserService.setCurrentUser(userTemp);
                    } else {
                        vm.error = "Unable to update the user";
                    }
                });
        }
    }
})();
