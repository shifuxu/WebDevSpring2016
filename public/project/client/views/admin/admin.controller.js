(function() {
    angular
        .module("MovieHubApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;

        var selectedUserId = null;
        var selectedUserUsername = null;
        var selectedUserRole = null;

        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;
        vm.message = null;
        vm.users = null;
        vm.currentUser = null;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        vm.currentUser = userTemp;
                        UserService
                            .findAllUsers()
                            .then(function(response) {
                                var users = response.data;
                                if (users) {
                                    vm.users = users;
                                }
                            });
                    }
                });
        }
        init();

        function addUser(user) {
            UserService
                .createUser(user)
                .then(function(response) {
                    var user = response.data;
                    if (user) {
                        UserService
                            .findAllUsers()
                            .then(function(response) {
                                var users = response.data;
                                if (users) {
                                    vm.users = users;
                                }
                            });
                    }
                });
        }

        function updateUser(user) {
            UserService
                .updateUser(selectedUserId, user)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        UserService
                            .findAllUsers()
                            .then(function(response) {
                                var users = response.data;
                                if (users) {
                                    vm.users = users;
                                }
                            });
                    }
                });
        }

        function deleteUser(index) {
            selectedUserId = vm.users[index]._id;
            selectedUserRole = vm.users[index].role;
            if (selectedUserRole == "admin") {
                vm.message = "Can not delete admin!";
                return ;
            }
            UserService
                .deleteUserById(selectedUserId)
                .then(function() {
                    UserService
                        .findAllUsers()
                        .then(function(response) {
                            var users = response.data;
                            if (users) {
                                vm.users = users;
                            }
                        });
                });
        }

        function selectUser(index) {
            selectedUserId = vm.users[index]._id;
            selectedUserUsername = vm.users[index].username;
            UserService
                .findUserByUsername(selectedUserUsername)
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = {
                            _id: user._id,
                            username: user.username,
                            password: user.password,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            role: user.role
                        }
                    }
                });
        }

    }
})();
