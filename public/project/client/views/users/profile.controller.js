(function() {
    angular
        .module("MovieHubApp")
        .controller("ProfileController", profileController);

    function profileController(UserService, ReviewService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.searchError = null;
        vm.currentUser = null;
        vm.profile = null;
        vm.reviews = [];
        vm.update = update;
        vm.unfollow = unfollow;
        vm.search = search;
        vm.deleteComment = deleteComment;

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
                    return ReviewService.findReviewsByUsername(vm.currentUser.username);
                })
                .then(function(response) {
                    var reviews = response.data;
                    if (reviews) {
                        vm.reviews = reviews;
                    }
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

        function search(searchUsername) {
            if (typeof searchUsername == "undefined") {
                vm.searchError = "Can not be empty!";
                return ;
            } else if (searchUsername == vm.currentUser.username) {
                vm.searchError = "Can not follow yourself!";
                return ;
            }

            UserService
                .followUser(vm.currentUser._id, searchUsername)
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

        // add remove comment feature
        function deleteComment(review) {
            ReviewService
                .deleteCommentById(review._id)
                .then(function() {
                    return ReviewService.findReviewsByUsername(vm.currentUser.username);
                })
                .then(function(response) {
                    if (response.data) {
                        vm.reviews = response.data;
                    }
                });
        }
    }
})();
