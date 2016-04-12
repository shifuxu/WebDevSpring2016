(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController(UserService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        vm.currentUser = currentUser;
                        // clear the password here
                        vm.currentUser.password = null;
                        vm.currentUser.emails = convertToString(vm.currentUser.emails);
                        vm.currentUser.phones = convertToString(vm.currentUser.phones);
                    }
                });
        }
        init();

        function convertToString(arr) {
            var str = "";
            for (var i in arr) {
                str += arr[i] + ",";
            }
            var len = str.length;
            if (len != 0) {
                return str.substring(0, len - 1);
            } else {
                return str;
            }
        }

        function convertToArray(str) {
            var arr = [];
            if (str.length != 0) {
                arr = str.split(",");
            }
            return arr;
        }

        function update(user) {
            if (typeof user.emails != "undefined") {
                user.emails = convertToArray(user.emails);
            } else {
                user.emails = [];
            }

            if (typeof user.phones != "undefined") {
                user.phones = convertToArray(user.phones);
            } else {
                user.phones = [];
            }

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
                    var currentUser = response.data;
                    vm.currentUser = currentUser;
                    // clear the password field
                    vm.currentUser.password = null;
                    vm.currentUser.emails = convertToString(vm.currentUser.emails);
                    vm.currentUser.phones = convertToString(vm.currentUser.phones);
                });
        }
    }
})();