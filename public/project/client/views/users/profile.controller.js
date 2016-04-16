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
        vm.unfollow = unfollow;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        vm.currentUser = currentUser;
                    }
                    return UserService.getProfile();
                })
                .then(function(response) {
                    vm.profile = response.data;
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
                        return UserService.getUpdatedCurrentUser(vm.currentUser._id);
                    } else {
                        vm.error = "Unable to update the user";
                    }
                })
                .then(function(response) {
                    // do nothing here
                });
        }

        function unfollow(username) {
            UserService
                .unfollowUser(vm.currentUser._id, username)
                .then(function(response) {
                    var user = response.data;
                    if (user) {
                        return UserService.getUpdatedCurrentUser(vm.currentUser._id);
                    }
                })
                .then(function(response) {
                    if (response) {
                        vm.currentUser = response.data;
                        return UserService.getProfile();
                    }
                })
                .then(function(response) {
                    if (response) {
                        vm.profile = response.data;
                    }
                });
        }
    }
})();
