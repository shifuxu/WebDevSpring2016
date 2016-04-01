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
                    }
                });
        }
        init();

        function update(user) {
            var emails = [];
            var phones = [];

            if (user.emails instanceof Array) {
                emails = user.emails;
            } else if (user.emails != "") {
                emails = user.emails.split(',');
            }

            if (user.phones instanceof Array) {
                phones = user.phones;
            } else if (user.phones != "") {
                phones = user.phones.split(',');
            }

            user.emails = emails;
            user.phones = phones;

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
    }
})();