(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;
        var selectedUserId = null;

        vm.users = null;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findAllUsersFromAdmin()
                .then(function(response) {
                    var users = response.data;
                    if (users) {
                        vm.users = users;
                        convertToStrings(vm.users);
                    }
                });
        }
        init();

        function convertToStrings(users) {
            for (var u in users) {
                var strRoles = "";
                for (var r in users[u].roles) {
                    strRoles += users[u].roles[r] + ",";
                }
                var len = strRoles.length;
                if (len != 0) {
                    users[u].roles = strRoles.substring(0, len - 1);
                } else {
                    users[u].roles = strRoles;
                }
            }
        }

        function convertToString(roles) {
            var strRoles = "";
            for (var r in roles) {
                strRoles += roles[r] + ",";
            }
            var len = strRoles.length;
            if (len != 0) {
                return strRoles.substring(0, len - 1);
            } else {
                return strRoles;
            }
        }

        function convertToArray(user) {
            var roles = [];
            if (typeof user.roles != "undefined" && user.roles.length != 0) {
                roles = user.roles.split(",");
            }
            user.roles = roles;
        }

        function addUser(user) {
            convertToArray(user);
            user.emails = [];
            user.phones = [];
            UserService
                .createUserFromAdmin(user)
                .then(function(response) {
                    var newUser = response.data;
                    if (newUser) {
                        return UserService.findAllUsersFromAdmin();
                    }
                })
                .then(function(response) {
                    var users = response.data;
                    vm.users = users;
                    convertToStrings(vm.users);
                });
        }

        function updateUser(user) {
            convertToArray(user);
            if (selectedUserId) {
                UserService
                    .updateUserByIdFromAdmin(selectedUserId, user)
                    .then(function(response) {
                        var user = response.data;
                        if (user) {
                            return UserService.findAllUsersFromAdmin();
                        }
                    })
                    .then(function(response) {
                        var users = response.data;
                        vm.users = users;
                        convertToStrings(vm.users);
                    });
            }
        }

        function selectUser(index) {
            selectedUserId = vm.users[index]._id;
            UserService
                .findUserByIdFromAdmin(selectedUserId)
                .then(function(response) {
                    var user = response.data;
                    vm.user = {
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emails: user.emails,
                        phones: user.phones,
                        roles: convertToString(user.roles)
                    }
                });
        }

        function deleteUser(index) {
            selectedUserId = vm.users[index]._id;
            UserService
                .deleteUserByIdFromAdmin(selectedUserId)
                .then(function() {
                    return UserService.findAllUsersFromAdmin();
                })
                .then(function(response) {
                    var users = response.data;
                    vm.users = users;
                    convertToStrings(vm.users);
                });
        }

    }
})();