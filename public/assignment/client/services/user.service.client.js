(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            logout: logout,
            getCurrentUser: getCurrentUser,
            getUpdatedCurrentUser: getUpdatedCurrentUser
        };

        return service;

        function findUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            };
            return $http.post("/api/assignment/login", credentials);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/" + username);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
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