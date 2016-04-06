(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsersFromAdmin: findAllUsersFromAdmin,
            createUser: createUser,
            deleteUserByIdFromAdmin: deleteUserByIdFromAdmin,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            logout: logout,
            getCurrentUser: getCurrentUser,
            getUpdatedCurrentUser: getUpdatedCurrentUser,
            createUserFromAdmin: createUserFromAdmin,
            findUserByIdFromAdmin: findUserByIdFromAdmin,
            updateUserByIdFromAdmin: updateUserByIdFromAdmin
        };

        return service;

        function findUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/assignment/login", credentials);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/" + username);
        }

        function findAllUsersFromAdmin() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function createUserFromAdmin(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function findUserByIdFromAdmin(userId) {
            return $http.get("/api/assignment/admin/user/" + userId);
        }

        function deleteUserByIdFromAdmin(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        function updateUserByIdFromAdmin(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/assignment/loggedin");
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function getUpdatedCurrentUser(userId) {
            return $http.get("/api/assignment/loggedin/" + userId);
        }
    }
})();